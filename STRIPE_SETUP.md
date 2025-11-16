# Stripe Payment Integration Setup

## Overview
This application now includes Stripe payment integration accessible from the login page. Users can make donations without needing to log in first.

## Setup Instructions

### 1. Get Your Stripe API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/register)
2. Create a new account or log in to your existing account
3. Navigate to **Developers** → **API keys**
4. Copy your **Publishable key** (starts with `pk_test_` for test mode)
5. Copy your **Secret key** (starts with `sk_test_` for test mode)

### 2. Configure Environment Variables

1. Create a `.env.local` file in the root directory:
   ```bash
   cp .env.example .env.local
   ```

2. Add your Stripe API keys to `.env.local`:
   ```env
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_secret_key_here
   ```

   ⚠️ **Important**: Never commit `.env.local` to version control. It's already in `.gitignore`.

### 3. Test the Integration

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Navigate to `http://localhost:3000/login`

3. Click on the **"💝 Make a Donation"** button

4. Use Stripe test cards:
   - **Successful payment**: `4242 4242 4242 4242`
   - **Requires authentication**: `4000 0025 0000 3155`
   - **Declined**: `4000 0000 0000 9995`
   - Use any future expiry date, any 3-digit CVC, and any ZIP code

### 4. Go Live

When you're ready to accept real payments:

1. Complete your Stripe account verification
2. Get your **live** API keys (starting with `pk_live_` and `sk_live_`)
3. Update your `.env.local` with the live keys
4. Test thoroughly before deploying

## Features

- ✅ Secure payment processing with Stripe
- ✅ Pre-defined donation amounts ($10, $25, $50, $100)
- ✅ Custom donation amount input
- ✅ Payment confirmation page
- ✅ Responsive design with Tailwind CSS
- ✅ Accessible from the login page (no authentication required)

## File Structure

```
app/
  ├── api/
  │   └── create-payment-intent/
  │       └── route.ts              # Server-side API for creating payment intents
  ├── components/
  │   └── stripe-checkout.tsx       # Reusable Stripe checkout component
  └── login/
      ├── page.tsx                  # Updated with donation link
      └── donate/
          ├── page.tsx              # Donation form page
          └── success/
              └── page.tsx          # Payment success confirmation
```

## Stripe Dashboard

Monitor your payments in the [Stripe Dashboard](https://dashboard.stripe.com):
- View all transactions
- Issue refunds
- Download reports
- Manage customers

## Security Notes

- All payment information is handled securely by Stripe
- Credit card details never touch your server
- PCI compliance is handled by Stripe
- The secret key is only used server-side (API routes)
- The publishable key is safe to expose on the client

## Support

For Stripe-related issues, refer to:
- [Stripe Documentation](https://stripe.com/docs)
- [Stripe API Reference](https://stripe.com/docs/api)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
