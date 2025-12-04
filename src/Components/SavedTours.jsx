import React from 'react';

const SavedTours = () => {
  const savedTours = [
    {
      id: 1,
      title: 'Santorini Sunset Cruise',
      location: 'Greece',
      price: '$150',
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=500&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Japanese Cultural Experience',
      location: 'Tokyo, Japan',
      price: '$120',
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1540959733332-8a43b3f16d26?w=500&h=300&fit=crop'
    }
  ];

  return (
    <>
      <h1 className="fw-bold mb-4">Saved Tours</h1>
      
      <div className="row">
        {savedTours.map(tour => (
          <div key={tour.id} className="col-md-6 mb-4">
            <div className="card border-0 shadow-sm h-100">
              <img 
                src={tour.image} 
                className="card-img-top" 
                alt={tour.title}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title fw-bold">{tour.title}</h5>
                <p className="text-muted mb-2">{tour.location}</p>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-success fw-bold fs-5">{tour.price}</span>
                  <span className="badge bg-primary">⭐ {tour.rating}</span>
                </div>
                <div className="d-flex gap-2 mt-3">
                  <button className="btn btn-info text-white flex-fill">Book Now</button>
                  <button className="btn btn-outline-danger">❤️</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SavedTours;