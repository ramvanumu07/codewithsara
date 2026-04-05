/**
 * Promoter Dashboard - Sara Learning Platform
 * Displays enrollment stats and earnings for promoters based on their coupon code
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { payments, handleApiError } from '../config/api'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import './Promoter.css'

const Promoter = () => {
  const navigate = useNavigate()
  const { logout, isAuthenticated } = useAuth()
  const { toasts, success: showSuccessToast, error: showErrorToast } = useToast()

  const [couponCode, setCouponCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

  const COMMISSION_PER_ENROLLMENT = 200

  const handleSearch = async (e) => {
    e.preventDefault()

    if (!couponCode.trim()) {
      showErrorToast('Please enter a coupon code')
      return
    }

    setLoading(true)
    setError(null)
    setStats(null)
    setSearchAttempted(false)

    try {
      const response = await payments.getCouponStats(couponCode)
      if (response.data.success) {
        setStats(response.data.data)
        setSearchAttempted(true)
        showSuccessToast('Coupon found! Here are your stats.')
      } else {
        setError(response.data.message || 'Failed to fetch coupon stats')
        setSearchAttempted(true)
      }
    } catch (err) {
      const errorMsg = handleApiError(err, 'Could not find the coupon code')
      setError(errorMsg)
      setSearchAttempted(true)
      showErrorToast(errorMsg)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleClear = () => {
    setCouponCode('')
    setStats(null)
    setError(null)
    setSearchAttempted(false)
  }

  return (
    <div className="promoter-container">
      {/* Header */}
      <header className="promoter-header">
        <div className="promoter-header-content">
          <Link to="/" className="promoter-logo-link">
            <h1 className="promoter-logo">Sara</h1>
          </Link>
          <div className="promoter-header-actions">
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="promoter-logout-btn"
                title="Logout"
                aria-label="Logout"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16,17 21,12 16,7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="promoter-main">
        <div className="promoter-content">
          {/* Hero Section */}
          <section className="promoter-hero">
            <div className="promoter-hero-content">
              <h2 className="promoter-title">Promoter Dashboard</h2>
              <p className="promoter-subtitle">
                Track your enrollments and earnings through your unique coupon code
              </p>
            </div>
          </section>

          {/* Search Form */}
          <section className="promoter-search-section">
            <form onSubmit={handleSearch} className="promoter-search-form">
              <div className="promoter-input-group">
                <input
                  type="text"
                  placeholder="Enter your coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="promoter-input"
                  disabled={loading}
                  aria-label="Coupon code"
                />
                <button
                  type="submit"
                  className="promoter-search-btn"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="spinner"></span>
                      Searching...
                    </>
                  ) : (
                    <>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      Search
                    </>
                  )}
                </button>
              </div>
            </form>
          </section>

          {/* Stats Display */}
          {stats && (
            <section className="promoter-stats-section">
              <div className="stats-cards-grid">
                {/* Coupon Code Card */}
                <div className="stats-card stats-card-primary">
                  <div className="stats-card-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stats-icon">
                      <polyline points="6 9 6 2 18 2 18 9" />
                      <path d="M6 18s.2-4 6-4 5.8 4 6 4" />
                      <rect x="6" y="14" width="12" height="8" rx="1" />
                    </svg>
                    <span className="stats-label">Coupon Code</span>
                  </div>
                  <div className="stats-value">{stats.code}</div>
                  <p className="stats-helper">Your unique promotion code</p>
                </div>

                {/* Enrollments Card */}
                <div className="stats-card stats-card-secondary">
                  <div className="stats-card-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stats-icon">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    <span className="stats-label">Enrollments</span>
                  </div>
                  <div className="stats-value">{stats.successfulEnrollments}</div>
                  <p className="stats-helper">Successful enrollments using your code</p>
                </div>

                {/* Earnings Card */}
                <div className="stats-card stats-card-accent">
                  <div className="stats-card-header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="stats-icon">
                      <line x1="12" y1="1" x2="12" y2="23" />
                      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <span className="stats-label">Your Earnings</span>
                  </div>
                  <div className="stats-value earnings-highlight">
                    ₹{stats.commission.toLocaleString('en-IN')}
                  </div>
                  <p className="stats-helper">@₹{COMMISSION_PER_ENROLLMENT} per enrollment</p>
                </div>
              </div>

              {/* Stats Summary */}
              <div className="stats-summary">
                <div className="summary-box">
                  <h3 className="summary-title">Breakdown</h3>
                  <div className="summary-details">
                    <div className="detail-row">
                      <span className="detail-label">Total enrollments:</span>
                      <span className="detail-value">{stats.successfulEnrollments}</span>
                    </div>
                    <div className="detail-row">
                      <span className="detail-label">Commission per enrollment:</span>
                      <span className="detail-value">₹{COMMISSION_PER_ENROLLMENT}</span>
                    </div>
                    <div className="detail-row detail-row-highlight">
                      <span className="detail-label">Total earnings:</span>
                      <span className="detail-value">₹{stats.commission.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Clear Button */}
              <button onClick={handleClear} className="promoter-clear-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 4 21 4" />
                  <line x1="19" y1="4" x2="21" y2="6" />
                  <path d="M19 4H5c-1 0-1 .5-1 1.5v12c0 1 0 1.5 1 1.5h14c1 0 1-.5 1-1.5v-3" />
                </svg>
                Search Another Code
              </button>
            </section>
          )}

          {/* Error State */}
          {error && searchAttempted && !stats && (
            <section className="promoter-error-section">
              <div className="error-box">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="error-icon">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <p className="error-message">{error}</p>
                <button onClick={handleClear} className="error-retry-btn">
                  Try Another Code
                </button>
              </div>
            </section>
          )}

          {/* Empty State */}
          {!stats && !error && (
            <section className="promoter-empty-state">
              <div className="empty-box">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="empty-icon">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4m0 18h10a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-4m0 18v-9m0 0V7" />
                  <path d="M14 11h4m-4 0l-3-3m0 0l3 3m-3-3l3-3m0 0l-3-3" />
                </svg>
                <h3 className="empty-title">Ready to check your stats?</h3>
                <p className="empty-description">
                  Enter your unique coupon code above to view your enrollment count and calculate your earnings
                </p>
              </div>
            </section>
          )}
        </div>
      </main>

      <ToastContainer toasts={toasts} />
    </div>
  )
}

export default Promoter
