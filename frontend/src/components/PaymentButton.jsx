import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PaymentButton.css';

const PaymentButton = () => {
  const [amount, setAmount] = useState(5000);
  const [email, setEmail] = useState('mrteks2029@gmail.com');
  const [gradeLevel, setGradeLevel] = useState('10');
  const [name, setName] = useState('chinedu Chieke');
  const [termName, setTermName] = useState('Second Term');
  const [billType, setBillType] = useState('tuition');
  const [schoolName, setSchoolName] = useState('');
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('flutterwave');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); 
    }

    const fetchSchools = async () => {
      try {
        const response = await axios.get('https://serverpayment-2.onrender.com/api/schools');
        setSchools(response.data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      }
    };

    fetchSchools();
  }, [navigate]);

  const handlePayment = async () => {
    setLoading(true);
    try {
      let endpoint = '';
      switch(paymentMethod) {
        case 'paypal':
          endpoint = 'https://serverpayment-2.onrender.com/api/payments/initiate-paypal-payment';
          break;
        case 'flutterwave':
          endpoint = 'https://serverpayment-2.onrender.com/api/payments/initiate-flutterwave-payment';
          break;
        case 'whatsapp':
          endpoint = 'https://serverpayment-2.onrender.com/api/payments/initiate-whatsapp-payment';
          break;
        default:
          throw new Error('Unsupported payment method');
      }

      const response = await axios.post(endpoint, { 
        amount, 
        email, 
        grade_level: gradeLevel, 
        name, 
        termName, 
        bill_type: billType,
        school_name: schoolName
      });

      if (response.data.message === 'Payment link generated successfully') {
        window.location.href = response.data.paymentLink; // Redirect to payment link
      } else {
        console.error(`${paymentMethod} payment initiation failed`);
      }
    } catch (error) {
      console.error(`Error making ${paymentMethod} payment:`, error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    padding: '12px',
    maxWidth: '600px',
    maxHeight: '400px',
    overflowY: 'auto',
    margin: '0 auto',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginLeft: '10px',
    marginRight: '10px'
  };

  const formGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '12px',
  };

  const inputStyle = {
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    marginTop: '4px'
  };

  const buttonStyle = {
    padding: '12px 20px',
    backgroundColor: '#ff6347',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textAlign: 'center',
    alignSelf: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={formGroupStyle}>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>Grade Level:</label>
        <input
          type="text"
          value={gradeLevel}
          onChange={(e) => setGradeLevel(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>Term Name:</label>
        <input
          type="text"
          value={termName}
          onChange={(e) => setTermName(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>Bill Type:</label>
        <input
          type="text"
          value={billType}
          onChange={(e) => setBillType(e.target.value)}
          required
          style={inputStyle}
        />
      </div>
      <div style={formGroupStyle}>
        <label>School Name:</label>
        <select value={schoolName} onChange={(e) => setSchoolName(e.target.value)} required>
          <option value="">Select a school</option>
          {schools.map(school => (
            <option key={school._id} value={school.school_name}>{school.school_name}</option>
          ))}
        </select>
      </div>
      <div style={formGroupStyle}>
        <label>Payment Method:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="paypal">PayPal</option>
          <option value="flutterwave">Flutterwave</option>
          <option value="whatsapp">WhatsApp</option>
        </select>
      </div>
      <button style={buttonStyle} onClick={handlePayment} disabled={loading}>
        {loading ? 'Processing...' : `Pay with ${paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}`}
      </button>
    </div>
  );
};

export default PaymentButton;