/**
 * API Configuration - Sara Learning Platform
 * Optimized API client with Sara branding and single-topic architecture
 */

import axios from 'axios'

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
    const token = localStorage.getItem('sara_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
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
        localStorage.removeItem('sara_token')
        localStorage.removeItem('sara_user')
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

  signup: (username, name, password, confirmPassword, securityQuestion, securityAnswer) =>
    api.post('/auth/signup', { username, name, password, confirmPassword, securityQuestion, securityAnswer }),

  getSecurityQuestion: (username) =>
    api.post('/auth/get-security-question', { username }),

  verifySecurityAnswer: (username, securityAnswer, newPassword, confirmPassword) =>
    api.post('/auth/verify-security-answer', { username, securityAnswer, newPassword, confirmPassword }),

  verifySecurityAnswerOnly: (username, securityAnswer) =>
    api.post('/auth/verify-security-answer-only', { username, securityAnswer }),

  getProfile: () => api.get('/auth/profile'),

  logout: () => api.post('/auth/logout'),

  validate: () => api.get('/auth/validate')
}

// Learning API - Single-topic architecture
export const learning = {
  // Get all courses
  getCourses: () => api.get('/learn/courses'),

  // Get all topics
  getTopics: () => api.get('/learn/topics'),

  // Get specific topic details
  getTopic: (topicId) => api.get(`/learn/topic/${topicId}`),

  // Get session state for a topic
  getState: (topicId) => api.get(`/learn/state/${topicId}`),

  // Start session for a topic
  startSession: (topicId, assignments = []) =>
    api.post('/learn/session/start', { topicId, assignments }),

  // Session chat (non-streaming fallback)
  sessionChat: (topicId, message) =>
    api.post('/chat/session', { topicId, message }),

  // Session chat with streaming - calls onChunk(content) for each token, onDone(data) when complete, onError(err) on failure
  sessionChatStream: async (topicId, message, { onChunk, onDone, onError }) => {
    const token = localStorage.getItem('sara_token')
    const url = `${baseURL || '/api'}/chat/session/stream`
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      body: JSON.stringify({ topicId, message })
    })
    if (!res.ok) {
      const errData = await res.json().catch(() => ({}))
      const err = new Error(errData.message || errData.error || `Request failed: ${res.status}`)
      err.response = { status: res.status, data: errData }
      onError?.(err)
      throw err
    }
    const reader = res.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''
    try {
      while (true) {
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
            if (data.type === 'done') onDone?.(data)
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

  // Playtime
  startPlaytime: (topicId) =>
    api.post('/learn/playtime/start', { topicId }),

  completePlaytime: (topicId) =>
    api.post('/learn/playtime/complete', { topicId }),

  // Assignments
  startAssignments: (topicId) =>
    api.post('/learn/assignment/start', { topicId }),

  completeAssignment: (topicId, assignmentIndex, code) =>
    api.post('/learn/assignment/complete', { topicId, assignmentIndex, code }),

  // Code execution
  executeCode: (code, topicId, assignmentIndex = null) =>
    api.post('/learn/execute', { code, topicId, assignmentIndex }),

  executePlayground: (code) => api.post('/learn/execute-playground', { code }),

  getHint: (topicId, assignment, userCode = '') =>
    api.post('/chat/assignment/hint', { topicId, assignment, userCode }),

  // Feedback
  getFeedback: (topicId, userCode, assignment) =>
    api.post('/chat/feedback', { topicId, userCode, assignment }),

  // Continue learning
  getContinueLearning: () => api.get('/learn/continue'),

  // Course unlock (payment flow)
  getUnlockedCourses: () => api.get('/learn/unlocked-courses'),
  unlockCourse: (courseId) => api.post('/learn/unlock-course', { courseId })
}

// Progress API
export const progress = {
  getAll: () => api.get('/learn/progress', { params: { _t: Date.now() } }),
  resetAll: () => api.delete('/learn/debug/reset-progress'),
  clearCache: () => api.post('/learn/debug/clear-cache'),
  debugAllSources: () => api.get('/learn/debug/all-data-sources'),
  debugTopic: (topicId) => api.get(`/learn/debug/progress/${topicId}`)
}

// Chat History API
export const chat = {
  getHistory: (topicId) => api.get(`/chat/history/${topicId}`),
  clearHistory: (topicId) => api.delete(`/chat/history/${topicId}`)
}

// ============ HELPER FUNCTIONS ============

// Token management
export const getToken = () => localStorage.getItem('sara_token')
export const setToken = (token) => localStorage.setItem('sara_token', token)
export const removeToken = () => localStorage.removeItem('sara_token')

// User management
export const getUser = () => {
  const user = localStorage.getItem('sara_user')
  return user ? JSON.parse(user) : null
}
export const setUser = (user) => localStorage.setItem('sara_user', JSON.stringify(user))
export const removeUser = () => localStorage.removeItem('sara_user')

// Simplified error handling
export const handleApiError = (error, defaultMessage = 'Something went wrong') => {
  if (error.response?.data?.error) {
    return error.response.data.error
  }
  if (error.response?.data?.message) {
    return error.response.data.message
  }
  if (error.message) {
    return error.message
  }
  return defaultMessage
}

export default api