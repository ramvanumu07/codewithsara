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
import { getChatSessionRow, getCompletedTopics, getProgress, getProgressRowForCourse, upsertProgress } from '../services/database.js'
import { courses } from '../data/curriculum.js'
import { findTopicById } from '../utils/curriculum.js'
import { getTopicOrRespond } from '../utils/topicHelper.js'
import { getFirstOutcomeMessage } from '../utils/outcomeMessages.js'
import { processSessionAssistantReply } from '../utils/sessionOutcome.js'
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

function teachingOutcomeIndexFromProgress(topic, progress) {
  const storedRaw = Number(progress?.current_outcome_index ?? 0) || 0
  const olen = (topic.outcomes || []).length
  const mlen = (topic.outcome_messages || []).length
  const total = Math.max(olen, mlen, 1)
  const maxIdx = Math.max(0, total - 1)
  return Math.min(Math.max(0, storedRaw), maxIdx)
}

function buildSessionSystemPrompt(topicId, completedTopics = [], teachingOutcomeIndex = 0) {
  const topic = findTopicById(courses, topicId)
  if (!topic) {
    throw new Error(`Topic not found: ${topicId}`)
  }
  const outcomes = topic.outcomes || []
  const msgs = topic.outcome_messages || []
  const total = Math.max(outcomes.length, msgs.length, 1)
  const idx = Math.min(Math.max(0, teachingOutcomeIndex), Math.max(0, total - 1))
  const singleObjective = outcomes[idx] || `Learning objective ${idx + 1}`
  return buildSessionPromptFromShared({
    topicTitle: topic.title,
    currentOutcomeObjective: singleObjective,
    outcomeIndexOneBased: idx + 1,
    outcomeTotal: total
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

    const courseId = topic.courseId
    let progress = await getProgress(userId, topicId, courseId)
    if (!progress) {
      await upsertProgress(userId, topicId, {
        phase: 'session',
        status: 'in_progress',
        updated_at: new Date().toISOString()
      }, courseId)
      progress = await getProgress(userId, topicId, courseId)
    }

    if (progress && (progress.phase === 'assignment' || progress.topic_completed === true)) {
      return res.status(400).json(createErrorResponse('Session already completed. You can view the conversation but cannot send new messages.', 'SESSION_ALREADY_COMPLETE'))
    }

    const [chatHistory, completedTopics] = await Promise.all([
      getChatHistory(userId, topicId, courseId),
      getCompletedTopics(userId, courseId)
    ])

    const completionPhrases = ['Congratulations', "You've Mastered", 'ready for the playground']
    const teachingIdx = teachingOutcomeIndexFromProgress(topic, progress)

    const useCurriculumFirst =
      !message.trim() && (!chatHistory || chatHistory.length === 0)
    const firstFromCurriculum = useCurriculumFirst ? getFirstOutcomeMessage(topic) : null

    let cleanedResponse = ''

    if (useCurriculumFirst) {
      if (!firstFromCurriculum) {
        return res.status(400).json(
          createErrorResponse(
            'This topic has no first outcome message. Add outcome_messages[0] in the curriculum.',
            'MISSING_OUTCOME_MESSAGES'
          )
        )
      }
      cleanedResponse = firstFromCurriculum
    } else {
      const systemPrompt = buildSessionSystemPrompt(topicId, completedTopics, teachingIdx)
      const historyMessages = getLastNExchangesAsMessages(chatHistory)
      const userContent = message.trim() || 'Start teaching the first concept.'
      const messages = [
        { role: 'system', content: systemPrompt },
        ...historyMessages,
        { role: 'user', content: userContent }
      ]
      try {
        let rawAccum = ''
        for await (const chunk of streamAI(messages, 1500, 0.5)) {
          rawAccum += chunk
        }
        cleanedResponse = rawAccum.trim()
      } catch (streamErr) {
        return handleErrorResponse(res, streamErr, 'session chat stream')
      }
    }

    const userMessaged = Boolean(message.trim())
    const processed = processSessionAssistantReply(cleanedResponse, topic, teachingIdx, userMessaged)
    const finalResponse = processed.finalText

    if (processed.newOutcomeIndex !== teachingIdx) {
      try {
        await upsertProgress(userId, topicId, {
          current_outcome_index: processed.newOutcomeIndex,
          updated_at: new Date().toISOString()
        }, courseId)
      } catch (_) { /* ignore */ }
    }

    const isSessionComplete = processed.sessionComplete ||
      completionPhrases.some(phrase => finalResponse.includes(phrase))

    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Cache-Control', 'no-cache')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('X-Accel-Buffering', 'no')
    res.flushHeaders()

    res.write(`data: ${JSON.stringify({ type: 'chunk', content: finalResponse })}\n\n`)
    if (typeof res.flush === 'function') res.flush()

    let saveResult
    if (message.trim()) {
      saveResult = await saveChatTurn(userId, topicId, message.trim(), finalResponse, 'session', courseId)
    } else {
      saveResult = await saveInitialMessage(userId, topicId, finalResponse, 'session', courseId)
    }

    const savedMessages = Array.isArray(saveResult) ? saveResult : (saveResult?.messages ?? [])

    if (isSessionComplete) {
      try {
        await upsertProgress(userId, topicId, {
          phase: 'assignment',
          status: 'in_progress',
          updated_at: new Date().toISOString()
        }, courseId)
      } catch (_) { /* ignore */ }
    }

    res.write(`data: ${JSON.stringify({
      type: 'done',
      response: finalResponse,
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

    const courseId = topic.courseId
    let progress = await getProgress(userId, topicId, courseId)
    if (!progress) {
      await upsertProgress(userId, topicId, {
        phase: 'session',
        status: 'in_progress',
        updated_at: new Date().toISOString()
      }, courseId)
      progress = await getProgress(userId, topicId, courseId)
    }

    if (progress && (progress.phase === 'assignment' || progress.topic_completed === true)) {
      return res.status(400).json(createErrorResponse('Session already completed. You can view the conversation but cannot send new messages.', 'SESSION_ALREADY_COMPLETE'))
    }

    const [chatHistory, completedTopics] = await Promise.all([
      getChatHistory(userId, topicId, courseId),
      getCompletedTopics(userId, courseId)
    ])

    const completionPhrases = ['Congratulations', "You've Mastered", 'ready for the playground']
    const teachingIdx = teachingOutcomeIndexFromProgress(topic, progress)

    const useCurriculumFirst =
      !message.trim() && (!chatHistory || chatHistory.length === 0)
    let cleanedResponse

    if (useCurriculumFirst) {
      const first = getFirstOutcomeMessage(topic)
      if (!first) {
        return res.status(400).json(
          createErrorResponse(
            'This topic has no first outcome message. Add outcome_messages[0] in the curriculum.',
            'MISSING_OUTCOME_MESSAGES'
          )
        )
      }
      cleanedResponse = first
    } else {
      const systemPrompt = buildSessionSystemPrompt(topicId, completedTopics, teachingIdx)
      const historyMessages = getLastNExchangesAsMessages(chatHistory)
      const userContent = message.trim() || 'Start teaching the first concept.'
      const messages = [
        { role: 'system', content: systemPrompt },
        ...historyMessages,
        { role: 'user', content: userContent }
      ]
      const aiResponse = await callAI(messages, 1500, 0.5)
      cleanedResponse = aiResponse
    }

    const userMessaged = Boolean(message.trim())
    const processed = processSessionAssistantReply(cleanedResponse, topic, teachingIdx, userMessaged)
    const finalResponse = processed.finalText

    if (processed.newOutcomeIndex !== teachingIdx) {
      try {
        await upsertProgress(userId, topicId, {
          current_outcome_index: processed.newOutcomeIndex,
          updated_at: new Date().toISOString()
        }, courseId)
      } catch (_) { /* ignore */ }
    }

    const isSessionComplete = processed.sessionComplete ||
      completionPhrases.some(phrase => finalResponse.includes(phrase))

    let saveResult
    if (message.trim()) {
      saveResult = await saveChatTurn(userId, topicId, message.trim(), finalResponse, 'session', courseId)
    } else {
      saveResult = await saveInitialMessage(userId, topicId, finalResponse, 'session', courseId)
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
        }, courseId)
      } catch (_) { /* ignore */ }
    }

    res.json(createSuccessResponse({
      response: finalResponse,
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
    const topicMeta = findTopicById(courses, topicId)
    const courseId = topicMeta?.courseId

    const data = await getChatSessionRow(userId, topicId, courseId)
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
    if (!topic) { return }

    const messages = await getChatHistory(userId, topicId, topic.courseId)
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
    if (!topic) { return }

    await clearChatHistory(userId, topicId, topic.courseId)

    const row = await getProgressRowForCourse(userId, topic.courseId)
    if (row && String(row.topic_id) === String(topicId)) {
      try {
        await upsertProgress(userId, topicId, {
          current_outcome_index: 0,
          updated_at: new Date().toISOString()
        }, topic.courseId)
      } catch (_) { /* ignore */ }
    }

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
    const topicMeta = findTopicById(courses, topicId)
    if (!topicMeta) {
      return res.status(404).json(createErrorResponse('Topic not found'))
    }
    const courseId = topicMeta.courseId

    // Update progress: session complete → assignment phase (2-phase model)
    await upsertProgress(userId, topicId, {
      status: 'in_progress',
      phase: 'assignment',
      updated_at: new Date().toISOString()
    }, courseId)

    // Add completion message to chat history
    const completionMessage = `Congratulations! You've Mastered ${topicMeta.title || topicId}!\n\nYou have successfully completed all learning objectives. Ready for the next phase!`

    await saveChatTurn(userId, topicId, 'MANUAL_COMPLETION', completionMessage, 'session', courseId)

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