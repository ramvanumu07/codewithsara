/**
 * Structured Logging Service
 * Professional logging with different levels and structured output
 */

import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'

// CJS bundle (Netlify/Lambda): use ambient require. ESM (local): createRequire(import.meta.url)
let req
try { req = require } catch (_) { req = createRequire(import.meta.url) }

// Graceful import with fallback for missing dependencies (sync for CJS bundling)
let winston = null
let winstonFormats = null
try {
  const winstonModule = req('winston')
  // require('winston') has .transports.File; .default has different shape, so use module
  winston = winstonModule.transports ? winstonModule : (winstonModule.default || winstonModule)
  winstonFormats = (winston && winston.format) || {}
} catch (error) {
  console.warn('Winston module not installed. Using console logging fallback.')
}

// Skip file logging in serverless/read-only environments
const isServerless = !!(process.env.NETLIFY_DEV || process.env.AWS_LAMBDA_FUNCTION_NAME)
let logsDir
if (!isServerless) {
  logsDir = path.join(process.cwd(), 'logs')
  if (!fs.existsSync(logsDir)) {
    try { fs.mkdirSync(logsDir, { recursive: true }) } catch (_) { /* ignore */ }
  }
}

// Initialize formats with fallback
let combine, timestamp, errors, json, printf, colorize

if (winston && winstonFormats) {
  ({ combine, timestamp, errors, json, printf, colorize } = winstonFormats)
} else {
  // Fallback format functions
  combine = (...args) => args
  timestamp = () => ({ timestamp: new Date().toISOString() })
  errors = () => ({})
  json = () => ({})
  printf = (fn) => fn
  colorize = () => ({})
}

// Custom format for development
const devFormat = printf(({ level, message, timestamp, requestId, ...meta }) => {
  let log = `${timestamp} [${level}]`
  
  if (requestId) {
    log += ` [${requestId}]`
  }
  
  log += `: ${message}`
  
  if (Object.keys(meta).length > 0) {
    log += ` ${JSON.stringify(meta)}`
  }
  
  return log
})

// Create logger instance with fallback
let logger

if (winston) {
  const transports = []
  if (!isServerless && logsDir) {
    transports.push(
      new winston.transports.File({
        filename: path.join(logsDir, 'error.log'),
        level: 'error',
        maxsize: 5242880,
        maxFiles: 5
      }),
      new winston.transports.File({
        filename: path.join(logsDir, 'combined.log'),
        maxsize: 5242880,
        maxFiles: 5
      })
    )
  }
  if (transports.length === 0) {
    transports.push(new winston.transports.Console({ format: combine(timestamp(), json()) }))
  }
  logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      timestamp(),
      errors({ stack: true }),
      json()
    ),
    defaultMeta: {
      service: 'sara-backend',
      environment: process.env.NODE_ENV || 'development'
    },
    transports
  })
} else {
  // Fallback logger using console
  logger = {
    info: (message, meta = {}) => {
      const timestamp = new Date().toISOString()
      console.log(`${timestamp} [INFO]: ${message}`, meta)
    },
    error: (message, meta = {}) => {
      const timestamp = new Date().toISOString()
      console.error(`${timestamp} [ERROR]: ${message}`, meta)
    },
    warn: (message, meta = {}) => {
      const timestamp = new Date().toISOString()
      console.warn(`${timestamp} [WARN]: ${message}`, meta)
    },
    debug: (message, meta = {}) => {
      const timestamp = new Date().toISOString()
      console.debug(`${timestamp} [DEBUG]: ${message}`, meta)
    },
    log: (level, message, meta = {}) => {
      const timestamp = new Date().toISOString()
      console.log(`${timestamp} [${level.toUpperCase()}]: ${message}`, meta)
    },
    add: () => {}, // No-op for fallback
    remove: () => {} // No-op for fallback
  }
}

// Add console transport for development (only if winston is available)
if (process.env.NODE_ENV !== 'production' && winston) {
  logger.add(new winston.transports.Console({
    format: combine(
      colorize(),
      timestamp({ format: 'HH:mm:ss' }),
      devFormat
    )
  }))
}

// Helper functions for different log levels
export const logInfo = (message, meta = {}) => {
  logger.info(message, meta)
}

export const logError = (message, error = null, meta = {}) => {
  const logData = { ...meta }
  
  if (error) {
    logData.error = {
      message: error.message,
      stack: error.stack,
      name: error.name
    }
  }
  
  logger.error(message, logData)
}

export const logWarn = (message, meta = {}) => {
  logger.warn(message, meta)
}

export const logDebug = (message, meta = {}) => {
  logger.debug(message, meta)
}

export default logger