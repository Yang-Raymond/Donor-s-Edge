# Stripe Webhook Setup Guide

## ✅ Setup Complete!

Your Stripe webhooks are now properly configured. Here's what was done:

### 1. Stripe CLI Installation
- Downloaded Stripe CLI v1.21.8
- Located in: `.\stripe-cli\stripe.exe`

### 2. Authentication
- Authenticated with Stripe account: **ByYourSide Society sandbox**
- Account ID: `acct_1STtO0PxUA0N6p7m`

### 3. Webhook Configuration
- **Webhook Secret**: `whsec_xxxxxxxxxxxxxxxxxxxxx` (obtained from Stripe CLI)
- **Forwarding URL**: `http://localhost:3000/api/webhooks/stripe`
- **API Version**: `2025-10-29.clover`

### 4. Environment Variables
Your `.env.local` file has been updated with the correct webhook secret.

## How It Works

1. **Stripe CLI Listener**: The Stripe CLI is running in the background, listening for webhook events from Stripe's test environment
2. **Event Forwarding**: When a payment succeeds on Stripe, it sends a webhook event to the CLI
3. **Local Delivery**: The CLI forwards the event to your local Next.js server at `/api/webhooks/stripe`
4. **Processing**: Your webhook handler processes the payment and assigns betting opportunities

## Current Status

✅ Stripe CLI: **RUNNING**  
✅ Webhook Secret: **CONFIGURED**  
✅ Next.js Server: **RUNNING** on http://localhost:3000  
✅ Webhook Endpoint: **READY** at `/api/webhooks/stripe`

## Testing the Setup

To test if everything is working:

1. Go to your donation page: http://localhost:3000/login/donate
2. Make a test payment using Stripe's test card: `4242 4242 4242 4242`
3. Watch the Stripe CLI terminal for webhook events
4. Check the Next.js terminal for processing logs
5. Navigate to: http://localhost:3000/portal/opportunities
6. You should see betting opportunities assigned!

## Important Notes

⚠️ **Keep the Stripe CLI running**: The webhook listener must stay active for webhooks to work. If you close it, you'll need to restart it with:
```powershell
.\stripe-cli\stripe.exe listen --forward-to localhost:3000/api/webhooks/stripe
```

⚠️ **Webhook Secret**: This webhook secret (`whsec_...`) is only valid while the CLI listener is running. If you restart the listener, you'll get a new secret and need to update `.env.local`

⚠️ **Production**: For production, you'll need to:
- Set up webhooks in the Stripe Dashboard
- Add your production webhook secret to your production environment variables
- Use your production Stripe API keys

## Troubleshooting

### Betting opportunities not showing up?

1. Check that the Stripe CLI is still running
2. Verify the webhook secret matches in `.env.local`
3. Restart your Next.js dev server after any `.env.local` changes
4. Check both terminal outputs for errors

### "Webhook signature verification failed"?

- The webhook secret is incorrect or outdated
- Restart the Stripe CLI listener and update the secret in `.env.local`

### CLI says "command not found"?

- Use the full path: `.\stripe-cli\stripe.exe`
- Make sure you're in the project root directory

## Quick Restart Commands

If you need to restart everything:

```powershell
# Stop Next.js (Ctrl+C in the dev server terminal)
# Stop Stripe CLI (Ctrl+C in the listener terminal)

# Restart Stripe CLI
.\stripe-cli\stripe.exe listen --forward-to localhost:3000/api/webhooks/stripe

# Copy the new webhook secret and update .env.local

# Restart Next.js
pnpm dev
```
