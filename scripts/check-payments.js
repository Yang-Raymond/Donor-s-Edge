// Quick script to check recent Stripe payments
// Run with: node scripts/check-payments.js

const Stripe = require('stripe');
const fs = require('fs');
const path = require('path');

// Read .env.local file
const envPath = path.join(__dirname, '..', '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const secretKey = envContent.match(/STRIPE_SECRET_KEY=(.+)/)[1];

const stripe = new Stripe(secretKey, {
  apiVersion: '2025-10-29.clover',
});

async function checkRecentPayments() {
  try {
    console.log('🔍 Fetching recent payments from Stripe...\n');

    // Get the last 10 payment intents
    const paymentIntents = await stripe.paymentIntents.list({
      limit: 10,
    });

    if (paymentIntents.data.length === 0) {
      console.log('❌ No payments found in your Stripe account.\n');
      return;
    }

    console.log(`✅ Found ${paymentIntents.data.length} recent payment(s):\n`);

    paymentIntents.data.forEach((payment, index) => {
      const amount = (payment.amount / 100).toFixed(2);
      const currency = payment.currency.toUpperCase();
      const status = payment.status;
      const created = new Date(payment.created * 1000).toLocaleString();
      const statusEmoji = status === 'succeeded' ? '✅' : status === 'processing' ? '⏳' : '❌';

      console.log(`${index + 1}. ${statusEmoji} Payment ID: ${payment.id}`);
      console.log(`   Amount: ${currency} $${amount}`);
      console.log(`   Status: ${status.toUpperCase()}`);
      console.log(`   Description: ${payment.description || 'N/A'}`);
      console.log(`   Created: ${created}`);
      console.log(`   Dashboard: https://dashboard.stripe.com/test/payments/${payment.id}`);
      console.log('');
    });

    // Summary
    const successful = paymentIntents.data.filter(p => p.status === 'succeeded').length;
    const totalAmount = paymentIntents.data
      .filter(p => p.status === 'succeeded')
      .reduce((sum, p) => sum + p.amount, 0) / 100;

    console.log('📊 Summary:');
    console.log(`   Successful payments: ${successful}/${paymentIntents.data.length}`);
    console.log(`   Total amount: $${totalAmount.toFixed(2)}\n`);

  } catch (error) {
    console.error('❌ Error fetching payments:', error.message);
  }
}

checkRecentPayments();
