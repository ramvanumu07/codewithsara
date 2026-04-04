import React from 'react'
import { Link } from 'react-router-dom'

const linkStyle = { color: '#5a5a5a', textDecoration: 'none', fontSize: '0.9rem', fontWeight: 500 }

export default function LegalPageFooter () {
  return (
    <footer
      className="terms-footer"
      style={{
        background: '#f9f9f9',
        borderTop: '1px solid #e5e5e5',
        padding: '2rem 0',
        marginTop: 'auto'
      }}
    >
      <div
        className="legal-page-footer__inner"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <p style={{ margin: 0, color: '#6b7280', fontSize: '0.9rem' }}>&copy; 2026 Sara Learning Platform. All rights reserved.</p>
        <nav
          className="footer-links"
          aria-label="Legal and information"
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}
        >
          <Link to="/about" style={linkStyle}>About Us</Link>
          <span style={{ color: '#8e8e8e' }}>•</span>
          <Link to="/services" style={linkStyle}>Products &amp; Services</Link>
          <span style={{ color: '#8e8e8e' }}>•</span>
          <Link to="/promoter/signup" style={{...linkStyle, color: '#059669', fontWeight: 600}}>Become a Promoter</Link>
          <span style={{ color: '#8e8e8e' }}>•</span>
          <Link to="/terms" style={linkStyle}>Terms</Link>
          <span style={{ color: '#8e8e8e' }}>•</span>
          <Link to="/privacy" style={linkStyle}>Privacy</Link>
          <span style={{ color: '#8e8e8e' }}>•</span>
          <Link to="/refund" style={linkStyle}>Refund Policy</Link>
          <span style={{ color: '#8e8e8e' }}>•</span>
          <Link to="/contact" style={linkStyle}>Contact</Link>
        </nav>
      </div>
    </footer>
  )
}
