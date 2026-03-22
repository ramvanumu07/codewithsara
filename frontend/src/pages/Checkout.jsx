import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { payments, handleApiError } from '../config/api'
import { getUnlockOfferForDashboardCourse } from '../data/welcomeCourseOffers'
import OfferPricePromo from '../components/OfferPricePromo'
import './Checkout.css'

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID

function loadRazorpayScript () {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Window is not available'))
      return
    }
    if (window.Razorpay) {
      resolve(window.Razorpay)
      return
    }
    const existing = document.querySelector('script[data-razorpay-checkout]')
    if (existing) {
      existing.addEventListener('load', () => resolve(window.Razorpay))
      existing.addEventListener('error', () => reject(new Error('Failed to load Razorpay')))
      return
    }
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    s.dataset.razorpayCheckout = '1'
    s.onload = () => resolve(window.Razorpay)
    s.onerror = () => reject(new Error('Failed to load Razorpay'))
    document.body.appendChild(s)
  })
}

function formatInr (rupees) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rupees)
}

export default function Checkout () {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { user } = useAuth()

  const courseId = (searchParams.get('course') || 'javascript').trim() || 'javascript'
  const offer = useMemo(() => getUnlockOfferForDashboardCourse(courseId), [courseId])
  const baseRupees = offer?.priceAmount ?? 999

  const [name, setName] = useState(() => (user?.name || '').trim())
  const [email, setEmail] = useState(() => (user?.email || '').trim())
  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponSuccess, setCouponSuccess] = useState(null)
  const [discountLine, setDiscountLine] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [payError, setPayError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  const [payBusy, setPayBusy] = useState(false)

  useEffect(() => {
    if (user?.name) setName((n) => n || String(user.name).trim())
    if (user?.email) setEmail((e) => e || String(user.email).trim())
  }, [user?.name, user?.email])

  const finalRupees = appliedCoupon != null ? appliedCoupon.finalRupees : baseRupees
  const finalPaise = Math.round(finalRupees * 100)

  const canPay = Boolean(name.trim() && email.trim() && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))

  const onCouponChange = (e) => {
    setCouponInput(e.target.value)
    setCouponError('')
    if (appliedCoupon && e.target.value.trim().toUpperCase() !== (appliedCoupon.code || '').toUpperCase()) {
      setAppliedCoupon(null)
      setCouponSuccess(null)
      setDiscountLine(null)
    }
  }

  const handleApplyCoupon = async () => {
    const code = couponInput.trim()
    setCouponError('')
    setCouponSuccess(null)
    setDiscountLine(null)
    setAppliedCoupon(null)
    if (!code) {
      setCouponError('Invalid or expired coupon')
      return
    }
    setApplyingCoupon(true)
    try {
      const { data } = await payments.applyCoupon(code, baseRupees)
      if (!data?.success || !data.data) {
        setCouponError('Invalid or expired coupon')
        return
      }
      const d = data.data
      setAppliedCoupon({
        code,
        finalRupees: d.finalRupees,
        discountRupees: d.discountRupees
      })
      setCouponSuccess(d.message || 'Coupon applied')
      setDiscountLine({
        label: d.discountLabel || `Coupon (${code.toUpperCase()})`,
        amount: d.discountRupees
      })
    } catch (err) {
      const msg = err.response?.data?.message || ''
      if (msg.toLowerCase().includes('coupon') || err.response?.status === 400) {
        setCouponError('Invalid or expired coupon')
      } else {
        setCouponError(handleApiError(err, 'Could not apply coupon. Try again.'))
      }
    } finally {
      setApplyingCoupon(false)
    }
  }

  const openRazorpay = useCallback(async () => {
    setPayError('')
    if (!RAZORPAY_KEY) {
      setPayError('Payment could not start: Razorpay key is not configured (VITE_RAZORPAY_KEY_ID).')
      return
    }
    if (!canPay) return

    setPayBusy(true)
    try {
      const payload = {
        amount: finalPaise,
        name: name.trim(),
        email: email.trim(),
        courseId,
        ...(appliedCoupon ? { couponCode: appliedCoupon.code } : {})
      }
      const { data } = await payments.createOrder(payload)
      if (!data?.success || !data.data?.orderId) {
        setPayError(handleApiError({ message: 'Could not create order' }, 'Could not create order. Try again.'))
        setPayBusy(false)
        return
      }
      const { orderId, amount, currency } = data.data
      const RazorpayCtor = await loadRazorpayScript()

      const options = {
        key: RAZORPAY_KEY,
        amount: String(amount),
        currency: currency || 'INR',
        order_id: orderId,
        name: 'Sara Learning Platform',
        description: 'JavaScript with Sara — Full Access',
        prefill: {
          name: name.trim(),
          email: email.trim()
        },
        theme: { color: '#10b981' },
        handler: async (response) => {
          try {
            const verifyRes = await payments.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId
            })
            if (!verifyRes.data?.success) {
              setPayError('Payment verification failed. Contact support if you were charged.')
              return
            }
            navigate('/dashboard', {
              replace: false,
              state: { paymentSuccess: true }
            })
          } catch (e) {
            setPayError(handleApiError(e, 'Payment verification failed. Contact support if you were charged.'))
          } finally {
            setPayBusy(false)
          }
        },
        modal: {
          ondismiss: () => {
            setPayBusy(false)
          }
        }
      }

      const rzp = new RazorpayCtor(options)
      rzp.on('payment.failed', () => {
        setPayError('Payment failed. You can try again or use a different method.')
        setPayBusy(false)
      })
      rzp.open()
    } catch (e) {
      setPayError(handleApiError(e, 'Could not start payment. Try again.'))
      setPayBusy(false)
    }
  }, [appliedCoupon, canPay, courseId, email, finalPaise, name, navigate])

  const busy = applyingCoupon || payBusy

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <Link to="/dashboard" className="checkout-page__back">
          ← Back to dashboard
        </Link>
        <span className="checkout-page__brand">Sara</span>
      </header>

      <main className="checkout-page__main">
        <div className="checkout-card">
          <p className="checkout-card__eyebrow">Checkout</p>
          <h1 className="checkout-card__title">JavaScript with Sara — Full Access</h1>
          <p className="checkout-card__subtitle">
            One-time payment for the full curriculum, AI sessions, playground, and assignments.
          </p>

          {offer && (
            <div className="checkout-card__price-row">
              <span className="checkout-card__price-label">Your price</span>
              <OfferPricePromo offer={offer} variant="dashboard" />
            </div>
          )}

          <div className="checkout-field">
            <label htmlFor="checkout-name">Full name</label>
            <input
              id="checkout-name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
            />
          </div>

          <div className="checkout-field">
            <label htmlFor="checkout-email">Email</label>
            <input
              id="checkout-email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="checkout-coupon">
            <label htmlFor="checkout-coupon">Coupon code</label>
            <div className="checkout-coupon__row">
              <input
                id="checkout-coupon"
                type="text"
                value={couponInput}
                onChange={onCouponChange}
                placeholder="Enter code"
                autoComplete="off"
                disabled={applyingCoupon}
              />
              <button
                type="button"
                className="checkout-coupon__apply"
                onClick={handleApplyCoupon}
                disabled={applyingCoupon || busy}
              >
                {applyingCoupon ? (
                  <span className="checkout-spinner checkout-spinner--inline" aria-hidden />
                ) : (
                  'Apply'
                )}
              </button>
            </div>
            {couponError && (
              <p className="checkout-inline-error" role="alert">
                {couponError}
              </p>
            )}
            {couponSuccess && !couponError && (
              <p className="checkout-inline-success" role="status">
                {couponSuccess}
              </p>
            )}
          </div>

          <div className="checkout-summary">
            {discountLine && (
              <div className="checkout-summary__row checkout-summary__row--discount">
                <span>{discountLine.label}</span>
                <span>−{formatInr(discountLine.amount)}</span>
              </div>
            )}
            <div className="checkout-summary__row checkout-summary__row--total">
              <span>Amount to pay</span>
              <strong>{formatInr(finalRupees)}</strong>
            </div>
          </div>

          {payError && (
            <p className="checkout-inline-error checkout-inline-error--pay" role="alert">
              {payError}
            </p>
          )}

          <button
            type="button"
            className="checkout-pay-btn"
            disabled={!canPay || busy}
            onClick={openRazorpay}
          >
            {payBusy ? (
              <>
                <span className="checkout-spinner checkout-spinner--btn" aria-hidden />
                Processing…
              </>
            ) : (
              'Proceed to Pay'
            )}
          </button>

          <div className="checkout-secure">
            <svg className="checkout-secure__lock" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span>Secured by Razorpay</span>
          </div>

          <p className="checkout-footnote">
            Questions? See{' '}
            <Link to="/products">Products &amp; Services</Link>
            {' '}or contact support.
          </p>
        </div>
      </main>
    </div>
  )
}
