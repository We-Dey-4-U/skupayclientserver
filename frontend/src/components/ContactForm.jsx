import React from 'react';
import '../styles/ContactForm.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';

const ContactForm = () => {
  return (
    <div className="contact-section">
      <h2>Contact Us</h2>
      <div className="contact-container">
        <div className="map-container">
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1981.6991349116615!2d3.386290863086574!3d6.59732436035649!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b92efd2cb5a53%3A0xfbc3bfff58d8fa21!2s12%20Akintan%20St%2C%20Ketu%2C%20Lagos%20105102%2C%20Lagos!5e0!3m2!1sen!2sng!4v1722783597306!5m2!1sen!2sng"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div className="contact-form">
          <div className="contact-info-container">
            <h3>Contact Information</h3>
            <p><FontAwesomeIcon icon={faEnvelope} /> <strong>Email:</strong> info@skupay.ng</p>
            <p><FontAwesomeIcon icon={faPhone} /> <strong>Phone:</strong> +(234) 0708 158 0566</p>
            <div className="social-media">
              <h4>Follow Us</h4>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faLinkedin} /></a>
            </div>
          </div>
          <form>
            <div>
              <label>Name</label>
              <input type="text" name="name" required />
            </div>
            <div>
              <label>Email</label>
              <input type="email" name="email" required />
            </div>
            <div>
              <label>Reason for Contact</label>
              <select name="reason" required>
                <option value="">Select a reason</option>
                <option value="support">Support</option>
                <option value="feedback">Feedback</option>
                <option value="inquiry">General Inquiry</option>
              </select>
            </div>
            <div>
              <label>Message</label>
              <textarea name="message" required></textarea>
            </div>
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;