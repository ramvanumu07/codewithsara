/**
 * Coupon rows in Postgres — code + discount_rupees (flat ₹ off).
 */

import { query, isDatabaseConfigured } from './db.js'

/**
 * @param {string} code raw user input
 * @returns {Promise<number | null>} discount in whole rupees, or null if not in DB / DB unavailable / missing table
 */
export async function getCouponDiscountRupeesFromDb (code) {
  if (!isDatabaseConfigured()) return null
  if (!code || typeof code !== 'string') return null
  const key = code.trim().toUpperCase()
  if (!key) return null
  try {
    const { rows } = await query(
      `SELECT discount_rupees FROM public.coupons
       WHERE UPPER(TRIM(code)) = $1
       LIMIT 1`,
      [key]
    )
    if (!rows?.length) return null
    const n = Number(rows[0].discount_rupees)
    if (!Number.isFinite(n) || n <= 0) return null
    return Math.floor(n)
  } catch (e) {
    const codePg = e && e.code
    if (codePg === '42P01') return null
    throw e
  }
}
