# Quick Testing Guide - Issue Fixes

## Issue #1: Removed Earning Line ✅
**What Changed**: Subtitle on `/promoter/signup` page

**Test**:
1. Navigate to `/promoter/signup`
2. Look at the page title area
3. **Expected**: Should say "Start earning by promoting Sara courses" (not "Earn ₹200 for each user...")

---

## Issue #2: Promoter Dashboard Link Missing ✅
**What Changed**: Added promoter section to user Dashboard sidebar

**Test**:
1. Log in as a user to `/dashboard`
2. Look at the left sidebar below "Courses" section
3. **Expected**: Should see a "Promoter" section with "Promoter Dashboard" link
4. Click the link
5. **Expected**: Should navigate to `/promoter/dashboard` (and show login form if not logged in as promoter)

---

## Issue #3: Form Validation Showing Errors on Load ✅
**What Changed**: Form no longer shows validation errors until user interaction

**Test**:
1. Navigate to `/promoter/signup`
2. **Expected**: Form should be clean with NO red error messages
3. Click "Next" without filling anything
4. **Expected**: NOW error messages appear (email required, name required, etc.)
5. Fill in errors and click Next
6. **Expected**: Move to step 2 without errors

**Before this fix**: Errors would show immediately on page load even with empty form

---

## Issue #4: IFSC Code Input Not Working ✅
**What Changed**: IFSC code input handler fixed to properly capture data

**Test**:
1. Navigate to `/promoter/signup`
2. Go through steps until Step 3 (Bank Details)
3. Select "Bank Transfer" if not already selected
4. Click in IFSC Code field
5. Type: `sbin0001234`
6. **Expected**: 
   - Text appears in field
   - Text auto-converts to uppercase: `SBIN0001234`
   - Data is saved when you move to next field (onBlur)
7. Fill all bank details and click Submit
8. **Expected**: Form submits successfully (or shows validation error only for unfilled fields, not IFSC)

**Before this fix**: IFSC field would appear to accept text but not save it, causing validation failures on submit

---

## Issue #5: Coupon Showing Invalid/Expired ✅
**What Changed**: Promoter coupons now created with ₹200 discount

**Test**:
1. Create a new promoter account at `/promoter/signup`
   - Use unique email (e.g., test+promo+timestamp@email.com)
   - Complete all steps
   - Note the coupon code from the signup confirmation/dashboard

2. Log out and go to `/checkout`

3. In the coupon field, type the promoter's coupon code

4. Click "Apply Coupon"

5. **Expected**:
   - ✅ Coupon successfully applied
   - ✅ Shows discount of ₹200
   - ✅ Price reduces from ₹1199 to ₹999

**Before this fix**: Would show "Invalid or expired coupon" error

---

## Quick Checklist

Use this checklist to verify all fixes:

```
Issue #1 - Subtitle Text
☐ Is subtitle "Start earning by promoting Sara courses"?

Issue #2 - Promoter Link
☐ Is there a "Promoter" section in dashboard sidebar?
☐ Does "Promoter Dashboard" link work?

Issue #3 - No Validation Errors on Load
☐ Is signup form clean with no errors on initial load?
☐ Do errors only appear after clicking Next?

Issue #4 - IFSC Input Working
☐ Can you type in IFSC field?
☐ Does text auto-uppercase?
☐ Is data saved and submitted?

Issue #5 - Coupon Valid
☐ Can you apply a promoter's coupon?
☐ Does it show ₹200 discount?
☐ Is the final price correct (₹1199 - ₹200 = ₹999)?

All Fixed ✅
☐ All issues tested and working
☐ Ready to commit changes
```

---

## Troubleshooting

**If signup still shows errors on load:**
- Hard refresh the page (Ctrl+F5 or Cmd+Shift+R)
- Clear browser cache
- Check browser console for JavaScript errors

**If IFSC field still not working:**
- Make sure you're on Step 3 of signup form
- Make sure you selected "Bank Transfer" option on Step 2
- Try clicking outside the field after typing to trigger onBlur

**If coupon still shows invalid:**
- Make sure the coupon code matches exactly (copy from promoter dashboard)
- Try with a newly created promoter (old promoters may have had 0 discount)
- Check that you're using the correct course ID

**If promoter link doesn't appear:**
- Log out and log back in
- Hard refresh the page
- Check that you're on `/dashboard` (not `/learn/:topicId`)

---

## Files to Check

If issues persist, review these files:

| File | What to Check |
|------|---------------|
| `frontend/src/pages/PromoterSignup.jsx` | Line 176 (subtitle), Lines 343-347 (IFSC), Line 80 (validateStep3) |
| `frontend/src/pages/Dashboard.jsx` | Line 627 (Promoter section) |
| `backend/services/promoterAuth.js` | Line 120 (coupon discount value) |

---

**Status**: ✅ All fixes implemented and ready for testing
**Last Updated**: March 28, 2026
