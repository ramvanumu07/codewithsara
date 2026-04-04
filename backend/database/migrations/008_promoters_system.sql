-- Promoter Payment System
-- Enables promoters to sign up, track earnings, and request payouts

-- Promoters table (separate from users)
CREATE TABLE IF NOT EXISTS public.promoters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  
  -- Payout method: 'bank' or 'upi'
  payout_method TEXT NOT NULL CHECK (payout_method IN ('bank', 'upi')),
  
  -- Bank transfer fields (encrypted at rest)
  account_holder_name TEXT,
  account_number TEXT,  -- Encrypted field
  ifsc_code TEXT,       -- Encrypted field
  
  -- UPI field (encrypted at rest)
  upi_id TEXT,
  
  -- Commission settings
  commission_rupees_per_enrollment INTEGER NOT NULL DEFAULT 200,
  
  -- Account status: pending_verification, active, suspended, archived
  status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (status IN ('pending_verification', 'active', 'suspended', 'archived')),
  
  -- Earnings tracking
  total_earned_rupees BIGINT NOT NULL DEFAULT 0,      -- Cumulative all-time earnings
  pending_earnings_rupees BIGINT NOT NULL DEFAULT 0,  -- Unpaid earnings
  
  -- Last payout timestamp
  last_payout_at TIMESTAMPTZ,
  
  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX promoters_email_idx ON public.promoters (UPPER(email));
CREATE INDEX promoters_status_idx ON public.promoters (status);

-- Promoter coupons (links promoter to their coupon codes)
CREATE TABLE IF NOT EXISTS public.promoter_coupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promoter_id UUID NOT NULL REFERENCES public.promoters(id) ON DELETE CASCADE,
  coupon_code TEXT NOT NULL UNIQUE REFERENCES public.coupons(code) ON DELETE RESTRICT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX promoter_coupons_promoter_idx ON public.promoter_coupons (promoter_id);
CREATE INDEX promoter_coupons_code_idx ON public.promoter_coupons (coupon_code);

-- Payouts table (tracks all payout requests and their status)
CREATE TABLE IF NOT EXISTS public.payouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promoter_id UUID NOT NULL REFERENCES public.promoters(id) ON DELETE CASCADE,
  
  -- Payout details
  amount_rupees BIGINT NOT NULL CHECK (amount_rupees > 0),
  
  -- Status: pending, processing, completed, failed, cancelled
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
  
  -- Razorpay integration
  razorpay_payout_id TEXT UNIQUE,
  
  -- Idempotency (prevents duplicate payouts)
  idempotency_key TEXT NOT NULL UNIQUE,
  
  -- Failure tracking
  failure_reason TEXT,
  retry_count INTEGER NOT NULL DEFAULT 0,
  next_retry_at TIMESTAMPTZ,
  
  -- Enrollment count locked at payout time
  enrollments_count INTEGER,
  
  -- Timing
  requested_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  processed_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  
  -- Audit
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX payouts_promoter_idx ON public.payouts (promoter_id);
CREATE INDEX payouts_status_idx ON public.payouts (status);
CREATE INDEX payouts_idempotency_idx ON public.payouts (idempotency_key);
CREATE INDEX payouts_requested_at_idx ON public.payouts (requested_at DESC);

-- Payout audit log (immutable log of all events)
CREATE TABLE IF NOT EXISTS public.payout_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  payout_id UUID REFERENCES public.payouts(id) ON DELETE CASCADE,
  
  -- Event type: enrollment_counted, payout_initiated, payout_processing, payout_completed, payout_failed, retry_scheduled
  event_type TEXT NOT NULL,
  
  -- Metadata as JSON for flexibility
  metadata JSONB,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX payout_audit_log_payout_idx ON public.payout_audit_log (payout_id);
CREATE INDEX payout_audit_log_event_idx ON public.payout_audit_log (event_type);

-- Promoter verification log (audit trail for admin approvals/rejections)
CREATE TABLE IF NOT EXISTS public.promoter_verification_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promoter_id UUID NOT NULL REFERENCES public.promoters(id) ON DELETE CASCADE,
  
  -- Action: approved, rejected, suspended, reactivated
  action TEXT NOT NULL,
  
  -- Admin who took action (optional, if tracking admin)
  admin_id UUID,
  
  -- Reason for the action
  reason TEXT,
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX promoter_verification_log_promoter_idx ON public.promoter_verification_log (promoter_id);
CREATE INDEX promoter_verification_log_action_idx ON public.promoter_verification_log (action);

-- Grant permissions
GRANT ALL ON public.promoters TO postgres;
GRANT ALL ON public.promoter_coupons TO postgres;
GRANT ALL ON public.payouts TO postgres;
GRANT ALL ON public.payout_audit_log TO postgres;
GRANT ALL ON public.promoter_verification_log TO postgres;
