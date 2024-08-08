import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PaymentButton = () => {
  const [studentName, setStudentName] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [amount, setAmount] = useState('');
  const [email, setEmail] = useState('');
  const [gradeLevel, setGradeLevel] = useState('');
  const [termName, setTermName] = useState('');
  const [billType, setBillType] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paypal');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/schools');
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };
    fetchSchools();
  }, []);

  const handlePayment = async () => {
    setLoading(true);
    setError(null);

    try {
      let endpoint = '';
      switch (paymentMethod) {
        case 'paypal':
          endpoint = 'http://localhost:3000/api/payments/initiate-paypal-payment';
          break;
        case 'flutterwave':
          endpoint = 'http://localhost:3000/api/payments/initiate-flutterwave-payment';
          break;
        case 'whatsapp':
          endpoint = 'http://localhost:3000/api/payments/initiate-whatsapp-payment';
          break;
        default:
          throw new Error('Unsupported payment method');
      }

      // Ensure amount is a number
      const amountNumber = parseFloat(amount);

      const response = await axios.post(endpoint, {
        amount: amountNumber,
        email,
        name: studentName,
        school_name: schoolName,
        grade_level: gradeLevel,
        termName,
        bill_type: billType
      });

      if (response.data.status === 'success') {
        if (response.data.data.link) {
          window.location.href = response.data.data.link;
        } else {
          setError('Payment link not provided.');
        }
      } else {
        setError(`${paymentMethod} payment initiation failed: ${response.data.message}`);
      }
    } catch (error) {
      setError(`Error making ${paymentMethod} payment: ${error.response?.data?.message || error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Form Fields */}
      <div className="form-group">
        <label>Student Name:</label>
        <input
          type="text"
          value={studentName}
          onChange={(e) => setStudentName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>School Name:</label>
        <select
          value={schoolName}
          onChange={(e) => setSchoolName(e.target.value)}
          required
        >
          <option value="">Select School</option>
          {schools.map((school) => (
            <option key={school._id} value={school.name}>{school.name}</option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Grade Level:</label>
        <input
          type="text"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Term Name:</label>
        <input
          type="text"
          value={termName}
          onChange={(e) => setTermName(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Bill Type:</label>
        <input
          type="text"
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="paypal">PayPal</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>
      <button onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : `Pay with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`}
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PaymentButton;