import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { learning, chat, handleApiError } from '../config/api'
import EditorToggle from '../components/EditorToggle'
import SessionPlayground from '../components/SessionPlayground'
import CodeExecutor from '../services/CodeExecutor'
import { useToast } from '../hooks/useToast'
import { ToastContainer } from '../components/Toast'
import { copyToClipboard } from '../utils/copyToClipboard'
import SyntaxHighlightedCode from '../components/SyntaxHighlightedCode'
import CodeEditor from '../components/CodeEditor'
import { formatTerminalRunResult } from '../lib/formatTerminalOutput'
import { logGroqDebugFromApi } from '../utils/groqDebug'
import './Learn.css'
import './Learn-responsive.css'
import '../styles/playgroundTerminalAlign.css'

const SESSION_COMPLETE_REASON = 'Session completed. You can view the conversation but cannot send new messages.'

/** Shown when user tries to skip ahead without finishing the current coding task */
const ASSIGNMENT_GATE_MODAL_MESSAGE =
  'Complete this assignment first: pass every test case for this task. After that, you can continue to the next practice exercise or the next topic.'

/** Sara UI accent — editor action buttons + tabs */
const SARA_GREEN = '#10a37f'
const SARA_GREEN_DISABLED_BG = '#d1d5db'
const SARA_GREEN_DISABLED_FG = '#9ca3af'
const SARA_GREEN_MUTED = '#94a3b8'

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

/** react-markdown v9+ does not pass `inline`; fenced blocks use className like language-javascript */
function isMarkdownFencedCodeClass(className) {
  const s = Array.isArray(className) ? className.filter(Boolean).join(' ') : className
  return typeof s === 'string' && /language-[\w-]+/.test(s)
}

function markdownCodeClassName(className) {
  if (Array.isArray(className)) return className.filter(Boolean).join(' ') || undefined
  return className
}

/** ~20ms per character (18–22ms range) */
const TYPEWRITER_MS = 20

/**
 * Shared markdown component map for chat. When plainFencedCode is true, fenced blocks use plain pre/code
 * (used while typewriter is in progress); when false, SyntaxHighlightedCode runs after typing completes.
 */
function buildMarkdownComponents ({ copiedId, setCopiedId, blockIdRef, onCopy, plainFencedCode }) {
  return {
    p: ({ children }) => <p>{children}</p>,
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    ul: ({ children }) => <ul>{children}</ul>,
    ol: ({ children }) => <ol>{children}</ol>,
    li: ({ children }) => <li>{children}</li>,
    h1: ({ children }) => <h1>{children}</h1>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    code: ({ className, children, ...props }) => {
      const cn = markdownCodeClassName(className)
      if (isMarkdownFencedCodeClass(className)) {
        return (
          <code className={cn} {...props}>
            {children}
          </code>
        )
      }
      return (
        <code className={`message-markdown__inline-code${cn ? ` ${cn}` : ''}`.trim()} {...props}>
          {children}
        </code>
      )
    },
    pre: ({ node, children }) => {
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
          {plainFencedCode ? (
            <pre className="message-markdown__code-block message-markdown__code-block--plain">
              <code>{code}</code>
            </pre>
          ) : (
            <SyntaxHighlightedCode code={code} preClassName="message-markdown__code-block" />
          )}
        </div>
      )
    }
  }
}

/**
 * Session assistant message: typewriter reveal + cursor; syntax highlight only after typing completes.
 */
function AssistantMessageWithTypewriter ({ fullContent, onTypingChunk, onTypingComplete }) {
  const [displayed, setDisplayed] = useState('')
  const [typingDone, setTypingDone] = useState(false)
  const [copiedId, setCopiedId] = useState(null)
  const blockIdRef = useRef(0)
  const intervalRef = useRef(null)
  const fullRef = useRef(undefined)
  const indexRef = useRef(0)

  const onCopy = (id, code) => {
    copyToClipboard(code).then((ok) => {
      if (ok) {
        setCopiedId(id)
        setTimeout(() => setCopiedId(null), 2000)
      }
    })
  }

  const plainFenced = !typingDone
  const mdComponents = useMemo(
    () => buildMarkdownComponents({ copiedId, setCopiedId, blockIdRef, onCopy, plainFencedCode: plainFenced }),
    [copiedId, plainFenced]
  )

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const runTypewriter = (full) => {
    indexRef.current = 0
    clearTimer()
    if (!full || full.length === 0) {
      setDisplayed('')
      setTypingDone(true)
      onTypingComplete?.()
      return
    }
    intervalRef.current = setInterval(() => {
      indexRef.current += 1
      const slice = full.slice(0, indexRef.current)
      setDisplayed(slice)
      if (indexRef.current === 1) onTypingChunk?.()
      if (indexRef.current >= full.length) {
        clearTimer()
        setTypingDone(true)
        onTypingComplete?.()
      }
    }, TYPEWRITER_MS)
  }

  useEffect(() => {
    const next = typeof fullContent === 'string' ? fullContent : ''
    const prev = fullRef.current
    fullRef.current = next
    clearTimer()

    const midAnimation =
      typeof prev === 'string' &&
      prev.length > 0 &&
      indexRef.current > 0 &&
      indexRef.current < prev.length

    if (prev !== next && midAnimation) {
      setDisplayed(prev)
      setTypingDone(true)
      queueMicrotask(() => {
        indexRef.current = 0
        setDisplayed('')
        setTypingDone(false)
        runTypewriter(next)
      })
      return () => clearTimer()
    }

    indexRef.current = 0
    setDisplayed('')
    setTypingDone(false)
    if (!next) {
      onTypingComplete?.()
      return () => clearTimer()
    }
    runTypewriter(next)
    return () => clearTimer()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- tick only when fullContent changes; callbacks are stable
  }, [fullContent])

  blockIdRef.current = 0
  const showDots = !typingDone && displayed.length === 0
  const showCursor = !typingDone && displayed.length > 0

  return (
    <div className="message-content message-content--plain" style={{ minWidth: 0, maxWidth: '100%' }}>
      <div className="message-text">
        {showDots ? (
          <div className="typing-dots" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        ) : (
          <div className="message-markdown message-markdown--typewriter">
            <ReactMarkdown key={typingDone ? 'md-done' : 'md-typing'} components={mdComponents}>
              {displayed.trim()}
            </ReactMarkdown>
            {showCursor && (
              <span className="message-typewriter-cursor" aria-hidden>
                |
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

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

  const mdComponents = useMemo(
    () => buildMarkdownComponents({ copiedId, setCopiedId, blockIdRef, onCopy, plainFencedCode: false }),
    [copiedId]
  )

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

/** Reference solution panel: Markdown + copy icon on code blocks (same as chat messages). */
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
    code: ({ className, children, ...props }) => {
      const cn = markdownCodeClassName(className)
      return isMarkdownFencedCodeClass(className) ? (
        <code className={cn} {...props}>
          {children}
        </code>
      ) : (
        <code className={`message-markdown__inline-code${cn ? ` ${cn}` : ''}`.trim()} {...props}>
          {children}
        </code>
      )
    },
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
  /** Dashboard notes/code shortcuts: never persist progress or start paid session flows */
  const referenceBrowse = searchParams.get('ref') === '1'
  const [topic, setTopic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  /** HTTP status from last failed topic load (for copy: 404 vs network vs server) */
  const [loadErrorStatus, setLoadErrorStatus] = useState(null)
  const [courseLocked, setCourseLocked] = useState(false)
  const [lockedCourseId, setLockedCourseId] = useState(null)

  // Session phase states
  const [messages, setMessages] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  /** True while the last assistant message is typewriting (including before first character). Disables input. */
  const [assistantTyping, setAssistantTyping] = useState(false)
  /** Only the assistant message with this timestamp uses typewriter; cleared when user sends or history loads. */
  const [typewriterAssistantTimestamp, setTypewriterAssistantTimestamp] = useState(null)
  const [typewriterScrollTick, setTypewriterScrollTick] = useState(0)
  const [sessionComplete, setSessionComplete] = useState(false)
  const messagesEndRef = useRef(null)
  const messagesScrollContainerRef = useRef(null)
  const lastMessageRef = useRef(null)
  const stickToBottomRef = useRef(true)
  // Prevent double sessionChat('') from React StrictMode / effect re-run (race causes different AI responses, then visibilitychange overwrites UI)
  const sessionStartInProgressRef = useRef(null)

  const bumpTypewriterScroll = useCallback(() => {
    setTypewriterScrollTick((t) => t + 1)
  }, [])

  const handleAssistantTypingDone = useCallback(() => {
    setAssistantTyping(false)
  }, [])

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
  const dragCleanupRef = useRef(null)

  // Assignment phase states
  const [assignments, setAssignments] = useState([])
  const [currentAssignment, setCurrentAssignment] = useState(0)
  const [assignmentCode, setAssignmentCode] = useState('')
  const [assignmentOutput, setAssignmentOutput] = useState('')
  const [assignmentTestResults, setAssignmentTestResults] = useState(null) // [{ passed, expected, actual, error, input }]
  const assignmentTestResultsRef = useRef(null) // persist so test block stays visible when AI review is shown
  const [assignmentReview, setAssignmentReview] = useState('')
  const [assignmentsCompletedCount, setAssignmentsCompletedCount] = useState(0)
  /** Mirrors assignmentsCompletedCount but updated synchronously so Next works immediately after Test (state updates are async). */
  const assignmentsCompletedCountRef = useRef(0)
  const [showIncompleteModal, setShowIncompleteModal] = useState(false)
  const [incompleteModalMessage, setIncompleteModalMessage] = useState('')
  const [submitLoading, setSubmitLoading] = useState(false)

  const assignmentTerminalTitle = useMemo(() => {
    if (assignmentReview) return 'Reference solution'
    const tr = assignmentTestResults ?? assignmentTestResultsRef.current
    if (tr && Array.isArray(tr) && tr.length > 0) return 'Test results'
    return 'Output'
  }, [assignmentReview, assignmentTestResults])

  const assignmentActionBtnBase = {
    height: 32,
    minHeight: 32,
    padding: '0 12px',
    border: 'none',
    borderRadius: '6px',
    fontSize: '0.875rem',
    fontWeight: '500',
    fontFamily: 'var(--sara-font)',
    transition: 'all 0.2s ease',
    boxSizing: 'border-box',
    boxShadow: '0 1px 3px rgba(16, 163, 127, 0.22)'
  }

  // Track whether user is near the bottom; only auto-scroll while "stuck" to bottom
  useEffect(() => {
    if (phase !== 'session') return
    const el = messagesScrollContainerRef.current
    if (!el) return
    const threshold = 80
    const onScroll = () => {
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < threshold
      stickToBottomRef.current = nearBottom
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [phase])

  // Scroll so newest message is at top of view (user scrolls up to read previous)
  useEffect(() => {
    if (phase !== 'session') return
    if (!stickToBottomRef.current) return
    const el = lastMessageRef.current
    const container = messagesScrollContainerRef.current
    if (!el || !container) return
    const raf = requestAnimationFrame(() => {
      container.scrollTop = el.offsetTop
    })
    return () => cancelAnimationFrame(raf)
  }, [messages, isTyping, assistantTyping, phase, typewriterScrollTick])

  // Handle window resize for responsive layout
  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    return () => { dragCleanupRef.current?.() }
  }, [])

  // Load topic and initialize based on phase
  useEffect(() => {
    const requestedTopicId = topicId
    const loadTopic = async () => {
      try {
        setLoading(true)
        setError(null)
        setLoadErrorStatus(null)
        setCourseLocked(false)
        setLockedCourseId(null)
        // Avoid flashing another topic's assignments before this topic's payload arrives (SPA navigation)
        if (phase === 'assignment') {
          setAssignments([])
        }

        const topicResponse = await learning.getTopic(requestedTopicId, {
          referenceOnly: referenceBrowse,
          phase
        })

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
        // Reference browse + session without notes → notes-only (avoids POST /chat/session which upserts progress)
        if (referenceBrowse && phase === 'session' && !viewIsNotes) {
          navigate(`/learn/${requestedTopicId}?view=notes&ref=1`, { replace: true })
          return
        }

        if (viewIsNotes) {
          setLoading(false)
          return
        }

        if (phase === 'session' && !referenceBrowse) {
          // Load chat history (use requestedTopicId for the topic we're showing)
          try {
            const historyResponse = await chat.getHistory(requestedTopicId)

            if (topicIdRef.current !== requestedTopicId) return

            if (historyResponse.data.data.messages && historyResponse.data.data.messages.length > 0) {
              setTypewriterAssistantTimestamp(null)
              setAssistantTyping(false)
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
                logGroqDebugFromApi(data)
                if (data?.response != null) {
                  const apiMessages = data.messages
                  if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
                    const mapped = apiMessages.map(m => ({ role: m.role, content: (m.content || '').trim(), timestamp: m.timestamp || new Date().toISOString() }))
                    setMessages(mapped)
                    const last = mapped[mapped.length - 1]
                    if (last?.role === 'assistant') {
                      setTypewriterAssistantTimestamp(last.timestamp)
                      setAssistantTyping(true)
                    }
                  } else {
                    const ts = new Date().toISOString()
                    setMessages([{ role: 'assistant', content: data.response, timestamp: ts }])
                    setTypewriterAssistantTimestamp(ts)
                    setAssistantTyping(true)
                  }
                  if (data.sessionComplete || data.response?.includes('ready for the playground') || data.response?.includes('Congratulations')) {
                    setSessionComplete(true)
                  }
                } else {
                  const ts = new Date().toISOString()
                  setMessages([{ role: 'assistant', content: data?.message || 'No response from AI. Please try again.', timestamp: ts }])
                  setTypewriterAssistantTimestamp(ts)
                  setAssistantTyping(true)
                }
              } catch (err) {
                const msg = handleApiError(err, 'Sorry, Sara could not respond. Please try again.')
                const ts = new Date().toISOString()
                setMessages([{ role: 'assistant', content: msg, timestamp: ts }])
                setTypewriterAssistantTimestamp(ts)
                setAssistantTyping(true)
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
                logGroqDebugFromApi(data)
                if (data?.response != null) {
                  const apiMessages = data.messages
                  if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
                    const mapped = apiMessages.map(m => ({ role: m.role, content: (m.content || '').trim(), timestamp: m.timestamp || new Date().toISOString() }))
                    setMessages(mapped)
                    const last = mapped[mapped.length - 1]
                    if (last?.role === 'assistant') {
                      setTypewriterAssistantTimestamp(last.timestamp)
                      setAssistantTyping(true)
                    }
                  } else {
                    const ts = new Date().toISOString()
                    setMessages([{ role: 'assistant', content: data.response, timestamp: ts }])
                    setTypewriterAssistantTimestamp(ts)
                    setAssistantTyping(true)
                  }
                  if (data.sessionComplete || data.response?.includes('ready for the playground') || data.response?.includes('Congratulations')) {
                    setSessionComplete(true)
                  }
                } else {
                  const ts = new Date().toISOString()
                  setMessages([{ role: 'assistant', content: data?.message || 'No response from AI. Please try again.', timestamp: ts }])
                  setTypewriterAssistantTimestamp(ts)
                  setAssistantTyping(true)
                }
              } catch (err) {
                const msg = handleApiError(err, 'Sorry, Sara could not respond. Please try again.')
                const ts = new Date().toISOString()
                setMessages([{ role: 'assistant', content: msg, timestamp: ts }])
                setTypewriterAssistantTimestamp(ts)
                setAssistantTyping(true)
              } finally {
                sessionStartInProgressRef.current = null
              }
            } catch (startError) {
              setError(handleApiError(startError, 'Failed to initialize chat session. Please try again.'))
              sessionStartInProgressRef.current = null
            }
          }
        } else if (phase === 'assignment') {
          // Load assignments from topic data; resume at next task or start from 1st
          const assignmentsList = topicResponse.data.data.topic.tasks || []
          setAssignments(assignmentsList)
          const topicCompleted = topicData?.topic_completed === true
          const assignmentsCompleted = topicData?.assignments_completed ?? 0
          assignmentsCompletedCountRef.current = assignmentsCompleted
          setAssignmentsCompletedCount(assignmentsCompleted)
          // current_task is 1-based (next task number); convert to 0-based index for assignments array
          const currentTaskOneBased = topicData?.current_task ?? 1
          const currentTaskIndex = Math.max(0, currentTaskOneBased - 1)
          // If coming from "assignment icon" on completed topic, or start=1, show 1st task
          const startIndex = (startFromFirst || topicCompleted) ? 0 : Math.min(currentTaskIndex, Math.max(0, assignmentsList.length - 1))
          setCurrentAssignment(startIndex)
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
          setLoadErrorStatus(null)
        } else {
          setLoadErrorStatus(typeof status === 'number' ? status : null)
          setError(handleApiError(err, 'Failed to load topic. Please try again.'))
        }
      } finally {
        if (topicIdRef.current === requestedTopicId) setLoading(false)
      }
    }

    if (topicId) {
      loadTopic()
    }
  }, [topicId, phase, startFromFirst, searchParams, referenceBrowse, navigate])

  // When user returns to the tab, refetch chat history so we show DB truth (not stale in-memory state from another tab)
  useEffect(() => {
    const handleVisibility = async () => {
      if (referenceBrowse || document.visibilityState !== 'visible' || phase !== 'session' || !topicId) return
      try {
        const historyResponse = await chat.getHistory(topicId)
        if (topicIdRef.current !== topicId) return
        if (historyResponse?.data?.data?.messages?.length > 0) {
          setTypewriterAssistantTimestamp(null)
          setAssistantTyping(false)
          setMessages(historyResponse.data.data.messages)
        }
      } catch (_) { /* ignore */ }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [topicId, phase, referenceBrowse])

  // Handle sending messages in session phase (no new messages once session is completed)
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (referenceBrowse) return
    if (sessionComplete) {
      showInfo(SESSION_COMPLETE_REASON, 4000)
      return
    }
    if (!inputValue.trim() || isTyping || assistantTyping) return

    const userMessage = {
      role: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    }

    stickToBottomRef.current = true
    setTypewriterAssistantTimestamp(null)
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
        logGroqDebugFromApi(data)
        if (data && 'response' in data) {
          // Use full messages from API when available (keeps UI in sync with Neon DB)
          const apiMessages = data.messages
          if (apiMessages && Array.isArray(apiMessages) && apiMessages.length > 0) {
            const mapped = apiMessages.map(m => ({
              role: m.role,
              content: (m.content || '').trim(),
              timestamp: m.timestamp || new Date().toISOString()
            }))
            setMessages(mapped)
            const last = mapped[mapped.length - 1]
            if (last?.role === 'assistant') {
              setTypewriterAssistantTimestamp(last.timestamp)
              setAssistantTyping(true)
            }
          } else {
            const content = (data.response ?? '').trim() || 'The AI returned an empty response. Please try again.'
            const ts = new Date().toISOString()
            setMessages(prev => {
              const withoutPlaceholder = prev.slice(0, -1)
              return [...withoutPlaceholder, { role: 'assistant', content, timestamp: ts }]
            })
            setTypewriterAssistantTimestamp(ts)
            setAssistantTyping(true)
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
        setTypewriterAssistantTimestamp(null)
        setAssistantTyping(false)
        setSessionComplete(true)
        showInfo(SESSION_COMPLETE_REASON, 4000)
        return
      }
      const actualError = handleApiError(err, 'Something went wrong. Please try again.')
      const errTs = new Date().toISOString()
      const errorMessage = {
        role: 'assistant',
        content: actualError,
        timestamp: errTs
      }
      setMessages(prev => {
        const last = prev[prev.length - 1]
        if (last?.role === 'assistant' && last?.content === '') {
          return [...prev.slice(0, -1), errorMessage]
        }
        return [...prev, errorMessage]
      })
      setTypewriterAssistantTimestamp(errTs)
      setAssistantTyping(true)
    } finally {
      setIsTyping(false)
    }
  }

  const escapeHtmlLearn = (text) => {
    const div = document.createElement('div')
    div.textContent = text
    return div.innerHTML
  }

  const handleRunPlayground = async () => {
    const outputDiv = document.getElementById('terminal-output')
    if (!outputDiv) return

    try {
      outputDiv.innerHTML = '<div class="terminal-run-line" style="color: #10a37f; font-family: Monaco, Consolas, monospace; padding: 8px;">Executing code securely...</div>'

      const result = await CodeExecutor.executeForTesting(
        userCode,
        [],
        null,
        'script'
      )

      const { text: outputText, isError } = formatTerminalRunResult(result)
      const outputColor = isError ? '#ef4444' : '#10a37f'

      const outputLines = outputText.split('\n')

      const lineNumbersDiv = outputDiv.parentElement?.querySelector('.terminal-line-numbers')
      if (lineNumbersDiv) {
        let lineNumbersHTML = ''
        outputLines.forEach((_, index) => {
          lineNumbersHTML += `<div class="terminal-run-line" style="color: #6b7280; text-align: right; padding-right: 6px;">${index + 1}</div>`
        })
        lineNumbersDiv.innerHTML = lineNumbersHTML
      }

      let formattedOutput = ''
      outputLines.forEach((line) => {
        const color = line.includes('Error:') ? '#ef4444' :
          line.includes('Warning') ? '#f59e0b' :
            line.includes('Execution completed') ? '#10a37f' : outputColor
        formattedOutput += `<div class="terminal-run-line" style="color: ${color}; white-space: pre; padding-left: 2px;">${escapeHtmlLearn(line) || ' '}</div>`
      })

      outputDiv.innerHTML = `
        <div class="terminal-output-block" style="font-family: Monaco, Consolas, 'SF Mono', 'Courier New', monospace;">
          ${formattedOutput}
        </div>
      `

      setPlaygroundOutput(outputText)
    } catch (error) {
      const errorDiv = `<div style="color: #ef4444; font-family: Monaco, Consolas, monospace; padding: 16px;">Error: ${escapeHtmlLearn(error.message)}</div>`
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
        dragCleanupRef.current = null
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      dragCleanupRef.current = () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp) }
    } else {
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
        dragCleanupRef.current = null
      }

      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      dragCleanupRef.current = () => { document.removeEventListener('mousemove', handleMouseMove); document.removeEventListener('mouseup', handleMouseUp) }
    }
  }

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
        dragCleanupRef.current = null
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      dragCleanupRef.current = () => { document.removeEventListener('touchmove', handleTouchMove); document.removeEventListener('touchend', handleTouchEnd) }
    } else {
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
        dragCleanupRef.current = null
      }

      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
      dragCleanupRef.current = () => { document.removeEventListener('touchmove', handleTouchMove); document.removeEventListener('touchend', handleTouchEnd) }
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

  /** Load task `index` into the editor (shared by Next/Back and save-rollback). */
  const applyAssignmentIndex = (index) => {
    if (index < 0 || index >= assignments.length) return
    const a = assignments[index]
    setCurrentAssignment(index)
    const description = a.description || 'Complete the assignment below'
    let codeWithComments = (description.startsWith('//') || description.startsWith('/*'))
      ? `${description}\n`
      : `// ${description}\n`
    if (a.requirements && a.requirements.length > 0) {
      a.requirements.forEach(req => {
        codeWithComments += req.startsWith('//') ? `${req}\n` : `// ${req}\n`
      })
    }
    if (a.solution_type !== 'function') {
      codeWithComments = codeWithComments.replace(/\n+$/, '').replace(/\n\n+/g, '\n') + `\n// START YOUR CODE AFTER THIS LINE. DO NOT REMOVE THIS LINE\n`
    }
    codeWithComments += a.starter_code || ''
    setAssignmentCode(codeWithComments)
    setAssignmentOutput('')
    assignmentTestResultsRef.current = null
    setAssignmentTestResults(null)
    setAssignmentReview('')
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

      // 1b. Persist progress (dashboard icons with ref=1: practice only — do not write DB)
      if (referenceBrowse) {
        setAssignmentOutput((prev) =>
          (prev ? `${prev}\n` : '') + 'Practice mode — progress is not saved (reference from dashboard).'
        )
      } else {
        const savedIdx = currentAssignment
        let bumpedProgress = false
        try {
          // Bump before await so Next works immediately; saving still runs in the background
          if (savedIdx === assignmentsCompletedCountRef.current) {
            assignmentsCompletedCountRef.current += 1
            setAssignmentsCompletedCount(assignmentsCompletedCountRef.current)
            bumpedProgress = true
          }
          await learning.completeAssignment(topicId, savedIdx, assignmentCode)
        } catch (completeErr) {
          if (bumpedProgress) {
            assignmentsCompletedCountRef.current -= 1
            setAssignmentsCompletedCount(assignmentsCompletedCountRef.current)
            applyAssignmentIndex(savedIdx)
          }
          setAssignmentOutput((prev) => (prev ? `${prev}\n(Progress could not be saved: ${completeErr?.response?.data?.message || completeErr.message})` : `Progress could not be saved: ${completeErr?.response?.data?.message || completeErr.message}`))
        }
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

  // Reference solution from curriculum (reference_solution)
  const handleReviewAssignment = () => {
    const currentTask = assignments[currentAssignment]
    if (!currentTask) return
    const refSol = currentTask.reference_solution
    if (refSol && typeof refSol === 'string') {
      setAssignmentReview('```javascript\n' + refSol.trim() + '\n```')
    } else {
      setAssignmentReview('No reference solution is available for this assignment.')
    }
  }

  const handleNext = async () => {
    if (assignments.length === 0) {
      await goToNextTopicSession()
      return
    }
    // Forward (next assignment or next topic): require current task completed; use ref so Next works right after Test (state lags one render)
    if (!referenceBrowse && assignmentsCompletedCountRef.current <= currentAssignment) {
      setIncompleteModalMessage(ASSIGNMENT_GATE_MODAL_MESSAGE)
      setShowIncompleteModal(true)
      return
    }
    if (currentAssignment < assignments.length - 1) {
      applyAssignmentIndex(currentAssignment + 1)
    } else {
      // Last assignment — next topic
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

  /** Open topic notes (not session chat) when leaving assignments for the same topic */
  const navigateToTopicNotes = () => {
    const q = new URLSearchParams()
    q.set('view', 'notes')
    if (searchParams.get('ref') === '1') q.set('ref', '1')
    navigate(`/learn/${topicId}?${q.toString()}`)
  }

  // Back in assignment: previous assignment, or topic notes (not chat) if on 1st
  const handleAssignmentBack = () => {
    if (assignments.length === 0) {
      navigateToTopicNotes()
      return
    }
    if (currentAssignment > 0) {
      applyAssignmentIndex(currentAssignment - 1)
    } else {
      navigateToTopicNotes()
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
      maxHeight: '100dvh',
      height: '100dvh',
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
    const isNotFound = loadErrorStatus === 404
    const title = isNotFound ? 'Topic not found' : "Couldn't load this topic"
    const blurb = isNotFound
      ? "This topic doesn't exist or may have been removed from the course."
      : 'Something went wrong while loading. You can retry or go back to your dashboard.'
    return (
      <div className="error-container" style={{ padding: 40, textAlign: 'center', maxWidth: 480, margin: '40px auto' }}>
        <h2 style={{ color: '#dc2626', marginBottom: '8px' }}>{title}</h2>
        <p style={{ color: '#6b7280', marginBottom: '16px' }}>{blurb}</p>
        {error && (
          <p style={{ color: '#9ca3af', fontSize: '0.8125rem', marginBottom: '20px' }}>{error}</p>
        )}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, justifyContent: 'center' }}>
          {!isNotFound && (
            <button
              type="button"
              onClick={() => window.location.reload()}
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
              Try again
            </button>
          )}
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            style={{
              padding: '12px 24px',
              backgroundColor: isNotFound ? '#10a37f' : 'transparent',
              color: isNotFound ? 'white' : '#059669',
              border: isNotFound ? 'none' : '1px solid #10a37f',
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

  if (!topic) {
    return (
      <div style={{
        minHeight: '100dvh',
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
      code: ({ className, children, ...props }) => {
        const cn = markdownCodeClassName(className)
        const fence = cn ? /language-(\w+)/.exec(cn) : null
        if (!fence) {
          return (
            <code className={`message-markdown__inline-code${cn ? ` ${cn}` : ''}`.trim()} {...props}>
              {children}
            </code>
          )
        }
        const raw =
          typeof children === 'string' ? children : String(React.Children.toArray(children).join(''))
        return (
          <SyntaxHighlightedCode
            code={raw.replace(/\n$/, '')}
            language={fence[1] === 'js' ? 'javascript' : fence[1]}
            preClassName="notes-code-block"
          />
        )
      },
      pre: ({ children }) => {
        const childArray = React.Children.toArray(children)
        if (childArray.length === 1 && childArray[0]?.type === 'pre') return <>{childArray[0]}</>
        return children
      },
      p: ({ children }) => <p>{children}</p>,
      h2: ({ children }) => <h2>{children}</h2>,
      h3: ({ children }) => <h3>{children}</h3>,
      ul: ({ children }) => <ul>{children}</ul>,
      li: ({ children }) => <li>{children}</li>
    }
    return (
      <div className="learn-container topic-notes-view" style={{ display: 'flex', flexDirection: 'column' }}>
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
              padding: '20px 20px 36px',
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
      {/* Modal: complete current assignment before next assignment */}
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
              {incompleteModalMessage || ASSIGNMENT_GATE_MODAL_MESSAGE}
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
                  title={currentAssignment > 0 ? 'Previous assignment' : 'Back to topic notes'}
                  aria-label={currentAssignment > 0 ? 'Previous assignment' : 'Back to topic notes'}
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
            {messages.map((message, index) => {
              const useTypewriter =
                message.role === 'assistant' &&
                index === messages.length - 1 &&
                message.timestamp === typewriterAssistantTimestamp &&
                typeof message.content === 'string' &&
                message.content.length > 0
              return (
                <div
                  key={`${index}-${message.timestamp || ''}`}
                  ref={index === messages.length - 1 && !isTyping ? lastMessageRef : null}
                  className={`message-row message-row--${message.role}`}
                  style={{ justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start' }}
                >
                  {useTypewriter ? (
                    <AssistantMessageWithTypewriter
                      fullContent={message.content}
                      onTypingChunk={bumpTypewriterScroll}
                      onTypingComplete={handleAssistantTypingDone}
                    />
                  ) : (
                    <MessageContent content={message.content} role={message.role} />
                  )}
                </div>
              )
            })}

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
              disabled={isTyping || assistantTyping || sessionComplete}
              readOnly={sessionComplete}
              style={sessionComplete ? { cursor: 'not-allowed', opacity: 0.8 } : undefined}
            />
            <button
              type="submit"
              className="send-btn"
              disabled={!inputValue.trim() || isTyping || assistantTyping || sessionComplete}
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
              No coding tasks
            </h2>
            <p style={{ margin: '0 0 24px', fontSize: '0.9375rem', color: '#4b5563', lineHeight: 1.6 }}>
              This topic doesn&apos;t include coding practice tasks.
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
                onClick={navigateToTopicNotes}
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
                Back to topic notes
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
                  type="button"
                  onClick={handleRunAssignment}
                  className="playground-run-btn assignment-action-btn"
                  style={{
                    ...assignmentActionBtnBase,
                    minWidth: 60,
                    backgroundColor: assignmentCode.trim() ? SARA_GREEN : SARA_GREEN_DISABLED_BG,
                    color: assignmentCode.trim() ? '#fff' : SARA_GREEN_DISABLED_FG,
                    cursor: assignmentCode.trim() ? 'pointer' : 'not-allowed',
                    boxShadow: assignmentCode.trim() ? assignmentActionBtnBase.boxShadow : 'none'
                  }}
                  title="Run code (Ctrl+Enter)"
                >
                  Run
                </button>
                <button
                  type="button"
                  onClick={handleSubmitAssignment}
                  disabled={submitLoading}
                  className="playground-reset-btn assignment-action-btn"
                  style={{
                    ...assignmentActionBtnBase,
                    minWidth: 72,
                    backgroundColor: submitLoading ? SARA_GREEN_MUTED : SARA_GREEN,
                    color: '#fff',
                    cursor: submitLoading ? 'not-allowed' : 'pointer',
                    opacity: submitLoading ? 0.92 : 1
                  }}
                  title="Run tests and save progress when all pass"
                >
                  Test
                </button>
                <button
                  type="button"
                  onClick={handleReviewAssignment}
                  className="playground-review-btn assignment-action-btn"
                  style={{
                    ...assignmentActionBtnBase,
                    minWidth: 72,
                    backgroundColor: SARA_GREEN,
                    color: '#fff',
                    cursor: 'pointer'
                  }}
                  title="Show reference solution for this task"
                >
                  Solution
                </button>
              </div>
            </div>

            {/* Editor Content — data attr lets scroll handler find line gutter (sibling of textarea wrapper) */}
            <div
              data-playground-editor-row
              className="playground-code-metrics"
              style={{
                flex: 1,
                minHeight: '300px',
                display: 'flex',
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '6px',
                overflow: 'hidden'
              }}
            >
              <div
                style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}
                onKeyDown={(e) => {
                  if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                    e.preventDefault()
                    e.stopPropagation()
                    handleRunAssignment()
                  }
                }}
              >
                <CodeEditor
                  value={assignmentCode}
                  onChange={setAssignmentCode}
                  height="100%"
                  readOnly={false}
                  foldGutter={false}
                />
              </div>
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
                {assignmentTerminalTitle}
              </div>
            </div>

            {/* Run = terminal (Output). Test = structured test results. Solution = reference markdown. */}
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
              return (
                <div data-playground-terminal-row className="playground-code-metrics" style={{ flex: 1, display: 'flex', minHeight: 0, backgroundColor: '#0d1117', border: '1px solid #30363d', borderTop: 'none' }}>
                  <div className="assignment-terminal-line-numbers assignment-terminal-gutter">
                    {outputLines.map((_, i) => (
                      <div key={i} className="assignment-terminal-gutter-row">{i + 1}</div>
                    ))}
                    {outputLines.length === 0 && <div className="assignment-terminal-gutter-row">1</div>}
                  </div>
                  <pre
                    id="assignment-output"
                    className="playground-output assignment-terminal-scroll"
                    onScroll={(e) => {
                      const ln = e.target.parentElement?.querySelector('.assignment-terminal-line-numbers')
                      if (ln) ln.scrollTop = e.target.scrollTop
                    }}
                    style={{
                      flex: 1,
                      margin: 0,
                      backgroundColor: '#0d1117',
                      color: isError ? '#ff7b72' : '#7ee787',
                      fontFamily: 'Monaco, Consolas, monospace',
                      whiteSpace: 'pre',
                      overflowX: 'auto',
                      overflowY: 'auto',
                      wordBreak: 'normal',
                      wordWrap: 'normal',
                      minHeight: 0,
                      boxSizing: 'border-box'
                    }}
                  >
                    {assignmentOutput ? (
                      assignmentOutput
                    ) : (
                      <span style={{ fontStyle: 'italic', color: '#8b949e' }}>Click &quot;Run&quot; to test your assignment code</span>
                    )}
                  </pre>
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