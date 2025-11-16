import { NextRequest, NextResponse } from "next/server";
import { addDonationAndAssignOpportunities } from "../../server/firebase-user-service";

/**
 * TEMPORARY TEST ENDPOINT
 * This simulates what the Stripe webhook does
 * Use this for testing until Stripe webhook is set up
 * 
 * Usage: After making a payment, call this endpoint with:
 * POST /api/test-assign-opportunities
 * Body: { userId, userEmail, amount, paymentId }
 */

export async function POST(request: NextRequest) {
  try {
    const { userId, userEmail, amount, paymentId } = await request.json();

    if (!userId || !userEmail || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: userId, userEmail, amount" },
        { status: 400 }
      );
    }

    console.log(`[TEST] Processing donation for user ${userId}: $${amount}`);

    // Fetch current arbitrage opportunities
    const arbitrageResponse = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/fetch-arbitrage`,
      { method: "GET" }
    );

    const arbitrageData = await arbitrageResponse.json();

    if (!arbitrageData.success || !arbitrageData.opportunities) {
      return NextResponse.json(
        { error: "Failed to fetch arbitrage opportunities" },
        { status: 500 }
      );
    }

    console.log(`[TEST] Found ${arbitrageData.opportunities.length} opportunities`);

    // Assign opportunities to user based on donation tier
    const result = await addDonationAndAssignOpportunities(
      userId,
      userEmail,
      amount,
      paymentId || `test_${Date.now()}`,
      arbitrageData.opportunities
    );

    console.log(`[TEST] Assigned ${result.opportunitiesCount} opportunities (${result.tier} tier)`);

    return NextResponse.json({
      success: true,
      tier: result.tier,
      opportunitiesCount: result.opportunitiesCount,
      message: `Successfully assigned ${result.opportunitiesCount} opportunities to ${result.tier} tier`,
    });
  } catch (error: any) {
    console.error("[TEST] Error processing donation:", error);
    return NextResponse.json(
      { error: error.message || "Failed to assign opportunities" },
      { status: 500 }
    );
  }
}
