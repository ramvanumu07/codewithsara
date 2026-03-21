/**
 * Admin page.
 * Payment flow: Users click Pay on Dashboard to get access. Payment integration coming soon.
 * Protected by server-side admin check via /api/auth/admin-check.
 */
import React, { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import api from '../config/api'

const Admin = () => {
  const [authorized, setAuthorized] = useState(null)

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
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    padding: '2rem'
  }

  return (
    <div style={containerStyle}>
      <header style={{ maxWidth: 800, margin: '0 auto 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.5rem', color: '#111827' }}>Admin</h1>
        <Link to="/dashboard" style={{ color: '#059669', fontWeight: 500, textDecoration: 'none' }}>Back to Dashboard</Link>
      </header>

      <main style={{ maxWidth: 800, margin: '0 auto' }}>
        <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
          Users access courses by clicking Pay on the Dashboard. Payment integration coming soon.
        </p>
      </main>
    </div>
  )
}

export default Admin
