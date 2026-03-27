/**
 * All AI system prompts in one place.
 * Used by learning.js and chat.js for session flow only.
 */

/**
 * Session teaching prompt: structured context for practice validation.
 * Conversation history is passed separately via the messages array.
 *
 * @param {object} options
 * @param {string} options.topicTitle
 * @param {string} options.currentOutcomeObjective — concept / learning outcome title
 * @param {string} [options.taskQuestion] — practise task wording (from curriculum `practise_tasks`)
 * @param {'personalised'|'straightforward'|'context_dependent'} [options.taskType]
 * @param {string} [options.validationHint]
 * @param {string|null} [options.fullLessonOutcomeText] — full `outcome_messages[i]` for context_dependent tasks (includes examples in markdown)
 * @returns {string}
 */
export function buildSessionPrompt({
  topicTitle,
  currentOutcomeObjective,
  taskQuestion = 'Use the Practice instructions from the latest lesson message in the chat.',
  taskType = 'straightforward',
  validationHint = '',
  fullLessonOutcomeText = null
}) {
  const concept = currentOutcomeObjective
  const hint =
    typeof validationHint === 'string' && validationHint.trim()
      ? validationHint.trim()
      : 'Be fair to beginners: accept any valid approach that shows understanding.'

  const fullLesson =
    typeof fullLessonOutcomeText === 'string' && fullLessonOutcomeText.trim()
      ? fullLessonOutcomeText.trim()
      : null

  const typeGuidance =
    taskType === 'personalised'
      ? `This task is personalised: the learner supplies their own values (name, age, etc.).
- Accept any answer that uses correct JavaScript for the task; do not require a specific literal value.
- Check syntax and that the right idea from the concept is demonstrated.`
      : taskType === 'context_dependent'
        ? `This task depends on the lesson text (examples, order of execution, definitions).
- Use the FULL LESSON TEXT section below to interpret phrases like "in the example".
- Grade whether the answer reflects the right idea; wording may differ.
- Variable names and minor details need not match the lesson exactly.`
        : `This task is straightforward: there is usually one clear expected behaviour or answer.
- Validate against the concept and validation hint.
- Accept any correct JavaScript approach unless the task explicitly restricts it.`

  const lessonBlock =
    taskType === 'context_dependent' && fullLesson
      ? `

FULL LESSON TEXT FOR THIS OUTCOME (use this for "in the example" and conceptual questions):
${fullLesson}
`
      : ''

  return `You are a JavaScript answer validator for a beginner learning platform.
Your only job is to validate the user's answer for the task below.

Task question: ${taskQuestion}
Task type: ${taskType}
Concept (outcome): ${concept}
Topic: ${topicTitle}
Validation hint: ${hint}
${lessonBlock}
HOW TO JUDGE (${taskType})
${typeGuidance}

RESPONSE RULES

1) CORRECT answer (shows understanding; code would run or explanation matches the task for conceptual questions):
   - Output exactly one line in this form (the outcome text must match the concept line above):
     Congratulations! You've mastered ${concept}!
   - Nothing after that line.

2) WRONG or incomplete:
   - In 1–2 short sentences, say what is wrong in beginner-friendly terms.
   - Repeat the task question so they can try again.
   - Do not use the completion line from rule 1.

3) The learner asks a doubt (not attempting the task):
   - Answer in at most 2–3 short lines.
   - End with: Ready to try the practice task?
   - Do not use the completion line from rule 1.

4) Off-topic or empty attempt:
   - One line redirecting them to the task question.
   - Do not use the completion line from rule 1.

IMPORTANT
- Be generous: close enough counts if understanding is clear.
- Stay within the current concept; do not introduce the next topic.
- For context_dependent tasks, rely on FULL LESSON TEXT above when the question references the example.
`.trim()
}
