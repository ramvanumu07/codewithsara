/**
 * Payout Engine Service
 * Handles safe payout processing with race condition protection
 */

import { v4 as uuidv4 } from 'uuid'
import { query, isDatabaseConfigured } from './db.js'
import crypto from 'crypto'

// ============ PAYOUT INITIATION ============

/**
 * Calculate promoter's current pending earnings from coupon enrollments
 * @param {string} promoterId - Promoter ID
 * @returns {Promise<Object>} { totalEnrollments, pendingEarningsRupees, couponCodes }
 */
export async function calculatePromoterEarnings (promoterId) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  // Get promoter's coupon codes
  const { rows: coupons } = await query(
    `SELECT coupon_code FROM public.promoter_coupons WHERE promoter_id = $1`,
    [promoterId]
  )

  if (coupons.length === 0) {
    return {
      totalEnrollments: 0,
      pendingEarningsRupees: 0,
      couponCodes: []
    }
  }

  const couponCodes = coupons.map(c => c.coupon_code)

  // Sum successful_enrollments across all promoter's coupons
  const { rows: earnings } = await query(
    `SELECT COALESCE(SUM(successful_enrollments), 0) as total_enrollments
     FROM public.coupons
     WHERE code = ANY($1)`,
    [couponCodes]
  )

  const totalEnrollments = parseInt(earnings[0]?.total_enrollments || 0, 10)
  const commission = parseInt(process.env.PROMOTER_COMMISSION_PER_ENROLLMENT || 200, 10)
  const pendingEarningsRupees = totalEnrollments * commission

  return {
    totalEnrollments,
    pendingEarningsRupees,
    couponCodes
  }
}

/**
 * Request a payout for promoter
 * Validates amount, checks for duplicates, and creates payout record
 * @param {string} promoterId - Promoter ID
 * @param {number} requestedAmountRupees - Requested payout amount
 * @returns {Promise<Object>} Payout object with id, amount, status
 */
export async function requestPromoterPayout (promoterId, requestedAmountRupees) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  // Validate amount
  const amount = parseInt(requestedAmountRupees, 10)
  if (!Number.isFinite(amount) || amount < 100) {
    throw new Error('Minimum payout amount is ₹100')
  }

  if (amount > 10000000) {
    throw new Error('Payout amount exceeds maximum limit')
  }

  // Get promoter
  const promoter = await query(
    `SELECT id, email, name, status FROM public.promoters WHERE id = $1`,
    [promoterId]
  )

  if (promoter.rows.length === 0) {
    throw new Error('Promoter not found')
  }

  const promoterData = promoter.rows[0]

  if (promoterData.status !== 'active') {
    throw new Error('Only active promoters can request payouts')
  }

  // Calculate current earnings
  const earnings = await calculatePromoterEarnings(promoterId)

  if (earnings.pendingEarningsRupees < amount) {
    throw new Error(`Insufficient balance. Available: ₹${earnings.pendingEarningsRupees}`)
  }

  // Generate idempotency key (prevents duplicate payouts within same hour)
  const now = new Date()
  const hourKey = `${now.getFullYear()}-${now.getMonth()}-${now.getDate()}-${now.getHours()}`
  const idempotencyKey = crypto
    .createHash('sha256')
    .update(`${promoterId}_${hourKey}`)
    .digest('hex')

  // Check if there's already an active payout
  const { rows: activePayout } = await query(
    `SELECT id FROM public.payouts
     WHERE promoter_id = $1 AND status IN ('pending', 'processing')
     LIMIT 1`,
    [promoterId]
  )

  if (activePayout.length > 0) {
    // Return existing payout instead of creating new one
    return {
      id: activePayout[0].id,
      alreadyProcessing: true,
      message: 'Payout already in progress'
    }
  }

  // Create payout record
  try {
    const { rows } = await query(
      `INSERT INTO public.payouts (
        promoter_id, amount_rupees, status, idempotency_key,
        enrollments_count, requested_at
      ) VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING id, amount_rupees, status, created_at`,
      [promoterId, amount, 'pending', idempotencyKey, earnings.totalEnrollments]
    )

    return {
      id: rows[0].id,
      amount: rows[0].amount_rupees,
      status: rows[0].status,
      createdAt: rows[0].created_at
    }
  } catch (err) {
    if (err.code === '23505') { // unique_violation on idempotency_key
      // Try to fetch existing payout with this key
      const { rows: existing } = await query(
        `SELECT id, amount_rupees, status FROM public.payouts WHERE idempotency_key = $1`,
        [idempotencyKey]
      )
      if (existing.length > 0) {
        return {
          id: existing[0].id,
          amount: existing[0].amount_rupees,
          status: existing[0].status,
          alreadyProcessing: true
        }
      }
    }
    throw err
  }
}

// ============ PAYOUT COMPLETION ============

/**
 * Mark payout as completed after Razorpay processes it
 * Atomically: updates payout status, resets coupon counts, logs event
 * @param {string} payoutId - Payout ID
 * @param {string} razorpayPayoutId - Razorpay payout ID
 * @returns {Promise<Object>} Updated payout
 */
export async function completePromoterPayout (payoutId, razorpayPayoutId) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  const client = await query('BEGIN')

  try {
    // Get payout with lock
    const { rows: payouts } = await query(
      `SELECT id, promoter_id, amount_rupees, enrollments_count, status
       FROM public.payouts
       WHERE id = $1
       FOR UPDATE`,
      [payoutId]
    )

    if (payouts.length === 0) {
      throw new Error('Payout not found')
    }

    const payout = payouts[0]

    if (payout.status === 'completed') {
      throw new Error('Payout already completed')
    }

    // Get promoter's coupon codes with lock
    const { rows: coupons } = await query(
      `SELECT coupon_code FROM public.promoter_coupons
       WHERE promoter_id = $1
       FOR UPDATE`,
      [payout.promoter_id]
    )

    const couponCodes = coupons.map(c => c.coupon_code)

    // Update payout to completed
    await query(
      `UPDATE public.payouts
       SET status = $1, razorpay_payout_id = $2, completed_at = NOW(), updated_at = NOW()
       WHERE id = $3`,
      ['completed', razorpayPayoutId, payoutId]
    )

    // Reset coupon successful_enrollments to 0 for all promoter coupons
    if (couponCodes.length > 0) {
      await query(
        `UPDATE public.coupons
         SET successful_enrollments = 0
         WHERE code = ANY($1)`,
        [couponCodes]
      )
    }

    // Update promoter's total_earned_rupees and clear pending
    await query(
      `UPDATE public.promoters
       SET total_earned_rupees = total_earned_rupees + $1,
           pending_earnings_rupees = 0,
           last_payout_at = NOW(),
           updated_at = NOW()
       WHERE id = $2`,
      [payout.amount_rupees, payout.promoter_id]
    )

    // Log payout completion event
    await query(
      `INSERT INTO public.payout_audit_log (payout_id, event_type, metadata)
       VALUES ($1, $2, $3)`,
      [
        payoutId,
        'payout_completed',
        JSON.stringify({
          amount: payout.amount_rupees,
          enrollments_paid: payout.enrollments_count,
          razorpay_payout_id: razorpayPayoutId,
          coupon_codes: couponCodes
        })
      ]
    )

    await query('COMMIT')

    return {
      id: payoutId,
      status: 'completed',
      amount: payout.amount_rupees,
      razorpayPayoutId
    }
  } catch (err) {
    await query('ROLLBACK').catch(() => {})
    throw err
  }
}

/**
 * Mark payout as failed
 * @param {string} payoutId - Payout ID
 * @param {string} failureReason - Reason for failure
 * @param {number} retryCount - Number of retry attempts
 * @returns {Promise<Object>} Updated payout
 */
export async function failPromoterPayout (payoutId, failureReason, retryCount = 0) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  // Schedule next retry in 1 hour if under max retries
  let nextRetryAt = null
  if (retryCount < 3) {
    nextRetryAt = new Date(Date.now() + 60 * 60 * 1000)
  }

  const { rows } = await query(
    `UPDATE public.payouts
     SET status = $1, failure_reason = $2, retry_count = $3, 
         next_retry_at = $4, updated_at = NOW()
     WHERE id = $5
     RETURNING id, status, retry_count, next_retry_at`,
    ['failed', failureReason, retryCount, nextRetryAt, payoutId]
  )

  if (rows.length === 0) {
    throw new Error('Payout not found')
  }

  // Log failure event
  try {
    await query(
      `INSERT INTO public.payout_audit_log (payout_id, event_type, metadata)
       VALUES ($1, $2, $3)`,
      [
        payoutId,
        'payout_failed',
        JSON.stringify({
          reason: failureReason,
          retry_count: retryCount,
          next_retry_at: nextRetryAt
        })
      ]
    )
  } catch (err) {
    console.error('Failed to log payout failure:', err)
  }

  return rows[0]
}

// ============ PAYOUT RETRIEVAL ============

/**
 * Get payout by ID
 * @param {string} payoutId - Payout ID
 * @returns {Promise<Object>} Payout object
 */
export async function getPayoutById (payoutId) {
  if (!isDatabaseConfigured()) return null

  const { rows } = await query(
    `SELECT id, promoter_id, amount_rupees, status, razorpay_payout_id,
            failure_reason, retry_count, enrollments_count,
            requested_at, processed_at, completed_at, created_at
     FROM public.payouts
     WHERE id = $1`,
    [payoutId]
  )

  return rows[0] || null
}

/**
 * Get all payouts for a promoter
 * @param {string} promoterId - Promoter ID
 * @param {Object} options - Query options { limit, offset, status }
 * @returns {Promise<Array>} Array of payout objects
 */
export async function getPromoterPayouts (promoterId, options = {}) {
  if (!isDatabaseConfigured()) return []

  const limit = Math.min(parseInt(options.limit || 20, 10), 100)
  const offset = Math.max(parseInt(options.offset || 0, 10), 0)
  const statusFilter = options.status ? ` AND status = '${options.status}'` : ''

  const { rows } = await query(
    `SELECT id, amount_rupees, status, razorpay_payout_id,
            failure_reason, enrollments_count,
            requested_at, completed_at
     FROM public.payouts
     WHERE promoter_id = $1 ${statusFilter}
     ORDER BY requested_at DESC
     LIMIT $2 OFFSET $3`,
    [promoterId, limit, offset]
  )

  return rows
}

// ============ HELPERS ============

/**
 * Get payout audit trail for debugging/transparency
 * @param {string} payoutId - Payout ID
 * @returns {Promise<Array>} Array of audit events
 */
export async function getPayoutAuditTrail (payoutId) {
  if (!isDatabaseConfigured()) return []

  const { rows } = await query(
    `SELECT event_type, metadata, created_at
     FROM public.payout_audit_log
     WHERE payout_id = $1
     ORDER BY created_at ASC`,
    [payoutId]
  )

  return rows
}
