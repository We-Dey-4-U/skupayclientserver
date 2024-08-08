import React from 'react';
import { Link } from 'react-router-dom';

const PaymentSuccess = () => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>Your payment has been successfully processed.</p>
      <p>Thank you for your payment!</p>
      <Link to="/dashboard">Go to Dashboard</Link>
    </div>
  );
};

export default PaymentSuccess;