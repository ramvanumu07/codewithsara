/**
 * Terms of Service Page - Sara Learning Platform
 */

import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import LegalPageFooter from '../components/LegalPageFooter'
import { SUPPORT_EMAIL } from '../constants/support'
/* Legal page styles are in index.css so they load on Vercel */

const Terms = () => {
  // Scroll to top when component mounts
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
          <nav className="header-nav">
            <Link
            to="/"
            className="nav-link"
            style={{
              color: '#5a5a5a',
              textDecoration: 'none',
              fontWeight: 500,
              padding: '0.5rem 1rem',
              borderRadius: '0.375rem',
              background: '#f0f0f0',
              border: '1px solid #e0e0e0',
              display: 'inline-block'
            }}
          >
            Back to Home
          </Link>
          </nav>
        </div>
      </header>

      <main className="terms-main" style={{ flex: 1, padding: '1rem 0' }}>
        <div className="terms-content" style={{ maxWidth: 800, margin: '0 auto', padding: '1.25rem 2rem 3rem 2rem', background: '#ffffff' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 700, marginBottom: '0.5rem', color: '#10a37f' }}>Terms &amp; Conditions</h1>
          <p className="last-updated">Last updated: March 2026</p>

          <section className="terms-section" style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>Operator</h2>
            <p>
              This website is operated by <strong>Vanumu Lakshmi Sai Ram</strong>.
            </p>
          </section>

          <section className="terms-section" style={{ marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', color: '#1a1a1a' }}>1. Acceptance of Terms</h2>
            <p>
              By accessing and using Sara ("Sara," "we," "our," or "the Service"), 
              you accept and agree to be bound by these terms and conditions. 
              If you do not agree, please do not use this service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              Sara is an AI-powered learning platform that provides personalized 
              tutoring through conversational AI, interactive coding exercises, and adaptive 
              learning experiences. Our service includes:
            </p>
            <ul>
              <li>AI-powered tutoring sessions with Sara, your learning assistant</li>
              <li>Interactive coding exercises and assignments</li>
              <li>Real-time code execution and feedback</li>
              <li>Progress tracking and personalized learning paths</li>
              <li>Community features and learning analytics</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>3. User Accounts</h2>
            <p>
              To access certain features of Sara, you must create an account. You are responsible for:
            </p>
            <ul>
              <li>Maintaining the confidentiality of your account credentials</li>
              <li>All activities that occur under your account</li>
              <li>Providing accurate and complete information during registration</li>
              <li>Notifying us immediately of any unauthorized use of your account</li>
            </ul>
            <p>
              You must be at least 13 years old to create an account. Users under 18 should 
              have parental consent before using our service.
            </p>
          </section>

          <section className="terms-section">
            <h2>4. Acceptable Use</h2>
            <p>You agree not to use Sara to:</p>
            <ul>
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights of others</li>
              <li>Upload malicious code or attempt to compromise our systems</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Share inappropriate or offensive content</li>
              <li>Attempt to reverse engineer or exploit our AI systems</li>
              <li>Use the service for commercial purposes without permission</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>5. Intellectual Property</h2>
            <p>
              Sara Learning Platform is a startup project currently in development. While we 
              are working toward formal intellectual property protections, the original content, 
              features, and functionality of our platform represent our creative work and efforts.
            </p>
            <p>
              You retain full ownership of the code you write while using our platform. By using 
              our service, you grant us a limited, non-exclusive license to process, analyze, and 
              provide feedback on your code solely for educational purposes and to improve our 
              AI tutoring capabilities.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. AI and Learning Content</h2>
            <p>
              Our AI tutoring system is designed to provide educational assistance and feedback. 
              While we strive for accuracy, the AI-generated content should be used for learning 
              purposes and may not always be perfect. Users should:
            </p>
            <ul>
              <li>Verify important information from authoritative sources</li>
              <li>Use critical thinking when evaluating AI suggestions</li>
              <li>Report any inappropriate or harmful AI responses</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>7. Privacy and Data</h2>
            <p>
              Your privacy is important to us. Our collection and use of personal information 
              is governed by our Privacy Policy, which is incorporated into these Terms by reference. 
              By using Sara, you consent to our data practices as described in our Privacy Policy.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Service Availability</h2>
            <p>
              We strive to maintain high availability of our service, but we do not guarantee 
              uninterrupted access. We may temporarily suspend service for maintenance, 
              updates, or due to circumstances beyond our control.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Limitation of Liability</h2>
            <p>
              Sara Learning Platform is provided as a startup project in development. While we 
              strive to provide a reliable service, we cannot guarantee uninterrupted access or 
              be held liable for any data loss, technical issues, or other problems that may arise. 
              Please use our platform understanding that it is an evolving educational project.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Termination</h2>
            <p>
              We may terminate or suspend your account and access to the service immediately, 
              without prior notice, for conduct that we believe violates these Terms or is 
              harmful to other users, us, or third parties.
            </p>
            <p>
              <strong>Misuse</strong> (including account sharing, abuse of the AI or playground, attempts to break or scrape the service, or fraud) may result in <strong>immediate termination</strong> of access without refund.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Changes to Terms and content</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify users of 
              significant changes via email or through the platform. Your continued use of Sara 
              after changes constitutes acceptance of the new terms.
            </p>
            <p>
              <strong>Course and platform content</strong> may be updated, improved, or reorganized over time. We reserve the right to change lessons, features, or structure where reasonably necessary to keep the product accurate and maintainable.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Purchases, digital access, and account use</h2>
            <p>
              When you pay for <strong>JavaScript with Sara</strong> (or other listed digital products), you receive <strong>digital access</strong> to online learning materials and features for <strong>your account only</strong>. You are <strong>not</strong> purchasing physical goods or a separate piece of installable software.
            </p>
            <p>
              <strong>One-time payment; lifetime access.</strong> Unless we state otherwise at checkout, access is granted as a one-time purchase for the lifetime of the service as defined below—not a subscription, unless explicitly offered as such.
            </p>
            <p>
              <strong>Accounts are non-transferable.</strong> You may not sell, lend, share, or otherwise allow others to use your paid access. One purchase applies to one account.
            </p>
            <p>
              <strong>&quot;Lifetime&quot; access</strong> means access for the <strong>lifetime of the Sara Learning Platform</strong> as operated by us. If the platform is discontinued, we will use reasonable efforts to notify registered users at least <strong>30 days in advance</strong> where practicable. This does not guarantee any minimum period of operation beyond what applicable law may require.
            </p>
          </section>

          <section className="terms-section">
            <h2>13. Governing law</h2>
            <p>
              These Terms are governed by the <strong>laws of India</strong>. Courts located in India shall have jurisdiction over disputes arising from or relating to these Terms or your use of Sara, subject to any mandatory consumer protections that apply where you live.
            </p>
          </section>

          <section className="terms-section">
            <h2>14. Contact information</h2>
            <p>
              If you have any questions about these Terms &amp; Conditions, please contact us at:
            </p>
            <p><strong>Legal name:</strong> Vanumu Lakshmi Sai Ram</p>
            <p><strong>Contact address:</strong> 1-79, Valasapakala, Kakinada, Andhra Pradesh, India</p>
            <p><strong>Email:</strong> <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a></p>
          </section>
        </div>
      </main>

      <LegalPageFooter />
    </div>
  )
}

export default Terms