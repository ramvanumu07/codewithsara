# Sara (EduBridge)

AI-powered JavaScript learning platform — React + Vite frontend, Node/Express API, Supabase, Groq.

## Repo layout

- **`/frontend`** — React + Vite app (deploy to **Netlify**)
- **`/backend`** — Express API (deploy to **Render** or any Node host)
- **Root** — Workspace scripts (`dev`, `build`, `install:all`)

## Run locally

1. **Install (all three package roots)**  
   ```bash
   npm run install:all
   ```

2. **Environment**  
   - Backend: copy `backend/.env.example` to `backend/.env` and fill in:
     - **Required:** `DATABASE_URL` (Neon Postgres), `JWT_SECRET`, `GROQ_API_KEY`
     - **Optional:** `PORT` (5000), `FRONTEND_URL`, `BCRYPT_ROUNDS`
   - Frontend: uses Vite proxy to backend in dev; for production set `VITE_API_BASE_URL` if needed.

3. **Start both**  
   ```bash
   npm run dev
   ```
   - Frontend: http://localhost:5173  
   - Backend: http://localhost:5000  

## Build

- **Frontend (production)**  
  ```bash
  npm run build
  ```
  Output: `frontend/dist`. Use this for Netlify.

- **Backend**  
  No build step; run with `node server.js` (or `npm start` in `backend`).

## Deploy

- **Frontend** — Netlify: connect repo, build command `npm run build`, publish directory `frontend/dist`. Root `netlify.toml` is already configured.
- **Backend** — Netlify Functions (see `netlify.toml`) or Render/any Node host. **Important:** Set env vars in your hosting dashboard:
  - `DATABASE_URL` — Neon Postgres connection string
  - `JWT_SECRET` — random secret for auth
  - `GROQ_API_KEY` — for AI chat
  - `FRONTEND_URL` — your frontend URL (for CORS)
  - See `backend/.env.example` for the full list.

## Scripts (root)

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Run frontend + backend in dev        |
| `npm run build` | Build frontend for production        |
| `npm run install:all` | Install root + frontend + backend deps |
| `npm run preview`    | Preview frontend build (Vite)   |

## License

Private.
