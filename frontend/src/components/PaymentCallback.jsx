import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [message, setMessage] = useState('Verifying payment...');

  useEffect(() => {
    const verifyPayment = async () => {
      const params = new URLSearchParams(location.search);
      const tx_ref = params.get('tx_ref');
      const status = params.get('status');
      const transaction_id = params.get('transaction_id');

      if (status === 'successful') {
        try {
          const response = await axios.get('http://localhost:3000/api/payments/flutterwave/verify', {
            params: { tx_ref, transaction_id }
          });

          if (response.data.status === 'success') {
            setMessage('Payment verified successfully!');
            navigate('/payment-success');
          } else {
            setMessage('Payment verification failed. Please try again.');
          }
        } catch (error) {
          setMessage('Error verifying payment. Please try again.');
          console.error('Verification error:', error);
        }
      } else {
        setMessage('Payment was not successful. Please try again.');
      }
    };

    verifyPayment();
  }, [location.search, navigate]);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
};

export default PaymentCallback;