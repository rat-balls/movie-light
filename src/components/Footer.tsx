import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h2>About</h2>
          <p>About Us</p>
          <p>Our Services</p>
          <p>Contact Us</p>
        </div>
        <div className="footer-section">
          <h2>Quick Links</h2>
          <p>Home</p>
          <p>Products</p>
          <p>Blog</p>
        </div>
        <div className="footer-section">
          <h2>Follow Us</h2>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
