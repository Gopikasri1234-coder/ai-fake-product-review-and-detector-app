// src/components/ReviewInput.js
import React, { useState, useEffect } from 'react';

function ReviewInput({ onDetect }) {
  const [review, setReview] = useState('');
  const [isFake, setIsFake] = useState(null);

  useEffect(() => {
    if (isFake !== null) {
      console.log(`Detection Result: ${isFake ? "Fake" : "Genuine"}`);
    }
  }, [isFake]);

  const detectFakeReview = () => {
    // Simulated AI logic: treat short reviews as fake
    const fake = review.length < 20;
    setIsFake(fake);
    onDetect({ text: review, result: fake });
    setReview('');
  };

  return (
    <div style={{ padding: '1rem', border: '1px solid #ccc' }}>
      <h2>AI Fake Review Detector</h2>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Enter your product review"
      />
      <br />
      <button onClick={detectFakeReview}>Detect</button>
      {isFake !== null && (
        <p style={{ color: isFake ? 'red' : 'green' }}>
          This review is likely: <strong>{isFake ? 'Fake' : 'Genuine'}</strong>
        </p>
      )}
    </div>
  );
}

export default ReviewInput;
