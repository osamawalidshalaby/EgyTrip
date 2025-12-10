import React from 'react';
import { Star } from 'react-feather';

// Tour Card Component
function TourCard({ tour }) {
  return (
    <div className="col-md-3">
      <div className="card h-100 shadow-sm">
        <img src={tour.img} className="card-img-top" alt={tour.title}  style={{ height: '200px', objectFit: 'cover' }}/>
        <div className="card-body">
          <h5 className="card-title">{tour.title}</h5>
          <div className="d-flex justify-content-between align-items-center">
            <span className="text-primary fw-bold fs-4">{tour.price}</span>
            <span className="d-flex align-items-center">
              <Star size={18} color="#ffc107" fill="#ffc107" />
              <span className="ms-1 fw-semibold">{tour.rating}</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourCard;