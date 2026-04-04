/**
 * Promoter Dashboard
 * Shows earnings, payout history, and coupon code
 */

import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePromoterAuth } from '../contexts/PromoterAuthContext'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import api from '../config/api'

export default function PromoterDashboard() {
  const navigate = useNavigate()
  const { promoter, promoterToken, logout } = usePromoterAuth()
  const { toasts, success: showSuccessToast, error: showErrorToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)
  const [payouts, setPayouts] = useState([])
  const [requestingPayout, setRequestingPayout] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!promoterToken) {
      navigate('/promoter/login')
      return
    }
    fetchDashboardData()
  }, [promoterToken])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const response = await api.get('/promoters/me/dashboard', {
        headers: { Authorization: `Bearer ${promoterToken}` }
      })
      setDashboardData(response.data?.data)

      const payoutsResponse = await api.get('/promoters/me/payouts', {
        headers: { Authorization: `Bearer ${promoterToken}` }
      })
      setPayouts(payoutsResponse.data?.data?.payouts || [])
    } catch (err) {
      showErrorToast('Failed to load dashboard')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleRequestPayout = async () => {
    if (!dashboardData?.earnings?.pendingEarningsRupees) {
      showErrorToast('No pending earnings')
      return
    }

    setRequestingPayout(true)
    try {
      const response = await api.post(
        '/promoters/me/request-payout',
        { amountRupees: dashboardData.earnings.pendingEarningsRupees },
        { headers: { Authorization: `Bearer ${promoterToken}` } }
      )
      showSuccessToast('Payout requested successfully!')
      fetchDashboardData()
    } catch (err) {
      showErrorToast(err.response?.data?.message || 'Failed to request payout')
    } finally {
      setRequestingPayout(false)
    }
  }

  const handleCopyCoupon = () => {
    const coupon = dashboardData?.promoter?.couponCodes?.[0]
    if (coupon) {
      navigator.clipboard.writeText(coupon)
      setCopied(true)
      showSuccessToast('Coupon copied!')
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/promoter/login')
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner} />
        <p>Loading dashboard...</p>
      </div>
    )
  }

  const coupon = dashboardData?.promoter?.couponCodes?.[0] || 'N/A'
  const earnings = dashboardData?.earnings || {}
  const canPayout = earnings.pendingEarningsRupees >= 1000

  return (
    <div style={styles.container}>
      <ToastContainer toasts={toasts} />

      {/* Header */}
      <header style={styles.header}>
        <div style={styles.headerContent}>
          <h1 style={styles.headerTitle}>Promoter Dashboard</h1>
          <p style={styles.headerSubtitle}>Welcome, {promoter?.name}</p>
        </div>
        <button onClick={handleLogout} style={styles.logoutButton}>
          Logout
        </button>
      </header>

      <main style={styles.main}>
        {/* Earnings Summary Cards */}
        <div style={styles.cardsGrid}>
          {/* Pending Earnings */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Pending Earnings</h3>
              <span style={styles.cardBadge}>Available</span>
            </div>
            <div style={styles.cardAmount}>₹{earnings.pendingEarningsRupees || 0}</div>
            <p style={styles.cardDescription}>
              {earnings.pendingEnrollments || 0} users × ₹200 each
            </p>
          </div>

          {/* Total Earned */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Total Earned</h3>
              <span style={styles.cardBadgeSecondary}>All Time</span>
            </div>
            <div style={styles.cardAmount}>₹{earnings.totalEarnedRupees || 0}</div>
            <p style={styles.cardDescription}>Since you joined</p>
          </div>

          {/* Payout Status */}
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>Last Payout</h3>
              <span style={styles.cardBadgeTertiary}>History</span>
            </div>
            <div style={styles.cardAmount}>
              {earnings.lastPayoutAt ? new Date(earnings.lastPayoutAt).toLocaleDateString() : 'None yet'}
            </div>
            <p style={styles.cardDescription}>Most recent payout date</p>
          </div>
        </div>

        {/* Coupon Code Section */}
        <div style={styles.couponSection}>
          <h2 style={styles.sectionTitle}>Your Promotion Code</h2>
          <div style={styles.couponBox}>
            <div style={styles.couponLabel}>Share this code with friends:</div>
            <div style={styles.couponCode}>{coupon}</div>
            <button onClick={handleCopyCoupon} style={styles.copyButton}>
              {copied ? '✓ Copied!' : 'Copy Code'}
            </button>
          </div>
          <p style={styles.couponHint}>
            They save ₹200 on their first course, and you earn ₹200. Win-win!
          </p>
        </div>

        {/* Payout Request Section */}
        <div style={styles.payoutSection}>
          <h2 style={styles.sectionTitle}>Request Payout</h2>
          <div style={{...styles.card, ...{marginBottom: 0}}}>
            <div style={styles.payoutDetails}>
              <div>
                <p style={styles.payoutLabel}>Pending Amount</p>
                <p style={styles.payoutAmount}>₹{earnings.pendingEarningsRupees || 0}</p>
              </div>
              <div>
                <p style={styles.payoutLabel}>Minimum Required</p>
                <p style={styles.payoutAmount}>₹1,000</p>
              </div>
            </div>
            
            {canPayout ? (
              <>
                <p style={styles.payoutReady}>✓ You're eligible for payout!</p>
                <button
                  onClick={handleRequestPayout}
                  disabled={requestingPayout}
                  style={{...styles.payoutButton, ...styles.payoutButtonPrimary}}
                >
                  {requestingPayout ? 'Processing...' : `Request Payout of ₹${earnings.pendingEarningsRupees}`}
                </button>
              </>
            ) : (
              <>
                <div style={styles.payoutProgress}>
                  <div style={styles.progressBar}>
                    <div
                      style={{
                        ...styles.progressFill,
                        width: `${Math.min((earnings.pendingEarningsRupees / 1000) * 100, 100)}%`
                      }}
                    />
                  </div>
                  <p style={styles.payoutWaiting}>
                    Earn ₹{1000 - (earnings.pendingEarningsRupees || 0)} more to request payout
                  </p>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Payout History */}
        <div style={styles.historySection}>
          <h2 style={styles.sectionTitle}>Payout History</h2>
          {payouts.length > 0 ? (
            <table style={styles.table}>
              <thead style={styles.tableHead}>
                <tr>
                  <th style={styles.tableHeader}>Amount</th>
                  <th style={styles.tableHeader}>Status</th>
                  <th style={styles.tableHeader}>Date</th>
                </tr>
              </thead>
              <tbody>
                {payouts.map((payout, idx) => (
                  <tr key={idx} style={styles.tableRow}>
                    <td style={styles.tableCell}>₹{payout.amount}</td>
                    <td style={styles.tableCell}>
                      <span style={getStatusBadgeStyle(payout.status)}>
                        {payout.status}
                      </span>
                    </td>
                    <td style={styles.tableCell}>
                      {new Date(payout.requestedAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={styles.emptyState}>
              <p>No payouts yet. Start earning by sharing your coupon code!</p>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

function getStatusBadgeStyle(status) {
  const baseStyle = {
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 12,
    fontWeight: 600,
    whiteSpace: 'nowrap'
  }

  const statusColors = {
    completed: { background: '#dcfce7', color: '#166534' },
    processing: { background: '#dbeafe', color: '#0c4a6e' },
    pending: { background: '#fef3c7', color: '#92400e' },
    failed: { background: '#fee2e2', color: '#991b1b' }
  }

  return { ...baseStyle, ...(statusColors[status] || { background: '#f3f4f6', color: '#6b7280' }) }
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f9fafb',
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  loadingContainer: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16
  },
  spinner: {
    width: 40,
    height: 40,
    border: '3px solid #e5e7eb',
    borderTopColor: '#059669',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  header: {
    background: 'white',
    padding: '24px 32px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    borderBottom: '1px solid #e5e7eb'
  },
  headerContent: {
    flex: 1
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 600,
    color: '#111827',
    margin: 0
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    margin: '4px 0 0'
  },
  logoutButton: {
    padding: '8px 16px',
    background: '#e5e7eb',
    color: '#111827',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 14
  },
  main: {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 32
  },
  cardsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: 20,
    marginBottom: 40
  },
  card: {
    background: 'white',
    padding: 24,
    borderRadius: 12,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: 600,
    color: '#6b7280',
    margin: 0
  },
  cardBadge: {
    background: '#dcfce7',
    color: '#166534',
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600
  },
  cardBadgeSecondary: {
    background: '#e0e7ff',
    color: '#3730a3',
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600
  },
  cardBadgeTertiary: {
    background: '#f3e8ff',
    color: '#6b21a8',
    padding: '4px 12px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 600
  },
  cardAmount: {
    fontSize: 32,
    fontWeight: 700,
    color: '#059669',
    margin: '12px 0'
  },
  cardDescription: {
    fontSize: 14,
    color: '#6b7280',
    margin: 0
  },
  couponSection: {
    marginBottom: 40
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 16
  },
  couponBox: {
    background: 'white',
    padding: 24,
    borderRadius: 12,
    border: '2px solid #059669',
    marginBottom: 12,
    textAlign: 'center'
  },
  couponLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 8
  },
  couponCode: {
    fontSize: 28,
    fontWeight: 700,
    color: '#059669',
    letterSpacing: 2,
    margin: '16px 0'
  },
  copyButton: {
    padding: '10px 20px',
    background: '#059669',
    color: 'white',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600
  },
  couponHint: {
    fontSize: 14,
    color: '#6b7280',
    margin: 0,
    textAlign: 'center'
  },
  payoutSection: {
    marginBottom: 40
  },
  payoutDetails: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 20,
    marginBottom: 20,
    paddingBottom: 20,
    borderBottom: '1px solid #e5e7eb'
  },
  payoutLabel: {
    fontSize: 12,
    color: '#6b7280',
    margin: 0
  },
  payoutAmount: {
    fontSize: 24,
    fontWeight: 700,
    color: '#059669',
    margin: '8px 0 0'
  },
  payoutReady: {
    color: '#166534',
    background: '#dcfce7',
    padding: 12,
    borderRadius: 6,
    margin: '12px 0',
    fontSize: 14,
    fontWeight: 600
  },
  payoutButton: {
    width: '100%',
    padding: 12,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14
  },
  payoutButtonPrimary: {
    background: '#059669',
    color: 'white'
  },
  payoutProgress: {
    marginTop: 20
  },
  progressBar: {
    width: '100%',
    height: 8,
    background: '#e5e7eb',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 12
  },
  progressFill: {
    height: '100%',
    background: '#059669',
    transition: 'width 0.3s'
  },
  payoutWaiting: {
    fontSize: 14,
    color: '#6b7280',
    margin: 0
  },
  historySection: {
    marginBottom: 40
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  tableHead: {
    background: '#f3f4f6',
    borderBottom: '2px solid #e5e7eb'
  },
  tableHeader: {
    padding: 16,
    textAlign: 'left',
    fontSize: 12,
    fontWeight: 600,
    color: '#6b7280'
  },
  tableRow: {
    borderBottom: '1px solid #e5e7eb'
  },
  tableCell: {
    padding: 16,
    fontSize: 14,
    color: '#111827'
  },
  emptyState: {
    background: 'white',
    padding: 40,
    borderRadius: 12,
    textAlign: 'center',
    color: '#6b7280'
  }
}
