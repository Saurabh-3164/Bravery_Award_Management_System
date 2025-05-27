import React, { useState } from 'react';
import './Step1_BasicDetails.css';

const Step1_BasicDetails = ({ data, onChange, next }) => {
  const [errorMessage, setErrorMessage] = useState('');

  const handleInput = (e) => {
    const { name, value } = e.target;
    onChange(name, value);
  };

  const checkIfExists = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/checkNomineeExists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: data.contact, // Assuming contact is the email or mobile number.
        }),
      });
      const result = await response.json();
      
      if (result.exists) {
        setErrorMessage('This email or contact number is already registered!');
        onChange('contact', ''); // Clear the input field if exists.
       
      } else {
        setErrorMessage('');
        next(); // Proceed to the next step.
      }
    } catch (error) {
      console.error('Error checking if nominee exists:', error);
      setErrorMessage('An error occurred, please try again later.');
    }
  };

  const handleNext = (e) => {
    e.preventDefault();
    checkIfExists();
  };

  return (
    <div className="step-form">
      <h2>Basic Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={data.name}
            onChange={handleInput}
            placeholder="Enter full name"
            required
          />
        </div>
        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            name="age"
            value={data.age}
            onChange={handleInput}
            placeholder="Enter age"
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea
            name="address"
            value={data.address}
            onChange={handleInput}
            placeholder="Enter full address"
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="text"
            name="contact"
            value={data.contact}
            onChange={handleInput}
            placeholder="Enter contact number"
            required
          />
        </div>
      </div>

      {errorMessage && <div className="error-message">{errorMessage}</div>}

      <div className="form-actions">
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
};

export default Step1_BasicDetails;
