import React, { useRef, useEffect } from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import './SyntaxHighlightedTextarea.css'

/**
 * A textarea with syntax-highlighted code visible behind it (same layout, colors only).
 * Keeps all textarea behavior; only adds a Prism highlight layer behind transparent text.
 */
const SyntaxHighlightedTextarea = React.forwardRef(function SyntaxHighlightedTextarea(
  { value = '', onChange, onScroll, className = '', style = {}, ...rest },
  ref
) {
  const highlightScrollRef = useRef(null)

  const syncScroll = (e) => {
    const hl = highlightScrollRef.current
    if (hl && e.target) {
      hl.scrollTop = e.target.scrollTop
      hl.scrollLeft = e.target.scrollLeft
    }
    onScroll?.(e)
  }

  const textareaStyle = {
    flex: 1,
    border: 'none',
    outline: 'none',
    resize: 'none',
    padding: '16px',
    fontSize: '0.875rem',
    fontFamily: 'Monaco, Consolas, "SF Mono", "Courier New", monospace',
    lineHeight: '1.4',
    overflow: 'auto',
    whiteSpace: 'pre',
    tabSize: 4,
    backgroundColor: 'transparent',
    color: 'transparent',
    caretColor: '#ffffff',
    position: 'relative',
    zIndex: 1,
    ...style
  }

  return (
    <div className="syntax-highlight-textarea-wrapper" style={{ position: 'relative', flex: 1, minHeight: 0, overflow: 'hidden', display: 'flex' }}>
      {/* Highlight layer (behind, same size; scroll synced from textarea) */}
      <div
        ref={highlightScrollRef}
        className="syntax-highlight-textarea-layer"
        style={{ position: 'absolute', inset: 0, overflow: 'auto', pointerEvents: 'none' }}
        aria-hidden
      >
        <Highlight theme={themes.vsDark} code={value || ''} language="javascript">
          {({ className: innerClassName, tokens, getLineProps, getTokenProps }) => (
            <pre className={`syntax-highlight-editor-pre ${innerClassName}`.trim()}>
              <code>
                {tokens.map((line, i) => (
                  <div key={i} {...getLineProps({ line })}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </div>
                ))}
              </code>
            </pre>
          )}
        </Highlight>
      </div>
      <textarea
        ref={ref}
        className={className}
        value={value}
        onChange={onChange}
        onScroll={syncScroll}
        style={textareaStyle}
        spellCheck={false}
        {...rest}
      />
    </div>
  )
})

export default SyntaxHighlightedTextarea
