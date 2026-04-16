/**
 * Products & Services — Razorpay / compliance clarity
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import OfferPricePromo from '../components/OfferPricePromo'
import LegalPageFooter from '../components/LegalPageFooter'
import { welcomeCourseOffers } from '../data/welcomeCourseOffers'
import { SUPPORT_EMAIL } from '../constants/support'

export default function Services () {
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10a37f' }}>Products &amp; Services</h1>
          <p className="last-updated">All prices are in Indian Rupees (INR). Last updated: March 2026.</p>

          <section className="terms-section">
            <h2>Product name</h2>
            <p><strong>JavaScript with Sara</strong> — full digital access to our JavaScript learning track on the Sara platform.</p>
          </section>

          <section className="terms-section">
            <h2>What&apos;s included</h2>
            <ul>
              <li><strong>AI mentor (Sara)</strong> — conversational guidance and explanations during learning sessions</li>
              <li><strong>Playground</strong> — run and experiment with JavaScript in the browser</li>
              <li><strong>Assignments</strong> — practice tasks with automated checks and feedback</li>
              <li><strong>Progress &amp; structure</strong> — organized topics so you learn step by step</li>
              <li><strong>Certificate</strong> — eligibility for a course completion certificate when you meet the platform criteria</li>
              <li><strong>Portfolio projects</strong> — downloadable project starters / bundles where offered in the product</li>
            </ul>
            <p>You are purchasing <strong>access to online educational content and features</strong>, not a downloadable &quot;software license&quot; in the traditional desktop sense.</p>
          </section>

          <section className="terms-section">
            <h2>Pricing</h2>
            <p>
              <strong>JavaScript with Sara — Full Access</strong> is <strong>₹1,999</strong> (Indian Rupees), before any <strong>coupon code</strong> you apply at checkout. The amount shown on the checkout screen before you pay is the price that applies to your order.
            </p>
            <p style={{ marginBottom: 4 }}><strong>Current offer (INR)</strong></p>
            {welcomeCourseOffers[0] && (
              <OfferPricePromo offer={welcomeCourseOffers[0]} variant="document" />
            )}
          </section>

          <section className="terms-section">
            <h2>Access term</h2>
            <p><strong>Lifetime access</strong> for the account that completes the purchase, as defined in our <Link to="/terms">Terms &amp; Conditions</Link> (lifetime of the Sara Learning Platform).</p>
          </section>

          <section className="terms-section">
            <h2>Delivery</h2>
            <p>
              <strong>Instant — digital only.</strong> After successful payment, access is granted to your account immediately. <strong>No physical goods</strong> are sold or shipped. There is no delivery address for the core product.
            </p>
          </section>

          <section className="terms-section">
            <h2>Refund policy</h2>
            <p>
              See our <Link to="/refund">Refund Policy</Link>. Digital access is generally non-refundable once granted; we describe limited exceptions there.
            </p>
          </section>

          <section className="terms-section">
            <h2>Contact</h2>
            <p>
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
            <p><strong>Legal name:</strong> Vanumu Lakshmi Sai Ram</p>
            <p><strong>Address:</strong> 1-79, Valasapakala, Kakinada, Andhra Pradesh, India</p>
          </section>
        </div>
      </main>

      <LegalPageFooter />
    </div>
  )
}
