import { adminDb } from "./firebase-admin";
import * as admin from "firebase-admin";
import { ArbitrageOpportunity } from "../api/fetch-arbitrage/route";

export interface UserDonation {
  amount: number;
  date: string;
  paymentId: string;
  tierAssigned: string;
  opportunitiesCount: number;
}

export interface UserData {
  email: string;
  totalDonations: number;
  donations: UserDonation[];
  arbitrageOpportunities: ArbitrageOpportunity[];
  createdAt: string;
  lastDonationDate?: string;
  currentTier?: string;
}

/**
 * Calculate user tier based on donation amount and lifetime total
 * @param currentDonation - Amount of current donation
 * @param lifetimeTotal - Total lifetime donations
 * @returns Object containing tier name and number of opportunities
 */
export function calculateTier(currentDonation: number, lifetimeTotal: number): {
  tier: string;
  opportunitiesCount: number;
} {
  if (lifetimeTotal >= 50) {
    return { tier: "Platinum", opportunitiesCount: -1 };
  }
  
  if (lifetimeTotal >= 15) {
    return { tier: "Gold", opportunitiesCount: 10 };
  }
  
  if (lifetimeTotal >= 5) {
    return { tier: "Silver", opportunitiesCount: 5 };
  }
  
  if (currentDonation >= 50) {
    return { tier: "Platinum", opportunitiesCount: -1 };
  }
  
  if (currentDonation >= 15) {
    return { tier: "Gold", opportunitiesCount: 10 };
  }
  
  if (currentDonation >= 5) {
    return { tier: "Silver", opportunitiesCount: 5 };
  }
  
  return { tier: "Bronze", opportunitiesCount: 3 };
}

/**
 * Get or create user document in Firestore
 * @param userId - Firebase user ID
 * @param email - User's email address
 * @returns Promise resolving to UserData
 */
export async function getOrCreateUser(userId: string, email: string): Promise<UserData> {
  const userRef = adminDb.collection("users").doc(userId);
  const userSnap = await userRef.get();

  if (userSnap.exists) {
    return userSnap.data() as UserData;
  }

  const newUser: UserData = {
    email,
    totalDonations: 0,
    donations: [],
    arbitrageOpportunities: [],
    createdAt: new Date().toISOString(),
    currentTier: "Bronze",
  };

  await userRef.set(newUser);
  return newUser;
}

/**
 * Add donation and assign arbitrage opportunities to user
 * @param userId - Firebase user ID
 * @param email - User's email address
 * @param amount - Donation amount in dollars
 * @param paymentId - Stripe payment ID
 * @param opportunities - Array of available arbitrage opportunities
 * @returns Promise resolving to object with tier, count, and assigned opportunities
 */
export async function addDonationAndAssignOpportunities(
  userId: string,
  email: string,
  amount: number,
  paymentId: string,
  opportunities: ArbitrageOpportunity[]
): Promise<{ tier: string; opportunitiesCount: number; opportunities: ArbitrageOpportunity[] }> {
  const userRef = adminDb.collection("users").doc(userId);
  
  const userData = await getOrCreateUser(userId, email);
  const newLifetimeTotal = userData.totalDonations + amount;
  
  const { tier, opportunitiesCount } = calculateTier(amount, newLifetimeTotal);
  
  let selectedOpportunities: ArbitrageOpportunity[];
  if (opportunitiesCount === -1) {
    selectedOpportunities = opportunities;
  } else {
    selectedOpportunities = opportunities.slice(0, opportunitiesCount);
  }
  
  const donation: UserDonation = {
    amount,
    date: new Date().toISOString(),
    paymentId,
    tierAssigned: tier,
    opportunitiesCount: selectedOpportunities.length,
  };
  
  await userRef.update({
    totalDonations: admin.firestore.FieldValue.increment(amount),
    lastDonationDate: new Date().toISOString(),
    donations: admin.firestore.FieldValue.arrayUnion(donation),
    arbitrageOpportunities: selectedOpportunities,
    currentTier: tier,
  });
  
  return {
    tier,
    opportunitiesCount: selectedOpportunities.length,
    opportunities: selectedOpportunities,
  };
}

/**
 * Get user's arbitrage opportunities
 * @param userId - Firebase user ID
 * @returns Promise resolving to array of ArbitrageOpportunity
 */
export async function getUserOpportunities(userId: string): Promise<ArbitrageOpportunity[]> {
  const userRef = adminDb.collection("users").doc(userId);
  const userSnap = await userRef.get();
  
  if (!userSnap.exists) {
    return [];
  }
  
  const userData = userSnap.data() as UserData;
  return userData.arbitrageOpportunities || [];
}

/**
 * Get user's donation history and tier information
 * @param userId - Firebase user ID
 * @returns Promise resolving to donation info object or null if user not found
 */
export async function getUserDonationInfo(userId: string): Promise<{
  totalDonations: number;
  currentTier: string;
  donations: UserDonation[];
  opportunitiesCount: number;
} | null> {
  const userRef = adminDb.collection("users").doc(userId);
  const userSnap = await userRef.get();
  
  if (!userSnap.exists) {
    return null;
  }
  
  const userData = userSnap.data() as UserData;
  const currentTier = userData.currentTier || calculateTier(0, userData.totalDonations).tier;
  
  return {
    totalDonations: userData.totalDonations,
    currentTier,
    donations: userData.donations || [],
    opportunitiesCount: (userData.arbitrageOpportunities || []).length,
  };
}
