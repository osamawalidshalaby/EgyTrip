import React from 'react';

const MyReviews = () => {
  const reviews = [
    {
      id: 1,
      tour: 'Eiffel Tower Tour',
      rating: 5,
      comment: 'Amazing experience! The guide was very knowledgeable.',
      date: 'Oct 15, 2024'
    },
    {
      id: 2,
      tour: 'Colosseum Walking Tour',
      rating: 4,
      comment: 'Great tour, but a bit crowded in the morning.',
      date: 'Sep 28, 2024'
    }
  ];

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <>
      <h1 className="fw-bold mb-4">My Reviews</h1>
      
      <div className="row">
        {reviews.map(review => (
          <div key={review.id} className="col-12 mb-4">
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-3">
                  <h5 className="card-title fw-bold mb-0">{review.tour}</h5>
                  <span className="text-muted small">{review.date}</span>
                </div>
                <div className="mb-3">
                  {renderStars(review.rating)}
                </div>
                <p className="card-text">{review.comment}</p>
                <div className="d-flex gap-2">
                  <button className="btn btn-outline-primary btn-sm">Edit</button>
                  <button className="btn btn-outline-danger btn-sm">Delete</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MyReviews;