/**
 * Admin page.
 * Payment flow: Users click Pay on Dashboard to get access. Payment integration coming soon.
 * Protected by server-side admin check via /api/auth/admin-check.
 */
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import api from '../config/api'
import AdminPromoters from './AdminPromoters'
import { ToastContainer } from '../components/Toast'
import { useToast } from '../hooks/useToast'

const Admin = () => {
  const [authorized, setAuthorized] = useState(null)
  const [activeTab, setActiveTab] = useState('promoters') // Can be 'promoters', 'users', 'payments'
  const { toasts } = useToast()

  useEffect(() => {
    let cancelled = false
    api.get('/auth/admin-check')
      .then(res => {
        if (!cancelled) setAuthorized(res.data?.data?.isAdmin === true)
      })
      .catch(() => {
        if (!cancelled) setAuthorized(false)
      })
    return () => { cancelled = true }
  }, [])

  if (authorized === null) {
    return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--sara-font)' }}>Checking access...</div>
  }

  if (!authorized) {
    return <Navigate to="/dashboard" replace />
  }

  const containerStyle = {
    minHeight: '100vh',
    background: '#f9fafb',
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  }

  const headerStyle = {
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    padding: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  }

  const tabsStyle = {
    display: 'flex',
    gap: 0,
    background: 'white',
    borderBottom: '1px solid #e5e7eb',
    paddingLeft: '2rem'
  }

  const tabStyle = (isActive) => ({
    padding: '1rem 1.5rem',
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    fontWeight: isActive ? 600 : 500,
    color: isActive ? '#059669' : '#6b7280',
    borderBottom: isActive ? '2px solid #059669' : '2px solid transparent',
    fontSize: '0.875rem'
  })

  const contentStyle = {
    background: 'white',
    minHeight: 'calc(100vh - 200px)'
  }

  return (
    <div style={containerStyle}>
      <ToastContainer toasts={toasts} />

      <header style={headerStyle}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Admin Dashboard</h1>
        <Link to="/dashboard" style={{ color: '#059669', fontWeight: 500, textDecoration: 'none' }}>Back to Dashboard</Link>
      </header>

      <div style={tabsStyle}>
        <button
          onClick={() => setActiveTab('promoters')}
          style={tabStyle(activeTab === 'promoters')}
        >
          Promoters
        </button>
        <button
          onClick={() => setActiveTab('users')}
          style={tabStyle(activeTab === 'users')}
        >
          Users
        </button>
        <button
          onClick={() => setActiveTab('payments')}
          style={tabStyle(activeTab === 'payments')}
        >
          Payments
        </button>
      </div>

      <div style={contentStyle}>
        {activeTab === 'promoters' && <AdminPromoters />}
        
        {activeTab === 'users' && (
          <div style={{ padding: 24 }}>
            <p style={{ color: '#6b7280' }}>User management coming soon...</p>
          </div>
        )}
        
        {activeTab === 'payments' && (
          <div style={{ padding: 24 }}>
            <p style={{ color: '#6b7280' }}>Users access courses by clicking Pay on the Dashboard. Payment integration coming soon.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Admin
