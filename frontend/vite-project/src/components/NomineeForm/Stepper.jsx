import React from 'react';
import './Stepper.css';

const Stepper = ({ currentStep }) => {
  const steps = ['Basic', 'Category', 'Story', 'Nominator', 'Review'];

  return (
    <div className="stepper">
      {steps.map((label, index) => (
        <div key={index} className={`step ${currentStep === index + 1 ? 'active' : ''}`}>
          <div className="circle">{index + 1}</div>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
