/**
 * Database Service - Sara Learning Platform
 * Uses Neon (Postgres) via pg. Set DATABASE_URL in .env.
 * DEV_MODE when DATABASE_URL is missing or placeholder.
 */

import { query, getPool } from './db.js'
import { withPerformanceLogging, progressCache } from '../middleware/performance.js'
import { DEFAULT_COURSE_ID } from '../config/defaultCourse.js'
import { courses as curriculumCourses } from '../data/curriculum.js'
import { getTopicIdsForCourse } from '../utils/curriculum.js'

// ============ INIT ============
function isDevMode() {
  const url = process.env.DATABASE_URL
  return !url || url.includes('your_') || url.includes('placeholder')
}

// Development mode fallback data
const DEV_USERS = new Map()
const DEV_PROGRESS = new Map()
const DEV_CHAT_SESSIONS = new Map() // key: `${userId}:${courseId}` — one row per course (current topic only)

function initializeDatabase() {
  return isDevMode() ? 'DEV_MODE' : getPool()
}

// ============ USER OPERATIONS ============

function escapeIlike(str) {
  if (typeof str !== 'string') return ''
  return str.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
}

export async function createUser(username, name, hashedPassword, securityQuestion = null, securityAnswer = null, email = null) {
  if (initializeDatabase() === 'DEV_MODE') {
    const lower = username.toLowerCase()
    for (const key of DEV_USERS.keys()) {
      if (key.toLowerCase() === lower) throw new Error('Username already exists')
    }
    const userId = Date.now().toString()
    const user = {
      id: userId,
      username,
      name,
      email: email?.trim() || null,
      password: hashedPassword,
      security_question: securityQuestion,
      security_answer: securityAnswer,
      token_version: 0,
      created_at: new Date().toISOString()
    }
    DEV_USERS.set(username, user)
    return user
  }

  const existing = await getUserByUsername(username)
  if (existing) throw new Error('Username already exists')

  const { rows } = await query(
    `INSERT INTO users (username, name, email, password, token_version, security_question, security_answer, created_at, updated_at)
     VALUES ($1, $2, $3, $4, 0, $5, $6, NOW(), NOW())
     RETURNING *`,
    [username, name, email?.trim() || null, hashedPassword, securityQuestion?.trim() || null, securityAnswer?.trim() || null]
  )
  if (!rows[0]) throw new Error('Failed to create user')
  return rows[0]
}

export async function getUserById(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    for (const user of DEV_USERS.values()) {
      if (user.id === userId) return user
    }
    return null
  }
  const { rows } = await query('SELECT * FROM users WHERE id = $1', [userId])
  return rows[0] || null
}

export async function getUserByUsername(username) {
  if (initializeDatabase() === 'DEV_MODE') {
    const lower = (username || '').toLowerCase()
    for (const [, user] of DEV_USERS.entries()) {
      if (user.username?.toLowerCase() === lower) return user
    }
    return null
  }
  const pattern = escapeIlike(username || '')
  const { rows } = await query('SELECT * FROM users WHERE username ILIKE $1', [pattern])
  return rows[0] || null
}

export async function getUserByEmail(email) {
  if (initializeDatabase() === 'DEV_MODE') {
    const lower = (email || '').toLowerCase().trim()
    for (const [, user] of DEV_USERS.entries()) {
      if (user.email?.toLowerCase().trim() === lower) return user
    }
    return null
  }
  const pattern = escapeIlike((email || '').trim())
  const { rows } = await query('SELECT * FROM users WHERE email ILIKE $1', [pattern])
  return rows[0] || null
}

export async function getUserByUsernameOrEmail(input) {
  const trimmed = (input || '').trim()
  if (!trimmed) return null
  const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)
  const user = isEmail ? await getUserByEmail(trimmed) : await getUserByUsername(trimmed)
  if (user) return user
  return isEmail ? await getUserByUsername(trimmed) : await getUserByEmail(trimmed)
}

export async function getTokenVersion(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    for (const user of DEV_USERS.values()) {
      if (user.id === userId) return user.token_version ?? 0
    }
    return 0
  }
  const { rows } = await query('SELECT token_version FROM users WHERE id = $1', [userId])
  return rows[0]?.token_version ?? 0
}

export async function bumpTokenVersion(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    for (const user of DEV_USERS.values()) {
      if (user.id === userId) {
        user.token_version = (user.token_version ?? 0) + 1
        return user.token_version
      }
    }
    return 1
  }
  const next = (await getTokenVersion(userId)) + 1
  await query('UPDATE users SET token_version = $1, updated_at = NOW() WHERE id = $2', [next, userId])
  return next
}

export async function updateUserProfile(userId, updates) {
  if (initializeDatabase() === 'DEV_MODE') {
    const user = await getUserById(userId)
    if (!user) throw new Error('User not found')
    Object.assign(user, updates, { updated_at: new Date().toISOString() })
    return user
  }
  const allowed = ['username', 'name', 'security_question', 'security_answer']
  const setClauses = []
  const values = []
  let i = 1
  for (const key of allowed) {
    if (Object.prototype.hasOwnProperty.call(updates, key) && updates[key] !== undefined) {
      setClauses.push(`${key} = $${i}`)
      values.push(updates[key])
      i++
    }
  }
  if (setClauses.length === 0) return (await getUserById(userId)) || null
  setClauses.push('updated_at = NOW()')
  values.push(userId)
  const { rows } = await query(
    `UPDATE users SET ${setClauses.join(', ')} WHERE id = $${i} RETURNING *`,
    values
  )
  if (!rows[0]) throw new Error('Failed to update user profile')
  if (rows[0].code === '23505') throw new Error('Username already exists')
  return rows[0]
}

export async function updateLastLogin(userId) {
  if (initializeDatabase() === 'DEV_MODE') return
  await query('UPDATE users SET last_login = NOW(), updated_at = NOW() WHERE id = $1', [userId])
}

export async function isAdmin(userId) {
  if (initializeDatabase() === 'DEV_MODE') return true
  const { rows } = await query('SELECT id FROM admins WHERE user_id = $1', [userId])
  return !!rows[0]
}

// ============ PROGRESS OPERATIONS ============
// One row per (user_id, course_id): only the topic currently being learned. completed_topics_count = fully mastered topics in order.

function progressCourseCacheKey(userId, courseId) {
  return `progress:${userId}:${courseId}`
}

function progressDevKey(userId, courseId) {
  return `${userId}:${courseId}`
}

/** Single progress row for a course (current topic only). */
export async function getProgressRowForCourse(userId, courseId = DEFAULT_COURSE_ID) {
  if (initializeDatabase() === 'DEV_MODE') {
    return DEV_PROGRESS.get(progressDevKey(userId, courseId)) || null
  }
  const { rows } = await query('SELECT * FROM progress WHERE user_id = $1 AND course_id = $2', [userId, courseId])
  return rows[0] || null
}

export async function getProgress(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  const cacheKey = progressCourseCacheKey(userId, courseId)
  return await withPerformanceLogging(async () => {
    if (initializeDatabase() === 'DEV_MODE') {
      const row = DEV_PROGRESS.get(progressDevKey(userId, courseId))
      if (!row || String(row.topic_id) !== String(topicId)) {
        return null
      }
      progressCache.set(cacheKey, row)
      return row
    }
    const cached = progressCache.get(cacheKey)
    if (cached && String(cached.topic_id) === String(topicId)) {
      return cached
    }
    const { rows } = await query(
      'SELECT * FROM progress WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    )
    const data = rows[0] || null
    if (!data || String(data.topic_id) !== String(topicId)) {
      return null
    }
    progressCache.set(cacheKey, data)
    return data
  }, `getProgress(${topicId})`)
}

export async function upsertProgress(userId, topicId, updates, courseId = DEFAULT_COURSE_ID) {
  const cacheKey = progressCourseCacheKey(userId, courseId)
  return await withPerformanceLogging(async () => {
    if (initializeDatabase() === 'DEV_MODE') {
      const key = progressDevKey(userId, courseId)
      const existing = DEV_PROGRESS.get(key) || {}
      if (
        existing.user_id &&
        String(existing.topic_id) !== String(topicId) &&
        updates.topic_id === undefined
      ) {
        progressCache.set(cacheKey, existing)
        return existing
      }
      const mergedTopicId =
        updates.topic_id !== undefined ? updates.topic_id : topicId
      const newProgress = {
        user_id: userId,
        course_id: courseId,
        topic_id: mergedTopicId,
        phase: updates.phase ?? existing.phase ?? null,
        status: updates.status ?? existing.status ?? null,
        current_task: updates.current_task ?? existing.current_task ?? null,
        total_tasks: updates.total_tasks ?? existing.total_tasks ?? null,
        assignments_completed:
          updates.assignments_completed ?? existing.assignments_completed ?? 0,
        completed_topics_count:
          updates.completed_topics_count !== undefined
            ? updates.completed_topics_count
            : (existing.completed_topics_count ?? 0),
        current_outcome_index:
          updates.current_outcome_index !== undefined
            ? updates.current_outcome_index
            : (existing.current_outcome_index ?? 0),
        updated_at: new Date().toISOString()
      }
      DEV_PROGRESS.set(key, newProgress)
      progressCache.set(cacheKey, newProgress)
      return newProgress
    }
    const allowed = [
      'phase',
      'status',
      'current_task',
      'total_tasks',
      'assignments_completed',
      'topic_id',
      'completed_topics_count',
      'current_outcome_index'
    ]
    const safe = {}
    for (const k of allowed) {
      if (Object.prototype.hasOwnProperty.call(updates, k) && updates[k] !== undefined) {
        safe[k] = updates[k]
      }
    }
    const existingQ = await query(
      'SELECT * FROM progress WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    )
    const ex = existingQ.rows[0]
    if (ex && String(ex.topic_id) !== String(topicId) && updates.topic_id === undefined) {
      progressCache.set(cacheKey, ex)
      return ex
    }
    const mergedTopicId = safe.topic_id !== undefined ? safe.topic_id : topicId
    const merged = {
      topic_id: mergedTopicId,
      phase: safe.phase ?? ex?.phase ?? null,
      status: safe.status ?? ex?.status ?? null,
      current_task: safe.current_task ?? ex?.current_task ?? null,
      total_tasks: safe.total_tasks ?? ex?.total_tasks ?? null,
      assignments_completed: safe.assignments_completed ?? ex?.assignments_completed ?? 0,
      completed_topics_count:
        safe.completed_topics_count !== undefined
          ? safe.completed_topics_count
          : (ex?.completed_topics_count ?? 0),
      current_outcome_index:
        safe.current_outcome_index !== undefined
          ? safe.current_outcome_index
          : (ex?.current_outcome_index ?? 0)
    }
    const { rows } = await query(
      `INSERT INTO progress (user_id, course_id, topic_id, phase, status, current_task, total_tasks, assignments_completed, completed_topics_count, current_outcome_index, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, NOW())
       ON CONFLICT (user_id, course_id) DO UPDATE SET
         topic_id = EXCLUDED.topic_id,
         phase = EXCLUDED.phase,
         status = EXCLUDED.status,
         current_task = EXCLUDED.current_task,
         total_tasks = EXCLUDED.total_tasks,
         assignments_completed = EXCLUDED.assignments_completed,
         completed_topics_count = EXCLUDED.completed_topics_count,
         current_outcome_index = EXCLUDED.current_outcome_index,
         updated_at = NOW()
       RETURNING *`,
      [
        userId,
        courseId,
        merged.topic_id,
        merged.phase,
        merged.status,
        merged.current_task,
        merged.total_tasks,
        merged.assignments_completed,
        merged.completed_topics_count,
        merged.current_outcome_index
      ]
    )
    const data = rows[0]
    if (data) progressCache.set(cacheKey, data)
    return data
  }, `upsertProgress(${topicId})`)
}

export async function getAllProgress(userId, courseId = null) {
  if (initializeDatabase() === 'DEV_MODE') {
    const list = []
    for (const [, p] of DEV_PROGRESS.entries()) {
      if (!p || String(p.user_id) !== String(userId)) continue
      if (courseId != null && p.course_id !== courseId) continue
      list.push(p)
    }
    list.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
    return list
  }
  if (courseId != null) {
    const { rows } = await query(
      'SELECT * FROM progress WHERE user_id = $1 AND course_id = $2 ORDER BY updated_at DESC',
      [userId, courseId]
    )
    return rows || []
  }
  const { rows } = await query(
    'SELECT * FROM progress WHERE user_id = $1 ORDER BY updated_at DESC',
    [userId]
  )
  return rows || []
}

/** Topic ids fully completed in order (linear); derived from completed_topics_count + curriculum. */
export async function getCompletedTopics(userId, courseId = DEFAULT_COURSE_ID) {
  const orderedIds = getTopicIdsForCourse(curriculumCourses, courseId)
  if (initializeDatabase() === 'DEV_MODE') {
    const p = DEV_PROGRESS.get(progressDevKey(userId, courseId))
    if (!p) return []
    const n = Math.min(Number(p.completed_topics_count) || 0, orderedIds.length)
    return orderedIds.slice(0, n)
  }
  const { rows } = await query(
    'SELECT completed_topics_count FROM progress WHERE user_id = $1 AND course_id = $2',
    [userId, courseId]
  )
  const count = Number(rows[0]?.completed_topics_count) || 0
  const n = Math.min(count, orderedIds.length)
  return orderedIds.slice(0, n)
}

export async function updateUserPassword(userId, hashedPassword) {
  if (initializeDatabase() === 'DEV_MODE') {
    for (const [, user] of DEV_USERS.entries()) {
      if (user.id === userId) {
        user.password = hashedPassword
        user.updated_at = new Date().toISOString()
        await bumpTokenVersion(userId)
        return user
      }
    }
    throw new Error('User not found in development mode')
  }
  const { rows } = await query(
    'UPDATE users SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING *',
    [hashedPassword, userId]
  )
  if (!rows[0]) throw new Error('Failed to update password')
  await bumpTokenVersion(userId)
  return rows[0]
}

// ============ COURSE UNLOCKS ============

const DEV_COURSE_UNLOCKS = new Map()
const DEV_UNLOCK_SLOTS = new Map()

function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export async function getUnlockedCourseIds(userId) {
  const user = await getUserById(userId)
  const username = user?.username || null
  if (!username) return []
  if (initializeDatabase() === 'DEV_MODE') {
    const fromMap = Array.from(DEV_COURSE_UNLOCKS.keys()).filter((k) => k.startsWith(`${username}:`))
    const fromSlots = Array.from(DEV_UNLOCK_SLOTS.values()).filter((s) => s.username === username).map((s) => s.course_id)
    return [...new Set([...fromMap.map((k) => k.split(':')[1]), ...fromSlots])]
  }
  const { rows } = await query('SELECT course_id FROM user_course_unlocks WHERE username = $1', [username])
  return (rows || []).map((r) => r.course_id)
}

export async function isCourseUnlockedForUser(userId, courseId) {
  const unlocked = await getUnlockedCourseIds(userId)
  return unlocked.includes(courseId)
}

export async function unlockCourseForUser(userId, courseId) {
  const user = await getUserById(userId)
  const username = user?.username
  if (!username) throw new Error('User not found')
  if (initializeDatabase() === 'DEV_MODE') {
    DEV_COURSE_UNLOCKS.set(`${username}:${courseId}`, { username, course_id: courseId, unlocked_at: new Date().toISOString() })
    return { username, course_id: courseId, unlocked_at: new Date().toISOString() }
  }
  const { rows } = await query(
    `INSERT INTO user_course_unlocks (username, course_id, unlocked_at)
     VALUES ($1, $2, NOW())
     ON CONFLICT (username, course_id) DO UPDATE SET unlocked_at = NOW()
     RETURNING *`,
    [username, courseId]
  )
  if (!rows[0]) throw new Error('Failed to unlock course')
  return rows[0]
}

export async function createUnlockSlot(courseId) {
  if (initializeDatabase() === 'DEV_MODE') {
    const id = randomUUID()
    DEV_UNLOCK_SLOTS.set(id, { id, course_id: courseId, username: null })
    return { id, course_id: courseId }
  }
  const { rows } = await query(
    'INSERT INTO user_course_unlocks (username, course_id, unlocked_at) VALUES (NULL, $1, NOW()) RETURNING id, course_id',
    [courseId]
  )
  if (!rows[0]) throw new Error('Failed to create unlock slot')
  return { id: rows[0].id, course_id: rows[0].course_id }
}

export async function redeemUnlockCode(userId, codeId) {
  const id = (codeId || '').toString().trim()
  if (!id) throw new Error('Code is required')
  const user = await getUserById(userId)
  const username = user?.username
  if (!username) throw new Error('User not found')
  if (initializeDatabase() === 'DEV_MODE') {
    const slot = DEV_UNLOCK_SLOTS.get(id)
    if (!slot) throw new Error('Invalid or already used code')
    if (slot.username != null) throw new Error('Code already used')
    slot.username = username
    DEV_COURSE_UNLOCKS.set(`${username}:${slot.course_id}`, {})
    return { success: true, courseId: slot.course_id }
  }
  const { rows: [row] } = await query(
    'SELECT id, username, course_id FROM user_course_unlocks WHERE id = $1',
    [id]
  )
  if (!row) throw new Error('Invalid or already used code')
  if (row.username != null) throw new Error('Code already used')
  await query(
    'UPDATE user_course_unlocks SET username = $1, unlocked_at = NOW() WHERE id = $2',
    [username, id]
  )
  return { success: true, courseId: row.course_id }
}

// ============ CHAT SESSIONS (for chatService.js) ============

function chatDevKey(userId, courseId) {
  return `${userId}:${courseId}`
}

export async function getChatSessionRow(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  if (initializeDatabase() === 'DEV_MODE') {
    const row = DEV_CHAT_SESSIONS.get(chatDevKey(userId, courseId))
    if (!row || String(row.topic_id) !== String(topicId)) {
      return null
    }
    return { messages: row.messages, message_count: row.message_count }
  }
  const { rows } = await query(
    'SELECT messages, message_count, topic_id FROM chat_sessions WHERE user_id = $1 AND course_id = $2',
    [userId, courseId]
  )
  const row = rows[0]
  if (!row || String(row.topic_id) !== String(topicId)) {
    return null
  }
  return { messages: row.messages, message_count: row.message_count }
}

/** Full row for debug endpoints. */
export async function getChatSessionRaw(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  if (initializeDatabase() === 'DEV_MODE') {
    const row = DEV_CHAT_SESSIONS.get(chatDevKey(userId, courseId))
    if (!row || String(row.topic_id) !== String(topicId)) {
      return null
    }
    return row || null
  }
  const { rows } = await query(
    'SELECT * FROM chat_sessions WHERE user_id = $1 AND course_id = $2',
    [userId, courseId]
  )
  const row = rows[0]
  if (!row || String(row.topic_id) !== String(topicId)) {
    return null
  }
  return row
}

export async function upsertChatSessionRow(userId, topicId, payload, courseId = DEFAULT_COURSE_ID) {
  if (initializeDatabase() === 'DEV_MODE') {
    const key = chatDevKey(userId, courseId)
    const existing = DEV_CHAT_SESSIONS.get(key) || {}
    DEV_CHAT_SESSIONS.set(key, {
      ...existing,
      ...payload,
      user_id: userId,
      course_id: courseId,
      topic_id: topicId
    })
    return
  }
  await query(
    `INSERT INTO chat_sessions (user_id, course_id, topic_id, messages, message_count, phase, last_message_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
     ON CONFLICT (user_id, course_id) DO UPDATE SET
       topic_id = EXCLUDED.topic_id,
       messages = EXCLUDED.messages,
       message_count = EXCLUDED.message_count,
       phase = EXCLUDED.phase,
       last_message_at = EXCLUDED.last_message_at,
       updated_at = EXCLUDED.updated_at`,
    [
      userId,
      courseId,
      topicId,
      payload.messages,
      payload.message_count,
      payload.phase ?? 'session',
      payload.last_message_at ?? new Date().toISOString(),
      payload.updated_at ?? new Date().toISOString()
    ]
  )
}

/** Clear messages for this course (one row per course; completed topics leave no separate chat rows). */
export async function clearChatSessionForCourse(userId, courseId = DEFAULT_COURSE_ID) {
  if (initializeDatabase() === 'DEV_MODE') {
    const key = chatDevKey(userId, courseId)
    const row = DEV_CHAT_SESSIONS.get(key)
    if (row) {
      row.messages = ''
      row.message_count = 0
      row.updated_at = new Date().toISOString()
    }
    return
  }
  await query(
    `UPDATE chat_sessions SET messages = NULL, message_count = 0, updated_at = NOW()
     WHERE user_id = $1 AND course_id = $2`,
    [userId, courseId]
  )
}

/** @deprecated Use clearChatSessionForCourse — one row per course; this clears that row’s messages. */
export async function deleteChatSessionRow(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  await clearChatSessionForCourse(userId, courseId)
}

export async function deleteProgressByUserId(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    for (const key of DEV_PROGRESS.keys()) {
      if (key.startsWith(`${userId}:`)) DEV_PROGRESS.delete(key)
    }
    progressCache.clear()
    return
  }
  await query('DELETE FROM progress WHERE user_id = $1', [userId])
  progressCache.clear()
}

export async function deleteChatSessionsByUserId(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    for (const key of DEV_CHAT_SESSIONS.keys()) {
      if (key.startsWith(`${userId}:`)) DEV_CHAT_SESSIONS.delete(key)
    }
    return
  }
  await query('DELETE FROM chat_sessions WHERE user_id = $1', [userId])
}

export async function getProgressRowsByUserId(userId, courseId = null) {
  if (initializeDatabase() === 'DEV_MODE') {
    return Array.from(DEV_PROGRESS.values()).filter(
      (p) =>
        String(p.user_id) === String(userId) &&
        (courseId == null || p.course_id === courseId)
    )
  }
  if (courseId != null) {
    const { rows } = await query(
      'SELECT * FROM progress WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    )
    return rows || []
  }
  const { rows } = await query('SELECT * FROM progress WHERE user_id = $1', [userId])
  return rows || []
}

export async function getChatSessionRowsByUserId(userId, courseId = null) {
  if (initializeDatabase() === 'DEV_MODE') {
    const list = []
    for (const [key, row] of DEV_CHAT_SESSIONS.entries()) {
      if (!key.startsWith(`${userId}:`)) continue
      if (courseId != null && row.course_id !== courseId) continue
      list.push(row)
    }
    return list
  }
  if (courseId != null) {
    const { rows } = await query(
      'SELECT * FROM chat_sessions WHERE user_id = $1 AND course_id = $2',
      [userId, courseId]
    )
    return rows || []
  }
  const { rows } = await query('SELECT * FROM chat_sessions WHERE user_id = $1', [userId])
  return rows || []
}

// Backward compatibility: no Supabase client
export function getSupabaseClient() {
  if (initializeDatabase() === 'DEV_MODE') return 'DEV_MODE'
  return { _neon: true, query }
}

/** Clear all data (for tests). DEV_MODE: clears in-memory maps. Otherwise: DELETEs in FK order. */
export async function clearTestDatabase() {
  if (initializeDatabase() === 'DEV_MODE') {
    DEV_CHAT_SESSIONS.clear()
    DEV_PROGRESS.clear()
    DEV_USERS.clear()
    return
  }
  await query('DELETE FROM chat_sessions')
  await query('DELETE FROM progress')
  await query('DELETE FROM users')
}

export { initializeDatabase }
