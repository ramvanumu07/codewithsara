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
