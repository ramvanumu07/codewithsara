/**
 * Render API origin for public /jobs-json and /jobs-csv (not under /api).
 * - Production (Netlify): set VITE_API_BASE_URL to your Render app URL, no trailing slash.
 * - Local dev: leave unset to use same-origin /jobs-json (Vite proxies to Express).
 */

export function getJobsApiOrigin () {
  const raw = import.meta.env.VITE_API_BASE_URL
  if (raw !== undefined && raw !== null && String(raw).trim() !== '') {
    return String(raw).replace(/\/$/, '')
  }
  return ''
}
