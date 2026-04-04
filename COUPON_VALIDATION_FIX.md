# Coupon Validation Issue - Diagnosis & Solution

## Problem
Coupons exist in the `public.coupons` table but users get "Invalid or expired coupon" error when trying to apply them.

## Root Cause Analysis

The coupon lookup in `coupons.js` at line 18-21:
```sql
SELECT discount_rupees FROM public.coupons
WHERE UPPER(TRIM(code)) = $1
LIMIT 1
```

**Issues:**
1. The `public.coupons` table has:
   - A UNIQUE INDEX: `coupons_code_upper_idx ON public.coupons (UPPER(TRIM(code)))`
   - But NO unique constraint (the index is case-insensitive, but queries may not match properly)

2. **Most likely cause**: The `code` column might have leading/trailing spaces or mixed case when inserted, and the UPPER(TRIM()) logic in the query might not be matching

3. **Secondary cause**: The coupons service is called with promoter coupon codes from `promoter_coupons` table, but the validation looks in `public.coupons` table - these are TWO DIFFERENT TABLES!

## Solution

We have TWO paths to fix this:

### Path A: Merge coupon lookup to check both tables
Since promoters now have their own coupon codes in `promoter_coupons` table, we should check BOTH:
1. `public.coupons` (marketing/admin coupons)
2. `public.promoter_coupons` (promoter-specific coupons that reference the promoters table)

### Path B: Link promoter coupons to public.coupons
When a promoter is created, automatically create a row in `public.coupons` with:
- code: the unique promoter code
- discount_rupees: 200 (the commission per enrollment)

## Recommended Solution: Path B

### Why?
1. Simpler - all coupons in one table
2. Backward compatible - existing coupon lookup works
3. Cleaner - no need to modify the complex checkout flow

### Implementation Steps:

1. **Modify `promoterAuth.js`**: When creating a promoter coupon in `createPromoter`, also insert into `public.coupons`:

```javascript
// After creating promoter and inserting into promoter_coupons
await query(
  `INSERT INTO public.coupons (code, discount_rupees)
   VALUES ($1, $2)
   ON CONFLICT DO NOTHING`,
  [couponCode, 200]  // 200 rupees discount per enrollment
)
```

2. **Add migration** to backfill existing promoter coupons into `public.coupons`

## Database Check

Run this SQL to see what's in the coupons table:

```sql
-- Check all coupons
SELECT id, code, discount_rupees, successful_enrollments FROM public.coupons LIMIT 20;

-- Check promoter coupons
SELECT id, promoter_id, coupon_code FROM public.promoter_coupons LIMIT 20;

-- Check for duplicates or formatting issues
SELECT code, COUNT(*) FROM public.coupons GROUP BY UPPER(TRIM(code)) HAVING COUNT(*) > 1;
```

## Validation Steps After Fix:

1. Create a new promoter
2. Note their coupon code
3. Go to checkout page
4. Try applying that coupon code
5. Should show "Coupon applied" and discount amount

## Related Files:

- `backend/services/coupons.js` - Coupon lookup logic
- `backend/services/promoterAuth.js` - Promoter creation (where coupon is generated)
- `backend/database/migrations/004_coupons.sql` - Coupons table schema
- `backend/database/migrations/008_promoters_system.sql` - Promoter coupon links
