// src/components/ReviewList.js
import React, { useEffect } from 'react';

function ReviewList({ reviews }) {
  useEffect(() => {
    console.log('Review list updated', reviews);
  }, [reviews]);

  return (
    <div style={{ padding: '1rem', marginTop: '1rem', border: '1px solid #ccc' }}>
      <h3>Detected Reviews</h3>
      <ul>
        {reviews.map((rev, index) => (
          <li key={index}>
            "{rev.text}" - <strong>{rev.result ? 'Fake' : 'Genuine'}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReviewList;
