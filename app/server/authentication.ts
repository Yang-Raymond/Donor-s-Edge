import { auth } from "./connection_to_firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";

import { createUserDocument, ensureUserDocument } from "./firestore";

/**
 * Sign in with email and password
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Create a new user account with email and password
 */
export const signUpWithEmail = async (
  email: string,
  name: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created with UID:", userCredential.user.uid);
    
    // Create user document in Firestore
    await createUserDocument(userCredential.user.uid, name);
    
    return userCredential;
  } catch (error: any) {
    console.error("Error in signUpWithEmail:", error.message);
    throw error;
  }
};

/**
 * Sign in with Google using popup
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
    // Check if user document exists, create if not
    await ensureUserDocument(
      userCredential.user.uid,
      userCredential.user.displayName || ""
    );
    
    return userCredential;
  } catch (error: any) {
    console.error("Error in signInWithGoogle:", error.message);
    throw error;
  }
};

/**
 * Sign out the current user
 */
export const signOutUser = async (): Promise<void> => {
  return await signOut(auth);
};

/**
 * Get the current authenticated user
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Listen to authentication state changes
 */
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  return auth.onAuthStateChanged(callback);
};
