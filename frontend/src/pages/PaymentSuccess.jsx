import React, { useMemo } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './PaymentSuccess.css'

function formatInr (rupees) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rupees)
}

export default function PaymentSuccess () {
  const location = useLocation()

  const state = location.state || {}
  const {
    orderId,
    paymentId,
    amountRupees,
    unlockTitle
  } = state

  const hasReceipt = Boolean(orderId) && amountRupees != null && Number.isFinite(Number(amountRupees))

  const amountLabel = useMemo(() => {
    if (!hasReceipt) return null
    return formatInr(Number(amountRupees))
  }, [amountRupees, hasReceipt])

  return (
    <div className="payment-result-page">
      <header className="payment-result-page__header">
        <span className="payment-result-page__brand">Sara</span>
        <Link to="/dashboard" className="payment-result-page__back">
          Dashboard
        </Link>
      </header>

      <main className="payment-result-page__main">
        <div className="payment-result-card payment-result-card--success">
          <div className="payment-result-icon" aria-hidden>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1>Payment successful</h1>
          <p className="payment-result-lead">
            {hasReceipt
              ? 'Thank you. Your payment is confirmed and your access is unlocked.'
              : 'Thank you. If you just completed a payment, your access should be active—open the dashboard to continue.'}
          </p>

          {hasReceipt ? (
            <dl className="payment-result-dl">
              <div>
                <dt className="payment-result-dt">Razorpay order ID</dt>
                <dd className="payment-result-dd">{orderId}</dd>
              </div>
              {paymentId ? (
                <div>
                  <dt className="payment-result-dt">Payment ID</dt>
                  <dd className="payment-result-dd">{paymentId}</dd>
                </div>
              ) : null}
              <div>
                <dt className="payment-result-dt">Amount paid</dt>
                <dd className="payment-result-dd">{amountLabel}</dd>
              </div>
              <div>
                <dt className="payment-result-dt">Unlocked</dt>
                <dd className="payment-result-dd payment-result-dd--unlock">
                  {unlockTitle || 'Full course access'}
                </dd>
              </div>
            </dl>
          ) : null}

          <p className="payment-result-note">
            Keep your order ID handy for support. You can start learning right away from your dashboard.
          </p>

          <Link to="/dashboard" className="payment-result-cta" replace>
            Go to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
