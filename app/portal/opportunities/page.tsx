"use client";

import { useState, useEffect } from "react";
import { User } from "firebase/auth";
import { onAuthStateChange } from "../../server/authentication";
import { redirect } from "next/navigation";
import Link from "next/link";
import Header from "../../components/header";
import Footer from "../../components/footer";
import ArbitrageTable from "../../components/arbitrage-table";
import { ArbitrageOpportunity } from "../../api/fetch-arbitrage/route";

export default function OpportunitiesPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [opportunities, setOpportunities] = useState<ArbitrageOpportunity[]>([]);
  const [donationInfo, setDonationInfo] = useState<{
    totalDonations: number;
    currentTier: string;
    opportunitiesCount: number;
  } | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChange(async (currentUser) => {
      setUser(currentUser);
      
      if (!currentUser) {
        redirect("/login");
        return;
      }

      try {
        // Fetch user's opportunities and donation info from API
        const response = await fetch(`/api/user-opportunities?userId=${currentUser.uid}`);
        const data = await response.json();

        if (data.success) {
          setOpportunities(data.opportunities || []);
          setDonationInfo(data.donationInfo);
        } else {
          console.error("Failed to fetch opportunities:", data.error);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <Header />
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-300 text-lg">Loading your opportunities...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect to login
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <Header />

      <div className="container mx-auto px-4 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)' }}>
            Your Arbitrage Opportunities
          </h1>
          <p className="text-xl text-gray-300">
            Exclusive betting opportunities based on your donations
          </p>
        </div>

        {/* User Stats Card */}
        {donationInfo && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-white mb-2">
                    ${donationInfo.totalDonations.toFixed(2)}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wide">Total Donations</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">
                    {donationInfo.currentTier}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wide">Current Tier</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {donationInfo.opportunitiesCount}
                  </div>
                  <div className="text-gray-300 text-sm uppercase tracking-wide">Active Opportunities</div>
                </div>
              </div>
              
              {/* Tier Progress */}
              <div className="mt-6 pt-6 border-t border-white/10">
                <div className="flex items-center justify-between text-sm text-gray-300 mb-2">
                  <span>Bronze</span>
                  <span>Silver ($5)</span>
                  <span>Gold ($15)</span>
                  <span>Platinum ($50)</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min((donationInfo.totalDonations / 50) * 100, 100)}%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action if no opportunities */}
        {opportunities.length === 0 && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-xl p-8 text-center">
              <div className="text-6xl mb-4">💝</div>
              <h2 className="text-2xl font-bold text-white mb-3">
                No Opportunities Yet
              </h2>
              <p className="text-gray-300 mb-6">
                Make a donation to receive exclusive arbitrage betting opportunities!
              </p>
              <Link
                href="/login/donate"
                className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition duration-200 font-semibold"
              >
                Make a Donation
              </Link>
            </div>
          </div>
        )}

        {/* Arbitrage Table */}
        <div className="mb-12">
          <ArbitrageTable opportunities={opportunities} loading={false} />
        </div>

        {/* Additional Info */}
        {opportunities.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 rounded-xl p-6 border border-white/10">
              <h3 className="text-xl font-bold text-white mb-4">📖 How to Use These Opportunities</h3>
              <ol className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold">1.</span>
                  <span>Create accounts on the bookmakers listed (if you haven't already)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold">2.</span>
                  <span>Click on the bookmaker names to go directly to the event</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold">3.</span>
                  <span>Place bets on ALL outcomes listed for each opportunity</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-400 font-bold">4.</span>
                  <span>Your profit is guaranteed regardless of the outcome!</span>
                </li>
              </ol>
              <div className="mt-6 pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400">
                  <strong className="text-white">Note:</strong> These opportunities are time-sensitive. 
                  Odds can change quickly, so act fast to secure your arbitrage profit.
                </p>
              </div>
            </div>

            {/* Donate More Button */}
            <div className="mt-8 text-center">
              <Link
                href="/login/donate"
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl hover:from-blue-600 hover:to-purple-700 transition duration-200 font-bold text-lg shadow-lg"
              >
                💝 Donate More for Additional Opportunities
              </Link>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
