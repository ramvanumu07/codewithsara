/**
 * DSA curriculum — notes-only topics loaded from DSA-in-JavaScript-main markdown.
 * No assignments, no Sara progress tracking (see learning routes + dashboard).
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { DSA_TOPIC_ORDER } from './order.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dsaSourceRoot = path.resolve(__dirname, '../../../DSA-in-JavaScript-main')

/** @type {Array<{ id: string, title: string, file: string, description?: string }>} */
const DSA_TOPIC_META = [
  { id: 'dsa-basics', title: 'Loops & Math Foundations', file: 'Basics/README.md' },
  { id: 'time-complexity', title: 'Time Complexity (Big O)', file: 'Time Complexity/README.md' },
  { id: 'array-dsa', title: 'Array Manipulation', file: 'Array/README.md' },
  { id: 'array-polyfills', title: 'Map, Filter & Reduce Polyfills', file: 'Array/Polyfill.md' },
  { id: 'string-dsa', title: 'String', file: 'String/README.md' },
  { id: 'recursion-dsa', title: 'Recursion', file: 'Recursion/README.md' },
  { id: 'searching-algorithms', title: 'Linear & Binary Search', file: 'Searching Algorthims/README.md' },
  { id: 'objects-dsa', title: 'Objects', file: 'Objects/README.md' },
  { id: 'sorting', title: 'Sorting Algorithms', file: 'Sorting/README.md' },
  { id: 'set-and-map', title: 'Set & Map', file: 'Set & Map/README.md' },
  { id: 'linked-list', title: 'Linked List', file: 'Linked List/README.md' },
  { id: 'stack', title: 'Stack', file: 'Stack/README.md' },
  { id: 'queue', title: 'Queue', file: 'Queue/README.md' }
]

const NOTES_ONLY_PRACTISE = [
  {
    question: 'Read through the reference notes for this topic.',
    type: 'straightforward',
    validation_hint: 'DSA notes-only topic; no interactive assignments in Sara.'
  }
]

function stripYoutubeBanner (md) {
  return md.replace(/<p align="center">[\s\S]*?<\/p>\s*/i, '').trim()
}

function firstParagraph (md) {
  for (const line of md.split('\n')) {
    const t = line.trim()
    if (!t || t.startsWith('#') || t.startsWith('<')) continue
    return t.slice(0, 160)
  }
  return 'Data structures and algorithms reference notes.'
}

function validateDsaTopic (topic, index) {
  const prefix = `[dsa-curriculum-parts] Topic at index ${index} (id: ${topic?.id ?? '?'}):`
  if (!topic?.id || !topic?.title) throw new Error(`${prefix} missing id or title.`)
  if (!topic.topic_notes || typeof topic.topic_notes !== 'string') {
    throw new Error(`${prefix} missing topic_notes.`)
  }
  if (!Array.isArray(topic.tasks) || topic.tasks.length !== 0) {
    throw new Error(`${prefix} tasks must be an empty array.`)
  }
}

function loadTopicFromMarkdown (meta) {
  const filePath = path.join(dsaSourceRoot, meta.file)
  if (!fs.existsSync(filePath)) {
    throw new Error(`[dsa-curriculum-parts] Missing source file: ${filePath}`)
  }
  const raw = fs.readFileSync(filePath, 'utf8')
  const notes = stripYoutubeBanner(raw)
  return {
    id: meta.id,
    title: meta.title,
    category: 'dsa',
    description: meta.description || firstParagraph(notes),
    outcomes: ['Reference notes'],
    practise_tasks: NOTES_ONLY_PRACTISE,
    tasks: [],
    topic_notes: notes,
    notesOnly: true
  }
}

const byId = Object.fromEntries(DSA_TOPIC_META.map((m) => [m.id, m]))

const dsaTopics = DSA_TOPIC_ORDER.map((id) => {
  const meta = byId[id]
  if (!meta) throw new Error(`[dsa-curriculum-parts] Missing meta for id: ${id}`)
  return loadTopicFromMarkdown(meta)
})

dsaTopics.forEach(validateDsaTopic)

if (dsaTopics.length !== DSA_TOPIC_ORDER.length) {
  throw new Error(
    `[dsa-curriculum-parts] Topic count mismatch: expected ${DSA_TOPIC_ORDER.length}, got ${dsaTopics.length}.`
  )
}

export { DSA_TOPIC_ORDER, dsaTopics }
export default dsaTopics
