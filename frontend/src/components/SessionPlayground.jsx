/**
 * Full session playground: same layout and features as Learn session editor.
 * - Resizable splitter (desktop: side-by-side, mobile: stacked)
 * - CodeMirror 6 editor; formatted terminal output with error styling
 * - Run via CodeExecutor, Copy with optional toast
 */
import React, { useState, useRef, useEffect } from 'react'
import CodeExecutor from '../services/CodeExecutor'
import { copyToClipboard } from '../utils/copyToClipboard'
import { formatTerminalRunResult } from '../lib/formatTerminalOutput'
import CodeEditor from './CodeEditor'
import '../styles/playgroundAlignment.css'

const OUTPUT_PRE_STYLE =
  'white-space: pre; overflow-x: auto; overflow-y: auto; word-break: normal; word-wrap: normal; margin: 0; font-family: Monaco, Consolas, "SF Mono", "Courier New", monospace; background: #0d1117; min-height: 100%; box-sizing: border-box;'

export default function SessionPlayground({
  code,
  onCodeChange,
  placeholder = 'Practice what you learned in the session — try out the concepts here!',
  onCopySuccess,
  onRunError
}) {
  const terminalOutputRef = useRef(null)
  const [editorHeight, setEditorHeight] = useState(60)
  const [editorWidth, setEditorWidth] = useState(60)
  const [isDesktop, setIsDesktop] = useState(typeof window !== 'undefined' && window.innerWidth >= 768)
  const [isDragging, setIsDragging] = useState(false)
  const [copyButtonLabel, setCopyButtonLabel] = useState('Copy')
  const resetCode = () => {
    if (onCodeChange) onCodeChange('')
    setCopyButtonLabel('Copy')
  }

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Reset "Copied!" back to "Copy" when code changes
  useEffect(() => {
    setCopyButtonLabel('Copy')
  }, [code])

  const runPlayground = async () => {
    const outputDiv = terminalOutputRef.current
    if (!outputDiv || !code?.trim()) return
    try {
      // Pre-run syntax check: show syntax errors in terminal (engine would throw same error)
      try {
        new Function(code)
      } catch (parseErr) {
        if (parseErr instanceof SyntaxError) {
          const lineNumDiv = outputDiv.parentElement?.querySelector('.terminal-line-numbers')
          if (lineNumDiv) lineNumDiv.innerHTML = '<div class="terminal-run-line" style="color: #8b949e; text-align: right; padding-right: 6px;">1</div>'
          outputDiv.innerHTML = `<pre class="sara-playground-terminal-pre" style="${OUTPUT_PRE_STYLE} color: #ff7b72;"><span style="color: #ff7b72;">Syntax error: ${escapeHtml(parseErr.message)}</span></pre>`
          if (onRunError) onRunError(parseErr.message)
          return
        }
        throw parseErr
      }

      outputDiv.innerHTML = `<pre class="sara-playground-terminal-pre" style="${OUTPUT_PRE_STYLE} color: #7ee787;"><span style="color: #7ee787;">Executing code securely...</span></pre>`
      const lineNumDiv = outputDiv.parentElement?.querySelector('.terminal-line-numbers')
      if (lineNumDiv) lineNumDiv.innerHTML = ''

      const result = await CodeExecutor.executeForTesting(code, [], null, 'script')
      const { text: outputText, isError } = formatTerminalRunResult(result)
      const outputColor = isError ? '#ff7b72' : '#7ee787'

      const outputLines = outputText.split('\n')
      if (lineNumDiv) {
        lineNumDiv.innerHTML = outputLines.map((_, i) =>
          `<div class="terminal-run-line" style="color: #8b949e; text-align: right; padding-right: 6px;">${i + 1}</div>`
        ).join('')
      }
      const formatted = outputLines
        .map((line) => {
          const color = line.includes('Error:')
            ? '#ff7b72'
            : line.includes('Warning')
              ? '#d29922'
              : outputColor
          return `<span style="color: ${color};">${escapeHtml(String(line || ' '))}</span>`
        })
        .join('\n')
      outputDiv.innerHTML = `<pre class="sara-playground-terminal-pre" style="${OUTPUT_PRE_STYLE} color: ${outputColor};">${formatted}</pre>`

      if (!result.success && onRunError) onRunError('Code execution failed. Check the output for details.')
    } catch (err) {
      const msg = err?.message || 'Code execution failed'
      outputDiv.innerHTML = `<pre class="sara-playground-terminal-pre" style="${OUTPUT_PRE_STYLE} color: #ff7b72;"><span style="color: #ff7b72;">Error: ${escapeHtml(msg)}</span></pre>`
      const lineNumDiv = outputDiv.parentElement?.querySelector('.terminal-line-numbers')
      if (lineNumDiv) lineNumDiv.innerHTML = '<div class="terminal-run-line" style="color: #8b949e; text-align: right; padding-right: 6px;">1</div>'
      if (onRunError) onRunError('Code execution failed. Please check your syntax.')
    }
  }

  const copyCode = async () => {
    if (!code?.trim()) return
    const ok = await copyToClipboard(code)
    if (ok) {
      setCopyButtonLabel('Copied!')
      if (onCopySuccess) onCopySuccess()
    } else if (onRunError) {
      onRunError('Copy failed.')
    }
  }

  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsDragging(true)
    const container = e.currentTarget.parentElement
    if (isDesktop) {
      const startX = e.clientX
      const startWidth = editorWidth
      const containerWidth = container.clientWidth
      const handleMouseMove = (ev) => {
        const deltaPercent = ((ev.clientX - startX) / containerWidth) * 100
        setEditorWidth(Math.min(Math.max(startWidth + deltaPercent, 30), 70))
      }
      const handleMouseUp = () => {
        setIsDragging(false)
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    } else {
      const startY = e.clientY
      const startHeight = editorHeight
      const containerHeight = container.clientHeight
      const handleMouseMove = (ev) => {
        const deltaPercent = ((ev.clientY - startY) / containerHeight) * 100
        setEditorHeight(Math.min(Math.max(startHeight + deltaPercent, 30), 70))
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

  const handleTouchStart = (e) => {
    e.preventDefault()
    setIsDragging(true)
    const touch = e.touches[0]
    const container = e.currentTarget.parentElement
    if (isDesktop) {
      const startX = touch.clientX
      const startWidth = editorWidth
      const containerWidth = container.clientWidth
      const handleTouchMove = (ev) => {
        ev.preventDefault()
        const deltaPercent = ((ev.touches[0].clientX - startX) / containerWidth) * 100
        setEditorWidth(Math.min(Math.max(startWidth + deltaPercent, 30), 70))
      }
      const handleTouchEnd = () => {
        setIsDragging(false)
        document.removeEventListener('touchmove', handleTouchMove)
        document.removeEventListener('touchend', handleTouchEnd)
      }
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd)
    } else {
      const startY = touch.clientY
      const startHeight = editorHeight
      const containerHeight = container.clientHeight
      const handleTouchMove = (ev) => {
        ev.preventDefault()
        const deltaPercent = ((ev.touches[0].clientY - startY) / containerHeight) * 100
        setEditorHeight(Math.min(Math.max(startHeight + deltaPercent, 30), 70))
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

  return (
    <div
      className="playground-main-content sara-playground-align"
      style={{
        flex: 1,
        display: 'flex',
        flexDirection: isDesktop ? 'row' : 'column',
        height: '100%',
        minHeight: 0,
        overflow: 'hidden'
      }}
    >
      {/* Editor Panel */}
      <div
        className="playground-editor-panel"
        style={{
          ...(isDesktop ? { width: `${editorWidth}%`, height: '100%', minWidth: '300px' } : { height: `${editorHeight}%`, minHeight: '200px' }),
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <div
          className="playground-editor-header"
          style={{
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
          }}
        >
          <div className="playground-editor-header-tab" style={{ padding: '6px 12px', height: 32, minHeight: 32, display: 'inline-flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '4px 4px 0 0', borderBottom: '2px solid #10a37f', color: '#111827', fontWeight: 500, fontSize: '0.875rem', boxSizing: 'border-box' }}>
            playground.js
          </div>
          <div className="playground-header-actions" style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={runPlayground}
              className="playground-run-btn"
              disabled={!code?.trim()}
              title="Run (Ctrl+Enter)"
              style={{
                height: 32,
                minHeight: 32,
                padding: '0 12px',
                minWidth: 60,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: code?.trim() ? '#10a37f' : '#e5e7eb',
                color: code?.trim() ? 'white' : '#9ca3af',
                border: 'none',
                borderRadius: '6px',
                cursor: code?.trim() ? 'pointer' : 'not-allowed',
                boxSizing: 'border-box',
                fontSize: '0.875rem',
                fontWeight: 600,
                fontFamily: 'var(--sara-font, system-ui, sans-serif)',
                whiteSpace: 'nowrap'
              }}
            >
              Run
            </button>
            <button
              type="button"
              onClick={copyCode}
              className="playground-copy-btn"
              disabled={!code?.trim()}
              title={copyButtonLabel === 'Copied!' ? 'Copied!' : 'Copy code'}
              style={{
                width: 32,
                height: 32,
                minWidth: 32,
                minHeight: 32,
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: copyButtonLabel === 'Copied!' ? '#d1fae5' : '#f3f4f6',
                color: copyButtonLabel === 'Copied!' ? '#059669' : (code?.trim() ? '#374151' : '#9ca3af'),
                border: 'none',
                borderRadius: '6px',
                cursor: code?.trim() ? 'pointer' : 'not-allowed',
                boxSizing: 'border-box'
              }}
            >
              {copyButtonLabel === 'Copied!' ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              )}
            </button>
            <button
              type="button"
              onClick={resetCode}
              className="playground-reset-btn"
              title="Reset (clear code)"
              style={{
                width: 32,
                height: 32,
                minWidth: 32,
                minHeight: 32,
                padding: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f3f4f6',
                color: '#6b7280',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                boxSizing: 'border-box'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            </button>
          </div>
        </div>

        <div
          data-playground-editor-row
          className="playground-code-metrics"
          style={{ flex: 1, minHeight: '300px', display: 'flex', backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '6px', overflow: 'hidden' }}
        >
          <div
            style={{ flex: 1, minWidth: 0, minHeight: 0, display: 'flex', flexDirection: 'column' }}
            onKeyDown={(e) => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault()
                runPlayground()
              }
            }}
          >
            <CodeEditor
              value={code || ''}
              onChange={onCodeChange}
              height="100%"
              placeholder={placeholder}
            />
          </div>
        </div>
      </div>

      {/* Resizable Splitter */}
      <div
        className="playground-splitter"
        style={{
          ...(isDesktop ? { width: '8px', height: '100%', cursor: 'col-resize' } : { height: '8px', width: '100%', cursor: 'row-resize' }),
          backgroundColor: isDragging ? '#e5e7eb' : 'transparent',
          position: 'relative',
          flexShrink: 0,
          transition: isDragging ? 'none' : 'background-color 0.2s ease'
        }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            ...(isDesktop ? { width: '2px', height: '40px' } : { width: '40px', height: '2px' }),
            backgroundColor: '#9ca3af',
            borderRadius: '1px',
            opacity: isDragging ? 1 : 0.5
          }}
        />
      </div>

      {/* Terminal Panel */}
      <div
        className="playground-output-panel"
        style={{
          ...(isDesktop ? { width: `${100 - editorWidth}%`, height: '100%', minWidth: '200px' } : { height: `${100 - editorHeight}%`, minHeight: '100px' }),
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#ffffff',
          overflow: 'hidden'
        }}
      >
        <div
          className="playground-output-header"
          style={{
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
          }}
        >
          <div className="playground-output-header-tab" style={{ padding: '6px 12px', height: 32, minHeight: 32, display: 'inline-flex', alignItems: 'center', backgroundColor: '#ffffff', borderRadius: '4px 4px 0 0', fontSize: '0.875rem', fontWeight: 500, color: '#111827', border: '1px solid #e5e7eb', borderBottom: '2px solid #10a37f', marginBottom: -1, boxSizing: 'border-box' }}>
            Terminal Output
          </div>
        </div>

        <div
          data-playground-terminal-row
          className="playground-code-metrics"
          style={{ flex: 1, backgroundColor: '#0d1117', border: '1px solid #30363d', borderTop: 'none', display: 'flex', minHeight: 0 }}
        >
          <div
            className="terminal-line-numbers sara-playground-terminal-gutter"
            style={{
              backgroundColor: '#0d1117',
              borderRight: '1px solid #30363d',
              color: '#8b949e',
              fontFamily: 'Monaco, Consolas, "SF Mono", "Courier New", monospace',
              textAlign: 'right',
              userSelect: 'none',
              overflow: 'hidden',
              flexShrink: 0
            }}
          />
          <div
            id="terminal-output"
            ref={terminalOutputRef}
            className="playground-output sara-playground-terminal-output"
            onScroll={(e) => {
              const lineNumbers = e.target.parentElement?.querySelector('.terminal-line-numbers')
              if (lineNumbers) lineNumbers.scrollTop = e.target.scrollTop
            }}
            style={{
              flex: 1,
              minWidth: 0,
              backgroundColor: '#0d1117',
              color: '#7ee787',
              fontFamily: 'Monaco, Consolas, "SF Mono", "Courier New", monospace',
              whiteSpace: 'pre',
              overflowX: 'auto',
              overflowY: 'auto',
              wordBreak: 'normal',
              wordWrap: 'normal',
              minHeight: 0,
              boxSizing: 'border-box'
            }}
          >
            <div className="playground-output-hint">
              Click &quot;Run&quot; to execute your code. Syntax errors will appear here when you run invalid code.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function escapeHtml(text) {
  const div = document.createElement('div')
  div.textContent = text
  return div.innerHTML
}
