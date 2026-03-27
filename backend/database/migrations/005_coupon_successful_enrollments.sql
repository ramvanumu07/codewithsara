-- Successful checkouts that used each coupon (server increments in verify-payment after paid + unlock).
ALTER TABLE public.coupons
  ADD COLUMN IF NOT EXISTS successful_enrollments INTEGER NOT NULL DEFAULT 0;

COMMENT ON COLUMN public.coupons.successful_enrollments IS 'Number of successful payments that used this coupon (incremented after Razorpay verify + unlock).';
