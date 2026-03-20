/**
 * Session outcome advancement: model writes "Congratulations! You've mastered …" (Case A);
 * server treats it like a completion signal, strips it, and appends the next outcome message (or topic mastery line).
 */

/** Legacy marker; stripped if present so old transcripts do not leak it. */
const LEGACY_OUTCOME_MARKER = '[[OUTCOME_COMPLETE]]'

/** Case-insensitive anchor; must match how `prompts.js` instructs the model (Case A). */
export const MASTERY_COMPLETION_SUBSTR = "congratulations! you've mastered"

/**
 * @param {string} raw
 * @returns {{ hasCompletion: boolean, beforeMastery: string }}
 */
export function parseMasteryCompletionSignal(raw) {
  const text = typeof raw === 'string' ? raw : ''
  const lower = text.toLowerCase()
  const idx = lower.lastIndexOf(MASTERY_COMPLETION_SUBSTR)
  if (idx < 0) {
    return { hasCompletion: false, beforeMastery: text.trim() }
  }
  const beforeMastery = text.slice(0, idx).trim()
  return { hasCompletion: true, beforeMastery }
}

/**
 * @param {{ title?: string, outcome_messages?: string[] }} topic
 * @param {string} correctnessPart — feedback before the mastery phrase (optional)
 * @param {number} currentOutcomeIndex — index of outcome currently being taught
 * @returns {{ text: string, newIndex: number, sessionComplete: boolean }}
 */
export function composeOutcomeTransition(topic, correctnessPart, currentOutcomeIndex) {
  const messages = topic?.outcome_messages
  const n = Array.isArray(messages) ? messages.length : 0
  const nextIndex = currentOutcomeIndex + 1
  const pre = (correctnessPart || '').trim() || 'Great work!'

  if (n === 0) {
    const title = topic?.title || 'this topic'
    return {
      text: `${pre}\n\nCongratulations! You've mastered ${title}! You're ready for the playground.`,
      newIndex: nextIndex,
      sessionComplete: true
    }
  }

  if (nextIndex < n) {
    const nextMsg = messages[nextIndex]
    return {
      text: `${pre}\n\n${nextMsg}`,
      newIndex: nextIndex,
      sessionComplete: false
    }
  }

  const title = topic?.title || 'this topic'
  return {
    text: `${pre}\n\nCongratulations! You've mastered ${title}! You're ready for the playground.`,
    newIndex: nextIndex,
    sessionComplete: true
  }
}

function stripLegacyMarkers(s) {
  if (typeof s !== 'string') return ''
  return s.split(LEGACY_OUTCOME_MARKER).join('').trim()
}

/**
 * @param {string} raw
 * @param {{ title?: string, outcome_messages?: string[] }} topic
 * @param {number} currentOutcomeIndex
 * @param {boolean} userMessaged — false for initial curriculum-only turns
 * @returns {{ finalText: string, newOutcomeIndex: number, sessionComplete: boolean, advanced: boolean }}
 */
export function processSessionAssistantReply(raw, topic, currentOutcomeIndex, userMessaged) {
  if (!userMessaged) {
    return {
      finalText: stripLegacyMarkers(raw),
      newOutcomeIndex: currentOutcomeIndex,
      sessionComplete: false,
      advanced: false
    }
  }

  const withoutLegacy = typeof raw === 'string' ? raw.split(LEGACY_OUTCOME_MARKER).join('') : ''
  const { hasCompletion, beforeMastery } = parseMasteryCompletionSignal(withoutLegacy)

  if (!hasCompletion) {
    return {
      finalText: stripLegacyMarkers(withoutLegacy),
      newOutcomeIndex: currentOutcomeIndex,
      sessionComplete: false,
      advanced: false
    }
  }

  const built = composeOutcomeTransition(topic, beforeMastery, currentOutcomeIndex)
  return {
    finalText: built.text,
    newOutcomeIndex: built.newIndex,
    sessionComplete: built.sessionComplete,
    advanced: true
  }
}
