/**
 * Promoter Signup Page
 * Multi-step registration form for promoters
 * Step 1: Basic Info (email, name, password)
 * Step 2: Payout Method (bank or UPI)
 * Step 3: Bank/UPI Details
 */

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { usePromoterAuth } from '../contexts/PromoterAuthContext'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import '../pages/Auth.css'

export default function PromoterSignup() {
  const navigate = useNavigate()
  const { signup, error: authError } = usePromoterAuth()
  const { toasts, error: showErrorToast, success: showSuccessToast } = useToast()

  const [step, setStep] = useState(1) // 1, 2, or 3
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
    payoutMethod: 'bank', // 'bank' or 'upi'
    accountHolderName: '',
    accountNumber: '',
    confirmAccountNumber: '',
    ifscCode: '',
    confirmIfscCode: '',
    upiId: ''
  })

  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }))
    }
  }

  const validateStep1 = () => {
    const newErrors = {}

    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Valid email is required'
    }

    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required'
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters'
    }

    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateStep2 = () => {
    return true // Payout method is always selected
  }

  const validateStep3 = () => {
    const newErrors = {}

    if (formData.payoutMethod === 'bank') {
      if (!formData.accountHolderName?.trim()) {
        newErrors.accountHolderName = 'Account holder name is required'
      }

      if (!formData.accountNumber?.trim()) {
        newErrors.accountNumber = 'Account number is required'
      } else if (formData.accountNumber.length < 8 || formData.accountNumber.length > 20) {
        newErrors.accountNumber = 'Account number must be 8-20 characters'
      }

      if (formData.accountNumber !== formData.confirmAccountNumber) {
        newErrors.confirmAccountNumber = 'Account numbers do not match'
      }

      if (!formData.ifscCode?.trim()) {
        newErrors.ifscCode = 'IFSC code is required'
      } else if (!/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)) {
        newErrors.ifscCode = 'Invalid IFSC code format (e.g., SBIN0001234)'
      }

      if (formData.ifscCode !== formData.confirmIfscCode) {
        newErrors.confirmIfscCode = 'IFSC codes do not match'
      }
    } else if (formData.payoutMethod === 'upi') {
      if (!formData.upiId?.trim()) {
        newErrors.upiId = 'UPI ID is required'
      } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9]+$/.test(formData.upiId)) {
        newErrors.upiId = 'Invalid UPI ID format (e.g., username@bankname)'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2)
    } else if (step === 2 && validateStep2()) {
      setStep(3)
    }
  }

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1)
      setErrors({})
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateStep3()) {
      return
    }

    setLoading(true)
    try {
      const bankDetails = formData.payoutMethod === 'bank' ? {
        accountHolderName: formData.accountHolderName,
        accountNumber: formData.accountNumber,
        confirmAccountNumber: formData.confirmAccountNumber,
        ifscCode: formData.ifscCode,
        confirmIfscCode: formData.confirmIfscCode
      } : null

      await signup(
        formData.email,
        formData.name,
        formData.password,
        formData.confirmPassword,
        formData.payoutMethod,
        bankDetails,
        formData.payoutMethod === 'upi' ? formData.upiId : null
      )

      showSuccessToast('Signup successful! You can now log in.')
      setTimeout(() => navigate('/promoter/login'), 2000)
    } catch (err) {
      showErrorToast(err.response?.data?.message || 'Signup failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={styles.container}>
      <ToastContainer toasts={toasts} />
      
      <form onSubmit={handleSubmit} style={styles.formContainer}>
        <h1 style={styles.title}>Join Sara Promoter Program</h1>
        <p style={styles.subtitle}>Earn ₹200 for each user who enrolls using your coupon</p>

        {/* Step Indicator */}
        <div style={styles.stepIndicator}>
          {[1, 2, 3].map(s => (
            <div key={s} style={{
              ...styles.stepDot,
              ...(s <= step ? styles.stepDotActive : {})
            }}>
              {s}
            </div>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Basic Information</h2>

            <div style={styles.formGroup}>
              <label style={styles.label}>Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="your@email.com"
                style={{...styles.input, ...(errors.email ? styles.inputError : {})}}
              />
              {errors.email && <p style={styles.errorText}>{errors.email}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your name"
                style={{...styles.input, ...(errors.name ? styles.inputError : {})}}
              />
              {errors.name && <p style={styles.errorText}>{errors.name}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Enter password"
                style={{...styles.input, ...(errors.password ? styles.inputError : {})}}
              />
              {errors.password && <p style={styles.errorText}>{errors.password}</p>}
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm password"
                style={{...styles.input, ...(errors.confirmPassword ? styles.inputError : {})}}
              />
              {errors.confirmPassword && <p style={styles.errorText}>{errors.confirmPassword}</p>}
            </div>
          </div>
        )}

        {/* Step 2: Payout Method */}
        {step === 2 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Choose Payout Method</h2>
            <p style={styles.stepDescription}>How would you like to receive your earnings?</p>

            <div style={styles.payoutOptions}>
              <label style={{...styles.payoutOption, ...(formData.payoutMethod === 'bank' ? styles.payoutOptionSelected : {})}}>
                <input
                  type="radio"
                  name="payoutMethod"
                  value="bank"
                  checked={formData.payoutMethod === 'bank'}
                  onChange={handleInputChange}
                  style={styles.radio}
                />
                <div>
                  <div style={styles.payoutLabel}>Bank Transfer</div>
                  <div style={styles.payoutDescription}>Direct to your bank account (NEFT)</div>
                </div>
              </label>

              <label style={{...styles.payoutOption, ...(formData.payoutMethod === 'upi' ? styles.payoutOptionSelected : {})}}>
                <input
                  type="radio"
                  name="payoutMethod"
                  value="upi"
                  checked={formData.payoutMethod === 'upi'}
                  onChange={handleInputChange}
                  style={styles.radio}
                />
                <div>
                  <div style={styles.payoutLabel}>UPI Transfer</div>
                  <div style={styles.payoutDescription}>Instant to your UPI ID</div>
                </div>
              </label>
            </div>
          </div>
        )}

        {/* Step 3: Payment Details */}
        {step === 3 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>
              {formData.payoutMethod === 'bank' ? 'Bank Account Details' : 'UPI Details'}
            </h2>

            {formData.payoutMethod === 'bank' ? (
              <>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Account Holder Name</label>
                  <input
                    type="text"
                    name="accountHolderName"
                    value={formData.accountHolderName}
                    onChange={handleInputChange}
                    placeholder="Your name"
                    style={{...styles.input, ...(errors.accountHolderName ? styles.inputError : {})}}
                  />
                  {errors.accountHolderName && <p style={styles.errorText}>{errors.accountHolderName}</p>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Account Number</label>
                  <input
                    type="text"
                    name="accountNumber"
                    value={formData.accountNumber}
                    onChange={handleInputChange}
                    placeholder="Enter account number"
                    style={{...styles.input, ...(errors.accountNumber ? styles.inputError : {})}}
                  />
                  {errors.accountNumber && <p style={styles.errorText}>{errors.accountNumber}</p>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirm Account Number</label>
                  <input
                    type="text"
                    name="confirmAccountNumber"
                    value={formData.confirmAccountNumber}
                    onChange={handleInputChange}
                    placeholder="Confirm account number"
                    style={{...styles.input, ...(errors.confirmAccountNumber ? styles.inputError : {})}}
                  />
                  {errors.confirmAccountNumber && <p style={styles.errorText}>{errors.confirmAccountNumber}</p>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>IFSC Code</label>
                  <input
                    type="text"
                    name="ifscCode"
                    value={formData.ifscCode}
                    onChange={(e) => handleInputChange({...e, target: {...e.target, value: e.target.value.toUpperCase()}})}
                    placeholder="e.g., SBIN0001234"
                    style={{...styles.input, ...(errors.ifscCode ? styles.inputError : {})}}
                  />
                  {errors.ifscCode && <p style={styles.errorText}>{errors.ifscCode}</p>}
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Confirm IFSC Code</label>
                  <input
                    type="text"
                    name="confirmIfscCode"
                    value={formData.confirmIfscCode}
                    onChange={(e) => handleInputChange({...e, target: {...e.target, value: e.target.value.toUpperCase()}})}
                    placeholder="Confirm IFSC code"
                    style={{...styles.input, ...(errors.confirmIfscCode ? styles.inputError : {})}}
                  />
                  {errors.confirmIfscCode && <p style={styles.errorText}>{errors.confirmIfscCode}</p>}
                </div>
              </>
            ) : (
              <div style={styles.formGroup}>
                <label style={styles.label}>UPI ID</label>
                <input
                  type="text"
                  name="upiId"
                  value={formData.upiId}
                  onChange={handleInputChange}
                  placeholder="username@bankname"
                  style={{...styles.input, ...(errors.upiId ? styles.inputError : {})}}
                />
                {errors.upiId && <p style={styles.errorText}>{errors.upiId}</p>}
              </div>
            )}
          </div>
        )}

        {/* Error Message */}
        {authError && <p style={styles.formError}>{authError}</p>}

        {/* Navigation Buttons */}
        <div style={styles.buttonGroup}>
          {step > 1 && (
            <button
              type="button"
              onClick={handlePrevStep}
              disabled={loading}
              style={{...styles.button, ...styles.secondaryButton}}
            >
              Previous
            </button>
          )}

          {step < 3 ? (
            <button
              type="button"
              onClick={handleNextStep}
              disabled={loading}
              style={{...styles.button, ...styles.primaryButton, ...{flex: 1}}}
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              disabled={loading}
              style={{...styles.button, ...styles.primaryButton, ...{flex: 1}}}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          )}
        </div>

        {/* Login Link */}
        <p style={styles.linkText}>
          Already a promoter? <Link to="/promoter/login" style={styles.link}>Log in here</Link>
        </p>
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
    maxWidth: 500,
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
  stepIndicator: {
    display: 'flex',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 32
  },
  stepDot: {
    width: 40,
    height: 40,
    borderRadius: '50%',
    background: '#e5e7eb',
    color: '#9ca3af',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 600,
    fontSize: 14
  },
  stepDotActive: {
    background: '#059669',
    color: 'white'
  },
  stepContent: {
    marginBottom: 24
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: 600,
    color: '#111827',
    marginBottom: 8
  },
  stepDescription: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 20
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
  formError: {
    background: '#fee2e2',
    color: '#dc2626',
    padding: 12,
    borderRadius: 6,
    fontSize: 14,
    marginBottom: 20,
    margin: '0 0 20px'
  },
  payoutOptions: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    marginBottom: 24
  },
  payoutOption: {
    display: 'flex',
    gap: 12,
    padding: 16,
    border: '2px solid #e5e7eb',
    borderRadius: 8,
    cursor: 'pointer',
    transition: 'all 0.2s',
    alignItems: 'flex-start'
  },
  payoutOptionSelected: {
    borderColor: '#059669',
    background: '#f0fdf4'
  },
  radio: {
    marginTop: 4,
    cursor: 'pointer'
  },
  payoutLabel: {
    fontSize: 14,
    fontWeight: 600,
    color: '#111827'
  },
  payoutDescription: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 4
  },
  buttonGroup: {
    display: 'flex',
    gap: 12,
    marginBottom: 20
  },
  button: {
    padding: '12px 24px',
    fontSize: 14,
    fontWeight: 600,
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    transition: 'all 0.2s',
    fontFamily: 'inherit'
  },
  primaryButton: {
    background: '#059669',
    color: 'white'
  },
  secondaryButton: {
    background: '#e5e7eb',
    color: '#111827'
  },
  linkText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#6b7280',
    margin: 0
  },
  link: {
    color: '#059669',
    textDecoration: 'none',
    fontWeight: 600
  }
}
