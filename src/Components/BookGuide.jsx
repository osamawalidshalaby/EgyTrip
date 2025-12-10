// src/Components/BookGuide.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BookGuide = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [guide, setGuide] = useState(null);
  const [bookingData, setBookingData] = useState({
    date: '',
    duration: 1,
    numberOfPeople: 1,
    specialRequests: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3000/guides/${id}`)
      .then(res => res.json())
      .then(data => {
        setGuide(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching guide:', err);
        setLoading(false);
      });
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData(prev => ({
      ...prev,
      [name]: name === 'duration' || name === 'numberOfPeople' ? parseInt(value) : value
    }));
  };

  const calculateTotal = () => {
    if (!guide) return 0;
    return guide.price * bookingData.duration;
  };

  const handleSubmitBooking = async (e) => {
    e.preventDefault();
    
    if (!bookingData.date) {
      alert('Please select a date');
      return;
    }

    const booking = {
      id: Date.now().toString(),
      userId: user.id,
      guideId: guide.id,
      guideName: guide.name,
      date: bookingData.date,
      duration: bookingData.duration,
      numberOfPeople: bookingData.numberOfPeople,
      totalPrice: calculateTotal(),
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'upcoming',
      specialRequests: bookingData.specialRequests,
      type: 'guide-only'
    };

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking)
      });

      if (response.ok) {
        alert('✅ Guide booked successfully!');
        navigate('/user');
      } else {
        throw new Error('Failed to book guide');
      }
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book guide. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <h3>Guide not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/destinations')}>
          Browse Guides
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ marginTop: '100px' }}>
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <h2 className="fw-bold mb-4">Book Guide: {guide.name}</h2>
              
              {/* Guide Summary */}
              <div className="card bg-light mb-4">
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-md-3">
                      <img
                        src={guide.img}
                        alt={guide.name}
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                      />
                    </div>
                    <div className="col-md-9">
                      <h5 className="fw-bold">{guide.name}</h5>
                      <p className="mb-1"><strong>Specialty:</strong> {guide.specialty}</p>
                      <p className="mb-1"><strong>Experience:</strong> {guide.experience}</p>
                      <p className="mb-0"><strong>Price:</strong> ${guide.price} per day</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Form */}
              <form onSubmit={handleSubmitBooking}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Booking Date *</label>
                    <input
                      type="date"
                      className="form-control"
                      name="date"
                      value={bookingData.date}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Duration (Days) *</label>
                    <select
                      className="form-select"
                      name="duration"
                      value={bookingData.duration}
                      onChange={handleInputChange}
                      required
                    >
                      {[1, 2, 3, 4, 5, 6, 7].map(day => (
                        <option key={day} value={day}>{day} day{day > 1 ? 's' : ''}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label className="form-label fw-semibold">Number of People *</label>
                    <input
                      type="number"
                      className="form-control"
                      name="numberOfPeople"
                      value={bookingData.numberOfPeople}
                      onChange={handleInputChange}
                      min="1"
                      max="20"
                      required
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <label className="form-label fw-semibold">Special Requests</label>
                    <textarea
                      className="form-control"
                      name="specialRequests"
                      value={bookingData.specialRequests}
                      onChange={handleInputChange}
                      rows="3"
                      placeholder="Any special requirements or preferences..."
                    ></textarea>
                  </div>
                </div>

                {/* Price Summary */}
                <div className="card border-0 bg-light mb-4">
                  <div className="card-body">
                    <h5 className="fw-bold mb-3">Price Summary</h5>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Guide Fee (${guide.price} × {bookingData.duration} days):</span>
                      <span className="fw-bold">${guide.price * bookingData.duration}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total Amount:</span>
                      <span className="text-primary">${calculateTotal()}</span>
                    </div>
                  </div>
                </div>

                {/* Booking Button */}
                <button type="submit" className="btn btn-primary btn-lg w-100 py-3">
                  <i className="bi bi-check-circle me-2"></i>
                  Confirm Booking
                </button>
              </form>

              <div className="text-center mt-4">
                <button className="btn btn-link" onClick={() => navigate(-1)}>
                  ← Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookGuide;