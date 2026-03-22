import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { auth, payments, handleApiError } from '../config/api'
import { getUnlockOfferForDashboardCourse } from '../data/welcomeCourseOffers'
import OfferPricePromo from '../components/OfferPricePromo'
import { copyToClipboard } from '../utils/copyToClipboard'
import './Checkout.css'

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID
const CHECKOUT_DISPLAY_COUPON = String(import.meta.env.VITE_CHECKOUT_PROMO_CODE || 'WELCOMESARA').trim().toUpperCase()

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

  const courseId = (searchParams.get('course') || 'javascript').trim() || 'javascript'
  const offer = useMemo(() => getUnlockOfferForDashboardCourse(courseId), [courseId])
  const baseRupees = offer?.priceAmount ?? 999

  const [payerName, setPayerName] = useState('')
  const [payerEmail, setPayerEmail] = useState('')
  const [profileReady, setProfileReady] = useState(false)

  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [payError, setPayError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  const [payBusy, setPayBusy] = useState(false)
  const [copyLabel, setCopyLabel] = useState('Copy')

  useEffect(() => {
    let cancelled = false
    auth.getProfile()
      .then((res) => {
        if (cancelled) return
        const u = res.data?.data?.user
        if (u) {
          setPayerName((u.name || u.username || '').trim())
          setPayerEmail((u.email || '').trim())
        }
      })
      .catch(() => { /* keep empty; pay will surface API error */ })
      .finally(() => {
        if (!cancelled) setProfileReady(true)
      })
    return () => { cancelled = true }
  }, [])

  const finalRupees = appliedCoupon != null ? appliedCoupon.finalRupees : baseRupees
  const finalPaise = Math.round(finalRupees * 100)

  const emailOk = payerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)
  const canPay = profileReady && emailOk

  const onCouponChange = (e) => {
    setCouponInput(e.target.value)
    setCouponError('')
    if (appliedCoupon && e.target.value.trim().toUpperCase() !== (appliedCoupon.code || '').toUpperCase()) {
      setAppliedCoupon(null)
    }
  }

  const handleApplyCoupon = async () => {
    const code = couponInput.trim()
    setCouponError('')
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
        name: payerName,
        email: payerEmail,
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
          name: payerName,
          email: payerEmail
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
  }, [appliedCoupon, canPay, courseId, finalPaise, navigate, payerEmail, payerName])

  const busy = applyingCoupon || payBusy

  const handleCopyPromo = async () => {
    const ok = await copyToClipboard(CHECKOUT_DISPLAY_COUPON)
    if (ok) {
      setCopyLabel('Copied!')
      window.setTimeout(() => setCopyLabel('Copy'), 2000)
    }
  }

  return (
    <div className="checkout-page">
      <header className="checkout-page__header">
        <span className="checkout-page__brand">Sara</span>
        <Link to="/dashboard" className="checkout-page__back">
          Back to dashboard
        </Link>
      </header>

      <main className="checkout-page__main">
        <div className="checkout-card">
          <div className="checkout-card__panel checkout-card__panel--product">
            <h1 className="checkout-card__heading">Checkout</h1>
            <h2 className="checkout-card__product-title">JavaScript with Sara — Full Access</h2>
            <p className="checkout-card__subtitle">
              One-time payment for full access to the curriculum, AI tutoring, and the code playground — plus your certificate when you complete the course.
            </p>

            {offer && (
              <div className="checkout-card__price-row">
                <span className="checkout-card__price-label">Your price</span>
                <OfferPricePromo offer={offer} variant="checkout" />
              </div>
            )}
          </div>

          <div className="checkout-card__split" aria-hidden="true" />

          <div className="checkout-card__panel checkout-card__panel--middle">
            {profileReady && !emailOk && (
              <p className="checkout-profile-hint" role="status">
                Add a valid email to your account to complete payment. Contact support if you need help updating your profile.
              </p>
            )}

            <div className="checkout-promo-banner" aria-label="Featured coupon code">
              <div className="checkout-promo-banner__main">
                {appliedCoupon && !couponError ? (
                  <span className="checkout-promo-banner__tick" aria-hidden>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  </span>
                ) : null}
                <span className="checkout-promo-banner__code">{CHECKOUT_DISPLAY_COUPON}</span>
                <button
                  type="button"
                  className="checkout-promo-banner__copy"
                  onClick={handleCopyPromo}
                >
                  {copyLabel}
                </button>
              </div>
              {appliedCoupon && !couponError ? (
                <p className="checkout-promo-banner__off">
                  Flat <strong>{formatInr(appliedCoupon.discountRupees)}</strong> off your order
                </p>
              ) : null}
            </div>

            <div className="checkout-coupon">
              <label htmlFor="checkout-coupon">Coupon code</label>
              <div className="checkout-coupon__row">
                <input
                  id="checkout-coupon"
                  type="text"
                  value={couponInput}
                  onChange={onCouponChange}
                  placeholder="Paste code and apply"
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
                    <span className="checkout-spinner checkout-spinner--apply" aria-hidden />
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
            </div>
          </div>

          <div className="checkout-card__panel checkout-card__panel--summary">
            <div className="checkout-summary">
              <div className="checkout-summary__row checkout-summary__row--total">
                <span className="checkout-summary__label">Amount to pay</span>
                <strong className="checkout-summary__amount">{formatInr(finalRupees)}</strong>
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
              <svg className="checkout-secure__lock" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
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
        </div>
      </main>
    </div>
  )
}
