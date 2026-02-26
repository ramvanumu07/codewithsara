/**
 * AI Service - Groq API (OpenAI-compatible)
 * Uses Llama 3.1 8B via Groq - fast inference, free tier available.
 */

const GROQ_BASE = 'https://api.groq.com/openai/v1'
const DEFAULT_MODEL = process.env.GROQ_MODEL || 'llama-3.1-8b-instant'

/** Convert to OpenAI-compatible messages (system, user, assistant) */
function toMessages(messages) {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'system' : 'user',
    content: msg.content || ''
  }))
}

// ============ AI OPERATIONS ============

/**
 * Call AI and return full response (for hint, feedback, session start).
 */
export async function callAI(messages, maxTokens = 1000, temperature = 0.5, model = undefined) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey?.trim()) {
    throw new Error('AI configuration missing. Check GROQ_API_KEY in backend/.env')
  }

  const modelToUse = (model || DEFAULT_MODEL).trim()

  try {
    const chatMessages = toMessages(messages)

    const response = await fetch(`${GROQ_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: chatMessages,
        max_tokens: maxTokens,
        temperature
      })
    })

    if (!response.ok) {
      const errBody = await response.text()
      let errMsg = `Groq API error: ${response.status}`
      try {
        const errJson = JSON.parse(errBody)
        if (errJson?.error?.message) errMsg = errJson.error.message
        else if (errJson?.message) errMsg = errJson.message
      } catch {
        if (errBody && errBody.length < 200) errMsg = errBody
      }
      const err = new Error(errMsg)
      err.status = response.status
      throw err
    }

    const data = await response.json()
    const text = data?.choices?.[0]?.message?.content || ''

    if (!text.trim()) {
      throw new Error('Empty response from AI service')
    }

    return text.trim()
  } catch (error) {
    const friendly = toFriendlyError(error)
    if (friendly) throw friendly
    throw error
  }
}

function toFriendlyError(error) {
  const msg = (error?.message || '').toLowerCase()
  if (msg.includes('invalid') && (msg.includes('key') || msg.includes('api'))) return new Error('Groq API key is invalid. Check GROQ_API_KEY in backend/.env')
  if (msg.includes('401') || error?.status === 401) return new Error('Groq API authentication failed. Check GROQ_API_KEY in backend/.env')
  if (msg.includes('404') || msg.includes('not found')) return new Error('Groq model not found. Try GROQ_MODEL=llama-3.1-8b-instant in backend/.env')
  if (msg.includes('quota') || msg.includes('rate limit')) return new Error('Groq rate limit exceeded. Check console.groq.com for usage.')
  return null
}

/**
 * Stream AI response, yielding each content chunk.
 */
export async function * streamAI(messages, maxTokens = 1000, temperature = 0.5, model = undefined) {
  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey?.trim()) {
    throw new Error('AI configuration missing. Check GROQ_API_KEY in backend/.env')
  }

  const modelToUse = (model || DEFAULT_MODEL).trim()
  const chatMessages = toMessages(messages)

  const response = await fetch(`${GROQ_BASE}/chat/completions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: modelToUse,
      messages: chatMessages,
      max_tokens: maxTokens,
      temperature,
      stream: true
    })
  })

  if (!response.ok) {
    const errBody = await response.text()
    let errMsg = `Groq API error: ${response.status}`
    try {
      const errJson = JSON.parse(errBody)
      if (errJson?.error?.message) errMsg = errJson.error.message
      else if (errJson?.message) errMsg = errJson.message
    } catch {
      if (errBody && errBody.length < 200) errMsg = errBody
    }
    const err = new Error(errMsg)
    err.status = response.status
    const friendly = toFriendlyError(err)
    throw friendly || err
  }

  const reader = response.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''
      for (const line of lines) {
        if (!line.startsWith('data: ')) continue
        const data = line.slice(6)
        if (data === '[DONE]' || data === '') continue
        try {
          const parsed = JSON.parse(data)
          const content = parsed?.choices?.[0]?.delta?.content
          if (content) yield content
        } catch {
          // ignore parse errors
        }
      }
    }
  } finally {
    reader.releaseLock()
  }
}
