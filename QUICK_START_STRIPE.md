# Quick Start - Stripe Integration

## ⚡ Fast Setup (5 minutes)

### Step 1: Get Stripe Test Keys
Visit: https://dashboard.stripe.com/test/apikeys

Copy these two keys:
- **Publishable key** (pk_test_...)
- **Secret key** (sk_test_...)

### Step 2: Create .env.local
```bash
# In the project root, create .env.local with:
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_YOUR_KEY_HERE
STRIPE_SECRET_KEY=sk_test_YOUR_KEY_HERE
```

### Step 3: Run the App
```bash
pnpm dev
```

### Step 4: Test
1. Open http://localhost:3000/login
2. Click "💝 Make a Donation"
3. Use test card: `4242 4242 4242 4242`
4. Any future date, any CVC, any ZIP

## 🧪 More Test Cards

- **Success**: 4242 4242 4242 4242
- **Decline**: 4000 0000 0000 9995
- **3D Secure**: 4000 0025 0000 3155

Full list: https://stripe.com/docs/testing#cards

## 📱 Access Points

- **Donation page**: `/login/donate`
- **From login**: Click the "Make a Donation" button
- **Success page**: Automatic redirect after payment

## ✅ What's Included

✓ Payment processing via Stripe  
✓ Preset amounts ($10, $25, $50, $100)  
✓ Custom donation amounts  
✓ Success/failure handling  
✓ Secure (PCI compliant through Stripe)  
✓ Mobile responsive  

## 🚀 Production Checklist

- [ ] Get live Stripe keys (pk_live_ and sk_live_)
- [ ] Update .env.local with live keys
- [ ] Test with real (small) transactions
- [ ] Set up webhook for payment confirmations (optional)
- [ ] Configure email receipts in Stripe dashboard

## 📖 Full Documentation

See `STRIPE_SETUP.md` for detailed information.
