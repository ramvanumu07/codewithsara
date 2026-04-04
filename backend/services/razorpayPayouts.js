/**
 * Razorpay Payouts Service
 * Integrates with Razorpay API to send payouts to promoters
 */

import Razorpay from 'razorpay'

let razorpayClient = null

function getRazorpayClient () {
  if (razorpayClient) return razorpayClient

  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    console.warn('[RazorpayPayouts] Razorpay credentials not configured')
    return null
  }

  razorpayClient = new Razorpay({
    key_id: keyId,
    key_secret: keySecret
  })

  return razorpayClient
}

// ============ SEND PAYOUT ============

/**
 * Send payout to promoter's bank account or UPI
 * @param {Object} payoutData - Payout details
 * @param {string} payoutData.payoutId - Internal payout record ID
 * @param {number} payoutData.amountRupees - Amount in rupees
 * @param {string} payoutData.accountNumber - Bank account number (if bank transfer)
 * @param {string} payoutData.ifscCode - IFSC code (if bank transfer)
 * @param {string} payoutData.upiId - UPI ID (if UPI transfer)
 * @param {string} payoutData.payoutMethod - 'bank' or 'upi'
 * @param {string} payoutData.promoterName - Promoter name
 * @param {string} payoutData.idempotencyKey - For deduplication
 * @returns {Promise<Object>} { success, razorpayPayoutId, message, error }
 */
export async function sendPromoterPayout (payoutData) {
  const client = getRazorpayClient()
  if (!client) {
    return {
      success: false,
      message: 'Razorpay not configured',
      error: 'RAZORPAY_NOT_CONFIGURED'
    }
  }

  const {
    payoutId,
    amountRupees,
    accountNumber,
    ifscCode,
    upiId,
    payoutMethod,
    promoterName,
    idempotencyKey
  } = payoutData

  try {
    const amountPaise = amountRupees * 100

    let transferData = {
      account_number: '1112220061746183', // Your Razorpay X account - replace with actual
      amount: amountPaise,
      currency: 'INR',
      mode: payoutMethod === 'bank' ? 'NEFT' : 'UPI',
      purpose: 'payout',
      queue_if_low_balance: true,
      idempotency_key: idempotencyKey,
      notes: {
        payout_id: payoutId,
        promoter_name: promoterName,
        amount_rupees: amountRupees
      }
    }

    // Add recipient details based on payout method
    if (payoutMethod === 'bank') {
      transferData.recipient = {
        account_number: accountNumber,
        ifsc: ifscCode
      }
    } else if (payoutMethod === 'upi') {
      transferData.recipient = {
        vpa: upiId
      }
    } else {
      return {
        success: false,
        message: 'Invalid payout method',
        error: 'INVALID_METHOD'
      }
    }

    // Send payout
    const response = await client.transfers.create(transferData)

    return {
      success: true,
      razorpayPayoutId: response.id,
      message: `Payout initiated. Amount: ₹${amountRupees}`,
      razorpayResponse: response
    }
  } catch (error) {
    console.error('[RazorpayPayouts] Error sending payout:', error.message)

    let errorCode = 'RAZORPAY_ERROR'
    let errorMessage = error.message

    if (error.code === 'BAD_REQUEST_ERROR') {
      errorCode = 'INVALID_ACCOUNT'
      errorMessage = 'Invalid bank/UPI details'
    } else if (error.code === 'GATEWAY_TIMEOUT') {
      errorCode = 'TIMEOUT'
      errorMessage = 'Razorpay timeout - will retry'
    } else if (error.code === 'SERVER_ERROR') {
      errorCode = 'SERVER_ERROR'
      errorMessage = 'Razorpay service error'
    }

    return {
      success: false,
      message: errorMessage,
      error: errorCode,
      razorpayError: error.code
    }
  }
}

// ============ FETCH PAYOUT STATUS ============

/**
 * Fetch current status of a payout from Razorpay
 * @param {string} razorpayPayoutId - Razorpay payout ID
 * @returns {Promise<Object>} Payout status from Razorpay
 */
export async function getPayoutStatus (razorpayPayoutId) {
  const client = getRazorpayClient()
  if (!client) {
    return {
      error: 'RAZORPAY_NOT_CONFIGURED'
    }
  }

  try {
    const payout = await client.transfers.fetch(razorpayPayoutId)
    return {
      id: payout.id,
      status: payout.status,
      amount: payout.amount,
      failureReason: payout.failure_reason || null,
      mode: payout.mode,
      createdAt: payout.created_at,
      processedAt: payout.processed_at
    }
  } catch (error) {
    console.error(`[RazorpayPayouts] Error fetching payout ${razorpayPayoutId}:`, error.message)
    return {
      error: 'FETCH_FAILED',
      message: error.message
    }
  }
}

// ============ WEBHOOK VERIFICATION ============

/**
 * Verify Razorpay webhook signature
 * @param {string} bodyRaw - Raw request body
 * @param {string} signature - X-Razorpay-Signature header
 * @returns {boolean} True if signature is valid
 */
export function verifyWebhookSignature (bodyRaw, signature) {
  const crypto = require('crypto')
  const secret = process.env.RAZORPAY_WEBHOOK_SECRET

  if (!secret) {
    console.warn('[RazorpayPayouts] RAZORPAY_WEBHOOK_SECRET not configured')
    return false
  }

  const hash = crypto
    .createHmac('sha256', secret)
    .update(bodyRaw)
    .digest('hex')

  return hash === signature
}

// ============ MOCK PAYOUT (For Testing) ============

/**
 * Mock payout for development/testing
 * @param {Object} payoutData - Payout details
 * @returns {Promise<Object>} Mock response
 */
export async function mockSendPromoterPayout (payoutData) {
  const { payoutId, amountRupees, promoterName } = payoutData

  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100))

  return {
    success: true,
    razorpayPayoutId: `mock_payout_${payoutId}_${Date.now()}`,
    message: `Mock payout sent. Amount: ₹${amountRupees} to ${promoterName}`,
    razorpayResponse: {
      id: `mock_payout_${payoutId}_${Date.now()}`,
      amount: amountRupees * 100,
      status: 'processed',
      mode: payoutData.payoutMethod
    }
  }
}
