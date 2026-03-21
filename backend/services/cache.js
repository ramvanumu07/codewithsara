/**
 * Redis Cache Service
 * Distributed caching for production scalability
 */

import { createRequire } from 'module'

// CJS bundle (Netlify/Lambda): use ambient require. ESM (local): createRequire(import.meta.url)
let req
try { req = require } catch (_) { req = createRequire(import.meta.url) }

import { logInfo as _logInfo, logError as _logError, logWarn as _logWarn } from './logger.js'

// Graceful import with fallback for missing dependencies (sync for CJS bundling)
let Redis = null
try {
  const redisModule = req('ioredis')
  Redis = redisModule.default || redisModule
} catch (error) {
  console.warn('Redis module not installed. Using in-memory cache fallback.')
}

let logInfo = _logInfo
let logError = _logError
let logWarn = _logWarn

let redisClient = null
let isConnected = false

// Initialize Redis connection
export const initializeCache = () => {
  if (process.env.NODE_ENV === 'test') {
    // Use in-memory cache for tests
    return initializeMemoryCache()
  }
  if (!Redis) {
    // ioredis failed to load (e.g. serverless bundle) - use memory cache
    return initializeMemoryCache()
  }

  // Skip Redis when REDIS_URL is not set (avoids ECONNREFUSED spam + log writes that trigger node --watch restarts)
  const redisUrl = process.env.REDIS_URL
  if (!redisUrl || !redisUrl.trim()) {
    logInfo('Redis not configured (REDIS_URL empty). Using in-memory cache.')
    return initializeMemoryCache()
  }

  try {
    redisClient = new Redis(redisUrl, {
      retryDelayOnFailover: 100,
      enableReadyCheck: true,
      maxRetriesPerRequest: 3,
      lazyConnect: true,
      keyPrefix: 'sara:',
      reconnectOnError: (err) => {
        const targetError = 'READONLY'
        const msg = err && typeof err.message === 'string' ? err.message : (err && err.message !== null && err.message !== undefined ? String(err.message) : '')
        return msg.includes(targetError)
      }
    })

    redisClient.on('connect', () => {
      logInfo('Redis cache connected')
      isConnected = true
    })

    redisClient.on('error', (error) => {
      logError('Redis cache error', error)
      isConnected = false
    })

    redisClient.on('close', () => {
      logWarn('Redis cache connection closed')
      isConnected = false
    })

    // Test connection
    redisClient.ping().catch((error) => {
      logError('Redis ping failed, falling back to memory cache', error)
      initializeMemoryCache()
    })

  } catch (error) {
    logError('Redis initialization failed, using memory cache', error)
    initializeMemoryCache()
  }
}

// Fallback in-memory cache
const memoryCache = new Map()
const memoryExpiry = new Map()
let memoryCacheInitialized = false

const MAX_MEMORY_CACHE_KEYS = 5000

const initializeMemoryCache = () => {
  if (memoryCacheInitialized) return
  memoryCacheInitialized = true

  logWarn('Using in-memory cache (not suitable for production scaling)')
  isConnected = false
  
  setInterval(() => {
    const now = Date.now()
    for (const [key, expiry] of memoryExpiry.entries()) {
      if (expiry < now) {
        memoryCache.delete(key)
        memoryExpiry.delete(key)
      }
    }
  }, 5 * 60 * 1000).unref()
}

// Cache operations
export const get = async (key) => {
  try {
    if (isConnected && redisClient) {
      const value = await redisClient.get(key)
      return value ? JSON.parse(value) : null
    } else {
      // Memory cache fallback
      const expiry = memoryExpiry.get(key)
      if (expiry && expiry < Date.now()) {
        memoryCache.delete(key)
        memoryExpiry.delete(key)
        return null
      }
      return memoryCache.get(key) || null
    }
  } catch (error) {
    logError('Cache get error', error, { key })
    return null
  }
}

export const set = async (key, value, ttlSeconds = 3600) => {
  try {
    if (isConnected && redisClient) {
      await redisClient.setex(key, ttlSeconds, JSON.stringify(value))
    } else {
      if (memoryCache.size >= MAX_MEMORY_CACHE_KEYS && !memoryCache.has(key)) {
        const firstKey = memoryCache.keys().next().value
        memoryCache.delete(firstKey)
        memoryExpiry.delete(firstKey)
      }
      memoryCache.set(key, value)
      memoryExpiry.set(key, Date.now() + (ttlSeconds * 1000))
    }
    return true
  } catch (error) {
    logError('Cache set error', error, { key })
    return false
  }
}

export const del = async (key) => {
  try {
    if (isConnected && redisClient) {
      await redisClient.del(key)
    } else {
      // Memory cache fallback
      memoryCache.delete(key)
      memoryExpiry.delete(key)
    }
    return true
  } catch (error) {
    logError('Cache delete error', error, { key })
    return false
  }
}

export const exists = async (key) => {
  try {
    if (isConnected && redisClient) {
      return await redisClient.exists(key) === 1
    } else {
      // Memory cache fallback
      const expiry = memoryExpiry.get(key)
      if (expiry && expiry < Date.now()) {
        memoryCache.delete(key)
        memoryExpiry.delete(key)
        return false
      }
      return memoryCache.has(key)
    }
  } catch (error) {
    logError('Cache exists error', error, { key })
    return false
  }
}

export const increment = async (key, amount = 1) => {
  try {
    if (isConnected && redisClient) {
      return await redisClient.incrby(key, amount)
    } else {
      // Memory cache fallback
      const current = memoryCache.get(key) || 0
      const newValue = current + amount
      memoryCache.set(key, newValue)
      return newValue
    }
  } catch (error) {
    logError('Cache increment error', error, { key })
    return 0
  }
}

export const expire = async (key, ttlSeconds) => {
  try {
    if (isConnected && redisClient) {
      await redisClient.expire(key, ttlSeconds)
    } else {
      // Memory cache fallback
      memoryExpiry.set(key, Date.now() + (ttlSeconds * 1000))
    }
    return true
  } catch (error) {
    logError('Cache expire error', error, { key })
    return false
  }
}

export const clearCache = async (pattern = '*') => {
  try {
    if (isConnected && redisClient) {
      let cursor = '0'
      do {
        const [nextCursor, keys] = await redisClient.scan(cursor, 'MATCH', pattern, 'COUNT', 100)
        cursor = nextCursor
        if (keys.length > 0) {
          await redisClient.del(...keys)
        }
      } while (cursor !== '0')
    } else {
      // Memory cache fallback
      if (pattern === '*') {
        memoryCache.clear()
        memoryExpiry.clear()
      } else {
        // Simple pattern matching for memory cache
        for (const key of memoryCache.keys()) {
          if (key.includes(pattern.replace('*', ''))) {
            memoryCache.delete(key)
            memoryExpiry.delete(key)
          }
        }
      }
    }
    logInfo('Cache cleared', { pattern })
    return true
  } catch (error) {
    logError('Cache clear error', error, { pattern })
    return false
  }
}

export const getCacheStats = async () => {
  try {
    if (isConnected && redisClient) {
      const info = await redisClient.info('memory')
      return {
        type: 'redis',
        connected: isConnected,
        info
      }
    } else {
      return {
        type: 'memory',
        connected: false,
        size: memoryCache.size,
        keys: Array.from(memoryCache.keys())
      }
    }
  } catch (error) {
    logError('Cache stats error', error)
    return { type: 'unknown', connected: false }
  }
}

export default {
  initializeCache,
  get,
  set,
  del,
  exists,
  increment,
  expire,
  clearCache,
  getCacheStats
}