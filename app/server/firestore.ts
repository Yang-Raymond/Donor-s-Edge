import {db} from './connection_to_firebase';
import { getCurrentUser } from './authentication';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';

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