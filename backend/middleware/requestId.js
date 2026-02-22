/**
 * Request ID Middleware
 * Attaches a unique request ID to each request and response header for tracing.
 */

import { v4 as uuidv4 } from 'uuid'

export function requestIdMiddleware(req, res, next) {
  const requestId = uuidv4()
  req.requestId = requestId
  res.setHeader('X-Request-ID', requestId)
  next()
}

export default requestIdMiddleware