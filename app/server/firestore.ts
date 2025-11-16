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