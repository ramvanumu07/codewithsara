# Middleware

| File | Purpose | Used in |
|------|---------|--------|
| **requestId.js** | Sets `req.requestId` and `X-Request-ID` header for tracing | `server.js` (first) |
| **performance.js** | `performanceMonitor`: sets `X-Response-Time`; `progressCache` / `withPerformanceLogging` for DB layer | `server.js`, `services/database.js` |
| **errorHandler.js** | Central error handler; known error classes; uses `services/logger` for logging | `server.js` (after routes) |
| **rateLimiting.js** | Per-identifier rate limit (IP or user). Config: `RATE_LIMIT_PER_MINUTE` (default 20). Sends `Retry-After` on 429 | `auth.js`, `chat.js`, `learning.js` |

Request logging (start/complete) lives in `services/logger.js` (`requestLogger`); wire it in `server.js` after `requestIdMiddleware` if you want structured request logs.
