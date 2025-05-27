import React from 'react';
import './Step6_ReviewSubmit.css';

const Step6_ReviewSubmit = ({ data, prev, handleSubmit }) => {
  const renderProofList = () => {
    return data.proofFiles?.map((file, index) => (
      <li key={index}>{file.name}</li>
    ));
  };

  return (
    <div className="step-form">
      <h2>Review Your Information</h2>
      <div className="review-section">
        <h3>Basic Details</h3>
        <p><strong>Name:</strong> {data.name}</p>
        <p><strong>Age:</strong> {data.age}</p>
        <p><strong>Address:</strong> {data.address}</p>
        <p><strong>Contact:</strong> {data.contact}</p>

        <h3>Category</h3>
        <p><strong>Selected:</strong> {data.category}</p>

        <h3>Story</h3>
        <p>{data.story}</p>

        <h3>Uploaded Files</h3>
        <ul className="file-list">{renderProofList()}</ul>

        <h3>Nominated By</h3>
        <p><strong>Type:</strong> {data.nominatedBy}</p>
        {data.nominatedBy === 'Parent' && (
          <>
            <p><strong>Parent Name:</strong> {data.nominatorName}</p>
            <p><strong>Relation:</strong> {data.relation}</p>
          </>
        )}
        {data.nominatedBy === 'School' && (
          <>
            <p><strong>School Name:</strong> {data.schoolName}</p>
            <p><strong>Principal:</strong> {data.principalName}</p>
          </>
        )}
        {(data.nominatedBy === 'Police' || data.nominatedBy === 'NGO') && (
          <>
            <p><strong>Organization:</strong> {data.orgName}</p>
            <p><strong>Contact Person:</strong> {data.contactPerson}</p>
          </>
        )}
      </div>

      <div className="form-actions dual-buttons">
        <button onClick={prev} className="back-btn">Back</button>
        <button onClick={handleSubmit} className="submit-btn">Submit</button>
      </div>
    </div>
  );
};

export default Step6_ReviewSubmit;
