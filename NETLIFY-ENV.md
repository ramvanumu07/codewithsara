# Netlify environment variables – add these in one place

In Netlify: **Site → Site configuration → Environment variables → Add a variable** (or **Import from .env**).

Use the same values you have in `backend/.env`. Add every variable below.

---

## Required (must have)

| Variable | Example / where to get it |
|----------|---------------------------|
| **JWT_SECRET** | Long random string (e.g. from `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`) |
| **SUPABASE_URL** | `https://xxxxx.supabase.co` (Supabase project → Settings → API) |
| **SUPABASE_SERVICE_KEY** | Supabase project → Settings → API → `service_role` (secret) |
| **GROQ_API_KEY** | From [console.groq.com](https://console.groq.com) (API Keys) |

---

## Frontend (for build)

| Variable | Value on Netlify |
|----------|------------------|
| **VITE_API_BASE_URL** | Leave **empty** so the app uses same-origin `/api` (your Netlify URL). |

---

## Optional but recommended

| Variable | Value |
|----------|--------|
| **FRONTEND_URL** | Your Netlify site URL, e.g. `https://your-site-name.netlify.app` (for CORS). |
| **NODE_ENV** | `production` |

---

## Optional (can leave empty)

| Variable | Use |
|----------|-----|
| SENTRY_DSN | Backend error tracking (Sentry). |
| REDIS_URL | Leave empty to use in-memory cache. |
| LOG_LEVEL | `info` (default). |

---

After you add these, trigger a new deploy (or push a commit). The API runs on Netlify under `/api/*` and uses these variables.
