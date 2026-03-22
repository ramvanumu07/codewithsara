/**
 * Contact — required visible contact for payment providers
 */

import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import LegalPageFooter from '../components/LegalPageFooter'
import { SUPPORT_EMAIL, BUSINESS_NAME } from '../constants/support'

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')

  const mailtoHref = useMemo(() => {
    const params = new URLSearchParams()
    if (subject.trim()) params.set('subject', subject.trim())
    if (message.trim()) params.set('body', message.trim())
    const q = params.toString()
    return `mailto:${SUPPORT_EMAIL}${q ? `?${q}` : ''}`
  }, [subject, message])

  const containerStyle = {
    minHeight: '100vh',
    background: '#ffffff',
    color: '#1a1a1a',
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: 'flex',
    flexDirection: 'column',
    lineHeight: 1.6
  }

  const inputStyle = {
    width: '100%',
    maxWidth: '100%',
    boxSizing: 'border-box',
    padding: '0.65rem 0.75rem',
    borderRadius: 8,
    border: '1px solid #e5e5e5',
    fontFamily: 'inherit',
    fontSize: '0.9375rem'
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10a37f' }}>Contact</h1>
          <p className="last-updated">We reply to most messages within <strong>24–48 hours</strong> (business days).</p>

          <section className="terms-section">
            <h2>{BUSINESS_NAME}</h2>
            <p>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
            <p><strong>Legal name:</strong> Vanumu Lakshmi Sai Ram</p>
            <p><strong>Address:</strong> 1-79, Valasapakala, Kakinada, Andhra Pradesh, India</p>
          </section>

          <section className="terms-section">
            <h2>Send a message</h2>
            <p style={{ marginBottom: '1rem' }}>
              Use your email app — subject and message are filled in for you. (No data is sent through our servers.)
            </p>
            <label htmlFor="contact-subject" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Subject</label>
            <input
              id="contact-subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. Payment / access question"
              style={{ ...inputStyle, marginBottom: '1rem' }}
              autoComplete="off"
            />
            <label htmlFor="contact-message" style={{ display: 'block', fontWeight: 600, marginBottom: 6 }}>Message</label>
            <textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your question…"
              rows={5}
              style={{ ...inputStyle, resize: 'vertical', marginBottom: '1rem' }}
            />
            <a
              href={mailtoHref}
              style={{
                display: 'inline-block',
                background: '#10a37f',
                color: '#fff',
                fontWeight: 600,
                padding: '0.65rem 1.25rem',
                borderRadius: 8,
                textDecoration: 'none'
              }}
            >
              Open in email app
            </a>
          </section>
        </div>
      </main>

      <LegalPageFooter />
    </div>
  )
}

export default Contact
