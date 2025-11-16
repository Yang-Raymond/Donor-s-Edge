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
 * @param email - User's email address
 * @param password - User's password
 * @returns Promise resolving to UserCredential
 */
export const signInWithEmail = async (
  email: string,
  password: string
): Promise<UserCredential> => {
  return await signInWithEmailAndPassword(auth, email, password);
};

/**
 * Create a new user account with email and password
 * @param email - User's email address
 * @param name - User's display name
 * @param password - User's password
 * @returns Promise resolving to UserCredential
 */
export const signUpWithEmail = async (
  email: string,
  name: string,
  password: string
): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log("User created with UID:", userCredential.user.uid);
    
    await createUserDocument(userCredential.user.uid, name);
    
    return userCredential;
  } catch (error: any) {
    console.error("Error in signUpWithEmail:", error.message);
    throw error;
  }
};

/**
 * Sign in with Google using popup authentication
 * @returns Promise resolving to UserCredential
 */
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    
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
 * @returns Promise resolving to void
 */
export const signOutUser = async (): Promise<void> => {
  return await signOut(auth);
};

/**
 * Get the current authenticated user
 * @returns Current user or null if not authenticated
 */
export const getCurrentUser = (): User | null => {
  return auth.currentUser;
};

/**
 * Listen to authentication state changes
 * @param callback - Function to call when auth state changes
 * @returns Function to unsubscribe from auth state changes
 */
export const onAuthStateChange = (
  callback: (user: User | null) => void
): (() => void) => {
  return auth.onAuthStateChanged(callback);
};
