-- Per-event log for promoter reporting (rolling windows, e.g. last 7 days).
-- Rows are inserted alongside coupons.successful_enrollments increment on verified payment.

CREATE TABLE IF NOT EXISTS public.coupon_enrollment_events (
  id BIGSERIAL PRIMARY KEY,
  coupon_code_normalized TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS coupon_enrollment_events_norm_created_idx
  ON public.coupon_enrollment_events (coupon_code_normalized, created_at DESC);

COMMENT ON TABLE public.coupon_enrollment_events IS 'One row per successful paid checkout that used the coupon; used for time-window promoter stats.';
