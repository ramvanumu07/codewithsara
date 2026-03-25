import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { EditorView } from '@codemirror/view'
import '../styles/playgroundAlignment.css'

/** Matches playground / assignment terminal panel (SyntaxHighlightedTextarea.css, Learn.css) */
const TERMINAL_BG = '#0d1117'

/**
 * Controlled CodeMirror 6 editor — placeholder is ghost text only (never part of `value`).
 */
export default function CodeEditor({
  value,
  onChange,
  height = '100%',
  readOnly = false,
  placeholder = ''
}) {
  const extensions = useMemo(
    () => [
      javascript(),
      EditorView.theme(
        {
          '&': {
            height: '100%',
            backgroundColor: TERMINAL_BG,
            fontSize: '14px'
          },
          '.cm-editor': { height: '100%', backgroundColor: TERMINAL_BG },
          '.cm-scroller': {
            overflow: 'auto',
            overflowX: 'auto',
            overflowY: 'auto',
            backgroundColor: TERMINAL_BG
          },
          '.cm-gutter.cm-foldGutter': {
            width: 'var(--sara-gutter-fold, 18px)',
            minWidth: 'var(--sara-gutter-fold, 18px)',
            maxWidth: 'var(--sara-gutter-fold, 18px)',
            flexShrink: 0,
            boxSizing: 'border-box'
          },
          '.cm-gutter.cm-lineNumbers': {
            width: 'var(--sara-gutter-line-numbers, 44px)',
            minWidth: 'var(--sara-gutter-line-numbers, 44px)',
            maxWidth: 'var(--sara-gutter-line-numbers, 44px)',
            flexShrink: 0,
            boxSizing: 'border-box'
          },
          '.cm-content': {
            padding: 'var(--sara-content-padding-x, 16px)',
            fontFamily: "'Monaco', 'Consolas', 'SF Mono', 'Courier New', monospace",
            fontSize: '14px',
            lineHeight: 1.45,
            caretColor: '#ffffff'
          },
          '.cm-gutters': {
            backgroundColor: TERMINAL_BG,
            borderRight: '1px solid #30363d',
            color: '#8b949e'
          },
          '.cm-activeLineGutter': { backgroundColor: '#161b22' },
          '.cm-lineNumbers .cm-gutterElement': { padding: '0 6px 0 10px', minWidth: '28px', boxSizing: 'border-box' }
        },
        { dark: true }
      )
    ],
    []
  )

  return (
    <div
      style={{
        height,
        width: '100%',
        minHeight: 0,
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        backgroundColor: TERMINAL_BG
      }}
    >
      <CodeMirror
        value={value ?? ''}
        height="100%"
        theme={oneDark}
        extensions={extensions}
        onChange={onChange}
        readOnly={readOnly}
        placeholder={placeholder}
        basicSetup={{
          lineNumbers: true,
          highlightActiveLine: true,
          highlightActiveLineGutter: true,
          foldGutter: true,
          dropCursor: true,
          allowMultipleSelections: true,
          indentOnInput: true,
          bracketMatching: true,
          closeBrackets: true,
          autocompletion: false,
          highlightSelectionMatches: false,
          rectangularSelection: true,
          crosshairCursor: false,
          searchKeymap: true,
          foldKeymap: true,
          completionKeymap: false,
          lintKeymap: false,
          tabSize: 2
        }}
        style={{ height: '100%', fontSize: '14px' }}
      />
    </div>
  )
}
