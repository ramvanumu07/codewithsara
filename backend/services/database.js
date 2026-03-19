/**
 * Database Service - Sara Learning Platform
 * Uses Neon (Postgres) via pg. Set DATABASE_URL in .env.
 * DEV_MODE when DATABASE_URL is missing or placeholder.
 */

import { query, getPool } from './db.js'
import { withPerformanceLogging, progressCache } from '../middleware/performance.js'

// ============ INIT ============
function isDevMode() {
  const url = process.env.DATABASE_URL
  return !url || url.includes('your_') || url.includes('placeholder')
}

// Development mode fallback data
const DEV_USERS = new Map()
const DEV_PROGRESS = new Map()
const DEV_CHAT_SESSIONS = new Map() // key: `${userId}:${topicId}`

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

export async function getProgress(userId, topicId) {
  const cacheKey = `progress:${userId}:${topicId}`
  const cached = progressCache.get(cacheKey)
  if (cached) return cached

  return await withPerformanceLogging(async () => {
    if (initializeDatabase() === 'DEV_MODE') {
      const progress = DEV_PROGRESS.get(`${userId}:${topicId}`)
      if (progress) progressCache.set(cacheKey, progress)
      return progress || null
    }
    const { rows } = await query(
      'SELECT * FROM progress WHERE user_id = $1 AND topic_id = $2',
      [userId, topicId]
    )
    const data = rows[0] || null
    if (data) progressCache.set(cacheKey, data)
    return data
  }, `getProgress(${topicId})`)
}

export async function upsertProgress(userId, topicId, updates) {
  return await withPerformanceLogging(async () => {
    if (initializeDatabase() === 'DEV_MODE') {
      const key = `${userId}:${topicId}`
      const existing = DEV_PROGRESS.get(key) || {}
      const newProgress = {
        user_id: userId,
        topic_id: topicId,
        ...existing,
        ...updates,
        updated_at: new Date().toISOString()
      }
      DEV_PROGRESS.set(key, newProgress)
      progressCache.set(`progress:${userId}:${topicId}`, newProgress)
      return newProgress
    }
    const allowed = ['phase', 'status', 'current_task', 'total_tasks', 'assignments_completed', 'topic_id']
    const safe = {}
    for (const k of allowed) {
      if (Object.prototype.hasOwnProperty.call(updates, k) && updates[k] !== undefined) safe[k] = updates[k]
    }
    const existing = await query('SELECT * FROM progress WHERE user_id = $1 AND topic_id = $2', [userId, topicId])
    const merged = {
      phase: safe.phase ?? existing.rows[0]?.phase ?? null,
      status: safe.status ?? existing.rows[0]?.status ?? null,
      current_task: safe.current_task ?? existing.rows[0]?.current_task ?? null,
      total_tasks: safe.total_tasks ?? existing.rows[0]?.total_tasks ?? null,
      assignments_completed: safe.assignments_completed ?? existing.rows[0]?.assignments_completed ?? 0
    }
    const { rows } = await query(
      `INSERT INTO progress (user_id, topic_id, phase, status, current_task, total_tasks, assignments_completed, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
       ON CONFLICT (user_id, topic_id) DO UPDATE SET
         phase = EXCLUDED.phase,
         status = EXCLUDED.status,
         current_task = EXCLUDED.current_task,
         total_tasks = EXCLUDED.total_tasks,
         assignments_completed = EXCLUDED.assignments_completed,
         updated_at = NOW()
       RETURNING *`,
      [userId, topicId, merged.phase, merged.status, merged.current_task, merged.total_tasks, merged.assignments_completed]
    )
    const data = rows[0]
    if (data) progressCache.set(`progress:${userId}:${topicId}`, data)
    return data
  }, `upsertProgress(${topicId})`)
}

export async function getAllProgress(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    const list = []
    for (const [, p] of DEV_PROGRESS.entries()) {
      if (p && String(p.user_id) === String(userId)) list.push(p)
    }
    list.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
    return list
  }
  const { rows } = await query(
    'SELECT * FROM progress WHERE user_id = $1 ORDER BY updated_at DESC',
    [userId]
  )
  return rows || []
}

export async function getCompletedTopics(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    const list = []
    for (const [, p] of DEV_PROGRESS.entries()) {
      if (p && String(p.user_id) === String(userId) && p.status === 'completed') list.push(p.topic_id)
    }
    return list
  }
  const { rows } = await query(
    'SELECT topic_id FROM progress WHERE user_id = $1 AND status = $2',
    [userId, 'completed']
  )
  return (rows || []).map((r) => r.topic_id)
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

export async function getChatSessionRow(userId, topicId) {
  if (initializeDatabase() === 'DEV_MODE') {
    const row = DEV_CHAT_SESSIONS.get(`${userId}:${topicId}`)
    return row ? { messages: row.messages, message_count: row.message_count } : null
  }
  const { rows } = await query(
    'SELECT messages, message_count FROM chat_sessions WHERE user_id = $1 AND topic_id = $2',
    [userId, topicId]
  )
  return rows[0] || null
}

/** Full row for debug endpoints. */
export async function getChatSessionRaw(userId, topicId) {
  if (initializeDatabase() === 'DEV_MODE') {
    return DEV_CHAT_SESSIONS.get(`${userId}:${topicId}`) || null
  }
  const { rows } = await query(
    'SELECT * FROM chat_sessions WHERE user_id = $1 AND topic_id = $2',
    [userId, topicId]
  )
  return rows[0] || null
}

export async function upsertChatSessionRow(userId, topicId, payload) {
  if (initializeDatabase() === 'DEV_MODE') {
    const key = `${userId}:${topicId}`
    const existing = DEV_CHAT_SESSIONS.get(key) || {}
    DEV_CHAT_SESSIONS.set(key, { ...existing, ...payload, user_id: userId, topic_id: topicId })
    return
  }
  await query(
    `INSERT INTO chat_sessions (user_id, topic_id, messages, message_count, phase, last_message_at, updated_at)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     ON CONFLICT (user_id, topic_id) DO UPDATE SET
       messages = EXCLUDED.messages,
       message_count = EXCLUDED.message_count,
       phase = EXCLUDED.phase,
       last_message_at = EXCLUDED.last_message_at,
       updated_at = EXCLUDED.updated_at`,
    [
      userId,
      topicId,
      payload.messages,
      payload.message_count,
      payload.phase ?? 'session',
      payload.last_message_at ?? new Date().toISOString(),
      payload.updated_at ?? new Date().toISOString()
    ]
  )
}

export async function deleteChatSessionRow(userId, topicId) {
  if (initializeDatabase() === 'DEV_MODE') {
    DEV_CHAT_SESSIONS.delete(`${userId}:${topicId}`)
    return
  }
  await query('DELETE FROM chat_sessions WHERE user_id = $1 AND topic_id = $2', [userId, topicId])
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

export async function getProgressRowsByUserId(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    return Array.from(DEV_PROGRESS.values()).filter((p) => String(p.user_id) === String(userId))
  }
  const { rows } = await query('SELECT * FROM progress WHERE user_id = $1', [userId])
  return rows || []
}

export async function getChatSessionRowsByUserId(userId) {
  if (initializeDatabase() === 'DEV_MODE') {
    const list = []
    for (const [key, row] of DEV_CHAT_SESSIONS.entries()) {
      if (key.startsWith(`${userId}:`)) list.push(row)
    }
    return list
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
