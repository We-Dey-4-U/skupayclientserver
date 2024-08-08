import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-logo">ScuPay</Link>
        <ul className="navbar-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/payment">Payment</Link></li>
          <li><Link to="/signup">Sign Up</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;







