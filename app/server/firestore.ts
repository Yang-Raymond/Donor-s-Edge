import {db} from './connection_to_firebase';
import { getCurrentUser } from './authentication';
import { doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore';

/**
 * Create a new user document in Firestore
 * @param uid - Firebase user ID
 * @param name - User's display name
 * @returns Promise resolving to void
 */
export const createUserDocument = async (
    uid: string,
    name: string
): Promise<void> => {
    const userDocRef = doc(db, "users", uid);
    await setDoc(userDocRef, {
        name: name || "",
        totalDonations: 0,
        numTimesDonated: 0,
        currentTier: "Bronze",
    });
    console.log("User document created in Firestore successfully");
};

/**
 * Ensure user document exists in Firestore, create if it doesn't
 * @param uid - Firebase user ID
 * @param name - User's display name
 * @returns Promise resolving to void
 */
export const ensureUserDocument = async (
    uid: string,
    name: string
): Promise<void> => {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);
    
    if (!userDoc.exists()) {
        await setDoc(userDocRef, {
            name: name || "",
            totalDonations: 0,
            numTimesDonated: 0,
            currentTier: "Bronze",
        });
        console.log("New user document created in Firestore");
    }
};

/**
 * Update user's donation statistics
 * @param amount - Donation amount in dollars
 * @returns Promise resolving to void
 */
export const updateDonationStats = async (
    amount: number,
): Promise<void> => {
    const uid = getCurrentUser()?.uid;
    if (!uid) {
        throw new Error("No authenticated user found");
    }
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
        totalDonations: increment(amount),
        numTimesDonated: increment(1),
    });
}

/**
 * Calculate user's tier based on total donations
 * @param totalDonations - Total amount donated
 * @returns Tier name as string
 */
export const calculateAndUpdateTier = (totalDonations: number): string => {
    let tier = "Bronze";
    
    if (totalDonations >= 50) {
        tier = "Platinum";
    } else if (totalDonations >= 15) {
        tier = "Gold";
    } else if (totalDonations >= 5) {
        tier = "Silver";
    }
    
    return tier;
}

/**
 * Update user's tier in Firestore
 * @param uid - Firebase user ID
 * @param tier - Tier name to set
 * @returns Promise resolving to void
 */
export const updateUserTier = async (uid: string, tier: string): Promise<void> => {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
        currentTier: tier,
    });
    console.log(`User tier updated to: ${tier}`);
}