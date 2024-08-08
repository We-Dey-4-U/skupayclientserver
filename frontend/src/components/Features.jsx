// src/components/Features.js
import React from 'react';
import { FaDollarSign, FaChartLine, FaUserCheck, FaLock, FaRegSmileBeam } from 'react-icons/fa';
import '../styles/Features.css';

const features = [
  { id: 1, icon: <FaDollarSign />, text: 'Centralized Payment System' },
  { id: 2, icon: <FaChartLine />, text: 'Real-Time Monitoring' },
  { id: 3, icon: <FaRegSmileBeam />, text: 'Ease of Use' },
  { id: 4, icon: <FaLock />, text: 'Secure Transactions' },
  { id: 5, icon: <FaUserCheck />, text: 'User-Friendly Interface' },
];

const Features = () => {
  return (
    <section className="features">
      <h2>Features and Benefits</h2>
      <div className="features-list">
        {features.map(feature => (
          <div className="feature-item" key={feature.id}>
            <div className="feature-icon">{feature.icon}</div>
            <p className="feature-text">{feature.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;