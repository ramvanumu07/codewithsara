/**
 * One-off generator: DSA-in-JavaScript-main markdown → dsa-curriculum-parts/topic-*.js
 * Run: node backend/scripts/build-dsa-curriculum.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '../..')
const dsaSource = path.join(repoRoot, 'DSA-in-JavaScript-main')
const outDir = path.join(repoRoot, 'backend/data/dsa-curriculum-parts')

const TOPICS = [
  { id: 'dsa-basics', file: 'Basics/README.md', title: 'Loops & Math Foundations' },
  { id: 'time-complexity', file: 'Time Complexity/README.md', title: 'Time Complexity (Big O)' },
  { id: 'array-dsa', file: 'Array/README.md', title: 'Array Manipulation' },
  { id: 'array-polyfills', file: 'Array/Polyfill.md', title: 'Map, Filter & Reduce Polyfills' },
  { id: 'string-dsa', file: 'String/README.md', title: 'String' },
  { id: 'recursion-dsa', file: 'Recursion/README.md', title: 'Recursion' },
  { id: 'searching-algorithms', file: 'Searching Algorthims/README.md', title: 'Linear & Binary Search' },
  { id: 'objects-dsa', file: 'Objects/README.md', title: 'Objects' },
  { id: 'sorting', file: 'Sorting/README.md', title: 'Sorting Algorithms' },
  { id: 'set-and-map', file: 'Set & Map/README.md', title: 'Set & Map' },
  { id: 'linked-list', file: 'Linked List/README.md', title: 'Linked List' },
  { id: 'stack', file: 'Stack/README.md', title: 'Stack' },
  { id: 'queue', file: 'Queue/README.md', title: 'Queue' }
]

function stripYoutubeBanner (md) {
  return md.replace(/<p align="center">[\s\S]*?<\/p>\s*/i, '').trim()
}

function firstParagraph (md) {
  const lines = md.split('\n')
  for (const line of lines) {
    const t = line.trim()
    if (!t || t.startsWith('#') || t.startsWith('<')) continue
    return t.slice(0, 160)
  }
  return 'Data structures and algorithms reference notes.'
}

fs.mkdirSync(outDir, { recursive: true })

const orderIds = TOPICS.map((t) => t.id)

for (const topic of TOPICS) {
  const srcPath = path.join(dsaSource, topic.file)
  if (!fs.existsSync(srcPath)) {
    console.error('Missing:', srcPath)
    process.exit(1)
  }
  let md = fs.readFileSync(srcPath, 'utf8')
  md = stripYoutubeBanner(md)
  const description = firstParagraph(md)
  const payload = {
    id: topic.id,
    title: topic.title,
    category: 'dsa',
    description,
    outcomes: ['Reference notes'],
    practise_tasks: [
      {
        question: 'Read through the reference notes for this topic.',
        type: 'straightforward',
        validation_hint: 'DSA notes-only topic; no interactive assignments in Sara.'
      }
    ],
    tasks: [],
    topic_notes: md
  }
  const outFile = path.join(outDir, `topic-${topic.id}.js`)
  const body = `/** Topic: ${topic.id} — generated from DSA-in-JavaScript-main */\nexport default ${JSON.stringify(payload, null, 2)}\n`
  fs.writeFileSync(outFile, body, 'utf8')
  console.log('Wrote', path.relative(repoRoot, outFile))
}

const orderJs = `/**
 * Ordered DSA topic IDs (matches DSA-in-JavaScript-main curriculum).
 */
export const DSA_TOPIC_ORDER = ${JSON.stringify(orderIds, null, 2)}
`
fs.writeFileSync(path.join(outDir, 'order.js'), orderJs, 'utf8')
console.log('Wrote order.js')
