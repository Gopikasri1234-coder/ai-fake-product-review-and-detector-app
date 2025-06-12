import React, { useState, useEffect } from 'react';

const FakeReviewDetector = ({ reviewText }) => {
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (reviewText) {
      setResult(null); // clear old result
      const isFake = reviewText.toLowerCase().includes("best") || reviewText.length < 30;

      setTimeout(() => {
        setResult(isFake ? "⚠️ Fake Review Detected" : "✅ Genuine Review");
      }, 1000);
    }
  }, [reviewText]);

  return (
    <div>
      <h2>Detection Result</h2>
      {reviewText ? (
        result ? <p>{result}</p> : <p>Checking...</p>
      ) : (
        <p>No review submitted yet.</p>
      )}
    </div>
  );
};

export default FakeReviewDetector;
