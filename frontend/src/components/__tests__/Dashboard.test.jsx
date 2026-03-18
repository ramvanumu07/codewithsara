/**
 * Dashboard Component Tests
 */

import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Dashboard from '../../pages/Dashboard'

/** Quiet React Router v6 → v7 migration warnings in tests */
const ROUTER_FUTURE = {
  v7_startTransition: true,
  v7_relativeSplatPath: true
}

jest.mock('../../contexts/AuthContext', () => ({
  useAuth: jest.fn()
}))

jest.mock('../../config/api', () => ({
  learning: {
    getCourses: jest.fn(() =>
      Promise.resolve({
        data: { success: true, data: { courses: [] } }
      })
    ),
    getContinueLearning: jest.fn(() =>
      Promise.resolve({
        data: { success: true, data: { lastAccessed: null } }
      })
    )
  },
  progress: {
    getAll: jest.fn(() =>
      Promise.resolve({
        data: { success: true, data: { progress: [] } }
      })
    )
  }
}))

import { useAuth } from '../../contexts/AuthContext'
import { learning } from '../../config/api'

const defaultUser = { id: '1', name: 'Test User', username: 'testuser' }

const renderDashboard = () =>
  render(
    <BrowserRouter future={ROUTER_FUTURE}>
      <Dashboard />
    </BrowserRouter>
  )

describe('Dashboard Component', () => {
  beforeEach(() => {
    useAuth.mockReturnValue({
      user: defaultUser,
      isAuthenticated: true,
      logout: jest.fn()
    })
    learning.getCourses.mockResolvedValue({
      data: { success: true, data: { courses: [] } }
    })
  })

  test('renders dashboard for authenticated user', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByText(/dashboard/i)).toBeInTheDocument()
    })
  })

  test('displays user name', async () => {
    useAuth.mockReturnValue({
      user: { id: '1', name: 'John Doe', username: 'johndoe' },
      isAuthenticated: true,
      logout: jest.fn()
    })
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
  })

  test('shows loading state while dashboard data loads', () => {
    learning.getCourses.mockImplementationOnce(() => new Promise(() => {}))
    renderDashboard()
    expect(screen.getByText(/loading your dashboard/i)).toBeInTheDocument()
  })

  test('displays continue learning section', async () => {
    renderDashboard()

    await waitFor(() => {
      expect(screen.getByText(/continue learning/i)).toBeInTheDocument()
    })
  })
})
