/**
 * Rate Limiting Middleware
 * Per-identifier limits (IP or user). Use Redis in production for multi-instance.
 */

const RATE_LIMIT = Math.max(1, parseInt(process.env.RATE_LIMIT_PER_MINUTE, 10) || 20)
const RATE_WINDOW = 60 * 1000 // 1 minute
const MAX_TRACKED_KEYS = 10000
const EVICTION_INTERVAL = 5 * 60 * 1000 // 5 minutes

const rateLimiter = new Map()

setInterval(() => {
  const now = Date.now()
  for (const [key, requests] of rateLimiter.entries()) {
    const valid = requests.filter(ts => now - ts < RATE_WINDOW)
    if (valid.length === 0) {
      rateLimiter.delete(key)
    } else {
      rateLimiter.set(key, valid)
    }
  }
}, EVICTION_INTERVAL).unref()

/**
 * Check if user has exceeded rate limit
 * @param {string} userId - User identifier
 * @returns {boolean} - True if within limit, false if exceeded
 */
export function checkRateLimit(userId) {
  const now = Date.now()
  const userRequests = rateLimiter.get(userId) || []
  
  const validRequests = userRequests.filter(timestamp => now - timestamp < RATE_WINDOW)
  
  if (rateLimiter.size > MAX_TRACKED_KEYS && !rateLimiter.has(userId)) {
    return true
  }

  rateLimiter.set(userId, validRequests)
  
  if (validRequests.length >= RATE_LIMIT) {
    return false
  }
  
  validRequests.push(now)
  rateLimiter.set(userId, validRequests)
  
  return true
}

/**
 * Express middleware for rate limiting
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object  
 * @param {Function} next - Express next function
 */
export function rateLimitMiddleware(req, res, next) {
  // Use IP address for unauthenticated requests, user ID for authenticated
  const identifier = req.user?.userId || req.ip || 'anonymous'
  
  if (!checkRateLimit(identifier)) {
    const retryAfterSec = Math.ceil(RATE_WINDOW / 1000)
    res.setHeader('Retry-After', String(retryAfterSec))
    return res.status(429).json({
      success: false,
      message: 'Too many requests. Please wait a moment before trying again.',
      retryAfter: retryAfterSec
    })
  }
  next()
}