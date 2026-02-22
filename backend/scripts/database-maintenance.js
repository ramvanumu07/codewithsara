
/**
 * Database Maintenance Script
 * Sara Learning Platform
 * 
 * Provides utilities for database maintenance and health checks
 */

import dotenv from 'dotenv'
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Database client
function getSupabaseClient() {
  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY

  if (!supabaseUrl || !supabaseKey) {
    console.error('Missing database configuration')
    console.error('   Please set SUPABASE_URL and SUPABASE_SERVICE_KEY in your .env file')
    process.exit(1)
  }

  return createClient(supabaseUrl, supabaseKey, {
    db: { schema: 'public' },
    auth: { autoRefreshToken: false, persistSession: false }
  })
}

// Health check function
async function healthCheck() {
  console.log('🏥 Running database health check...\n')
  
  const client = getSupabaseClient()
  
  try {
    // Test basic connectivity
    const { data: _connectionTest, error: connectionError } = await client
      .from('users')
      .select('count(*)')
      .limit(1)
    
    if (connectionError) {
      throw new Error(`Connection failed: ${connectionError.message}`)
    }
    
    console.log('Database connection: OK')
    
    // Check table structures (user_sessions, password_reset_tokens, learning_analytics removed from app)
    const tables = ['users', 'progress', 'chat_sessions', 'admins', 'user_course_unlocks']
    
    for (const table of tables) {
      const { data: _data, error } = await client
        .from(table)
        .select('count(*)')
        .limit(1)
      
      if (error) {
        console.log(`Table ${table}: ERROR - ${error.message}`)
      } else {
        console.log(`Table ${table}: OK`)
      }
    }
    
    // Check for critical issues
    console.log('\nChecking for critical issues...')
    
    // Check progress table structure
    const { data: _progressCheck, error: progressError } = await client
      .rpc('check_progress_table_structure')
      .catch(() => null) // Function might not exist
    
    if (!progressError) {
      console.log('Progress table structure: OK')
    }
    
    // Check for NULL critical fields
    const { data: nullCheck } = await client
      .from('progress')
      .select('count(*)')
      .or('id.is.null,user_id.is.null,topic_id.is.null')
    
    const nullCount = nullCheck?.[0]?.count || 0
    if (nullCount > 0) {
      console.log(`Found ${nullCount} progress records with NULL critical fields`)
    } else {
      console.log('Progress table integrity: OK')
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

  const sqlPath = join(__dirname, '../database/comprehensive-database-fix.sql')
  if (!existsSync(sqlPath)) {
    console.log('⚠️  SQL file not found: database/comprehensive-database-fix.sql')
    console.log('   The database folder may have been removed.')
    console.log('   To run the fix, add the SQL file back or run your schema/fix SQL manually in the Supabase SQL Editor.\n')
    return
  }

  const client = getSupabaseClient()

  try {
    const sql = readFileSync(sqlPath, 'utf8')

    console.log('📝 Executing comprehensive database fix...')

    const { error } = await client.rpc('exec_sql', { sql_query: sql })

    if (error) {
      throw new Error(`Fix failed: ${error.message}`)
    }

    console.log('Comprehensive fix completed successfully!')
    console.log('\nRunning post-fix health check...')

    await healthCheck()
  } catch (error) {
    console.error('Comprehensive fix failed:', error.message)
    console.error('\n💡 You may need to run the SQL manually in Supabase SQL Editor')
    process.exit(1)
  }
}

// Clean up old data
async function cleanup() {
  console.log('🧹 Running database cleanup...\n')
  
  const client = getSupabaseClient()
  
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
  
  const client = getSupabaseClient()
  
  try {
    // User statistics
    const { data: users } = await client
      .from('users')
      .select('count(*)')
    
    console.log(`👥 Total Users: ${users?.[0]?.count || 0}`)
    
    // Progress statistics
    const { data: progress } = await client
      .from('progress')
      .select('count(*)')
    
    const { data: completedTopics } = await client
      .from('progress')
      .select('count(*)')
      .eq('status', 'completed')
    
    console.log(`📚 Total Progress Records: ${progress?.[0]?.count || 0}`)
    console.log(`Completed Topics: ${completedTopics?.[0]?.count || 0}`)
    
    // Chat statistics
    const { data: chatSessions } = await client
      .from('chat_sessions')
      .select('count(*)')
    
    console.log(`💬 Chat Sessions: ${chatSessions?.[0]?.count || 0}`)
    
    // Recent activity
    const { data: recentLogins } = await client
      .from('users')
      .select('count(*)')
      .gte('last_login', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    
    console.log(`Users active in last 7 days: ${recentLogins?.[0]?.count || 0}`)
    
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