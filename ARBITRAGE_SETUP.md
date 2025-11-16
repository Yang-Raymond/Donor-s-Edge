# Arbitrage Betting Feature - Setup Guide

## 🎯 Overview

The arbitrage betting tier system has been successfully implemented! Users now receive arbitrage opportunities based on their donation amounts.

## 📊 Tier System

### One-Time Donations:
- **$1-$4.99** → 3 arbitrage opportunities
- **$5-$14.99** → 5 arbitrage opportunities
- **$15-$49.99** → 10 arbitrage opportunities
- **$50+** → ALL available arbitrage opportunities

### Lifetime Donations (Tier Upgrades):
- **$5+ lifetime total** → 5 opportunities (upgraded from 3)
- **$15+ lifetime total** → 10 opportunities (upgraded from 5)
- **$50+ lifetime total** → ALL opportunities

## 🔧 Setup Instructions

### 1. Add RapidAPI Key

1. Sign up at [RapidAPI](https://rapidapi.com/)
2. Subscribe to the [Odds API](https://rapidapi.com/luka-mochnik-luka-mochnik-default/api/odds-api1/)
3. Copy your API key
4. Add to `.env.local`:
   ```
   RAPIDAPI_KEY=your_rapidapi_key_here
   ```

### 2. Set Up Stripe Webhooks

For the system to automatically assign arbitrage opportunities after payment, you need to configure Stripe webhooks:

#### Development (Local Testing):

1. Install Stripe CLI:
   ```bash
   # Windows (PowerShell)
   scoop install stripe
   
   # Or download from: https://stripe.com/docs/stripe-cli
   ```

2. Login to Stripe CLI:
   ```bash
   stripe login
   ```

3. Forward webhooks to your local server:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

4. Copy the webhook signing secret (starts with `whsec_`) and add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

#### Production:

1. Go to [Stripe Dashboard → Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Enter your webhook URL: `https://yourdomain.com/api/webhooks/stripe`
4. Select events to listen for:
   - `payment_intent.succeeded`
5. Copy the signing secret and add to your production environment variables

### 3. Configure Firestore Rules

Update your Firebase Firestore security rules to allow the app to read/write user data:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      // Allow users to read their own data
      allow read: if request.auth != null && request.auth.uid == userId;
      
      // Allow server (via Admin SDK) to write
      allow write: if request.auth != null;
    }
  }
}
```

### 4. Update Environment Variables

Make sure your `.env.local` has all required variables:

```bash
# Firebase
NEXT_PUBLIC_API_KEY=your_firebase_api_key
NEXT_PUBLIC_AUTH_DOMAIN=your_firebase_auth_domain
NEXT_PUBLIC_PROJECT_ID=your_firebase_project_id
NEXT_PUBLIC_STORAGE_BUCKET=your_firebase_storage_bucket
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_firebase_sender_id
NEXT_PUBLIC_APP_ID=your_firebase_app_id

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx

# RapidAPI
RAPIDAPI_KEY=your_rapidapi_key

# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change to your domain in production
```

## 🚀 Testing the System

### 1. Start the Development Server
```bash
pnpm dev
```

### 2. Start Stripe Webhook Forwarding (in another terminal)
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

### 3. Test the Flow

1. **Login**: Go to `/login` and sign in
2. **Donate**: Click "Donate to ByYourSide Society" button
3. **Choose Amount**: Select $25 (should get 5 opportunities)
4. **Pay**: Use test card `4242 4242 4242 4242`
5. **View Opportunities**: After successful payment, click "View Your Arbitrage Opportunities"
6. **Check Firebase**: Verify user document was created with opportunities

### 4. Test Different Tiers

- **Bronze**: Donate $3 → Should receive 3 opportunities
- **Silver**: Donate $7 → Should receive 5 opportunities
- **Gold**: Donate $20 → Should receive 10 opportunities
- **Platinum**: Donate $50 → Should receive ALL opportunities

### 5. Test Tier Upgrades

1. Donate $3 (Bronze - 3 opportunities)
2. Check total donations in Firebase
3. Donate $2 more (now $5 lifetime)
4. Should receive 5 opportunities (upgraded to Silver)

## 📁 File Structure

```
app/
├── api/
│   ├── create-payment-intent/route.ts   # Creates payment with user metadata
│   ├── fetch-arbitrage/route.ts         # Fetches bets from RapidAPI
│   └── webhooks/stripe/route.ts         # Handles successful payments
├── components/
│   ├── arbitrage-table.tsx              # Displays bet opportunities
│   └── stripe-checkout.tsx              # Payment form (updated with user info)
├── portal/
│   ├── page.tsx                         # Updated with "View Opportunities" button
│   └── opportunities/page.tsx           # Shows user's arbitrage bets
├── login/
│   └── donate/
│       ├── page.tsx                     # Donation form (updated with auth check)
│       └── success/page.tsx             # Success page with opportunities link
└── server/
    └── firebase-user-service.ts          # Handles donation tracking & tier logic
```

## 🔍 How It Works

### Payment Flow:

1. **User Donates**:
   - User selects amount on `/login/donate`
   - Stripe Checkout component creates PaymentIntent with user metadata (userId, email)

2. **Payment Succeeds**:
   - Stripe sends webhook to `/api/webhooks/stripe`
   - Webhook verifies signature
   - Extracts user info from metadata

3. **Assign Opportunities**:
   - Fetches current arbitrage bets from RapidAPI
   - Calculates user's tier based on current donation + lifetime total
   - Sorts opportunities by profit (highest first)
   - Assigns top X opportunities based on tier
   - Stores in Firebase user document

4. **User Views**:
   - User navigates to `/portal/opportunities`
   - Fetches their assigned opportunities from Firebase
   - Displays in styled table with links to bookmakers

## 📊 Firebase Data Structure

```javascript
users/{userId}/
{
  email: "user@example.com",
  totalDonations: 75.00,
  createdAt: "2025-11-16T12:00:00Z",
  lastDonationDate: "2025-11-16T14:30:00Z",
  donations: [
    {
      amount: 25,
      date: "2025-11-16T12:00:00Z",
      paymentId: "pi_xxx",
      tierAssigned: "Silver",
      opportunitiesCount: 5
    },
    {
      amount: 50,
      date: "2025-11-16T14:30:00Z",
      paymentId: "pi_yyy",
      tierAssigned: "Platinum",
      opportunitiesCount: 15
    }
  ],
  arbitrageOpportunities: [
    {
      id: "unique-id",
      match: "Lakers vs Warriors",
      participant1: "Lakers",
      participant2: "Warriors",
      marketName: "Match Winner",
      outcomes: [
        {
          outcomeName: "Lakers",
          bookmakerName: "bet365",
          price: 2.20,
          eventPath: "https://..."
        },
        {
          outcomeName: "Warriors",
          bookmakerName: "betway",
          price: 2.10,
          eventPath: "https://..."
        }
      ],
      profit: 4.32,
      timestamp: "2025-11-16T14:30:00Z"
    }
  ]
}
```

## ⚠️ Important Notes

1. **Webhook Testing**: Always test webhooks locally with Stripe CLI before deploying
2. **API Limits**: Check your RapidAPI subscription limits
3. **Firestore Costs**: Monitor Firebase usage for read/write operations
4. **Blacklisted Bookmakers**: The system filters out unavailable bookmakers (see `BLACKLISTED_BOOKMAKERS` array)
5. **Opportunity Lifespan**: Odds change quickly - opportunities are assigned at donation time and remain static

## 🐛 Troubleshooting

### Webhook Not Receiving Events
- Check Stripe CLI is running
- Verify webhook secret matches in `.env.local`
- Check webhook endpoint logs

### No Opportunities Assigned
- Verify RapidAPI key is correct
- Check if API has rate limits
- Ensure `/api/fetch-arbitrage` endpoint is working

### User Data Not Saving
- Check Firestore security rules
- Verify Firebase config is correct
- Check browser console for errors

## 🎉 Success!

If everything is set up correctly:
- Users donate and immediately receive arbitrage opportunities
- Opportunities are displayed in a beautiful dark-themed table
- Tier system automatically upgrades based on lifetime donations
- All data is securely stored in Firebase

Need help? Check the console logs or Firebase/Stripe dashboards for debugging info!
