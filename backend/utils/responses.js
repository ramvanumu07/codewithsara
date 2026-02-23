/**
 * Industry-Level Response Utilities
 * Centralized response formatting to eliminate duplication and ensure consistency
 */

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
 * Create a server error response
 * @param {string} message - Optional custom message
 * @param {any} details - Optional error details (only in development)
 * @returns {Object} - Standardized server error response
 */
export function createServerErrorResponse(message = 'Internal server error', details = null) {
  const response = createErrorResponse(message, 'SERVER_ERROR')

  // Only include details in development environment
  if (process.env.NODE_ENV === 'development' && details) {
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
  } else if (error && error.name === 'ValidationError') {
    statusCode = 400
    message = 'Validation failed'
    code = 'VALIDATION_ERROR'
  } else if (error && (error.name === 'UnauthorizedError' || (errMsg && errMsg.includes('token')))) {
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
  } else if (errMsg) {
    message = errMsg
  }

  sendErrorResponse(res, message, statusCode, code,
    process.env.NODE_ENV === 'development' && error && error.stack ? error.stack : null)
}