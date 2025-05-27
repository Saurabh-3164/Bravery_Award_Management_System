import React, { useState } from 'react';
import Stepper from './Stepper';
import Step1 from './Step1_BasicDetails';
import Step2 from './Step2_CategorySelection';
import Step3 from './Step3_StoryDescription';
import Step4 from './Step4_UploadProof';
import Step5 from './Step5_NominatedBy';
import Step6 from './Step6_ReviewSubmit';
import './StepCommon.css';

const NomineeForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '', age: '', address: '', contact: '',
    category: '',
    story: '',
    proof: null,
    nominatedBy: '', nominatorDetails: {},
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    <Step1 data={formData} onChange={handleChange} next={nextStep} />,
    <Step2 data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
    <Step3 data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
    <Step4 data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
    <Step5 data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />,
    <Step6 data={formData} prev={prevStep} />,
  ];

  return (
    <div className="nominee-form-container">
      <Stepper currentStep={step} />
      <div className="step-content">{steps[step - 1]}</div>
    </div>
  );
};

export default NomineeForm;
