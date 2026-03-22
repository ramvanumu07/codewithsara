import JSZip from 'jszip'
import {
  COURSE_PROJECT_FILE_PATHS,
  COURSE_PROJECTS_BUNDLE_README,
  COURSE_PROJECTS_ZIP_FILENAME,
  COURSE_PROJECTS_ZIP_ROOT,
} from '../data/courseProjectsBundle'

/**
 * Public asset base (matches Vite BASE_URL when a <base href> is set; else '/').
 * Avoids import.meta so Jest can load modules that import this file.
 */
function staticBaseUrl () {
  if (typeof window === 'undefined') return '/'
  const baseEl = document.querySelector('base[href]')
  if (baseEl) {
    try {
      const u = new URL(baseEl.getAttribute('href'), window.location.origin)
      let p = u.pathname || '/'
      return p.endsWith('/') ? p : `${p}/`
    } catch {
      return '/'
    }
  }
  return '/'
}

function triggerBlobDownload (blob, filename) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.rel = 'noopener'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}

/**
 * Fetches project files from /course-projects and downloads a single ZIP.
 * @returns {Promise<void>}
 */
export async function downloadAllCourseProjectsZip () {
  const base = staticBaseUrl()
  const zip = new JSZip()
  const root = zip.folder(COURSE_PROJECTS_ZIP_ROOT)
  if (!root) throw new Error('Could not create zip folder')

  for (const rel of COURSE_PROJECT_FILE_PATHS) {
    const res = await fetch(`${base}course-projects/${rel}`)
    if (!res.ok) {
      throw new Error(`Could not load ${rel} (${res.status})`)
    }
    const buf = await res.arrayBuffer()
    root.file(rel, buf)
  }

  root.file('README.txt', COURSE_PROJECTS_BUNDLE_README)

  const blob = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  triggerBlobDownload(blob, COURSE_PROJECTS_ZIP_FILENAME)
}
