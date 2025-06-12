import React, { useState } from 'react';

const ReviewInput = ({ onSubmit }) => {
  const [review, setReview] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(review);
    setReview('');
  };

  return (
    <div>
      <h2>Enter Product Review</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Type your review here..."
        />
        <br />
        <button type="submit">Check Review</button>
      </form>
    </div>
  );
};

export default ReviewInput;
