/**
 * Debug Schema Route - Check Current Database Structure (Neon/Postgres)
 */

import express from 'express'
import { getSupabaseClient } from '../services/database.js'
import { query } from '../services/db.js'

const router = express.Router()
const TABLES = ['users', 'progress', 'chat_sessions', 'admins', 'user_course_unlocks']

function blockInProduction(req, res, next) {
  if (process.env.NODE_ENV === 'production') {
    return res.status(404).json({ success: false, message: 'Not found' })
  }
  next()
}

// Get current database schema information
router.get('/schema', blockInProduction, async (req, res) => {
  try {
    if (getSupabaseClient() === 'DEV_MODE') {
      return res.json({
        mode: 'development',
        message: 'Running in development mode - using in-memory database',
        tables: { users: 'In-memory Map', progress: 'In-memory Map', chat_sessions: 'In-memory Map' }
      })
    }

    const schemaInfo = {}
    const existingTables = []
    for (const tableName of TABLES) {
      try {
        const { rows } = await query(`SELECT * FROM ${tableName} LIMIT 1`)
        existingTables.push(tableName)
        schemaInfo[tableName] = {
          status: 'exists',
          has_data: rows && rows.length > 0,
          sample_record: rows?.[0] || null
        }
      } catch (err) {
        schemaInfo[tableName] = { status: 'error', error: err.message }
      }
    }

    res.json({
      mode: 'production',
      existing_tables: existingTables,
      schema: schemaInfo,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({
      error: 'Failed to get schema information',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

// Test database connectivity
router.get('/test-db', blockInProduction, async (req, res) => {
  try {
    if (getSupabaseClient() === 'DEV_MODE') {
      return res.json({
        mode: 'development',
        status: 'connected',
        message: 'Development mode - in-memory database working'
      })
    }
    const { rows } = await query('SELECT id FROM users LIMIT 1')
    res.json({
      mode: 'production',
      status: 'connected',
      has_users: rows && rows.length > 0,
      message: 'Database connection successful'
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message,
      timestamp: new Date().toISOString()
    })
  }
})

export default router