import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { getJobsApiOrigin } from '../utils/jobsApiOrigin'
import './JobOpportunitiesSection.css'

const FILTERS = [
  { id: 'all', label: 'All' },
  { id: 'remote', label: 'Remote' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'in-office', label: 'In-Office' }
]

export default function JobOpportunitiesSection () {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState('all')
  const [downloading, setDownloading] = useState(false)

  const base = getJobsApiOrigin()

  useEffect(() => {
    let cancelled = false
    const url = `${base}/jobs-json`
    setLoading(true)
    setError(null)
    fetch(url, { credentials: 'omit' })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}))
        if (!res.ok) {
          throw new Error(data.message || data.error || `Request failed (${res.status})`)
        }
        if (!data.success || !Array.isArray(data.data)) {
          throw new Error('Invalid response from server')
        }
        return data.data
      })
      .then((data) => {
        if (!cancelled) setRows(data)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Could not load opportunities')
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => { cancelled = true }
  }, [base])

  const filtered = useMemo(() => {
    if (filter === 'all') return rows
    return rows.filter((r) => (r.locationType || '') === filter)
  }, [rows, filter])

  const onDownloadCsv = useCallback(async () => {
    setDownloading(true)
    try {
      const res = await fetch(`${base}/jobs-csv`, { credentials: 'omit' })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.message || `Download failed (${res.status})`)
      }
      const blob = await res.blob()
      const blobUrl = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = blobUrl
      a.download = 'SARA_Opportunities.csv'
      a.rel = 'noopener'
      document.body.appendChild(a)
      a.click()
      a.remove()
      URL.revokeObjectURL(blobUrl)
    } catch (e) {
      alert(e?.message || 'Download failed')
    } finally {
      setDownloading(false)
    }
  }, [base])

  return (
    <section className="job-opps" aria-labelledby="job-opps-heading">
      <div className="job-opps__head">
        <h4 id="job-opps-heading" className="job-opps__title">Opportunities</h4>
        <p className="job-opps__sub">
          Curated roles — download the full list or filter below.
        </p>
      </div>

      <div className="job-opps__toolbar">
        <div className="job-opps__filters" role="group" aria-label="Work location filter">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`job-opps__filter${filter === f.id ? ' job-opps__filter--active' : ''}`}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="job-opps__download"
          onClick={onDownloadCsv}
          disabled={downloading}
        >
          {downloading ? 'Preparing…' : 'Download CSV'}
        </button>
      </div>

      {loading && (
        <div className="job-opps__state job-opps__state--loading" role="status" aria-live="polite">
          <span className="job-opps__spinner" aria-hidden />
          <span>Loading opportunities…</span>
        </div>
      )}

      {!loading && error && (
        <div className="job-opps__state job-opps__state--error" role="alert">
          {error}
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="job-opps__state job-opps__state--empty">
          No openings match this filter right now.
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="job-opps__table-wrap">
          <table className="job-opps__table">
            <thead>
              <tr>
                <th scope="col">Company</th>
                <th scope="col">Role</th>
                <th scope="col">Location</th>
                <th scope="col">Skills</th>
                <th scope="col">Stipend</th>
                <th scope="col">Posted</th>
                <th scope="col">Apply</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr key={`${row.company}-${row.role}-${i}`}>
                  <td data-label="Company">{row.company}</td>
                  <td data-label="Role">{row.role}</td>
                  <td data-label="Location">{row.location}</td>
                  <td data-label="Skills">{row.skills}</td>
                  <td data-label="Stipend">{row.stipend}</td>
                  <td data-label="Posted">{row.posted}</td>
                  <td data-label="Apply">
                    {row.apply_link ? (
                      <a
                        href={row.apply_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="job-opps__apply"
                      >
                        Apply
                      </a>
                    ) : (
                      '—'
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  )
}
