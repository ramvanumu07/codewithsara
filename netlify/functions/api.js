/**
 * Netlify Function: runs the Sara backend API.
 * All /api/* requests are sent here. Env vars are set in Netlify dashboard.
 * Uses lazy load so startup errors (e.g. missing env) return 503 with message instead of 502.
 */

import serverless from 'serverless-http'

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization'
}

function jsonResponse(statusCode, body) {
  return { statusCode, headers: CORS_HEADERS, body: JSON.stringify(body) }
}

/** Lightweight health check – no app load, shows env status for debugging */
function handleHealth(event) {
  const path = event.path || event.rawPath || event.rawUrl || ''
  if (event.httpMethod !== 'GET' || !path.includes('/api/health')) {
    return null
  }
  const hasDb = !!(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_') && !process.env.DATABASE_URL.includes('placeholder'))
  const hasJwt = !!process.env.JWT_SECRET
  const ok = hasDb && hasJwt
  return jsonResponse(ok ? 200 : 503, {
    ok,
    services: {
      database: hasDb ? 'configured' : 'not configured',
      auth: hasJwt ? 'configured' : 'not configured',
      ai: process.env.GROQ_API_KEY ? 'configured' : 'not configured'
    }
  })
}

/** Debug: try to load app and return the actual error (helps diagnose 503) */
async function handleLoadDebug(event) {
  const path = event.path || event.rawPath || event.rawUrl || ''
  if (event.httpMethod !== 'GET' || !path.includes('/api/debug/load')) {
    return null
  }
  try {
    const appModule = await import('../../backend/app.js')
    const app = typeof appModule === 'function' ? appModule : (appModule?.default ?? appModule)
    return jsonResponse(200, { ok: true, message: 'App loaded successfully' })
  } catch (err) {
    return jsonResponse(503, {
      ok: false,
      message: err?.message || 'Load failed',
      name: err?.name,
      code: err?.code
    })
  }
}

let appInstance = null
let appError = null

async function loadApp() {
  if (appInstance) return appInstance
  if (appError) throw appError
  try {
    const appModule = await import('../../backend/app.js')
    appInstance = typeof appModule === 'function' ? appModule : (appModule?.default ?? appModule)
    return appInstance
  } catch (err) {
    appError = err
    throw err
  }
}

/** Normalize path: /.netlify/functions/api/auth/... → /api/auth/... so Express routes match */
function normalizePath(event) {
  const raw = event.path || event.rawPath || event.requestPath || ''
  const path = typeof raw === 'string' ? raw : ''
  const prefix = '/.netlify/functions/api'
  if (path.startsWith(prefix)) {
    const rest = path.slice(prefix.length) || '/'
    const normalized = '/api' + rest
    event.path = normalized
    event.rawPath = normalized
    event.requestPath = normalized
  }
  return event
}

export const handler = async (event, context) => {
  const health = handleHealth(event)
  if (health) return health

  const loadDebug = await handleLoadDebug(event)
  if (loadDebug) return loadDebug

  normalizePath(event)

  try {
    const app = await loadApp()
    return serverless(app)(event, context)
  } catch (err) {
    return jsonResponse(503, {
      success: false,
      message: err?.message || 'Server failed to start',
      error: err?.code || err?.name,
      hint: 'Check Netlify function logs. Ensure DATABASE_URL, JWT_SECRET are set.',
      ...(process.env.NODE_ENV === 'development' && { stack: err?.stack })
    })
  }
}
