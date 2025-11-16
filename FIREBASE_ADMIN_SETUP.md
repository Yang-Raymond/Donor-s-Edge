# Firebase Admin SDK Setup

## Why This Is Needed

The Stripe webhook runs on the **server-side** and needs to write to Firestore. The client-side Firebase SDK doesn't work for server operations. We need the Firebase Admin SDK with service account credentials.

## Steps to Get Service Account Credentials

### 1. Go to Firebase Console
Navigate to: https://console.firebase.google.com/project/donor-s-edge/settings/serviceaccounts/adminsdk

### 2. Generate New Private Key
1. Click on the **"Service accounts"** tab
2. Click **"Generate new private key"**
3. Click **"Generate key"** in the confirmation dialog
4. A JSON file will be downloaded (e.g., `donor-s-edge-firebase-adminsdk-xxxxx.json`)

### 3. Extract Credentials from JSON

Open the downloaded JSON file and find these values:
- `project_id`
- `private_key`
- `client_email`

### 4. Add to `.env.local`

Add these three new environment variables to your `.env.local` file:

```bash
# Firebase Admin SDK (for server-side operations)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@donor-s-edge.iam.gserviceaccount.com"
```

**Important Notes:**
- The `FIREBASE_PRIVATE_KEY` must be wrapped in quotes
- Keep the `\n` characters in the private key (don't replace them with actual newlines)
- The `project_id` is already set as `NEXT_PUBLIC_PROJECT_ID`

### Example `.env.local` with Admin SDK:

```bash
# Firebase Configuration (Client SDK)
NEXT_PUBLIC_API_KEY=your_firebase_api_key
NEXT_PUBLIC_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_PROJECT_ID=your-project-id
NEXT_PUBLIC_STORAGE_BUCKET=your-project.firebasestorage.app
NEXT_PUBLIC_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_APP_ID=your_app_id

# Firebase Admin SDK (Server-side)
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYourPrivateKeyHere\n-----END PRIVATE KEY-----\n"
FIREBASE_CLIENT_EMAIL="firebase-adminsdk-xxxxx@your-project.iam.gserviceaccount.com"

# Stripe API Keys
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxxxxxxxxxx

# RapidAPI (Odds API)
RAPIDAPI_KEY=your_rapidapi_key

# Site URL (for webhooks)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 5. Restart Dev Server

After adding the credentials:
1. Stop the Next.js dev server (Ctrl+C)
2. Restart it: `pnpm dev`

### 6. Test the Webhook

Now test a payment and the webhook should work properly!

## Security Notes

⚠️ **Never commit the service account JSON file or `.env.local` to git!**

The `.gitignore` file should already include:
- `.env.local`
- `*.json` (service account files)

## Troubleshooting

### "FIREBASE_PRIVATE_KEY is not defined"
- Make sure you added the env variable to `.env.local`
- Make sure you restarted the dev server

### "Error parsing service account key"
- Check that the private key is wrapped in quotes
- Keep the `\n` characters (don't replace with actual newlines)

### "Permission denied" still appearing
- Verify the service account email is correct
- Check Firebase Console → Project Settings → Service Accounts
- Make sure the service account has the "Firebase Admin SDK Administrator Service Agent" role
