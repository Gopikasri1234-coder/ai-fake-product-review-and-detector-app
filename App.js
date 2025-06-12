// src/App.js
import React, { useState } from 'react';
import ReviewInput from './components/ReviewInput';
import ReviewList from './components/ReviewList';

function App() {
  const [reviews, setReviews] = useState([]);

  const handleDetect = (newReview) => {
    setReviews([...reviews, newReview]);
  };

  return (
    <div className="App">
      <h1>Fake Product Review Detector</h1>
      <ReviewInput onDetect={handleDetect} />
      <ReviewList reviews={reviews} />
    </div>
  );
}

export default App;
