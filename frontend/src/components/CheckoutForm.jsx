// src/components/CheckoutForm.jsx
import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ setMessage, setLoading }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [paymentIntent, setPaymentIntent] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    setLoading(true);
    const { error: backendError, clientSecret } = await fetch('/create-payment-intent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ amount: 1000 }), // Example amount in cents
    }).then((r) => r.json());

    if (backendError) {
      setError(backendError);
      setLoading(false);
      return;
    }

    const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (stripeError) {
      setError(stripeError);
      setLoading(false);
      return;
    }

    setPaymentIntent(paymentIntent);
    setMessage('Payment successful!');
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
      {error && <div>{error.message}</div>}
      {paymentIntent && <div>Payment successful!</div>}
    </form>
  );
};

export default CheckoutForm;