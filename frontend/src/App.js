// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import HomePage from './pages/HomePage';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import ContactPage from './pages/ContactPage';
import SignupPage from './pages/SignupPage';
import PaymentPage from './pages/PaymentPage';
import PaymentCallback from './components/PaymentCallback';
import PaymentSuccess from './components/PaymentSuccess';
import LoginForm from './components/LoginForm';
import ProtectedRoute from './components/ProtectedRoute';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div id="root">
          <main>
            <Routes>
              {/* Redirect from root path to SignupPage */}
              <Route path="/" element={<Navigate to="/signup" />} />
              
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/login" element={<LoginForm />} />

              {/* Protected routes */}
              <Route element={<ProtectedRoute />}>
                <Route path="/home" element={<HomePage />} />
                <Route path="/payment" element={<PaymentPage />} />
                <Route path="/payment-callback" element={<PaymentCallback />} />
                <Route path="/payment-success" element={<PaymentSuccess />} />
              </Route>

              {/* Public routes */}
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;