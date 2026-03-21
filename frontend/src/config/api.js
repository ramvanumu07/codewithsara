/**
 * API Configuration - Sara Learning Platform
 * Optimized API client with Sara branding and single-topic architecture
 */

import axios from 'axios'
import { logGroqDebugFromApi } from '../utils/groqDebug'

// Local dev: use relative /api so Vite proxy forwards to backend (no CORS). Production: use VITE_API_BASE_URL or same-origin /api
const isLocalhost = typeof window !== 'undefined' && /^localhost$|^127\.0\.0\.1$/i.test(window.location.hostname)
const raw = import.meta.env.VITE_API_BASE_URL
const baseURL = (isLocalhost ? '' : (raw !== undefined && raw !== '') ? `${raw}/api` : '') || '/api'

const api = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem('sara_token')
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (_) { /* private/restricted browsing */ }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor: on 401 or 403 (auth), clear auth and redirect to login. Do NOT redirect on 403 COURSE_LOCKED.
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const status = error.response?.status
    const code = error.response?.data?.code
    const isAuthFailure = status === 401 || (status === 403 && code !== 'COURSE_LOCKED')
    if (isAuthFailure) {
      const currentPath = window.location.pathname
      const isAuthPage = ['/login', '/signup', '/forgot-password'].includes(currentPath)
      if (!isAuthPage) {
        try {
          localStorage.removeItem('sara_token')
          localStorage.removeItem('sara_user')
        } catch (_) { /* private/restricted browsing */ }
        const event = new CustomEvent('auth-session-expired', {
          detail: { message: 'Your session has expired. Please log in again.' }
        })
        window.dispatchEvent(event)
        setTimeout(() => { window.location.href = '/login' }, 1500)
      }
    }
    return Promise.reject(error)
  }
)

// ============ SARA API FUNCTIONS ============

// Authentication
export const auth = {
  login: (username, password) =>
    api.post('/auth/login', { username, password }),

  signup: (username, name, email, password, confirmPassword, securityQuestion, securityAnswer) =>
    api.post('/auth/signup', { username, name, email, password, confirmPassword, securityQuestion, securityAnswer }),

  getProfile: () => api.get('/auth/profile'),

  logout: () => api.post('/auth/logout'),

  validate: () => api.get('/auth/validate')
}

// Learning API - Single-topic architecture
export const learning = {
  // Get all courses
  getCourses: () => api.get('/learn/courses'),

  // Get specific topic details (referenceOnly + phase when browsing notes/code from dashboard without touching resume order)
  getTopic: (topicId, opts = {}) => {
    const params = {}
    if (opts.referenceOnly) {
      params.ref = '1'
      if (opts.phase) params.phase = opts.phase
    }
    return api.get(`/learn/topic/${topicId}`, { params: Object.keys(params).length ? params : undefined })
  },

  // Start session for a topic
  startSession: (topicId, assignments = []) =>
    api.post('/learn/session/start', { topicId, assignments }),

  // Session chat (non-streaming fallback)
  sessionChat: (topicId, message) =>
    api.post('/chat/session', { topicId, message }),

  // Session chat with streaming - calls onChunk(content) for each token, onDone(data) when complete, onError(err) on failure
  sessionChatStream: async (topicId, message, { onChunk, onDone, onError, signal }) => {
    const token = localStorage.getItem('sara_token')
    const url = `${baseURL || '/api'}/chat/session/stream`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ topicId, message }),
      signal
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      const err = new Error(errData.message || errData.error || `Request failed with status code ${res.status}`)
      err.response = { status: res.status, data: errData }
      onError?.(err)
      throw err
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    try {
      while (true) {
        if (signal?.aborted) break
        const { done, value } = await reader.read()
        if (done) break
        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() || ''
        for (const line of lines) {
          if (!line.startsWith('data: ')) continue
          try {
            const data = JSON.parse(line.slice(6))
            if (data.type === 'chunk' && data.content) onChunk?.(data.content)
            if (data.type === 'done') {
              logGroqDebugFromApi(data)
              onDone?.(data)
            }
            if (data.type === 'error') {
              const err = new Error(data.message || 'AI stream failed')
              err.response = { status: 500, data: { message: data.message } }
              onError?.(err)
              throw err
            }
          } catch (_) { /* ignore */ }
        }
      }
    } finally {
      reader.releaseLock()
    }
  },

  // Assignments
  completeAssignment: (topicId, assignmentIndex, code) =>
    api.post('/learn/assignment/complete', { topicId, assignmentIndex, code }),

  // Code execution
  executeCode: (code, topicId, assignmentIndex = null) =>
    api.post('/learn/execute', { code, topicId, assignmentIndex }),

  executePlayground: (code) => api.post('/learn/execute-playground', { code }),

  // Continue learning
  getContinueLearning: () => api.get('/learn/continue'),

  // Course unlock (payment flow)
  getUnlockedCourses: () => api.get('/learn/unlocked-courses'),
  unlockCourse: (courseId) => api.post('/learn/unlock-course', { courseId }),

  // Certificate (requires all topics in the course — see backend certificate / TOPIC_ORDER)
  downloadCertificate: async () => {
    const certPath = '/learn/certificate/download'
    const url = baseURL ? `${baseURL.replace(/\/$/, '')}${certPath}` : certPath
    const token = localStorage.getItem('sara_token')
    const res = await fetch(url.startsWith('http') ? url : `${window.location.origin}${url}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err.error || err.message || 'Failed to download certificate')
    }
    const blob = await res.blob()
    const blobUrl = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = blobUrl
    a.download = `Sara-Certificate-${new Date().toISOString().slice(0, 10)}.pdf`
    a.click()
    URL.revokeObjectURL(blobUrl)
  }
}

// Progress API
export const progress = {
  getAll: () => api.get('/learn/progress', { params: { _t: Date.now() } })
}

// Chat History API
export const chat = {
  getHistory: (topicId) => api.get(`/chat/history/${topicId}`)
}

// ============ HELPER FUNCTIONS ============

// Token management
export const getToken = () => localStorage.getItem('sara_token')
export const setToken = (token) => localStorage.setItem('sara_token', token)
export const removeToken = () => localStorage.removeItem('sara_token')

// User management
export const getUser = () => {
  try {
    const user = localStorage.getItem('sara_user')
    return user ? JSON.parse(user) : null
  } catch {
    localStorage.removeItem('sara_user')
    return null
  }
}
export const setUser = (user) => localStorage.setItem('sara_user', JSON.stringify(user))
export const removeUser = () => localStorage.removeItem('sara_user')

// Technical error patterns - never show these to users
const TECHNICAL_ERROR_PATTERNS = /getaddrinfo|ENOTFOUND|ECONNREFUSED|ETIMEDOUT|ECONNRESET|ENETUNREACH|connection refused|network error|socket hang up/i

const AXIOS_STATUS_CODE_MSG = /^Request failed with status code (\d+)$/i

/**
 * User-facing error string. Avoids showing raw axios text like "Request failed with status code 500".
 * @param {unknown} error
 * @param {string} [defaultMessage]
 */
export const handleApiError = (error, defaultMessage = 'Something went wrong. Please try again.') => {
  const e = error && typeof error === 'object' ? error : {}
  const status = e.response?.status
  const bodyMsg = String(e.response?.data?.message || e.response?.data?.error || '').trim()
  const axiosMsg = String(e.message || '').trim()
  const axiosStatusMatch = axiosMsg.match(AXIOS_STATUS_CODE_MSG)
  const effectiveStatus = typeof status === 'number' ? status : (axiosStatusMatch ? Number(axiosStatusMatch[1]) : undefined)

  if (bodyMsg) {
    if (TECHNICAL_ERROR_PATTERNS.test(bodyMsg)) {
      return 'Service temporarily unavailable. Please try again in a moment.'
    }
    return bodyMsg
  }

  if (!e.response && (axiosMsg === 'Network Error' || e.code === 'ERR_NETWORK' || e.code === 'ECONNABORTED')) {
    if (e.code === 'ECONNABORTED') {
      return 'The request took too long. Please try again.'
    }
    return 'Could not reach the server. Check your connection and try again.'
  }

  if (TECHNICAL_ERROR_PATTERNS.test(axiosMsg)) {
    return 'Service temporarily unavailable. Please try again in a moment.'
  }

  if (axiosStatusMatch || (effectiveStatus != null && !bodyMsg)) {
    if (effectiveStatus === 408 || effectiveStatus === 504) {
      return 'The request took too long. Please try again.'
    }
    if (effectiveStatus === 429) {
      return 'Too many requests. Please wait a moment and try again.'
    }
    if (effectiveStatus >= 500) {
      return 'Something went wrong on our end. Please try again in a moment.'
    }
    if (effectiveStatus === 404) {
      return 'We could not find that. Please try again.'
    }
  }

  if (axiosMsg && !AXIOS_STATUS_CODE_MSG.test(axiosMsg)) {
    return axiosMsg
  }

  return defaultMessage
}

export default api