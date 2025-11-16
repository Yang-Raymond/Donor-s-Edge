'use client';

import { useState } from 'react';
import Header from '@/app/components/header';
import Footer from '@/app/components/footer';
import Image from 'next/image';

export default function DonationPortal() {
  const [donationType, setDonationType] = useState<'one-time' | 'monthly'>('one-time');
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'Canada',
  });
  const [donationPurpose, setDonationPurpose] = useState<string>('general');
  const [isAnonymous, setIsAnonymous] = useState(false);

  const predefinedAmounts = [25, 50, 100, 250, 500, 1000];

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = customAmount ? parseFloat(customAmount) : selectedAmount;
    
    if (!finalAmount || finalAmount <= 0) {
      alert('Please select or enter a valid donation amount');
      return;
    }

    // Here you would integrate with a payment processor like Stripe, PayPal, etc.
    console.log('Donation Details:', {
      amount: finalAmount,
      type: donationType,
      purpose: donationPurpose,
      donor: isAnonymous ? 'Anonymous' : donorInfo,
    });

    alert(`Thank you for your ${donationType} donation of $${finalAmount}!`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setDonorInfo(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 to-white">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 px-6 bg-sky-600">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Make a Difference Today
          </h1>
          <p className="text-xl md:text-2xl text-sky-100 mb-4">
            Your donation helps us empower the underprivileged in our community
          </p>
          <p className="text-lg text-sky-100">
            Every contribution, no matter the size, makes a real impact in someone's life.
          </p>
        </div>
      </section>

      {/* Main Donation Form */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleDonationSubmit} className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            
            {/* Donation Type Selection */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Choose Your Donation Type</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDonationType('one-time')}
                  className={`p-6 rounded-xl border-2 transition font-semibold text-lg ${
                    donationType === 'one-time'
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-gray-200 hover:border-sky-300'
                  }`}
                >
                  <div className="text-3xl mb-2">💝</div>
                  One-Time Donation
                </button>
                <button
                  type="button"
                  onClick={() => setDonationType('monthly')}
                  className={`p-6 rounded-xl border-2 transition font-semibold text-lg ${
                    donationType === 'monthly'
                      ? 'border-sky-500 bg-sky-50 text-sky-700'
                      : 'border-gray-200 hover:border-sky-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🔄</div>
                  Monthly Donation
                </button>
              </div>
            </div>

            {/* Amount Selection */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Select Your Donation Amount</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                {predefinedAmounts.map((amount) => (
                  <button
                    key={amount}
                    type="button"
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount('');
                    }}
                    className={`p-6 rounded-xl border-2 transition font-bold text-2xl ${
                      selectedAmount === amount && !customAmount
                        ? 'border-sky-500 bg-sky-500 text-white'
                        : 'border-gray-200 hover:border-sky-300 text-gray-700'
                    }`}
                  >
                    ${amount}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter a custom amount:
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-gray-500">$</span>
                  <input
                    type="number"
                    id="customAmount"
                    name="customAmount"
                    min="1"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setSelectedAmount(null);
                    }}
                    placeholder="Enter amount"
                    className="w-full pl-12 pr-4 py-4 border-2 border-gray-300 rounded-xl text-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Donation Purpose */}
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Where should your donation go?</h2>
              <select
                name="donationPurpose"
                value={donationPurpose}
                onChange={(e) => setDonationPurpose(e.target.value)}
                className="w-full px-4 py-4 border-2 border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              >
                <option value="general">General Support</option>
                <option value="operation-hunger">Operation Hunger</option>
                <option value="project-warmth">Project Warmth</option>
                <option value="education">Education Programs</option>
                <option value="emergency">Emergency Relief</option>
              </select>
            </div>

            {/* Anonymous Donation Option */}
            <div className="mb-10">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                  className="w-5 h-5 text-sky-500 border-gray-300 rounded focus:ring-sky-500"
                />
                <span className="ml-3 text-lg text-gray-700 font-medium">
                  Make this an anonymous donation
                </span>
              </label>
            </div>

            {/* Donor Information */}
            {!isAnonymous && (
              <div className="mb-10">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required={!isAnonymous}
                      value={donorInfo.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required={!isAnonymous}
                      value={donorInfo.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required={!isAnonymous}
                      value={donorInfo.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={donorInfo.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={donorInfo.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={donorInfo.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label htmlFor="postalCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      id="postalCode"
                      name="postalCode"
                      value={donorInfo.postalCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Tax Receipt Information */}
            <div className="mb-10 p-6 bg-sky-50 rounded-xl border-2 border-sky-200">
              <div className="flex items-start gap-4">
                <div className="text-3xl">📜</div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Tax Receipt Information</h3>
                  <p className="text-gray-700">
                    ByYourSide Society is a registered charity. You will receive a tax receipt for your donation via email within 24 hours. 
                    Tax receipts are issued for donations of $20 or more.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-sky-500 text-white py-5 px-8 rounded-xl hover:bg-sky-600 transition font-bold text-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
            >
              Complete Donation {(customAmount || selectedAmount) && `- $${customAmount || selectedAmount}`}
            </button>

            <p className="text-center text-sm text-gray-500 mt-4">
              Your donation is secure and encrypted. We respect your privacy.
            </p>
          </form>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16 px-6 bg-sky-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Your Impact</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">🍽️</div>
              <h3 className="text-2xl font-bold text-sky-600 mb-3">$25</h3>
              <p className="text-gray-700">Provides 5 nutritious meals for families in need</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">👕</div>
              <h3 className="text-2xl font-bold text-sky-600 mb-3">$100</h3>
              <p className="text-gray-700">Supplies warm clothing for a family during winter</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <div className="text-5xl mb-4">📚</div>
              <h3 className="text-2xl font-bold text-sky-600 mb-3">$250</h3>
              <p className="text-gray-700">Funds educational resources for underprivileged students</p>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Help */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">Other Ways to Help</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-sky-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Volunteer</h3>
              <p className="text-gray-700 mb-6">
                Join our team of dedicated volunteers and make a direct impact in your community.
              </p>
              <a href="#volunteer" className="inline-block bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition font-medium">
                Learn More
              </a>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-sky-400">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Corporate Partnerships</h3>
              <p className="text-gray-700 mb-6">
                Partner with us to create lasting change and demonstrate your company's commitment to social responsibility.
              </p>
              <a href="#partner" className="inline-block bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition font-medium">
                Get in Touch
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
