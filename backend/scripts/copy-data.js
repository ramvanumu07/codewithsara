/**
 * Copy repo-root data/ into backend/data so curriculum (topics, tasks) is always
 * loaded from a path inside the backend. Ensures deployed API has latest assignments.
 * Run before start/dev (prestart, predev). CWD must be backend/.
 */
import fs from 'fs'
import path from 'path'

const backendRoot = process.cwd()
const source = path.join(backendRoot, '..', 'data')
const dest = path.join(backendRoot, 'data')

if (!fs.existsSync(source)) {
  console.warn('[copy-data] No repo data/ at', source, '- skipping copy')
  process.exit(0)
}

function copyRecursive(src, dst) {
  const stat = fs.statSync(src)
  if (stat.isDirectory()) {
    if (!fs.existsSync(dst)) fs.mkdirSync(dst, { recursive: true })
    for (const name of fs.readdirSync(src)) {
      copyRecursive(path.join(src, name), path.join(dst, name))
    }
  } else {
    fs.copyFileSync(src, dst)
  }
}

try {
  if (fs.existsSync(dest)) fs.rmSync(dest, { recursive: true })
  copyRecursive(source, dest)
  console.log('[copy-data] Copied', source, '->', dest)
} catch (err) {
  console.error('[copy-data] Copy failed:', err.message)
  process.exit(1)
}
