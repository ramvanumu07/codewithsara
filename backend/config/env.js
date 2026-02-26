/**
 * Environment validation – fails fast at startup if required variables are missing or invalid.
 * Optional defaults are applied when not set.
 */

const REQUIRED_VARS = ['JWT_SECRET', 'DATABASE_URL']

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

const isServerless = !!(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME)

export function validateEnv() {
  const missing = REQUIRED_VARS.filter((name) => !process.env[name])
  if (missing.length > 0) {
    const msg = `Missing required environment variables: ${missing.join(', ')}. Set them in Netlify Dashboard → Site settings → Environment variables.`
    console.error('\n' + msg + '\n')
    if (isServerless) throw new Error(msg)
    process.exit(1)
  }
  const dbUrl = process.env.DATABASE_URL
  if (isDatabaseUrlPlaceholder(dbUrl)) {
    const msg = 'DATABASE_URL is missing or still a placeholder. Get your connection string from Neon Console → Connection details.'
    console.error('\n' + msg + '\n')
    if (isServerless) throw new Error(msg)
    process.exit(1)
  }
  for (const [name, value] of Object.entries(OPTIONAL_DEFAULTS)) {
    if (!process.env[name]) process.env[name] = value
  }
  if (!process.env.GROQ_API_KEY?.trim()) {
    console.warn('\nGROQ_API_KEY is not set. Session chat and AI features will fail.')
    console.warn('Get a key at console.groq.com → API keys. Add GROQ_API_KEY=... to backend/.env\n')
  }
  return true
}






