import React from 'react';
import './AboutSection.css';
import aboutImg from './About_us.jpg';

const AboutSection = () => {
  return (
    <section className="about-section" id="about">
      <div className="about-container">
        <div className="about-text" data-aos="fade-right">
          <h2>About Bravery Award Management System</h2>
          <p>
            The Bravery Award Management System is a platform dedicated to recognizing and honoring individuals 
            who have displayed outstanding courage, bravery, and selfless service to society. 
            Our mission is to ensure transparency, efficiency, and accessibility in the nomination and award distribution process.
          </p>
          <p>
            This platform facilitates easy application, review, and tracking of bravery award nominations 
            across multiple categories, empowering heroes from diverse backgrounds to be celebrated.
          </p>
        </div>

        <div className="about-image" data-aos="fade-left">
        <img src={aboutImg} alt="About Us" />
       
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
