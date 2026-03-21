/**
 * Authentication Routes - Sara Learning Platform
 * Enhanced authentication with signup, login, forgot password, and profile management
 */

import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
  createUser,
  getUserById,
  getUserByUsername,
  getUserByEmail,
  getUserByUsernameOrEmail,
  updateLastLogin,
  updateUserPassword,
  getTokenVersion,
  bumpTokenVersion,
  upsertProgress,
  getAllProgress,
  initializeDatabase,
  isAdmin
} from '../services/database.js'
import { getAllTopics } from '../utils/curriculum.js'
import { courses } from '../data/curriculum.js'
import { handleErrorResponse, createSuccessResponse, createErrorResponse } from '../utils/responses.js'
import { logError } from '../services/logger.js'
import { rateLimitMiddleware } from '../middleware/rateLimiting.js'
import { asyncHandler } from '../middleware/errorHandler.js'

const router = express.Router()

/** Same message for unknown user vs wrong password (reduces account enumeration). */
const LOGIN_FAILED_MESSAGE = 'Invalid username or password. Please try again or create an account.'

// ============ MIDDLEWARE ============

export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json(createErrorResponse('Access token required'))
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json(createErrorResponse('Invalid or expired token'))
    }

    try {
      const currentVersion = await getTokenVersion(decoded.userId)
      if ((decoded.token_version ?? 0) < currentVersion) {
        return res.status(401).json(createErrorResponse('Session expired. Please log in again.'))
      }

      req.user = {
        userId: decoded.userId,
        username: decoded.username,
        name: decoded.name
      }
      next()
    } catch (error) {
      return res.status(401).json(createErrorResponse('Session validation failed'))
    }
  })
}

// ============ VALIDATION FUNCTIONS ============

function validateUsername(username) {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/
  return usernameRegex.test(username)
}

function validatePassword(password) {
  if (!password) {return { isValid: false, errors: ['Password is required'] }}

  const errors = []

  // Length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }

  if (password.length > 128) {
    errors.push('Password must be no more than 128 characters long')
  }

  // Character requirements
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>?]/.test(password)) {
    errors.push('Password must contain at least one special character')
  }

  // Common passwords check
  const commonPasswords = [
    'password', 'password123', '123456', '123456789', 'qwerty', 'abc123',
    'password1', 'admin', 'letmein', 'welcome', 'monkey', '1234567890'
  ]

  if (commonPasswords.includes(password.toLowerCase())) {
    errors.push('This password is too common. Please choose a more unique password')
  }

  // Personal info validation removed as requested

  return {
    isValid: errors.length === 0,
    errors
  }
}

function validateName(name) {
  return name && name.trim().length >= 2
}

// ============ UTILITY FUNCTIONS ============

const JWT_EXPIRY = '30d' // Long-lived so users stay logged in

async function generateTokens(user) {
  if (!process.env.JWT_SECRET || process.env.JWT_SECRET.trim() === '') {
    throw new Error('Server configuration error: JWT_SECRET is not set. Add it in your environment (e.g. backend/.env or your hosting dashboard).')
  }
  const tokenVersion = user.token_version ?? 0
  const payload = {
    userId: user.id,
    username: user.username,
    name: user.name,
    token_version: tokenVersion
  }

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: JWT_EXPIRY })

  return {
    accessToken,
    expiresIn: 30 * 24 * 60 * 60 // 30 days in seconds
  }
}

async function generateToken(user) {
  const tokens = await generateTokens(user)
  return tokens.accessToken
}


// ============ AUTHENTICATION ROUTES ============

const usernameCheckLimiter = new Map()

setInterval(() => {
  const now = Date.now()
  for (const [key, requests] of usernameCheckLimiter.entries()) {
    const valid = requests.filter(ts => now - ts < 60_000)
    if (valid.length === 0) usernameCheckLimiter.delete(key)
    else usernameCheckLimiter.set(key, valid)
  }
}, 5 * 60 * 1000).unref()

function checkUsernameRateLimit(identifier) {
  const now = Date.now()
  const LIMIT = 60
  const WINDOW = 60 * 1000

  const userRequests = usernameCheckLimiter.get(identifier) || []
  const validRequests = userRequests.filter(timestamp => now - timestamp < WINDOW)

  if (usernameCheckLimiter.size > 10000 && !usernameCheckLimiter.has(identifier)) {
    return true
  }

  if (validRequests.length >= LIMIT) {
    return false
  }

  validRequests.push(now)
  usernameCheckLimiter.set(identifier, validRequests)
  return true
}

// Check username availability
router.get('/check-username/:username', async (req, res) => {
  // Apply lighter rate limiting for username checks
  const identifier = req.ip || 'anonymous'

  if (!checkUsernameRateLimit(identifier)) {
    return res.status(429).json({
      success: false,
      message: 'Too many username checks. Please wait a moment.',
      retryAfter: 60
    })
  }
  try {
    const { username } = req.params

    // Validate username format
    if (!validateUsername(username)) {
      return res.json({
        success: true,
        data: {
          available: false,
          reason: 'invalid_format',
          message: 'Username must be 3-20 characters and contain only letters, numbers, and underscores'
        }
      })
    }

    // Check if username exists
    const existingUser = await getUserByUsername(username)

    if (existingUser) {
      // Generate suggestions
      const suggestions = generateUsernameSuggestions(username)

      return res.json({
        success: true,
        data: {
          available: false,
          reason: 'taken',
          message: 'Username is already taken',
          suggestions
        }
      })
    }

    return res.json({
      success: true,
      data: {
        available: true,
        message: 'Username is available'
      }
    })

  } catch (error) {
    const code = error?.code || ''
    const msg = (error?.message || '').toLowerCase()
    if (code === '42P01' || msg.includes('does not exist') || msg.includes('relation')) {
      return res.status(503).json(createErrorResponse(
        'Database schema not applied. In Neon Console open your project → SQL Editor → New query. Paste the full contents of backend/database/schema.sql and click Run. Then try again.'
      ))
    }
    handleErrorResponse(res, error, 'check username')
  }
})

// Generate username suggestions
function generateUsernameSuggestions(username) {
  const suggestions = []
  const baseUsername = username.toLowerCase()

  // Add numbers
  for (let i = 1; i <= 3; i++) {
    suggestions.push(`${baseUsername}${i}`)
    suggestions.push(`${baseUsername}${Math.floor(Math.random() * 100)}`)
  }

  // Add common suffixes
  const suffixes = ['_dev', '_code', '_js', '_user', '_pro']
  suffixes.forEach(suffix => {
    suggestions.push(`${baseUsername}${suffix}`)
  })

  // Add year
  const currentYear = new Date().getFullYear()
  suggestions.push(`${baseUsername}${currentYear}`)

  // Remove duplicates and return first 5
  return [...new Set(suggestions)].slice(0, 5)
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false
  const trimmed = email.trim()
  if (!trimmed) return false
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(trimmed) && trimmed.length <= 254
}

router.post('/signup', rateLimitMiddleware, async (req, res) => {
  try {
    const { username, name, email, password, confirmPassword, securityQuestion, securityAnswer } = req.body

    if (!username || !name || !email || !password || !confirmPassword || !securityQuestion || !securityAnswer) {
      return res.status(400).json(createErrorResponse('All fields are required'))
    }

    if (!validateUsername(username)) {
      return res.status(400).json(createErrorResponse('Username must be 3-20 characters and contain only letters, numbers, and underscores'))
    }

    if (!validateName(name)) {
      return res.status(400).json(createErrorResponse('Name must be at least 2 characters long'))
    }

    if (!validateEmail(email)) {
      return res.status(400).json(createErrorResponse('Please enter a valid email address'))
    }

    const passwordValidation = validatePassword(password)
    if (!passwordValidation.isValid) {
      return res.status(400).json(createErrorResponse(passwordValidation.errors[0]))
    }

    if (password !== confirmPassword) {
      return res.status(400).json(createErrorResponse('Passwords do not match'))
    }

    const existingUsername = await getUserByUsername(username)
    if (existingUsername) {
      return res.status(409).json(createErrorResponse('Username already exists'))
    }
    const existingEmail = await getUserByEmail(email.trim())
    if (existingEmail) {
      return res.status(409).json(createErrorResponse('An account with this email already exists'))
    }

    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12')
    const hashedPassword = await bcrypt.hash(password, saltRounds)
    const hashedSecurityAnswer = await bcrypt.hash(securityAnswer.toLowerCase().trim(), saltRounds)

    const user = await createUser(username, name.trim(), hashedPassword, securityQuestion, hashedSecurityAnswer, email?.trim() || null)

    // Create first-topic progress row so new user has progress as soon as they exist (dashboard/continue work immediately)
    try {
      const firstTopic = Array.isArray(courses) && courses.length > 0 ? getAllTopics(courses)[0] : null
      if (firstTopic) {
        const totalTasks = (firstTopic.tasks || []).length
        await upsertProgress(user.id, firstTopic.id, {
          phase: 'session',
          status: 'in_progress',
          current_task: totalTasks > 0 ? 1 : 0,
          total_tasks: totalTasks,
          assignments_completed: 0,
          completed_topics_count: 0,
          updated_at: new Date().toISOString()
        }, firstTopic.courseId)
      }
    } catch (_progressErr) {
      // ignore progress init
    }

    // Generate token and create session
    const token = await generateToken(user)

    // Update last login
    await updateLastLogin(user.id)


    res.status(201).json(createSuccessResponse({
      message: 'Account created successfully',
      user: {
        id: user.id,
        username: user.username,
        name: user.name
      },
      token
    }))
  } catch (error) {
    if (error.message.includes('already exists')) {
      return res.status(409).json(createErrorResponse(error.message))
    }
    handleErrorResponse(res, error, 'signup')
  }
})

router.post('/login', rateLimitMiddleware, asyncHandler(async (req, res) => {
  try {
    const { username: rawInput, password } = req.body
    const input = typeof rawInput === 'string' ? rawInput.trim() : (rawInput != null ? String(rawInput) : '')

    if (!input || !password) {
      return res.status(400).json(createErrorResponse('Username or email and password are required'))
    }

    const user = await getUserByUsernameOrEmail(input)

    if (!user) {
      return res.status(401).json(createErrorResponse(LOGIN_FAILED_MESSAGE))
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json(createErrorResponse(LOGIN_FAILED_MESSAGE))
    }

    // Access is now per-course (unlock via payment). No account-level access check on login.

    // Generate tokens and create session
    const tokens = await generateTokens(user)

    // Update last login
    await updateLastLogin(user.id)

    // Ensure at least one progress row exists (covers existing users who never had progress, or any missed creation)
    try {
      const existingProgress = await getAllProgress(user.id)
      if (existingProgress.length === 0 && Array.isArray(courses) && courses.length > 0) {
        const firstTopic = getAllTopics(courses)[0]
        if (firstTopic) {
          const totalTasks = (firstTopic.tasks || []).length
          await upsertProgress(user.id, firstTopic.id, {
            phase: 'session',
            status: 'in_progress',
            current_task: totalTasks > 0 ? 1 : 0,
            total_tasks: totalTasks,
            assignments_completed: 0,
            completed_topics_count: 0,
            updated_at: new Date().toISOString()
          }, firstTopic.courseId)
        }
      }
    } catch (_progressErr) {
      // ignore progress init
    }

    const responseUserData = {
      id: user.id,
      username: user.username,
      name: user.name,
      lastLogin: user.last_login
    }

    res.json(createSuccessResponse({
      message: 'Login successful',
      user: responseUserData,
      accessToken: tokens.accessToken,
      expiresIn: tokens.expiresIn,
      token: tokens.accessToken
    }))
  } catch (error) {
    const safeMsg = (error && typeof error.message === 'string') ? error.message : (error && error.message !== null && error.message !== undefined ? String(error.message) : null) || 'Login failed'
    logError('[login] Error', error, { operation: 'login' })
    try {
      if (!res.headersSent) {
        handleErrorResponse(res, error, 'login')
      }
    } catch (handleErr) {
      if (!res.headersSent) {
        res.status(500).json(createErrorResponse(safeMsg, 'LOGIN_ERROR'))
      }
    }
  }
}))

router.post('/logout', authenticateToken, async (req, res) => {
  try {
    await bumpTokenVersion(req.user.userId)
    res.json(createSuccessResponse({ message: 'Logout successful' }))
  } catch (error) {
    handleErrorResponse(res, error, 'logout')
  }
})

// ============ PROFILE MANAGEMENT ============

router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = req.user
    res.json(createSuccessResponse({
      user: {
        id: user.userId,
        username: user.username,
        name: user.name
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get profile')
  }
})

// ============ SESSION VALIDATION ============

router.get('/validate', authenticateToken, async (req, res) => {
  try {
    const currentUser = await getUserById(req.user.userId)
    if (!currentUser) {
      return res.status(404).json(createErrorResponse('User not found'))
    }
    res.json(createSuccessResponse({
      valid: true,
      user: {
        id: currentUser.id,
        username: currentUser.username,
        name: currentUser.name
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'validate token')
  }
})

// ============ LEGACY COMPATIBILITY ============
// Legacy: student_id login. Disabled in production unless ENABLE_LEGACY_STUDENT_LOGIN=true.
router.post('/login-legacy', rateLimitMiddleware, async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production' && process.env.ENABLE_LEGACY_STUDENT_LOGIN !== 'true') {
      return res.status(404).json(createErrorResponse('Not found'))
    }

    const { studentId, password } = req.body

    if (!studentId || !password) {
      return res.status(400).json(createErrorResponse('Student ID and password are required'))
    }

    // Map studentId to username for backward compatibility
    const user = await getUserByUsername(studentId)

    if (!user) {
      return res.status(401).json(createErrorResponse(LOGIN_FAILED_MESSAGE))
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return res.status(401).json(createErrorResponse(LOGIN_FAILED_MESSAGE))
    }

    // Generate token and create session
    const token = await generateToken(user)

    // Update last login
    await updateLastLogin(user.id)

    res.json(createSuccessResponse({
      message: 'Login successful',
      user: {
        id: user.id,
        student_id: user.username, // Map username back to student_id for compatibility
        name: user.name
      },
      token
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'legacy login')
  }
})

// Admin role check
router.get('/admin-check', authenticateToken, async (req, res) => {
  try {
    const admin = await isAdmin(req.user.userId)
    res.json(createSuccessResponse({ isAdmin: admin }))
  } catch (error) {
    handleErrorResponse(res, error, 'admin check')
  }
})

// Get Security Question endpoint (forgot password - username or email)
// Returns a generic message for unknown accounts to prevent user enumeration.
router.post('/get-security-question', rateLimitMiddleware, async (req, res) => {
  try {
    const { username } = req.body
    const input = (username != null && typeof username === 'string') ? username.trim() : ''

    if (!input) {
      return res.status(400).json(createErrorResponse('Username or email is required'))
    }

    const user = await getUserByUsernameOrEmail(input)

    if (!user || !user.security_question) {
      return res.status(200).json(createSuccessResponse({
        username: null,
        securityQuestion: null,
        notFound: true,
        message: 'If an account exists with that username or email, the security question will be shown.'
      }))
    }

    res.json(createSuccessResponse({
      username: user.username,
      securityQuestion: user.security_question
    }))

  } catch (error) {
    res.status(500).json(createErrorResponse('Failed to get security question'))
  }
})

// Verify Security Answer Only endpoint (for step validation)
router.post('/verify-security-answer-only', rateLimitMiddleware, async (req, res) => {
  const GENERIC_FAIL = 'Incorrect security answer or account not found'
  try {
    const { username, securityAnswer } = req.body
    const input = (username != null && typeof username === 'string') ? username.trim() : ''

    if (!input || !securityAnswer) {
      return res.status(400).json(createErrorResponse('Username or email and security answer are required'))
    }

    const user = await getUserByUsernameOrEmail(input)

    if (!user || !user.security_answer) {
      return res.status(401).json(createErrorResponse(GENERIC_FAIL))
    }

    const isAnswerCorrect = await bcrypt.compare(securityAnswer.toLowerCase().trim(), user.security_answer)

    if (!isAnswerCorrect) {
      return res.status(401).json(createErrorResponse(GENERIC_FAIL))
    }

    res.json(createSuccessResponse({
      message: 'Security answer verified successfully',
      username: user.username
    }))

  } catch (error) {
    console.error('verify-security-answer-only error:', error?.message)
    res.status(500).json(createErrorResponse('Failed to verify security answer'))
  }
})

// Verify Security Answer and Reset Password endpoint
router.post('/verify-security-answer', rateLimitMiddleware, async (req, res) => {
  const GENERIC_FAIL = 'Incorrect security answer or account not found'
  try {
    const { username, securityAnswer, newPassword, confirmPassword } = req.body
    const input = (username != null && typeof username === 'string') ? username.trim() : ''

    if (!input || !securityAnswer || !newPassword || !confirmPassword) {
      return res.status(400).json(createErrorResponse('All fields are required'))
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json(createErrorResponse('Passwords do not match'))
    }

    const passwordValidation = validatePassword(newPassword)
    if (!passwordValidation.isValid) {
      return res.status(400).json(createErrorResponse(passwordValidation.errors[0]))
    }

    const user = await getUserByUsernameOrEmail(input)

    if (!user || !user.security_answer) {
      return res.status(401).json(createErrorResponse(GENERIC_FAIL))
    }

    const isAnswerCorrect = await bcrypt.compare(securityAnswer.toLowerCase().trim(), user.security_answer)

    if (!isAnswerCorrect) {
      return res.status(401).json(createErrorResponse(GENERIC_FAIL))
    }

    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS || '12')
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds)

    await updateUserPassword(user.id, hashedNewPassword)
    res.json(createSuccessResponse({
      message: 'Password reset successfully. You can now login with your new password.'
    }))

  } catch (error) {
    console.error('verify-security-answer error:', error?.message)
    res.status(500).json(createErrorResponse('Failed to verify security answer'))
  }
})

export default router