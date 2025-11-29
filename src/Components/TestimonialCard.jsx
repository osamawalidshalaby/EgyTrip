import React from 'react';


// Testimonial Card Component
function TestimonialCard({ testimonial }) {
  return (
    <div className="col-md-4">
      <div className="p-4 h-100 bg-white shadow rounded">
        <p className="text-muted">{testimonial.text}</p>
        <div className="d-flex align-items-center mt-3">
          <img src={testimonial.img} className="rounded-circle me-3" width="50" alt={testimonial.name} />
          <div>
            <h6 className="mb-0 fw-bold">{testimonial.name}</h6>
            <small className="text-secondary">{testimonial.role}</small>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestimonialCard;