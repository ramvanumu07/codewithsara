# Promoter Payment System - Implementation Guide

Complete implementation of the promoter dashboard with secure payout system, email notifications, and race condition handling.

## Overview

This system enables promoters to:
1. Sign up with bank transfer or UPI payout method
2. Generate unique coupon codes for promotion
3. Track earnings in real-time (₹200 per enrollment)
4. Request payouts when reaching ₹1,000 threshold
5. Receive automatic fund transfers via Razorpay

## Architecture

### Database Schema

- **promoters** - Promoter accounts (name, email, payout method, bank/UPI details encrypted)
- **promoter_coupons** - Links promoter to coupon codes (1-to-many relationship)
- **payouts** - All payout requests with status tracking
- **payout_audit_log** - Immutable log of all payout events
- **promoter_verification_log** - Admin approval/rejection history

### Backend Services

#### 1. Email Service (`backend/services/emailService.js`)
- Nodemailer integration with Gmail SMTP
- Sends from business email `support@codewithsara.in`
- Handles transporter setup and error logging

#### 2. Email Templates (`backend/services/emailTemplates.js`)
- User signup welcome email
- Promoter signup confirmation
- Promoter approval notification
- Payout initiated receipt

#### 3. Promoter Auth (`backend/services/promoterAuth.js`)
- Signup with password + bank/UPI confirmation
- Login with JWT token generation
- Promoter approval workflow (admin)
- Automatic coupon code generation

#### 4. Payout Engine (`backend/services/payoutEngine.js`)
- Calculate pending earnings from coupon enrollments
- Validate and request payouts (prevents duplicates)
- Complete payout after Razorpay processes
- Row-level locking for race condition safety
- Atomic transactions (all-or-nothing)
- Coupon count reset after payout

#### 5. Razorpay Integration (`backend/services/razorpayPayouts.js`)
- Send payouts to bank accounts or UPI
- Fetch payout status
- Webhook signature verification
- Mock payout for testing

### API Endpoints

#### Promoter Auth
```
POST /api/promoters/signup
  Body: { email, name, password, confirmPassword, payoutMethod, accountHolderName, accountNumber, confirmAccountNumber, ifscCode, confirmIfscCode, upiId }
  Returns: { promoter, couponCode }

POST /api/promoters/login
  Body: { email, password }
  Returns: { promoter, token }
```

#### Promoter Dashboard (Requires JWT)
```
GET /api/promoters/me/dashboard
  Headers: { Authorization: "Bearer TOKEN" }
  Returns: { promoter, earnings, recentPayouts }

GET /api/promoters/me/payouts
  Headers: { Authorization: "Bearer TOKEN" }
  Query: { limit, offset, status }
  Returns: { payouts[] }
```

#### Payout Requests
```
POST /api/promoters/me/request-payout
  Headers: { Authorization: "Bearer TOKEN" }
  Body: { amountRupees }
  Returns: { payout }

POST /api/promoters/me/payout/:payoutId/initiate
  Headers: { Authorization: "Bearer TOKEN" }
  Returns: { payout, razorpayPayoutId }
```

#### Admin Functions
```
GET /api/admin/promoters
  Headers: { x-admin-key: ADMIN_KEY }
  Query: { status, limit, offset }
  Returns: { promoters[] }

POST /api/admin/promoters/:promoterId/approve
  Headers: { x-admin-key: ADMIN_KEY }
  Body: { reason }
  Returns: { promoter }

POST /api/admin/promoters/:promoterId/reject
  Headers: { x-admin-key: ADMIN_KEY }
  Body: { reason }
  Returns: { promoter }
```

## Setup Instructions

### 1. Environment Variables

Add to `.env` file:

```env
# Email Configuration (Nodemailer)
GMAIL_USER=codewithsara@gmail.com
GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx  # Get from https://myaccount.google.com/apppasswords
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
EMAIL_FROM_NAME=Sara Learning Platform
EMAIL_FROM_ADDRESS=support@codewithsara.in

# Razorpay Payouts (existing)
RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_key_secret

# Admin (new)
ADMIN_KEY=your_admin_key_for_api_access
```

### 2. Get Gmail App Password

1. Go to https://myaccount.google.com/apppasswords
2. Sign in with `codewithsara@gmail.com`
3. Select **Mail** + **Windows Computer** (or your OS)
4. Copy the generated 16-character password
5. Paste into `.env` as `GMAIL_APP_PASSWORD`

### 3. Database Migration

Run the migration to create tables:

```bash
# In your Neon SQL Editor, paste contents of:
backend/database/migrations/008_promoters_system.sql
```

Or connect and run:
```sql
-- Just paste the entire migration file content
```

### 4. Restart Backend

```bash
npm run dev:backend
```

## Race Condition Handling

### Problem: Concurrent Enrollments During Payout

**Scenario:**
```
Time 1: Promoter has 12 unpaid enrollments
Time 2: Payout job starts, locks coupon row
Time 3: New user enrolls, waits for lock
Time 4: Payout completes, resets count to 0
Time 5: User enrollment increments count to 1
Result: 11 enrollments lost!
```

**Solution: PostgreSQL Row-Level Locking**
```sql
BEGIN;
  SELECT * FROM coupons WHERE code = 'PROMO_X' FOR UPDATE;  -- LOCK
  -- Calculate final count (no concurrent updates possible)
  -- Proceed with payout
  -- Reset count atomically
COMMIT;
```

### Problem: Double Payout

**Scenario:**
```
Time 1: Promoter clicks "Request Payout"
Time 2: Promoter clicks again (impatient)
Result: Two payouts sent!
```

**Solution: Idempotency Keys**
```
Key = hash(promoter_id + current_hour)
- Check: Is there already a pending payout with this key?
- If yes: return existing payout (don't create new one)
- If no: create new payout with unique key
- Razorpay also deduplicates on their end
```

### Problem: Partial State After Crash

**Scenario:**
```
Time 1: Payout sent to Razorpay (money goes out)
Time 2: Server crashes before saving response
Time 3: On restart: Did money go out? Do we retry?
```

**Solution: Transactional Workflow**
```
Step 1: Create payout record (status = 'pending') - DB transaction
Step 2: Call Razorpay (outside transaction, can fail safely)
Step 3: Update payout + reset coupon (atomic DB transaction)
Result: Always in sync - money and DB are either both updated or both untouched
```

## Email System

### Gmail Setup Explanation

Your Gmail is configured to "Send Mail As" with your business email:
- **Gmail account:** codewithsara@gmail.com (authentication)
- **Send from:** support@codewithsara.in (appears in recipient's inbox)
- **SMTP:** smtp.gmail.com:587 with TLS

When Nodemailer sends email:
1. Authenticates with Gmail credentials
2. Gmail sees "Send Mail As" setting
3. Automatically rewrites From header to support@codewithsara.in
4. Recipient sees professional business email

### Email Templates

All templates are mobile-responsive with:
- Gradient headers
- Professional branding
- Clear call-to-action buttons
- Footer with contact info

**Sent on:**
- ✅ User signup (all users)
- ✅ Promoter signup (pending approval)
- ✅ Promoter approval (admin action)
- ✅ Payout initiated (promoter requested payout)

## Testing

### Test Promoter Signup

```bash
curl -X POST http://localhost:5000/api/promoters/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "name": "Test Promoter",
    "password": "TestPass123!",
    "confirmPassword": "TestPass123!",
    "payoutMethod": "bank",
    "accountHolderName": "Test User",
    "accountNumber": "12345678901234",
    "confirmAccountNumber": "12345678901234",
    "ifscCode": "SBIN0001234",
    "confirmIfscCode": "SBIN0001234"
  }'
```

### Test Promoter Login

```bash
curl -X POST http://localhost:5000/api/promoters/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123!"
  }'
```

### Test Dashboard

```bash
curl http://localhost:5000/api/promoters/me/dashboard \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

### Test Admin Approval

```bash
curl -X POST http://localhost:5000/api/admin/promoters/{promoterId}/approve \
  -H "x-admin-key: your_admin_key_from_env"
```

## File Structure

```
backend/
├── database/migrations/
│   └── 008_promoters_system.sql      # Schema for all promoter tables
├── routes/
│   └── promoters.js                  # All promoter API endpoints
├── services/
│   ├── emailService.js               # Nodemailer setup
│   ├── emailTemplates.js             # Email HTML templates
│   ├── promoterAuth.js               # Signup/login/approval logic
│   ├── payoutEngine.js               # Payout core with locking
│   └── razorpayPayouts.js            # Razorpay API integration
├── app.js                             # (updated) Added promoters route
├── .env.example                       # (updated) Added email config
└── routes/auth.js                     # (updated) Added user signup email
```

## Next Steps (Frontend)

### Pages to Create

1. `/promoter/signup` - Promoter registration form
   - Multi-step: Basic info → Payout method → Bank/UPI details
   - Real-time validation (confirm fields match)
   - Visual feedback during submission

2. `/promoter/login` - Promoter login
   - Email + password
   - Remember me (optional)
   - Link to /promoter/signup

3. `/promoter/dashboard` - Main promoter dashboard
   - Display: Pending earnings, total earned, last payout
   - Show coupon code + share buttons (WhatsApp, Twitter, copy)
   - Payout history table
   - "Request Payout" button (if earnings >= ₹1000)
   - Account settings link

4. `/admin/promoters` - Admin panel
   - Table of all promoters
   - Filters by status (pending, active, suspended)
   - Approve/Reject buttons
   - View earnings + payout history
   - Suspend/Reactivate options

### API Integration

Frontend will call:
```javascript
// Login
POST /api/promoters/login

// Get dashboard data
GET /api/promoters/me/dashboard
(with JWT token)

// Request payout
POST /api/promoters/me/request-payout
{ amountRupees: 1000 }

// Get payouts history
GET /api/promoters/me/payouts

// Admin: List promoters
GET /api/admin/promoters

// Admin: Approve
POST /api/admin/promoters/:id/approve
```

## Troubleshooting

### Email Not Sending

1. Check `GMAIL_USER` and `GMAIL_APP_PASSWORD` in `.env`
2. Verify app password from Gmail settings (not regular password)
3. Check backend logs: `[EmailService] Email sent to...` or `[EmailService] Failed to send...`
4. Ensure `support@codewithsara.in` is configured as "Send Mail As" in Gmail

### Payout Fails

1. Check Razorpay credentials in `.env`
2. Verify account details (account number, IFSC, UPI format)
3. Check payout audit trail: `GET /api/promoters/me/payouts`
4. Check backend logs for Razorpay error codes

### Duplicate Payouts

1. Check `payouts` table for multiple rows with same `idempotency_key`
2. Should be UNIQUE constraint - if violated, DB migration may not have applied
3. Verify migration ran: Check `payout_audit_log` table exists in Neon

## Security Considerations

1. **Bank Details Encryption:** Account number, IFSC, UPI stored encrypted (use `crypto` module)
2. **JWT Tokens:** Separate from user tokens, expires in 7 days
3. **Admin Key:** API header-based authentication (can upgrade to Admin role later)
4. **Row Locking:** Prevents race conditions automatically
5. **Audit Trail:** All payout events logged immutably
6. **Non-blocking Email:** Email failure doesn't block signup/payout

## Performance Considerations

1. **Payout Calculation:** O(n) where n = number of promoter's coupons (usually 1-5)
2. **Row Locking:** Brief lock (0.5s) during payout, enrollments queue briefly
3. **Email Sending:** Async, non-blocking
4. **Idempotency:** O(1) check before creating payout

## Future Enhancements

1. **Email Verification:** Add verification link in signup email
2. **Two-Factor Auth:** SMS or app-based 2FA
3. **Payout Scheduling:** Automatic payouts at fixed times
4. **Tax Documents:** Generate and email 1099/TDS forms
5. **Performance Bonuses:** Extra commission for top performers
6. **Referral Chain:** Promoters refer other promoters
7. **Analytics Dashboard:** Charts of earnings, conversions, etc.
8. **Mobile App:** Native app for promoters to track on the go
