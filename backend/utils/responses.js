/**
 * Industry-Level Response Utilities
 * Centralized response formatting to eliminate duplication and ensure consistency
 */

import { logError as logErrorToService } from '../services/logger.js'

/**
 * Create a standardized success response
 * @param {any} data - Response data
 * @param {string} message - Optional success message
 * @param {Object} meta - Optional metadata
 * @returns {Object} - Standardized success response
 */
export function createSuccessResponse(data, message = null, meta = null) {
  const response = {
    success: true,
    timestamp: new Date().toISOString()
  }

  if (message) {
    response.message = message
  }

  if (data !== null && data !== undefined) {
    response.data = data
  }

  if (meta) {
    response.meta = meta
  }

  return response
}

/**
 * Create a standardized error response
 * @param {string} message - Error message
 * @param {string} code - Optional error code
 * @param {any} details - Optional error details
 * @returns {Object} - Standardized error response
 */
export function createErrorResponse(message, code = null, details = null) {
  const response = {
    success: false,
    message,
    timestamp: new Date().toISOString()
  }

  if (code) {
    response.code = code
  }

  if (details) {
    response.details = details
  }

  return response
}

/**
 * Send a standardized error response
 * @param {Object} res - Express response object
 * @param {string} message - Error message
 * @param {number} statusCode - HTTP status code (default: 500)
 * @param {string} code - Optional error code
 * @param {any} details - Optional error details
 */
export function sendErrorResponse(res, message, statusCode = 500, code = null, details = null) {
  res.status(statusCode).json(createErrorResponse(message, code, details))
}

/**
 * Handle and send error response based on error type
 * @param {Object} res - Express response object
 * @param {Error} error - Error object
 * @param {string} operation - Operation that failed
 * @param {number} defaultStatusCode - Default status code if not determined
 */
function safeErrorMessage(error) {
  if (!error) {return ''}
  const msg = error.message
  if (typeof msg === 'string') {return msg}
  if (msg !== null && msg !== undefined) {return String(msg)}
  return ''
}

const SCHEMA_REQUIRED_MSG = 'Database schema not applied. In Neon Console open your project → SQL Editor → New query. Paste the full contents of backend/database/schema.sql and click Run. Then try again.'

const USER_FRIENDLY_MSG = 'Service temporarily unavailable. Please try again in a moment.'

export function getSafeUserMessage(error) {
  const errMsg = error?.message || error?.cause?.message || ''
  if (isTechnicalError(error, errMsg)) return USER_FRIENDLY_MSG
  if (errMsg && process.env.NODE_ENV === 'development') return errMsg
  if (errMsg && !/getaddrinfo|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|ECONNRESET/i.test(String(errMsg).toLowerCase())) return errMsg
  return USER_FRIENDLY_MSG
}

function isTechnicalError(error, errMsg) {
  if (!error) return false
  const code = error.code || error.cause?.code || ''
  const msg = (errMsg || error.cause?.message || '').toLowerCase()
  return (
    code === 'ENOTFOUND' ||
    code === 'ECONNREFUSED' ||
    code === 'ETIMEDOUT' ||
    code === 'ENETUNREACH' ||
    code === 'ECONNRESET' ||
    /getaddrinfo|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|connection refused|network error|connect econnrefused/i.test(msg)
  )
}

export function handleErrorResponse(res, error, operation = 'operation', defaultStatusCode = 500) {
  let statusCode = defaultStatusCode
  let message = `Failed to process ${operation}`
  let code = 'SERVER_ERROR'
  const errMsg = safeErrorMessage(error)
  const isSchemaMissing = error && (error.code === '42P01' || /does not exist|relation\s+["']?\w+["']?\s+does not exist/i.test(errMsg))

  if (isSchemaMissing) {
    statusCode = 503
    message = SCHEMA_REQUIRED_MSG
    code = 'SCHEMA_REQUIRED'
  } else if (isTechnicalError(error, errMsg)) {
    statusCode = 503
    message = USER_FRIENDLY_MSG
    code = 'SERVICE_UNAVAILABLE'
  } else if (error && error.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation failed'
    code = 'VALIDATION_ERROR'
  } else if (error && (error.name === 'UnauthorizedError' || error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError' || /^(invalid|expired|missing)\s+token|access\s+token\s+required/i.test(errMsg))) {
    statusCode = 401
    message = 'Authentication required'
    code = 'AUTH_ERROR'
  } else if (error && error.name === 'ForbiddenError') {
    statusCode = 403
    message = 'Insufficient permissions'
    code = 'AUTHORIZATION_ERROR'
  } else if (error && error.name === 'NotFoundError') {
    statusCode = 404
    message = 'Resource not found'
    code = 'NOT_FOUND'
  } else if (errMsg && statusCode < 500) {
    message = errMsg
  } else if (errMsg && process.env.NODE_ENV === 'development') {
    message = errMsg
  } else if (statusCode >= 500) {
    message = USER_FRIENDLY_MSG
  }

  if (statusCode >= 500) {
    logErrorToService(`[${operation}] ${message}`, error, { statusCode })
  }

  sendErrorResponse(res, message, statusCode, code,
    process.env.NODE_ENV === 'development' && error && error.stack ? error.stack : null)
}