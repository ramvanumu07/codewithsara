/**
 * Frontend Test Setup
 */

import '@testing-library/jest-dom'

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
const sessionStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}
global.sessionStorage = sessionStorageMock

// Keep test output readable: filter known third-party / env noise (not app bugs)
const originalError = console.error
const originalWarn = console.warn

function shouldSuppressError (...args) {
  const text = args.map((a) => (typeof a === 'string' ? a : String(a))).join('\n')
  if (text.includes('Warning: ReactDOM.render is no longer supported')) return true
  // RTL render/renderHook still hit react-dom act-compat; advisory until @testing-library/react upgrades
  if (text.includes('ReactDOMTestUtils') && text.includes('deprecated')) return true
  // Dashboard loads data in parallel async effects; intermediate setStates are benign in these tests
  if (text.includes('not wrapped in act') && text.includes('Dashboard')) return true
  return false
}

function shouldSuppressWarn (...args) {
  const msg = args[0]
  if (typeof msg !== 'string') return false
  if (msg.includes('React Router Future Flag Warning')) return true
  return false
}

beforeAll(() => {
  console.error = (...args) => {
    if (shouldSuppressError(...args)) return
    originalError.call(console, ...args)
  }
  console.warn = (...args) => {
    if (shouldSuppressWarn(...args)) return
    originalWarn.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
  console.warn = originalWarn
})