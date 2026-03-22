/**
 * About Us — Sara Learning Platform
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalPageFooter from '../components/LegalPageFooter'
import { SUPPORT_EMAIL } from '../constants/support'

const About = () => {
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
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10a37f' }}>About Us</h1>
          <p className="last-updated">Last updated: March 2026</p>

          <section className="terms-section">
            <h2>Who built Sara</h2>
            <p>
              Sara is built by a <strong>solo founder</strong> who cares about how hard it can feel to learn JavaScript on your own—too many tutorials, not enough feedback, and nobody to ask when you&apos;re stuck. Sara exists to give you a structured path and a patient, interactive companion while you actually write code.
            </p>
          </section>

          <section className="terms-section">
            <h2>What problem we solve</h2>
            <p>
              JavaScript is tough to learn in isolation. Sara combines <strong>guided sessions</strong>, a <strong>live playground</strong>, <strong>assignments</strong> with checks, and <strong>AI explanations</strong> so you learn by doing—not only by watching. The goal is simple: make practice and feedback feel natural, like having a mentor on call.
            </p>
          </section>

          <section className="terms-section">
            <h2>Mission</h2>
            <p>
              We want <strong>quality JavaScript education</strong> to be more accessible—especially for students and self-learners who are serious about building real skill. Sara is our way of lowering the barrier between &quot;I read about it&quot; and &quot;I can write it.&quot;
            </p>
          </section>

          <section className="terms-section">
            <h2>Contact</h2>
            <p>
              Questions or partnerships:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a>
            </p>
            <p>For product details and pricing, see <Link to="/products" style={{ color: '#10a37f' }}>Products &amp; Services</Link>.</p>
          </section>
        </div>
      </main>

      <LegalPageFooter />
    </div>
  )
}

export default About
