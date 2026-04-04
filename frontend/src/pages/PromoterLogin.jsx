/**
 * Promoter Login Page
 * Email and password login for promoters
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePromoterAuth } from '../contexts/PromoterAuthContext'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import '../pages/Auth.css'

export default function PromoterLogin() {
  const navigate = useNavigate()
  const { login } = usePromoterAuth()
  const { toasts, error: showErrorToast, success: showSuccessToast } = useToast()

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validate = () => {
    const newErrors = {}

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validate()) {
      return
    }

    setLoading(true)
    try {
      await login(formData.email, formData.password)
      showSuccessToast('Login successful!')
      setTimeout(() => navigate('/promoter/dashboard'), 1500)
    } catch (err) {
      showErrorToast(err.response?.data?.message || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <ToastContainer toasts={toasts} />

      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h1 style={styles.title}>Promoter Login</h1>
        <p style={styles.subtitle}>Access your promoter dashboard</p>

        <div style={styles.formGroup}>
          <label style={styles.label}>Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            disabled={loading}
            style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
          />
          {errors.email && <p style={styles.errorText}>{errors.email}</p>}
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter password"
            disabled={loading}
            style={{...styles.input, ...(errors.password ? styles.inputError : {})}}
          />
          {errors.password && <p style={styles.errorText}>{errors.password}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{...styles.button, ...{width: '100%'}}}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </button>

        <p style={styles.linkText}>
          Don't have an account? <Link to="/promoter/signup" style={styles.link}>Sign up here</Link>
        </p>

        <div style={styles.divider}>
          <span>Not a promoter?</span>
        </div>

        <Link to="/login" style={{...styles.button, ...styles.secondaryButton, ...{width: '100%', display: 'block', textAlign: 'center', textDecoration: 'none'}}}>
          Student Login
        </Link>
      </form>
    </div>
  )
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f9fafb',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
  },
  formContainer: {
    background: 'white',
    borderRadius: 12,
    padding: 40,
    width: '100%',
    maxWidth: 400,
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    color: '#111827',
    margin: '0 0 8px',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    margin: '0 0 32px'
  },
  formGroup: {
    marginBottom: 20
  },
  label: {
    display: 'block',
    fontSize: 14,
    fontWeight: 500,
    color: '#111827',
    marginBottom: 8
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    fontSize: 14,
    border: '1px solid #d1d5db',
    borderRadius: 6,
    boxSizing: 'border-box',
    fontFamily: 'inherit'
  },
  inputError: {
    borderColor: '#dc2626',
    backgroundColor: '#fef2f2'
  },
  errorText: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    margin: '4px 0 0'
  },
  button: {
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    border: 'none',
    borderRadius: 6,
    background: '#059669',
    color: 'white',
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit',
    marginBottom: 20
  },
  secondaryButton: {
    background: '#e5e7eb',
    color: '#111827'
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
    margin: '0 0 20px'
  },
  link: {
    color: '#059669',
    textDecoration: 'none',
    fontWeight: 600
  },
  divider: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    margin: '20px 0',
    position: 'relative'
  }
}
