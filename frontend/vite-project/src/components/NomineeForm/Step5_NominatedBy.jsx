import React from 'react';
import './Step5_NominatedBy.css';

const nominatorOptions = ['Parent', 'School', 'Police', 'NGO'];

const Step5_NominatedBy = ({ data, onChange, next, prev }) => {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  const renderFields = () => {
    
        return (
          <>
            <input
              type="text"
              name="orgName"
              placeholder={`${data.nominatedBy} Name`}
              value={data.orgName || ''}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="contactPerson"
              placeholder="Contact Person"
              value={data.contactPerson || ''}
              onChange={handleChange}
              required
            />
          </>
        );
  };

  return (
    <div className="step-form">
      <h2>Who Nominated You?</h2>
      <div className="form-group">
        <select
          name="nominatedBy"
          value={data.nominatedBy}
          onChange={handleChange}
          required
        >
          <option value="">-- Select Nominator --</option>
          {nominatorOptions.map((option) => (
            <option key={option} value={option}>{option}</option>
          ))}
        </select>
      </div>

      <div className="form-group dynamic-fields">
        {renderFields()}
      </div>

      <div className="form-actions dual-buttons">
        <button onClick={prev} className="back-btn">Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Step5_NominatedBy;
