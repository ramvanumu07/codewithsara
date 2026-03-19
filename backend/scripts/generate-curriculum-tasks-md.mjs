/**
 * Generates CURRICULUM_TASKS_BY_TOPIC.md — one table per topic listing all tasks.
 * Loads each topic file directly from disk (with cache-bust) so the MD always
 * reflects the current curriculum, not a cached index.
 * Run from repo root: node backend/scripts/generate-curriculum-tasks-md.mjs
 */
import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const curriculumPath = path.join(__dirname, '../data/curriculum-parts')
const outPath = path.join(curriculumPath, 'CURRICULUM_TASKS_BY_TOPIC.md')

// Load order and then each topic file directly (cache-bust so we get latest from disk)
const { TOPIC_ORDER } = await import(pathToFileURL(path.join(curriculumPath, 'order.js')).href)
const topics = []
for (const topicId of TOPIC_ORDER) {
  const topicUrl = pathToFileURL(path.join(curriculumPath, `topic-${topicId}.js`)).href + '?t=' + Date.now()
  const mod = await import(topicUrl)
  const topic = mod.default
  if (!topic || !topic.id) throw new Error(`Invalid topic from topic-${topicId}.js`)
  topics.push(topic)
}

const NL = '\uE000NEWLINE\uE001' // private-use placeholders (won’t appear in curriculum)

/** Full task description for a table cell: line breaks + safe for HTML-in-MD. */
function formatFullDescriptionForTableCell(desc) {
  if (desc == null || desc === '') return '—'
  let s = String(desc).replace(/\r\n/g, '\n')
  s = s.replace(/\n/g, NL)
  s = s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  s = s.split(NL).join('<br>')
  s = s.replace(/\|/g, '\\|')
  return s
}

function escapeSimpleCell(s) {
  return String(s)
    .replace(/\|/g, '\\|')
    .replace(/\r?\n/g, ' ')
    .trim()
}

let md = `# Curriculum tasks by topic\n\n`
md += `One table per topic (**${topics.length}** topics). Each row is one assignment task.\n\n`
md += `| Column | Meaning |\n|--------|---------|\n`
md += `| **#** | Task order within the topic (1-based) |\n`
md += `| **Description** | Full task text (line breaks preserved via \`<br>\`) |\n`
md += `| **Solution type** | \`script\` or \`function\` |\n`
md += `| **Function name** | Name tested (function tasks only) |\n`
md += `| **Tests** | Number of test cases |\n\n`
md += `---\n\n`

for (const topic of topics) {
  const tasks = topic.tasks || []
  md += `## ${topic.title}\n\n`
  md += `**Topic ID:** \`${topic.id}\` · **Task count:** ${tasks.length}\n\n`
  md += '| # | Description | Solution type | Function name | Tests |\n'
  md += '|:-:|-------------|---------------|---------------|:-----:|\n'
  if (tasks.length === 0) {
    md += '| — | — | — | — | — |\n'
  } else {
    tasks.forEach((t, i) => {
      const description = formatFullDescriptionForTableCell(t.description)
      const st = escapeSimpleCell(t.solution_type || '—')
      const fn = escapeSimpleCell(t.function_name != null ? t.function_name : '—')
      const n = Array.isArray(t.testCases) ? t.testCases.length : 0
      md += `| ${i + 1} | ${description} | ${st} | ${fn} | ${n} |\n`
    })
  }
  md += '\n'
}

md += '---\n\n'
md +=
  '*To regenerate this file after curriculum changes, run from the repo root:* `node backend/scripts/generate-curriculum-tasks-md.mjs`\n'

fs.writeFileSync(outPath, md, 'utf8')
console.log(`Wrote ${outPath} (${topics.length} topic tables)`)
