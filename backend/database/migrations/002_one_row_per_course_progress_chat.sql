-- One row per (user_id, course_id) for progress and chat_sessions.
-- Current topic only; completed_topics_count tracks fully mastered topics in order.
-- Run in Neon after backup. Reconcile completed_topics_count manually if needed after merge.

-- ============ PROGRESS ============
ALTER TABLE public.progress
  ADD COLUMN IF NOT EXISTS completed_topics_count INTEGER NOT NULL DEFAULT 0;

-- Backfill from old one-row-per-topic data: count rows with status = 'completed' per (user, course)
UPDATE public.progress p
SET completed_topics_count = s.n
FROM (
  SELECT user_id, course_id,
    COUNT(*) FILTER (WHERE status = 'completed')::integer AS n
  FROM public.progress
  GROUP BY user_id, course_id
) s
WHERE p.user_id = s.user_id AND p.course_id = s.course_id;

-- Keep the newest row per (user_id, course_id)
DELETE FROM public.progress p
WHERE p.id NOT IN (
  SELECT DISTINCT ON (user_id, course_id) id
  FROM public.progress
  ORDER BY user_id, course_id, updated_at DESC NULLS LAST
);

ALTER TABLE public.progress DROP CONSTRAINT IF EXISTS progress_user_course_topic_unique;
ALTER TABLE public.progress
  ADD CONSTRAINT progress_user_course_unique UNIQUE (user_id, course_id);

-- ============ CHAT_SESSIONS ============
DELETE FROM public.chat_sessions c
WHERE c.id NOT IN (
  SELECT DISTINCT ON (user_id, course_id) id
  FROM public.chat_sessions
  ORDER BY user_id, course_id, updated_at DESC NULLS LAST
);

ALTER TABLE public.chat_sessions DROP CONSTRAINT IF EXISTS chat_sessions_user_course_topic_unique;
ALTER TABLE public.chat_sessions
  ADD CONSTRAINT chat_sessions_user_course_unique UNIQUE (user_id, course_id);

-- Optional: set completed_topics_count from how many topic rows you had before merge (adjust per your data).
-- Example if the kept row was the latest topic only: COUNT old rows per (user_id, course_id) - 1 ≈ topics completed.
