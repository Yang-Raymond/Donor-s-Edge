import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { addDonationAndAssignOpportunities } from "../../../server/firebase-user-service";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-10-29.clover",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(request: NextRequest) {
  console.log("🔔 Webhook received!");
  
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    console.log("📝 Signature present:", !!signature);

    if (!signature) {
      console.error("❌ No signature found");
      return NextResponse.json(
        { error: "No signature found" },
        { status: 400 }
      );
    }

    // Verify webhook signature
    let event: Stripe.Event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // Handle the payment_intent.succeeded event
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      
      console.log("✅ Payment succeeded:", paymentIntent.id);
      console.log("💰 Amount:", paymentIntent.amount / 100);
      
      // Extract metadata (we'll need to add this when creating payment intent)
      const userId = paymentIntent.metadata?.userId;
      const userEmail = paymentIntent.metadata?.userEmail;
      
      console.log("👤 User ID:", userId);
      console.log("📧 User Email:", userEmail);
      
      if (!userId || !userEmail) {
        console.error("❌ Missing userId or userEmail in payment metadata");
        return NextResponse.json({ received: true });
      }

      const amount = paymentIntent.amount / 100; // Convert cents to dollars

      try {
        console.log("🎯 Fetching arbitrage opportunities...");
        
        // Fetch current arbitrage opportunities
        const arbitrageResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/fetch-arbitrage`,
          { method: "GET" }
        );
        
        const arbitrageData = await arbitrageResponse.json();
        
        console.log("📊 Arbitrage data received:", {
          success: arbitrageData.success,
          count: arbitrageData.opportunities?.length || 0
        });
        
        if (!arbitrageData.success || !arbitrageData.opportunities) {
          console.error("❌ Failed to fetch arbitrage opportunities");
          return NextResponse.json({ received: true });
        }

        console.log("💾 Assigning opportunities to user...");
        
        // Assign opportunities to user based on donation tier
        const result = await addDonationAndAssignOpportunities(
          userId,
          userEmail,
          amount,
          paymentIntent.id,
          arbitrageData.opportunities
        );

        console.log(`✨ Assigned ${result.opportunitiesCount} opportunities to user ${userId} (${result.tier} tier)`);
        
      } catch (error) {
        console.error("❌ Error processing donation:", error);
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook handler failed" },
      { status: 500 }
    );
  }
}
