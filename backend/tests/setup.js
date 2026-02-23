/**
 * Test Setup Configuration
 * Sets up test environment and utilities.
 * Uses Neon (database.js); DEV_MODE uses in-memory maps.
 */

import dotenv from 'dotenv'
import { initializeDatabase, clearTestDatabase } from '../services/database.js'

// Load test environment variables
dotenv.config({ path: '.env.test' })

// Test database setup (DEV_MODE string or pool)
let testClient

beforeAll(async () => {
  testClient = initializeDatabase()
  await cleanTestDatabase()
})

afterAll(async () => {
  await cleanTestDatabase()
})

beforeEach(async () => {
  await cleanTestDatabase()
})

async function cleanTestDatabase() {
  try {
    await clearTestDatabase()
  } catch (error) {
    console.warn('Database cleanup warning:', error.message)
  }
}

// Test utilities
export const createTestUser = async (overrides = {}) => {
  const defaultUser = {
    username: `testuser_${Date.now()}`,
    email: `test_${Date.now()}@example.com`,
    name: 'Test User',
    password: 'TestPassword123!',
    has_access: true
  }
  
  return { ...defaultUser, ...overrides }
}

export const createTestSession = async (userId, overrides = {}) => {
  const defaultSession = {
    user_id: userId,
    token: `test_token_${Date.now()}`,
    expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
    refresh_token: `test_refresh_${Date.now()}`,
    refresh_expires_at: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000).toISOString()
  }
  
  return { ...defaultSession, ...overrides }
}

export { testClient }