/**
 * Netlify Function: runs the Sara backend API.
 * All /api/* requests are sent here. Env vars are set in Netlify dashboard.
 */

import serverless from '@netlify/serverless-http'
import app from '../../backend/app.js'

export const handler = serverless({ app })
