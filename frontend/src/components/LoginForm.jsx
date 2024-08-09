import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginForm.css';

const LoginForm = ({ onSwitch }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'student' // Default to student; adjust based on user needs
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;
    const endpoint = role === 'admin'
      ? 'https://serverpayment-2.onrender.com/api/auth/admin/login'
      : 'https://serverpayment-2.onrender.com/api/auth/student/login';
    
    try {
      const response = await axios.post(endpoint, { email, password });
      localStorage.setItem('token', response.data.token);
      alert('Login successful');
      navigate('/home'); // Redirect to HomePage or relevant page after successful login
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      alert('Failed to log in. Please try again.');
    }
  };

  return (
    <form className="login-form2" onSubmit={handleSubmit}>
      <h2>Login</h2>
      <label htmlFor="role">Role</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        required
      >
        <option value="student">Student</option>
        <option value="admin">Admin</option>
      </select>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        required
      />
      <button type="submit">Login</button>
      <p>
        Don't have an account?{' '}
        <span className="form-switch" onClick={onSwitch}>
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default LoginForm;