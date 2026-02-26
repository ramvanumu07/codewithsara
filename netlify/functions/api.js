/**
 * Netlify Function: runs the Sara backend API.
 * All /api/* requests are sent here. Env vars are set in Netlify dashboard.
 * Uses lazy load so startup errors (e.g. missing env) return 503 with message instead of 502.
 */

import serverless from 'serverless-http'

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
  try {
    const app = await loadApp()
    return serverless(app)(event, context)
  } catch (err) {
    return {
      statusCode: 503,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        success: false,
        message: err?.message || 'Server failed to start',
        hint: 'Check Netlify env vars: DATABASE_URL, JWT_SECRET, GROQ_API_KEY, FRONTEND_URL'
      })
    }
  }
}
