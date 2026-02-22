/**
 * Rate Limiting Middleware
 * Per-identifier limits (IP or user). Use Redis in production for multi-instance.
 */

const RATE_LIMIT = Math.max(1, parseInt(process.env.RATE_LIMIT_PER_MINUTE, 10) || 20)
const RATE_WINDOW = 60 * 1000 // 1 minute

// In-memory store for rate limiting (use Redis in production)
const rateLimiter = new Map()

/**
 * Check if user has exceeded rate limit
 * @param {string} userId - User identifier
 * @returns {boolean} - True if within limit, false if exceeded
 */
export function checkRateLimit(userId) {
  const now = Date.now()
  const userRequests = rateLimiter.get(userId) || []
  
  // Filter out requests older than the rate window
  const validRequests = userRequests.filter(timestamp => now - timestamp < RATE_WINDOW)
  
  // Update the rate limiter with valid requests
  rateLimiter.set(userId, validRequests)
  
  // Check if user has exceeded the rate limit
  if (validRequests.length >= RATE_LIMIT) {
    return false // Rate limit exceeded
  }
  
  // Add current request timestamp
  validRequests.push(now)
  rateLimiter.set(userId, validRequests)
  
  return true // Within rate limit
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