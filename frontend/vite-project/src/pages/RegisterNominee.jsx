import React, { useState } from 'react';
import axios from 'axios';
import Step1_BasicDetails from '../components/NomineeForm/Step1_BasicDetails';
import Step2_CategorySelection from '../components/NomineeForm/Step2_CategorySelection';
import Step3_StoryDescription from '../components/NomineeForm/Step3_StoryDescription';
import Step4_UploadProof from '../components/NomineeForm/Step4_UploadProof';
import Step5_NominatedBy from '../components/NomineeForm/Step5_NominatedBy';
import Step6_ReviewSubmit from '../components/NomineeForm/Step6_ReviewSubmit';
import Stepper from '../components/NomineeForm/Stepper';
import './RegisterNominee.css';
import { Navigate, useNavigate } from 'react-router-dom';

const RegisterNominee = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    address: '',
    contact: '',
    category: '',
    story: '',
    proofFiles: [],
    nominatedBy: '',
    nominatorName: '',
    relation: '',
    orgName: '',
    contactPerson: '',
    followupQuestionsAndAnswers: [],
  });
  const navigate = useNavigate();

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const handleSubmit = async () => {
    const {
      name,
      age,
      address,
      contact,
      category,
      story,
      proofFiles,
      nominatedBy,
      nominatorName,
      relation,
      orgName,
      contactPerson,
      followupQuestionsAndAnswers,
    } = formData;
  
    try {
      const res = await axios.post("http://localhost:3000/api/registernominee", {
        name,
        age,
        address,
        contact,
        category,
        story,
        proofFiles,
        nominatedBy,
        nominatorName,
        relation,
        orgName,
        contactPerson,
        followupQuestionsAndAnswers,
      });
  
      if (res.data.message) {
        alert("Nominee submitted successfully! Await admin approval.");
        navigate("/"); // Redirect after success (use a valid path for your confirmation page)
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An error occurred during submission. Please try again later.");
    }
  };
  
  const isValidStep = () => {
    switch (step) {
      case 1:
        return formData.name && formData.age && formData.address && formData.contact;
      case 2:
        return formData.category;
      case 3:
        return formData.story && formData.story.length > 100 && formData.category;
      // case 4:
      //   return formData.proofFiles.length > 0; // Make sure proof files are uploaded
      case 4:
        return formData.nominatedBy;
      case 5:
        return true; // No validation needed for final review step
      default:
        return false;
    }
  };
  
  

  const nextStep = () => {
    if (isValidStep()) {
      setStep((prev) => prev + 1);
    } else {
      alert("Please fill in all required fields!");
    }
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const renderStep = () => {
    switch (step) {
      case 1:
        return <Step1_BasicDetails data={formData} onChange={handleChange} next={nextStep} />;
      case 2:
        return <Step2_CategorySelection data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />;
      case 3:
        return <Step3_StoryDescription data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />;
      // case 4:
      //   return <Step4_UploadProof data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />;
      case 4:
        return <Step5_NominatedBy data={formData} onChange={handleChange} next={nextStep} prev={prevStep} />;
      case 5:
        return <Step6_ReviewSubmit data={formData} handleSubmit={handleSubmit} prev={prevStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Nominee Registration Form</h1>
      <Stepper currentStep={step} totalSteps={5} />
      {renderStep()}
    </div>
  );
};

export default RegisterNominee;
