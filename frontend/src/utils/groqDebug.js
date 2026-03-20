/**
 * When backend has DEBUG_GROQ_PAYLOAD=1, session responses include `data.groqDebug`.
 * Logs system prompt and conversation turns. Groq request = system + these messages (no duplicate system row in `messages`).
 */
export function logGroqDebugFromApi(data) {
  if (!data?.groqDebug) return
  const d = data.groqDebug
  console.groupCollapsed('%c[Sara] Groq payload (debug)', 'color:#7c3aed;font-weight:bold')
  if (d.note) {
    console.log(d.note)
  } else {
    console.log('System prompt:\n', d.systemPrompt)
    console.log('messages (user/assistant only; API prepends system above):', d.messages)
    if (d.max_tokens != null) {
      console.log('max_tokens:', d.max_tokens, 'temperature:', d.temperature)
    }
  }
  console.groupEnd()
}
