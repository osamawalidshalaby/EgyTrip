import React from 'react';
import TourCard from './TourCard.jsx';


// Popular Tours Section Component
function PopularTours({ tours }) {
  return (
    <section className="container-fluid py-5">
      <h2 className="text-center fw-bold mb-4 fs-2">Most Popular Tours</h2>
      <div className="row g-4">
        {tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} />
        ))}
      </div>
    </section>
  );
}

export default PopularTours;