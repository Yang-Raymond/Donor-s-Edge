import * as admin from "firebase-admin";

/**
 * Initialize Firebase Admin SDK
 * 
 * This initialization block ensures the Firebase Admin SDK is initialized only once.
 * Multiple initializations would throw an error, so we check if an app already exists.
 * 
 * The service account credentials are loaded from environment variables for security.
 * The private key requires special handling to convert escaped newline characters (\n)
 * into actual newline characters.
 */
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
    databaseURL: `https://${process.env.NEXT_PUBLIC_PROJECT_ID}.firebaseio.com`,
  });
}

/**
 * Firestore Admin Instance
 * 
 * Provides server-side access to Firestore database with admin privileges.
 * Use this for backend operations that require bypassing security rules.
 * 
 * @example
 * ```typescript
 * import { adminDb } from '@/app/server/firebase-admin';
 * const snapshot = await adminDb.collection('users').get();
 * ```
 */
export const adminDb = admin.firestore();

/**
 * Firebase Auth Admin Instance
 * 
 * Provides server-side access to Firebase Authentication with admin privileges.
 * Use this for user management operations like creating users, verifying tokens,
 * or setting custom claims.
 * 
 * @example
 * ```typescript
 * import { adminAuth } from '@/app/server/firebase-admin';
 * const user = await adminAuth.getUser(uid);
 * ```
 */
export const adminAuth = admin.auth();

/**
 * Default Firebase Admin Export
 * 
 * Exports the entire admin namespace for cases where you need access to
 * other Firebase Admin services not explicitly exported above.
 */
export default admin;
