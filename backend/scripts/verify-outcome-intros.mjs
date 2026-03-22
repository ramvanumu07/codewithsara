/**
 * Verify curriculum outcome_messages: Let's opener, body before ## Practice, Practice present.
 * Run: node scripts/verify-outcome-intros.mjs
 */
import { topics } from '../data/curriculum-parts/index.js'

const LETS = /^let's\b/i
const MIN_BODY_BEFORE_PRACTICE = 80

const failures = []

for (const t of topics) {
  if (!t.outcome_messages) {
    failures.push({ topic: t.id, i: 0, reason: 'missing_outcome_messages_array' })
    continue
  }
  for (let i = 0; i < t.outcome_messages.length; i++) {
    const raw = t.outcome_messages[i]
    const s = typeof raw === 'string' ? raw.trim() : ''
    const outcome = t.outcomes[i] ?? ''

    if (!s) {
      failures.push({ topic: t.id, i: i + 1, outcome, reason: 'empty_message' })
      continue
    }
    if (!LETS.test(s)) {
      failures.push({ topic: t.id, i: i + 1, outcome, reason: 'does_not_start_with_lets', preview: s.slice(0, 60) })
      continue
    }

    const bodyBeforePractice = s.split(/##\s*Practice/i)[0].trim()
    if (bodyBeforePractice.length < MIN_BODY_BEFORE_PRACTICE) {
      failures.push({
        topic: t.id,
        i: i + 1,
        outcome,
        reason: 'thin_body_before_practice',
        approxChars: bodyBeforePractice.length
      })
    }

    if (!/##\s*Practice\b/i.test(s)) {
      failures.push({ topic: t.id, i: i + 1, outcome, reason: 'missing_practice_section' })
    }
  }

  if (t.outcome_messages.length !== t.outcomes.length) {
    failures.push({ topic: t.id, i: 0, reason: 'outcome_messages_length_mismatch' })
  }
}

if (failures.length === 0) {
  console.log('PASS: all topics have outcome_messages; each starts with "Let\'s"; each has >=', MIN_BODY_BEFORE_PRACTICE, 'chars before ## Practice; each has ## Practice.')
  console.log('Total outcome messages checked:', topics.reduce((n, x) => n + (x.outcome_messages?.length ?? 0), 0))
} else {
  console.log('FAIL count:', failures.length)
  console.log(JSON.stringify(failures, null, 2))
  process.exit(1)
}
