/**
 * Razorpay checkout (razorpay npm package).
 *
 * Routes (mounted at /api in app.js):
 *   POST /api/apply-coupon   — validate coupon vs catalog price (no Razorpay call)
 *   POST /api/create-order   — create Razorpay order (amount from server-side pricing)
 *   POST /api/verify-payment — HMAC signature check + Razorpay order fetch, then DB unlock
 *
 * Env (never hardcode): RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET
 * Optional: CHECKOUT_COUPONS_JSON — see checkoutPricing.js
 */

import express from 'express'
import crypto from 'crypto'
import Razorpay from 'razorpay'
import { authenticateToken } from './auth.js'
import { createSuccessResponse, createErrorResponse, handleErrorResponse } from '../utils/responses.js'
import { unlockCourseForUser, getUserById } from '../services/database.js'
import { courses } from '../data/curriculum.js'
import {
  JS_FULL_ACCESS_PRICE_RUPEES,
  applyCoupon,
  getExpectedAmountPaise
} from '../services/checkoutPricing.js'

const router = express.Router()

const VALID_COURSE_IDS = new Set(courses.map((c) => c.id))

function getRazorpayClient () {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET
  if (!keyId || !keySecret) return null
  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

function validateOriginalAmount (originalAmount) {
  if (typeof originalAmount !== 'number' && typeof originalAmount !== 'string') return false
  const n = Number(originalAmount)
  return Number.isFinite(n) && Math.round(n) === JS_FULL_ACCESS_PRICE_RUPEES
}

function razorpaySignaturesMatch (expectedHex, receivedHex) {
  if (typeof expectedHex !== 'string' || typeof receivedHex !== 'string') return false
  const a = expectedHex.toLowerCase()
  const b = receivedHex.toLowerCase()
  if (a.length !== b.length || a.length < 32) return false
  try {
    return crypto.timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'))
  } catch {
    return false
  }
}

router.post('/apply-coupon', authenticateToken, async (req, res) => {
  try {
    const { code, originalAmount } = req.body || {}
    if (!validateOriginalAmount(originalAmount)) {
      return res.status(400).json({ valid: false, ...createErrorResponse('Invalid checkout amount') })
    }
    if (!code || typeof code !== 'string' || !code.trim()) {
      return res.status(400).json({
        valid: false,
        ...createErrorResponse('Invalid or expired coupon', 'COUPON_INVALID')
      })
    }
    const result = await applyCoupon(JS_FULL_ACCESS_PRICE_RUPEES, code)
    if (!result.valid) {
      return res.status(400).json({
        valid: false,
        ...createErrorResponse('Invalid or expired coupon', 'COUPON_INVALID')
      })
    }
    const label = `Coupon (${code.trim().toUpperCase()})`
    return res.json(createSuccessResponse({
      valid: true,
      discountedAmount: result.finalRupees,
      discountLabel: label,
      message: result.message,
      discountRupees: result.discountRupees,
      finalRupees: result.finalRupees
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'apply coupon')
  }
})

router.post('/create-order', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const { amount, name, email, courseId = 'javascript', couponCode } = req.body || {}

    let resolvedName = typeof name === 'string' ? name.trim() : ''
    let resolvedEmail = typeof email === 'string' ? email.trim() : ''
    if (!resolvedName || !resolvedEmail) {
      const row = await getUserById(userId)
      if (!row) {
        return res.status(400).json(createErrorResponse('User not found'))
      }
      if (!resolvedName) {
        resolvedName = (row.name || row.username || '').trim()
      }
      if (!resolvedEmail) {
        resolvedEmail = (row.email || '').trim()
      }
    }
    if (!resolvedName) {
      return res.status(400).json(createErrorResponse('name is required'))
    }
    if (!resolvedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resolvedEmail)) {
      return res.status(400).json(createErrorResponse(
        'A valid email is required on your account to pay. Update your email in account settings or contact support.'
      ))
    }
    /** Client sends amount in rupees (whole or decimal); convert to paise for Razorpay */
    const amountRupees = typeof amount === 'string' ? Number(amount) : amount
    if (typeof amountRupees !== 'number' || !Number.isFinite(amountRupees) || amountRupees <= 0 || amountRupees > 1e7) {
      return res.status(400).json(createErrorResponse('Invalid amount'))
    }
    const cid = typeof courseId === 'string' ? courseId.trim() : ''
    if (!VALID_COURSE_IDS.has(cid)) {
      return res.status(400).json(createErrorResponse('Invalid course'))
    }

    const expectedPaise = await getExpectedAmountPaise(
      typeof couponCode === 'string' && couponCode.trim() ? couponCode : ''
    )
    if (expectedPaise == null) {
      return res.status(400).json(createErrorResponse('Invalid or expired coupon', 'COUPON_INVALID'))
    }
    const clientPaise = Math.round(amountRupees * 100)
    if (clientPaise !== expectedPaise) {
      return res.status(400).json(createErrorResponse('Amount does not match the current offer. Refresh and try again.'))
    }

    const client = getRazorpayClient()
    if (!client) {
      return res.status(503).json(createErrorResponse(
        'Payments are not configured. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET on the server.'
      ))
    }

    const order = await client.orders.create({
      amount: expectedPaise,
      currency: 'INR',
      receipt: `sara_${userId}_${Date.now()}`.slice(0, 40),
      notes: {
        userId: String(userId),
        courseId: cid,
        name: resolvedName.slice(0, 120),
        email: resolvedEmail.slice(0, 120)
      }
    })

    return res.json(createSuccessResponse({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'create order')
  }
})

router.post('/verify-payment', authenticateToken, async (req, res) => {
  try {
    const userId = req.user.userId
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
      courseId = 'javascript'
    } = req.body || {}

    if (!orderId || !paymentId || !signature) {
      return res.status(400).json(createErrorResponse('Missing payment verification fields'))
    }
    const cid = typeof courseId === 'string' ? courseId.trim() : ''
    if (!VALID_COURSE_IDS.has(cid)) {
      return res.status(400).json(createErrorResponse('Invalid course'))
    }

    const secret = process.env.RAZORPAY_KEY_SECRET
    if (!secret) {
      return res.status(503).json(createErrorResponse('Payment verification is not configured.'))
    }

    const body = `${orderId}|${paymentId}`
    const expectedSig = crypto.createHmac('sha256', secret).update(body).digest('hex')
    if (!razorpaySignaturesMatch(expectedSig, String(signature))) {
      return res.status(400).json(createErrorResponse('Payment verification failed', 'SIGNATURE_MISMATCH'))
    }

    const client = getRazorpayClient()
    if (!client) {
      return res.status(503).json(createErrorResponse(
        'Payment verification requires Razorpay API access. Set RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET.'
      ))
    }
    try {
      const order = await client.orders.fetch(orderId)
      const paid = Number(order.amount_paid)
      const ok = order.status === 'paid' && Number.isFinite(paid) && paid >= 100
      if (!ok) {
        return res.status(400).json(createErrorResponse('Order was not paid successfully.'))
      }
    } catch (fetchErr) {
      handleErrorResponse(res, fetchErr, 'verify payment order fetch')
      return
    }

    await unlockCourseForUser(userId, cid)
    return res.json(createSuccessResponse({
      message: 'Payment successful. Your course is unlocked.',
      courseId: cid
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'verify payment')
  }
})

export default router
