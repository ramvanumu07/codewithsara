/**
 * Performance middleware and in-memory cache helpers.
 * performanceMonitor: sets X-Response-Time. progressCache: used by database layer.
 */

// ============ PERFORMANCE MONITORING ============

export const performanceMonitor = (req, res, next) => {
  const startTime = process.hrtime.bigint()

  const originalJson = res.json
  res.json = function(data) {
    const endTime = process.hrtime.bigint()
    const duration = Number(endTime - startTime) / 1000000
    const logTimestamp = new Date().toISOString()

    res.set('X-Response-Time', `${duration.toFixed(2)}ms`)
    res.set('X-Timestamp', logTimestamp)

    return originalJson.call(this, data)
  }

  next()
}

// ============ DATABASE PERFORMANCE UTILITIES ============
// Stub for optional per-operation metrics; no-op by default.

export const withPerformanceLogging = async (operation) => {
  return await operation()
}

// ============ PERFORMANCE OPTIMIZATION UTILITIES ============

export const createCache = (ttlMs = 60000, maxSize = 5000) => {
  const cache = new Map()
  
  return {
    get: (key) => {
      const item = cache.get(key)
      if (!item) {return null}
      
      if (Date.now() > item.expires) {
        cache.delete(key)
        return null
      }
      
      return item.value
    },
    
    set: (key, value) => {
      if (cache.size >= maxSize && !cache.has(key)) {
        const firstKey = cache.keys().next().value
        cache.delete(firstKey)
      }
      cache.set(key, {
        value,
        expires: Date.now() + ttlMs
      })
    },
    
    delete: (key) => {
      return cache.delete(key)
    },
    
    clear: () => cache.clear(),
    size: () => cache.size
  }
}

// Cache for frequently accessed data
export const progressCache = createCache(30000) // 30 second TTL
// REMOVED: chatHistoryCache - causes reliability issues, use direct database access