/**
 * Environment validation – fails fast at startup if required variables are missing or invalid.
 * Optional defaults are applied when not set.
 */

const REQUIRED_VARS = ['JWT_SECRET', 'DATABASE_URL', 'GROQ_API_KEY']

const OPTIONAL_DEFAULTS = {
  PORT: '5000',
  FRONTEND_URL: 'http://localhost:5173'
}

function isDatabaseUrlPlaceholder(url) {
  if (!url || typeof url !== 'string') return true
  if (url.includes('your_') || url.includes('placeholder')) return true
  if (/:\/\/USER:PASSWORD@/.test(url)) return true
  return false
}

export function validateEnv() {
  const missing = REQUIRED_VARS.filter((name) => !process.env[name])
  if (missing.length > 0) {
    console.error('\nMissing required environment variables:', missing.join(', '))
    console.error('Create a .env file in the backend folder with these variables.\n')
    process.exit(1)
  }
  const dbUrl = process.env.DATABASE_URL
  if (isDatabaseUrlPlaceholder(dbUrl)) {
    console.error('\nDATABASE_URL is missing or still a placeholder.')
    console.error('Get your connection string from Neon Console → your project → Connection details → copy the connection string.')
    console.error('Set DATABASE_URL=postgresql://... in backend/.env.\n')
    process.exit(1)
  }
  for (const [name, value] of Object.entries(OPTIONAL_DEFAULTS)) {
    if (!process.env[name]) process.env[name] = value
  }
  return true
}






