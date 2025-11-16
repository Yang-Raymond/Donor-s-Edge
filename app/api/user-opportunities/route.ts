import { NextRequest, NextResponse } from "next/server";
import { getUserOpportunities, getUserDonationInfo } from "../../server/firebase-user-service";

/**
 * Get user's arbitrage opportunities and donation information
 * @param request - Next.js request object with userId query parameter
 * @returns JSON response with opportunities and donation info
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const [opportunities, donationInfo] = await Promise.all([
      getUserOpportunities(userId),
      getUserDonationInfo(userId),
    ]);

    return NextResponse.json({
      success: true,
      opportunities,
      donationInfo,
    });
  } catch (error: any) {
    console.error("Error fetching user opportunities:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}
