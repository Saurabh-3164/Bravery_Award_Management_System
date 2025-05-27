import React from 'react';
import './ContactSection.css';

const ContactSection = () => {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="section-title">Contact Us</h2>

        <div className="contact-content">

          {/* Left Side - Contact Info */}
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Feel free to reach out to us for any queries related to the Bravery Award.</p>

            <ul>
              <li><strong>Helpline:</strong> +91 12345 67890</li>
              <li><strong>Email:</strong> info@braveryawards.gov.in</li>
              <li><strong>Address:</strong> Ministry of Youth Affairs, New Delhi, India</li>
            </ul>

            <div className="social-icons">
              <a href="#"><i className="fa-brands fa-facebook"></i></a>
              <a href="#"><i className="fa-brands fa-twitter"></i></a>
              <a href="#"><i className="fa-brands fa-instagram"></i></a>
              <a href="#"><i className="fa-brands fa-linkedin"></i></a>
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="contact-form">
            <form>
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;
