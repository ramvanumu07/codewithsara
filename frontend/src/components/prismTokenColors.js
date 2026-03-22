/**
 * Explicit colors per Prism token type (javascript + common).
 * Applied as inline styles so fenced blocks look the same in dev and production (no CSS order / inherit fights).
 */
export const PRISM_TOKEN_COLORS = {
  plain: '#e2e8f0',
  comment: '#6b7280',
  prolog: '#6b7280',
  doctype: '#6b7280',
  cdata: '#6b7280',
  punctuation: '#e2e8f0',
  property: '#93c5fd',
  tag: '#f472b6',
  boolean: '#c084fc',
  number: '#fbbf24',
  constant: '#fbbf24',
  symbol: '#fbbf24',
  deleted: '#fca5a5',
  selector: '#86efac',
  'attr-name': '#93c5fd',
  string: '#86efac',
  char: '#86efac',
  builtin: '#38bdf8',
  inserted: '#86efac',
  operator: '#e2e8f0',
  entity: '#e2e8f0',
  url: '#86efac',
  variable: '#e2e8f0',
  atrule: '#c084fc',
  'attr-value': '#86efac',
  function: '#38bdf8',
  'class-name': '#38bdf8',
  keyword: '#c084fc',
  regex: '#f472b6',
  important: '#c084fc',
  bold: '#e2e8f0',
  italic: '#e2e8f0',
  namespace: '#c084fc',
  parameter: '#e2e8f0'
}

/**
 * @param {{ types?: string[] }} token
 * @returns {{ color: string }}
 */
export function styleForPrismToken(token) {
  const types = Array.isArray(token?.types) ? token.types : []
  for (const t of types) {
    if (t === 'plain') continue
    const c = PRISM_TOKEN_COLORS[t]
    if (c) return { color: c }
  }
  return { color: PRISM_TOKEN_COLORS.plain }
}
