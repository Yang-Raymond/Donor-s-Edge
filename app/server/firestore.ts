import {db} from './connection_to_firebase';
import { getCurrentUser } from './authentication';
import { doc, getDoc, updateDoc, increment, setDoc } from 'firebase/firestore';

/**
 * Create a new user document in Firestore
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
        currentTier: "Bronze", // Default tier for new users
    });
    console.log("User document created in Firestore successfully");
};

/**
 * Ensure user document exists, create if not
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
            currentTier: "Bronze", // Default tier for new users
        });
        console.log("New user document created in Firestore");
    }
};

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
 * Calculate and update user's tier based on total donations
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
 */
export const updateUserTier = async (uid: string, tier: string): Promise<void> => {
    const userDocRef = doc(db, "users", uid);
    await updateDoc(userDocRef, {
        currentTier: tier,
    });
    console.log(`User tier updated to: ${tier}`);
}