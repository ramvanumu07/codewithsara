-- Sara Learning Platform - Postgres schema (Neon or any Postgres)
-- Run this in Neon SQL Editor (or psql) to create tables.
-- progress + chat_sessions are scoped by (user_id, course_id, topic_id).
--
-- New project: safe to run as-is. Existing DBs: use your migration path; this file is the target shape for fresh installs.

-- ============ COURSES (catalog; FK target for progress / chat_sessions) ============
CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Seed default course — keep id aligned with backend/data/curriculum.js and backend/config/defaultCourse.js
INSERT INTO public.courses (id, title, description) VALUES
  ('javascript', 'JavaScript', 'Master JavaScript from fundamentals to advanced concepts')
ON CONFLICT (id) DO NOTHING;

-- ============ USERS ============
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  password TEXT NOT NULL,
  security_question TEXT,
  security_answer TEXT,
  token_version INTEGER NOT NULL DEFAULT 0,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT users_username_key UNIQUE (username)
);

CREATE INDEX IF NOT EXISTS idx_users_username_lower ON public.users (LOWER(username));

-- ============ PROGRESS (per user, per course, per topic) ============
CREATE TABLE IF NOT EXISTS public.progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  phase TEXT,
  status TEXT,
  current_task INTEGER,
  total_tasks INTEGER,
  assignments_completed INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT progress_user_course_topic_unique UNIQUE (user_id, course_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress (user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course_id ON public.progress (course_id);
CREATE INDEX IF NOT EXISTS idx_progress_updated_at ON public.progress (updated_at DESC);

-- ============ CHAT_SESSIONS (chat history per user per course per topic) ============
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  topic_id TEXT NOT NULL,
  messages TEXT,
  message_count INTEGER NOT NULL DEFAULT 0,
  phase TEXT,
  last_message_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT chat_sessions_user_course_topic_unique UNIQUE (user_id, course_id, topic_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_course_id ON public.chat_sessions (course_id);

-- ============ ADMINS (admin users) ============
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT admins_user_id_key UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_admins_user_id ON public.admins (user_id);

-- ============ USER_COURSE_UNLOCKS (course access + unlock codes) ============
-- username NULL = unused unlock code slot; redeemed rows have username set
CREATE TABLE IF NOT EXISTS public.user_course_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT,
  course_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT user_course_unlocks_username_course_unique UNIQUE (username, course_id)
);

CREATE INDEX IF NOT EXISTS idx_user_course_unlocks_username ON public.user_course_unlocks (username);
CREATE INDEX IF NOT EXISTS idx_user_course_unlocks_course_id ON public.user_course_unlocks (course_id);

-- ============ UPDATED_AT TRIGGERS ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS users_updated_at ON public.users;
CREATE TRIGGER users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS progress_updated_at ON public.progress;
CREATE TRIGGER progress_updated_at
  BEFORE UPDATE ON public.progress
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

DROP TRIGGER IF EXISTS chat_sessions_updated_at ON public.chat_sessions;
CREATE TRIGGER chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ ENABLE RLS (optional; app uses service_role which bypasses RLS) ============
-- Uncomment to enable row-level security (RLS) if needed:
-- ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.progress ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.user_course_unlocks ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
