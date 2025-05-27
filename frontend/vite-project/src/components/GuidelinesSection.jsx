import React from 'react';
import './GuidelinesSection.css';

const guidelinesData = [
  {
    title: "Eligibility Criteria",
    description: "Nominees must have demonstrated extraordinary bravery or selfless acts for the welfare of society."
  },
  {
    title: "Proper Documentation",
    description: "All required documents such as proof of bravery act, identity proof, and witness details must be submitted."
  },
  {
    title: "Nomination Process",
    description: "Nominations can be submitted online through the official portal within the specified deadline."
  },
  {
    title: "Review & Verification",
    description: "All nominations will undergo a strict review and verification process by the concerned authorities."
  },
  {
    title: "Final Decision",
    description: "The final decision rests with the Bravery Award Selection Committee based on merit and verification."
  }
];

const GuidelinesSection = () => {
  return (
    <section className="guidelines-section" id="guidelines">
      <div className="guidelines-container">
        <h2 className="section-title" data-aos="fade-up">Nomination Guidelines</h2>
        <p className="section-subtitle" data-aos="fade-up">
          Please read the following guidelines carefully before submitting a nomination.
        </p>

        <div className="guidelines-list">
          {guidelinesData.map((item, index) => (
            <div className="guideline-card" key={index} data-aos="fade-up" data-aos-delay={`${index * 100}`}>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuidelinesSection;
