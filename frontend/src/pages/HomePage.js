// src/pages/HomePage.js
import React from 'react';
import '../styles/HomePage.css'; // Import the CSS for styling
import Features from '../components/Features';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import ContactForm from '../components/ContactForm';

const HomePage = () => {
  return (
    <div>
      <Hero />
      <Features />
      <section className="contact-section">
        
        <ContactForm />
      </section>
      <Footer />
      
    </div>
  );
};

export default HomePage;