# Testing Without Stripe Webhooks

## 🚨 Temporary Solution

Until you set up Stripe webhooks, you can manually assign arbitrage opportunities after a donation.

## 📝 Method 1: Manual Assignment via API

After a user makes a donation, call the test endpoint:

### Using the browser console:

1. Make a donation and complete payment
2. Go to `/portal/opportunities`
3. Open browser DevTools (F12)
4. Run this in the console:

```javascript
// Get current user info from Firebase Auth
const user = firebase.auth().currentUser;

// Call test endpoint
fetch('/api/test-assign-opportunities', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    userId: user.uid,
    userEmail: user.email,
    amount: 25, // Dollar amount of donation
    paymentId: 'manual_test_' + Date.now()
  })
})
.then(r => r.json())
.then(data => {
  console.log('Opportunities assigned:', data);
  location.reload(); // Refresh to see opportunities
});
```

### Using curl/Postman:

```bash
curl -X POST http://localhost:3000/api/test-assign-opportunities \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "user_firebase_id",
    "userEmail": "user@example.com", 
    "amount": 25,
    "paymentId": "test_payment_123"
  }'
```

## 🔧 Method 2: Install Stripe CLI

### Windows:

#### Option A: Download Installer
1. Go to https://github.com/stripe/stripe-cli/releases/latest
2. Download `stripe_X.X.X_windows_x86_64.zip`
3. Extract to `C:\stripe` (or any folder)
4. Add to system PATH or use full path

#### Option B: Scoop (if installed)
```powershell
scoop install stripe
```

#### Option C: Chocolatey (if installed)
```powershell
choco install stripe-cli
```

### After Installation:

1. **Login to Stripe**:
   ```bash
   stripe login
   ```

2. **Start webhook forwarding**:
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. **Copy the webhook secret** (starts with `whsec_`) and add to `.env.local`:
   ```
   STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
   ```

4. **Restart your dev server**:
   ```bash
   pnpm dev
   ```

## ✅ Testing Flow (Without Webhooks)

1. **Login** → `/login`
2. **Make Donation** → `/login/donate`
3. **Complete Payment** → Use test card `4242 4242 4242 4242`
4. **Success Page** → You'll see "View Your Arbitrage Opportunities"
5. **Manually Assign** → Run the console script above OR
6. **View Opportunities** → `/portal/opportunities` (will show "No Opportunities" until you manually assign)

## ✅ Testing Flow (With Webhooks)

Once Stripe CLI is set up:

1. **Login** → `/login`
2. **Make Donation** → `/login/donate`
3. **Complete Payment** → Use test card `4242 4242 4242 4242`
4. **Webhook Fires** → Opportunities automatically assigned!
5. **View Opportunities** → `/portal/opportunities` (will show your bets)

## 🔍 Verify It Worked

1. Check browser console for logs
2. Check Firebase console → Firestore → `users/{userId}` → Should see:
   - `arbitrageOpportunities` array
   - `donations` array
   - `totalDonations` updated

## 🐛 Troubleshooting

### "No opportunities available"
- Make sure RapidAPI key is set in `.env.local`
- Check `/api/fetch-arbitrage` endpoint works
- Manually assign using Method 1 above

### "Failed to assign opportunities"
- Check Firebase permissions
- Verify user is logged in
- Check browser console for errors

## 📌 Remember

**The test endpoint is temporary!** 

Once Stripe webhooks are working, opportunities will be assigned automatically after payment. Delete the test endpoint in production.

---

**Quick Test Command (in browser console after donation):**
```javascript
fetch('/api/test-assign-opportunities', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({
    userId: firebase.auth().currentUser.uid,
    userEmail: firebase.auth().currentUser.email,
    amount: 25
  })
}).then(r=>r.json()).then(console.log)
```
