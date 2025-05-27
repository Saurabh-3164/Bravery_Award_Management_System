import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-about">
          <h3>Bravery Award Management System</h3>
          <p>
            Empowering and Honoring Acts of Bravery Across The Nation.
            Managed & Regulated by Government of India.
          </p>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#guidelines">Guidelines</a></li>
            <li><a href="#awards">Award Categories</a></li>
            <li><a href="#winners">Previous Winners</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-social">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 Bravery Award Management System | All Rights Reserved | Designed & Developed with ❤️</p>
      </div>
    </footer>
  );
};

export default Footer;
