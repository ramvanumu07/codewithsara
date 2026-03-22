/**
 * Optional: copy repo root /projects → frontend/public/course-projects.
 * Course bundles can also live only under public/course-projects (committed).
 * Run from frontend: npm run sync:projects
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../..')
const src = path.join(repoRoot, 'projects')
const dest = path.join(repoRoot, 'frontend', 'public', 'course-projects')

if (!fs.existsSync(src)) {
  console.log('No repo root projects/ folder — skipping sync (using frontend/public/course-projects if present).')
  process.exit(0)
}

fs.rmSync(dest, { recursive: true, force: true })
fs.cpSync(src, dest, { recursive: true })
console.log('Synced projects →', dest)
