import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { learning, progress, handleApiError } from '../config/api'
import { computeCourseProgressSummary, isTopicFullyComplete } from '../utils/courseProgress'
import { getUnlockOfferForDashboardCourse } from '../data/welcomeCourseOffers'
import './Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)
  const [error, setError] = useState(null)
  const [courses, setCourses] = useState([])
  const [selectedCourse, setSelectedCourse] = useState('javascript')
  const [userProgress, setUserProgress] = useState([])
  const [progressSummary, setProgressSummary] = useState({})
  const [lastAccessed, setLastAccessed] = useState(null)
  const [showMobileMenu, setShowMobileMenu] = useState(false)
  const [unlockedCourseIds, setUnlockedCourseIds] = useState([])
  const [unlockModalCourse, setUnlockModalCourse] = useState(null)
  const [unlocking, setUnlocking] = useState(false)
  const [downloadingCert, setDownloadingCert] = useState(false)
  const [showHowToRunSteps, setShowHowToRunSteps] = useState(false)

  const cancelledRef = useRef(false)
  useEffect(() => {
    cancelledRef.current = false
    loadDashboardData()
    return () => { cancelledRef.current = true }
  }, [])

  // Open unlock modal if URL has ?unlock=courseId (e.g. from Learn paywall)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const unlockCourseId = params.get('unlock')
    if (unlockCourseId && courses.length > 0 && courses.some(c => c.id === unlockCourseId)) {
      setUnlockModalCourse(courses.find(c => c.id === unlockCourseId))
      window.history.replaceState({}, '', window.location.pathname)
    }
  }, [courses])

  // Handle ESC key to close mobile menu
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showMobileMenu) {
        setShowMobileMenu(false)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [showMobileMenu])

  // Prevent horizontal scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflowX = 'hidden'
    } else {
      document.body.style.overflowX = 'unset'
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflowX = 'unset'
    }
  }, [showMobileMenu])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError(null)

      // Clear any frontend caches
      if (window.clearCache) {
        window.clearCache()
      }

      let continueRes = { data: { success: false, data: {} } }
      let coursesRes = { data: { success: false, data: {} } }
      let progressRes = { data: { success: false, data: {} } }

      try {
        continueRes = await learning.getContinueLearning()
      } catch (e) {
        console.warn('Failed to load continue learning:', e?.message)
      }
      try {
        coursesRes = await learning.getCourses()
      } catch (e) {
        console.warn('Failed to load courses:', e?.message)
      }
      let unlockedRes = { data: { success: false, data: {} } }
      try {
        unlockedRes = await learning.getUnlockedCourses()
      } catch (e) {
        console.warn('Failed to load unlocked courses:', e?.message)
      }
      try {
        progressRes = await progress.getAll()
      } catch (e) {
        throw e
      }

      if (cancelledRef.current) return

      if (unlockedRes.data.success && Array.isArray(unlockedRes.data.data?.courseIds)) {
        setUnlockedCourseIds(unlockedRes.data.data.courseIds)
      }

      if (progressRes.data.success) {
        const progressData = progressRes.data.data.progress || []
        setUserProgress(progressData)
        setProgressSummary(progressRes.data.data.summary || {})
      }

      const lastAccessedData = continueRes.data.success && continueRes.data.data?.lastAccessed
        ? continueRes.data.data.lastAccessed
        : null
      if (lastAccessedData) {
        setLastAccessed(lastAccessedData)
        if (!progressRes.data?.data?.progress?.length && lastAccessedData.topicId) {
          const synthetic = [{
            topic_id: lastAccessedData.topicId,
            phase: lastAccessedData.phase || 'session',
            status: lastAccessedData.status || 'in_progress',
            updated_at: new Date().toISOString()
          }]
          setUserProgress(synthetic)
        }
      }

      if (coursesRes.data.success) {
        setCourses(coursesRes.data.data.courses || [])
      }

    } catch (err) {
      if (!cancelledRef.current) setError(handleApiError(err, 'Failed to load dashboard. Please try again.'))
    } finally {
      if (!cancelledRef.current) setLoading(false)
    }
  }

  const updateProgressForCourse = (courseId) => {
    const courseTopics = courses.find(c => c.id === courseId)?.topics || []
    const courseProgress = userProgress.filter(p =>
      courseTopics.some(topic => String(topic.id) === String(p.topic_id))
    )
    return computeCourseProgressSummary(courseTopics, courseProgress)
  }

  const handleContinueLearning = () => {
    // Prefer /learn/continue lastAccessed so navigation matches the API (canonical resume target)
    let recentTopic = [...userProgress].sort(
      (a, b) => new Date(b.updated_at || 0) - new Date(a.updated_at || 0)
    )[0]
    if (lastAccessed?.topicId) {
      const match = userProgress.find((p) => p.topic_id === lastAccessed.topicId)
      if (match) {
        recentTopic = match
      } else {
        recentTopic = {
          topic_id: lastAccessed.topicId,
          phase: lastAccessed.phase || 'session',
          status: lastAccessed.status || 'in_progress',
          topic_completed: false,
          updated_at: new Date().toISOString()
        }
      }
    }

    if (recentTopic) {
      const topicId = recentTopic.topic_id
      const phase = recentTopic.phase
      const status = recentTopic.status
      const currentAssignment = recentTopic.current_assignment || 0
      const topicCompleted = isTopicFullyComplete(recentTopic)

      // If topic is completed, find next topic
      if (topicCompleted) {
        const selectedCourseData = courses.find(c => c.id === selectedCourse)
        const currentTopicIndex = selectedCourseData?.topics?.findIndex(t => t.id === topicId)

        if (currentTopicIndex !== -1 && currentTopicIndex < (selectedCourseData?.topics?.length - 1)) {
          // Move to next topic's session phase
          const nextTopic = selectedCourseData.topics[currentTopicIndex + 1]
          navigate(`/learn/${nextTopic.id}`)
          return
        } else {
          // Course completed or no more topics
          navigate(`/learn/${selectedCourseData?.topics?.[0]?.id}`)
          return
        }
      }

      // CORRECTED: Smart phase detection using phase-specific completion flags
      let targetPhase = 'session'
      let targetUrl = `/learn/${topicId}`

      // Playtime removed: session ↔ editor (toggle) → assignment only
      if (phase === 'assignment') {
        targetPhase = 'assignment'
        targetUrl = `/learn/${topicId}?phase=assignment`
      } else {
        // Session or playtime (legacy) → session; practice is inline via Code editor toggle
        targetPhase = 'session'
        targetUrl = `/learn/${topicId}`
      }

      navigate(targetUrl)
      return
    }

    // No progress found - start with first topic of selected course
    const selectedCourseData = courses.find(c => c.id === selectedCourse)
    const firstTopic = selectedCourseData?.topics?.[0]
    if (firstTopic) {
      navigate(`/learn/${firstTopic.id}`)
    }
  }

  const handleTopicClick = (topicId) => {
    navigate(`/learn/${topicId}`)
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
    navigate('/login')
  }

  const getTopicById = (topicId) => {
    for (const course of courses) {
      const topic = course.topics?.find(t => t.id === topicId)
      if (topic) return topic
    }
    return null
  }

  const getTopicStatus = (topicId) => {
    const topicProgress = userProgress.find(p => p.topic_id === topicId)
    if (!topicProgress) return 'not_started'
    if (isTopicFullyComplete(topicProgress)) return 'completed'
    return 'in_progress'
  }

  const getTopicPhase = (topicId) => {
    const topicProgress = userProgress.find(p => p.topic_id === topicId)
    return topicProgress?.phase || 'session'
  }

  const getCurrentActiveTopic = () => {
    // Align "Currently learning" with GET /learn/continue when we have lastAccessed
    if (lastAccessed?.topicId) {
      const progressForLast = userProgress.find((p) => p.topic_id === lastAccessed.topicId)
      const topic = getTopicById(lastAccessed.topicId)
      if (topic && progressForLast && !isTopicFullyComplete(progressForLast)) {
        return {
          ...topic,
          phase: progressForLast.phase,
          progress: progressForLast
        }
      }
      if (topic && !progressForLast) {
        return {
          ...topic,
          phase: lastAccessed.phase || 'session',
          progress: null
        }
      }
    }

    // Find current active topic (most recently updated, not completed)
    const activeTopics = userProgress.filter(p => !isTopicFullyComplete(p))
    const currentTopicProgress = activeTopics.sort((a, b) =>
      new Date(b.updated_at || 0) - new Date(a.updated_at || 0)
    )[0]

    if (currentTopicProgress) {
      const topic = getTopicById(currentTopicProgress.topic_id)
      return topic ? {
        ...topic,
        phase: currentTopicProgress.phase,
        progress: currentTopicProgress
      } : null
    }

    // Fallback: if no active topics, try to find the most recent topic with any progress
    if (userProgress.length > 0) {
      const mostRecentProgress = userProgress.sort((a, b) =>
        new Date(b.updated_at || 0) - new Date(a.updated_at || 0)
      )[0]
      if (mostRecentProgress) {
        const topic = getTopicById(mostRecentProgress.topic_id)
        return topic ? {
          ...topic,
          phase: mostRecentProgress.phase,
          progress: mostRecentProgress
        } : null
      }
    }

    // Final fallback: if no progress at all, return first topic of selected course
    const selectedCourseData = courses.find(c => c.id === selectedCourse)
    const firstTopic = selectedCourseData?.topics?.[0]
    if (firstTopic) {
      return {
        ...firstTopic,
        phase: 'session',
        progress: null
      }
    }
    return null
  }

  const getPhaseDisplayName = (phase) => {
    switch (phase) {
      case 'session':
        return 'Learning Session'
      case 'playtime':
        return 'Learning Session'
      case 'assignment':
        return 'Coding Assignments'
      default:
        return 'Learning Session'
    }
  }

  const getPhaseIcon = (phase) => {
    switch (phase) {
      case 'session':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="phase-icon">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
            <polyline points="14,2 14,8 20,8" />
            <line x1="16" y1="13" x2="8" y2="13" />
            <line x1="16" y1="17" x2="8" y2="17" />
            <polyline points="10,9 9,9 8,9" />
          </svg>
        )
      case 'playtime':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="phase-icon">
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <line x1="8" y1="21" x2="16" y2="21" />
            <line x1="12" y1="17" x2="12" y2="21" />
          </svg>
        )
      case 'assignment':
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="phase-icon">
            <polyline points="9,11 12,14 22,4" />
            <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
          </svg>
        )
      default:
        return (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="phase-icon">
            <circle cx="12" cy="12" r="10" />
            <polyline points="12,6 12,12 16,14" />
          </svg>
        )
    }
  }

  if (loggingOut) {
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
      <div className="dashboard-loading" style={loadingOverlayStyle}>
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
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', fontFamily: 'var(--sara-font)' }}>Logging out...</p>
        </div>
      </div>,
      document.body
    )
  }

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
      <div className="dashboard-loading" style={loadingOverlayStyle}>
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
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', fontFamily: 'var(--sara-font)' }}>Loading your dashboard...</p>
        </div>
      </div>,
      document.body
    )
  }

  if (error) {
    const isAuthError = error.includes('401') || error.toLowerCase().includes('session') || error.toLowerCase().includes('unauthorized') || error.toLowerCase().includes('token')
    return (
      <div className="dashboard-error">
        <h2>Something went wrong</h2>
        <p>{error}</p>
        <div className="dashboard-error-actions">
          <button onClick={loadDashboardData} className="retry-button">
            Try Again
          </button>
          <button
            onClick={async () => {
              await logout()
              navigate('/login', { replace: true })
            }}
            className="retry-button secondary"
          >
            Go to Login
          </button>
        </div>
        {isAuthError && (
          <p className="dashboard-error-hint">Your session may have expired. Use "Go to Login" to sign in again.</p>
        )}
      </div>
    )
  }

  const selectedCourseData = courses.find(c => c.id === selectedCourse)
  const currentProgressSummary = updateProgressForCourse(selectedCourse)
  const selectedCourseComplete =
    (currentProgressSummary.total_topics || 0) > 0 &&
    (currentProgressSummary.completed_topics || 0) >= (currentProgressSummary.total_topics || 0)
  const hideCurrentlyLearningAndContinue =
    selectedCourseComplete && !!progressSummary.certificate_eligible

  const allTopicsForCourse = selectedCourseData?.topics || []

  const formatTopicTitle = (title) => {
    if (!title || typeof title !== 'string') return title
    return title.charAt(0).toUpperCase() + title.slice(1)
  }

  /** Selected course is not purchased — show paywall only (no progress / topics / learn CTAs). */
  const selectedCourseLocked = Boolean(
    selectedCourseData && !unlockedCourseIds.includes(selectedCourseData.id)
  )

  const unlockOffer = selectedCourseLocked
    ? getUnlockOfferForDashboardCourse(selectedCourseData.id)
    : null

  const unlockModalOffer = unlockModalCourse
    ? getUnlockOfferForDashboardCourse(unlockModalCourse.id)
    : null

  return (
    <div className={`dashboard ${showMobileMenu ? 'mobile-menu-open' : ''}`}>
          {/* Mobile Menu Toggle */}
          <button
            className="mobile-menu-toggle"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            aria-label={showMobileMenu ? 'Close menu' : 'Open menu'}
          >
            {showMobileMenu ? (
              // Close (X) icon when menu is open
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>

          {/* Sidebar - Desktop always visible, Mobile toggleable */}
          <div className={`sidebar ${showMobileMenu ? 'mobile-open' : ''}`}>
            <div className="sidebar-header">
              <h1 className="brand">Sara</h1>
              <div className="user-section">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                  <span className="user-name">{user?.name || 'User'}</span>
                </div>
                <div className="user-actions">
                  <button onClick={handleLogout} className="action-btn" title="Logout">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16,17 21,12 16,7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div className="courses-nav">
              <h3>Courses</h3>
              {courses.map(course => {
                const isUnlocked = unlockedCourseIds.includes(course.id)
                return (
                  <button
                    key={course.id}
                    className={`course-item ${selectedCourse === course.id ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedCourse(course.id)
                      setShowMobileMenu(false)
                    }}
                  >
                    {isUnlocked ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="9,18 15,12 9,6" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" title="Locked">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    )}
                    {course.title}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Mobile Overlay - tap to close menu; content stays full width underneath */}
          <div
            className={`mobile-overlay ${showMobileMenu ? 'active' : ''}`}
            onClick={() => setShowMobileMenu(false)}
            aria-hidden="true"
          />

          {/* Main Content - Single flowing page (paywall mode hides learner dashboard chrome) */}
          <div className={`main-content${selectedCourseLocked ? ' main-content--paywall' : ''}`}>
            {/* Course Header */}
            <div className="course-header">
              <h2>{selectedCourseData?.title || 'Course'}</h2>
              <p>{selectedCourseData?.description || 'Master programming concepts step by step with Sara'}</p>
            </div>

            {!selectedCourseLocked && (
            <>
            {/* How to run JS code - help link */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
              <span style={{ fontSize: '0.875rem', color: '#6b7280', fontFamily: 'var(--sara-font)' }}>How to run JS code</span>
              <button
                type="button"
                onClick={() => setShowHowToRunSteps(true)}
                aria-label="View steps to run JavaScript code"
                title="View steps"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 20,
                  height: 20,
                  padding: 0,
                  border: 'none',
                  borderRadius: '50%',
                  background: '#e5e7eb',
                  color: '#6b7280',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 700
                }}
              >
                ?
              </button>
            </div>

            {/* How to run JS code - steps modal */}
            {showHowToRunSteps && (
              <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="how-to-run-title"
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 1000,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0,0,0,0.4)',
                  padding: 16
                }}
                onClick={() => setShowHowToRunSteps(false)}
              >
                <div
                  style={{
                    background: 'white',
                    borderRadius: 12,
                    padding: 24,
                    maxWidth: 420,
                    width: '100%',
                    boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h3 id="how-to-run-title" style={{ margin: '0 0 16px', fontSize: '1.125rem', fontFamily: 'var(--sara-font)' }}>How to run JS code</h3>
                  <p style={{ margin: '0 0 12px', fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>In Sara</p>
                  <ol style={{ margin: '0 0 20px', paddingLeft: 20, color: '#374151', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--sara-font)' }}>
                    <li style={{ marginBottom: 8 }}>Complete the <strong>Session</strong> for a topic (chat with Sara to learn).</li>
                    <li style={{ marginBottom: 8 }}>On the <strong>Learn</strong> page, use the <strong>code editor</strong> toggle to open the Playground, or open <strong>Assignments</strong> for that topic.</li>
                    <li style={{ marginBottom: 8 }}>Write or paste JavaScript in the editor and click <strong>Run</strong>. Output appears in the terminal panel.</li>
                  </ol>
                  <p style={{ margin: '0 0 12px', fontSize: '0.8125rem', fontWeight: 600, color: '#374151' }}>Without Sara (outside this app)</p>
                  <ol style={{ margin: 0, paddingLeft: 20, color: '#374151', fontSize: '0.875rem', lineHeight: 1.7, fontFamily: 'var(--sara-font)' }}>
                    <li style={{ marginBottom: 8 }}><strong>Browser:</strong> Open DevTools (F12 or right‑click → Inspect), go to the Console tab, type or paste JS, press Enter.</li>
                    <li style={{ marginBottom: 8 }}><strong>Node.js:</strong> Save code in a <code style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: 4 }}>.js</code> file and run <code style={{ background: '#f3f4f6', padding: '1px 4px', borderRadius: 4 }}>node filename.js</code> in a terminal.</li>
                  </ol>
                  <button
                    type="button"
                    onClick={() => setShowHowToRunSteps(false)}
                    style={{
                      marginTop: 20,
                      padding: '8px 16px',
                      background: '#10a37f',
                      color: 'white',
                      border: 'none',
                      borderRadius: 8,
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      cursor: 'pointer'
                    }}
                  >
                    Got it
                  </button>
                </div>
              </div>
            )}
            </>
            )}

            {/* Course locked: focused upgrade card only (pricing from welcomeCourseOffers) */}
            {selectedCourseLocked && unlockOffer && (
              <section
                className="dashboard-unlock-card"
                aria-labelledby="dashboard-unlock-title"
              >
                <div className="dashboard-unlock-card__layout">
                  <div className="dashboard-unlock-card__main">
                    <p className="dashboard-unlock-card__eyebrow">Upgrade to full access</p>
                    <h3 id="dashboard-unlock-title" className="dashboard-unlock-card__title">
                      {unlockOffer.title}
                    </h3>
                    {unlockOffer.subtitle && (
                      <p className="dashboard-unlock-card__subtitle">{unlockOffer.subtitle}</p>
                    )}
                    <ul className="dashboard-unlock-card__highlights">
                      {(unlockOffer.highlights || []).slice(0, 4).map((line, idx) => (
                        <li key={`${unlockOffer.id}-${idx}`}>{line}</li>
                      ))}
                    </ul>
                  </div>
                  <aside className="dashboard-unlock-card__checkout" aria-label="Purchase options">
                    <div className="dashboard-unlock-card__price-block">
                      <span className="dashboard-unlock-card__price-label">One-time payment</span>
                      <span className="dashboard-unlock-card__price">{unlockOffer.priceFormatted}</span>
                      {unlockOffer.priceNote && (
                        <span className="dashboard-unlock-card__price-note">{unlockOffer.priceNote}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="dashboard-unlock-card__cta"
                      onClick={() => setUnlockModalCourse(selectedCourseData)}
                    >
                      Unlock now — {unlockOffer.priceFormatted}
                    </button>
                    <Link
                      to={unlockOffer.detailHref || '/products'}
                      className="dashboard-unlock-card__secondary"
                    >
                      Pricing &amp; product details
                    </Link>
                  </aside>
                </div>
              </section>
            )}
            {selectedCourseLocked && !unlockOffer && selectedCourseData && (
              <div className="dashboard-paywall-fallback" role="status">
                <p>Pricing for this course is not configured. You can still continue to payment or contact support.</p>
                <button
                  type="button"
                  className="dashboard-unlock-card__cta"
                  style={{ maxWidth: 280 }}
                  onClick={() => setUnlockModalCourse(selectedCourseData)}
                >
                  Continue to payment
                </button>
              </div>
            )}

            {!selectedCourseLocked && (
            <>
            {/* Progress Section */}
            <div className="progress-section">
              <h3>Your Progress</h3>
              <div className="progress-stats">
                <div className="stat">
                  <span className="number">{currentProgressSummary.completed_topics || 0}</span>
                  <span className="label">Completed</span>
                </div>
                <div className="stat">
                  <span className="number">{currentProgressSummary.total_topics || 0}</span>
                  <span className="label">Total Topics</span>
                </div>
                <div className="stat">
                  <span className="number">{currentProgressSummary.completion_percentage || 0}%</span>
                  <span className="label">Overall</span>
                </div>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${currentProgressSummary.completion_percentage || 0}%` }}
                />
              </div>
              {progressSummary.certificate_eligible && (
                <div className="certificate-cta">
                  <div className="certificate-cta-inner">
                    <span className="certificate-icon" aria-hidden>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 15l-4 4h12l-4-4" />
                        <path d="M12 3v12" />
                        <path d="M8 7l4-4 4 4" />
                      </svg>
                    </span>
                    <div className="certificate-text">
                      <strong>Congratulations! You&apos;ve completed all {currentProgressSummary.total_topics} topics!</strong>
                      <p>Download your completion certificate anytime.</p>
                    </div>
                    <button
                      type="button"
                      className="certificate-download-btn"
                      onClick={async () => {
                        setDownloadingCert(true)
                        try {
                          await learning.downloadCertificate()
                        } catch (err) {
                          alert(err?.message || 'Failed to download certificate')
                        } finally {
                          setDownloadingCert(false)
                        }
                      }}
                      disabled={downloadingCert}
                    >
                      {downloadingCert ? 'Downloading...' : 'Download Certificate'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Continue Learning Section */}
            <div className="continue-section">
              {!hideCurrentlyLearningAndContinue && (
                <>
                  {/* Current Learning Status Card - Above Button */}
                  {(() => {
                    const currentTopic = getCurrentActiveTopic()
                    if (currentTopic) {
                      return (
                        <div className="current-learning-card">
                          <div className="learning-header">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="learning-icon">
                              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                              <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                            <span className="learning-label">Currently Learning</span>
                          </div>
                          <div className="topic-info">
                            <h4 className="topic-title">{currentTopic.title}</h4>
                            <div className="phase-info">
                              {getPhaseIcon(currentTopic.phase)}
                              <span className="phase-name">{getPhaseDisplayName(currentTopic.phase)}</span>
                            </div>
                          </div>
                        </div>
                      )
                    }
                    return null
                  })()}

                  {/* Continue Learning Button - disabled when current topic's course is locked */}
                  {(() => {
                    const currentTopic = getCurrentActiveTopic()
                    const currentTopicCourseId = currentTopic ? courses.find(c => c.topics?.some(t => t.id === currentTopic.id))?.id : null
                    const isContinueDisabled = currentTopicCourseId && !unlockedCourseIds.includes(currentTopicCourseId)
                    return (
                      <button
                        className="continue-btn"
                        onClick={handleContinueLearning}
                        disabled={isContinueDisabled}
                        title={isContinueDisabled ? 'Purchase this course to continue' : undefined}
                        style={isContinueDisabled ? { opacity: 0.7, cursor: 'not-allowed' } : undefined}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="5,3 19,12 5,21" />
                        </svg>
                        Continue Learning
                      </button>
                    )
                  })()}
                </>
              )}

              {/* All topics — notes & assignment shortcuts only after topic is fully complete */}
              {allTopicsForCourse.length > 0 && (
                <div className="session-completed-section">
                  <h4 className="session-completed-heading">All topics</h4>
                  <ul className="session-completed-list">
                    {allTopicsForCourse.map((topic) => {
                      const rowProgress = userProgress.find(
                        (p) => String(p.topic_id) === String(topic.id)
                      )
                      const topicComplete = rowProgress && isTopicFullyComplete(rowProgress)
                      return (
                        <li key={topic.id} className="session-completed-row">
                          <span className="session-completed-title">
                            {formatTopicTitle(topic.title)}
                          </span>
                          {topicComplete ? (
                            <div className="session-completed-actions">
                              <button
                                type="button"
                                className="session-completed-icon-btn"
                                onClick={() => navigate(`/learn/${topic.id}?view=notes&ref=1`)}
                                title="Topic notes"
                                aria-label={`View notes for ${formatTopicTitle(topic.title)}`}
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                  <polyline points="14,2 14,8 20,8" />
                                  <line x1="16" y1="13" x2="8" y2="13" />
                                  <line x1="16" y1="17" x2="8" y2="17" />
                                  <polyline points="10,9 9,9 8,9" />
                                </svg>
                              </button>
                              <button
                                type="button"
                                className="session-completed-icon-btn"
                                onClick={() => navigate(`/learn/${topic.id}?phase=assignment&start=1&ref=1`)}
                                title="Try assignments (from task 1)"
                                aria-label={`Assignments for ${formatTopicTitle(topic.title)}`}
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <polyline points="9,11 12,14 22,4" />
                                  <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                              </button>
                            </div>
                          ) : null}
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )}
            </div>
            </>
            )}

          </div>

          {/* Unlock course modal (payment flow) */}
          {unlockModalCourse && (
            <div
              className="unlock-modal-overlay"
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
                padding: 16
              }}
              onClick={() => !unlocking && setUnlockModalCourse(null)}
            >
              <div
                className="unlock-modal dashboard-unlock-modal"
                style={{
                  background: 'white',
                  borderRadius: 16,
                  padding: 24,
                  maxWidth: 420,
                  width: '100%',
                  boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)'
                }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="dashboard-unlock-modal__eyebrow">Complete purchase</p>
                <h3 className="dashboard-unlock-modal__title">
                  {unlockModalOffer?.title || unlockModalCourse.title}
                </h3>
                {unlockModalOffer?.priceFormatted && (
                  <p className="dashboard-unlock-modal__amount">
                    {unlockModalOffer.priceFormatted}
                  </p>
                )}
                <p className="dashboard-unlock-modal__copy">
                  {unlockModalOffer?.priceNote ? `${unlockModalOffer.priceNote}. ` : ''}
                  Includes every topic and assignment in this course.
                </p>
                <div className="dashboard-unlock-modal__actions">
                  <button
                    type="button"
                    disabled={unlocking}
                    className="dashboard-unlock-modal__btn-cancel"
                    onClick={() => setUnlockModalCourse(null)}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={unlocking}
                    className="dashboard-unlock-modal__btn-pay"
                    onClick={async () => {
                      setUnlocking(true)
                      try {
                        await learning.unlockCourse(unlockModalCourse.id)
                        setUnlockedCourseIds(prev => (prev.includes(unlockModalCourse.id) ? prev : [...prev, unlockModalCourse.id]))
                        setUnlockModalCourse(null)
                      } catch (e) {
                        console.error('Unlock failed:', e)
                      } finally {
                        setUnlocking(false)
                      }
                    }}
                  >
                    {unlocking ? 'Processing…' : (unlockModalOffer?.priceFormatted ? `Pay ${unlockModalOffer.priceFormatted}` : 'Pay now')}
                  </button>
                </div>
              </div>
            </div>
          )}

    </div>
  )
}

export default Dashboard