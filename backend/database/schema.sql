-- Sara — Postgres target schema (fresh install).
-- progress + chat_sessions: ONE row per (user_id, course_id) — current topic only.
-- See migrations/002_one_row_per_course_progress_chat.sql to migrate from older (user,course,topic) uniques.

CREATE TABLE IF NOT EXISTS public.courses (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

INSERT INTO public.courses (id, title, description) VALUES
  ('javascript', 'JavaScript', 'Master JavaScript from fundamentals to advanced concepts')
ON CONFLICT (id) DO NOTHING;

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
  completed_topics_count INTEGER NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  CONSTRAINT progress_user_course_unique UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_progress_user_id ON public.progress (user_id);
CREATE INDEX IF NOT EXISTS idx_progress_course_id ON public.progress (course_id);
CREATE INDEX IF NOT EXISTS idx_progress_updated_at ON public.progress (updated_at DESC);

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
  CONSTRAINT chat_sessions_user_course_unique UNIQUE (user_id, course_id)
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions (user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_course_id ON public.chat_sessions (course_id);

CREATE TABLE IF NOT EXISTS public.admins (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  CONSTRAINT admins_user_id_key UNIQUE (user_id)
);

CREATE INDEX IF NOT EXISTS idx_admins_user_id ON public.admins (user_id);

CREATE TABLE IF NOT EXISTS public.user_course_unlocks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  username TEXT,
  course_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT user_course_unlocks_username_course_unique UNIQUE (username, course_id)
);

CREATE INDEX IF NOT EXISTS idx_user_course_unlocks_username ON public.user_course_unlocks (username);
CREATE INDEX IF NOT EXISTS idx_user_course_unlocks_course_id ON public.user_course_unlocks (course_id);

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
