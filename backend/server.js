/**
 * Local server - runs the Express app (for npm run dev / npm start).
 * On Netlify, the app is run via netlify/functions/api.js instead.
 */

import { createServer } from 'http'
import { getSafePort } from './utils/portManager.js'
import { logInfo, logError } from './services/logger.js'
import app from './app.js'

const PREFERRED_PORT = parseInt(process.env.PORT) || 5000

const startServer = async () => {
  try {
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
          database: !!process.env.SUPABASE_URL,
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

    const gracefulShutdown = () => {
      server.close(() => process.exit(0))
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
