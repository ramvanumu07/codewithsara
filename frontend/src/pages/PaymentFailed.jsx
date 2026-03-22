import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './PaymentSuccess.css'
import './PaymentFailed.css'

const DEFAULT_REASON = 'generic'

function copyForReason (reason, detail) {
  switch (reason) {
    case 'cancelled':
      return {
        title: 'Payment window closed',
        body:
          'You closed the checkout before finishing. No payment was completed—your card was not charged for this session.',
        showDetail: false
      }
    case 'failed':
      return {
        title: 'Payment did not go through',
        body:
          'Your bank or Razorpay could not complete this charge. You have not been charged for this attempt. You can try again with the same or another payment method.',
        showDetail: false
      }
    case 'verify_error':
      return {
        title: 'We could not confirm your payment',
        body:
          'Our server could not verify this payment right away. If money was deducted from your account, don’t worry—contact support with your Razorpay order or payment ID and we will fix your access or arrange a refund.',
        showDetail: Boolean(detail && String(detail).trim())
      }
    default:
      return {
        title: 'Something went wrong',
        body:
          'Checkout did not finish successfully. If you are unsure whether you were charged, check your bank SMS or Razorpay email, then retry or contact support.',
        showDetail: Boolean(detail && String(detail).trim())
      }
  }
}

export default function PaymentFailed () {
  const location = useLocation()
  const state = location.state || {}
  const reason = state.reason || DEFAULT_REASON
  const detail = state.detail
  const courseId = typeof state.courseId === 'string' && state.courseId.trim() ? state.courseId.trim() : 'javascript'

  const copy = useMemo(() => copyForReason(reason, detail), [reason, detail])

  const checkoutHref = `/checkout?course=${encodeURIComponent(courseId)}`

  return (
    <div className="payment-result-page">
      <header className="payment-result-page__header">
        <span className="payment-result-page__brand">Sara</span>
        <Link to="/dashboard" className="payment-result-page__back">
          Dashboard
        </Link>
      </header>

      <main className="payment-result-page__main">
        <div className="payment-result-card payment-result-card--failed">
          <div className="payment-result-icon payment-result-icon--failed" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </div>

          <h1>{copy.title}</h1>
          <p className="payment-result-failed-body">{copy.body}</p>

          {copy.showDetail ? (
            <p className="payment-result-failed-detail" role="status">
              {String(detail).trim()}
            </p>
          ) : null}

          <Link to={checkoutHref} className="payment-result-cta" replace>
            Try again
          </Link>
          <Link
            to="/dashboard"
            className="payment-result-cta payment-result-cta--secondary"
            replace
          >
            Go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
