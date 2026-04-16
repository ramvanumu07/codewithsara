/**
 * Coupon rows in Postgres — code + discount_rupees (flat ₹ off).
 * Promoter stats use lifetime `successful_enrollments` on the coupon row (always updated on verify-payment).
 * Optional `coupon_enrollment_events` rows are still written for analytics when the table exists (migration 006).
 */

import { query, isDatabaseConfigured } from './db.js'

/**
 * Volume bands: total successful enrollments for the coupon → commission per enrollment (INR).
 * 1–49 → ₹400, 50–99 → ₹450, 100+ → ₹500. Total commission = count × rate for the current band.
 */
export const PROMOTER_TIER_BANDS = [
  { min: 1, max: 49, ratePerEnrollment: 400, label: '1–49 enrollments' },
  { min: 50, max: 99, ratePerEnrollment: 450, label: '50–99 enrollments' },
  { min: 100, max: Number.MAX_SAFE_INTEGER, ratePerEnrollment: 500, label: '100+ enrollments' }
]

/**
 * @returns {Array<{ minEnrollments: number, maxEnrollments: number | null, ratePerEnrollment: number, bandLabel: string }>}
 */
export function getPromoterTierBandsPublic () {
  return PROMOTER_TIER_BANDS.map((b) => ({
    minEnrollments: b.min,
    maxEnrollments: b.max >= Number.MAX_SAFE_INTEGER ? null : b.max,
    ratePerEnrollment: b.ratePerEnrollment,
    bandLabel: b.label
  }))
}

/**
 * @param {number} successfulEnrollments
 * @returns {{ ratePerEnrollment: number, tierKey: string }}
 */
export function getPromoterTierForCount (successfulEnrollments) {
  const n = Math.max(0, Math.floor(Number(successfulEnrollments)) || 0)
  if (n === 0) {
    return {
      ratePerEnrollment: 0,
      tierKey: 'none'
    }
  }
  for (const b of PROMOTER_TIER_BANDS) {
    if (n >= b.min && n <= b.max) {
      return {
        ratePerEnrollment: b.ratePerEnrollment,
        tierKey: `band_${b.min}_${b.max >= Number.MAX_SAFE_INTEGER ? 'plus' : b.max}`
      }
    }
  }
  const last = PROMOTER_TIER_BANDS[PROMOTER_TIER_BANDS.length - 1]
  return {
    ratePerEnrollment: last.ratePerEnrollment,
    tierKey: 'band_100_plus'
  }
}

/**
 * @param {number} successfulEnrollments
 * @returns {{ successfulEnrollments: number, ratePerEnrollment: number, totalCommissionRupees: number, tierKey: string }}
 */
export function computePromoterCommissionForDashboard (successfulEnrollments) {
  const n = Math.max(0, Math.floor(Number(successfulEnrollments)) || 0)
  const tier = getPromoterTierForCount(n)
  return {
    successfulEnrollments: n,
    ratePerEnrollment: tier.ratePerEnrollment,
    totalCommissionRupees: n * tier.ratePerEnrollment,
    tierKey: tier.tierKey
  }
}

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
    const ok = (rowCount ?? 0) > 0
    if (ok) {
      try {
        await query(
          `INSERT INTO public.coupon_enrollment_events (coupon_code_normalized)
           VALUES ($1)`,
          [key]
        )
      } catch (e) {
        const codePg = e && e.code
        if (codePg !== '42P01' && codePg !== '42703') throw e
      }
    }
    return ok
  } catch (e) {
    const codePg = e && e.code
    if (codePg === '42P01' || codePg === '42703') return false
    throw e
  }
}

/**
 * Promoter-facing enrollment count from `coupons.successful_enrollments` (maintained when you reset after weekly payout).
 *
 * @param {string} code raw user input
 * @returns {Promise<{code: string, successful_enrollments: number} | null>}
 */
export async function getCouponEnrollmentStats (code) {
  if (!isDatabaseConfigured()) return null
  if (!code || typeof code !== 'string') return null
  const key = code.trim().toUpperCase()
  if (!key) return null
  try {
    const { rows } = await query(
      `SELECT code, COALESCE(successful_enrollments, 0)::int AS successful_enrollments
       FROM public.coupons
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
