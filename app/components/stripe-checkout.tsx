"use client";

import { useState, useEffect } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe, StripeElementsOptions } from "@stripe/stripe-js";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface CheckoutFormProps {
  amount: number;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

function CheckoutForm({ amount, onSuccess, onError }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/login/donate/success`,
        },
      });

      if (error) {
        setErrorMessage(error.message || "An error occurred");
        onError?.(error.message || "An error occurred");
      } else {
        onSuccess?.();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
      onError?.(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
      >
        {loading ? "Processing..." : `Donate $${(amount / 100).toFixed(2)}`}
      </button>
    </form>
  );
}

interface StripeCheckoutProps {
  amount: number;
  description?: string;
  onSuccess?: () => void;
  onError?: (error: string) => void;
}

export default function StripeCheckout({
  amount,
  description,
  onSuccess,
  onError,
}: StripeCheckoutProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create PaymentIntent as soon as the component loads
    const createPaymentIntent = async () => {
      try {
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount,
            currency: "usd",
            description,
          }),
        });

        const data = await response.json();

        if (data.error) {
          setError(data.error);
          onError?.(data.error);
        } else {
          setClientSecret(data.clientSecret);
        }
      } catch (err: any) {
        setError(err.message || "Failed to initialize payment");
        onError?.(err.message || "Failed to initialize payment");
      } finally {
        setLoading(false);
      }
    };

    createPaymentIntent();
  }, [amount, description, onError]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !clientSecret) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error || "Failed to initialize payment"}
      </div>
    );
  }

  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: "stripe",
      variables: {
        colorPrimary: "#2563eb",
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onError={onError} />
    </Elements>
  );
}
