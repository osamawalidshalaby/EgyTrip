import React from 'react';
import TestimonialCard from './TestimonialCard.jsx';


// Testimonials Section Component
function Testimonials({ testimonials }) {
  return (
    <section className="container-fluid py-5">
      <h2 className="text-center fw-bold mb-4 fs-2">What Our Travelers Say</h2>
      <div className="row g-4">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} testimonial={t} />
        ))}
      </div>
    </section>
  );
}

export default Testimonials;