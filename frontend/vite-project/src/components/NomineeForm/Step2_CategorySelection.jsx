import React from 'react';
import './Step2_CategorySelection.css';

const categories = [
  'Saving Life',
  'Courage',
  'Social Work',
  'Disaster Response',
  'Environmental Protection',
  'Other'
];

const Step2_CategorySelection = ({ data, onChange, next, prev }) => {
  const handleSelect = (e) => {
    onChange('category', e.target.value);
  };

  return (
    <div className="step-form">
      <h2>Select Bravery Category</h2>
      <div className="category-options">
        {categories.map((cat, idx) => (
          <label key={idx} className="category-card">
            <input
              type="radio"
              name="category"
              value={cat}
              checked={data.category === cat}
              onChange={handleSelect}
            />
            <span>{cat}</span>
          </label>
        ))}
      </div>

      <div className="form-actions dual-buttons">
        <button onClick={prev} className="back-btn">Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Step2_CategorySelection;
