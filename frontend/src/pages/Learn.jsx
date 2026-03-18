import React, { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { learning, chat } from '../config/api'
import EditorToggle from '../components/EditorToggle'
import SessionPlayground from '../components/SessionPlayground'
import CodeExecutor from '../services/CodeExecutor'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import { copyToClipboard } from '../utils/copyToClipboard'
import SyntaxHighlightedCode from '../components/SyntaxHighlightedCode'
import SyntaxHighlightedTextarea from '../components/SyntaxHighlightedTextarea'
import { formatTerminalRunResult } from '../lib/formatTerminalOutput'
import './Learn.css'
import './Learn-responsive.css'

const SESSION_COMPLETE_REASON = 'Session completed. You can view the conversation but cannot send new messages.'

/** Copy button SVG icons */
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
)
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/**
 * Renders chat/outcome message content as Markdown.
 * One render path, one set of CSS classes (.message-markdown).
 */
const MessageContent = ({ content, role }) => {
  const [copiedId, setCopiedId] = useState(null)
  const blockIdRef = useRef(0)
  blockIdRef.current = 0
  const onCopy = (id, code) => {
    copyToClipboard(code).then((ok) => {
      if (ok) {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      }
    })
  }

  const mdComponents = {
    p: ({ children }) => <p>{children}</p>,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    code: ({ node, inline, className, children, ...props }) => {
      if (inline) return <code className="message-markdown__inline-code" {...props}>{children}</code>
      return <code {...props}>{children}</code>
    },
    pre: ({ node, children }) => {
      // Extract code string for copy button; support mdast (node.children[0].value) or children props
      let code = ''
      const first = node?.children?.[0]
      if (first && typeof first.value === 'string') code = first.value
      else if (first?.children?.[0]?.value) code = first.children[0].value
      else {
        const codeEl = React.Children.toArray(children)?.[0]
        const raw = codeEl?.props?.children
        if (Array.isArray(raw)) code = raw.map(c => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('')
        else if (typeof raw === 'string') code = raw
        else if (raw != null) code = String(raw)
      }
      const id = `cb-${(blockIdRef.current++).toString(36)}`
      return (
        <div className="message-markdown__code-wrapper">
          <button
            type="button"
            className={`message-markdown__code-copy${copiedId === id ? ' message-markdown__code-copy--copied' : ''}`}
            onClick={() => onCopy(id, code)}
            title={copiedId === id ? 'Copied' : 'Copy code'}
            aria-label={copiedId === id ? 'Copied' : 'Copy code'}
          >
            {copiedId === id ? <CheckIcon /> : <CopyIcon />}
          </button>
          <SyntaxHighlightedCode code={code} preClassName="message-markdown__code-block" />
        </div>
      )
    }
  }

  const isUser = role === 'user'
  if (!content || typeof content !== 'string') {
    return (
      <div className={isUser ? 'message-content message-content--bubble' : 'message-content message-content--plain'}>
        <div className="message-text">
          <div className="message-markdown" />
        </div>
      </div>
    )
  }

  return (
    <div
      className={isUser ? 'message-content message-content--bubble' : 'message-content message-content--plain'}
      style={{ minWidth: 0, maxWidth: isUser ? '85%' : '100%' }}
    >
      <div className="message-text">
        <div className="message-markdown">
          <ReactMarkdown components={mdComponents}>{content.trim()}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

/** Dev style solution / review panel: Markdown + copy icon on code blocks (same as chat messages). */
function AssignmentReviewMarkdown({ text }) {
  const [copiedId, setCopiedId] = useState(null)
  const blockIdRef = useRef(0)
  if (!text || typeof text !== 'string') return null
  blockIdRef.current = 0
  const onCopy = (id, code) => {
    copyToClipboard(code).then((ok) => {
      if (ok) {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      }
    })
  }
  const components = {
    code: ({ node, inline, children, ...props }) =>
      inline ? <code className="message-markdown__inline-code" {...props}>{children}</code> : <code {...props}>{children}</code>,
    pre: ({ node, children }) => {
      let code = ''
      const first = node?.children?.[0]
      if (first && typeof first.value === 'string') code = first.value
      else if (first?.children?.[0]?.value) code = first.children[0].value
      else {
        const codeEl = React.Children.toArray(children)?.[0]
        const raw = codeEl?.props?.children
        if (Array.isArray(raw)) code = raw.map((c) => (typeof c === 'string' ? c : c?.props?.children ?? '')).join('')
        else if (typeof raw === 'string') code = raw
        else if (raw != null) code = String(raw)
      }
      const id = `review-cb-${(blockIdRef.current++).toString(36)}`
      return (
        <div className="message-markdown__code-wrapper">
          <button
            type="button"
            className={`message-markdown__code-copy${copiedId === id ? ' message-markdown__code-copy--copied' : ''}`}
            onClick={() => onCopy(id, code)}
            title={copiedId === id ? 'Copied' : 'Copy entire code'}
            aria-label={copiedId === id ? 'Copied' : 'Copy entire code'}
          >
            {copiedId === id ? <CheckIcon /> : <CopyIcon />}
          </button>
          <SyntaxHighlightedCode code={code} preClassName="message-markdown__code-block" />
        </div>
      )
    }
  }
  return (
    <div className="message-markdown">
      <ReactMarkdown components={components}>{text}</ReactMarkdown>
    </div>
  )
}

const Learn = () => {
  const { topicId } = useParams()
  const topicIdRef = useRef(topicId)
  topicIdRef.current = topicId
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { toasts, info: showInfo } = useToast()
  // Playtime removed: practice is inline in session via toggle; playtime URL treated as session
  const phaseParam = searchParams.get('phase') || 'session'
  const phase = phaseParam === 'playtime' ? 'session' : phaseParam
  const startFromFirst = searchParams.get('start') === '1'
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [courseLocked, setCourseLocked] = useState(false)
  const [lockedCourseId, setLockedCourseId] = useState(null)

  // Session phase states
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [sessionComplete, setSessionComplete] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesScrollContainerRef = useRef(null)
  const lastMessageRef = useRef(null)
  // Prevent double sessionChat('') from React StrictMode / effect re-run (race causes different AI responses, then visibilitychange overwrites UI)
  const sessionStartInProgressRef = useRef(null)

  // Session: code editor visibility — synced with fixed toggle and localStorage
  // Always show chat on load/reload; editor toggle state is not persisted for session phase
  const [showEditorInSession, setShowEditorInSession] = useState(false)

  const [userCode, setUserCode] = useState('')
  const [playgroundOutput, setPlaygroundOutput] = useState('')
  const [playgroundReady, setPlaygroundReady] = useState(false)
  const [editorHeight, setEditorHeight] = useState(60) // 60% editor, 40% terminal (mobile)
  const [editorWidth, setEditorWidth] = useState(60) // 60% editor, 40% terminal (desktop)
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768)
  const [isDragging, setIsDragging] = useState(false)

  // Assignment phase states
  const [assignments, setAssignments] = useState([])
  const [currentAssignment, setCurrentAssignment] = useState(0)
  const [assignmentCode, setAssignmentCode] = useState('')
  const [assignmentOutput, setAssignmentOutput] = useState('')
  const [assignmentTestResults, setAssignmentTestResults] = useState(null) // [{ passed, expected, actual, error, input }]
  const assignmentTestResultsRef = useRef(null) // persist so test block stays visible when AI review is shown
  const [assignmentReview, setAssignmentReview] = useState('')
  const [assignmentComplete, setAssignmentComplete] = useState(false)
  const [assignmentsCompletedCount, setAssignmentsCompletedCount] = useState(0)
  const [showIncompleteModal, setShowIncompleteModal] = useState(false)
  const [incompleteModalMessage, setIncompleteModalMessage] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)
  const assignmentTextareaRef = useRef(null)

  // Scroll so newest message is at top of view (user scrolls up to read previous)
  useEffect(() => {
    if (phase !== 'session') return
    const el = lastMessageRef.current
    const container = messagesScrollContainerRef.current
    if (!el || !container) return
    const raf = requestAnimationFrame(() => {
      container.scrollTop = el.offsetTop
    })
    return () => cancelAnimationFrame(raf)
  }, [messages, isTyping, phase])

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Load topic and initialize based on phase
  useEffect(() => {
    const requestedTopicId = topicId
    const loadTopic = async () => {
      try {
        setLoading(true)
        setError(null)
        setCourseLocked(false)
        setLockedCourseId(null)
        // Avoid flashing another topic's assignments before this topic's payload arrives (SPA navigation)
        if (phase === 'assignment') {
          setAssignments([])
        }

        const topicResponse = await learning.getTopic(requestedTopicId)

        // Ignore response if user navigated to a different topic (avoid stale UI / wrong topic)
        if (topicIdRef.current !== requestedTopicId) return

        // Validate response structure
        if (!topicResponse.data?.success || !topicResponse.data?.data?.topic) {
          throw new Error('Invalid topic response structure')
        }

        const topicData = topicResponse.data.data.topic
        setTopic(topicData)

        const progressPhase = topicData?.phase || phase
        if (phase === 'session') {
          setSessionComplete(false)
        }
        if (progressPhase === 'playtime' || progressPhase === 'assignment') {
          setSessionComplete(true)
        }

        const viewIsNotes = searchParams.get('view') === 'notes'
        if (viewIsNotes) {
          setLoading(false)
          return
        }

        if (phase === 'session') {
          // Load chat history (use requestedTopicId for the topic we're showing)
          try {
            const historyResponse = await chat.getHistory(requestedTopicId)

            if (topicIdRef.current !== requestedTopicId) return

            if (historyResponse.data.data.messages && historyResponse.data.data.messages.length > 0) {
              setMessages(historyResponse.data.data.messages)
              // Check if session is complete based on message content
              const lastMessage = historyResponse.data.data.messages[historyResponse.data.data.messages.length - 1]
              if (lastMessage.role === 'assistant' &&
                (lastMessage.content.includes('ready for the playground') ||
                  lastMessage.content.includes('Congratulations') ||
                  lastMessage.content.includes('SESSION_COMPLETE_SIGNAL'))) {
                setSessionComplete(true)
              }
            } else {
              // Prevent double sessionChat('') from StrictMode / effect re-run (race → different AI responses, then visibilitychange overwrites)
              if (sessionStartInProgressRef.current === requestedTopicId) return
              sessionStartInProgressRef.current = requestedTopicId
              // Start new session - use non-streaming for reliability
              const streamMessage = { role: 'assistant', content: '', timestamp: new Date().toISOString() }
              setMessages([streamMessage])
              try {
                const res = await learning.sessionChat(requestedTopicId, '')
                if (topicIdRef.current !== requestedTopicId) return
                const data = res?.data?.data
                if (data?.response != null) {
                  const apiMessages = data.messages
                  if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
                    setMessages(apiMessages.map(m => ({ role: m.role, content: (m.content || '').trim(), timestamp: m.timestamp || new Date().toISOString() })))
                  } else {
                    setMessages([{ role: 'assistant', content: data.response, timestamp: new Date().toISOString() }])
                  }
                  if (data.sessionComplete || data.response?.includes('ready for the playground') || data.response?.includes('Congratulations')) {
                    setSessionComplete(true)
                  }
                } else {
                  setMessages([{ role: 'assistant', content: data?.message || 'No response from AI. Please try again.', timestamp: new Date().toISOString() }])
                }
              } catch (err) {
                const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message
                setMessages([{ role: 'assistant', content: msg || 'Sorry, the AI could not respond. Please try again.', timestamp: new Date().toISOString() }])
              } finally {
                sessionStartInProgressRef.current = null
              }
            }
          } catch (historyError) {
            // Start new session on error (e.g. getHistory failed)
            if (sessionStartInProgressRef.current === requestedTopicId) return
            sessionStartInProgressRef.current = requestedTopicId
            try {
              const streamMessage = { role: 'assistant', content: '', timestamp: new Date().toISOString() }
              setMessages([streamMessage])
              try {
                const res = await learning.sessionChat(requestedTopicId, '')
                if (topicIdRef.current !== requestedTopicId) return
                const data = res?.data?.data
                if (data?.response != null) {
                  const apiMessages = data.messages
                  if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
                    setMessages(apiMessages.map(m => ({ role: m.role, content: (m.content || '').trim(), timestamp: m.timestamp || new Date().toISOString() })))
                  } else {
                    setMessages([{ role: 'assistant', content: data.response, timestamp: new Date().toISOString() }])
                  }
                  if (data.sessionComplete || data.response?.includes('ready for the playground') || data.response?.includes('Congratulations')) {
                    setSessionComplete(true)
                  }
                } else {
                  setMessages([{ role: 'assistant', content: data?.message || 'No response from AI. Please try again.', timestamp: new Date().toISOString() }])
                }
              } catch (err) {
                const msg = err?.response?.data?.message || err?.response?.data?.error || err?.message
                setMessages([{ role: 'assistant', content: msg || 'Sorry, the AI could not respond. Please try again.', timestamp: new Date().toISOString() }])
              } finally {
                sessionStartInProgressRef.current = null
              }
            } catch (startError) {
              const msg = startError?.response?.data?.message || startError?.response?.data?.error || startError?.message
              setError(msg || 'Failed to initialize chat session')
              sessionStartInProgressRef.current = null
            }
          }
        } else if (phase === 'assignment') {
          // Load assignments from topic data; resume at next task or start from 1st
          const assignmentsList = topicResponse.data.data.topic.tasks || []
          setAssignments(assignmentsList)
          const topicCompleted = topicData?.topic_completed === true
          const assignmentsCompleted = topicData?.assignments_completed ?? 0
          setAssignmentsCompletedCount(assignmentsCompleted)
          // current_task is 1-based (next task number); convert to 0-based index for assignments array
          const currentTaskOneBased = topicData?.current_task ?? 1
          const currentTaskIndex = Math.max(0, currentTaskOneBased - 1)
          // If coming from "assignment icon" on completed topic, or start=1, show 1st task
          const startIndex = (startFromFirst || topicCompleted) ? 0 : Math.min(currentTaskIndex, Math.max(0, assignmentsList.length - 1))
          setCurrentAssignment(startIndex)
          setAssignmentComplete(topicCompleted && assignmentsCompleted >= assignmentsList.length)
          if (assignmentsList.length > 0) {
            const assignment = assignmentsList[startIndex]
            const description = assignment.description || 'Complete the assignment below'
            // Use as-is if already a comment (// or /*) so function-type task descriptions display correctly
            let codeWithComments = (description.startsWith('//') || description.startsWith('/*'))
              ? `${description}\n`
              : `// ${description}\n`
            if (assignment.requirements && assignment.requirements.length > 0) {
              assignment.requirements.forEach(req => {
                codeWithComments += req.startsWith('//') ? `${req}\n` : `// ${req}\n`
              })
            }
            if (assignment.solution_type !== 'function') {
              codeWithComments = codeWithComments.replace(/\n+$/, '').replace(/\n\n+/g, '\n') + `\n// START YOUR CODE AFTER THIS LINE. DO NOT REMOVE THIS LINE\n`
            }
            codeWithComments += assignment.starter_code || ''
            setAssignmentCode(codeWithComments)
          }
          setAssignmentOutput('')
          assignmentTestResultsRef.current = null
          setAssignmentTestResults(null)
          setAssignmentReview('')
        }

      } catch (err) {
        const status = err.response?.status
        const data = err.response?.data
        if (status === 403 && data?.code === 'COURSE_LOCKED') {
          setCourseLocked(true)
          setLockedCourseId(data?.details?.courseId || null)
          setError(null)
        } else {
          setError(data?.error || data?.message || 'Failed to load topic')
        }
      } finally {
        setLoading(false)
      }
    }

    if (topicId) {
      loadTopic()
    }
  }, [topicId, phase, startFromFirst, searchParams])

  // When user returns to the tab, refetch chat history so we show DB truth (not stale in-memory state from another tab)
  useEffect(() => {
    const handleVisibility = async () => {
      if (document.visibilityState !== 'visible' || phase !== 'session' || !topicId) return
      try {
        const historyResponse = await chat.getHistory(topicId)
        if (topicIdRef.current !== topicId) return
        if (historyResponse?.data?.data?.messages?.length > 0) {
          setMessages(historyResponse.data.data.messages)
        }
      } catch (_) { /* ignore */ }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [topicId, phase])

  // Handle sending messages in session phase (no new messages once session is completed)
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (sessionComplete) {
      showInfo(SESSION_COMPLETE_REASON, 4000)
      return
    }
    if (!inputValue.trim() || isTyping) return

    const userMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    try {
      const streamMessage = { role: 'assistant', content: '', timestamp: new Date().toISOString() }
      setMessages(prev => [...prev, streamMessage])

      try {
        const res = await learning.sessionChat(topicId, userMessage.content)
        if (topicIdRef.current !== topicId) return
        const data = res?.data?.data
        if (data && 'response' in data) {
          // Use full messages from API when available (keeps UI in sync with Neon DB)
          const apiMessages = data.messages
          if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
            setMessages(apiMessages.map(m => ({
              role: m.role,
              content: (m.content || '').trim(),
              timestamp: m.timestamp || new Date().toISOString()
            })))
          } else {
            const content = (data.response ?? '').trim() || 'The AI returned an empty response. Please try again.'
            setMessages(prev => {
              const withoutPlaceholder = prev.slice(0, -1)
              return [...withoutPlaceholder, { role: 'assistant', content, timestamp: new Date().toISOString() }]
            })
          }
          if (data.sessionComplete || data.response?.includes('ready for the playground') || data.response?.includes('Congratulations')) {
            setSessionComplete(true)
          }
        } else {
          throw new Error(data?.message || 'No response from AI')
        }
      } catch (streamErr) {
        throw streamErr
      }
    } catch (err) {
      const code = err.response?.data?.code
      const status = err.response?.status
      if ((status === 400 || status === 403) && code === 'SESSION_ALREADY_COMPLETE') {
        setMessages(prev => prev.slice(0, -1))
        setSessionComplete(true)
        showInfo(SESSION_COMPLETE_REASON, 4000)
        return
      }
      const actualError = err.response?.data?.message || err.response?.data?.error || err.message || 'Something went wrong. Please try again.'
      const errorMessage = {
        role: 'assistant',
        content: actualError,
        timestamp: new Date().toISOString()
      }
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last?.content === '') {
          return [...prev.slice(0, -1), errorMessage]
        }
        return [...prev, errorMessage]
      })
    } finally {
      setIsTyping(false)
    }
  }

  // Industry-level secure code execution system
  const handleRunPlayground = async () => {
    const outputDiv = document.getElementById('terminal-output')
    if (!outputDiv) return

    try {
      // Clear previous output
      outputDiv.innerHTML = '<div style="color: #10a37f; font-family: Monaco, Consolas, monospace; padding: 8px;">Executing code securely...</div>'

      // Execute code using secure Web Worker
      const result = await CodeExecutor.executeForTesting(
        userCode,
        [], // No test cases for playground
        null, // No function name for playground
        'script' // Always script type for playground
      )

      const { text: outputText, isError } = formatTerminalRunResult(result)
      const outputColor = isError ? '#ef4444' : '#10a37f'

      const outputLines = outputText.split('\n')

      // Update line numbers
      const lineNumbersDiv = outputDiv.parentElement.querySelector('.terminal-line-numbers')
      if (lineNumbersDiv) {
        let lineNumbersHTML = ''
        outputLines.forEach((_, index) => {
          lineNumbersHTML += `<div style="line-height: 1.4; color: #6b7280; text-align: right; padding-right: 8px; font-size: 0.875rem;">${index + 1}</div>`
        })
        lineNumbersDiv.innerHTML = lineNumbersHTML
      }

      // Update output content
      let formattedOutput = ''
      outputLines.forEach((line) => {
        const color = line.includes('Error:') ? '#ef4444' :
          line.includes('Warning') ? '#f59e0b' :
            line.includes('Execution completed') ? '#10a37f' : outputColor
        formattedOutput += `<div style="line-height: 1.4; color: ${color}; white-space: pre; padding-left: 2px; font-size: 0.875rem;">${line || ' '}</div>`
      })

      outputDiv.innerHTML = `
        <div style="font-family: Monaco, Consolas, 'SF Mono', 'Courier New', monospace; line-height: 1.4;">
          ${formattedOutput}
        </div>
      `

      // Set output for reference
      setPlaygroundOutput(outputText)
    } catch (error) {
      const errorDiv = `<div style="color: #ef4444; font-family: Monaco, Consolas, monospace; padding: 16px;">Error: ${error.message}</div>`
      outputDiv.innerHTML = errorDiv
    }
  }

  // Handle splitter dragging (mouse)
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    const container = e.currentTarget.parentElement

    if (isDesktop) {
      // Horizontal resizing for desktop
      const startX = e.clientX
      const startWidth = editorWidth
      const containerWidth = container.clientWidth

      const handleMouseMove = (e) => {
        const deltaX = e.clientX - startX
        const deltaPercent = (deltaX / containerWidth) * 100
        const newWidth = Math.min(Math.max(startWidth + deltaPercent, 30), 70)
        setEditorWidth(newWidth)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      // Vertical resizing for mobile
      const startY = e.clientY
      const startHeight = editorHeight
      const containerHeight = container.clientHeight

      const handleMouseMove = (e) => {
        const deltaY = e.clientY - startY
        const deltaPercent = (deltaY / containerHeight) * 100
        const newHeight = Math.min(Math.max(startHeight + deltaPercent, 30), 70)
        setEditorHeight(newHeight)
      }

      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }
  }

  // Handle splitter dragging (touch)
  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
    const touch = e.touches[0]
    const container = e.currentTarget.parentElement

    if (isDesktop) {
      // Horizontal resizing for desktop
      const startX = touch.clientX
      const startWidth = editorWidth
      const containerWidth = container.clientWidth

      const handleTouchMove = (e) => {
        e.preventDefault()
        const touch = e.touches[0]
        const deltaX = touch.clientX - startX
        const deltaPercent = (deltaX / containerWidth) * 100
        const newWidth = Math.min(Math.max(startWidth + deltaPercent, 30), 70)
        setEditorWidth(newWidth)
      }

      const handleTouchEnd = () => {
        setIsDragging(false)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    } else {
      // Vertical resizing for mobile
      const startY = touch.clientY
      const startHeight = editorHeight
      const containerHeight = container.clientHeight

      const handleTouchMove = (e) => {
        e.preventDefault()
        const touch = e.touches[0]
        const deltaY = touch.clientY - startY
        const deltaPercent = (deltaY / containerHeight) * 100
        const newHeight = Math.min(Math.max(startHeight + deltaPercent, 30), 70)
        setEditorHeight(newHeight)
      }

      const handleTouchEnd = () => {
        setIsDragging(false)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    }
  }

  // Copy code to clipboard (replaces Reset in session editor)
  const handleCopyCode = async () => {
    if (!userCode.trim()) return
    await copyToClipboard(userCode)
  }

  // Run: execute code and show output in terminal. Clear Submit view (test results + AI review).
  const handleRunAssignment = async () => {
    assignmentTestResultsRef.current = null
    setAssignmentTestResults(null)
    setAssignmentReview('')
    setAssignmentOutput('Executing code securely...')

    try {
      // Run = same as playground: always script mode (console.log only). Test still uses function mode when needed.
      const result = await CodeExecutor.executeForTesting(
        assignmentCode,
        [],
        null,
        'script'
      )

      const { text: outputText } = formatTerminalRunResult(result)
      setAssignmentOutput(outputText)
    } catch (error) {
      setAssignmentOutput(`Error: ${error.message}`)
    }
  }

  // Mobile: soft keyboards often don't fire keydown with correct e.key; beforeInput fires with e.data
  const AUTO_CLOSE_PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' }
  const handleAssignmentBeforeInput = (e) => {
    if (!e.data || e.data.length !== 1) return
    const ch = e.data
    if (!AUTO_CLOSE_PAIRS[ch]) return
    const textarea = e.target
    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const value = assignmentCode || ''
    if (['"', "'", '`'].includes(ch)) {
      if (value.charAt(start) === ch) {
        e.preventDefault()
        requestAnimationFrame(() => {
          const ta = assignmentTextareaRef.current
          if (ta) ta.selectionStart = ta.selectionEnd = start + 1
        })
        return
      }
      const beforeCursor = value.substring(0, start)
      const quoteCount = (beforeCursor.match(new RegExp('\\' + ch, 'g')) || []).length
      if (quoteCount % 2 === 1) return
    }
    e.preventDefault()
    const closeChar = AUTO_CLOSE_PAIRS[ch]
    const selectedText = value.substring(start, end)
    const newValue = selectedText
      ? value.substring(0, start) + ch + selectedText + closeChar + value.substring(end)
      : value.substring(0, start) + ch + closeChar + value.substring(start)
    setAssignmentCode(newValue)
    const cursorPos = start + 1 + (selectedText ? selectedText.length : 0)
    requestAnimationFrame(() => {
      const ta = assignmentTextareaRef.current
      if (ta) {
        ta.focus()
        ta.selectionStart = start + 1
        ta.selectionEnd = selectedText ? cursorPos : start + 1
      }
    })
  }

  // Format test input for display: show key-value list instead of raw object
  const formatTestInput = (input) => {
    if (input == null) return null
    if (typeof input !== 'object') return [{ key: '', value: String(input) }]
    const entries = Object.entries(input)
    if (entries.length === 0) return null
    return entries.map(([k, v]) => ({
      key: k,
      value: typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)
    }))
  }

  // Build test results text from results array (local or backend shape)
  const buildTestResultsText = (results, allPassed) => {
    if (!results?.length) return ''
    const passed = results.filter(r => r.passed).length
    const total = results.length
    let text = `Test Results: ${passed}/${total} passed\n\n`
    results.forEach((r, i) => {
      const status = r.passed ? '[PASS]' : '[FAIL]'
      const expected = r.expected ?? r.expectedOutput ?? ''
      const actual = r.output ?? r.result ?? r.error ?? 'No output'
      text += `${status} Test ${i + 1}: Input: ${JSON.stringify(r.input || {})}\n`
      text += `   Expected: ${expected}\n   Actual: ${actual}\n`
      if (!r.passed && r.error) text += `   Error: ${r.error}\n`
      text += '\n'
    })
    if (allPassed) text += 'All tests passed!\n'
    return text
  }

  // Submit: run tests (show pass/fail), persist progress when all pass. No AI review — use Review button for that.
  const handleSubmitAssignment = async () => {
    const currentTask = assignments[currentAssignment]
    const testCases = currentTask?.testCases || []
    const solutionType = currentTask?.solution_type || 'script'
    const functionName = currentTask?.function_name || null

    setAssignmentReview('') // show test results, not previous review
    try {
      setSubmitLoading(true)

      // 1. Run tests and display test case results in a clear structured format
      if (testCases.length > 0) {
        const localResult = await CodeExecutor.executeForTesting(
          assignmentCode,
          testCases,
          functionName,
          solutionType
        )
        if (localResult.error && !localResult.results?.length) {
          assignmentTestResultsRef.current = null
          setAssignmentTestResults(null)
          setAssignmentOutput(`Error: ${localResult.error}`)
          setSubmitLoading(false)
          return
        }
        const results = localResult.results || []
        const passedCount = results.filter(r => r.passed).length
        const testResultsList = results.map(r => ({
          passed: r.passed,
          expected: r.expected ?? r.expectedOutput ?? '',
          actual: r.output ?? r.result ?? r.error ?? 'No output',
          error: r.error,
          input: r.input
        }))
        setAssignmentOutput(`Test Results: ${passedCount}/${results.length} passed`)
        setAssignmentTestResults(testResultsList)
        assignmentTestResultsRef.current = testResultsList

        if (!localResult.success || !localResult.allPassed) {
          setSubmitLoading(false)
          return
        }
      } else {
        assignmentTestResultsRef.current = null
        setAssignmentTestResults(null)
        setAssignmentOutput('No test cases for this assignment.')
      }

      // 1b. Persist progress (current_task, assignments_completed) so dashboard and topic stay in sync
      try {
        await learning.completeAssignment(topicId, currentAssignment, assignmentCode)
        // Advance local count only when this was the next task in sequence (backend enforces same rule)
        if (currentAssignment === assignmentsCompletedCount) {
          setAssignmentsCompletedCount(prev => {
            const next = prev + 1
            if (next >= assignments.length) setAssignmentComplete(true)
            return next
          })
        }
      } catch (completeErr) {
        setAssignmentOutput((prev) => (prev ? `${prev}\n(Progress could not be saved: ${completeErr?.response?.data?.message || completeErr.message})` : `Progress could not be saved: ${completeErr?.response?.data?.message || completeErr.message}`))
      }
    } catch (err) {
      const body = err.response?.data
      const msg = body?.message ?? body?.error ?? (typeof body === 'string' ? body : err.message) ?? 'Request failed'
      assignmentTestResultsRef.current = null
      setAssignmentTestResults(null)
      setAssignmentOutput(`Error: ${msg}`)
    } finally {
      setSubmitLoading(false)
    }
  }

  /** Next topic learning session (/learn/:id), or dashboard if none / error */
  const goToNextTopicSession = async () => {
    try {
      const coursesRes = await learning.getCourses()
      if (!coursesRes.data?.success || !coursesRes.data?.data?.courses?.length) {
        navigate('/dashboard')
        return
      }
      const courses = coursesRes.data.data.courses
      let nextTopicId = null
      for (const course of courses) {
        const topics = course.topics || []
        const idx = topics.findIndex((t) => String(t.id) === String(topicId))
        if (idx !== -1 && idx < topics.length - 1) {
          nextTopicId = topics[idx + 1].id
          break
        }
      }
      if (nextTopicId) {
        navigate(`/learn/${nextTopicId}`)
      } else {
        navigate('/dashboard')
      }
    } catch {
      navigate('/dashboard')
    }
  }

  // Show dev style solution (reference_solution from curriculum)
  const handleReviewAssignment = () => {
    const currentTask = assignments[currentAssignment]
    if (!currentTask) return
    const refSol = currentTask.reference_solution
    if (refSol && typeof refSol === 'string') {
      setAssignmentReview('```javascript\n' + refSol.trim() + '\n```')
    } else {
      setAssignmentReview('No dev style solution available for this assignment.')
    }
  }

  const handleNext = async () => {
    if (assignments.length === 0) {
      await goToNextTopicSession()
      return
    }
    if (currentAssignment < assignments.length - 1) {
      // More assignments in this topic — load next assignment
      const nextAssignmentIndex = currentAssignment + 1
      setCurrentAssignment(nextAssignmentIndex)
      const nextAssignment = assignments[nextAssignmentIndex]
      const description = nextAssignment.description || 'Complete the assignment below'
      let codeWithComments = (description.startsWith('//') || description.startsWith('/*'))
        ? `${description}\n`
        : `// ${description}\n`
      if (nextAssignment.requirements && nextAssignment.requirements.length > 0) {
        nextAssignment.requirements.forEach(req => {
          codeWithComments += req.startsWith('//') ? `${req}\n` : `// ${req}\n`
        })
      }
      if (nextAssignment.solution_type !== 'function') {
        codeWithComments = codeWithComments.replace(/\n+$/, '').replace(/\n\n+/g, '\n') + `\n// START YOUR CODE AFTER THIS LINE. DO NOT REMOVE THIS LINE\n`
      }
      codeWithComments += nextAssignment.starter_code || ''
      setAssignmentCode(codeWithComments)
      setAssignmentOutput('')
      assignmentTestResultsRef.current = null
      setAssignmentTestResults(null)
      setAssignmentReview('')
    } else {
      // Last assignment — only allow next topic if all assignments completed
      if (!assignmentComplete) {
        setIncompleteModalMessage('Please complete all assignments in this topic before moving to the next topic. Click Test after your code passes the tests for each assignment.')
        setShowIncompleteModal(true)
        return
      }
      try {
        const coursesRes = await learning.getCourses()
        if (!coursesRes.data?.success || !coursesRes.data?.data?.courses?.length) {
          navigate('/dashboard')
          return
        }
        const courses = coursesRes.data.data.courses
        let nextTopicId = null
        for (const course of courses) {
          const topics = course.topics || []
          const idx = topics.findIndex(t => String(t.id) === String(topicId))
          if (idx !== -1 && idx < topics.length - 1) {
            nextTopicId = topics[idx + 1].id
            break
          }
        }
        if (nextTopicId) {
          navigate(`/learn/${nextTopicId}`)
        } else {
          navigate('/dashboard')
        }
      } catch (err) {
        navigate('/dashboard')
      }
    }
  }

  // Back in assignment: previous assignment or session phase if on 1st
  const handleAssignmentBack = () => {
    if (assignments.length === 0) {
      navigate(`/learn/${topicId}`)
      return
    }
    if (currentAssignment > 0) {
      const prevIndex = currentAssignment - 1
      setCurrentAssignment(prevIndex)
      const prevAssignment = assignments[prevIndex]
      const description = prevAssignment.description || 'Complete the assignment below'
      let codeWithComments = (description.startsWith('//') || description.startsWith('/*'))
        ? `${description}\n`
        : `// ${description}\n`
      if (prevAssignment.requirements && prevAssignment.requirements.length > 0) {
        prevAssignment.requirements.forEach(req => {
          codeWithComments += req.startsWith('//') ? `${req}\n` : `// ${req}\n`
        })
      }
      if (prevAssignment.solution_type !== 'function') {
        codeWithComments = codeWithComments.replace(/\n+$/, '').replace(/\n\n+/g, '\n') + `\n// START YOUR CODE AFTER THIS LINE. DO NOT REMOVE THIS LINE\n`
      }
      codeWithComments += prevAssignment.starter_code || ''
      setAssignmentCode(codeWithComments)
      setAssignmentOutput('')
      assignmentTestResultsRef.current = null
      setAssignmentTestResults(null)
      setAssignmentReview('')
    } else {
      navigate(`/learn/${topicId}`)
    }
  }

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Cleanup CodeExecutor resources
      CodeExecutor.destroy()
    }
  }, [])

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
      <div className="loading-container" style={loadingOverlayStyle}>
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
          <p style={{ margin: 0, fontSize: '0.875rem', fontWeight: 500, color: '#6b7280', fontFamily: 'var(--sara-font)' }}>Loading topic...</p>
        </div>
      </div>,
      document.body
    )
  }

  if (courseLocked) {
    const unlockUrl = lockedCourseId ? `/dashboard?unlock=${encodeURIComponent(lockedCourseId)}` : '/dashboard'
    return (
      <div className="error-container" style={{ padding: 40, textAlign: 'center', maxWidth: 420, margin: '60px auto' }}>
        <div style={{ marginBottom: 16 }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" style={{ margin: '0 auto' }}>
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
        </div>
        <h2 style={{ color: '#92400e', marginBottom: '8px' }}>Full access requires purchase</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          Purchase the course to access this topic and all content.
        </p>
        <button
          onClick={() => navigate(unlockUrl)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Pay
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            marginLeft: 12,
            padding: '12px 24px',
            backgroundColor: 'transparent',
            color: '#6b7280',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontSize: '0.95rem',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (error) {
    return (
      <div className="error-container">
        <h2 style={{ color: '#dc2626', marginBottom: '8px' }}>Topic Not Found</h2>
        <p style={{ color: '#6b7280', marginBottom: '24px' }}>
          The topic you're looking for doesn't exist or you don't have access to it.
        </p>
        {error && error !== 'Topic not found' && (
          <p style={{ color: '#9ca3af', fontSize: '0.8125rem', marginBottom: '16px' }}>{error}</p>
        )}
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#10a37f',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            fontSize: '0.95rem',
            fontWeight: '500',
            cursor: 'pointer'
          }}
        >
          Back to Dashboard
        </button>
      </div>
    )
  }

  if (!topic) {
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#6b7280'
      }}>
        <div style={{
          textAlign: 'center',
          padding: '40px'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '8px' }}>Topic Not Found</h2>
          <p style={{ color: '#6b7280', marginBottom: '24px' }}>
            The topic you're looking for doesn't exist or you don't have access to it.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#10a37f',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer'
            }}
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    )
  }

  // Topic notes view: same message UI as session so outcome_messages match session display
  if (searchParams.get('view') === 'notes') {
    const notesContent = topic.topic_notes && typeof topic.topic_notes === 'string' && topic.topic_notes.trim()
    // Debug: find why notes show content not in project – check Console for this log
    if (typeof window !== 'undefined' && (import.meta.env?.DEV || searchParams.get('debug') === '1')) {
      const hasOM = !!(topic.outcome_messages && Array.isArray(topic.outcome_messages))
      const omLen = topic.outcome_messages?.length ?? 0
      const outLen = topic.outcomes?.length ?? 0
      console.debug('[Notes source]', {
        topicId: topic.id,
        hasTopicNotes: !!notesContent,
        topicNotesPreview: notesContent ? notesContent.slice(0, 100) + '...' : null,
        hasOutcomeMessages: hasOM,
        outcomeMessagesLength: omLen,
        outcomesLength: outLen,
        showing: (hasOM && outLen && omLen === outLen) ? 'Q&A (outcome_messages)' : notesContent ? 'topic_notes (fallback)' : 'outcomes list only'
      })
    }
    const hasOutcomeMessages =
      topic.outcome_messages &&
      Array.isArray(topic.outcome_messages) &&
      topic.outcomes &&
      topic.outcome_messages.length === topic.outcomes.length
    const notesMarkdownComponents = {
      code: ({ node, inline, className, children, ...props }) =>
        inline ? (
          <code {...props}>{children}</code>
        ) : (
          <SyntaxHighlightedCode
            code={typeof children === 'string' ? children : String(React.Children.toArray(children).join(''))}
            preClassName="notes-code-block"
          />
        ),
      pre: ({ children }) => {
        const child = React.Children.only(children)
        if (child?.type === 'pre') return <>{child}</>
        return children
      },
      p: ({ children }) => <p>{children}</p>,
      h2: ({ children }) => <h2>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      ul: ({ children }) => <ul>{children}</ul>,
      li: ({ children }) => <li>{children}</li>
    }
    return (
      <div className="learn-container topic-notes-view" style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <header className="learn-header" style={{ flexShrink: 0 }}>
          <button
            type="button"
            className="back-btn learn-sara-brand"
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            Sara
          </button>
          <div className="header-center">
            <span className="header-title">{topic.title}</span>
            <div className="phase-text">Topic notes</div>
          </div>
          <div style={{ width: 80 }} />
        </header>
        {hasOutcomeMessages ? (
          <div className="session-container" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
            <div className="messages-area" style={{ flex: 1, minHeight: 0, padding: '12px 16px' }}>
              {topic.outcome_messages.map((content, i) => {
                const outcomeTitle = (topic.outcomes && topic.outcomes[i]) ? topic.outcomes[i] : `Outcome ${i + 1}`
                const msg = typeof content === 'string' && content.trim() ? content : null
                // TODO: After all topics have outcome_messages, hide task in notes again (strip from "Now, let's try a simple practice task:" to end)
                return (
                  <React.Fragment key={i}>
                    <div
                      className="message-row message-row--user"
                      style={{ justifyContent: 'flex-end' }}
                    >
                      <MessageContent content={outcomeTitle} role="user" />
                    </div>
                    <div
                      className="message-row message-row--assistant"
                      style={{ justifyContent: 'flex-start' }}
                    >
                      <MessageContent content={msg || 'No content for this outcome yet.'} role="assistant" />
                    </div>
                  </React.Fragment>
                )
              })}
            </div>
          </div>
        ) : (
          <div
            className="topic-notes-scroll"
            style={{
              flex: 1,
              overflow: 'auto',
              padding: '28px 24px 48px',
              maxWidth: 720,
              margin: '0 auto',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            {notesContent ? (
              <div className="message-text topic-notes-doc">
                <ReactMarkdown components={notesMarkdownComponents}>{notesContent}</ReactMarkdown>
              </div>
            ) : (
              <div className="topic-notes-doc">
                <h2>Outcomes</h2>
                <ul>
                  {(topic.outcomes || []).map((o, i) => (
                    <li key={i}>{o}</li>
                  ))}
                </ul>
                {(!topic.outcomes || topic.outcomes.length === 0) && (
                  <p style={{ color: '#64748b' }}>Notes for this topic are being prepared.</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="learn-container">
      {/* Modal: complete all assignments before next topic */}
      {showIncompleteModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999
          }}
          onClick={() => setShowIncompleteModal(false)}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '24px',
              borderRadius: '12px',
              maxWidth: '360px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              textAlign: 'center'
            }}
            onClick={e => e.stopPropagation()}
          >
            <p style={{ margin: '0 0 16px', fontSize: '1rem', color: '#374151' }}>
              {incompleteModalMessage || 'Complete and submit the current assignment before going to the next one.'}
            </p>
            <button
              type="button"
              onClick={() => setShowIncompleteModal(false)}
              style={{
                padding: '10px 24px',
                backgroundColor: '#10a37f',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '0.95rem',
                cursor: 'pointer'
              }}
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Session: fixed toggle only; editor view has no header */}
      {phase === 'session' && (
        <EditorToggle
          isOn={showEditorInSession}
          onToggle={setShowEditorInSession}
        />
      )}

      {/* Header only where needed (chat view, assignment view); editor view has no header */}
      {((phase === 'session' && !showEditorInSession) || phase === 'assignment') && (
        <header className="learn-header">
          <button
            type="button"
            className="back-btn learn-sara-brand"
            onClick={() => navigate('/dashboard')}
            title="Back to Dashboard"
            aria-label="Back to Dashboard"
          >
            Sara
          </button>

          <div className="header-center">
            <span className="header-title">{topic.title}</span>
            <div className="phase-text">
              {phase === 'session' && 'Learning Session'}
              {phase === 'assignment' &&
                (assignments.length === 0
                  ? 'No practice tasks'
                  : `Assignment ${currentAssignment + 1} of ${assignments.length}`)}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {phase === 'session' && (
              <button
                type="button"
                disabled={!sessionComplete}
                onClick={() => navigate(`/learn/${topicId}?phase=assignment`)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 16px',
                  backgroundColor: sessionComplete ? '#10a37f' : '#d1d5db',
                  color: sessionComplete ? 'white' : '#9ca3af',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: sessionComplete ? 'pointer' : 'not-allowed',
                  fontSize: '0.9rem',
                  fontFamily: 'var(--sara-font)'
                }}
                title={sessionComplete ? 'Go to code tasks' : 'Complete the session to unlock code tasks'}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="16,18 22,12 16,6" />
                  <polyline points="8,6 2,12 8,18" />
                </svg>
                Code
              </button>
            )}
            {phase === 'assignment' && (
              <>
                <button
                  type="button"
                  className="assignment-nav-btn assignment-back-btn"
                  onClick={handleAssignmentBack}
                  title={currentAssignment > 0 ? 'Previous assignment' : 'Back to session'}
                  aria-label={currentAssignment > 0 ? 'Previous assignment' : 'Back to session'}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15,18 9,12 15,6" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="assignment-nav-btn assignment-next-btn"
                  onClick={handleNext}
                  title={
                    assignments.length === 0
                      ? 'Next topic session'
                      : currentAssignment < assignments.length - 1
                        ? 'Next assignment'
                        : 'Next topic'
                  }
                  aria-label={
                    assignments.length === 0
                      ? 'Next topic session'
                      : currentAssignment < assignments.length - 1
                        ? 'Next assignment'
                        : 'Next topic'
                  }
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9,18 15,12 9,6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </header>
      )}

      {/* Session chat view */}
      {phase === 'session' && !showEditorInSession && (
        <div className="session-container" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
          <div ref={messagesScrollContainerRef} className="messages-area" style={{ flex: 1, minHeight: 0, padding: '12px 16px' }}>
            {messages.map((message, index) => (
              <div
                key={index}
                ref={!isTyping && index === messages.length - 1 ? lastMessageRef : null}
                className={`message-row message-row--${message.role}`}
                style={{ justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                <MessageContent content={message.content} role={message.role} />
              </div>
            ))}

            {isTyping && (
              <div ref={lastMessageRef} className="message-row message-row--assistant" style={{ justifyContent: 'flex-start' }}>
                <div className="message-content message-content--plain">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {sessionComplete && (
            <div className="session-complete-readonly" style={{ padding: '12px 16px', background: '#f0fdf4', borderTop: '1px solid #bbf7d0', color: '#166534', fontSize: '0.875rem', textAlign: 'center' }}>
              {SESSION_COMPLETE_REASON} You can go to Assignments to practice.
            </div>
          )}
          <form className="input-form" onSubmit={handleSendMessage}>
            <textarea
              className="text-input"
              value={inputValue}
              onChange={(e) => !sessionComplete && setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (sessionComplete) {
                  e.preventDefault()
                  return
                }
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage(e)
                }
              }}
              placeholder={sessionComplete ? 'Session completed' : 'Type your message...'}
              rows="1"
              disabled={isTyping || sessionComplete}
              readOnly={sessionComplete}
              style={sessionComplete ? { cursor: 'not-allowed', opacity: 0.8 } : undefined}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!inputValue.trim() || isTyping || sessionComplete}
              style={sessionComplete ? { cursor: 'not-allowed', opacity: 0.8 } : undefined}
            >
              Send
            </button>
          </form>
        </div>
      )}

      {phase === 'session' && showEditorInSession && (
        <SessionPlayground
          code={userCode}
          onCodeChange={setUserCode}
          onCopySuccess={() => { }}
          onRunError={() => { }}
        />
      )}

      {phase === 'assignment' && assignments.length === 0 && (
        <div
          className="assignment-empty-tasks"
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 24px',
            minHeight: 0,
            textAlign: 'center',
            backgroundColor: '#fafafa',
            fontFamily: 'var(--sara-font)'
          }}
        >
          <div
            style={{
              maxWidth: 440,
              backgroundColor: '#fff',
              border: '1px solid #e5e7eb',
              borderRadius: 12,
              padding: '32px 28px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.06)'
            }}
          >
            <h2 style={{ margin: '0 0 12px', fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>
              No tasks to practice
            </h2>
            <p style={{ margin: '0 0 8px', fontSize: '0.9375rem', color: '#4b5563', lineHeight: 1.6 }}>
              This topic doesn&apos;t include any coding assignments yet. You can move on to the next topic and
              start its learning session.
            </p>
            <p style={{ margin: '0 0 24px', fontSize: '0.8125rem', color: '#9ca3af' }}>
              If you&apos;re already on the last topic in your course, you&apos;ll return to the dashboard.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
              <button
                type="button"
                onClick={() => goToNextTopicSession()}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#10a37f',
                  color: '#fff',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: '0.9375rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontFamily: 'var(--sara-font)'
                }}
              >
                Continue to next topic
              </button>
              <button
                type="button"
                onClick={() => navigate(`/learn/${topicId}`)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#fff',
                  color: '#374151',
                  border: '1px solid #d1d5db',
                  borderRadius: 8,
                  fontSize: '0.9375rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'var(--sara-font)'
                }}
              >
                Back to session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assignment Phase - Same Structure as Playground */}
      {phase === 'assignment' && assignments.length > 0 && (
        <div className="playground-main-content" style={{
          flex: 1,
          display: 'flex',
          flexDirection: isDesktop ? 'row' : 'column',
          height: '100%',
          minHeight: 0,
          overflow: 'hidden'
        }}>
          {/* Editor Panel */}
          <div className="playground-editor-panel" style={{
            ...(isDesktop ? {
              width: `${editorWidth}%`,
              height: '100%',
              minWidth: '300px'
            } : {
              height: `${editorHeight}%`,
              minHeight: '200px'
            }),
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
          }}>
            {/* Editor Header - inline styles so they apply on Vercel */}
            <div className="playground-editor-header" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              minHeight: 52,
              backgroundColor: '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              fontSize: '0.875rem',
              color: '#6b7280',
              boxSizing: 'border-box'
            }}>
              {/* File Tab */}
              <div className="assignment-js-tab" style={{
                padding: '6px 12px',
                height: 32,
                minHeight: 32,
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '4px 4px 0 0',
                borderBottom: '2px solid #10a37f',
                color: '#111827',
                fontWeight: '500',
                fontSize: '0.875rem',
                fontFamily: 'var(--sara-font)',
                boxSizing: 'border-box'
              }}>
                assignment.js
              </div>

              {/* Action Buttons */}
              <div className="playground-header-actions" style={{
                display: 'flex',
                gap: '8px',
                alignItems: 'center'
              }}>
                <button
                  onClick={handleRunAssignment}
                  className="playground-run-btn"
                  style={{
                    height: 32,
                    minHeight: 32,
                    padding: '0 12px',
                    backgroundColor: assignmentCode.trim() ? '#10a37f' : '#d1d5db',
                    color: assignmentCode.trim() ? 'white' : '#9ca3af',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    fontFamily: 'var(--sara-font)',
                    cursor: assignmentCode.trim() ? 'pointer' : 'not-allowed',
                    transition: 'all 0.2s ease',
                    boxShadow: assignmentCode.trim() ? '0 1px 3px rgba(0, 0, 0, 0.1)' : 'none',
                    minWidth: '60px',
                    boxSizing: 'border-box'
                  }}
                  title="Run Code (Ctrl+Enter)"
                >
                  Run
                </button>
                <button
                  onClick={handleSubmitAssignment}
                  disabled={submitLoading}
                  className="playground-reset-btn"
                  style={{
                    height: 32,
                    minHeight: 32,
                    padding: '0 12px',
                    backgroundColor: submitLoading ? '#9ca3af' : '#6b7280',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    fontFamily: 'var(--sara-font)',
                    cursor: submitLoading ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    minWidth: '72px',
                    boxSizing: 'border-box'
                  }}
                  title="Run tests and save progress when all pass"
                >
                  Test
                </button>
                <button
                  onClick={handleReviewAssignment}
                  className="playground-review-btn"
                  style={{
                    height: 32,
                    minHeight: 32,
                    padding: '0 12px',
                    backgroundColor: '#059669',
                    color: 'white',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    fontFamily: 'var(--sara-font)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                    minWidth: '72px',
                    boxSizing: 'border-box'
                  }}
                  title="Show dev style solution"
                >
                  Dev style solution
                </button>
              </div>
            </div>

            {/* Editor Content */}
            <div style={{
              flex: 1,
              minHeight: '300px',
              display: 'flex',
              backgroundColor: '#ffffff',
              border: '1px solid #e5e7eb',
              borderRadius: '6px',
              overflow: 'hidden'
            }}>
              {/* Line Numbers - match code editor black background */}
              <div className="playground-line-numbers" style={{
                width: '32px',
                minWidth: '32px',
                backgroundColor: '#0d1117',
                borderRight: '1px solid #30363d',
                padding: '16px 4px',
                fontSize: '0.875rem',
                color: '#8b949e',
                fontFamily: 'Monaco, Consolas, "SF Mono", "Courier New", monospace',
                lineHeight: '1.4',
                textAlign: 'right',
                userSelect: 'none',
                overflow: 'hidden',
                flexShrink: 0,
                position: 'relative'
              }}>
                {assignmentCode.split('\n').map((_, index) => (
                  <div key={index} style={{
                    lineHeight: '1.4',
                    fontSize: '0.875rem'
                  }}>
                    {index + 1}
                  </div>
                ))}
              </div>

              {/* Code Textarea with syntax highlight overlay (colors only, same layout) */}
              <SyntaxHighlightedTextarea
                ref={assignmentTextareaRef}
                className="playground-textarea"
                value={assignmentCode}
                onBeforeInput={handleAssignmentBeforeInput}
                onChange={(e) => {
                  const newVal = e.target.value
                  const oldVal = assignmentCode
                  if (newVal.length === oldVal.length + 1) {
                    const AUTO_CLOSE_PAIRS = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' }
                    let insertIndex = -1
                    let insertedChar = ''
                    for (let i = 0; i < newVal.length; i++) {
                      if (oldVal === newVal.slice(0, i) + newVal.slice(i + 1)) {
                        insertIndex = i
                        insertedChar = newVal[i]
                        break
                      }
                    }
                    if (insertIndex !== -1 && AUTO_CLOSE_PAIRS[insertedChar]) {
                      if (['"', "'", '`'].includes(insertedChar) && newVal[insertIndex + 1] === insertedChar) {
                        setAssignmentCode(newVal)
                        requestAnimationFrame(() => {
                          const ta = assignmentTextareaRef.current
                          if (ta) { ta.selectionStart = ta.selectionEnd = insertIndex + 1 }
                        })
                        return
                      }
                      const closeChar = AUTO_CLOSE_PAIRS[insertedChar]
                      const finalVal = newVal.slice(0, insertIndex + 1) + closeChar + newVal.slice(insertIndex + 1)
                      setAssignmentCode(finalVal)
                      requestAnimationFrame(() => {
                        const ta = assignmentTextareaRef.current
                        if (ta) { ta.focus(); ta.selectionStart = ta.selectionEnd = insertIndex + 1 }
                      })
                      return
                    }
                  }
                  setAssignmentCode(newVal)
                }}
                onScroll={(e) => {
                  const lineNumbers = e.target.parentElement?.querySelector('.playground-line-numbers')
                  if (lineNumbers) lineNumbers.scrollTop = e.target.scrollTop
                }}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRunAssignment()
                    return
                  }
                  if (e.key === 'Tab') {
                    e.preventDefault()
                    const textarea = e.target
                    const start = textarea.selectionStart
                    const end = textarea.selectionEnd
                    const value = textarea.value
                    const newValue = value.substring(0, start) + '    ' + value.substring(end)
                    setAssignmentCode(newValue)
                    setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 4 }, 0)
                  }
                  const autoClosingPairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' }
                  if (autoClosingPairs[e.key]) {
                    const textarea = e.target
                    const start = textarea.selectionStart
                    const end = textarea.selectionEnd
                    const value = textarea.value
                    const selectedText = value.substring(start, end)
                    const nextChar = value.charAt(start)
                    if (['"', "'", '`'].includes(e.key)) {
                      if (nextChar === e.key) {
                        e.preventDefault()
                        setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1 }, 0)
                        return
                      }
                      const beforeCursor = value.substring(0, start)
                      const quoteCount = (beforeCursor.match(new RegExp('\\' + e.key, 'g')) || []).length
                      if (quoteCount % 2 === 1) return
                    }
                    e.preventDefault()
                    const openChar = e.key
                    const closeChar = autoClosingPairs[e.key]
                    if (selectedText) {
                      const newValue = value.substring(0, start) + openChar + selectedText + closeChar + value.substring(end)
                      setAssignmentCode(newValue)
                      setTimeout(() => { textarea.selectionStart = start + 1; textarea.selectionEnd = start + 1 + selectedText.length }, 0)
                    } else {
                      const newValue = value.substring(0, start) + openChar + closeChar + value.substring(start)
                      setAssignmentCode(newValue)
                      setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1 }, 0)
                    }
                  }
                  if ([')', ']', '}'].includes(e.key)) {
                    const textarea = e.target
                    const start = textarea.selectionStart
                    const value = textarea.value
                    if (value.charAt(start) === e.key) {
                      e.preventDefault()
                      setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1 }, 0)
                    }
                  }
                  if (e.key === 'Backspace') {
                    const textarea = e.target
                    const start = textarea.selectionStart
                    const end = textarea.selectionEnd
                    const value = textarea.value
                    if (start === end) {
                      const beforeCursor = value.substring(0, start)
                      const currentLineStart = beforeCursor.lastIndexOf('\n') + 1
                      const currentLine = beforeCursor.substring(currentLineStart)
                      const isAtIndentEnd = /^\s+$/.test(currentLine) && currentLine.length > 0
                      const hasEnoughSpaces = currentLine.length >= 4 && currentLine.endsWith('    ')
                      if (isAtIndentEnd && hasEnoughSpaces) {
                        e.preventDefault()
                        setAssignmentCode(value.substring(0, start - 4) + value.substring(start))
                        setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start - 4 }, 0)
                      }
                    }
                  }
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    const textarea = e.target
                    const start = textarea.selectionStart
                    const value = textarea.value
                    const beforeCursor = value.substring(0, start)
                    const currentLineStart = beforeCursor.lastIndexOf('\n') + 1
                    const currentLine = beforeCursor.substring(currentLineStart)
                    const currentIndent = currentLine.match(/^(\s*)/)[1]
                    let newIndent = currentIndent
                    if (currentLine.trim().endsWith('{') ||
                      currentLine.trim().match(/\b(if|else|for|while|do|switch|case|function|try|catch|finally)\s*\([^)]*\)\s*$/) ||
                      currentLine.trim().match(/\b(else|try|finally)\s*$/) ||
                      currentLine.trim().match(/\bcase\s+.+:\s*$/) ||
                      currentLine.trim().match(/\bdefault\s*:\s*$/)) {
                      newIndent += '    '
                    }
                    const afterCursor = value.substring(start)
                    const nextChar = afterCursor.charAt(0)
                    if (nextChar === '}') {
                      const reducedIndent = newIndent.length >= 4 ? newIndent.substring(4) : ''
                      const newValue = value.substring(0, start) + '\n' + newIndent + '\n' + reducedIndent + value.substring(start)
                      setAssignmentCode(newValue)
                      setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1 + newIndent.length }, 0)
                    } else {
                      const newValue = value.substring(0, start) + '\n' + newIndent + value.substring(start)
                      setAssignmentCode(newValue)
                      setTimeout(() => { textarea.selectionStart = textarea.selectionEnd = start + 1 + newIndent.length }, 0)
                    }
                  }
                }}
                placeholder="// Write your assignment code here..."
                spellCheck={false}
              />
            </div>
          </div>

          {/* Resizable Splitter */}
          <div
            className="playground-splitter"
            style={{
              ...(isDesktop ? {
                width: '8px',
                height: '100%',
                cursor: 'col-resize'
              } : {
                height: '8px',
                width: '100%',
                cursor: 'row-resize'
              }),
              backgroundColor: isDragging ? '#e5e7eb' : 'transparent',
              position: 'relative',
              flexShrink: 0,
              transition: isDragging ? 'none' : 'background-color 0.2s ease'
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              ...(isDesktop ? {
                width: '2px',
                height: '40px'
              } : {
                width: '40px',
                height: '2px'
              }),
              backgroundColor: '#9ca3af',
              borderRadius: '1px',
              opacity: isDragging ? 1 : 0.5
            }} />
          </div>

          {/* Terminal Panel */}
          <div className="playground-output-panel" style={{
            ...(isDesktop ? {
              width: `${100 - editorWidth}%`,
              height: '100%',
              minWidth: '200px'
            } : {
              height: `${100 - editorHeight}%`,
              minHeight: '100px'
            }),
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: '#ffffff',
            overflow: 'hidden'
          }}>
            {/* Terminal Header - inline styles so they apply on Vercel */}
            <div className="playground-output-header" style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '10px 14px',
              minHeight: 52,
              backgroundColor: '#f9fafb',
              borderBottom: '1px solid #e5e7eb',
              fontSize: '0.875rem',
              color: '#6b7280',
              boxSizing: 'border-box'
            }}>
              <div style={{
                padding: '6px 12px',
                height: 32,
                minHeight: 32,
                display: 'inline-flex',
                alignItems: 'center',
                backgroundColor: '#ffffff',
                borderRadius: '4px 4px 0 0',
                fontSize: '0.875rem',
                fontWeight: '500',
                color: '#111827',
                border: '1px solid #e5e7eb',
                borderBottom: '2px solid #10a37f',
                marginBottom: -1,
                fontFamily: 'var(--sara-font)',
                boxSizing: 'border-box'
              }}>
                {assignmentReview ? 'Dev style solution' : 'Test Results'}
              </div>
            </div>

            {/* Run = terminal. Test = document (test results only). Review = document (review only). */}
            {(() => {
              const testResults = assignmentTestResults ?? assignmentTestResultsRef.current
              const hasTestResults = testResults && Array.isArray(testResults) && testResults.length > 0
              const showReviewOnly = !!assignmentReview
              const isDocumentMode = hasTestResults || showReviewOnly

              if (isDocumentMode) {
                const isTestResultsView = !showReviewOnly
                return (
                  <div
                    id="assignment-output"
                    className="assignment-review-panel"
                    style={{
                      flex: 1,
                      overflow: 'auto',
                      minHeight: 0,
                      backgroundColor: isTestResultsView ? '#0d1117' : '#fafafa',
                      border: isTestResultsView ? '1px solid #30363d' : '1px solid #e5e7eb',
                      borderTop: 'none',
                      padding: '20px 24px',
                      fontSize: '0.9375rem',
                      lineHeight: 1.6,
                      color: isTestResultsView ? '#e2e8f0' : '#374151',
                      fontFamily: 'var(--sara-font)'
                    }}
                  >
                    <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                      {showReviewOnly ? (
                        <div className="message-text" style={{ color: '#374151', fontSize: '0.9375rem', lineHeight: 1.7, fontFamily: 'var(--sara-font)' }}>
                          <AssignmentReviewMarkdown text={assignmentReview} />
                        </div>
                      ) : (
                        <>
                          <div style={{ color: '#8b949e', marginBottom: '16px', fontSize: '0.8125rem' }}>
                            {testResults.filter(r => r.passed).length}/{testResults.length} passed
                          </div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            {testResults.map((t, i) => {
                              const inputEntries = formatTestInput(t.input)
                              const expectedStr = String(t.expected ?? '')
                              const actualStr = String(t.actual ?? '')
                              return (
                                <div key={i} style={{
                                  display: 'grid',
                                  gridTemplateColumns: '24px 1fr',
                                  gap: '8px 12px',
                                  alignItems: 'start',
                                  padding: '12px 14px',
                                  backgroundColor: '#161b22',
                                  border: '1px solid #30363d',
                                  borderRadius: '6px',
                                  fontSize: '0.8125rem'
                                }}>
                                  <span style={{ color: t.passed ? '#3fb950' : '#f85149', fontWeight: 600 }}>{t.passed ? '✅' : '❌'}</span>
                                  <div style={{ minWidth: 0 }}>
                                    {inputEntries && inputEntries.length > 0 && (
                                      <div style={{ color: '#8b949e', marginBottom: '8px' }}>
                                        <div style={{ marginBottom: '4px', fontWeight: 600, color: '#c9d1d9' }}>Input</div>
                                        <div style={{ marginLeft: '8px', fontFamily: 'Monaco, Consolas, monospace', color: '#e2e8f0', whiteSpace: 'pre-wrap' }}>
                                          {inputEntries.map(({ key, value }, j) => (
                                            <div key={j}>{key ? `${key}: ${value}` : value}</div>
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                    <div style={{ marginBottom: '6px' }}>
                                      <div style={{ fontWeight: 600, color: '#8b949e', marginBottom: '2px' }}>Expected</div>
                                      <div style={{ color: '#e2e8f0', fontFamily: 'Monaco, Consolas, monospace', whiteSpace: 'pre-wrap' }}>{expectedStr || '\u00A0'}</div>
                                    </div>
                                    <div>
                                      <div style={{ fontWeight: 600, color: '#8b949e', marginBottom: '2px' }}>Actual</div>
                                      <div style={{ color: t.passed ? '#3fb950' : '#f85149', fontFamily: 'Monaco, Consolas, monospace', whiteSpace: 'pre-wrap' }}>{actualStr || '\u00A0'}</div>
                                    </div>
                                    {!t.passed && t.error && <div style={{ color: '#f85149', marginTop: '8px', fontSize: '0.8125rem' }}>{t.error}</div>}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )
              }

              const outputLines = (assignmentOutput || '').split('\n')
              const isError = assignmentOutput && (assignmentOutput.startsWith('Error:') || assignmentOutput.includes('[FAIL]'))
              const lineHeightPx = 22
              const padV = 16
              const padH = 12
              return (
                <div style={{ flex: 1, display: 'flex', minHeight: 0, backgroundColor: '#0d1117', border: '1px solid #30363d', borderTop: 'none' }}>
                  <div
                    className="assignment-terminal-line-numbers"
                    style={{
                      width: '32px',
                      minWidth: '32px',
                      backgroundColor: '#0d1117',
                      borderRight: '1px solid #30363d',
                      padding: `${padV}px 4px`,
                      fontSize: '0.8125rem',
                      color: '#8b949e',
                      fontFamily: 'Monaco, Consolas, monospace',
                      lineHeight: `${lineHeightPx}px`,
                      textAlign: 'right',
                      userSelect: 'none',
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    {outputLines.map((_, i) => (
                      <div key={i} style={{ height: lineHeightPx, lineHeight: `${lineHeightPx}px` }}>{i + 1}</div>
                    ))}
                    {outputLines.length === 0 && <div style={{ height: lineHeightPx, lineHeight: `${lineHeightPx}px` }}>1</div>}
                  </div>
                  <div
                    id="assignment-output"
                    className="playground-output"
                    onScroll={(e) => {
                      const ln = e.target.parentElement.querySelector('.assignment-terminal-line-numbers')
                      if (ln) ln.scrollTop = e.target.scrollTop
                    }}
                    style={{
                      flex: 1,
                      padding: `${padV}px ${padH}px`,
                      backgroundColor: '#0d1117',
                      color: isError ? '#ff7b72' : '#7ee787',
                      fontFamily: 'Monaco, Consolas, monospace',
                      fontSize: '0.875rem',
                      lineHeight: `${lineHeightPx}px`,
                      overflow: 'auto',
                      minHeight: 0
                    }}
                  >
                    {assignmentOutput ? (
                      outputLines.map((line, i) => (
                        <div key={i} style={{ minHeight: lineHeightPx, lineHeight: `${lineHeightPx}px`, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
                          {line || ' '}
                        </div>
                      ))
                    ) : (
                      <span style={{ fontStyle: 'italic', color: '#8b949e' }}>Click &quot;Run&quot; to test your assignment code</span>
                    )}
                  </div>
                </div>
              )
            })()}
          </div>
        </div>
      )}

      <ToastContainer toasts={toasts} />
    </div>
  )
}

export default Learn