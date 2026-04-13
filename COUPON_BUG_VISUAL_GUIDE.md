# 🎨 Coupon Bug - Visual Explanation

## The Validation Chain (Why Coupons Failed)

```
┌─────────────────────────────────────────────────────────────┐
│                   USER APPLIES COUPON                       │
│                  "PROMO_ABC_123"                            │
├─────────────────────────────────────────────────────────────┤
│                            ↓                                │
│          1. CHECKOUT PRICING SERVICE                        │
│          (checkoutPricing.js)                               │
│          Calls: applyCoupon(999, "PROMO_ABC_123")           │
│                            ↓                                │
│          2. RESOLVE COUPON DISCOUNT                         │
│          (checkoutPricing.js)                               │
│          Calls: resolveCouponDiscountRupees("PROMO...")     │
│                            ↓                                │
│          3. DATABASE LOOKUP                                 │
│          (coupons.js)                                       │
│          Query: SELECT discount_rupees FROM coupons         │
│                 WHERE UPPER(TRIM(code)) = 'PROMO...'        │
│                                                              │
│          ❌ BEFORE FIX:    Returned: 0                      │
│          ✅ AFTER FIX:     Returned: 200                    │
│                            ↓                                │
│          4. VALIDATION CHECKPOINT                           │
│          (coupons.js line 25)                               │
│                                                              │
│          if (discount <= 0) return null                     │
│                                                              │
│          ❌ BEFORE: 0 <= 0? YES → return null              │
│          ✅ AFTER:  200 <= 0? NO → return 200              │
│                            ↓                                │
│          5. APPLY DISCOUNT CHECK                            │
│          (checkoutPricing.js line 62)                       │
│                                                              │
│          if (discountRupees == null) {                      │
│            return { valid: false }                          │
│          }                                                  │
│                                                              │
│          ❌ BEFORE: discountRupees = null → valid: false   │
│          ✅ AFTER:  discountRupees = 200 → valid: true     │
│                            ↓                                │
│          6. CALCULATE FINAL AMOUNT                          │
│          (checkoutPricing.js)                               │
│                                                              │
│          finalRupees = 999 - 200 = 799                      │
│                            ↓                                │
│          7. RETURN TO USER                                  │
│                                                              │
│          ❌ BEFORE: { valid: false }                        │
│          ✅ AFTER:  {                                       │
│                      valid: true,                           │
│                      finalRupees: 799,                      │
│                      discountRupees: 200                    │
│                    }                                        │
│                            ↓                                │
│                   USER SEES RESULT                          │
│                                                              │
│          ❌ BEFORE: "Invalid Coupon"                        │
│          ✅ AFTER:  "Discount Applied: -₹200"              │
│                     Final: ₹799                             │
└─────────────────────────────────────────────────────────────┘
```

## The Database Issue

```
┌──────────────────────────────────────────┐
│   PROMOTER SIGNUP (promoterAuth.js)      │
├──────────────────────────────────────────┤
│                                          │
│  Input: Promoter name "Rahul"            │
│                                          │
│  Generate coupon code: RAHUL_ABC_123     │
│                                          │
│  INSERT INTO coupons:                    │
│  ├─ code: "RAHUL_ABC_123"               │
│  └─ discount_rupees: ???                 │
│                                          │
│  ❌ BEFORE: 0 (WRONG - INVALID)         │
│  ✅ AFTER:  200 (CORRECT - VALID)       │
│                                          │
└──────────────────────────────────────────┘
         ↓                ↓
    ❌ BROKEN       ✅ WORKING
         ↓                ↓
  Can't apply        Can apply
  at checkout        at checkout
```

## Side-by-Side Comparison

### BEFORE (Bug)
```
Promoter: Alice
Coupon Code: ALICE_PROMO_001
Discount in DB: 0 rupees

When customer tries to use:
Step 1: Look up ALICE_PROMO_001
Step 2: Get discount: 0
Step 3: Check: Is 0 > 0? NO
Step 4: Return null (invalid)
Step 5: Show error: "Invalid Coupon"
Step 6: Customer can't purchase
Step 7: Alice gets ₹0 commission

Result: ❌ FAILED
```

### AFTER (Fixed)
```
Promoter: Alice
Coupon Code: ALICE_PROMO_001
Discount in DB: 200 rupees

When customer tries to use:
Step 1: Look up ALICE_PROMO_001
Step 2: Get discount: 200
Step 3: Check: Is 200 > 0? YES ✓
Step 4: Return 200 (valid)
Step 5: Apply ₹200 discount
Step 6: Show success: "Discount Applied"
Step 7: Customer pays ₹799 (₹999 - ₹200)
Step 8: Alice gets ₹200 commission

Result: ✅ SUCCESS
```

## The Code Change (Minimal)

```diff
// backend/services/promoterAuth.js

  // Create coupon and link to promoter
+ const PROMOTER_COMMISSION_RUPEES = 200
  try {
    await query(
      `INSERT INTO public.coupons (code, discount_rupees)
       VALUES ($1, $2)
       ON CONFLICT (UPPER(TRIM(code))) DO NOTHING`,
-     [couponCode, 0]          ← ❌ WRONG
+     [couponCode, PROMOTER_COMMISSION_RUPEES]  ← ✅ CORRECT
    )
```

**Only 1 change**: Replace `0` with `200`

## Business Model Alignment

```
PROMOTER EARNS ₹200 PER SALE:
───────────────────────────

Customer Price:  ₹999
└─ Discount:     -₹200 (via promoter coupon)
└─ Pays:         ₹799

Income Distribution:
├─ Sara receives:       ₹999 (full price paid)
├─ Promoter gets:       ₹200 (via Razorpay payouts)
└─ Customer saves:      ₹200 (via coupon)

Validation:
✓ Customer gets discount   (via ₹200 coupon)
✓ Promoter gets commission (tracked as earnings)
✓ Sara gets full payment   (₹999)

This only works if:
✓ Coupon discount_rupees = 200 (not 0)
```

## File Dependencies

```
User applies coupon
    ↓
Checkout.jsx calls applyCoupon()
    ↓
checkoutPricing.js:applyCoupon()
    ↓
coupons.js:getCouponDiscountRupeesFromDb()
    ↓
Database query (needs discount_rupees > 0)
    ↓
Created by: promoterAuth.js:createPromoter()
    ↓
❌ BUG WAS HERE: discount_rupees = 0 (should be 200)
    ↓
✅ FIXED: discount_rupees = 200
```

---

**Visual Explanation Complete** ✅
