import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import './SyntaxHighlightedCode.css'

/**
 * Renders a code string with syntax highlighting (keywords, strings, etc.).
 * Used in message markdown, notes, and assignment review so code blocks look like real editors.
 */
export default function SyntaxHighlightedCode({ code, language = 'javascript', className = '', preClassName = '' }) {
  if (!code || typeof code !== 'string') {
    return (
      <pre className={`syntax-highlight-pre ${preClassName}`.trim()}>
        <code />
      </pre>
    )
  }

  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ className: innerClassName, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={`syntax-highlight-pre ${innerClassName} ${preClassName}`.trim()} style={style}>
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
  )
}
