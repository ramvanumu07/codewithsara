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

function parseCsvLine (line) {
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
    } else if (c === ',' && !inQuotes) {
      out.push(cur.trim())
      cur = ''
    } else {
      cur += c
    }
  }
  out.push(cur.trim())
  return out
}

/** First row cell values as in the published CSV (before alias mapping). For debug only. */
function rawCsvFirstLineHeaders (text) {
  const t = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
  const line = t.split(/\r?\n/)[0] || ''
  return parseCsvLine(line).map((h) => h.replace(/^"|"$/g, '').trim())
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
  const header = parseCsvLine(rows[0]).map((h) =>
    normalizeHeaderKey(h.replace(/^"|"$/g, '').trim())
  )
  const data = []
  for (let r = 1; r < rows.length; r++) {
    const cells = parseCsvLine(rows[r])
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

async function fetchSheetJobsRaw () {
  const url = process.env.SHEET_CSV_URL
  if (!url || !String(url).trim()) {
    const err = new Error('SHEET_CSV_URL is not configured on the server')
    err.statusCode = 500
    throw err
  }
  let res
  try {
    res = await fetch(String(url).trim(), {
      redirect: 'follow',
      headers: { Accept: 'text/csv,text/plain,*/*' }
    })
  } catch (e) {
    const err = new Error(e?.message || 'Failed to fetch job sheet')
    err.statusCode = 500
    throw err
  }
  if (!res.ok) {
    const err = new Error(`Failed to fetch job sheet: HTTP ${res.status}`)
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
  return { text, rows, filtered, httpStatus: res.status }
}

async function fetchAndParseJobs () {
  const { filtered } = await fetchSheetJobsRaw()
  return filtered
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
      const { text, rows, filtered, httpStatus } = await fetchSheetJobsRaw()
      const expiredCount = rows.filter((row) => isExpiredRow(row.valid_until)).length
      const rawCsvHeaders = rawCsvFirstLineHeaders(text)
      const headerKeys = rows.length > 0 ? Object.keys(rows[0]) : []
      res.json({
        success: true,
        data: filtered,
        debug: {
          httpStatus,
          csvBytes: text.length,
          csvStartsWith: text.slice(0, 120).replace(/\r?\n/g, ' '),
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
    res.setHeader('Content-Disposition', 'attachment; filename="SARA_Internship_Opportunities.csv"')
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
