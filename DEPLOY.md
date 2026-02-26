# Sara Deployment Guide

The backend runs on **Render** (free tier) to avoid Netlify function bundling issues (`__dirname` conflict). The frontend runs on **Netlify**.

## 1. Deploy Backend to Render

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New** → **Web Service**
2. Connect your GitHub repo (`ramvanumu07/codewithsara`)
3. Configure:
   - **Name:** `sara-api`
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free

4. **Environment Variables** (Settings → Environment):
   - `DATABASE_URL` – your Neon PostgreSQL connection string
   - `JWT_SECRET` – any long random string (e.g. from `openssl rand -hex 32`)
   - `GROQ_API_KEY` – from [console.groq.com](https://console.groq.com)
   - `FRONTEND_URL` – `https://codewithsara.netlify.app`

5. Deploy. Note your API URL (e.g. `https://sara-api-xxxx.onrender.com`)

## 2. Configure Netlify

1. Netlify Dashboard → **Site settings** → **Environment variables**
2. Add:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** your Render API URL (e.g. `https://sara-api-xxxx.onrender.com`)
   - **Scopes:** Build and deploy

3. **Trigger a new deploy** so the frontend picks up the variable.

## 3. Done

- Frontend: https://codewithsara.netlify.app
- API: https://sara-api-xxxx.onrender.com

The username check and all API calls will work.
