import React from 'react'
import { Highlight, themes } from 'prism-react-renderer'
import { styleForPrismToken } from './prismTokenColors.js'
import './SyntaxHighlightedCode.css'

/**
 * Renders a code string with syntax highlighting.
 * Token colors are applied via inline `style` from prismTokenColors.js so production (Netlify)
 * matches localhost and is not affected by CSS load order or `code { color: inherit }` rules.
 * Theme is still used for Prism grammar + any non-color props (e.g. empty-line layout).
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
      {({ className: innerClassName, style: preThemeStyle, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`syntax-highlight-pre ${innerClassName} ${preClassName}`.trim()}
          style={{
            ...(preThemeStyle && typeof preThemeStyle === 'object' ? preThemeStyle : {}),
            backgroundColor: '#1e293b',
            color: '#e2e8f0'
          }}
        >
          <code>
            {tokens.map((line, i) => {
              const lineProps = getLineProps({ line })
              return (
                <div key={i} {...lineProps}>
                  {line.map((token, key) => {
                    const tokenProps = getTokenProps({ token })
                    const { style: themeTokenStyle, children, ...tokenRest } = tokenProps
                    const colorStyle = styleForPrismToken(token)
                    return (
                      <span
                        key={key}
                        {...tokenRest}
                        style={{
                          ...(themeTokenStyle && typeof themeTokenStyle === 'object' ? themeTokenStyle : {}),
                          ...colorStyle
                        }}
                      >
                        {children}
                      </span>
                    )
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
