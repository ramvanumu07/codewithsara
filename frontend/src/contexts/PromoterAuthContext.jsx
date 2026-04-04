/**
 * Promoter Authentication Context
 * Manages promoter login, signup, and auth state
 * Separate from user auth (PromoterAuthContext vs AuthContext)
 */

import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../config/api'

const PromoterAuthContext = createContext(null)

export function PromoterAuthProvider({ children }) {
  const [promoter, setPromoter] = useState(null)
  const [promoterToken, setPromoterToken] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Initialize on mount - check for saved token
  useEffect(() => {
    const savedToken = localStorage.getItem('promoter_token')
    if (savedToken) {
      setPromoterToken(savedToken)
      // Verify token is still valid by fetching dashboard
      verifyToken(savedToken)
    } else {
      setLoading(false)
    }
  }, [])

  const verifyToken = async (token) => {
    try {
      const response = await api.get('/promoters/me/dashboard', {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (response.data?.data?.promoter) {
        setPromoter(response.data.data.promoter)
        setPromoterToken(token)
      } else {
        // Invalid token
        localStorage.removeItem('promoter_token')
        setPromoterToken(null)
        setPromoter(null)
      }
    } catch (err) {
      console.error('Token verification failed:', err)
      localStorage.removeItem('promoter_token')
      setPromoterToken(null)
      setPromoter(null)
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email, name, password, confirmPassword, payoutMethod, bankDetails, upiId) => {
    setError(null)
    try {
      const response = await api.post('/promoters/signup', {
        email,
        name,
        password,
        confirmPassword,
        payoutMethod,
        accountHolderName: bankDetails?.accountHolderName,
        accountNumber: bankDetails?.accountNumber,
        confirmAccountNumber: bankDetails?.confirmAccountNumber,
        ifscCode: bankDetails?.ifscCode,
        confirmIfscCode: bankDetails?.confirmIfscCode,
        upiId
      })

      if (response.data?.success) {
        // Don't auto-login - let them login manually
        return response.data.data
      }
      throw new Error(response.data?.message || 'Signup failed')
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Signup failed'
      setError(message)
      throw err
    }
  }

  const login = async (email, password) => {
    setError(null)
    try {
      const response = await api.post('/promoters/login', {
        email,
        password
      })

      if (response.data?.success && response.data?.data?.token) {
        const token = response.data.data.token
        const promoterData = response.data.data.promoter

        localStorage.setItem('promoter_token', token)
        setPromoterToken(token)
        setPromoter(promoterData)

        return { token, promoter: promoterData }
      }
      throw new Error(response.data?.message || 'Login failed')
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'Login failed'
      setError(message)
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('promoter_token')
    setPromoterToken(null)
    setPromoter(null)
    setError(null)
  }

  const value = {
    promoter,
    promoterToken,
    loading,
    error,
    isAuthenticated: !!promoterToken,
    signup,
    login,
    logout
  }

  return (
    <PromoterAuthContext.Provider value={value}>
      {children}
    </PromoterAuthContext.Provider>
  )
}

export function usePromoterAuth() {
  const context = useContext(PromoterAuthContext)
  if (!context) {
    throw new Error('usePromoterAuth must be used within PromoterAuthProvider')
  }
  return context
}
