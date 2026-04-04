# 🔧 Fixing Existing Promoter Coupons in Database

**Quick Guide**: How to fix any existing promoter coupons that have discount_rupees = 0

## Problem

If you already had promoters sign up before the fix, their coupons were created with discount_rupees = 0, which makes them invalid. This guide shows how to fix them.

## Solution Options

### Option 1: Update All Broken Coupons (Recommended)

Update all promoter coupons that have 0 discount to 200 rupees:

```sql
-- Fix all promoter coupons with 0 discount
UPDATE public.coupons 
SET discount_rupees = 200
WHERE id IN (
  SELECT pc.coupon_code  
  FROM public.promoter_coupons pc
  INNER JOIN public.coupons c ON pc.coupon_code = c.code
  WHERE c.discount_rupees = 0
);
```

Or simpler - just fix all coupons with 0 discount:

```sql
-- Fix ALL coupons with 0 discount (safest if only promoter coupons have this issue)
UPDATE public.coupons 
SET discount_rupees = 200
WHERE discount_rupees = 0;
```

### Option 2: Have Promoters Re-Signup

- Promoters delete their account
- Re-signup with the corrected code
- New coupons will be created with ₹200 discount ✓
- ⚠️ **Downside**: Breaks their existing coupon links/shares

### Option 3: Manually Fix Individual Coupons

If you want to fix specific promoters:

```sql
-- Get promoter ID and their coupon code
SELECT p.id, p.name, p.email, pc.coupon_code
FROM public.promoters p
LEFT JOIN public.promoter_coupons pc ON p.id = pc.promoter_id;

-- Then update just that coupon
UPDATE public.coupons 
SET discount_rupees = 200
WHERE code = 'SPECIFIC_COUPON_CODE';
```

## Steps to Execute (Neon SQL Editor)

1. **Open Neon Dashboard** → Your Project → SQL Editor

2. **Check current status** - Run this to see which coupons are broken:
   ```sql
   SELECT COUNT(*) as broken_coupons
   FROM public.coupons 
   WHERE discount_rupees = 0;
   ```

3. **Run the fix**:
   ```sql
   UPDATE public.coupons 
   SET discount_rupees = 200
   WHERE discount_rupees = 0;
   ```

4. **Verify the fix**:
   ```sql
   -- Check that all coupons now have valid discounts
   SELECT COUNT(*) as total_coupons,
          COUNT(CASE WHEN discount_rupees <= 0 THEN 1 END) as invalid_coupons,
          COUNT(CASE WHEN discount_rupees > 0 THEN 1 END) as valid_coupons
   FROM public.coupons;
   ```

5. **Test with a promoter coupon**:
   - Get a promoter's coupon code from the dashboard
   - Try applying it at checkout
   - Verify ₹200 discount appears ✅

## Verification Queries

### Check which promoters have broken coupons:
```sql
SELECT p.id, p.name, p.email, pc.coupon_code, c.discount_rupees
FROM public.promoters p
LEFT JOIN public.promoter_coupons pc ON p.id = pc.promoter_id
LEFT JOIN public.coupons c ON UPPER(TRIM(c.code)) = UPPER(TRIM(pc.coupon_code))
WHERE c.discount_rupees = 0;
```

### Check all promoter coupons and their discounts:
```sql
SELECT p.name, pc.coupon_code, c.discount_rupees, 
       CASE 
         WHEN c.discount_rupees <= 0 THEN '❌ BROKEN'
         ELSE '✅ VALID (₹' || c.discount_rupees || ')'
       END as status
FROM public.promoters p
LEFT JOIN public.promoter_coupons pc ON p.id = pc.promoter_id
LEFT JOIN public.coupons c ON UPPER(TRIM(c.code)) = UPPER(TRIM(pc.coupon_code))
ORDER BY c.discount_rupees;
```

### Count statistics:
```sql
SELECT 
  COUNT(DISTINCT p.id) as total_promoters,
  COUNT(DISTINCT pc.coupon_code) as total_promoter_coupons,
  COUNT(DISTINCT CASE WHEN c.discount_rupees > 0 THEN pc.coupon_code END) as valid_coupons,
  COUNT(DISTINCT CASE WHEN c.discount_rupees <= 0 THEN pc.coupon_code END) as broken_coupons
FROM public.promoters p
LEFT JOIN public.promoter_coupons pc ON p.id = pc.promoter_id
LEFT JOIN public.coupons c ON UPPER(TRIM(c.code)) = UPPER(TRIM(pc.coupon_code));
```

## Business Impact After Fix

| Scenario | Before | After |
|----------|--------|-------|
| New promoter signs up | ❌ Coupon invalid | ✅ Coupon works |
| Existing promoter's coupon | ❌ Invalid (if discount was 0) | ✅ Valid (after DB fix) |
| Customer applies coupon | ❌ Error | ✅ Gets ₹200 discount |
| Promoter earnings tracked | ❌ No | ✅ Yes - ₹200 per sale |

## Timeline

- **Before Fix**: All new promoter coupons created with 0 discount (broken)
- **After Code Fix**: All new promoter coupons created with 200 discount (working)
- **DB Fix**: Update existing broken coupons to have 200 discount

---

**Priority**: Medium (after code fix deployed)  
**Effort**: 5 minutes  
**Risk**: LOW (only updates discount_rupees to the correct value)  
**Rollback**: Simple - SET discount_rupees back to 0 if needed
