/**
 * App Component - Sara Learning Platform
 * Main application routing and layout with Sara branding
 * Enhanced with proper authentication-based redirects
 */

import React from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('React ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
          background: '#f9fafb',
          padding: 24
        }}>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <h1 style={{ fontSize: '1.5rem', color: '#111827', marginBottom: 8 }}>Something went wrong</h1>
            <p style={{ color: '#6b7280', marginBottom: 24, fontSize: '0.9375rem' }}>
              An unexpected error occurred. Please reload the page to continue.
            </p>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: '10px 24px',
                background: '#10a37f',
                color: 'white',
                border: 'none',
                borderRadius: 8,
                fontSize: '0.9375rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

class RouteErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Route ErrorBoundary caught:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: 24
        }}>
          <div style={{ textAlign: 'center', maxWidth: 480 }}>
            <h2 style={{ fontSize: '1.25rem', color: '#111827', marginBottom: 8 }}>This section encountered an error</h2>
            <p style={{ color: '#6b7280', marginBottom: 16, fontSize: '0.9375rem' }}>Try going back or reloading.</p>
            <button onClick={() => this.setState({ hasError: false })} style={{ padding: '8px 20px', background: '#10a37f', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', marginRight: 8 }}>Try Again</button>
            <button onClick={() => window.location.href = '/dashboard'} style={{ padding: '8px 20px', background: '#374151', color: 'white', border: 'none', borderRadius: 8, fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>Go to Dashboard</button>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

// Import Pages
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Signup from './pages/Signup'
import ForgotPassword from './pages/ForgotPassword'
import Dashboard from './pages/Dashboard'
import Learn from './pages/Learn'
import Terms from './pages/Terms'
import Privacy from './pages/Privacy'
import Refund from './pages/Refund'
import Contact from './pages/Contact'
import About from './pages/About'
import Services from './pages/Services'
import Checkout from './pages/Checkout'
import PaymentSuccess from './pages/PaymentSuccess'
import PaymentFailed from './pages/PaymentFailed'
import Admin from './pages/Admin'

// Import Styles (legal page styles are inlined in index.css so they always load on Vercel)
import './index.css'

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="app">
            <AppRoutes />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  )
}

// Separate component to access auth context
const AppRoutes = () => {
  const { loading } = useAuth()

  // Show loading while checking authentication
  if (loading) {
    const loadingOverlayStyle = {
      position: 'fixed',
      left: 0,
      top: 0,
      right: 0,
      bottom: 0,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 16,
      background: 'rgba(255,255,255,0.98)',
      zIndex: 99999
    }
    return createPortal(
      <div className="app-loading" style={loadingOverlayStyle}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div
            className="loading-spinner"
            style={{
              width: 32,
              height: 32,
              border: '3px solid #e5e7eb',
              borderTopColor: '#10a37f',
              borderRadius: '50%',
              animation: 'loadingSpin 1s linear infinite',
              flexShrink: 0
            }}
            aria-hidden
          />
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', fontFamily: 'var(--sara-font)' }}>Loading Sara...</p>
        </div>
      </div>,
      document.body
    )
  }

  return (
    <Routes>
      {/* Public Routes with Authentication Guards */}
      <Route path="/" element={<PublicRoute><Welcome /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
      <Route path="/forgot-password" element={<PublicRoute><ForgotPassword /></PublicRoute>} />
      
      {/* Legal & Info Pages - Always accessible */}
      <Route path="/terms" element={<Terms />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="/refund" element={<Refund />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/services" element={<Services />} />
      <Route path="/products" element={<Navigate to="/services" replace />} />
      <Route path="/refund-cancellation" element={<Navigate to="/refund" replace />} />
      <Route path="/return-refund" element={<Navigate to="/refund" replace />} />
      <Route path="/cancellation" element={<Navigate to="/refund" replace />} />
      <Route path="/shipping" element={<Navigate to="/services" replace />} />
      <Route path="/about" element={<About />} />
      
      {/* Protected Routes */}
      <Route path="/dashboard" element={<ProtectedRoute><RouteErrorBoundary><Dashboard /></RouteErrorBoundary></ProtectedRoute>} />
      <Route path="/checkout" element={<ProtectedRoute><RouteErrorBoundary><Checkout /></RouteErrorBoundary></ProtectedRoute>} />
      <Route path="/payment/success" element={<ProtectedRoute><RouteErrorBoundary><PaymentSuccess /></RouteErrorBoundary></ProtectedRoute>} />
      <Route path="/payment/failed" element={<ProtectedRoute><RouteErrorBoundary><PaymentFailed /></RouteErrorBoundary></ProtectedRoute>} />
      <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
      <Route path="/learn/:topicId" element={<ProtectedRoute><RouteErrorBoundary><LearnRoute /></RouteErrorBoundary></ProtectedRoute>} />
      
      {/* Legacy Route Redirects */}
      <Route path="/learn/:topicId/:subtopicId" element={<LegacyRedirect />} />
      
      {/* Catch All - Smart Redirect */}
      <Route path="*" element={<SmartRedirect />} />
    </Routes>
  )
}

// Public Route Guard - Redirects authenticated users to dashboard
const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }
  
  return children
}


// Protected Route Guard - Redirects unauthenticated users to login
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }
  
  return children
}

// Smart Redirect - Routes unknown paths based on auth status
const SmartRedirect = () => {
  const { isAuthenticated } = useAuth()
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  } else {
    return <Navigate to="/" replace />
  }
}

function LearnRoute() {
  const { topicId } = useParams()
  return <Learn key={topicId} />
}

// Legacy Route Redirect Component (for backward compatibility)
const LegacyRedirect = () => {
  const { topicId } = useParams()
  return <Navigate to={`/learn/${topicId}`} replace />
}

export default App