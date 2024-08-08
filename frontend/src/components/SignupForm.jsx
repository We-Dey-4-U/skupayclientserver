import React, { useState } from 'react';
import axios from 'axios';
import LoginForm from './LoginForm';
import '../styles/SignupForm.css';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    student_email: '',
    password: '',
    school_name: ''
  });
  const [isLogin, setIsLogin] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form Data:', formData); // Log the form data
    try {
      await axios.post('http://localhost:3000/api/auth/student/register', formData);
      alert('Sign Up successful. Please log in.');
      setIsLogin(true);
    } catch (error) {
      console.error('Sign Up error:', error.response?.data || error.message);
      alert('Failed to sign up. Please try again.');
    }
  };

  const switchToLogin = () => {
    setIsLogin(true);
  };

  const switchToSignup = () => {
    setIsLogin(false);
  };

  return isLogin ? (
    <LoginForm onSwitch={switchToSignup} />
  ) : (
    <form className="signup-form" onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <label htmlFor="firstname">First Name</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        required
      />
      <label htmlFor="lastname">Last Name</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        required
      />
      <label htmlFor="student_email">Email</label>
      <input
        type="email"
        id="student_email"
        name="student_email"
        value={formData.student_email}
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
      <label htmlFor="school_name">School Name</label>
      <input
        type="text"
        id="school_name"
        name="school_name"
        value={formData.school_name}
        onChange={handleChange}
        required
      />
      <button type="submit">Sign Up</button>
      <p>
        Already have an account?{' '}
        <span className="form-switch" onClick={switchToLogin}>
          Login
        </span>
      </p>
    </form>
  );
};

export default SignupForm;