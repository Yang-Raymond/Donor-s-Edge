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
  currentTier?: string; // Track current tier for the user
}

/**
 * Calculate tier based on donation amount and lifetime total
 */
export function calculateTier(currentDonation: number, lifetimeTotal: number): {
  tier: string;
  opportunitiesCount: number;
} {
  // Check lifetime total first for tier upgrades
  if (lifetimeTotal >= 50) {
    return { tier: "Platinum", opportunitiesCount: -1 }; // -1 means all
  }
  
  if (lifetimeTotal >= 15) {
    return { tier: "Gold", opportunitiesCount: 10 };
  }
  
  if (lifetimeTotal >= 5) {
    return { tier: "Silver", opportunitiesCount: 5 };
  }
  
  // If lifetime total doesn't qualify for upgrade, use current donation
  if (currentDonation >= 50) {
    return { tier: "Platinum", opportunitiesCount: -1 };
  }
  
  if (currentDonation >= 15) {
    return { tier: "Gold", opportunitiesCount: 10 };
  }
  
  if (currentDonation >= 5) {
    return { tier: "Silver", opportunitiesCount: 5 };
  }
  
  // Bronze tier (minimum $1)
  return { tier: "Bronze", opportunitiesCount: 3 };
}

/**
 * Get or create user document in Firestore
 */
export async function getOrCreateUser(userId: string, email: string): Promise<UserData> {
  const userRef = adminDb.collection("users").doc(userId);
  const userSnap = await userRef.get();

  if (userSnap.exists) {
    return userSnap.data() as UserData;
  }

  // Create new user
  const newUser: UserData = {
    email,
    totalDonations: 0,
    donations: [],
    arbitrageOpportunities: [],
    createdAt: new Date().toISOString(),
    currentTier: "Bronze", // Default tier for new users
  };

  await userRef.set(newUser);
  return newUser;
}

/**
 * Add donation and assign arbitrage opportunities
 */
export async function addDonationAndAssignOpportunities(
  userId: string,
  email: string,
  amount: number,
  paymentId: string,
  opportunities: ArbitrageOpportunity[]
): Promise<{ tier: string; opportunitiesCount: number; opportunities: ArbitrageOpportunity[] }> {
  const userRef = adminDb.collection("users").doc(userId);
  
  // Get current user data
  const userData = await getOrCreateUser(userId, email);
  const newLifetimeTotal = userData.totalDonations + amount;
  
  // Calculate tier based on current donation and lifetime total
  const { tier, opportunitiesCount } = calculateTier(amount, newLifetimeTotal);
  
  // Select opportunities based on tier
  let selectedOpportunities: ArbitrageOpportunity[];
  if (opportunitiesCount === -1) {
    // Platinum: All opportunities
    selectedOpportunities = opportunities;
  } else {
    // Take top X opportunities
    selectedOpportunities = opportunities.slice(0, opportunitiesCount);
  }
  
  // Create donation record
  const donation: UserDonation = {
    amount,
    date: new Date().toISOString(),
    paymentId,
    tierAssigned: tier,
    opportunitiesCount: selectedOpportunities.length,
  };
  
  // Update user document
  await userRef.update({
    totalDonations: admin.firestore.FieldValue.increment(amount),
    lastDonationDate: new Date().toISOString(),
    donations: admin.firestore.FieldValue.arrayUnion(donation),
    arbitrageOpportunities: selectedOpportunities, // Replace with new opportunities
    currentTier: tier, // Update the user's current tier
  });
  
  return {
    tier,
    opportunitiesCount: selectedOpportunities.length,
    opportunities: selectedOpportunities,
  };
}

/**
 * Get user's arbitrage opportunities
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
 * Get user's donation history and tier info
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
  // Use stored tier if available, otherwise calculate it
  const currentTier = userData.currentTier || calculateTier(0, userData.totalDonations).tier;
  
  return {
    totalDonations: userData.totalDonations,
    currentTier,
    donations: userData.donations || [],
    opportunitiesCount: (userData.arbitrageOpportunities || []).length,
  };
}
