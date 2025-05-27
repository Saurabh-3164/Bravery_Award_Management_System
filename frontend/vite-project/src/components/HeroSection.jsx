import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section" id="home">
      <div className="hero-content">
        <h1 className="hero-title" data-aos="fade-up">
          Bravery Award Management System
        </h1>
        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="100">
          Honouring Acts of Courage and Selflessness
        </p>
        <div className="hero-buttons" data-aos="fade-up" data-aos-delay="200">
          <a href="#register" className="btn-primary">Apply Now</a>
          <a href="#awards" className="btn-secondary">View Awards</a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
