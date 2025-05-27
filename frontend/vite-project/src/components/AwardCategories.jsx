import React from 'react';
import awardCategories from '../data/awardCategoriesData';
import './AwardCategories.css';

const AwardCategories = () => {
  return (
    <section className="award-categories-section">
      <div className="container">
        <h2 className="section-title">Award Categories</h2>
        <div className="categories-grid">
          {awardCategories.map((award)=>{
            return (
              <div key={award.id} className="award-card" data-aos="fade-up">
                <img src={award.icon} alt={award.title} className="award-icon" />
                <h3>{award.title}</h3>
                <p>{award.description}</p>
              </div>
            );
          })}
          {/* {awardCategories.map((award) => (
            <div key={award.id} className="award-card" data-aos="fade-up">
              <img src={award.icon} alt={award.title} className="award-icon" />
              <h3>{award.title}</h3>
              <p>{award.description}</p>
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default AwardCategories;
