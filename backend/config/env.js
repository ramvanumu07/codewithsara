/**
 * Environment validation – fails fast at startup if required variables are missing.
 * Optional defaults are applied when not set.
 */

const REQUIRED_VARS = [
  'JWT_SECRET',
  'SUPABASE_URL',
  'SUPABASE_SERVICE_KEY',
  'GROQ_API_KEY'
]

const OPTIONAL_DEFAULTS = {
  PORT: '5000',
  FRONTEND_URL: 'http://localhost:5173'
}

export function validateEnv() {
  const missing = REQUIRED_VARS.filter((name) => !process.env[name])

  if (missing.length > 0) {
    console.error('\nMissing required environment variables:', missing.join(', '))
    console.error('Create a .env file in the backend folder with these variables.\n')
    process.exit(1)
  }

  for (const [name, value] of Object.entries(OPTIONAL_DEFAULTS)) {
    if (!process.env[name]) {
      process.env[name] = value
    }
  }

  return true
}






