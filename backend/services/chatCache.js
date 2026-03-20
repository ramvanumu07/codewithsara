/**
 * Chat history caching – uses cache.js (Redis or in-memory). Key: chat_history:userId:courseId:topicId.
 */

import { get, set, del } from './cache.js'
import { DEFAULT_COURSE_ID } from '../config/defaultCourse.js'

const CACHE_KEY_PREFIX = 'chat_history:'
const CHAT_HISTORY_TTL_SECONDS = 5 * 60 // 5 minutes
const MAX_CACHE_SIZE = 1000

function getCacheKey(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  return `${CACHE_KEY_PREFIX}${userId}:${courseId}:${topicId}`
}

export async function getCachedChatHistory(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  try {
    const cacheKey = getCacheKey(userId, topicId, courseId)
    const data = await get(cacheKey)
    if (!data || typeof data !== 'object' || !data.messages) return null
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
    const cacheKey = getCacheKey(userId, topicId, courseId)
    await set(cacheKey, {
      messages,
      timestamp: Date.now(),
      messageCount: (messages && messages.length) || 0
    }, CHAT_HISTORY_TTL_SECONDS)
  } catch (error) {
    console.warn('Cache write error:', error.message)
  }
}

export async function invalidateChatHistoryCache(userId, topicId, courseId = DEFAULT_COURSE_ID) {
  try {
    await del(getCacheKey(userId, topicId, courseId))
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