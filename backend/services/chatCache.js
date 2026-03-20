/**
 * Chat history caching – one row per (user, course) in DB. Key: chat_history:userId:courseId.
 * Stored payload includes topicId so a cache hit only applies to the same topic.
 */

import { get, set, del } from './cache.js'
import { DEFAULT_COURSE_ID } from '../config/defaultCourse.js'

const CACHE_KEY_PREFIX = 'chat_history:'
const CHAT_HISTORY_TTL_SECONDS = 5 * 60 // 5 minutes
const MAX_CACHE_SIZE = 1000

function getCacheKey(userId, courseId = DEFAULT_COURSE_ID) {
  return `${CACHE_KEY_PREFIX}${userId}:${courseId}`
}

export async function getCachedChatHistory(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  try {
    const cacheKey = getCacheKey(userId, courseId)
    const data = await get(cacheKey)
    if (!data || typeof data !== 'object' || !data.messages) return null
    if (String(data.topicId || '') !== String(topicId || '')) return null
    const now = Date.now()
    if (now - (data.timestamp || 0) >= CHAT_HISTORY_TTL_SECONDS * 1000) {
      await del(cacheKey)
      return null
    }
    return data.messages
  } catch (error) {
    console.warn('Cache read error:', error.message)
    return null
  }
}

export async function setCachedChatHistory(userId, topicId, messages, courseId = DEFAULT_COURSE_ID) {
  try {
    const cacheKey = getCacheKey(userId, courseId)
    await set(cacheKey, {
      messages,
      topicId,
      timestamp: Date.now(),
      messageCount: (messages && messages.length) || 0
    }, CHAT_HISTORY_TTL_SECONDS)
  } catch (error) {
    console.warn('Cache write error:', error.message)
  }
}

export async function invalidateChatHistoryCache(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  try {
    await del(getCacheKey(userId, courseId))
  } catch (error) {
    console.warn('Cache invalidation error:', error.message)
  }
}

export async function getCacheStats() {
  try {
    return {
      totalEntries: 0,
      maxSize: MAX_CACHE_SIZE,
      ttlMinutes: CHAT_HISTORY_TTL_SECONDS / 60,
      cacheHitRate: 'Not implemented'
    }
  } catch (error) {
    console.warn('Cache stats error:', error.message)
    return { totalEntries: 0, maxSize: MAX_CACHE_SIZE, ttlMinutes: CHAT_HISTORY_TTL_SECONDS / 60, error: error.message }
  }
}

export default {
  getCachedChatHistory,
  setCachedChatHistory,
  invalidateChatHistoryCache,
  getCacheStats
}