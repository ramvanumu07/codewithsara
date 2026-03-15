import { useMemo, useRef, useEffect } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { keymap } from '@codemirror/view'

/**
 * Inline CodeMirror with syntax highlighting only (no header).
 * Use in assignment panel and playground; Ctrl/Cmd+Enter calls onRun when provided.
 */
export default function CodeEditorInline({ value, onChange, onRun, placeholder, height = '100%' }) {
  const onRunRef = useRef(onRun)
  onRunRef.current = onRun

  const runKeymap = useMemo(
    () =>
      keymap.of([
        {
          key: 'Mod-Enter',
          run: () => {
            onRunRef.current?.()
            return true
          }
        }
      ]),
    []
  )

  const extensions = useMemo(
    () => [javascript({ jsx: true }), ...(onRun ? [runKeymap] : [])],
    [onRun, runKeymap]
  )

  return (
    <CodeMirror
      value={value ?? ''}
      height={height}
      theme={oneDark}
      extensions={extensions}
      onChange={onChange}
      placeholder={placeholder}
      basicSetup={{
        lineNumbers: true,
        highlightActiveLineGutter: true,
        highlightActiveLine: true,
        indentOnInput: true,
        bracketMatching: true,
        closeBrackets: true,
        tabSize: 2,
        foldGutter: false,
        autocompletion: false,
        completionKeymap: false,
        lintKeymap: false
      }}
      style={{ fontSize: '0.875rem' }}
    />
  )
}
