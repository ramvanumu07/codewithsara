/**
 * Debug Chat History Route - Check Chat Storage Format
 */

import express from 'express'
import { getSupabaseClient, getChatSessionRaw } from '../services/database.js'
import { getChatHistory } from '../services/chatService.js'

const router = express.Router()

// Debug chat history storage format (DEV: pass ?userId=... or uses first session).
router.get('/chat-history/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params
    const userId = req.query.userId || req.headers['x-debug-user-id'] || null
    if (!userId) {
      return res.status(400).json({
        error: 'Missing userId',
        message: 'Provide ?userId=... or X-Debug-User-Id header for this debug endpoint.'
      })
    }

    if (getSupabaseClient() === 'DEV_MODE') {
      return res.json({
        mode: 'development',
        message: 'Running in development mode - using in-memory database'
      })
    }

    const rawData = await getChatSessionRaw(userId, topicId)
    if (!rawData) {
      return res.json({
        status: 'no_history',
        message: 'No chat history found for this topic',
        userId,
        topicId
      })
    }

    // Get parsed data using chat service
    const parsedMessages = await getChatHistory(userId, topicId)

    // Analyze the raw messages format
    const rawMessages = rawData.messages
    const messageType = typeof rawMessages
    const isJson = (() => {
      try {
        JSON.parse(rawMessages)
        return true
      } catch {
        return false
      }
    })()

    // Count lines in text format
    const textLines = rawMessages ? rawMessages.split('\n').filter(line => line.trim() !== '') : []
    const userLines = textLines.filter(line => line.startsWith('USER: '))
    const agentLines = textLines.filter(line => line.startsWith('AGENT: '))

    res.json({
      status: 'found',
      userId,
      topicId,
      raw_data: {
        message_count: rawData.message_count,
        phase: rawData.phase,
        last_message_at: rawData.last_message_at,
        created_at: rawData.created_at,
        updated_at: rawData.updated_at
      },
      raw_messages: {
        type: messageType,
        is_json: isJson,
        length: rawMessages ? rawMessages.length : 0,
        preview: rawMessages ? rawMessages.substring(0, 500) + (rawMessages.length > 500 ? '...' : '') : null,
        text_analysis: {
          total_lines: textLines.length,
          user_lines: userLines.length,
          agent_lines: agentLines.length,
          sample_lines: textLines.slice(0, 5)
        }
      },
      parsed_messages: {
        count: parsedMessages.length,
        messages: parsedMessages.map(msg => ({
          role: msg.role,
          content: msg.content.substring(0, 100) + (msg.content.length > 100 ? '...' : ''),
          timestamp: msg.timestamp
        }))
      },
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    res.status(500).json({
      error: 'Failed to debug chat history',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Proxy to test GET /api/chat/history/:topicId; forward your Authorization header.
router.get('/test-frontend-api/:topicId', async (req, res) => {
  try {
    const { topicId } = req.params
    const authHeader = req.headers.authorization
    if (!authHeader) {
      return res.status(401).json({ error: 'Provide Authorization header to test chat history API' })
    }
    const base = process.env.API_BASE_URL || 'http://localhost:5000'
    const response = await fetch(`${base}/api/chat/history/${topicId}`, { headers: { Authorization: authHeader } })
    const data = await response.json()
    res.json({ status: 'frontend_api_test', api_response: data, timestamp: new Date().toISOString() })
  } catch (error) {
    res.status(500).json({ error: 'Frontend API test failed', message: error.message, timestamp: new Date().toISOString() })
  }
})

export default router