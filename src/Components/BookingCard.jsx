import React from 'react';

const BookingCard = ({ booking }) => {
  return (
    <div className="card mb-4 border-0 shadow-sm">
      <div className="row g-0">
        <div className="col-md-4">
          <img 
            src={booking.image} 
            className="img-fluid rounded-start w-100 object-fit-cover" 
            alt={booking.title}
            style={{ height: '200px', minHeight: '200px' }}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body p-3 p-md-4">
            <p className="text-info fw-semibold mb-2">{booking.date} - {booking.location}</p>
            <h5 className="card-title fw-bold mb-3">{booking.title}</h5>
            <p className="card-text text-muted mb-4 d-none d-md-block">{booking.description}</p>
            <div className="d-flex flex-column flex-md-row gap-2">
              <button className="btn btn-info text-white px-3 px-md-4 mb-2 mb-md-0">View Details</button>
              <button className="btn btn-outline-secondary px-3 px-md-4">Cancel</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;