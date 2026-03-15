# Why Topic Notes Show Content Not in This Project

The notes view can show either:

1. **Q&A layout** – outcome titles + `outcome_messages` from the curriculum (e.g. `data/curriculum-parts/topic-date-time.js`).
2. **Single document** – `topic_notes` (one markdown string). If that text (e.g. "1. The Date Object: Tracking time in memory...") is **not** in any file in this repo, it is coming from the **API response**.

## How to find the reason

### 1. See what the frontend actually receives

- Open the app, go to **Topic notes** for the Dates topic.
- Open DevTools → **Console**.
- In dev mode, or if you add `?debug=1` to the URL (e.g. `/learn/date-time?view=notes&debug=1`), look for a log **`[Notes source]`**. It shows:
  - `hasTopicNotes` – whether `topic_notes` is present
  - `topicNotesPreview` – start of that string (if present)
  - `outcomeMessagesLength` / `outcomesLength` – whether Q&A is used
  - `showing` – which path is used: `Q&A (outcome_messages)` or `topic_notes (fallback)`.

So you can see immediately whether the UI is using `topic_notes` or `outcome_messages`.

### 2. See what the backend has (raw curriculum)

- With the backend running, call the **debug endpoint** (no auth):

  ```http
  GET /api/learn/debug/topic/date-time
  ```

  (Replace `date-time` with the topic id you care about.)

- The response includes:
  - **`summary`** – `hasTopicNotes`, `outcomesLength`, `outcomeMessagesLength`, etc.
  - **`topic`** – same topic as loaded from `data/curriculum-parts/` (truncated previews of `outcome_messages` and `topic_notes`).

In **this** repo, the curriculum has **no** `topic_notes` for date-time; it only has `outcomes` and `outcome_messages`. So for the codebase as-is you should see `hasTopicNotes: false` and `outcomeMessagesLength: 12` (and similar) from the debug endpoint.

### 3. Compare with the real topic API

- In DevTools → **Network**, when you open the notes view, find:

  ```http
  GET /api/learn/topic/date-time
  ```

  (with your auth). Open the response and check the **`topic`** object:

  - Is **`topic_notes`** present and set to that long numbered text?
  - Are **`outcome_messages`** and **`outcomes`** present and the same length as in the debug response?

- **If the main API response has `topic_notes` but the debug endpoint does not**  
  Then something **outside** the curriculum files is adding `topic_notes` (e.g. another server, proxy, DB, or a different deployment that injects it).

- **If both responses match and neither has `topic_notes`**  
  Then the UI should use the Q&A layout. If you still see the other text, it may be **cached** (browser or CDN) or from an **old build**.

## Summary

| What you see in notes | Likely cause |
|----------------------|---------------|
| Numbered list like "1. The Date Object..." | API is returning `topic_notes` and/or missing/mismatched `outcome_messages`. |
| Q&A with long explanations from the curriculum | API returns `outcome_messages` (same length as `outcomes`); UI uses Q&A. |

Use **`[Notes source]`** in the console and **`GET /api/learn/debug/topic/:topicId`** to see exactly where the content comes from.
