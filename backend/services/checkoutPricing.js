/**
 * Checkout pricing for JavaScript full access — keep in sync with frontend welcomeCourseOffers (₹999 sale).
 * Coupons: primary source is table `public.coupons` (code + discount_rupees).
 * Optional fallback: CHECKOUT_COUPONS_JSON env e.g. {"WELCOME100":100} when no DB row matches.
 */

import { getCouponDiscountRupeesFromDb } from './coupons.js'

export const JS_FULL_ACCESS_PRICE_RUPEES = 999
export const JS_FULL_ACCESS_PAISE = JS_FULL_ACCESS_PRICE_RUPEES * 100

function parseCouponMapFromEnv () {
  const raw = process.env.CHECKOUT_COUPONS_JSON
  if (!raw || typeof raw !== 'string') return {}
  try {
    const obj = JSON.parse(raw)
    if (!obj || typeof obj !== 'object') return {}
    return obj
  } catch {
    return {}
  }
}

/**
 * Env-only lookup (fallback).
 * @param {string} code
 * @returns {number | null} discount in rupees
 */
export function getCouponDiscountFromEnv (code) {
  if (!code || typeof code !== 'string') return null
  const map = parseCouponMapFromEnv()
  if (Object.keys(map).length === 0) return null
  const key = code.trim().toUpperCase()
  const v = map[key]
  if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return null
  return Math.floor(v)
}

/**
 * DB first, then env fallback.
 * @param {string} code
 * @returns {Promise<number | null>}
 */
export async function resolveCouponDiscountRupees (code) {
  const fromDb = await getCouponDiscountRupeesFromDb(code)
  if (fromDb != null) return fromDb
  return getCouponDiscountFromEnv(code)
}

/**
 * @param {number} originalRupees
 * @param {string} couponCode
 * @param {number | null} discountRupees — from resolveCouponDiscountRupees
 */
export function applyCouponWithDiscount (originalRupees, couponCode, discountRupees) {
  if (typeof originalRupees !== 'number' || !Number.isFinite(originalRupees) || originalRupees <= 0) {
    return { valid: false }
  }
  if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
    return { valid: false }
  }
  if (discountRupees == null || !Number.isFinite(discountRupees) || discountRupees <= 0) {
    return { valid: false }
  }
  const finalRupees = Math.max(1, Math.round(originalRupees) - Math.floor(discountRupees))
  const appliedDiscount = Math.round(originalRupees) - finalRupees
  return {
    valid: true,
    discountRupees: appliedDiscount,
    finalRupees,
    message: 'Coupon applied'
  }
}

/**
 * @param {number} originalRupees
 * @param {string} couponCode
 */
export async function applyCoupon (originalRupees, couponCode) {
  const discountRupees = await resolveCouponDiscountRupees(couponCode)
  return applyCouponWithDiscount(originalRupees, couponCode, discountRupees)
}

/**
 * Server-side expected amount in paise for checkout (with optional coupon).
 * @param {string} [couponCode]
 */
export async function getExpectedAmountPaise (couponCode) {
  if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
    return JS_FULL_ACCESS_PAISE
  }
  const r = await applyCoupon(JS_FULL_ACCESS_PRICE_RUPEES, couponCode)
  if (!r.valid) return null
  return r.finalRupees * 100
}
