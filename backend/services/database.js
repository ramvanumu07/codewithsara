/**
 * Database Service - Sara Learning Platform
 * Industry-level database operations with single-topic architecture
 */

import { createClient } from '@supabase/supabase-js'
import { withPerformanceLogging, progressCache } from '../middleware/performance.js'

// ============ SUPABASE CLIENT ============
let supabase = null

// Development mode fallback data
const DEV_USERS = new Map()
const DEV_PROGRESS = new Map()
const _DEV_CHAT_SESSIONS = new Map()

// Initialize database connection
function initializeDatabase() {
  if (supabase) {return supabase}

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY

  // Check if we have placeholder values (development mode)
  const isPlaceholderConfig = !supabaseUrl || !supabaseKey ||
    supabaseUrl.includes('your_') || supabaseKey.includes('your_')

  if (isPlaceholderConfig) {
    return 'DEV_MODE' // Special marker for development mode
  }

  supabase = createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'public' },
    auth: { autoRefreshToken: false, persistSession: false },
    global: { headers: { 'x-application-name': 'sara-api' } }
  })
  return supabase
}

// ============ USER OPERATIONS ============

/** Escape a string for use in ILIKE so it matches literally (no wildcards). */
function escapeIlike(str) {
  if (typeof str !== 'string') {return ''}
  return str.replace(/\\/g, '\\\\').replace(/%/g, '\\%').replace(/_/g, '\\_')
}

export async function createUser(username, name, hashedPassword, securityQuestion = null, securityAnswer = null) {
  const client = initializeDatabase()

  // Development mode fallback
  if (client === 'DEV_MODE') {
    const lower = username.toLowerCase()
    for (const key of DEV_USERS.keys()) {
      if (key.toLowerCase() === lower) {
        throw new Error('Username already exists')
      }
    }

    const userId = Date.now().toString()
    const user = {
      id: userId,
      username,
      name,
      password: hashedPassword,
      security_question: securityQuestion,
      security_answer: securityAnswer,
      token_version: 0,
      created_at: new Date().toISOString()
    }
    DEV_USERS.set(username, user)
    return user
  }

  const existingByUsername = await getUserByUsername(username)
  if (existingByUsername) {
    throw new Error('Username already exists')
  }

  const userData = {
    username,
    name,
    password: hashedPassword,
    token_version: 0
  }
  if (securityQuestion && securityQuestion.trim()) {
    userData.security_question = securityQuestion.trim()
  }
  if (securityAnswer && securityAnswer.trim()) {
    userData.security_answer = securityAnswer.trim()
  }

  const { data, error } = await client
    .from('users')
    .insert(userData)
    .select()
    .single()

  if (error) {
    if (error.code === '23505' && error.message.includes('username')) {
      throw new Error('Username already exists')
    }
    throw new Error(`Failed to create user: ${error.message}`)
  }
  return data
}

export async function getUserById(userId) {
  const client = initializeDatabase()

  // Development mode fallback
  if (client === 'DEV_MODE') {
    for (const user of DEV_USERS.values()) {
      if (user.id === userId) {
        return user
      }
    }
    return null
  }

  const { data, error } = await client
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    } else {
      throw new Error(`Failed to get user by ID: ${error.message}`)
    }
  }

  return data
}

export async function getUserByUsername(username) {
  const client = initializeDatabase()

  if (client === 'DEV_MODE') {
    const lower = (username || '').toLowerCase()
    for (const [key, user] of DEV_USERS.entries()) {
      if (key.toLowerCase() === lower) {return user}
    }
    return null
  }

  // Case-insensitive lookup: ILIKE with escaped value for exact match
  const pattern = escapeIlike(username || '')
  const { data, error } = await client
    .from('users')
    .select('*')
    .ilike('username', pattern)
    .maybeSingle()

  if (error) {
    if (error.code === 'PGRST116') {
      return null
    } else {
      throw new Error(`Failed to get user by username: ${error.message}`)
    }
  }

  return data
}

export async function getTokenVersion(userId) {
  const client = initializeDatabase()
  if (client === 'DEV_MODE') {
    for (const user of DEV_USERS.values()) {
      if (user.id === userId) {
        return user.token_version ?? 0
      }
    }
    return 0
  }
  const { data, error } = await client
    .from('users')
    .select('token_version')
    .eq('id', userId)
    .single()
  if (error || !data) {
    return 0
  }
  return data.token_version ?? 0
}

export async function bumpTokenVersion(userId) {
  const client = initializeDatabase()
  if (client === 'DEV_MODE') {
    for (const user of DEV_USERS.values()) {
      if (user.id === userId) {
        user.token_version = (user.token_version ?? 0) + 1
        return user.token_version
      }
    }
    return 1
  }
  const current = await getTokenVersion(userId)
  const next = current + 1
  const { error } = await client
    .from('users')
    .update({ token_version: next, updated_at: new Date().toISOString() })
    .eq('id', userId)
  if (error) {
    throw new Error(`Failed to bump token version: ${error.message}`)
  }
  return next
}

export async function updateUserProfile(userId, updates) {
  const client = initializeDatabase()
  const { data, error } = await client
    .from('users')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {
    if (error.code === '23505' && error.message.includes('username')) {
      throw new Error('Username already exists')
    }
    throw new Error(`Failed to update user profile: ${error.message}`)
  }
  return data
}

export async function updateLastLogin(userId) {
  const client = initializeDatabase()
  const { error } = await client
    .from('users')
    .update({
      last_login: new Date().toISOString(),
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)

  if (error) {throw new Error(`Failed to update last login: ${error.message}`)}
}

export async function isAdmin(userId) {
  const client = initializeDatabase()
  if (client === 'DEV_MODE') {
    return true
  }
  const { data } = await client
    .from('admins')
    .select('id')
    .eq('user_id', userId)
    .single()

  return !!data
}

// ============ PROGRESS OPERATIONS ============

export async function getProgress(userId, topicId) {
  const cacheKey = `progress:${userId}:${topicId}`

  // Check cache first
  const cached = progressCache.get(cacheKey)
  if (cached) {
    return cached
  }

  return await withPerformanceLogging(async () => {
    const client = initializeDatabase()

    // Development mode fallback
    if (client === 'DEV_MODE') {
      const progressKey = `${userId}:${topicId}`
      const progress = DEV_PROGRESS.get(progressKey)
      if (progress) {
        progressCache.set(cacheKey, progress)
      }
      return progress || null
    }

    const { data, error } = await client
      .from('progress')
      .select('*')
      .eq('user_id', userId)
      .eq('topic_id', topicId)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw new Error(`Failed to get progress: ${error.message}`)
    }

    // Cache the result
    if (data) {
      progressCache.set(cacheKey, data)
    }

    return data
  }, `getProgress(${topicId})`)
}

export async function upsertProgress(userId, topicId, updates) {
  return await withPerformanceLogging(async () => {
    const client = initializeDatabase()

    // Development mode fallback
    if (client === 'DEV_MODE') {
      const progressKey = `${userId}:${topicId}`
      const existingProgress = DEV_PROGRESS.get(progressKey) || {}
      const newProgress = {
        user_id: userId,
        topic_id: topicId,
        ...existingProgress,
        ...updates,
        updated_at: new Date().toISOString()
      }
      DEV_PROGRESS.set(progressKey, newProgress)

      // Update cache
      const cacheKey = `progress:${userId}:${topicId}`
      progressCache.set(cacheKey, newProgress)

      return newProgress
    }

    // Only send columns that exist on progress table (after migration 001: no last_accessed, etc.)
    const allowed = ['phase', 'status', 'current_task', 'total_tasks', 'assignments_completed', 'updated_at', 'topic_id']
    const safeUpdates = {}
    for (const key of allowed) {
      if (Object.prototype.hasOwnProperty.call(updates, key) && updates[key] !== undefined) {
        safeUpdates[key] = updates[key]
      }
    }
    const payload = {
      user_id: userId,
      topic_id: topicId,
      ...safeUpdates,
      updated_at: new Date().toISOString()
    }

    const { data, error } = await client
      .from('progress')
      .upsert(payload, { onConflict: 'user_id,topic_id' })
      .select()
      .single()

    if (error) {throw new Error(`Failed to update progress: ${error.message}`)}

    // Invalidate and update cache
    const cacheKey = `progress:${userId}:${topicId}`
    progressCache.set(cacheKey, data)

    return data
  }, `upsertProgress(${topicId})`)
}

export async function getAllProgress(userId) {
  const client = initializeDatabase()

  // Development mode: read from in-memory map (so /continue and /progress work without Supabase)
  if (client === 'DEV_MODE') {
    const list = []
    for (const [, p] of DEV_PROGRESS.entries()) {
      if (p && String(p.user_id) === String(userId)) {
        list.push(p)
      }
    }
    list.sort((a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0))
    return list
  }

  const { data, error } = await client
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .order('updated_at', { ascending: false })

  if (error) {
    throw new Error(`Failed to get all progress: ${error.message}`)
  }
  return data || []
}

export async function getCompletedTopics(userId) {
  const client = initializeDatabase()
  const { data, error } = await client
    .from('progress')
    .select('topic_id')
    .eq('user_id', userId)
    .eq('status', 'completed')

  if (error) {throw new Error(`Failed to get completed topics: ${error.message}`)}
  return data ? data.map(row => row.topic_id) : []
}

// ============ PASSWORD UPDATE ============

export async function updateUserPassword(userId, hashedPassword) {
  const client = initializeDatabase()

  // Development mode fallback
  if (client === 'DEV_MODE') {
    for (const [_username, user] of DEV_USERS.entries()) {
      if (user.id === userId) {
        user.password = hashedPassword
        user.updated_at = new Date().toISOString()
        return user
      }
    }
    throw new Error('User not found in development mode')
  }

  const { data, error } = await client
    .from('users')
    .update({
      password: hashedPassword,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single()

  if (error) {throw new Error(`Failed to update password: ${error.message}`)}
  return data
}

// ============ COURSE UNLOCKS (per-course access after payment) ============

const DEV_COURSE_UNLOCKS = new Map() // key: `${username}:${courseId}`
const DEV_UNLOCK_SLOTS = new Map()   // key: id (UUID), value: { id, course_id, username }

function randomUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export async function getUnlockedCourseIds(userId) {
  const client = initializeDatabase()
  const user = await getUserById(userId)
  const username = user?.username || null
  if (!username) {return []}

  if (client === 'DEV_MODE') {
    const fromMap = Array.from(DEV_COURSE_UNLOCKS.keys()).filter(k => k.startsWith(`${username}:`))
    const fromSlots = Array.from(DEV_UNLOCK_SLOTS.values()).filter(s => s.username === username).map(s => s.course_id)
    return [...new Set([...fromMap.map(k => k.split(':')[1]), ...fromSlots])]
  }
  const { data, error } = await client
    .from('user_course_unlocks')
    .select('course_id')
    .eq('username', username)
  if (error) {throw new Error(`Failed to get unlocked courses: ${error.message}`)}
  return (data || []).map(row => row.course_id)
}

export async function isCourseUnlockedForUser(userId, courseId) {
  const unlocked = await getUnlockedCourseIds(userId)
  return unlocked.includes(courseId)
}

export async function unlockCourseForUser(userId, courseId) {
  const client = initializeDatabase()
  const user = await getUserById(userId)
  const username = user?.username
  if (!username) {throw new Error('User not found')}
  if (client === 'DEV_MODE') {
    DEV_COURSE_UNLOCKS.set(`${username}:${courseId}`, { username, courseId, unlocked_at: new Date().toISOString() })
    return { username, course_id: courseId, unlocked_at: new Date().toISOString() }
  }
  const { data, error } = await client
    .from('user_course_unlocks')
    .upsert(
      { username, course_id: courseId, unlocked_at: new Date().toISOString() },
      { onConflict: ['username', 'course_id'] }
    )
    .select()
    .single()
  if (error) {throw new Error(`Failed to unlock course: ${error.message}`)}
  return data
}

/** Create an unused unlock slot (admin only). Returns { id, course_id }. */
export async function createUnlockSlot(courseId) {
  const client = initializeDatabase()
  if (client === 'DEV_MODE') {
    const id = randomUUID()
    DEV_UNLOCK_SLOTS.set(id, { id, course_id: courseId, username: null })
    return { id, course_id: courseId }
  }
  const { data, error } = await client
    .from('user_course_unlocks')
    .insert({ username: null, course_id: courseId })
    .select('id, course_id')
    .single()
  if (error) {throw new Error(`Failed to create unlock slot: ${error.message}`)}
  return { id: data.id, course_id: data.course_id }
}

/**
 * Redeem an unlock code. Returns { success, courseId } or throws for invalid/used.
 * Code is the row id. Updates the row with username so it becomes a normal unlock.
 */
export async function redeemUnlockCode(userId, codeId) {
  const id = (codeId || '').toString().trim()
  if (!id) {throw new Error('Code is required')}

  const user = await getUserById(userId)
  const username = user?.username
  if (!username) {throw new Error('User not found')}

  const client = initializeDatabase()
  if (client === 'DEV_MODE') {
    const slot = DEV_UNLOCK_SLOTS.get(id)
    if (!slot) {throw new Error('Invalid or already used code')}
    if (slot.username !== null && slot.username !== undefined) {throw new Error('Code already used')}
    slot.username = username
    DEV_COURSE_UNLOCKS.set(`${username}:${slot.course_id}`, { username, courseId: slot.course_id, unlocked_at: new Date().toISOString() })
    return { success: true, courseId: slot.course_id }
  }

  const { data: row, error: fetchError } = await client
    .from('user_course_unlocks')
    .select('id, username, course_id')
    .eq('id', id)
    .single()

  if (fetchError || !row) {throw new Error('Invalid or already used code')}
  if (row.username !== null && row.username !== undefined) {throw new Error('Code already used')}

  const { error: updateError } = await client
    .from('user_course_unlocks')
    .update({ username, unlocked_at: new Date().toISOString() })
    .eq('id', id)

  if (updateError) {throw new Error('Failed to redeem code')}
  return { success: true, courseId: row.course_id }
}

// Export the client for direct access if needed
export const getSupabaseClient = () => initializeDatabase()
export { initializeDatabase }