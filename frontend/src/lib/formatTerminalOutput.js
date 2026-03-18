/**
 * Single message when Run succeeds but nothing was printed (no console.log, etc.).
 * Use everywhere we show playground / assignment terminal output after a successful run.
 */
export const TERMINAL_NO_OUTPUT_MESSAGE = 'Code executed (no output)'

/**
 * @param {{ success: boolean, results?: Array<{ error?: string, output?: string, result?: string }>, error?: string }} result
 * @returns {{ text: string, isError: boolean }}
 */
export function formatTerminalRunResult(result) {
  if (!result) {
    return { text: 'Error: No result', isError: true }
  }
  if (!result.success) {
    const msg =
      result.error ||
      result.results?.find((r) => r?.error)?.error ||
      'Code execution failed'
    return { text: `Error: ${msg}`, isError: true }
  }
  const rows = result.results || []
  if (rows.length === 0) {
    return { text: TERMINAL_NO_OUTPUT_MESSAGE, isError: false }
  }
  const lines = rows.map((r) => {
    if (r?.error) return `Error: ${r.error}`
    return r.output ?? r.result ?? ''
  })
  const joined = lines.join('\n').trim()
  return {
    text: joined === '' ? TERMINAL_NO_OUTPUT_MESSAGE : joined,
    isError: false
  }
}
