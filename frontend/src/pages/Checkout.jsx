import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { auth, payments, handleApiError } from '../config/api'
import { getUnlockOfferForDashboardCourse } from '../data/welcomeCourseOffers'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import './Checkout.css'

const RAZORPAY_KEY = import.meta.env.VITE_RAZORPAY_KEY_ID

function loadRazorpayScript() {
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

function formatInr(rupees) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rupees)
}

export default function Checkout() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { toasts, error: showPayErrorToast } = useToast()

  const courseId = (searchParams.get('course') || 'javascript').trim() || 'javascript'
  const offer = useMemo(() => getUnlockOfferForDashboardCourse(courseId), [courseId])
  const baseRupees = offer?.priceAmount ?? 999
  const listRupees = offer?.compareAtAmount ?? 1599

  const [payerName, setPayerName] = useState('')
  const [payerEmail, setPayerEmail] = useState('')
  const [profileReady, setProfileReady] = useState(false)

  const [couponInput, setCouponInput] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState(null)
  const [couponError, setCouponError] = useState('')
  const [applyingCoupon, setApplyingCoupon] = useState(false)
  const [payBusy, setPayBusy] = useState(false)
  /** idle | open | verifying | settled — avoids treating modal dismiss as cancel after pay flow advances */
  const payPhaseRef = useRef('idle')

  const unlockTitle = useMemo(() => {
    const base = (offer?.title || 'JavaScript with Sara').replace(/\s*—\s*Full Access$/i, '').trim()
    return `${base} — Full Access`
  }, [offer?.title])

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

  const emailOk = payerEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payerEmail)
  const nameOk = Boolean(payerName && payerName.trim().length > 0)
  const canPay = profileReady && nameOk && emailOk

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
      const d = data?.data
      if (!data?.success || !d || d.valid === false) {
        setCouponError('Invalid or expired coupon')
        return
      }
      setAppliedCoupon({
        code,
        finalRupees: d.finalRupees ?? d.discountedAmount,
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
    if (!RAZORPAY_KEY) {
      showPayErrorToast('Payment could not start: Razorpay key is not configured (VITE_RAZORPAY_KEY_ID).')
      return
    }
    if (!canPay) return

    setPayBusy(true)
    payPhaseRef.current = 'idle'
    try {
      /** Backend expects amount in rupees (converted to paise server-side) */
      const payload = {
        amount: finalRupees,
        name: payerName.trim(),
        email: payerEmail.trim(),
        courseId,
        ...(appliedCoupon ? { couponCode: appliedCoupon.code } : {})
      }
      const { data } = await payments.createOrder(payload)
      if (!data?.success || !data.data?.orderId) {
        showPayErrorToast(handleApiError({ message: 'Could not create order' }, 'Could not create order. Try again.'))
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
          payPhaseRef.current = 'verifying'
          try {
            const verifyRes = await payments.verifyPayment({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              courseId
            })
            if (!verifyRes.data?.success) {
              payPhaseRef.current = 'settled'
              const vm = verifyRes.data?.message || 'Payment verification failed'
              showPayErrorToast(vm)
              return
            }
            payPhaseRef.current = 'settled'
            navigate('/dashboard', {
              replace: true,
              state: {
                paymentSuccess: true,
                paymentToastNonce: `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`
              }
            })
          } catch (e) {
            payPhaseRef.current = 'settled'
            showPayErrorToast(handleApiError(e, 'Payment verification failed. If you were charged, contact support.'))
          } finally {
            setPayBusy(false)
          }
        },
        modal: {
          ondismiss: () => {
            setPayBusy(false)
            if (payPhaseRef.current === 'settled' || payPhaseRef.current === 'verifying') {
              return
            }
            payPhaseRef.current = 'idle'
            showPayErrorToast('Payment was not completed. Please try again.')
          }
        }
      }

      payPhaseRef.current = 'open'
      const rzp = new RazorpayCtor(options)
      rzp.on('payment.failed', () => {
        payPhaseRef.current = 'settled'
        setPayBusy(false)
        showPayErrorToast('Payment was not completed. Please try again.')
      })
      rzp.open()
    } catch (e) {
      showPayErrorToast(handleApiError(e, 'Could not start payment. Try again.'))
      setPayBusy(false)
    }
  }, [appliedCoupon, canPay, courseId, finalRupees, navigate, payerEmail, payerName, showPayErrorToast])

  const busy = applyingCoupon || payBusy

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
            <p className="checkout-card__course-label">
              {unlockTitle}
            </p>
          </div>

          <div className="checkout-card__split" aria-hidden="true" />

          <div className="checkout-card__panel checkout-card__panel--middle">
            {profileReady && (!nameOk || !emailOk) && (
              <p className="checkout-profile-hint" role="status">
                Enter your name and a valid email below to continue. These are sent to Razorpay for your receipt.
              </p>
            )}

            <div className="checkout-payer">
              <label htmlFor="checkout-payer-name">Name</label>
              <input
                id="checkout-payer-name"
                type="text"
                value={payerName}
                onChange={(e) => setPayerName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
                disabled={busy}
              />
              <label htmlFor="checkout-payer-email">Email</label>
              <input
                id="checkout-payer-email"
                type="email"
                value={payerEmail}
                onChange={(e) => setPayerEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={busy}
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
              {appliedCoupon && !couponError ? (
                <p className="checkout-coupon-success" role="status">
                  Coupon applied — you save {formatInr(appliedCoupon.discountRupees)}!
                </p>
              ) : null}
            </div>
          </div>

          <div className="checkout-card__panel checkout-card__panel--summary">
            <div className="checkout-summary">
              <div className="checkout-summary__row checkout-summary__row--total">
                <span className="checkout-summary__label">Amount to pay</span>
                <div className="checkout-summary__amount-block">
                  {listRupees > finalRupees ? (
                    <span className="checkout-summary__list-price">{formatInr(listRupees)}</span>
                  ) : null}
                  <strong className="checkout-summary__amount">{formatInr(finalRupees)}</strong>
                </div>
              </div>
            </div>

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
              <Link to="/services">Products &amp; Services</Link>
              {' '}or contact support.
            </p>
          </div>
        </div>
      </main>
      <ToastContainer toasts={toasts} />
    </div>
  )
}
