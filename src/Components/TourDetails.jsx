// src/Components/TourDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TourDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [tour, setTour] = useState(null);
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState('');
  const [bookingDate, setBookingDate] = useState('');
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // جلب بيانات الرحلة
    const fetchTour = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tours/${id}`);
        if (!response.ok) {
          throw new Error('Tour not found');
        }
        const data = await response.json();
        setTour(data);
      } catch (err) {
        setError('Failed to load tour details');
        console.error('Error fetching tour:', err);
      }
    };

    // جلب المرشدين
    const fetchGuides = async () => {
      try {
        const response = await fetch('http://localhost:3000/guides');
        const data = await response.json();
        setGuides(data);
      } catch (err) {
        console.error('Error fetching guides:', err);
      }
    };

    Promise.all([fetchTour(), fetchGuides()])
      .finally(() => setLoading(false));
  }, [id]);

  const handleBookTour = async () => {
    if (!isAuthenticated) {
      navigate('/auth');
      return;
    }

    if (!selectedGuide || !bookingDate) {
      alert('Please select a guide and booking date');
      return;
    }

    const selectedGuideData = guides.find(g => g.id === selectedGuide);
    const totalPrice = (tour.price * numberOfPeople) + (selectedGuideData?.price || 0);

    const newBooking = {
      id: Date.now().toString(),
      userId: user.id,
      tourId: tour.id,
      guideId: selectedGuide,
      tourTitle: tour.title,
      guideName: selectedGuideData?.name || 'Not specified',
      date: bookingDate,
      numberOfPeople: numberOfPeople,
      tourPrice: tour.price,
      guidePrice: selectedGuideData?.price || 0,
      totalPrice: totalPrice,
      bookingDate: new Date().toISOString().split('T')[0],
      status: 'upcoming',
      image: tour.img,
      location: tour.location,
      type: tour.type,
      description: `Booking for ${tour.title} with ${selectedGuideData?.name}`
    };

    try {
      const response = await fetch('http://localhost:3000/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBooking)
      });

      if (response.ok) {
        alert('🎉 Booking confirmed successfully!');
        navigate('/user');
      } else {
        throw new Error('Failed to create booking');
      }
    } catch (err) {
      console.error('Error creating booking:', err);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading tour details...</p>
      </div>
    );
  }

  if (error || !tour) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="alert alert-danger" role="alert">
          {error || 'Tour not found'}
        </div>
        <button 
          className="btn btn-primary mt-3"
          onClick={() => navigate('/destinations')}
        >
          Browse Available Tours
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ marginTop: '100px' }}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/destinations" className="text-decoration-none">Destinations</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {tour.title}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Tour Details */}
        <div className="col-lg-8">
          <div className="card border-0 shadow-sm mb-4">
            <img
              src={tour.img}
              className="card-img-top"
              alt={tour.title}
              style={{ height: '400px', objectFit: 'cover', borderRadius: '8px 8px 0 0' }}
            />
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="fw-bold mb-2">{tour.title}</h1>
                  <div className="d-flex align-items-center mb-3">
                    <span className="badge bg-info me-2 px-3 py-2">{tour.type}</span>
                    <span className="text-warning me-3">
                      <i className="bi bi-star-fill me-1"></i>
                      {tour.rating}
                    </span>
                    <span className="text-muted">
                      <i className="bi bi-geo-alt me-1"></i>
                      {tour.location}
                    </span>
                  </div>
                </div>
                <div className="text-end">
                  <h3 className="text-primary fw-bold">${tour.price}</h3>
                  <small className="text-muted">per person</small>
                </div>
              </div>

              <p className="fs-5 mb-4">{tour.description}</p>
              
              <div className="mb-4">
                <h4 className="fw-bold mb-3">
                  <i className="bi bi-lightning-charge-fill text-warning me-2"></i>
                  Tour Highlights
                </h4>
                <div className="row">
                  {tour.highlights?.map((highlight, index) => (
                    <div key={index} className="col-md-6 mb-2">
                      <div className="d-flex align-items-center">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        <span>{highlight}</span>
                      </div>
                    </div>
                  )) || (
                    <div className="col-12">
                      <p>No highlights available for this tour.</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-info-circle me-2"></i>
                    Tour Information
                  </h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <strong>Duration:</strong> {tour.duration || 'Not specified'}
                    </li>
                    <li className="mb-2">
                      <strong>Group Size:</strong> {tour.groupSize || 'Not specified'}
                    </li>
                    <li className="mb-2">
                      <strong>Meeting Point:</strong> {tour.meetingPoint || 'To be confirmed'}
                    </li>
                  </ul>
                </div>
                <div className="col-md-6">
                  <h5 className="fw-bold mb-3">
                    <i className="bi bi-check-circle me-2"></i>
                    What's Included
                  </h5>
                  <ul className="list-unstyled">
                    {tour.includes?.map((item, index) => (
                      <li key={index} className="mb-2">
                        <i className="bi bi-check text-success me-2"></i>
                        {item}
                      </li>
                    )) || (
                      <li>Details not specified</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Sidebar */}
        <div className="col-lg-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '120px' }}>
            <div className="card-body p-4">
              <h4 className="fw-bold mb-4">Book This Tour</h4>
              
              {/* Date Selection */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-calendar-date me-2"></i>
                  Select Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              {/* Number of People */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-people me-2"></i>
                  Number of People
                </label>
                <div className="d-flex align-items-center">
                  <button
                    className="btn btn-outline-secondary rounded-circle"
                    onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                    disabled={numberOfPeople <= 1}
                  >
                    <i className="bi bi-dash"></i>
                  </button>
                  <span className="mx-3 fs-4 fw-bold">{numberOfPeople}</span>
                  <button
                    className="btn btn-outline-secondary rounded-circle"
                    onClick={() => setNumberOfPeople(numberOfPeople + 1)}
                  >
                    <i className="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              {/* Guide Selection */}
              <div className="mb-4">
                <label className="form-label fw-semibold">
                  <i className="bi bi-person-badge me-2"></i>
                  Select Tour Guide
                </label>
                <select
                  className="form-select"
                  value={selectedGuide}
                  onChange={(e) => setSelectedGuide(e.target.value)}
                >
                  <option value="">-- Choose a guide --</option>
                  {guides.map(guide => (
                    <option key={guide.id} value={guide.id}>
                      {guide.name} - {guide.specialty} (${guide.price}/day)
                    </option>
                  ))}
                </select>
              </div>

              {/* Selected Guide Details */}
              {selectedGuide && (
                <div className="mb-4 p-3 bg-light rounded">
                  <h6>Selected Guide:</h6>
                  {guides.filter(g => g.id === selectedGuide).map(guide => (
                    <div key={guide.id} className="d-flex align-items-center">
                      <img
                        src={guide.img}
                        alt={guide.name}
                        className="rounded-circle me-3"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                      <div>
                        <h6 className="mb-0">{guide.name}</h6>
                        <small className="text-muted d-block">{guide.specialty}</small>
                        <small className="text-success">
                          <i className="bi bi-star-fill me-1"></i>
                          {guide.rating} ({guide.reviews} reviews)
                        </small>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-top pt-3 mb-4">
                <h6 className="fw-bold mb-3">Price Summary</h6>
                <div className="d-flex justify-content-between mb-2">
                  <span>Tour Price ({numberOfPeople} people):</span>
                  <span className="fw-bold">${tour.price} × {numberOfPeople}</span>
                </div>
                {selectedGuide && (
                  <div className="d-flex justify-content-between mb-2">
                    <span>Guide Fee:</span>
                    <span className="fw-bold">
                      ${guides.find(g => g.id === selectedGuide)?.price || 0}
                    </span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total:</span>
                  <span className="text-primary">
                    ${selectedGuide 
                      ? (tour.price * numberOfPeople) + (guides.find(g => g.id === selectedGuide)?.price || 0)
                      : tour.price * numberOfPeople}
                  </span>
                </div>
              </div>

              {/* Book Button */}
              <button
                className="btn btn-primary w-100 py-3 fw-bold"
                onClick={handleBookTour}
                disabled={!selectedGuide || !bookingDate}
              >
                {isAuthenticated ? (
                  <>
                    <i className="bi bi-calendar-check me-2"></i>
                    Book Now
                  </>
                ) : (
                  'Login to Book'
                )}
              </button>

              {!isAuthenticated && (
                <p className="text-center text-muted mt-3">
                  <a href="/auth" className="text-primary fw-bold">Login</a> to book this tour
                </p>
              )}

              {/* Cancellation Policy */}
              <div className="mt-4 text-center">
                <small className="text-muted">
                  <i className="bi bi-shield-check me-1"></i>
                  Free cancellation up to 48 hours before the tour
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TourDetails;