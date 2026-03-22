/**
 * Copy repo root /projects → frontend/public/course-projects for Vite static hosting.
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
  console.error('Missing source folder:', src)
  process.exit(1)
}

fs.rmSync(dest, { recursive: true, force: true })
fs.cpSync(src, dest, { recursive: true })
console.log('Synced projects →', dest)
