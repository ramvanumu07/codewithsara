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
   - Backend: create `backend/.env` with:
     - **Required:** `JWT_SECRET`, `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `GROQ_API_KEY`
     - **Optional:** `PORT` (default 5000), `FRONTEND_URL` (default http://localhost:5173)
   - Frontend: if the app calls the API by URL, set the API base URL (e.g. env or config pointing to `http://localhost:5000`).

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
- **Backend** — Render: use `render.yaml` (backend-only). Set env vars in the Render dashboard (see `render.yaml` for required/optional keys). Alternatively deploy `backend/` to any Node host with `npm start`.

## Scripts (root)

| Script          | Description                          |
|-----------------|--------------------------------------|
| `npm run dev`   | Run frontend + backend in dev        |
| `npm run build` | Build frontend for production        |
| `npm run install:all` | Install root + frontend + backend deps |
| `npm run preview`    | Preview frontend build (Vite)   |

## License

Private.
