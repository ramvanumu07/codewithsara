/**
 * Public job opportunities — CSV fetched only from SHEET_CSV_URL (Google Sheet publish URL).
 * GET /jobs-json | GET /jobs-csv — expired rows (valid_until < today) removed on server.
 */

import express from 'express'

const router = express.Router()

/** Lowercase, spaces/hyphens → underscores, strip non [a-z0-9_] so "Company Name" → company_name */
function normalizeHeaderKey (s) {
  return String(s)
    .toLowerCase()
    .trim()
    .replace(/["']/g, '')
    .replace(/[-–—]/g, '_')
    .replace(/\s+/g, '_')
    .replace(/[^a-z0-9_]/g, '')
}

/**
 * Canonical job columns + common Google Sheet header aliases (after normalizeHeaderKey).
 */
const FIELD_ALIASES = {
  company: [
    'company', 'company_name', 'employer', 'organization', 'organisation', 'org',
    'firm', 'employer_name'
  ],
  role: [
    'role', 'job_title', 'title', 'position', 'job', 'internship', 'internship_role',
    'role_name', 'opening'
  ],
  location: [
    'location', 'loc', 'work_location', 'city', 'office', 'site', 'where'
  ],
  skills: [
    'skills', 'skill', 'tech_stack', 'technologies', 'tech', 'requirements'
  ],
  stipend: [
    'stipend', 'stipend_amount', 'salary', 'pay', 'compensation', 'stipend_rs', 'stipend_inr'
  ],
  posted: [
    'posted', 'posted_date', 'date_posted', 'posted_on', 'date'
  ],
  valid_until: [
    'valid_until', 'valid_until_date', 'valid_till', 'expiry', 'deadline', 'apply_by',
    'closes', 'end_date', 'last_date', 'closing_date'
  ],
  apply_link: [
    'apply_link', 'apply', 'link', 'url', 'application_link', 'application_url',
    'apply_here', 'website', 'form_link'
  ]
}

function buildAliasToCanonical () {
  const m = new Map()
  for (const [canonical, list] of Object.entries(FIELD_ALIASES)) {
    for (const a of list) {
      const nk = normalizeHeaderKey(a)
      if (!m.has(nk)) m.set(nk, canonical)
    }
  }
  return m
}

const ALIAS_TO_CANONICAL = buildAliasToCanonical()

function mapRowToCanonical (row) {
  const out = {
    company: '',
    role: '',
    location: '',
    skills: '',
    stipend: '',
    posted: '',
    valid_until: '',
    apply_link: ''
  }
  for (const [key, val] of Object.entries(row)) {
    const nk = normalizeHeaderKey(key)
    const canon = ALIAS_TO_CANONICAL.get(nk)
    if (canon == null) continue
    const cur = String(out[canon] ?? '').trim()
    if (cur) continue
    out[canon] = val == null ? '' : String(val)
  }
  return out
}

/** RFC-style split: delimiter can be comma, semicolon, or tab (Google Sheets often uses `;` in EU locale). */
function parseDelimitedLine (line, delim) {
  const out = []
  let cur = ''
  let inQuotes = false
  for (let i = 0; i < line.length; i++) {
    const c = line[i]
    if (c === '"') {
      if (inQuotes && line[i + 1] === '"') {
        cur += '"'
        i++
      } else {
        inQuotes = !inQuotes
      }
    } else if (c === delim && !inQuotes) {
      out.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  out.push(cur.trim())
  return out
}

function parseCsvLine (line) {
  return parseDelimitedLine(line, ',')
}

/**
 * Pick the separator that yields the most columns on the header line (min 2).
 * If a line has no commas but has semicolons, comma parsing collapses to 1 column — this fixes that.
 */
function detectDelimiter (firstLine) {
  if (!firstLine || !String(firstLine).trim()) return ','
  const comma = parseDelimitedLine(firstLine, ',')
  const semi = parseDelimitedLine(firstLine, ';')
  const tab = parseDelimitedLine(firstLine, '\t')
  const candidates = [
    { d: ',', n: comma.length },
    { d: ';', n: semi.length },
    { d: '\t', n: tab.length }
  ]
  const max = Math.max(...candidates.map((c) => c.n))
  if (max < 2) return ','
  const best = candidates.filter((c) => c.n === max)
  if (best.length === 1) return best[0].d
  const order = [',', '\t', ';']
  for (const ch of order) {
    if (best.some((b) => b.d === ch)) return ch
  }
  return ','
}

/** First row cell values as in the published CSV (before alias mapping). For debug only. */
function rawCsvFirstLineHeaders (text) {
  const t = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  const line = t.split(/\r?\n/)[0] || ''
  const delim = detectDelimiter(line)
  return parseDelimitedLine(line, delim).map((h) => h.replace(/^"|"$/g, '').trim())
}

function parseCsv (text) {
  const rows = []
  let line = ''
  let inQuotes = false
  const t = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  for (let i = 0; i < t.length; i++) {
    const c = t[i]
    if (c === '"') {
      inQuotes = !inQuotes
      line += c
    } else if ((c === '\n' || c === '\r') && !inQuotes) {
      if (c === '\r' && t[i + 1] === '\n') i++
      if (line.length) rows.push(line)
      line = ''
    } else {
      line += c
    }
  }
  if (line.length) rows.push(line)
  if (rows.length === 0) return []
  const delim = detectDelimiter(rows[0])
  const header = parseDelimitedLine(rows[0], delim).map((h) =>
    normalizeHeaderKey(h.replace(/^"|"$/g, '').trim())
  )
  const data = []
  for (let r = 1; r < rows.length; r++) {
    const cells = parseDelimitedLine(rows[r], delim)
    const obj = {}
    header.forEach((key, j) => {
      if (!key) return
      let val = cells[j] ?? ''
      if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1).replace(/""/g, '"')
      obj[key] = val
    })
    data.push(mapRowToCanonical(obj))
  }
  return data
}

function startOfDay (d) {
  const x = new Date(d)
  x.setHours(0, 0, 0, 0)
  return x.getTime()
}

function isExpiredRow (validUntilRaw) {
  if (validUntilRaw == null || String(validUntilRaw).trim() === '') return false
  const d = new Date(String(validUntilRaw).trim())
  if (Number.isNaN(d.getTime())) return false
  const today = new Date()
  return startOfDay(d) < startOfDay(today)
}

function inferLocationType (location) {
  const l = (location || '').toLowerCase()
  if (l.includes('hybrid')) return 'hybrid'
  if (l.includes('remote')) return 'remote'
  return 'in-office'
}

function normalizeRow (row) {
  const company = row.company ?? ''
  const role = row.role ?? ''
  const location = row.location ?? ''
  const skills = row.skills ?? ''
  const stipend = row.stipend ?? ''
  const posted = row.posted ?? ''
  const validUntil = row.valid_until ?? ''
  const applyLink = row.apply_link ?? ''
  return {
    company,
    role,
    location,
    skills,
    stipend,
    posted,
    valid_until: validUntil,
    apply_link: applyLink,
    locationType: inferLocationType(location)
  }
}

function filterActiveRows (rows) {
  return rows
    .filter((row) => !isExpiredRow(row.valid_until))
    .map(normalizeRow)
}

function escapeCsvField (val) {
  const s = String(val ?? '')
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`
  return s
}

function rowsToCsv (rows) {
  const headers = ['company', 'role', 'location', 'skills', 'stipend', 'posted', 'valid_until', 'apply_link']
  const lines = [headers.join(',')]
  for (const r of rows) {
    lines.push(headers.map((h) => escapeCsvField(r[h] ?? '')).join(','))
  }
  return lines.join('\r\n')
}

/**
 * SHEET_CSV_URL is often pasted as the browser "edit" link; that returns HTML, not CSV.
 * Rewrite to Google's CSV export endpoint. `gid` defaults to first tab (0); use `?gid=` or `#gid=` on the edit URL for other tabs.
 */
function normalizeGoogleSheetCsvUrl (raw) {
  const s = String(raw).trim()
  const idMatch = s.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)\b/)
  if (!idMatch) return s
  const id = idMatch[1]
  if (/\/export\?/i.test(s) && /format\s*=\s*csv/i.test(s)) return s
  if (/\/spreadsheets\/d\/[^/]+\/edit/.test(s)) {
    const m = s.match(/[#&?]gid=(\d+)/)
    let out = `https://docs.google.com/spreadsheets/d/${id}/export?format=csv`
    if (m) out += `&gid=${m[1]}`
    return out
  }
  return s
}

const SHEET_FETCH_HEADERS = {
  Accept: 'text/csv,text/plain,*/*',
  'User-Agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

/**
 * Google often returns 400 if `gid` does not match a real tab (defaulting gid=0 was wrong).
 * Retry once without `gid` so the first sheet is used.
 */
async function fetchGoogleSheetCsv (url) {
  let res = await fetch(url, { redirect: 'follow', headers: SHEET_FETCH_HEADERS })
  if (res.ok) return { res, urlUsed: url }
  if (res.status === 400) {
    try {
      const u = new URL(url)
      if (u.searchParams.has('gid')) {
        u.searchParams.delete('gid')
        const retryUrl = u.toString()
        const res2 = await fetch(retryUrl, { redirect: 'follow', headers: SHEET_FETCH_HEADERS })
        if (res2.ok) return { res: res2, urlUsed: retryUrl }
        res = res2
      }
    } catch {
      /* ignore URL parse errors */
    }
  }
  const body = await res.text().catch(() => '')
  const hint = body.slice(0, 280).replace(/\s+/g, ' ').trim()
  const err = new Error(
    hint
      ? `Failed to fetch job sheet: HTTP ${res.status} — ${hint}`
      : `Failed to fetch job sheet: HTTP ${res.status}`
  )
  err.statusCode = 500
  throw err
}

async function fetchSheetJobsRaw () {
  const rawUrl = process.env.SHEET_CSV_URL
  if (!rawUrl || !String(rawUrl).trim()) {
    const err = new Error('SHEET_CSV_URL is not configured on the server')
    err.statusCode = 500
    throw err
  }
  const url = normalizeGoogleSheetCsvUrl(rawUrl)
  let res
  let fetchUrl = url
  try {
    const out = await fetchGoogleSheetCsv(url)
    res = out.res
    fetchUrl = out.urlUsed
  } catch (e) {
    if (e.statusCode) throw e
    const err = new Error(e?.message || 'Failed to fetch job sheet')
    err.statusCode = 500
    throw err
  }
  const text = await res.text()
  let rows
  try {
    rows = parseCsv(text)
  } catch (e) {
    const err = new Error('Failed to parse CSV from sheet')
    err.statusCode = 500
    throw err
  }
  const filtered = filterActiveRows(rows)
  return { text, rows, filtered, httpStatus: res.status, fetchUrl, rawSheetUrl: String(rawUrl).trim() }
}

async function fetchAndParseJobs () {
  const { filtered } = await fetchSheetJobsRaw()
  return filtered
}

function sheetUrlHint (raw, finalUrl) {
  if (String(raw).trim() !== String(finalUrl).trim()) {
    return 'Env URL was rewritten from a Sheet /edit link to CSV export. If the wrong tab loads, add ?gid= or #gid= to the edit URL (see tab link in Google Sheets).'
  }
  if (/\/spreadsheets\/d\/[^/]+\/edit/i.test(raw)) {
    return 'Use a CSV export URL, not the /edit page (or rely on server rewrite).'
  }
  return null
}

function jobsDebugAllowed () {
  if (process.env.NODE_ENV !== 'production') return true
  return String(process.env.DEBUG_JOBS || '').trim() === '1'
}

router.get('/jobs-json', async (req, res) => {
  try {
    const wantDebug =
      jobsDebugAllowed() &&
      (req.query.debug === '1' || req.query.debug === 'true')
    if (wantDebug) {
      const { text, rows, filtered, httpStatus, fetchUrl, rawSheetUrl } = await fetchSheetJobsRaw()
      const expiredCount = rows.filter((row) => isExpiredRow(row.valid_until)).length
      const t0 = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
      const firstLine = (t0.split(/\r?\n/)[0] || '')
      const detectedDelimiter = detectDelimiter(firstLine)
      const rawCsvHeaders = rawCsvFirstLineHeaders(text)
      const headerKeys = rows.length > 0 ? Object.keys(rows[0]) : []
      res.json({
        success: true,
        data: filtered,
        debug: {
          httpStatus,
          sheetFetchUrl: fetchUrl,
          sheetEnvUrl: rawSheetUrl,
          sheetUrlHint: sheetUrlHint(rawSheetUrl, fetchUrl),
          csvBytes: text.length,
          csvStartsWith: text.slice(0, 120).replace(/\r?\n/g, ' '),
          detectedDelimiter,
          rawCsvHeaders,
          normalizedHeaderKeys: rawCsvHeaders.map((h) => normalizeHeaderKey(h)),
          parsedRowCount: rows.length,
          filteredRowCount: filtered.length,
          expiredFilteredCount: expiredCount,
          headerKeys,
          sampleParsedRows: rows.slice(0, 3)
        }
      })
      return
    }
    const data = await fetchAndParseJobs()
    res.json({ success: true, data })
  } catch (e) {
    const status = e.statusCode || 500
    res.status(status).json({
      success: false,
      message: e.message || 'Failed to load job opportunities'
    })
  }
})

router.get('/jobs-csv', async (req, res) => {
  try {
    const data = await fetchAndParseJobs()
    const csv = rowsToCsv(data)
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', 'attachment; filename="SARA_Opportunities.csv"')
    res.send(csv)
  } catch (e) {
    const status = e.statusCode || 500
    res.status(status).json({
      success: false,
      message: e.message || 'Failed to load job opportunities'
    })
  }
})

export default router
