"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Header from "../../../components/header";
import Footer from "../../../components/footer";

/**
 * PaymentSuccessPage Component
 * 
 * Handles the post-payment flow by:
 * 1. Extracting payment parameters from the URL
 * 2. Verifying payment completion
 * 3. Displaying success/error UI accordingly
 * 
 * @returns {JSX.Element} The payment success/error page
 */

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  
  // Track the current payment verification status
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  /**
   * Effect: Verify payment completion on component mount
   * 
   * Checks for required Stripe payment parameters in the URL.
   * If both payment_intent and payment_intent_client_secret exist,
   * the payment is considered successful.
   */
  useEffect(() => {
    const paymentIntent = searchParams.get("payment_intent");
    const paymentIntentClientSecret = searchParams.get("payment_intent_client_secret");

    // Verify both required parameters are present
    if (paymentIntent && paymentIntentClientSecret) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        {status === "loading" && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {status === "success" && (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Thank You!
                </h1>
                <p className="text-gray-600 mb-6">
                  Your donation has been processed successfully. We truly appreciate your support!
                </p>
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
                  <p className="text-sm text-gray-700">
                    A receipt has been sent to your email address.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <Link
                  href="/portal/opportunities"
                  className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                >
                  🎯 View Your Arbitrage Opportunities
                </Link>
                <Link
                  href="/portal"
                  className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition duration-200 font-medium"
                >
                  Go to Portal
                </Link>
                <Link
                  href="/login/donate"
                  className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition duration-200 font-medium"
                >
                  Make Another Donation
                </Link>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Payment Error
                </h1>
                <p className="text-gray-600 mb-6">
                  We couldn't verify your payment. Please contact support if you believe this is an error.
                </p>
              </div>

              <div className="space-y-3">
                <Link
                  href="/login/donate"
                  className="block w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 font-medium"
                >
                  Try Again
                </Link>
                <Link
                  href="/login"
                  className="block w-full bg-gray-100 text-gray-700 py-3 px-4 rounded-md hover:bg-gray-200 transition duration-200 font-medium"
                >
                  Back to Login
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
          <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          </div>
        </div>
      }>
        <PaymentSuccessContent />
      </Suspense>
      <Footer />
    </>
  );
}
