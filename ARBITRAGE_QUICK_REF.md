# Arbitrage Betting - Quick Reference

## 🎯 Tier System Summary

| Donation Amount | Lifetime Total | Tier | Opportunities |
|----------------|----------------|------|---------------|
| $1-$4.99 | < $5 | Bronze | 3 |
| $5-$14.99 | < $15 | Silver | 5 |
| $1-$4.99 | $5+ | Silver ⬆️ | 5 |
| $15-$49.99 | < $50 | Gold | 10 |
| $5-$14.99 | $15+ | Gold ⬆️ | 10 |
| $50+ | Any | Platinum | ALL |
| Any | $50+ | Platinum ⬆️ | ALL |

## 🔑 Required Environment Variables

```bash
# .env.local
RAPIDAPI_KEY=your_key_here
STRIPE_WEBHOOK_SECRET=whsec_your_secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 🚀 Quick Start

1. **Add RapidAPI Key** to `.env.local`
2. **Start Stripe Webhook Listener**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```
3. **Run Dev Server**:
   ```bash
   pnpm dev
   ```
4. **Test**: Donate → Check `/portal/opportunities`

## 📍 Key URLs

- **Donate**: `/login/donate`
- **View Opportunities**: `/portal/opportunities`
- **Success Page**: `/login/donate/success`

## 🔧 API Endpoints

- `POST /api/create-payment-intent` - Create payment with user metadata
- `GET /api/fetch-arbitrage` - Fetch arbitrage opportunities from RapidAPI
- `POST /api/webhooks/stripe` - Handle Stripe payment success webhooks

## 💾 Firebase Functions

- `calculateTier(donation, lifetime)` - Determine user's tier
- `addDonationAndAssignOpportunities()` - Process donation & assign bets
- `getUserOpportunities()` - Fetch user's opportunities
- `getUserDonationInfo()` - Get donation stats and tier

## 🧪 Test Cards

- **Success**: `4242 4242 4242 4242`
- **Decline**: `4000 0000 0000 9995`
- **3D Secure**: `4000 0025 0000 3155`

Any CVC, any future date, any ZIP

## 📊 What Gets Stored in Firebase

```javascript
users/{userId}
  ├─ totalDonations: number
  ├─ currentTier: string
  ├─ donations: array
  └─ arbitrageOpportunities: array
```

## ✅ Success Checklist

- [x] RapidAPI key added
- [x] Stripe webhook configured
- [x] Environment variables set
- [x] Firebase security rules updated
- [x] Test donation completed
- [x] Opportunities visible

## 🎨 Components

- `<ArbitrageTable />` - Display opportunities table
- `<StripeCheckout user={user} />` - Payment form (requires authenticated user)

## 🔗 User Flow

1. Login → 2. Portal → 3. Donate → 4. Pay → 5. View Opportunities

---

**Full setup guide**: See `ARBITRAGE_SETUP.md`
