/**
 * Authentication Context - Sara Learning Platform
 * Enhanced auth context with profile management and session handling
 */

import React, { createContext, useContext, useState, useEffect } from 'react'
import { auth, getToken, getUser, removeToken, removeUser, setToken, setUser } from '../config/api'

// Always return a string for UI display (backend can send object on 500)
function toErrorString (value) {
  if (value == null) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'object' && value !== null) {
    if (typeof value.message === 'string') return value.message
    if (typeof value.error === 'string') return value.error
    if (value.message != null) return String(value.message)
    if (value.error != null) return String(value.error)
    return JSON.stringify(value)
  }
  return String(value)
}

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUserState] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const cancelRef = { current: false }
    initializeAuth(cancelRef)
    return () => { cancelRef.current = true }
  }, [])

  // When API interceptor gets 401, it clears token and redirects. Update auth state immediately so UI reflects it.
  useEffect(() => {
    const onSessionExpired = () => {
      removeToken()
      removeUser()
      setUserState(null)
      setIsAuthenticated(false)
    }
    window.addEventListener('auth-session-expired', onSessionExpired)
    return () => window.removeEventListener('auth-session-expired', onSessionExpired)
  }, [])

  const initializeAuth = async (cancelRef) => {
    const AUTH_TIMEOUT_MS = 10000

    try {
      const token = getToken()
      const savedUser = getUser()

      if (token) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), AUTH_TIMEOUT_MS)
          const validatePromise = auth.validate().catch(() => null)
          const timeoutPromise = new Promise((_, reject) => {
            controller.signal.addEventListener('abort', () => reject(new Error('Auth check timed out')))
          })
          const response = await Promise.race([validatePromise, timeoutPromise])
          clearTimeout(timeoutId)

          if (cancelRef.current) return

          if (response?.data?.success && response.data.data?.user) {
            const freshUser = response.data.data.user
            setUser(freshUser)
            setUserState(freshUser)
            setIsAuthenticated(true)
          } else {
            await logout()
          }
        } catch (validationError) {
          if (!cancelRef.current) await logout()
        }
      } else if (savedUser) {
        await logout()
      }
    } catch (error) {
      if (!cancelRef.current) await logout()
    } finally {
      if (!cancelRef.current) setLoading(false)
    }
  }

  const login = async (username, password) => {
    try {
      const response = await auth.login(username, password)

      if (response.data.success) {
        const { user: userData, accessToken, token } = response.data.data
        const tokenToStore = accessToken || token
        setToken(tokenToStore)
        setUser(userData)
        setUserState(userData)
        setIsAuthenticated(true)
        return { success: true, user: userData }
      } else {
        const err = response.data.message ?? response.data.error ?? 'Login failed'
        return { success: false, error: toErrorString(err) || 'Login failed' }
      }
    } catch (error) {
      const isLocalhost = typeof window !== 'undefined' && /^localhost$|^127\.0\.0\.1$/i.test(window.location.hostname)
      let errorMessage = 'Login failed. Please try again.'
      if (error.response?.data) {
        const d = error.response.data
        errorMessage = toErrorString(d.message ?? d.error ?? d) || errorMessage
      }
      if (errorMessage === 'Login failed. Please try again.' && error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again in a moment.'
      }
      if (errorMessage === 'Login failed. Please try again.' && (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error'))) {
        errorMessage = isLocalhost
          ? 'Cannot reach server. Make sure the backend is running on port 5000 (run: npm run dev from project root).'
          : 'Unable to connect. Please check your connection and try again.'
      }
      return { success: false, error: errorMessage }
    }
  }

  const signup = async (username, name, email, password, confirmPassword, securityQuestion, securityAnswer) => {
    try {
      const response = await auth.signup(username, name, email, password, confirmPassword, securityQuestion, securityAnswer)

      if (response.data.success) {
        const { user: userData, token } = response.data.data
        setToken(token)
        setUser(userData)
        setUserState(userData)
        setIsAuthenticated(true)
        return { success: true, user: userData }
      } else {
        const err = response.data.message ?? response.data.error ?? 'Signup failed'
        return { success: false, error: toErrorString(err) || 'Signup failed' }
      }
    } catch (error) {
      const isLocalhost = typeof window !== 'undefined' && /^localhost$|^127\.0\.0\.1$/i.test(window.location.hostname)
      let errorMessage = 'Signup failed. Please try again.'
      if (error.response?.data) {
        const d = error.response.data
        errorMessage = toErrorString(d.message ?? d.error ?? d) || errorMessage
      }
      if (errorMessage === 'Signup failed. Please try again.' && error.response?.status >= 500) {
        errorMessage = 'Server error. Please try again in a moment.'
      }
      if (errorMessage === 'Signup failed. Please try again.' && (error.code === 'ECONNREFUSED' || error.message?.includes('Network Error'))) {
        errorMessage = isLocalhost
          ? 'Cannot reach server. Make sure the backend is running (e.g. npm run dev from project root).'
          : 'Unable to connect. Please check your connection and try again.'
      }
      return { success: false, error: errorMessage }
    }
  }

  const logout = async () => {
    try {
      await auth.logout()
    } catch (error) {
      // still clear local state
    } finally {
      removeToken()
      removeUser()
      setUserState(null)
      setIsAuthenticated(false)
    }
  }

  const refreshUser = async () => {
    try {
      const response = await auth.getProfile()
      
      if (response.data.success) {
        const userData = response.data.data.user
        setUser(userData)
        setUserState(userData)
        return userData
      }
    } catch (error) {
    }
    return null
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    signup,
    logout,
    refreshUser,
    isLoggedIn: () => isAuthenticated && !!user,
    getUserId: () => user?.id,
    getUsername: () => user?.username,
    getUserName: () => user?.name
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext