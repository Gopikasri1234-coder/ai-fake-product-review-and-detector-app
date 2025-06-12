import React, { useState } from 'react';
import ReviewInput from './components/ReviewInput';
import FakeReviewDetector from './components/FakeReviewDetector';

function App() {
  const [submittedReview, setSubmittedReview] = useState('');

  return (
    <div className="App">
      <h1>AI Fake Review Detector</h1>
      <ReviewInput onSubmit={setSubmittedReview} />
      <FakeReviewDetector reviewText={submittedReview} />
    </div>
  );
}

export default App;
