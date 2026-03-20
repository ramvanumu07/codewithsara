# Session teaching prompt (extract)

**Source of truth (code):** `backend/prompts/prompts.js` → `buildSessionPrompt()`

**Injected at runtime:**

| Placeholder | Source |
|-------------|--------|
| `topicTitle` | Curriculum topic `title` |
| `currentOutcomeObjective` | Single string: `topic.outcomes[i]` (fallback if missing) |
| `outcomeIndexOneBased` | `i + 1` where `i` is `current_outcome_index` from `progress` (clamped) |
| `outcomeTotal` | `max(outcomes.length, outcome_messages.length, 1)` |

**Completion (server):** The model may end with exactly `[[OUTCOME_COMPLETE]]` on its own line after correct answers to **its** prior task. The API strips that marker, merges the **correctness** text with the next `outcome_messages[i]` (or the mastery line on the last outcome), updates `current_outcome_index`, and saves one assistant message.

**Note:** Callers pass `completedTopics` for context, but the template currently does not list completed topics in the string.

---

## Behaviour summary (as built in code)

- Teach **only** the current outcome (`current_outcome_index`).
- Case A / B response handling matches the template in `prompts.js` (verify task → marker only when correct; questions → clarify then “Ready to continue with the practice task?”).
- Do **not** paste the next curriculum block in the model reply when advancing; the server appends `outcome_messages[next]`.

---

## Where it is used

- `backend/routes/chat.js` — `buildSessionSystemPrompt()` for **`/session`** and **`/session/stream`** when the model runs.
- `POST /learn/session/start` still seeds the first turn from **`outcome_messages[0]`** without calling the model.

Conversation history is sent as separate `messages` in the chat API, not inside this system string.
