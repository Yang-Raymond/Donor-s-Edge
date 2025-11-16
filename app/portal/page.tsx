'use client';

import { useState } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Donation portal page explaining arbitrage betting rewards program
 */
export default function DonationPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Header />

      <section className="relative pt-32 pb-16 px-6 bg-sky-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Make a Difference Today
          </h1>
          <p className="text-xl md:text-2xl text-sky-100 mb-4">
            Your donation helps us empower the underprivileged in our community
          </p>
          <p className="text-lg text-sky-100 mb-8">
            Every contribution, no matter the size, makes a real impact in someone's life.
          </p>
          
          <Link
            href="/login/donate"
            className="inline-block bg-white text-sky-600 px-8 py-4 rounded-xl hover:bg-sky-50 transition duration-200 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105 mr-4"
          >
            💝 Donate to ByYourSide Society
          </Link>
          
          <Link
            href="/portal/opportunities"
            className="inline-block bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition duration-200 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-105"
          >
            🎯 View My Opportunities
          </Link>
          
          <div className="mt-8 max-w-2xl mx-auto bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-xl p-6">
            <div className="flex items-start gap-4">
              <div className="text-3xl">📜</div>
              <div className="text-left">
                <h3 className="text-xl font-bold text-white mb-2">Tax Receipt Information</h3>
                <p className="text-sky-100">
                  ByYourSide Society is a registered charity. You will receive a tax receipt for your donation via email within 24 hours. 
                  Tax receipts are issued for donations of $20 or more.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              🎁 Exclusive Donor Rewards Program
            </h2>
            <p className="text-xl text-gray-700">
              As a thank you for your generosity, donors receive access to guaranteed profit opportunities
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 border-t-4 border-green-500">
            <div className="grid md:grid-cols-2 gap-8 items-center mb-8">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  What You Get as a Donor
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Arbitrage Betting Opportunities</h4>
                      <p className="text-gray-600">Access to risk-free betting strategies that guarantee profit</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Profitable Opportunities Delivered</h4>
                      <p className="text-gray-600">Receive vetted arbitrage opportunities when they're available</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Step-by-Step Guidance</h4>
                      <p className="text-gray-600">Easy-to-follow instructions for each opportunity</p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="text-2xl">✅</div>
                    <div>
                      <h4 className="font-bold text-lg text-gray-900">Make Your Money Back & More</h4>
                      <p className="text-gray-600">Potential to recoup your donation through guaranteed profits</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-8 rounded-xl">
                <div className="text-center">
                  <div className="text-6xl mb-4">💰</div>
                  <h4 className="text-2xl font-bold text-gray-900 mb-2">Win-Win Opportunity</h4>
                  <p className="text-gray-700 text-lg">
                    Support a great cause while gaining access to profitable betting opportunities
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              📊 What is Arbitrage Betting?
            </h2>
            <p className="text-xl text-gray-700">
              A guaranteed, risk-free way to profit from sports betting
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-blue-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Concept</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Arbitrage betting (also known as "arbing" or "sure betting") is a strategy that exploits differences 
                in odds between different sportsbooks to guarantee a profit regardless of the outcome.
              </p>
              <p className="text-gray-700 leading-relaxed">
                By placing bets on all possible outcomes of an event across different bookmakers, you ensure a profit 
                no matter which team wins or loses.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-8 border-l-4 border-green-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Why It Works</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Different sportsbooks have different opinions on the likelihood of outcomes, creating discrepancies 
                in their odds. When these discrepancies are large enough, they create arbitrage opportunities.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong>The key:</strong> You're not gambling on who will win—you're taking advantage of mathematical 
                certainties in the betting market.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl shadow-xl p-8 md:p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              📈 Real Example: How Arbitrage Betting Works
            </h3>
            
            <div className="bg-white rounded-xl p-6 mb-6">
              <h4 className="text-xl font-bold text-gray-900 mb-4">Scenario: NBA Game - Lakers vs. Warriors</h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-bold text-lg mb-2">Sportsbook A</h5>
                  <p className="text-gray-700">Lakers Win: <span className="font-bold text-blue-600">+220</span> (2.20 odds)</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-bold text-lg mb-2">Sportsbook B</h5>
                  <p className="text-gray-700">Warriors Win: <span className="font-bold text-green-600">+200</span> (2.00 odds)</p>
                </div>
              </div>

              <div className="bg-yellow-50 border-2 border-yellow-300 rounded-lg p-6">
                <h5 className="font-bold text-xl mb-3">Your Arbitrage Strategy:</h5>
                <ul className="space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Bet $100 on Lakers at Sportsbook A (+220 odds)
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    Bet $100 on Warriors at Sportsbook B (+200 odds)
                  </li>
                </ul>
                <div className="border-t-2 border-yellow-400 pt-4">
                  <p className="text-lg mb-2"><strong>Total Investment:</strong> $200</p>
                  <p className="text-lg mb-2">
                    <strong>If Lakers Win:</strong> Win $220, Lose $100 = 
                    <span className="text-green-600 font-bold"> $120 Profit</span>
                  </p>
                  <p className="text-lg mb-2">
                    <strong>If Warriors Win:</strong> Win $200, Lose $100 = 
                    <span className="text-green-600 font-bold"> $100 Profit</span>
                  </p>
                  <p className="text-2xl font-bold text-green-600 mt-4">
                    🎯 Guaranteed Profit Either Way!
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-gray-600 italic">
                * This is a simplified example. Actual arbitrage opportunities are identified by our system in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            🔒 Why Arbitrage Betting is a Sure-Fire Win
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-5xl mb-4 text-center">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Zero Risk</h3>
              <p className="text-gray-700 text-center">
                You cover all possible outcomes. No matter what happens, you profit. It's mathematics, not luck.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-5xl mb-4 text-center">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">We Do the Work</h3>
              <p className="text-gray-700 text-center">
                Our system scans thousands of betting lines daily to find and deliver profitable arbitrage opportunities to you.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="text-5xl mb-4 text-center">💵</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">Consistent Returns</h3>
              <p className="text-gray-700 text-center">
                Typical returns range from 2-5% per opportunity. Multiple opportunities per week add up quickly.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              Important Legal & Ethical Notes
            </h3>
            <ul className="space-y-3 max-w-3xl mx-auto">
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>100% Legal:</strong> Arbitrage betting is completely legal in jurisdictions where sports betting is legal
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>Ethical Practice:</strong> You're simply taking advantage of market inefficiencies—the same principle used in financial markets
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-600 text-xl">✓</span>
                <p className="text-gray-700">
                  <strong>No Exploitation:</strong> Sportsbooks set their own odds—you're just being a smart shopper
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-blue-600 text-xl">ℹ</span>
                <p className="text-gray-700">
                  <strong>Restrictions:</strong> Must be 19+ in Ontario. Responsible gambling practices apply.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            🚀 How to Get Started
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-500 flex items-start gap-4">
              <div className="bg-sky-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-sky-600">1</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Make a Donation</h3>
                <p className="text-gray-700">
                  Contribute any amount to ByYourSide Society and support our mission to help the underprivileged
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-500 flex items-start gap-4">
              <div className="bg-sky-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-sky-600">2</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Get Access</h3>
                <p className="text-gray-700">
                  Receive instant access to our arbitrage betting opportunities platform (coming soon!)
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-500 flex items-start gap-4">
              <div className="bg-sky-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-sky-600">3</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Receive Opportunities</h3>
                <p className="text-gray-700">
                  Get profitable arbitrage opportunities delivered to you when they're available
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-sky-500 flex items-start gap-4">
              <div className="bg-sky-100 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                <span className="text-2xl font-bold text-sky-600">4</span>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Place Your Bets</h3>
                <p className="text-gray-700">
                  Follow our step-by-step instructions to place bets and lock in guaranteed profits
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/login/donate"
              className="inline-block bg-sky-600 text-white px-12 py-5 rounded-xl hover:bg-sky-700 transition duration-200 font-bold text-2xl shadow-xl hover:shadow-2xl transform hover:scale-105"
            >
              💝 Donate Now & Get Access
            </Link>
            <p className="text-gray-600 mt-4">
              Join our community of donors who give back while earning returns
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            ❓ Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is this really risk-free?</h3>
              <p className="text-gray-700">
                Yes! Arbitrage betting is mathematically guaranteed when executed correctly. You bet on all possible 
                outcomes, ensuring a profit regardless of the result. However, you must have accounts with multiple 
                sportsbooks and act quickly on opportunities.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">How much can I make?</h3>
              <p className="text-gray-700">
                Returns typically range from 2-5% per arbitrage opportunity. With multiple opportunities per week, 
                consistent users can see monthly returns of 10-20% or more on their betting capital. The more capital 
                you have available, the more you can earn.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">Do I need betting experience?</h3>
              <p className="text-gray-700">
                No! Our platform provides step-by-step instructions for each opportunity. If you can follow directions 
                and create accounts on sportsbook websites, you can successfully execute arbitrage bets.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">What do I need to get started?</h3>
              <p className="text-gray-700">
                You'll need: (1) Accounts on multiple legal sportsbooks, (2) Capital to place bets (we recommend 
                starting with at least $500-1000), (3) Quick access to your accounts to act on opportunities when they're sent, 
                and (4) A donation to ByYourSide Society to access our platform.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-3">When will this feature be available?</h3>
              <p className="text-gray-700">
                The arbitrage opportunity platform is currently in development. Early donors will receive priority 
                access when it launches. Donate now to secure your spot and support our mission!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
