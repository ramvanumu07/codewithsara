/**
 * Database Maintenance Script
 * Sara Learning Platform
 * Uses Neon (Postgres). Set DATABASE_URL in .env.
 */

import dotenv from 'dotenv'
import { query, isDatabaseConfigured } from '../services/db.js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

function requireDatabase() {
  if (!isDatabaseConfigured()) {
    console.error('Missing database configuration')
    console.error('   Please set DATABASE_URL (Neon connection string) in your .env file')
    process.exit(1)
  }
}

// Health check function
async function healthCheck() {
  console.log('🏥 Running database health check...\n')
  requireDatabase()

  try {
    await query('SELECT 1')
    console.log('Database connection: OK')

    const tables = ['users', 'progress', 'chat_sessions', 'admins', 'user_course_unlocks']
    for (const table of tables) {
      try {
        await query(`SELECT 1 FROM ${table} LIMIT 1`)
        console.log(`Table ${table}: OK`)
      } catch (err) {
        console.log(`Table ${table}: ERROR - ${err.message}`)
      }
    }

    console.log('\nChecking for critical issues...')
    try {
      const { rows } = await query(
        'SELECT count(*) AS c FROM progress WHERE id IS NULL OR user_id IS NULL OR topic_id IS NULL'
      )
      const nullCount = parseInt(rows[0]?.c || '0', 10)
      if (nullCount > 0) {
        console.log(`Found ${nullCount} progress records with NULL critical fields`)
      } else {
        console.log('Progress table integrity: OK')
      }
    } catch {
      console.log('Progress table integrity: skip (table may not exist)')
    }

    console.log('\nHealth check complete!')
  } catch (error) {
    console.error('Health check failed:', error.message)
    process.exit(1)
  }
}

// Run comprehensive fix
async function runComprehensiveFix() {
  console.log('🔧 Running comprehensive database fix...\n')
  console.log('This will modify your database structure.')
  console.log('   Make sure you have a backup before proceeding!\n')
  requireDatabase()

  const sqlPath = join(__dirname, '../database/comprehensive-database-fix.sql')
  if (!existsSync(sqlPath)) {
    console.log('⚠️  SQL file not found: database/comprehensive-database-fix.sql')
    console.log('   Run your schema/fix SQL manually in the Neon SQL Editor if needed.\n')
    return
  }

  try {
    const sql = readFileSync(sqlPath, 'utf8')
    console.log('📝 Executing comprehensive database fix...')
    await query(sql)
    console.log('Comprehensive fix completed successfully!')
    console.log('\nRunning post-fix health check...')
    await healthCheck()
  } catch (error) {
    console.error('Comprehensive fix failed:', error.message)
    console.error('\n💡 You may need to run the SQL manually in Neon SQL Editor')
    process.exit(1)
  }
}

// Clean up old data
async function cleanup() {
  console.log('🧹 Running database cleanup...\n')
  requireDatabase()
  try {
    console.log('Cleanup complete (no session/token/analytics tables to clean).')
  } catch (error) {
    console.error('Cleanup failed:', error.message)
    process.exit(1)
  }
}

// Show statistics
async function showStats() {
  console.log('Database Statistics\n')
  requireDatabase()

  try {
    const { rows: users } = await query('SELECT count(*) AS count FROM users')
    console.log(`👥 Total Users: ${users?.[0]?.count ?? 0}`)

    const { rows: progress } = await query('SELECT count(*) AS count FROM progress')
    const { rows: completed } = await query("SELECT count(*) AS count FROM progress WHERE status = 'completed'")
    console.log(`📚 Total Progress Records: ${progress?.[0]?.count ?? 0}`)
    console.log(`Completed Topics: ${completed?.[0]?.count ?? 0}`)

    const { rows: chatSessions } = await query('SELECT count(*) AS count FROM chat_sessions')
    console.log(`💬 Chat Sessions: ${chatSessions?.[0]?.count ?? 0}`)

    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
    const { rows: recentLogins } = await query(
      'SELECT count(*) AS count FROM users WHERE last_login >= $1',
      [weekAgo]
    )
    console.log(`Users active in last 7 days: ${recentLogins?.[0]?.count ?? 0}`)
  } catch (error) {
    console.error('Failed to get statistics:', error.message)
  }
}

// Main function
async function main() {
  const command = process.argv[2]
  console.log('Sara Learning Platform - Database Maintenance\n')

  switch (command) {
    case 'health':
      await healthCheck()
      break
    case 'fix':
      await runComprehensiveFix()
      break
    case 'cleanup':
      await cleanup()
      break
    case 'stats':
      await showStats()
      break
    default:
      console.log('Available commands:')
      console.log('  health  - Run database health check')
      console.log('  fix     - Run comprehensive database fix')
      console.log('  cleanup - Clean up old/expired data')
      console.log('  stats   - Show database statistics')
      console.log('')
      console.log('Usage: node database-maintenance.js <command>')
      break
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error)
}

export { healthCheck, runComprehensiveFix, cleanup, showStats }
