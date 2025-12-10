// src/Components/GuideProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const GuideProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  
  const [guide, setGuide] = useState(null);
  const [tours, setTours] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    const fetchGuideData = async () => {
      try {
        // جلب بيانات المرشد
        const guideResponse = await fetch(`http://localhost:3000/guides/${id}`);
        const guideData = await guideResponse.json();
        setGuide(guideData);

        // جلب الرحلات الخاصة بهذا المرشد
        const toursResponse = await fetch('http://localhost:3000/tours');
        const allTours = await toursResponse.json();
        const guideTours = allTours.filter(tour => 
          guideData.tours && guideData.tours.includes(tour.id)
        );
        setTours(guideTours);

        // جلب التقييمات (يمكن توسيعه لاحقاً)
        setReviews([
          { id: 1, userName: 'Osama Walid', rating: 5, comment: 'Excellent guide! Very knowledgeable.', date: '2024-10-15' },
          { id: 2, userName: 'Fatima Ahmed', rating: 4, comment: 'Great experience, would book again.', date: '2024-09-20' },
        ]);

      } catch (error) {
        console.error('Error fetching guide data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGuideData();
  }, [id]);

  const handleBookGuide = () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    navigate(`/book-guide/${id}`);
  };

  const handleContactGuide = () => {
    if (!currentUser) {
      navigate('/auth');
      return;
    }
    // يمكن إضافة نظام رسائل لاحقاً
    alert(`Contact ${guide?.name} at ${guide?.phone || 'their profile'}`);
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading guide profile...</p>
      </div>
    );
  }

  if (!guide) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <h3>Guide not found</h3>
        <button className="btn btn-primary mt-3" onClick={() => navigate('/destinations')}>
          Browse Tours
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5" style={{ marginTop: '100px' }}>
      {/* Breadcrumb */}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <a href="/" className="text-decoration-none">Home</a>
          </li>
          <li className="breadcrumb-item">
            <a href="/destinations" className="text-decoration-none">Destinations</a>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {guide.name}
          </li>
        </ol>
      </nav>

      <div className="row">
        {/* Sidebar with Guide Info */}
        <div className="col-lg-4 mb-4">
          <div className="card border-0 shadow-sm sticky-top" style={{ top: '120px' }}>
            <div className="card-body text-center p-4">
              {/* Guide Photo */}
              <img
                src={guide.img}
                alt={guide.name}
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              
              {/* Guide Name and Rating */}
              <h2 className="fw-bold mb-2">{guide.name}</h2>
              <div className="mb-3">
                <span className="text-warning fs-4">
                  {'★'.repeat(Math.floor(guide.rating))}
                  {'☆'.repeat(5 - Math.floor(guide.rating))}
                </span>
                <span className="ms-2 fw-bold">{guide.rating}</span>
                <span className="text-muted ms-2">({guide.reviews || 0} reviews)</span>
              </div>

              {/* Specialization */}
              <div className="mb-4">
                <span className="badge bg-primary fs-6 px-3 py-2">{guide.specialty}</span>
              </div>

              {/* Quick Stats */}
              <div className="row mb-4">
                <div className="col-6">
                  <div className="border rounded p-3">
                    <div className="fw-bold fs-4 text-primary">{guide.experience}</div>
                    <div className="text-muted small">Experience</div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="border rounded p-3">
                    <div className="fw-bold fs-4 text-primary">{guide.toursCompleted || 0}</div>
                    <div className="text-muted small">Tours</div>
                  </div>
                </div>
              </div>

              {/* Price */}
              <div className="mb-4">
                <h3 className="text-primary fw-bold">${guide.price}<small className="text-muted fs-6"> / day</small></h3>
              </div>

              {/* Action Buttons */}
              <div className="d-grid gap-2">
                <button className="btn btn-primary btn-lg" onClick={handleBookGuide}>
                  <i className="bi bi-calendar-check me-2"></i>
                  Book This Guide
                </button>
                <button className="btn btn-outline-primary" onClick={handleContactGuide}>
                  <i className="bi bi-chat-dots me-2"></i>
                  Contact Guide
                </button>
              </div>

              {/* Languages */}
              <div className="mt-4">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-translate me-2"></i>
                  Languages
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {guide.languages?.map((lang, index) => (
                    <span key={index} className="badge bg-light text-dark border">
                      {lang}
                    </span>
                  )) || <span>English, Arabic</span>}
                </div>
              </div>

              {/* Availability */}
              <div className="mt-3">
                <h6 className="fw-bold mb-2">
                  <i className="bi bi-calendar3 me-2"></i>
                  Availability
                </h6>
                <div className="d-flex flex-wrap gap-2">
                  {guide.availability?.map((day, index) => (
                    <span key={index} className="badge bg-success">
                      {day}
                    </span>
                  )) || <span>Contact for availability</span>}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="col-lg-8">
          {/* Tabs Navigation */}
          <ul className="nav nav-tabs mb-4">
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'about' ? 'active' : ''}`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'tours' ? 'active' : ''}`}
                onClick={() => setActiveTab('tours')}
              >
                Tours ({tours.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews ({reviews.length})
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${activeTab === 'certifications' ? 'active' : ''}`}
                onClick={() => setActiveTab('certifications')}
              >
                Certifications
              </button>
            </li>
          </ul>

          {/* Tab Content */}
          <div className="tab-content">
            {/* About Tab */}
            {activeTab === 'about' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-3">About {guide.name}</h4>
                  <p className="fs-5 mb-4">{guide.description || guide.bio || 'Professional tour guide with extensive experience.'}</p>
                  
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <h6 className="fw-bold">
                        <i className="bi bi-person-badge me-2"></i>
                        Experience
                      </h6>
                      <p>{guide.experience} of guiding experience in {guide.specialty}</p>
                    </div>
                    <div className="col-md-6 mb-3">
                      <h6 className="fw-bold">
                        <i className="bi bi-geo-alt me-2"></i>
                        Specialization
                      </h6>
                      <p>{guide.specialty} and surrounding areas</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <h5 className="fw-bold mb-3">Why Choose {guide.name.split(' ')[0]}?</h5>
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item border-0 ps-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Deep knowledge of historical sites and local culture
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Flexible itineraries based on your interests
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Professional photography assistance
                      </li>
                      <li className="list-group-item border-0 ps-0">
                        <i className="bi bi-check-circle-fill text-success me-2"></i>
                        Local insider tips and recommendations
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* Tours Tab */}
            {activeTab === 'tours' && (
              <div>
                <h4 className="fw-bold mb-4">Tours by {guide.name}</h4>
                {tours.length > 0 ? (
                  <div className="row">
                    {tours.map(tour => (
                      <div key={tour.id} className="col-md-6 mb-4">
                        <div className="card border-0 shadow-sm h-100">
                          <img
                            src={tour.img}
                            className="card-img-top"
                            alt={tour.title}
                            style={{ height: '200px', objectFit: 'cover' }}
                          />
                          <div className="card-body">
                            <h5 className="card-title fw-bold">{tour.title}</h5>
                            <p className="text-muted mb-2">
                              <i className="bi bi-geo-alt me-1"></i>
                              {tour.location}
                            </p>
                            <div className="d-flex justify-content-between align-items-center">
                              <span className="text-primary fw-bold fs-5">${tour.price}</span>
                              <span className="badge bg-info">{tour.type}</span>
                            </div>
                            <button 
                              className="btn btn-primary w-100 mt-3"
                              onClick={() => navigate(`/tour/${tour.id}`)}
                            >
                              View Tour Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-compass fs-1 text-muted"></i>
                    <h5 className="mt-3">No tours available yet</h5>
                    <p className="text-muted">{guide.name} hasn't listed any tours yet.</p>
                  </div>
                )}
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div>
                <h4 className="fw-bold mb-4">Reviews for {guide.name}</h4>
                <div className="card border-0 shadow-sm mb-3">
                  <div className="card-body p-4">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h5 className="fw-bold mb-0">Overall Rating</h5>
                        <div className="d-flex align-items-center">
                          <span className="text-warning fs-3">{'★'.repeat(Math.floor(guide.rating))}</span>
                          <span className="fs-3 ms-2 fw-bold">{guide.rating}</span>
                          <span className="text-muted ms-2">({guide.reviews || 0} reviews)</span>
                        </div>
                      </div>
                      <button className="btn btn-primary" onClick={handleBookGuide}>
                        Leave a Review
                      </button>
                    </div>
                  </div>
                </div>

                {reviews.length > 0 ? (
                  reviews.map(review => (
                    <div key={review.id} className="card border-0 shadow-sm mb-3">
                      <div className="card-body">
                        <div className="d-flex justify-content-between mb-3">
                          <div>
                            <h6 className="fw-bold mb-1">{review.userName}</h6>
                            <div className="text-warning">
                              {'★'.repeat(review.rating)}
                              {'☆'.repeat(5 - review.rating)}
                            </div>
                          </div>
                          <small className="text-muted">{review.date}</small>
                        </div>
                        <p className="mb-0">{review.comment}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-5">
                    <i className="bi bi-chat-square-text fs-1 text-muted"></i>
                    <h5 className="mt-3">No reviews yet</h5>
                    <p className="text-muted">Be the first to review {guide.name}</p>
                    <button className="btn btn-primary" onClick={handleBookGuide}>
                      Book and Leave Review
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body p-4">
                  <h4 className="fw-bold mb-4">Certifications & Qualifications</h4>
                  {guide.certifications && guide.certifications.length > 0 ? (
                    <ul className="list-group list-group-flush">
                      {guide.certifications.map((cert, index) => (
                        <li key={index} className="list-group-item border-0 ps-0">
                          <i className="bi bi-award-fill text-warning me-2"></i>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="text-center py-4">
                      <i className="bi bi-award fs-1 text-muted"></i>
                      <p className="mt-3 text-muted">No certifications listed</p>
                    </div>
                  )}
                  
                  <div className="mt-4">
                    <h5 className="fw-bold mb-3">Safety & Standards</h5>
                    <div className="row">
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-shield-check text-success fs-4 me-3"></i>
                          <div>
                            <h6 className="fw-bold mb-0">Safety Certified</h6>
                            <p className="text-muted mb-0">First aid and safety training</p>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="d-flex align-items-center mb-3">
                          <i className="bi bi-person-check text-primary fs-4 me-3"></i>
                          <div>
                            <h6 className="fw-bold mb-0">Background Checked</h6>
                            <p className="text-muted mb-0">Verified professional background</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideProfile;