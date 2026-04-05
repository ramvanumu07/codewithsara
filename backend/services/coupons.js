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

/**
 * Increment successful checkout count for a coupon (call only after payment verified and course unlocked).
 * Matches codes case-insensitively like the rest of checkout.
 * @param {string} code
 * @returns {Promise<boolean>} true if a row was updated
 */
export async function incrementCouponSuccessfulEnrollments (code) {
  if (!isDatabaseConfigured()) return false
  if (!code || typeof code !== 'string') return false
  const key = code.trim().toUpperCase()
  if (!key) return false
  try {
    const { rowCount } = await query(
      `UPDATE public.coupons
       SET successful_enrollments = successful_enrollments + 1
       WHERE UPPER(TRIM(code)) = $1`,
      [key]
    )
    return (rowCount ?? 0) > 0
  } catch (e) {
    const codePg = e && e.code
    if (codePg === '42P01' || codePg === '42703') return false
    throw e
  }
}

/**
 * Get coupon enrollment stats for a promoter (coupon code, successful enrollments count).
 * @param {string} code raw user input
 * @returns {Promise<{code: string, successful_enrollments: number} | null>} coupon stats or null if not found
 */
export async function getCouponEnrollmentStats (code) {
  if (!isDatabaseConfigured()) return null
  if (!code || typeof code !== 'string') return null
  const key = code.trim().toUpperCase()
  if (!key) return null
  try {
    const { rows } = await query(
      `SELECT code, successful_enrollments FROM public.coupons
       WHERE UPPER(TRIM(code)) = $1
       LIMIT 1`,
      [key]
    )
    if (!rows?.length) return null
    return {
      code: rows[0].code,
      successful_enrollments: Number(rows[0].successful_enrollments) || 0
    }
  } catch (e) {
    const codePg = e && e.code
    if (codePg === '42P01' || codePg === '42703') return null
    throw e
  }
}
