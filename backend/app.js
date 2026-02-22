/**
 * Express app - shared for local server (server.js) and Netlify Function
 */

import dotenv from 'dotenv'
dotenv.config()

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
import debugSchemaRoutes from './routes/debug-schema.js'
import debugChatRoutes from './routes/debug-chat.js'

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
    return callback(new Error('CORS not allowed'), false)
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
app.use('/api/debug', asMiddleware(debugSchemaRoutes))
app.use('/api/debug', asMiddleware(debugChatRoutes))
app.use(asMiddleware(errorHandlerExport))

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    version: '2.0.1',
    memory: process.memoryUsage()
  })
})

app.get('/metrics', (req, res) => {
  res.json({
    status: 'success',
    data: getPerformanceStats(),
    timestamp: new Date().toISOString()
  })
})

app.use((err, req, res, _next) => {
  const isDevelopment = process.env.NODE_ENV === 'development'
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    ...(isDevelopment && { stack: err.stack })
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
