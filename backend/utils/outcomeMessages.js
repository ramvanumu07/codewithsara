/**
 * First teaching block for session start (matches outcomes[0]).
 * @param {{ outcome_messages?: string[] } | null | undefined} topic
 * @returns {string|null}
 */
export function getFirstOutcomeMessage(topic) {
  const arr = topic?.outcome_messages
  if (!Array.isArray(arr) || typeof arr[0] !== 'string') return null
  const s = arr[0].trim()
  return s || null
}

/**
 * Extract body under a "## Practice" heading from an outcome_message markdown block.
 * @param {string} markdown
 * @returns {string}
 */
export function extractPracticeTaskFromOutcomeMessage(markdown) {
  if (typeof markdown !== 'string' || !markdown.trim()) {
    return 'Use the Practice instructions from the latest lesson message in the chat.'
  }
  const m = markdown.match(/##\s*Practice\s*\n+([\s\S]*?)(?=\n##\s|$)/i)
  if (!m) return 'Use the Practice instructions from the latest lesson message in the chat.'
  return m[1].trim()
}

/**
 * First fenced code block from an outcome message (usually the main lesson example).
 * @param {string} markdown
 * @returns {string}
 */
export function extractFirstCodeBlockFromOutcomeMessage(markdown) {
  if (typeof markdown !== 'string' || !markdown.trim()) return ''
  const m = markdown.match(/```(?:javascript|js|ts)?\s*\n([\s\S]*?)```/i)
  return m ? m[1].trim() : ''
}

function normalizeForOutcomeMatch(s) {
  return (typeof s === 'string' ? s : '').replace(/\r\n/g, '\n').trim()
}

/**
 * Drop the current outcome's curriculum intro (and all prior turns) so Groq only sees
 * exchanges for this outcome. The intro is either exactly `outcome_messages[i]` (first outcome)
 * or ends with it after an outcome transition (short feedback, blank line, then the next message).
 *
 * @param {Array<{ role?: string, content?: string }>} messages - Parsed chat history (chronological)
 * @param {{ outcome_messages?: string[] } | null | undefined} topic
 * @param {number} teachingOutcomeIndex
 * @returns {Array<{ role?: string, content?: string }>}
 */
export function sliceMessagesAfterCurrentOutcomeIntro(messages, topic, teachingOutcomeIndex) {
  if (!Array.isArray(messages) || messages.length === 0) return []
  const arr = topic?.outcome_messages
  if (!Array.isArray(arr)) return messages

  const seed = normalizeForOutcomeMatch(arr[teachingOutcomeIndex] ?? '')
  if (!seed) return messages

  const seedNorm = seed

  for (let i = messages.length - 1; i >= 0; i--) {
    const role = messages[i].role === 'agent' ? 'assistant' : messages[i].role
    if (role !== 'assistant') continue
    const c = normalizeForOutcomeMatch(messages[i].content ?? '')
    if (c === seedNorm || c.endsWith(seedNorm)) {
      return messages.slice(i + 1)
    }
  }

  return messages
}
