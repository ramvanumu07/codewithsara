/**
 * AI Service - Groq API (OpenAI-compatible)
 * Uses Llama models via Groq - fast inference, free tier available.
 * Model list is maintained in code (no env dependency). Falls back to next model if current is deprecated.
 */

const GROQ_BASE = 'https://api.groq.com/openai/v1'

/** Ordered list of models to try. First available wins; fallback on 404/deprecated. */
const GROQ_MODELS = [
  'llama-3.1-8b-instant',      // primary: fast, free tier
]

function getDefaultModel() {
  return GROQ_MODELS[0]
}

function getNextModel(currentModel) {
  const idx = GROQ_MODELS.indexOf(currentModel)
  if (idx === -1 || idx >= GROQ_MODELS.length - 1) return null
  return GROQ_MODELS[idx + 1]
}

function isModelNotFoundError(error) {
  const msg = (error?.message || '').toLowerCase()
  return error?.status === 404 || msg.includes('404') || msg.includes('not found') || msg.includes('deprecated')
}

/** Convert to OpenAI-compatible messages (system, user, assistant) */
function toMessages(messages) {
  return messages.map((msg) => ({
    role: msg.role === 'assistant' ? 'assistant' : msg.role === 'system' ? 'system' : 'user',
    content: msg.content || ''
  }))
}

function toFriendlyError(error) {
  const msg = (error?.message || '').toLowerCase()
  if (msg.includes('invalid') && (msg.includes('key') || msg.includes('api'))) return new Error('Groq API key is invalid. Check GROQ_API_KEY in backend/.env')
  if (msg.includes('401') || error?.status === 401) return new Error('Groq API authentication failed. Check GROQ_API_KEY in backend/.env')
  if (msg.includes('404') || msg.includes('not found')) return new Error(`Groq model not found. Tried: ${GROQ_MODELS.join(', ')}`)
  if (msg.includes('quota') || msg.includes('rate limit')) return new Error('Groq rate limit exceeded. Check console.groq.com for usage.')
  return null
}

// ============ AI OPERATIONS ============

/**
 * Call AI and return full response (for hint, feedback, session start).
 * Tries models in GROQ_MODELS order; falls back to next on 404/deprecated.
 */
export async function callAI(messages, maxTokens = 1000, temperature = 0.5, model = undefined) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey?.trim()) {
    throw new Error('AI configuration missing. Check GROQ_API_KEY in backend/.env')
  }

  const chatMessages = toMessages(messages)
  let modelToUse = (model && GROQ_MODELS.includes(model)) ? model : getDefaultModel()
  let lastError = null

  while (modelToUse) {
    try {
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
        if (isModelNotFoundError(err)) {
          lastError = err
          modelToUse = getNextModel(modelToUse)
          continue
        }
        throw err
      }

      const data = await response.json()
      const text = data?.choices?.[0]?.message?.content || ''
      if (!text.trim()) throw new Error('Empty response from AI service')
      return text.trim()
    } catch (error) {
      if (isModelNotFoundError(error)) {
        lastError = error
        modelToUse = getNextModel(modelToUse)
        continue
      }
      const friendly = toFriendlyError(error)
      throw friendly || error
    }
  }

  const friendly = toFriendlyError(lastError)
  throw friendly || lastError || new Error('All Groq models failed')
}

/**
 * Stream AI response, yielding each content chunk.
 * Tries models in GROQ_MODELS order; falls back to next on 404/deprecated.
 */
export async function * streamAI(messages, maxTokens = 1000, temperature = 0.5, model = undefined) {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey?.trim()) {
    throw new Error('AI configuration missing. Check GROQ_API_KEY in backend/.env')
  }

  const chatMessages = toMessages(messages)
  let modelToUse = (model && GROQ_MODELS.includes(model)) ? model : getDefaultModel()
  let lastError = null

  while (modelToUse) {
    try {
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
        if (isModelNotFoundError(err)) {
          lastError = err
          modelToUse = getNextModel(modelToUse)
          continue
        }
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
      return
    } catch (error) {
      if (isModelNotFoundError(error)) {
        lastError = error
        modelToUse = getNextModel(modelToUse)
        continue
      }
      const friendly = toFriendlyError(error)
      throw friendly || error
    }
  }

  const friendly = toFriendlyError(lastError)
  throw friendly || lastError || new Error('All Groq models failed')
}

/** Expose model list for debugging/admin. */
export { GROQ_MODELS, getDefaultModel }
