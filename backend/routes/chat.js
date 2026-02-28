/**
 * Chat Routes - Sara Learning Platform
 * Single-topic chat functionality with enhanced AI interactions
 */

import express from 'express'
import fs from 'fs'
import path from 'path'
import { authenticateToken } from './auth.js'
import { callAI, streamAI } from '../services/ai.js'
import { getChatHistory, saveChatTurn, saveInitialMessage, clearChatHistory, getLastNExchangesAsMessages } from '../services/chatService.js'
import { getChatSessionRow, getCompletedTopics, getProgress, upsertProgress } from '../services/database.js'
import { courses } from '../../data/curriculum.js'
import { formatLearningObjectives, findTopicById } from '../utils/curriculum.js'
import { getTopicOrRespond } from '../utils/topicHelper.js'
import { handleErrorResponse, createSuccessResponse, createErrorResponse, getSafeUserMessage } from '../utils/responses.js'
import { rateLimitMiddleware } from '../middleware/rateLimiting.js'
import { buildSessionPrompt as buildSessionPromptFromShared } from '../prompts/prompts.js'

const router = express.Router()

// ============ VALIDATION FUNCTIONS ============
function validateChatRequest(req, res) {
  const { message, topicId } = req.body

  // topicId is always required
  if (!topicId?.trim?.()) {
    res.status(400).json(createErrorResponse('topicId is required'))
    return false
  }

  // message is required but can be empty string for session initialization
  if (message === undefined || message === null) {
    res.status(400).json(createErrorResponse('message is required'))
    return false
  }

  return true
}

// ============ PROMPT BUILDING FUNCTIONS ============

function buildSessionSystemPrompt(topicId, completedTopics = []) {
  const topic = findTopicById(courses, topicId)
  if (!topic) {
    throw new Error(`Topic not found: ${topicId}`)
  }
  const goals = formatLearningObjectives(topic.outcomes)
  const completedList = completedTopics.length > 0
    ? `\n\nCompleted Topics: ${completedTopics.join(', ')}`
    : ''
  return buildSessionPromptFromShared({
    topicTitle: topic.title,
    goals,
    completedList
  })
}

// ============ CHAT ENDPOINTS ============

// Streaming route MUST be before /session so Express matches /session/stream first
// Streaming session chat - streams tokens to frontend for instant perceived speed
router.post('/session/stream', authenticateToken, rateLimitMiddleware, async (req, res) => {
  try {
    if (!validateChatRequest(req, res)) { return }

    const { message, topicId } = req.body
    const userId = req.user.userId

    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    let progress = await getProgress(userId, topicId)
    if (!progress) {
      await upsertProgress(userId, topicId, {
        phase: 'session',
        status: 'in_progress',
        updated_at: new Date().toISOString()
      })
      progress = await getProgress(userId, topicId)
    }

    if (progress && (progress.phase === 'assignment' || progress.topic_completed === true)) {
      return res.status(400).json(createErrorResponse('Session already completed. You can view the conversation but cannot send new messages.', 'SESSION_ALREADY_COMPLETE'))
    }

    const [chatHistory, completedTopics] = await Promise.all([
      getChatHistory(userId, topicId),
      getCompletedTopics(userId)
    ])

    const systemPrompt = buildSessionSystemPrompt(topicId, completedTopics)
    const historyMessages = getLastNExchangesAsMessages(chatHistory)
    const userContent = message.trim() || 'Start teaching the first concept.'

    const messages = [
      { role: 'system', content: systemPrompt },
      ...historyMessages,
      { role: 'user', content: userContent }
    ]

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders()

    let fullResponse = ''
    const completionPhrases = ['Congratulations', "You've Mastered", 'ready for the playground']

    try {
      for await (const chunk of streamAI(messages, 1500, 0.5)) {
        fullResponse += chunk
        res.write(`data: ${JSON.stringify({ type: 'chunk', content: chunk })}\n\n`)
        if (typeof res.flush === 'function') res.flush()
      }
    } catch (streamErr) {
      res.write(`data: ${JSON.stringify({ type: 'error', message: streamErr.message || 'Stream failed' })}\n\n`)
      res.end()
      return
    }

    const cleanedResponse = fullResponse.trim()
    const isSessionComplete = completionPhrases.some(phrase => cleanedResponse.includes(phrase))

    let saveResult
    if (message.trim()) {
      saveResult = await saveChatTurn(userId, topicId, message.trim(), cleanedResponse)
    } else {
      saveResult = await saveInitialMessage(userId, topicId, cleanedResponse)
    }

    const savedMessages = Array.isArray(saveResult) ? saveResult : (saveResult?.messages ?? [])

    if (isSessionComplete) {
      try {
        await upsertProgress(userId, topicId, {
          phase: 'assignment',
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
      } catch (_) { /* ignore */ }
    }

    res.write(`data: ${JSON.stringify({
      type: 'done',
      response: cleanedResponse,
      messages: savedMessages,
      messageCount: savedMessages.length,
      conversationHistory: savedMessages.map(m =>
        `${m.role === 'user' ? 'USER' : 'AGENT'}: ${(m.content || '').trim()}`
      ).join('\n'),
      sessionComplete: isSessionComplete,
      nextPhase: isSessionComplete ? 'assignment' : null,
      topic: { id: topicId, title: topic.title, category: topic.category }
    })}\n\n`)
    res.end()
  } catch (error) {
    if (!res.headersSent) {
      handleErrorResponse(res, error, 'session chat stream')
    } else {
      res.write(`data: ${JSON.stringify({ type: 'error', message: getSafeUserMessage(error) })}\n\n`)
      res.end()
    }
  }
})

// Non-streaming session chat (fallback)
router.post('/session', authenticateToken, rateLimitMiddleware, async (req, res) => {
  try {
    if (!validateChatRequest(req, res)) { return }

    const { message, topicId } = req.body
    const userId = req.user.userId

    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) { return }

    let progress = await getProgress(userId, topicId)
    if (!progress) {
      await upsertProgress(userId, topicId, {
        phase: 'session',
        status: 'in_progress',
        updated_at: new Date().toISOString()
      })
      progress = await getProgress(userId, topicId)
    }

    if (progress && (progress.phase === 'assignment' || progress.topic_completed === true)) {
      return res.status(400).json(createErrorResponse('Session already completed. You can view the conversation but cannot send new messages.', 'SESSION_ALREADY_COMPLETE'))
    }

    const [chatHistory, completedTopics] = await Promise.all([
      getChatHistory(userId, topicId),
      getCompletedTopics(userId)
    ])

    const systemPrompt = buildSessionSystemPrompt(topicId, completedTopics)
    const historyMessages = getLastNExchangesAsMessages(chatHistory)
    const userContent = message.trim() || 'Start teaching the first concept.'

    const messages = [
      { role: 'system', content: systemPrompt },
      ...historyMessages,
      { role: 'user', content: userContent }
    ]

    const aiResponse = await callAI(messages, 1500, 0.5)
    const completionPhrases = ['Congratulations', "You've Mastered", 'ready for the playground']
    const isSessionComplete = completionPhrases.some(phrase => aiResponse.includes(phrase))
    const cleanedResponse = aiResponse

    let saveResult
    if (message.trim()) {
      saveResult = await saveChatTurn(userId, topicId, message.trim(), cleanedResponse)
    } else {
      saveResult = await saveInitialMessage(userId, topicId, cleanedResponse)
    }

    // saveChatTurn returns messages array; saveInitialMessage returns { messages, ... }
    const savedMessages = Array.isArray(saveResult) ? saveResult : (saveResult?.messages ?? [])
    if (!savedMessages.length && message.trim()) {
      return res.status(500).json(createErrorResponse('Failed to save conversation'))
    }

    if (isSessionComplete) {
      try {
        await upsertProgress(userId, topicId, {
          phase: 'assignment',
          status: 'in_progress',
          updated_at: new Date().toISOString()
        })
      } catch (_) { /* ignore */ }
    }

    res.json(createSuccessResponse({
      response: cleanedResponse,
      messages: savedMessages,
      messageCount: savedMessages.length,
      conversationHistory: savedMessages.map(m =>
        `${m.role === 'user' ? 'USER' : 'AGENT'}: ${(m.content || '').trim()}`
      ).join('\n'),
      phase: 'session',
      sessionComplete: isSessionComplete,
      nextPhase: isSessionComplete ? 'assignment' : null,
      topic: { id: topicId, title: topic.title, category: topic.category }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'session chat')
  }
})

// ============ CHAT HISTORY MANAGEMENT ============

// Debug: Get raw chat history from database
router.get('/debug/history/:topicId', authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.user.userId

    const data = await getChatSessionRow(userId, topicId)
    res.json(createSuccessResponse({
      raw_data: data,
      messages_type: typeof data?.messages,
      messages_content: data?.messages
    }))

  } catch (error) {
    handleErrorResponse(res, error, 'get debug history')
  }
})

router.get('/history/:topicId', authenticateToken, async (req, res) => {
  const startTime = Date.now()

  try {
    const { topicId } = req.params
    const userId = req.user.userId

    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) {return}

    const messages = await getChatHistory(userId, topicId)
    const duration = Date.now() - startTime

    // Add performance metrics to response
    res.json(createSuccessResponse({
      messages,
      messageCount: messages.length,
      topic: {
        id: topicId,
        title: topic.title,
        category: topic.category
      },
      performance: {
        retrievalTime: duration,
        cached: duration < 100 // Likely cached if very fast
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get chat history')
  }
})

// Cache statistics endpoint
router.get('/cache/stats', authenticateToken, async (req, res) => {
  try {
    const { getCacheStats } = await import('../services/chatCache.js')
    const stats = await getCacheStats()

    res.json(createSuccessResponse({
      cache: stats,
      timestamp: new Date().toISOString()
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'get cache stats')
  }
})

router.delete('/history/:topicId', authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.user.userId

    // Validate topic exists
    const topic = getTopicOrRespond(res, courses, topicId, createErrorResponse)
    if (!topic) {return}

    await clearChatHistory(userId, topicId)


    res.json(createSuccessResponse({
      message: 'Chat history cleared successfully',
      topic: {
        id: topicId,
        title: topic.title,
        category: topic.category
      }
    }))
  } catch (error) {
    handleErrorResponse(res, error, 'clear chat history')
  }
})

// Manual completion endpoint (testing / dev)
router.post('/complete/:topicId', authenticateToken, async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.user.userId

    // Update progress: session complete → assignment phase (2-phase model)
    await upsertProgress(userId, topicId, {
      status: 'in_progress',
      phase: 'assignment',
      updated_at: new Date().toISOString()
    })

    // Add completion message to chat history
    const completionMessage = `Congratulations! You've Mastered ${topicId}!\n\nYou have successfully completed all learning objectives. Ready for the next phase!`

    await saveChatTurn(userId, topicId, 'MANUAL_COMPLETION', completionMessage)

    res.json(createSuccessResponse({
      message: 'Session completed successfully',
      phase: 'assignment',
      sessionComplete: true
    }))

  } catch (error) {
    handleErrorResponse(res, error, 'complete session')
  }
})

export default router