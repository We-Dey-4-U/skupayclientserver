// src/components/Hero.js
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import SignupForm from './SignupForm';
import PaymentButton from './PaymentButton';
import '../styles/Hero.css';


const Hero = () => {
  const heroRef = useRef(null);
  const contentRef = useRef(null);

 
  return (
    <div className="hero" ref={heroRef}>
      <div className="hero-overlay">
        <div className="hero-header">
          <div className="logo">ScuPay</div>
          <div className="nav-links">
            <Link to="/home">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/signup">Login</Link>
            <Link to="/payment">Payment</Link>
          </div>
        </div>
        <Carousel
          showThumbs={false}
          autoPlay
          infiniteLoop
          showStatus={false}
          className="carousel-container"
        >
          <div>
            <img src="/images/skupay4.png" alt="Slide 1" />
          </div>
          <div>
            <img src="/images/skupay4.png" alt="Slide 2" />
          </div>
          <div>
            <img src="/images/skupay3.png" alt="Slide 3" />
          </div>
          <div>
            <img src="/images/skupay3.png" alt="Slide 4" />
          </div>
        </Carousel>
        <div className="hero-content" ref={contentRef}>
          <div className="hero-text">
            <h1>Everything is easier with our online payment solution</h1>
            <p>Scupay - an easy way to pay your children's school fees</p>
           
          </div>
          <div className="signup-form">
          <PaymentButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;