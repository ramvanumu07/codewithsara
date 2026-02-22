/**
 * Netlify Function: runs the Sara backend API.
 * All /api/* requests are sent here. Env vars are set in Netlify dashboard.
 */

import serverless from 'serverless-http'
import appModule from '../../backend/app.js'

// CJS bundle may wrap default export; serverless-http needs the real Express app
const app = typeof appModule === 'function' ? appModule : (appModule?.default ?? appModule)

export const handler = serverless(app)
