/**
 * Promoter Authentication Service
 * Handles signup, login, and JWT token generation for promoters
 */

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import { query, isDatabaseConfigured } from './db.js'

const BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS || '12', 10)
const JWT_SECRET = process.env.JWT_SECRET

// ============ PROMOTER SIGNUP ============

/**
 * Create a new promoter account
 * @param {Object} data - Signup data
 * @returns {Promise<Object>} Created promoter (without password_hash)
 */
export async function createPromoter (data) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  const {
    email,
    name,
    password,
    payoutMethod, // 'bank' or 'upi'
    accountHolderName,
    accountNumber,
    ifscCode,
    upiId
  } = data

  // Validate required fields
  if (!email || !name || !password || !payoutMethod) {
    throw new Error('Missing required fields')
  }

  const emailLower = email.trim().toLowerCase()
  const nameTrimmed = name.trim()
  const passwordTrimmed = password.trim()

  if (passwordTrimmed.length < 6) {
    throw new Error('Password must be at least 6 characters')
  }

  // Validate payout method
  if (!['bank', 'upi'].includes(payoutMethod)) {
    throw new Error('Invalid payout method')
  }

  // Check if email exists
  const existing = await query(
    'SELECT id FROM public.promoters WHERE LOWER(email) = $1',
    [emailLower]
  )
  if (existing.rows?.length > 0) {
    throw new Error('Email already registered')
  }

  // Validate payout method fields
  if (payoutMethod === 'bank') {
    if (!accountHolderName || !accountNumber || !ifscCode) {
      throw new Error('Bank details required for bank transfer')
    }
    if (accountNumber.length < 8 || accountNumber.length > 20) {
      throw new Error('Invalid account number')
    }
    if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifscCode)) {
      throw new Error('Invalid IFSC code format')
    }
  } else if (payoutMethod === 'upi') {
    if (!upiId) {
      throw new Error('UPI ID required for UPI transfers')
    }
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(upiId)) {
      throw new Error('Invalid UPI ID format')
    }
  }

  // Hash password
  const passwordHash = await bcrypt.hash(passwordTrimmed, BCRYPT_ROUNDS)

  // Generate unique coupon code
  const couponCode = generatePromoterCouponCode(nameTrimmed)

  try {
    // Create promoter
    const { rows } = await query(
      `INSERT INTO public.promoters (
        email, name, password_hash, payout_method,
        account_holder_name, account_number, ifsc_code, upi_id,
        status
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id, email, name, payout_method, status, created_at`,
      [
        emailLower,
        nameTrimmed,
        passwordHash,
        payoutMethod,
        payoutMethod === 'bank' ? accountHolderName : null,
        payoutMethod === 'bank' ? accountNumber : null,
        payoutMethod === 'bank' ? ifscCode : null,
        payoutMethod === 'upi' ? upiId : null,
        'pending_verification'
      ]
    )

    const promoter = rows[0]

    // Create coupon and link to promoter
    try {
      // Note: ON CONFLICT requires an explicit index; we use the one on UPPER(TRIM(code))
      // However, PostgreSQL treats this as a UNIQUE violation on the code column itself
      // So we insert normally; if it fails with unique_violation, we catch it
      await query(
        `INSERT INTO public.coupons (code, discount_rupees)
        VALUES ($1, $2)`,
        [couponCode, 200] // 200 rupees discount for promoter coupons
      )

      await query(
        `INSERT INTO public.promoter_coupons (promoter_id, coupon_code)
        VALUES ($1, $2)`,
        [promoter.id, couponCode]
      )
    } catch (err) {
      console.error('Failed to create coupon:', err)
      // Don't fail signup if coupon creation fails
    }

    return {
      id: promoter.id,
      email: promoter.email,
      name: promoter.name,
      payoutMethod: promoter.payout_method,
      status: promoter.status,
      createdAt: promoter.created_at,
      couponCode
    }
  } catch (err) {
    if (err.code === '23505') { // unique_violation
      throw new Error('Email or coupon code already exists')
    }
    throw err
  }
}

// ============ PROMOTER LOGIN ============

/**
 * Authenticate promoter and return JWT token
 * @param {string} email - Promoter email
 * @param {string} password - Promoter password
 * @returns {Promise<Object>} { promoter, token }
 */
export async function authenticatePromoter (email, password) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  const emailLower = email.trim().toLowerCase()

  const { rows } = await query(
    `SELECT id, email, name, password_hash, status, payout_method, pending_earnings_rupees, total_earned_rupees
     FROM public.promoters
     WHERE LOWER(email) = $1`,
    [emailLower]
  )

  if (rows.length === 0) {
    throw new Error('Invalid email or password')
  }

  const promoter = rows[0]

  // Verify password
  const passwordValid = await bcrypt.compare(password, promoter.password_hash)
  if (!passwordValid) {
    throw new Error('Invalid email or password')
  }

  // Check status
  if (promoter.status === 'suspended' || promoter.status === 'archived') {
    throw new Error('Account is not active')
  }

  // Generate JWT token
  const token = jwt.sign(
    {
      promoterId: promoter.id,
      email: promoter.email,
      type: 'promoter'
    },
    JWT_SECRET,
    { expiresIn: '7d' }
  )

  return {
    promoter: {
      id: promoter.id,
      email: promoter.email,
      name: promoter.name,
      status: promoter.status,
      payoutMethod: promoter.payout_method,
      pendingEarnings: promoter.pending_earnings_rupees,
      totalEarned: promoter.total_earned_rupees
    },
    token
  }
}

// ============ TOKEN VERIFICATION ============

/**
 * Verify and decode promoter JWT token
 * @param {string} token - JWT token
 * @returns {Object} Decoded token payload
 */
export function verifyPromoterToken (token) {
  if (!token) {
    throw new Error('Token required')
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    if (decoded.type !== 'promoter') {
      throw new Error('Invalid token type')
    }
    return decoded
  } catch (err) {
    throw new Error('Invalid or expired token')
  }
}

// ============ PROMOTER RETRIEVAL ============

/**
 * Get promoter by ID
 * @param {string} promoterId - Promoter ID
 * @returns {Promise<Object>} Promoter object (without password)
 */
export async function getPromoterById (promoterId) {
  if (!isDatabaseConfigured()) return null

  const { rows } = await query(
    `SELECT id, email, name, payout_method, status,
            pending_earnings_rupees, total_earned_rupees, last_payout_at,
            created_at, updated_at
     FROM public.promoters
     WHERE id = $1`,
    [promoterId]
  )

  return rows[0] || null
}

/**
 * Get promoter with coupon codes
 * @param {string} promoterId - Promoter ID
 * @returns {Promise<Object>} Promoter with couponCodes array
 */
export async function getPromoterWithCoupons (promoterId) {
  if (!isDatabaseConfigured()) return null

  const promoter = await getPromoterById(promoterId)
  if (!promoter) return null

  const { rows: coupons } = await query(
    `SELECT coupon_code FROM public.promoter_coupons WHERE promoter_id = $1`,
    [promoterId]
  )

  return {
    ...promoter,
    couponCodes: coupons.map(c => c.coupon_code)
  }
}

// ============ PROMOTER APPROVAL ============

/**
 * Approve a promoter (admin action)
 * @param {string} promoterId - Promoter ID
 * @param {string} adminId - Admin ID (optional)
 * @param {string} reason - Approval reason (optional)
 * @returns {Promise<Object>} Updated promoter
 */
export async function approvePromoter (promoterId, adminId = null, reason = null) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  const { rows } = await query(
    `UPDATE public.promoters
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, email, name, status, created_at`,
    ['active', promoterId]
  )

  if (rows.length === 0) {
    throw new Error('Promoter not found')
  }

  // Log the approval
  try {
    await query(
      `INSERT INTO public.promoter_verification_log (promoter_id, action, admin_id, reason)
       VALUES ($1, $2, $3, $4)`,
      [promoterId, 'approved', adminId, reason]
    )
  } catch (err) {
    console.error('Failed to log approval:', err)
  }

  return rows[0]
}

/**
 * Reject a promoter (admin action)
 * @param {string} promoterId - Promoter ID
 * @param {string} adminId - Admin ID (optional)
 * @param {string} reason - Rejection reason
 * @returns {Promise<Object>} Updated promoter
 */
export async function rejectPromoter (promoterId, adminId = null, reason = null) {
  if (!isDatabaseConfigured()) {
    throw new Error('Database not configured')
  }

  const { rows } = await query(
    `UPDATE public.promoters
     SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, email, name, status`,
    ['suspended', promoterId]
  )

  if (rows.length === 0) {
    throw new Error('Promoter not found')
  }

  // Log the rejection
  try {
    await query(
      `INSERT INTO public.promoter_verification_log (promoter_id, action, admin_id, reason)
       VALUES ($1, $2, $3, $4)`,
      [promoterId, 'rejected', adminId, reason]
    )
  } catch (err) {
    console.error('Failed to log rejection:', err)
  }

  return rows[0]
}

// ============ HELPERS ============

/**
 * Generate unique coupon code from promoter name
 * Format: PROMO_FIRSTNAME_LASTNAME_RANDOM
 */
function generatePromoterCouponCode (name) {
  const parts = name.toUpperCase().split(/\s+/).filter(p => p.length > 0)
  const prefix = parts.slice(0, 2).join('_').substring(0, 20)
  const random = uuidv4().substring(0, 6).toUpperCase()
  return `PROMO_${prefix}_${random}`
}
