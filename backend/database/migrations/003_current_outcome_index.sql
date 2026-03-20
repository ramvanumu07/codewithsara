-- Per-topic session: which outcome index is active (aligns with outcome_messages / outcomes).
ALTER TABLE public.progress
  ADD COLUMN IF NOT EXISTS current_outcome_index INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.progress.current_outcome_index IS
  '0-based active outcome within current topic_id; advances when assistant reply contains the mastery phrase (see sessionOutcome.js).';
