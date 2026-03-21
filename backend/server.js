/**
 * Local server - runs the Express app (for npm run dev / npm start).
 * On Netlify, the app is run via netlify/functions/api.js instead.
 */

import { createServer } from 'http'
import { getSafePort } from './utils/portManager.js'
import { logInfo, logError } from './services/logger.js'
import { query, isDatabaseConfigured, getPool } from './services/db.js'
import app from './app.js'

process.on('unhandledRejection', (reason, promise) => {
  logError('Unhandled promise rejection', { reason: reason?.message || reason, stack: reason?.stack })
})

process.on('uncaughtException', (error) => {
  logError('Uncaught exception', { error: error.message, stack: error.stack })
  process.exit(1)
})

const PREFERRED_PORT = parseInt(process.env.PORT) || 5000

async function testDatabaseConnection() {
  if (!isDatabaseConfigured()) {
    logInfo('Database: not configured (no DATABASE_URL or placeholder). Using in-memory store.')
    return
  }
  try {
    await query('SELECT 1 FROM users LIMIT 1')
    logInfo('Database: Neon connected (users table OK).')
  } catch (err) {
    logError('Database: connection or schema failed.', {
      error: err.message,
      code: err.code,
      fix: err.code === '42P01' || (err.message || '').includes('does not exist')
        ? 'Run backend/database/schema.sql in Neon SQL Editor.'
        : 'Check DATABASE_URL in backend/.env (connection string from Neon Console → Connection details).'
    })
  }
}

const startServer = async () => {
  try {
    await testDatabaseConnection()
    const PORT = await getSafePort(PREFERRED_PORT, true)
    const server = createServer(app)

    server.listen(PORT, () => {
      logInfo('Sara Learning Platform API Server started', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        cors: process.env.NODE_ENV === 'production' ? 'production domains' : 'localhost development',
        services: {
          errorTracking: !!process.env.SENTRY_DSN,
          redis: !!process.env.REDIS_URL,
          database: isDatabaseConfigured(),
          logging: 'winston',
          caching: process.env.REDIS_URL ? 'redis' : 'memory'
        }
      })
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        logError(`Port ${PORT} is already in use`, { solutions: [`PORT=5001 npm run dev`] })
      } else {
        logError('Server startup error', { error: error.message })
      }
      process.exit(1)
    })

    const gracefulShutdown = async () => {
      server.close(async () => {
        try { await getPool()?.end?.() } catch (_) { /* ignore */ }
        process.exit(0)
      })
      setTimeout(() => process.exit(1), 10000)
    }
    process.on('SIGTERM', gracefulShutdown)
    process.on('SIGINT', gracefulShutdown)
  } catch (error) {
    logError('Failed to start server', { error: error.message })
    process.exit(1)
  }
}

startServer()
