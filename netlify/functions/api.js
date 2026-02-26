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
  const path = event.path || event.rawUrl || ''
  if (event.httpMethod !== 'GET' || !path.includes('/api/health')) {
    return null
  }
  const hasDb = !!(process.env.DATABASE_URL && !process.env.DATABASE_URL.includes('your_') && !process.env.DATABASE_URL.includes('placeholder'))
  const hasJwt = !!process.env.JWT_SECRET
  const ok = hasDb && hasJwt
  return jsonResponse(ok ? 200 : 503, {
    ok,
    env: {
      DATABASE_URL: hasDb ? 'set' : 'missing',
      JWT_SECRET: hasJwt ? 'set' : 'missing',
      GROQ_API_KEY: process.env.GROQ_API_KEY ? 'set' : 'missing',
      FRONTEND_URL: process.env.FRONTEND_URL ? 'set' : 'missing'
    }
  })
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

export const handler = async (event, context) => {
  const health = handleHealth(event)
  if (health) return health

  try {
    const app = await loadApp()
    return serverless(app)(event, context)
  } catch (err) {
    return jsonResponse(503, {
      success: false,
      message: err?.message || 'Server failed to start',
      hint: 'Check Netlify env vars: DATABASE_URL, JWT_SECRET, GROQ_API_KEY, FRONTEND_URL'
    })
  }
}
