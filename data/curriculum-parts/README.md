# Curriculum parts

Topic-level content for the learning platform. Each topic is a single file; order is defined in one place.

## File naming

- **Filename:** `topic-<id>.js` (e.g. `topic-console-log.js` for id `console-log`).
- **Id:** kebab-case, must match the topic’s `id` property.

## Topic shape

Each file must **export default** an object with:

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | string | Yes | Unique topic id (kebab-case). Must match filename. |
| `title` | string | Yes | Display title. |
| `outcomes` | string[] | Yes | List of learning outcome titles. |
| `tasks` | object[] | Yes | List of task objects (description, solution_type, testCases, etc.). |
| `outcome_messages` | string[] | No | Pre-held teaching message per outcome. If present, length must equal `outcomes.length`. |

### Optional: `outcome_messages`

When you add pre-held AI (or human-authored) teaching content per outcome, add an array **`outcome_messages`** to the topic:

- Same length as `outcomes`.
- `outcome_messages[i]` = full teaching message (string) for `outcomes[i]`.
- Consumers can use this for outcome-by-outcome teaching without generating content on the fly.

Example (conceptual):

```js
export default {
  id: 'console-log',
  title: 'console.log',
  outcomes: ['Basic syntax', 'String literals'],
  outcome_messages: [
    'Use console.log() to print values. Put the value inside the parentheses...',
    'Strings can use single or double quotes...'
  ],
  tasks: [/* ... */]
}
```

## Order

- **Single source of truth:** `order.js` exports `TOPIC_ORDER` (array of topic ids).
- The barrel `index.js` imports all topic modules and assembles the final `topics` array in that order.
- To reorder: edit only `order.js`. To add a topic: add the file, add the id to `order.js`, and add the import + entry in `index.js`.

## Validation

When the barrel is loaded it:

- Ensures every id in `TOPIC_ORDER` has a matching topic.
- Validates each topic has `id`, `title`, `outcomes`, `tasks`.
- If `outcome_messages` is present, checks its length equals `outcomes.length`.

Errors throw at load time so misconfigurations are caught immediately.
