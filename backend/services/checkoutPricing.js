/**
 * Checkout pricing for JavaScript full access — keep in sync with frontend welcomeCourseOffers (₹999 sale).
 * Coupon map: CHECKOUT_COUPONS_JSON env, e.g. {"WELCOME100":100} for flat ₹100 off (values in rupees).
 */

export const JS_FULL_ACCESS_PRICE_RUPEES = 999
export const JS_FULL_ACCESS_PAISE = JS_FULL_ACCESS_PRICE_RUPEES * 100

function parseCouponMap () {
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
 * @param {string} code
 * @returns {number | null} discount in rupees, or null if unknown / not configured
 */
export function getCouponDiscountRupees (code) {
  if (!code || typeof code !== 'string') return null
  const map = parseCouponMap()
  if (Object.keys(map).length === 0) return null
  const key = code.trim().toUpperCase()
  const v = map[key]
  if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return null
  return Math.floor(v)
}

/**
 * @param {number} originalRupees — expected sale price before coupon (e.g. 999)
 * @param {string} [couponCode]
 * @returns {{ valid: boolean, discountRupees?: number, finalRupees?: number, message?: string }}
 */
export function applyCoupon (originalRupees, couponCode) {
  if (typeof originalRupees !== 'number' || !Number.isFinite(originalRupees) || originalRupees <= 0) {
    return { valid: false }
  }
  if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
    return { valid: false }
  }
  const discountRupees = getCouponDiscountRupees(couponCode)
  if (discountRupees == null) {
    return { valid: false }
  }
  const finalRupees = Math.max(1, Math.round(originalRupees) - discountRupees)
  const appliedDiscount = Math.round(originalRupees) - finalRupees
  return {
    valid: true,
    discountRupees: appliedDiscount,
    finalRupees,
    message: 'Coupon applied'
  }
}

/**
 * Server-side expected amount in paise for checkout (with optional coupon).
 * @param {string} [couponCode]
 */
export function getExpectedAmountPaise (couponCode) {
  if (!couponCode || typeof couponCode !== 'string' || !couponCode.trim()) {
    return JS_FULL_ACCESS_PAISE
  }
  const r = applyCoupon(JS_FULL_ACCESS_PRICE_RUPEES, couponCode)
  if (!r.valid) return null
  return r.finalRupees * 100
}
