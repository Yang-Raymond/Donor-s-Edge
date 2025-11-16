"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { User } from "firebase/auth";
import { onAuthStateChange } from "../../server/authentication";
import { redirect } from "next/navigation";
import StripeCheckout from "../../components/stripe-checkout";
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function DonatePage() {
  const [amount, setAmount] = useState(2500); // Default $25.00
  const [customAmount, setCustomAmount] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authentication
  useEffect(() => {
    const unsubscribe = onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (!currentUser) {
        redirect("/login");
      }
    });

    return () => unsubscribe();
  }, []);

  const predefinedAmounts = [1000, 2500, 5000, 10000]; // $10, $25, $50, $100

  const handleAmountSelect = (amountInCents: number) => {
    setAmount(amountInCents);
    setSelectedAmount(amountInCents);
    setCustomAmount("");
  };

  const handleCustomAmount = (value: string) => {
    setCustomAmount(value);
    setSelectedAmount(null);
    const amountInCents = Math.round(parseFloat(value) * 100);
    if (!isNaN(amountInCents) && amountInCents >= 50) {
      setAmount(amountInCents);
    }
  };

  const handleProceedToPayment = () => {
    if (amount >= 50) {
      setShowCheckout(true);
    }
  };

  const handleSuccess = () => {
    // Payment successful
    console.log("Payment successful!");
  };

  const handleError = (error: string) => {
    console.error("Payment error:", error);
  };

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
        <div className="max-w-2xl mx-auto">
          {/* Back to login link */}
          <Link
            href="/login"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Login
          </Link>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Make a Donation
            </h1>
            <p className="text-gray-600 mb-8">
              Your support helps us make a difference. Thank you for your generosity!
            </p>

            {!showCheckout ? (
              <div className="space-y-6">
                {/* Predefined amounts */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select an amount
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {predefinedAmounts.map((amountInCents) => (
                      <button
                        key={amountInCents}
                        onClick={() => handleAmountSelect(amountInCents)}
                        className={`py-3 px-4 rounded-md border-2 transition duration-200 font-medium ${
                          selectedAmount === amountInCents
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-300 hover:border-blue-300"
                        }`}
                      >
                        ${(amountInCents / 100).toFixed(2)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Custom amount */}
                <div>
                  <label
                    htmlFor="customAmount"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Or enter a custom amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      id="customAmount"
                      type="number"
                      min="0.50"
                      step="0.01"
                      value={customAmount}
                      onChange={(e) => handleCustomAmount(e.target.value)}
                      placeholder="25.00"
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum donation: $0.50
                  </p>
                </div>

                {/* Total */}
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">
                      Donation Amount:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${(amount / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Proceed button */}
                <button
                  onClick={handleProceedToPayment}
                  disabled={amount < 50}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium text-lg"
                >
                  Proceed to Payment
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Amount summary */}
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-medium text-gray-700">
                      Donation Amount:
                    </span>
                    <span className="text-2xl font-bold text-blue-600">
                      ${(amount / 100).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Stripe checkout */}
                <StripeCheckout
                  amount={amount}
                  description="Donation"
                  user={user}
                  onSuccess={handleSuccess}
                  onError={handleError}
                />

                {/* Back button */}
                <button
                  onClick={() => setShowCheckout(false)}
                  className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition duration-200"
                >
                  Change Amount
                </button>
              </div>
            )}

            {/* Security badge */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500">
                <svg
                  className="w-5 h-5 mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
                Secured by Stripe - Your payment information is safe
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
