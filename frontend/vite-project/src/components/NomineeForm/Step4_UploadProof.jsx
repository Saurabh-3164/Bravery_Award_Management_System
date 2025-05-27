import React from 'react';
import './Step4_UploadProof.css';

const Step4_UploadProof = ({ data, onChange, next, prev }) => {
  const handleFileInput = (e) => {
    const files = Array.from(e.target.files);
    console.log("📂 Selected files:", files);
    alert(`Files selected: ${files.length}`);
    onChange('proofFiles', files);
  };

  return (
    <div className="step-form">
      <h2>Upload Supporting Documents</h2>
      <p className="upload-instructions">You can upload images, certificates, or news articles (max 5 files).</p>

      <div className="form-group">
        <input
          type="file"
          name="proofFiles"
          accept=".jpg,.jpeg,.png,.pdf"
          multiple
          onChange={handleFileInput}
        />
      </div>

      <div className="preview-list">
        {data.proofFiles && data.proofFiles.length > 0 && (
          <ul>
            {data.proofFiles.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="form-actions dual-buttons">
        <button onClick={prev} className="back-btn">Back</button>
        <button onClick={next}>Next</button>
      </div>
    </div>
  );
};

export default Step4_UploadProof;
