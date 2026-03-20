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
