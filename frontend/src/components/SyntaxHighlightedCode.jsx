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

  // Theme is only for Prism tokenization; we do not apply theme inline styles on <pre> or
  // tokens. Colors come from SyntaxHighlightedCode.css (.token.*) so dev and production
  // (e.g. Netlify) match and are not affected by CSP or cascade differences with inline styles.
  return (
    <Highlight theme={themes.vsDark} code={code.trim()} language={language}>
      {({ className: innerClassName, tokens, getLineProps, getTokenProps }) => (
        <pre className={`syntax-highlight-pre ${innerClassName} ${preClassName}`.trim()}>
          <code>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line })
              const { style: _ls, ...lineRest } = lineProps
              return (
                <div key={i} {...lineRest}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token })
                    const { style: _ts, ...tokenRest } = tokenProps
                    return <span key={key} {...tokenRest} />
                  })}
                </div>
              )
            })}
          </code>
        </pre>
      )}
    </Highlight>
  )
}
