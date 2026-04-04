/**
 * Express app - shared for local server (server.js) and Netlify Function
 */

import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Use dir to avoid conflict with bundler-injected __dirname (Netlify/Lambda)
const dir = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(dir, '.env') })

import { validateEnv } from './config/env.js'
validateEnv()

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'

import { initializeErrorTracking } from './services/errorTracking.js'
import { initializeCache } from './services/cache.js'
import requestIdMiddleware from './middleware/requestId.js'

import authRoutes from './routes/auth.js'
import chatRoutes from './routes/chat.js'
import learningRoutes from './routes/learning.js'
import paymentsRoutes from './routes/payments.js'
import debugSchemaRoutes from './routes/debug-schema.js'
import debugChatRoutes from './routes/debug-chat.js'
import jobsRoutes from './routes/jobs.js'

// Promoters routes (optional - won't break signup/existing features if import fails)
import promotersRoutes from './routes/promoters.js'
import { query, isDatabaseConfigured } from './services/db.js'

import { performanceMonitor as performanceMonitorExport } from './middleware/performance.js'
import { performanceMiddleware as performanceMiddlewareExport, getPerformanceStats } from './services/performanceMonitor.js'
import { errorHandler as errorHandlerExport } from './middleware/errorHandler.js'

// CJS bundle (Netlify) can wrap exports; ensure we pass a function (or Router) to app.use()
function asMiddleware(m) {
  if (typeof m === 'function') return m
  if (m && typeof m.default === 'function') return m.default
  return (req, res, next) => next()
}

initializeErrorTracking()
initializeCache()

const app = express()

app.set('trust proxy', 1)

app.use(cors({
  origin (origin, callback) {
    if (!origin) { return callback(null, true) }
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175',
      'http://localhost:5176',
      'http://localhost:5177',
      'http://localhost:5178',
      'http://localhost:3000'
    ]
    // Include Netlify / production frontends (comma-separated in FRONTEND_URL)
    if (process.env.FRONTEND_URL) {
      allowedOrigins.push(...process.env.FRONTEND_URL.split(',').map(s => s.trim()).filter(Boolean))
    }
    // Netlify injects URL (site URL) in function context – allow same-origin for /api
    if (process.env.URL) {
      allowedOrigins.push(process.env.URL.replace(/\/$/, ''))
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    }
    return callback(null, false)
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization', 'X-Correlation-ID'],
  optionsSuccessStatus: 200
}))

app.use(asMiddleware(requestIdMiddleware))
app.use(asMiddleware(performanceMiddlewareExport))
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  crossOriginEmbedderPolicy: false,
}))
app.use(compression({ level: 6, threshold: 1024 }))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))
app.use(asMiddleware(performanceMonitorExport))

app.use('/api/auth', asMiddleware(authRoutes))
app.use('/api/chat', asMiddleware(chatRoutes))
app.use('/api/learn', asMiddleware(learningRoutes))
app.use('/api', asMiddleware(paymentsRoutes))
app.use('/api/promoters', asMiddleware(promotersRoutes))
app.use('/api/debug', asMiddleware(debugSchemaRoutes))
app.use('/api/debug', asMiddleware(debugChatRoutes))

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' })
})

app.use(jobsRoutes)

app.get('/metrics', (req, res) => {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ success: false, message: 'Not found' })
  }
  res.json({
    status: 'success',
    data: getPerformanceStats(),
    timestamp: new Date().toISOString()
  })
})

app.get('/api/health/db', async (req, res) => {
  if (!isDatabaseConfigured()) {
    return res.status(200).json({
      ok: false,
      message: 'DATABASE_URL not set or placeholder. Using in-memory store.',
      database: null
    })
  }
  try {
    await query('SELECT 1 FROM users LIMIT 1')
    res.status(200).json({ ok: true, message: 'Neon connected.', database: 'neon' })
  } catch (err) {
    const code = err.code || ''
    const msg = (err.message || '').toLowerCase()
    const schemaRequired = code === '42P01' || msg.includes('does not exist') || msg.includes('relation')
    const isConnectionError = /getaddrinfo|ENOTFOUND|ECONNREFUSED|ETIMEDOUT/i.test(msg)
    res.status(503).json({
      ok: false,
      message: schemaRequired
        ? 'Schema not applied. Run backend/database/schema.sql in Neon SQL Editor.'
        : isConnectionError
          ? 'Database connection unavailable.'
          : 'Database error.',
      database: 'neon'
    })
  }
})

app.use(asMiddleware(errorHandlerExport))

app.use((err, req, res, _next) => {
  const status = err.status || err.statusCode || 500
  const msg = err.message || ''
  const isTechnical = /getaddrinfo|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|connection refused|network error/i.test(msg)
  const safeMessage = (status >= 500 && (isTechnical || process.env.NODE_ENV !== 'development'))
    ? 'Service temporarily unavailable. Please try again in a moment.'
    : (msg || 'Internal server error')
  res.status(status).json({
    success: false,
    message: safeMessage,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  })
})

app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.method} ${req.originalUrl} not found`,
    timestamp: new Date().toISOString()
  })
})

export default app
