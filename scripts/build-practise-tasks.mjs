/**
 * Inserts `practise_tasks` into each topic module (aligned with outcomes / ## Practice).
 * Run from repo root: node scripts/build-practise-tasks.mjs
 */
import { readdir, readFile, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const dir = path.join(root, 'backend', 'data', 'curriculum-parts')

function extractPractice(msg) {
  const m = msg.match(/## Practice\r?\n\r?\n([\s\S]+)$/)
  return m ? m[1].trim() : null
}

function classifyType(question) {
  if (!question) return 'straightforward'
  const q = question.trim()
  const lower = q.toLowerCase()

  if (
    /\byour\b/.test(lower) ||
    /\bprints?\s+your\b/.test(lower) ||
    /\bstores?\s+your\b/.test(lower) ||
    /\bdeclares?\s+a\s+constant\s+for\s+your\b/.test(lower) ||
    /\b(your\s+name|your\s+age|your\s+nickname|your\s+birth|your\s+first\s+name|your\s+real\s+name)\b/.test(lower)
  ) {
    return 'personalised'
  }

  if (/^in the example\b/i.test(q)) return 'context_dependent'
  if (/\bwhat happens\b/i.test(q)) return 'context_dependent'
  if (/\b(why|when would)\b/i.test(q) && /\?/.test(q)) return 'context_dependent'
  if (/\bexplain\b/i.test(lower)) return 'context_dependent'
  if (/\?[^?]*\?/.test(q)) return 'context_dependent'

  if (/^is\s+`/.test(q) && /\bvalid\b/i.test(q)) return 'context_dependent'
  if (/^which\s+(one|ones)\b/i.test(lower) && /\?/.test(q)) return 'context_dependent'
  if (/^what\s+does\s+`?json\.stringify/i.test(q)) return 'context_dependent'
  if (/^if\s+an\s+api\s+gives/i.test(lower)) return 'context_dependent'

  if (/\?$/.test(q)) {
    if (/^if\s+`/.test(q)) return 'straightforward'
    if (/^for\s+an\s+array\b/i.test(q)) return 'straightforward'
    if (/^what\s+is\s+`[a-z]/i.test(q)) return 'straightforward'
    return 'context_dependent'
  }

  return 'straightforward'
}

function validationHint(type, question) {
  const q = (question || '').toLowerCase()
  if (type === 'personalised') {
    if (/single quote/.test(q)) {
      return 'Any name or text is valid; string must use single quotes as required by the task.'
    }
    if (/first name|last name/.test(q)) {
      return 'Any first and last names are valid; must concatenate with a single space between (e.g. + \" \" +).'
    }
    if (/nickname|real name/.test(q)) {
      return 'Any nickname and real name are valid; must use let, reassign, and print twice as taught.'
    }
    if (/birth year|age/.test(q)) {
      return 'Any plausible year or age is valid; must use const/let and console.log as in the lesson.'
    }
    return 'Learner-specific values are acceptable; verify correct syntax (variables, console.log, const/let) for this outcome.'
  }
  if (type === 'context_dependent') {
    if (/in the example/i.test(q)) {
      return 'Answer should reference the example in the lesson (behaviour, order, or values shown); wording may vary.'
    }
    if (/valid json/i.test(q)) {
      return 'Should mention double-quoted keys/strings for JSON; second form is invalid if keys are unquoted or single-quoted.'
    }
    return 'Grade on conceptual correctness using vocabulary from this outcome; exact phrasing is not required.'
  }
  if (/^write code/i.test(q.trim())) {
    return 'Must satisfy the written instructions; output or structure should match what the task asks for.'
  }
  return 'Check syntax and behaviour match the exercise; use the rules from this outcome when judging correctness.'
}

function formatPractiseTasksBlock(tasks) {
  const json = JSON.stringify(tasks, null, 2)
  const lines = json.split('\n')
  lines[0] = '  "practise_tasks": ' + lines[0]
  for (let i = 1; i < lines.length; i++) {
    lines[i] = '  ' + lines[i]
  }
  return `${lines.join('\n')},\n`
}

const files = (await readdir(dir))
  .filter((f) => f.startsWith('topic-') && f.endsWith('.js'))
  .sort()

for (const f of files) {
  const filePath = path.join(dir, f)
  let text = await readFile(filePath, 'utf8')
  if (/\bpractise_tasks\s*:/m.test(text)) {
    console.log('skip (already has practise_tasks):', f)
    continue
  }

  const mod = await import(pathToFileURL(filePath).href)
  const topic = mod.default
  const msgs = topic.outcome_messages
  if (!msgs || msgs.length !== topic.outcomes.length) {
    console.error('Mismatch', f, msgs?.length, topic.outcomes?.length)
    continue
  }

  const tasks = []
  for (let i = 0; i < msgs.length; i++) {
    let q = extractPractice(msgs[i])
    if (!q) {
      q = `Practise: ${topic.outcomes[i]}`
    }
    const type = classifyType(q)
    tasks.push({
      question: q,
      type,
      validation_hint: validationHint(type, q)
    })
  }

  const block = formatPractiseTasksBlock(tasks)
  const needle = '\n  "tasks":'
  if (!text.includes(needle)) {
    console.error('Could not find insertion point:', f)
    continue
  }
  text = text.replace(needle, '\n' + block + '  "tasks":')
  await writeFile(filePath, text, 'utf8')
  console.log('wrote:', f)
}

console.log('done.')
