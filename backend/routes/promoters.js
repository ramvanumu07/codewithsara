/**
 * Promoter Routes
 * Handles promoter signup, login, dashboard, payouts, and admin functions
 */

import express from 'express'
import { createSuccessResponse, createErrorResponse, handleErrorResponse } from '../utils/responses.js'
import {
  createPromoter,
  authenticatePromoter,
  verifyPromoterToken,
  getPromoterById,
  getPromoterWithCoupons,
  approvePromoter,
  rejectPromoter
} from '../services/promoterAuth.js'
import {
  calculatePromoterEarnings,
  requestPromoterPayout,
  completePromoterPayout,
  failPromoterPayout,
  getPayoutById,
  getPromoterPayouts,
  getPayoutAuditTrail
} from '../services/payoutEngine.js'
import { sendPromoterPayout } from '../services/razorpayPayouts.js'
import { sendEmail } from '../services/emailService.js'
import {
  promoterSignupEmail,
  payoutInitiatedEmail
} from '../services/emailTemplates.js'
import { query } from '../services/db.js'

const router = express.Router()

// ============ PROMOTER AUTH ============

/**
 * POST /api/promoters/signup
 * Register a new promoter
 */
router.post('/signup', async (req, res) => {
  try {
    const {
      email,
      name,
      password,
      confirmPassword,
      payoutMethod,
      accountHolderName,
      accountNumber,
      confirmAccountNumber,
      ifscCode,
      confirmIfscCode,
      upiId
    } = req.body || {}

    // Validate passwords match
    if (password !== confirmPassword) {
      return res.status(400).json(createErrorResponse('Passwords do not match'))
    }

    // Validate bank details match
    if (payoutMethod === 'bank') {
      if (accountNumber !== confirmAccountNumber) {
        return res.status(400).json(createErrorResponse('Account numbers do not match'))
      }
      if (ifscCode !== confirmIfscCode) {
        return res.status(400).json(createErrorResponse('IFSC codes do not match'))
      }
    }

    // Create promoter
    const promoter = await createPromoter({
      email,
      name,
      password,
      payoutMethod,
      accountHolderName,
      accountNumber,
      ifscCode,
      upiId
    })

    // Send welcome email
    try {
      const { subject, html } = promoterSignupEmail(name, promoter.couponCode)
      await sendEmail(email, subject, html)
    } catch (emailErr) {
      console.error('Promoter signup email failed (non-blocking):', emailErr)
    }

    return res.status(201).json(createSuccessResponse({
      message: 'Promoter account created! Awaiting admin approval.',
      promoter
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'promoter signup')
  }
})

/**
 * POST /api/promoters/login
 * Authenticate promoter and return JWT token
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}

    if (!email || !password) {
      return res.status(400).json(createErrorResponse('Email and password required'))
    }

    const { promoter, token } = await authenticatePromoter(email, password)

    return res.json(createSuccessResponse({
      promoter,
      token,
      message: 'Login successful'
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'promoter login')
  }
})

// ============ PROMOTER DASHBOARD ============

/**
 * Middleware to verify promoter JWT token
 */
function authenticatePromoterToken (req, res, next) {
  try {
    const authHeader = req.headers.authorization || ''
    const token = authHeader.replace(/^Bearer\s+/i, '')

    if (!token) {
      return res.status(401).json(createErrorResponse('No token provided'))
    }

    const decoded = verifyPromoterToken(token)
    req.promoter = decoded
    next()
  } catch (err) {
    res.status(401).json(createErrorResponse('Invalid or expired token'))
  }
}

/**
 * GET /api/promoters/me/dashboard
 * Get promoter dashboard data (earnings, status, etc.)
 */
router.get('/me/dashboard', authenticatePromoterToken, async (req, res) => {
  try {
    const promoterId = req.promoter.promoterId

    // Get promoter info
    const promoter = await getPromoterWithCoupons(promoterId)
    if (!promoter) {
      return res.status(404).json(createErrorResponse('Promoter not found'))
    }

    // Calculate earnings
    const earnings = await calculatePromoterEarnings(promoterId)

    // Get recent payouts
    const recentPayouts = await getPromoterPayouts(promoterId, { limit: 5 })

    return res.json(createSuccessResponse({
      promoter: {
        id: promoter.id,
        email: promoter.email,
        name: promoter.name,
        status: promoter.status,
        payoutMethod: promoter.payout_method,
        couponCodes: promoter.couponCodes,
        createdAt: promoter.created_at
      },
      earnings: {
        pendingEnrollments: earnings.totalEnrollments,
        pendingEarningsRupees: earnings.pendingEarningsRupees,
        totalEarnedRupees: promoter.total_earned_rupees,
        lastPayoutAt: promoter.last_payout_at
      },
      recentPayouts: recentPayouts.map(p => ({
        id: p.id,
        amount: p.amount_rupees,
        status: p.status,
        requestedAt: p.requested_at,
        completedAt: p.completed_at
      }))
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get promoter dashboard')
  }
})

/**
 * GET /api/promoters/me/payouts
 * Get promoter's payout history
 */
router.get('/me/payouts', authenticatePromoterToken, async (req, res) => {
  try {
    const promoterId = req.promoter.promoterId
    const { limit, offset, status } = req.query

    const payouts = await getPromoterPayouts(promoterId, { limit, offset, status })

    return res.json(createSuccessResponse({
      payouts: payouts.map(p => ({
        id: p.id,
        amount: p.amount_rupees,
        status: p.status,
        enrollments: p.enrollments_count,
        requestedAt: p.requested_at,
        completedAt: p.completed_at,
        failureReason: p.failure_reason
      }))
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get promoter payouts')
  }
})

// ============ PAYOUT REQUESTS ============

/**
 * POST /api/promoters/me/request-payout
 * Request a payout
 */
router.post('/me/request-payout', authenticatePromoterToken, async (req, res) => {
  try {
    const promoterId = req.promoter.promoterId
    const { amountRupees } = req.body || {}

    if (!amountRupees) {
      return res.status(400).json(createErrorResponse('Amount required'))
    }

    // Get promoter details
    const promoter = await getPromoterById(promoterId)
    if (!promoter) {
      return res.status(404).json(createErrorResponse('Promoter not found'))
    }

    // Request payout
    const payout = await requestPromoterPayout(promoterId, amountRupees)

    if (payout.alreadyProcessing) {
      return res.status(409).json(createSuccessResponse({
        message: 'Payout already in progress',
        payout: {
          id: payout.id,
          status: payout.status
        }
      }))
    }

    // Get full payout details
    const payoutDetails = await getPayoutById(payout.id)

    return res.status(201).json(createSuccessResponse({
      message: 'Payout requested successfully',
      payout: {
        id: payoutDetails.id,
        amount: payoutDetails.amount_rupees,
        status: payoutDetails.status,
        requestedAt: payoutDetails.requested_at
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'request payout')
  }
})

/**
 * POST /api/promoters/me/payout/:payoutId/initiate
 * Initiate actual payout to bank/UPI (internal use)
 */
router.post('/me/payout/:payoutId/initiate', authenticatePromoterToken, async (req, res) => {
  try {
    const { payoutId } = req.params
    const promoterId = req.promoter.promoterId

    // Get payout
    const payout = await getPayoutById(payoutId)
    if (!payout) {
      return res.status(404).json(createErrorResponse('Payout not found'))
    }

    if (payout.promoter_id !== promoterId) {
      return res.status(403).json(createErrorResponse('Unauthorized'))
    }

    if (payout.status !== 'pending') {
      return res.status(400).json(createErrorResponse('Payout status does not allow initiation'))
    }

    // Get promoter details
    const promoter = await getPromoterById(promoterId)

    // Send to Razorpay
    const result = await sendPromoterPayout({
      payoutId,
      amountRupees: payout.amount_rupees,
      accountNumber: promoter.account_number,
      ifscCode: promoter.ifsc_code,
      upiId: promoter.upi_id,
      payoutMethod: promoter.payout_method,
      promoterName: promoter.name,
      idempotencyKey: `${payoutId}_initiate`
    })

    if (!result.success) {
      // Mark payout as failed
      await failPromoterPayout(payoutId, result.message, 0)
      return res.status(400).json(createErrorResponse(`Payout failed: ${result.message}`))
    }

    // Update payout with Razorpay ID
    await query(
      `UPDATE public.payouts SET razorpay_payout_id = $1, status = $2, processed_at = NOW() WHERE id = $3`,
      [result.razorpayPayoutId, 'processing', payoutId]
    )

    // Send payout initiated email
    try {
      const { subject, html } = payoutInitiatedEmail(promoter.name, payout.amount_rupees)
      await sendEmail(promoter.email, subject, html)
    } catch (emailErr) {
      console.error('Payout email failed (non-blocking):', emailErr)
    }

    return res.json(createSuccessResponse({
      message: 'Payout initiated with Razorpay',
      payout: {
        id: payoutId,
        razorpayPayoutId: result.razorpayPayoutId,
        status: 'processing'
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'initiate payout')
  }
})

// ============ ADMIN FUNCTIONS ============

/**
 * Middleware to verify admin
 */
function adminOnly (req, res, next) {
  // Use existing admin check from auth routes
  // For now, simple check - can be enhanced
  if (req.headers['x-admin-key'] === process.env.ADMIN_KEY) {
    next()
  } else {
    res.status(403).json(createErrorResponse('Admin access required'))
  }
}

/**
 * GET /api/admin/promoters
 * List all promoters (admin only)
 */
router.get('/admin', adminOnly, async (req, res) => {
  try {
    const { status, limit = 50, offset = 0 } = req.query

    let query_str = 'SELECT id, email, name, status, payout_method, pending_earnings_rupees, total_earned_rupees, created_at FROM public.promoters'
    const params = []

    if (status) {
      query_str += ' WHERE status = $1'
      params.push(status)
    }

    query_str += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2)
    params.push(limit, offset)

    const { rows } = await query(query_str, params)

    return res.json(createSuccessResponse({
      promoters: rows.map(p => ({
        id: p.id,
        email: p.email,
        name: p.name,
        status: p.status,
        payoutMethod: p.payout_method,
        pendingEarnings: p.pending_earnings_rupees,
        totalEarned: p.total_earned_rupees,
        createdAt: p.created_at
      }))
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'list promoters')
  }
})

/**
 * POST /api/admin/promoters/:promoterId/approve
 * Approve a promoter (admin only)
 */
router.post('/admin/:promoterId/approve', adminOnly, async (req, res) => {
  try {
    const { promoterId } = req.params
    const { reason } = req.body || {}

    const updated = await approvePromoter(promoterId, req.user?.userId, reason)

    return res.json(createSuccessResponse({
      message: 'Promoter approved',
      promoter: updated
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'approve promoter')
  }
})

/**
 * POST /api/admin/promoters/:promoterId/reject
 * Reject a promoter (admin only)
 */
router.post('/admin/:promoterId/reject', adminOnly, async (req, res) => {
  try {
    const { promoterId } = req.params
    const { reason } = req.body || {}

    const updated = await rejectPromoter(promoterId, req.user?.userId, reason)

    return res.json(createSuccessResponse({
      message: 'Promoter rejected',
      promoter: updated
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'reject promoter')
  }
})

export default router
