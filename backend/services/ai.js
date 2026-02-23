/**
 * AI Service - Industry Level
 * Professional AI operations with proper error handling and streaming.
 * If the primary model is deprecated or unavailable, the next model in
 * AI_MODELS is tried automatically.
 */

import Groq from 'groq-sdk'

// ============ MODELS (primary → backups) ============
const AI_MODELS = [
  'llama-3.3-70b-versatile',
  'llama-3.1-70b-versatile',
  'llama-3.1-8b-instant'
]

// ============ GROQ CLIENT ============
let groq = null

function initializeAI() {
  if (groq) return groq

  const apiKey = process.env.GROQ_API_KEY

  if (!apiKey) {
    throw new Error('AI configuration missing. Check GROQ_API_KEY environment variable.')
  }

  groq = new Groq({ apiKey })
  return groq
}

/** List of models to try: optional override first, then AI_MODELS order. */
function getModelList(overrideModel) {
  if (overrideModel) {
    const rest = AI_MODELS.filter((m) => m !== overrideModel)
    return [overrideModel, ...rest]
  }
  return [...AI_MODELS]
}

/** True if the error is likely due to model deprecation or unavailability (try next model). */
function isModelUnavailableError(error) {
  const msg = (error.message || '').toLowerCase()
  const code = error.status || error.statusCode || error.code
  return (
    code === 404 ||
    msg.includes('model') && (msg.includes('not found') || msg.includes('deprecated') || msg.includes('invalid') || msg.includes('does not exist')) ||
    msg.includes('not available')
  )
}

// ============ AI OPERATIONS ============

export async function callAI(messages, maxTokens = 1000, temperature = 0.5, model = undefined) {
  const modelsToTry = getModelList(model)
  let lastError = null

  for (const tryModel of modelsToTry) {
    try {
      const client = initializeAI()

      const completion = await client.chat.completions.create({
        messages,
        model: tryModel,
        max_tokens: maxTokens,
        temperature,
        top_p: 0.9,
        stream: true
      })

      let fullResponse = ''
      for await (const chunk of completion) {
        const content = chunk.choices[0]?.delta?.content || ''
        fullResponse += content
      }

      if (!fullResponse.trim()) {
        throw new Error('Empty response from AI service')
      }

      return fullResponse.trim()
    } catch (error) {
      lastError = error
      if (isModelUnavailableError(error)) {
        continue
      }
      if (error.message?.includes('rate limit')) {
        throw new Error('AI service is busy. Please try again in a moment.')
      }
      if (error.message?.includes('quota')) {
        throw new Error('AI service quota exceeded. Please contact support.')
      }
      throw new Error('AI service temporarily unavailable. Please try again.')
    }
  }

  throw new Error('AI service temporarily unavailable. Please try again.')
}