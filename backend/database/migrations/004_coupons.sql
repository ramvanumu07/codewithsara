-- Add coupons table for checkout (flat discount in rupees per code).
-- Run in Neon SQL Editor if you already applied schema.sql before this table existed.

CREATE TABLE IF NOT EXISTS public.coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL,
  discount_rupees INTEGER NOT NULL CHECK (discount_rupees > 0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE UNIQUE INDEX IF NOT EXISTS coupons_code_upper_idx ON public.coupons (UPPER(TRIM(code)));
