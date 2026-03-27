# Session teaching prompt (extract)

**Source of truth (code):** `backend/prompts/prompts.js` → `buildSessionPrompt()`

**Injected at runtime:**

| Field | Source |
|--------|--------|
| `topicTitle` | `topic.title` |
| `currentOutcomeObjective` | `topic.outcomes[i]` (concept / learning outcome) |
| `taskQuestion` | `topic.practise_tasks[i].question`, or fallback: `extractPracticeTaskFromOutcomeMessage(topic.outcome_messages[i])` |
| `taskType` | `topic.practise_tasks[i].type` (`personalised` \| `straightforward` \| `context_dependent`) |
| `validationHint` | `topic.practise_tasks[i].validation_hint` |
| `fullLessonOutcomeText` | **Only when `taskType === 'context_dependent'`:** full `topic.outcome_messages[i]` (includes markdown, examples, practice) so the model can grade “in the example” and conceptual questions |

For **context_dependent** tasks, the full outcome message is included in the system prompt as **FULL LESSON TEXT**. Other task types rely on task question, concept, validation hint, and chat history (no duplicate code excerpt in the system prompt).

**Completion (server):** If the assistant reply contains **`Congratulations! You've mastered`** (case-insensitive), the API treats it like a completion signal: text **before** that phrase is kept as feedback, the mastery tail is stripped for merging, and the server appends the next `outcome_messages[i]` (or the full-topic mastery line on the last outcome), updates `current_outcome_index`, and saves one assistant message. Legacy `[[OUTCOME_COMPLETE]]` is stripped if present. The optional end marker `##OUTCOME_COMPLETE##` is stripped from displayed text when present; advancement still depends on the mastery phrase.

---

## Behaviour summary (as built in code)

- Dynamic session facts are passed as separate fields to `buildSessionPrompt()`; the rest of the prompt is static in `prompts.js`.
- The model should end a **successful** validation with a mastery line that matches the **Learning Outcome** text so it aligns with `sessionOutcome` stripping and progression.

---

## Where it is used

- `backend/routes/chat.js` — `buildSessionSystemPrompt()` for **`/session`** and **`/session/stream`** when the model runs.
- `POST /learn/session/start` still seeds the first turn from **`outcome_messages[0]`** without calling the model.

Conversation history is sent as separate `messages` in the chat API, not inside this system string.
