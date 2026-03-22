/**
 * Refund & Cancellation Policy — digital products (Razorpay / compliance)
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalPageFooter from '../components/LegalPageFooter'
import { SUPPORT_EMAIL, BUSINESS_NAME } from '../constants/support'

const RefundCancellation = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const containerStyle = {
    minHeight: '100vh',
    background: '#ffffff',
    color: '#1a1a1a',
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.6
  }

  return (
    <div className="terms-container" style={containerStyle}>
      <header className="terms-header" style={{ background: '#ffffff', borderBottom: '1px solid #e5e5e5', padding: '1.5rem 0', position: 'sticky', top: 0, zIndex: 100 }}>
        <div className="header-content" style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" className="logo" style={{ textDecoration: 'none' }}>
            <span className="logo-sara" style={{ fontSize: '2rem', fontWeight: 700, color: '#44a08d' }}>Sara</span>
          </Link>
          <Link to="/" className="nav-link" style={{ color: '#5a5a5a', textDecoration: 'none', fontWeight: 500, padding: '0.5rem 1rem', borderRadius: '0.375rem', background: '#f0f0f0', border: '1px solid #e0e0e0' }}>Back to Home</Link>
        </div>
      </header>

      <main className="terms-main" style={{ flex: 1, padding: '1rem 0' }}>
        <div className="terms-content" style={{ maxWidth: 800, margin: '0 auto', padding: '1.25rem 2rem 3rem 2rem', background: '#ffffff' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10a37f' }}>Refund &amp; Cancellation Policy</h1>
          <p className="last-updated">Last updated: March 2026</p>

          <section className="terms-section">
            <h2>1. Digital products</h2>
            <p>
              {BUSINESS_NAME} sells <strong>digital access</strong> to online learning (course content, AI mentor, playground, assignments, certificate eligibility, and related features). <strong>We do not ship physical goods.</strong> Access is delivered electronically.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. No refund after access is granted</h2>
            <p>
              <strong>Digital products are non-refundable</strong> once your purchase is complete and <strong>access has been granted</strong> to your account. By paying, you agree that delivery is instant and the product is deemed consumed for refund purposes at that point.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. Exception — access not granted</h2>
            <p>
              If payment succeeds but <strong>access is not granted</strong> due to a technical failure on our side, contact us at{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>{' '}
              <strong>within 7 days of payment</strong> with your Razorpay order or payment details. After we verify the issue, we will either restore access or issue a <strong>full refund</strong>.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Cancellation</h2>
            <p>
              <strong>There is no cancellation after purchase</strong> in the sense of undoing a completed order: access is <strong>instant</strong> and <strong>lifetime</strong> (see our Terms for how &quot;lifetime&quot; is defined). You may stop using the service at any time; that does not entitle you to a refund once access has been activated.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. How to request a refund (eligible cases only)</h2>
            <p>
              Email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> within <strong>7 days of purchase</strong>, with the email address on your account and any Razorpay receipt or order ID. We will respond and, where applicable, coordinate with our payment partner.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Refund processing time</h2>
            <p>
              Approved refunds are processed through <strong>Razorpay</strong>. Depending on your bank or card issuer, amounts typically appear within <strong>5–7 business days</strong> after Razorpay initiates the refund. Timing may vary outside our control.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Contact</h2>
            <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
            <p><strong>Business:</strong> {BUSINESS_NAME}</p>
            <p><strong>Legal name:</strong> Vanumu Lakshmi Sai Ram</p>
            <p><strong>Address:</strong> 1-79, Valasapakala, Kakinada, Andhra Pradesh, India</p>
          </section>
        </div>
      </main>

      <LegalPageFooter />
    </div>
  )
}

export default RefundCancellation
