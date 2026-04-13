# Frontend Pages - Quick Visual Guide

## Promoter Journey Flow

```
┌─────────────────────────────────────────────────────────┐
│                   Sara Learning Platform                │
│                                                         │
│  New Promoter Journey:                                  │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /promoter/signup - Multi-step Registration       │   │
│  │ ├─ Step 1: Basic Info (email, name, password)   │   │
│  │ ├─ Step 2: Choose Payout Method                 │   │
│  │ └─ Step 3: Bank/UPI Details Confirmation        │   │
│  └────────────────────────────┬─────────────────────┘   │
│                               ↓                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /promoter/login - Email & Password Login         │   │
│  └────────────────────────────┬─────────────────────┘   │
│                               ↓                          │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /promoter/dashboard - Main Earnings Hub          │   │
│  │                                                  │   │
│  │ Cards:                                           │   │
│  │ ├─ 💰 Pending Earnings: ₹X (Y enrollments)     │   │
│  │ ├─ 📊 Total Earned: ₹X (all-time)              │   │
│  │ └─ 📅 Last Payout: Date                         │   │
│  │                                                  │   │
│  │ Promotion:                                       │   │
│  │ ├─ Your Code: [UNIQUE_CODE] [COPY]             │   │
│  │ └─ Share with friends, earn ₹200 per signup    │   │
│  │                                                  │   │
│  │ Payout:                                          │   │
│  │ ├─ Pending: ₹X / Minimum: ₹1,000                │   │
│  │ ├─ Progress: [████░░░░░░] 40%                  │   │
│  │ └─ [Request Payout] (when ≥₹1,000)             │   │
│  │                                                  │   │
│  │ History:                                         │   │
│  │ └─ Table: Amount | Status | Date                │   │
│  └──────────────────────────────────────────────────┘   │
│                                                         │
│  Admin Journey:                                         │
│  ┌──────────────────────────────────────────────────┐   │
│  │ /admin (Tabs: Promoters | Users | Payments)     │   │
│  │                                                  │   │
│  │ Promoters Tab:                                   │   │
│  │ ├─ Filters: [All] [Pending] [Active] [Suspended]│   │
│  │ └─ Table:                                        │   │
│  │    Name | Email | Method | Earnings | Status    │   │
│  │    [Approve/Reject buttons for pending]         │   │
│  │                                                  │   │
│  │ Stats:                                           │   │
│  │ ├─ Total Promoters: X                           │   │
│  │ ├─ Active: Y                                     │   │
│  │ └─ Pending: Z                                    │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## File Structure

```
frontend/src/
├── pages/
│   ├── PromoterSignup.jsx          (Multi-step form)
│   ├── PromoterLogin.jsx           (Login page)
│   ├── PromoterDashboard.jsx       (Main dashboard)
│   ├── AdminPromoters.jsx          (Admin management)
│   └── Admin.jsx                   (Updated with tabs)
├── contexts/
│   └── PromoterAuthContext.jsx     (Already exists)
└── App.jsx                         (Updated with routes & providers)
```

## Component Hierarchy

```
App
├── PromoterAuthProvider
│   └── Router
│       ├── /promoter/signup → PromoterSignup
│       ├── /promoter/login → PromoterLogin
│       ├── /promoter/dashboard → PromoterDashboard
│       ├── /admin → Admin
│       │   └── AdminPromoters (Tab content)
│       └── ... (other existing routes)
```

## Data Flow

### Signup Flow
```
PromoterSignup
    ↓ (form submission with multi-step validation)
PromoterAuthContext.signup()
    ↓ (POST /api/promoters/signup)
Backend API
    ↓ (creates promoter, sends email)
→ PromoterAuthContext updates (token, promoter data)
→ Navigate to /promoter/dashboard
```

### Login Flow
```
PromoterLogin
    ↓ (email + password)
PromoterAuthContext.login()
    ↓ (POST /api/promoters/login)
Backend API
    ↓ (verifies credentials, returns JWT)
→ PromoterAuthContext stores token in localStorage
→ Navigate to /promoter/dashboard
```

### Dashboard Flow
```
PromoterDashboard (mounts)
    ↓ (useEffect checks promoterToken)
    ├─ If no token → redirect to /promoter/login
    └─ If token exists:
        ├─ GET /api/promoters/me/dashboard
        └─ GET /api/promoters/me/payouts
           ↓
        Display earnings, coupon, payout status
```

### Admin Promoters Flow
```
Admin (with promoters tab active)
    ↓ (renders AdminPromoters component)
AdminPromoters
    ↓ (on mount + filter change)
    ├─ GET /api/admin/promoters?status=filter
    └─ Display filterable table
       ├─ On approve: POST /api/admin/promoters/:id/approve
       └─ On reject: POST /api/admin/promoters/:id/reject
```

## Styling System

### Color Palette
- **Primary Green**: #059669 (main action)
- **Light Green**: #dcfce7 (success/active badge)
- **Dark Green**: #166534 (text on green)
- **Gray**: #6b7280 (secondary text)
- **Dark Gray**: #111827 (primary text)
- **Light Gray**: #f9fafb (background)
- **Red**: #fee2e2 (error/failure badge)
- **Yellow**: #fef3c7 (pending badge)

### Layout Patterns
- **Cards**: White background, 12px border radius, subtle shadow
- **Buttons**: 12px padding, 6px border radius, full width on mobile
- **Tables**: Striped rows, clear headers, compact cells
- **Forms**: Stacked inputs with labels and validation messages

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All pages use `display: grid` and `display: flex` for responsive layouts.

## Error Handling

- **Network Errors**: Toast notification with error message
- **Validation Errors**: Inline error text below form fields
- **Auth Errors**: Redirects to login on 401 responses
- **Admin Auth**: Redirects to dashboard if not authorized
- **Missing Data**: Graceful fallbacks (N/A, "None yet", etc.)

## Loading States

- **Page Loading**: Centered spinner with "Loading dashboard..."
- **Action Loading**: Disabled button with "..." or "Processing..."
- **Data Loading**: Skeleton/placeholder content during fetch

## Success Feedback

- Toast notifications for: login, signup, payout requests, approvals
- Animated visual confirmation (copy button shows "✓ Copied!")
- Status badges update immediately after actions
