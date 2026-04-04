/**
 * Admin Promoters Management
 * Component for admin to manage and approve promoters
 * Can be integrated into existing Admin page
 */

import React, { useState, useEffect } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'
import api from '../config/api'

export default function AdminPromoters() {
  const { user } = useAuth()
  const { toasts, success: showSuccessToast, error: showErrorToast } = useToast()

  const [promoters, setPromoters] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, active, suspended
  const [actionInProgress, setActionInProgress] = useState(null)

  useEffect(() => {
    fetchPromoters()
  }, [filter])

  const fetchPromoters = async () => {
    try {
      setLoading(true)
      const response = await api.get(`/api/admin/promoters${filter !== 'all' ? `?status=${filter}` : ''}`, {
        headers: { 'x-admin-key': process.env.REACT_APP_ADMIN_KEY || 'your_admin_key' }
      })
      setPromoters(response.data?.data?.promoters || [])
    } catch (err) {
      showErrorToast('Failed to load promoters')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (promoterId) => {
    setActionInProgress(promoterId)
    try {
      await api.post(
        `/api/admin/promoters/${promoterId}/approve`,
        { reason: 'Approved by admin' },
        { headers: { 'x-admin-key': process.env.REACT_APP_ADMIN_KEY || 'your_admin_key' } }
      )
      showSuccessToast('Promoter approved!')
      fetchPromoters()
    } catch (err) {
      showErrorToast('Failed to approve promoter')
    } finally {
      setActionInProgress(null)
    }
  }

  const handleReject = async (promoterId) => {
    setActionInProgress(promoterId)
    try {
      await api.post(
        `/api/admin/promoters/${promoterId}/reject`,
        { reason: 'Rejected by admin' },
        { headers: { 'x-admin-key': process.env.REACT_APP_ADMIN_KEY || 'your_admin_key' } }
      )
      showSuccessToast('Promoter rejected!')
      fetchPromoters()
    } catch (err) {
      showErrorToast('Failed to reject promoter')
    } finally {
      setActionInProgress(null)
    }
  }

  if (loading) {
    return <div style={styles.loadingContainer}>Loading promoters...</div>
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Promoter Management</h2>

      {/* Filter Tabs */}
      <div style={styles.filterTabs}>
        {['all', 'pending_verification', 'active', 'suspended'].map(status => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            style={{
              ...styles.filterTab,
              ...(filter === status ? styles.filterTabActive : {})
            }}
          >
            {status === 'pending_verification' ? 'Pending' : status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Promoters Table */}
      {promoters.length > 0 ? (
        <table style={styles.table}>
          <thead style={styles.tableHead}>
            <tr>
              <th style={styles.tableHeader}>Name</th>
              <th style={styles.tableHeader}>Email</th>
              <th style={styles.tableHeader}>Payout Method</th>
              <th style={styles.tableHeader}>Earnings</th>
              <th style={styles.tableHeader}>Status</th>
              <th style={styles.tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {promoters.map((promoter) => (
              <tr key={promoter.id} style={styles.tableRow}>
                <td style={styles.tableCell}>{promoter.name}</td>
                <td style={styles.tableCell}>{promoter.email}</td>
                <td style={styles.tableCell}>
                  {promoter.payoutMethod === 'bank' ? '🏦 Bank' : '📱 UPI'}
                </td>
                <td style={styles.tableCell}>
                  <div>
                    <div style={styles.earningsPrimary}>₹{promoter.totalEarned || 0}</div>
                    <div style={styles.earningsSecondary}>Pending: ₹{promoter.pendingEarnings || 0}</div>
                  </div>
                </td>
                <td style={styles.tableCell}>
                  <span style={getStatusBadgeStyle(promoter.status)}>
                    {promoter.status === 'pending_verification' ? 'Pending' : promoter.status}
                  </span>
                </td>
                <td style={styles.tableCell}>
                  {promoter.status === 'pending_verification' && (
                    <div style={styles.actionsGroup}>
                      <button
                        onClick={() => handleApprove(promoter.id)}
                        disabled={actionInProgress === promoter.id}
                        style={{...styles.actionButton, ...styles.approveButton}}
                      >
                        {actionInProgress === promoter.id ? '...' : 'Approve'}
                      </button>
                      <button
                        onClick={() => handleReject(promoter.id)}
                        disabled={actionInProgress === promoter.id}
                        style={{...styles.actionButton, ...styles.rejectButton}}
                      >
                        {actionInProgress === promoter.id ? '...' : 'Reject'}
                      </button>
                    </div>
                  )}
                  {promoter.status === 'active' && (
                    <span style={styles.activeLabel}>✓ Active</span>
                  )}
                  {promoter.status === 'suspended' && (
                    <span style={styles.suspendedLabel}>Suspended</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={styles.emptyState}>
          <p>No promoters found in this category.</p>
        </div>
      )}

      {/* Stats Section */}
      <div style={styles.statsSection}>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Total Promoters</div>
          <div style={styles.statValue}>{promoters.length}</div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Active</div>
          <div style={styles.statValue}>
            {promoters.filter(p => p.status === 'active').length}
          </div>
        </div>
        <div style={styles.statCard}>
          <div style={styles.statLabel}>Pending</div>
          <div style={styles.statValue}>
            {promoters.filter(p => p.status === 'pending_verification').length}
          </div>
        </div>
      </div>
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
    active: { background: '#dcfce7', color: '#166534' },
    pending_verification: { background: '#fef3c7', color: '#92400e' },
    suspended: { background: '#fee2e2', color: '#991b1b' }
  }

  return { ...baseStyle, ...(statusColors[status] || { background: '#f3f4f6', color: '#6b7280' }) }
}

const styles = {
  container: {
    padding: 24
  },
  title: {
    fontSize: 20,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 24
  },
  loadingContainer: {
    padding: 40,
    textAlign: 'center',
    color: '#6b7280'
  },
  filterTabs: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
    borderBottom: '1px solid #e5e7eb',
    paddingBottom: 12
  },
  filterTab: {
    padding: '8px 16px',
    background: 'transparent',
    border: 'none',
    color: '#6b7280',
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 14,
    borderBottom: '2px solid transparent'
  },
  filterTabActive: {
    color: '#059669',
    borderBottomColor: '#059669'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    background: 'white',
    borderRadius: 8,
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    marginBottom: 32
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
  earningsPrimary: {
    fontWeight: 600,
    color: '#059669'
  },
  earningsSecondary: {
    fontSize: 12,
    color: '#6b7280'
  },
  actionsGroup: {
    display: 'flex',
    gap: 8
  },
  actionButton: {
    padding: '6px 12px',
    border: 'none',
    borderRadius: 4,
    cursor: 'pointer',
    fontWeight: 500,
    fontSize: 12
  },
  approveButton: {
    background: '#dcfce7',
    color: '#166534'
  },
  rejectButton: {
    background: '#fee2e2',
    color: '#991b1b'
  },
  activeLabel: {
    color: '#166534',
    fontWeight: 600
  },
  suspendedLabel: {
    color: '#991b1b',
    fontWeight: 600
  },
  emptyState: {
    background: 'white',
    padding: 40,
    borderRadius: 8,
    textAlign: 'center',
    color: '#6b7280'
  },
  statsSection: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 16
  },
  statCard: {
    background: 'white',
    padding: 20,
    borderRadius: 8,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  statLabel: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 8
  },
  statValue: {
    fontSize: 28,
    fontWeight: 700,
    color: '#059669'
  }
}
