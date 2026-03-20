# Session teaching prompt (extract)

**Source of truth (code):** `backend/prompts/prompts.js` → `buildSessionPrompt()`

**Injected at runtime:**

| Placeholder | Source |
|-------------|--------|
| `sessionContext` | Built in `chat.js` → `buildSessionSystemPrompt()`: **Topic**, **Current Outcome** (`topic.outcomes[i]`), **Practice Task** (from `## Practice` in `topic.outcome_messages[i]`, or a fallback string). |

**Completion (server):** If the assistant reply contains **`Congratulations! You've mastered`** (case-insensitive), the API treats it like a completion signal: text **before** that phrase is kept as feedback, the mastery tail is stripped for merging, and the server appends the next `outcome_messages[i]` (or the full-topic mastery line on the last outcome), updates `current_outcome_index`, and saves one assistant message. Legacy `[[OUTCOME_COMPLETE]]` is stripped if present.

---

## Behaviour summary (as built in code)

- Dynamic session facts are passed as the single **`sessionContext`** block; the rest of the prompt is static in `prompts.js`.
- The model should end with a mastery line that matches the **Current Outcome** text so it aligns with `sessionOutcome` stripping and progression.

---

## Where it is used

- `backend/routes/chat.js` — `buildSessionSystemPrompt()` for **`/session`** and **`/session/stream`** when the model runs.
- `POST /learn/session/start` still seeds the first turn from **`outcome_messages[0]`** without calling the model.

Conversation history is sent as separate `messages` in the chat API, not inside this system string.
