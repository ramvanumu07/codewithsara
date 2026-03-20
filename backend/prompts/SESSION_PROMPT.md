# Session teaching prompt (extract)

**Source of truth (code):** `backend/prompts/prompts.js` → `buildSessionPrompt()`

**Injected at runtime:**

| Placeholder | Source |
|-------------|--------|
| `topicTitle` | Curriculum topic `title` |
| `currentOutcomeObjective` | `topic.outcomes[i]` for `i = current_outcome_index` (clamped), or a fallback label |

**Completion (server):** If the assistant reply contains **`Congratulations! You've mastered`** (case-insensitive), the API treats it like a completion signal: text **before** that phrase is kept as correctness feedback, the mastery phrase is **not** stored as-is for mid-topic turns, and the server appends the next `outcome_messages[i]` (or the full-topic mastery line on the last outcome), updates `current_outcome_index`, and saves one assistant message. Legacy `[[OUTCOME_COMPLETE]]` is stripped if present.

**Note:** Callers pass `completedTopics` from `chat.js`, but the template does not inject it into the string.

---

## Behaviour summary (as built in code)

- Teach **only** the current outcome (`current_outcome_index` → `currentOutcomeObjective` in the prompt).
- **Practice task** is only the one from the model’s **previous** turn; no improvised “next steps” or new exercises until Case A fires.
- **Case A** must end with the exact mastery sentence (so the server can strip it and append `outcome_messages[next]`); no text after that line.
- Semicolons / style are not grounds to reject correct beginner code.
- Case A / B / C details live in `prompts.js`.

---

## Where it is used

- `backend/routes/chat.js` — `buildSessionSystemPrompt()` for **`/session`** and **`/session/stream`** when the model runs.
- `POST /learn/session/start` still seeds the first turn from **`outcome_messages[0]`** without calling the model.

Conversation history is sent as separate `messages` in the chat API, not inside this system string.
