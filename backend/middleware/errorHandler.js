/**
 * Error Handling Middleware - Sara Learning Platform
 * Centralized error handling, known error types, and structured logging.
 */

import { createErrorResponse } from '../utils/responses.js'
import { logError as logErrorToService } from '../services/logger.js'

// ============ ERROR TYPES ============

export class ValidationError extends Error {
  constructor(message, field = null) {
    super(message)
    this.name = 'ValidationError'
    this.field = field
    this.statusCode = 400
  }
}

export class AuthenticationError extends Error {
  constructor(message = 'Authentication required') {
    super(message)
    this.name = 'AuthenticationError'
    this.statusCode = 401
  }
}

export class AuthorizationError extends Error {
  constructor(message = 'Access denied') {
    super(message)
    this.name = 'AuthorizationError'
    this.statusCode = 403
  }
}

export class NotFoundError extends Error {
  constructor(resource = 'Resource') {
    super(`${resource} not found`)
    this.name = 'NotFoundError'
    this.statusCode = 404
  }
}

export class ConflictError extends Error {
  constructor(message = 'Resource conflict') {
    super(message)
    this.name = 'ConflictError'
    this.statusCode = 409
  }
}

export class RateLimitError extends Error {
  constructor(message = 'Rate limit exceeded') {
    super(message)
    this.name = 'RateLimitError'
    this.statusCode = 429
  }
}

export class DatabaseError extends Error {
  constructor(message = 'Database operation failed') {
    super(message)
    this.name = 'DatabaseError'
    this.statusCode = 500
  }
}

export class ExternalServiceError extends Error {
  constructor(service, message = 'External service error') {
    super(`${service}: ${message}`)
    this.name = 'ExternalServiceError'
    this.service = service
    this.statusCode = 502
  }
}

// ============ ERROR HANDLER MIDDLEWARE ============

export function errorHandler(error, req, res, _next) {
  logErrorToService('Request error', error, {
    requestId: req.requestId,
    method: req.method,
    url: req.originalUrl || req.url,
    userId: req.user?.userId,
    ip: req.ip,
    statusCode: error.statusCode || error.status
  })

  const httpStatus = error.statusCode || error.status
  if (httpStatus && httpStatus >= 400 && httpStatus < 600) {
    const code = error.name || 'ERROR'
    const details = [error.field, error.service].some(Boolean)
      ? { field: error.field, service: error.service }
      : null
    return res.status(httpStatus).json(createErrorResponse(error.message, code, details))
  }

  // Handle specific error cases
  if (error.name === 'ValidationError') {
    const details = error.field ? { field: error.field } : null
    return res.status(400).json(createErrorResponse(error.message, 'ValidationError', details))
  }

  if (error.name === 'JsonWebTokenError') {
    return res.status(401).json(createErrorResponse('Invalid token'))
  }

  if (error.name === 'TokenExpiredError') {
    return res.status(401).json(createErrorResponse('Token expired'))
  }

  if (error.code === 'ECONNREFUSED') {
    return res.status(503).json(createErrorResponse('Service temporarily unavailable'))
  }

  if (error.code === 'ENOTFOUND') {
    return res.status(502).json(createErrorResponse('External service unreachable'))
  }

  // Database errors
  if (error.code === '23505') { // Unique constraint violation
    return res.status(409).json(createErrorResponse('Resource already exists'))
  }

  if (error.code === '23503') { // Foreign key violation
    return res.status(400).json(createErrorResponse('Invalid reference'))
  }

  if (error.code === '23502') { // Not null violation
    return res.status(400).json(createErrorResponse('Required field missing'))
  }

  // Default server error
  const message = process.env.NODE_ENV === 'production'
    ? 'Internal server error'
    : (error.message || 'Internal server error')
  const details = process.env.NODE_ENV === 'development' && error?.stack ? { stack: error.stack } : null
  res.status(500).json(createErrorResponse(message, 'SERVER_ERROR', details))
}

// ============ ASYNC ERROR WRAPPER ============

export function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next)
  }
}

// ============ ERROR LOGGING ============

export function logError(error, context = {}) {
  logErrorToService(error?.message ?? 'Error', error, context)
}

export default {
  errorHandler,
  asyncHandler,
  logError,
  ValidationError,
  AuthenticationError,
  AuthorizationError,
  NotFoundError,
  ConflictError,
  RateLimitError,
  DatabaseError,
  ExternalServiceError
}