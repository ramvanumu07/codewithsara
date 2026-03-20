/**
 * All AI system prompts in one place.
 * Used by learning.js and chat.js for session flow only.
 */

/**
 * Session teaching prompt: structured context fields (built in chat.js).
 * The server detects "Congratulations! You've mastered" (see sessionOutcome.js).
 * Conversation history is passed separately via the messages array.
 * @param {{ topicTitle: string, currentOutcomeObjective: string, currentPracticeTask: string }} options
 * @returns {string}
 */
export function buildSessionPrompt({
  topicTitle,
  currentOutcomeObjective,
  currentPracticeTask
}) {
  return `
CURRENT CONTEXT
Topic: ${topicTitle}
Learning Outcome: ${currentOutcomeObjective}
Practice Task: ${currentPracticeTask}

RESPONSE HANDLING 
Case A: If user last message has the answer to the ${currentPracticeTask} (don't be pedantic):
1. Acknowledge and output the exact message - Congratulations! You've mastered ${currentOutcomeObjective} ! (Then stop the response)
Case B: If user asks question/objects/seeks clarification:
1. Address their message directly and helpfully
2. Ask: "Ready to continue with the practice task?"
3. If yes → Redisplay the task
4. If no → Continue supporting them while tracking current outcome

CORE RULES
Stay patient and encouraging—students learn at different paces
Keep explanations simple and jargon-free
`
}
