/**
 * Neon/Postgres client - single pool, used by database.js
 * Set DATABASE_URL (Neon connection string) in .env
 */

import pg from 'pg'

const { Pool } = pg

let pool = null

export function getPool() {
  if (pool) return pool
  const url = process.env.DATABASE_URL
  if (!url || typeof url !== 'string') throw new Error('DATABASE_URL is required')
  if (url.includes('your_') || url.includes('placeholder') || /:\/\/USER:PASSWORD@/.test(url)) {
    throw new Error('DATABASE_URL is a placeholder. Set your real Neon connection string in backend/.env')
  }
  pool = new Pool({ connectionString: url, max: 10, idleTimeoutMillis: 30000 })
  return pool
}

/** Run a query. Returns { rows, rowCount }. Throws on DB error. */
export async function query(text, params = []) {
  const p = getPool()
  if (!p) throw new Error('Database not configured (set DATABASE_URL)')
  const result = await p.query(text, params)
  return { rows: result.rows, rowCount: result.rowCount }
}

/** Check if DATABASE_URL is set and not a placeholder. */
export function isDatabaseConfigured() {
  const url = process.env.DATABASE_URL
  if (!url || typeof url !== 'string') return false
  if (url.includes('your_') || url.includes('placeholder') || /:\/\/USER:PASSWORD@/.test(url)) return false
  return true
}
