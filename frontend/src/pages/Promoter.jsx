/**
 * Promoter dashboard — coupon lookup, period enrollments (manual weekly reset), tiered commission.
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { payments, handleApiError } from '../config/api'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import './Promoter.css'

function formatInr (rupees) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(rupees)
}

function formatBandRange (band) {
  if (band.maxEnrollments == null) return `${band.minEnrollments}+`
  return `${band.minEnrollments}–${band.maxEnrollments}`
}

function isActiveTierBand (enrollmentCount, band) {
  const n = Math.max(0, Number(enrollmentCount) || 0)
  const max = band.maxEnrollments == null ? Number.POSITIVE_INFINITY : band.maxEnrollments
  return n >= band.minEnrollments && n <= max
}

const Promoter = () => {
  const navigate = useNavigate()
  const { logout, isAuthenticated } = useAuth()
  const { toasts, success: showSuccessToast, error: showErrorToast } = useToast()

  const [couponCode, setCouponCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [stats, setStats] = useState(null)
  const [error, setError] = useState(null)

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
        showSuccessToast('Coupon found.')
      } else {
        setError(response.data.message || 'Could not load coupon stats')
        setSearchAttempted(true)
      }
    } catch (err) {
      const errorMsg = handleApiError(err, 'Could not find that coupon code')
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

  const tierBands = Array.isArray(stats?.tierBands) ? stats.tierBands : []
  const perEnr = stats?.commissionPerEnrollment
  const hasEnrollments = stats && Number(stats.successfulEnrollments) > 0

  return (
    <div className="promoter-page">
      <header className="promoter-page__header">
        <div className="promoter-page__header-inner">
          <Link to="/" className="promoter-page__brand" aria-label="Sara home">
            Sara
          </Link>
          {isAuthenticated && (
            <button
              type="button"
              onClick={handleLogout}
              className="promoter-page__icon-btn"
              title="Log out"
              aria-label="Log out"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                <polyline points="16,17 21,12 16,7" />
                <line x1="21" y1="12" x2="9" y2="12" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <main className="promoter-page__main">
        <div className="promoter-page__layout">
          <header className="promoter-page__intro">
            <p className="promoter-page__eyebrow">Partner reporting</p>
            <h1 className="promoter-page__title">Promoter dashboard</h1>
          </header>

          <section className="promoter-panel" aria-labelledby="promoter-search-heading">
            <div className="promoter-panel__head">
              <h2 id="promoter-search-heading" className="promoter-panel__title">Look up a code</h2>
            </div>
            <form onSubmit={handleSearch} className="promoter-form">
              <label className="promoter-form__label" htmlFor="promoter-coupon-input">Coupon code</label>
              <div className="promoter-form__row">
                <input
                  id="promoter-coupon-input"
                  type="text"
                  autoComplete="off"
                  spellCheck="false"
                  placeholder="YOUR COUPON CODE"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  className="promoter-form__input"
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="promoter-form__submit"
                  disabled={loading}
                  aria-busy={loading}
                >
                  {loading ? (
                    <>
                      <span className="promoter-form__spinner" aria-hidden />
                      Loading
                    </>
                  ) : (
                    'View stats'
                  )}
                </button>
              </div>
            </form>
          </section>

          {stats && (
            <section className="promoter-results" aria-labelledby="promoter-results-heading">
              <h2 id="promoter-results-heading" className="visually-hidden">Results for {stats.code}</h2>

              <div className="promoter-results__payout-note" role="note">
                <p className="promoter-results__payout-note-title">Weekly payouts (Saturdays)</p>
                <p className="promoter-results__payout-note-body">
                  Promoter payments are sent <strong>every Saturday</strong>. The enrollments and commission below
                  cover the <strong>current payout period</strong>—checkouts counted from the previous Saturday onward.
                  After each Saturday’s payout, that period’s count is reset in the database.
                </p>
              </div>

              <div className="promoter-kpis">
                <article className="promoter-kpi">
                  <div className="promoter-kpi__top">
                    <span className="promoter-kpi__icon promoter-kpi__icon--muted" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="6 9 6 2 18 2 18 9" />
                        <path d="M6 18s.2-4 6-4 5.8 4 6 4" />
                        <rect x="6" y="14" width="12" height="8" rx="1" />
                      </svg>
                    </span>
                    <span className="promoter-kpi__eyebrow">Coupon</span>
                  </div>
                  <p className="promoter-kpi__value promoter-kpi__value--code">{stats.code}</p>
                  <p className="promoter-kpi__meta">Promotion code</p>
                </article>

                <article className="promoter-kpi">
                  <div className="promoter-kpi__top">
                    <span className="promoter-kpi__icon promoter-kpi__icon--blue" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </span>
                    <span className="promoter-kpi__eyebrow">Enrollments</span>
                  </div>
                  <p className="promoter-kpi__value">{stats.successfulEnrollments}</p>
                  <p className="promoter-kpi__meta">Current period (since last Saturday)</p>
                </article>

                <article className="promoter-kpi promoter-kpi--accent">
                  <div className="promoter-kpi__top">
                    <span className="promoter-kpi__icon promoter-kpi__icon--green" aria-hidden>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="1" x2="12" y2="23" />
                        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                      </svg>
                    </span>
                    <span className="promoter-kpi__eyebrow">Commission</span>
                  </div>
                  <p className="promoter-kpi__value promoter-kpi__value--money">{formatInr(stats.commission)}</p>
                  <p className="promoter-kpi__meta">
                    {hasEnrollments ? `${formatInr(perEnr)} × ${stats.successfulEnrollments}` : '—'}
                  </p>
                </article>
              </div>

              {tierBands.length > 0 && (
                <div className="promoter-tier-card">
                  <h3 className="promoter-tier-card__title">Volume schedule</h3>
                  <p className="promoter-tier-card__subtitle">Tier is based on enrollments in the current payout period.</p>
                  <div className="promoter-tier-table-wrap">
                    <table className="promoter-tier-table">
                      <thead>
                        <tr>
                          <th scope="col">Enrollments (total)</th>
                          <th scope="col">Rate / enrollment</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tierBands.map((band) => {
                          const active = isActiveTierBand(stats.successfulEnrollments, band)
                          return (
                            <tr
                              key={`${band.minEnrollments}-${band.maxEnrollments ?? 'max'}`}
                              className={active ? 'promoter-tier-table__row promoter-tier-table__row--active' : 'promoter-tier-table__row'}
                            >
                              <td>{formatBandRange(band)}</td>
                              <td>{formatInr(band.ratePerEnrollment)}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              <div className="promoter-detail">
                <h3 className="promoter-detail__title">Summary</h3>
                <dl className="promoter-detail__list">
                  <div className="promoter-detail__row">
                    <dt>Enrollments (current period)</dt>
                    <dd>{stats.successfulEnrollments}</dd>
                  </div>
                  <div className="promoter-detail__row">
                    <dt>Current rate</dt>
                    <dd>{hasEnrollments ? `${formatInr(perEnr)} / enrollment` : '—'}</dd>
                  </div>
                  <div className="promoter-detail__row promoter-detail__row--highlight">
                    <dt>Total commission</dt>
                    <dd>{formatInr(stats.commission)}</dd>
                  </div>
                </dl>
              </div>

              <button type="button" onClick={handleClear} className="promoter-secondary-btn">
                Look up another code
              </button>
            </section>
          )}

          {error && searchAttempted && !stats && (
            <section className="promoter-alert" role="alert">
              <p className="promoter-alert__message">{error}</p>
              <button type="button" onClick={handleClear} className="promoter-secondary-btn">
                Try again
              </button>
            </section>
          )}

          {!stats && !error && (
            <section className="promoter-empty" aria-live="polite">
              <div className="promoter-empty__card">
                <p className="promoter-empty__title">No lookup yet</p>
                <p className="promoter-empty__text">
                  Enter your coupon above to load enrollments and tiered commission for that code.
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
