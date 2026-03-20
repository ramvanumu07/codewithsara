/**
 * Session outcome advancement: model emits [[OUTCOME_COMPLETE]] after correct task answers;
 * server strips it and appends the next curriculum outcome message (or mastery line).
 */

export const OUTCOME_COMPLETE_MARKER = '[[OUTCOME_COMPLETE]]'

/**
 * @param {string} raw
 * @returns {{ hasMarker: boolean, correctnessPart: string, remainderAfterMarker: string }}
 */
export function parseOutcomeCompleteMarker(raw) {
  const text = typeof raw === 'string' ? raw : ''
  const idx = text.lastIndexOf(OUTCOME_COMPLETE_MARKER)
  if (idx < 0) {
    return { hasMarker: false, correctnessPart: text.trim(), remainderAfterMarker: '' }
  }
  const correctnessPart = text.slice(0, idx).trim()
  const remainderAfterMarker = text.slice(idx + OUTCOME_COMPLETE_MARKER.length).trim()
  return { hasMarker: true, correctnessPart, remainderAfterMarker }
}

/**
 * @param {{ title?: string, outcome_messages?: string[] }} topic
 * @param {string} correctnessPart — AI verification / praise (before marker)
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

/**
 * @param {string} raw
 * @param {{ title?: string, outcome_messages?: string[] }} topic
 * @param {number} currentOutcomeIndex
 * @param {boolean} userMessaged — false for initial curriculum-only turns
 * @returns {{ finalText: string, newOutcomeIndex: number, sessionComplete: boolean, advanced: boolean }}
 */
export function processSessionAssistantReply(raw, topic, currentOutcomeIndex, userMessaged) {
  const strippedLeak = (s) => (typeof s === 'string' ? s.split(OUTCOME_COMPLETE_MARKER).join('').trim() : '')

  if (!userMessaged) {
    return {
      finalText: strippedLeak(raw),
      newOutcomeIndex: currentOutcomeIndex,
      sessionComplete: false,
      advanced: false
    }
  }

  const { hasMarker, correctnessPart } = parseOutcomeCompleteMarker(raw)
  if (!hasMarker) {
    return {
      finalText: strippedLeak(raw),
      newOutcomeIndex: currentOutcomeIndex,
      sessionComplete: false,
      advanced: false
    }
  }

  const built = composeOutcomeTransition(topic, correctnessPart, currentOutcomeIndex)
  return {
    finalText: built.text,
    newOutcomeIndex: built.newIndex,
    sessionComplete: built.sessionComplete,
    advanced: true
  }
}
