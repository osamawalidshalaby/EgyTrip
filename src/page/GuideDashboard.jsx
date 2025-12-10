import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const GuideDashboard = () => {
  const { user } = useAuth();
  const [guideData, setGuideData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [earnings, setEarnings] = useState({
    total: 0,
    thisMonth: 0,
    pending: 0
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [statistics, setStatistics] = useState({
    totalBookings: 0,
    upcomingBookings: 0,
    completedTours: 0,
    rating: 0
  });

  useEffect(() => {
    if (user) {
      fetchGuideData();
    }
  }, [user]);

  const fetchGuideData = async () => {
    try {
      // Fetch guide details
      const guideResponse = await fetch(`http://localhost:3000/guides?email=${user.email}`);
      const guides = await guideResponse.json();
      const currentGuide = guides.find(g => g.email === user.email) || guides[0];
      
      if (currentGuide) {
        setGuideData(currentGuide);
        
        // Fetch guide's bookings
        const bookingsResponse = await fetch(`http://localhost:3000/bookings?guideId=${currentGuide.id}`);
        const bookingsData = await bookingsResponse.json();
        setBookings(bookingsData);
        
        // Calculate statistics
        const upcoming = bookingsData.filter(b => b.status === 'upcoming').length;
        const completed = bookingsData.filter(b => b.status === 'past' || b.status === 'completed').length;
        
        setStatistics({
          totalBookings: bookingsData.length,
          upcomingBookings: upcoming,
          completedTours: completed,
          rating: currentGuide.rating || 4.5
        });
        
        // Calculate earnings
        const totalEarnings = bookingsData.reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
        const thisMonthEarnings = bookingsData
          .filter(b => new Date(b.date).getMonth() === new Date().getMonth())
          .reduce((sum, booking) => sum + (booking.totalPrice || 0), 0);
        
        setEarnings({
          total: totalEarnings,
          thisMonth: thisMonthEarnings,
          pending: bookingsData.filter(b => b.status === 'upcoming').length * (currentGuide.price || 0)
        });
        
        // Fetch reviews
        const reviewsResponse = await fetch(`http://localhost:3000/reviews?guideId=${currentGuide.id}`);
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
      }
    } catch (error) {
      console.error('Error fetching guide data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:3000/guides/${guideData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData)
      });
      
      if (response.ok) {
        setGuideData({ ...guideData, ...updatedData });
        alert('Profile updated successfully!');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleBookingAction = async (bookingId, action) => {
    try {
      const response = await fetch(`http://localhost:3000/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action === 'confirm' ? 'confirmed' : 'cancelled' })
      });
      
      if (response.ok) {
        fetchGuideData(); // Refresh data
        alert(`Booking ${action}ed successfully!`);
      }
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading your dashboard...</p>
      </div>
    );
  }

  if (!guideData) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="alert alert-warning" role="alert">
          <h4 className="alert-heading">Guide Profile Not Found</h4>
          <p>We couldn't find your guide profile. Please contact support or complete your profile setup.</p>
          <hr />
          <button className="btn btn-primary">Complete Profile Setup</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4" style={{ marginTop: '80px' }}>
      {/* Dashboard Header */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="card border-0 shadow-sm">
            <div className="card-body p-4">
              <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <img
                    src={guideData.img}
                    alt={guideData.name}
                    className="rounded-circle me-4"
                    style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                  />
                  <div>
                    <h1 className="fw-bold mb-2">{guideData.name}</h1>
                    <div className="d-flex align-items-center mb-2">
                      <span className="badge bg-primary me-2 px-3 py-2">
                        <i className="bi bi-briefcase me-1"></i>
                        {guideData.specialty}
                      </span>
                      <span className="text-warning">
                        <i className="bi bi-star-fill me-1"></i>
                        {guideData.rating} ({guideData.reviews || 0} reviews)
                      </span>
                    </div>
                    <p className="text-muted mb-0">
                      <i className="bi bi-geo-alt me-1"></i>
                      {guideData.location || 'Egypt'} • {guideData.experience} experience
                    </p>
                  </div>
                </div>
                <div className="text-end">
                  <h3 className="text-primary fw-bold">${guideData.price}<small className="text-muted fs-6">/day</small></h3>
                  <p className="text-muted mb-0">Daily rate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="row">
        {/* Left Sidebar - Stats */}
        <div className="col-lg-3 mb-4">
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <h5 className="fw-bold mb-4">
                <i className="bi bi-speedometer2 me-2"></i>
                Quick Stats
              </h5>
              
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Total Earnings</span>
                  <span className="fw-bold text-success">${earnings.total}</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-success" 
                    role="progressbar" 
                    style={{ width: '100%' }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">This Month</span>
                  <span className="fw-bold text-primary">${earnings.thisMonth}</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-primary" 
                    role="progressbar" 
                    style={{ width: `${(earnings.thisMonth / (earnings.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>

              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="text-muted">Pending</span>
                  <span className="fw-bold text-warning">${earnings.pending}</span>
                </div>
                <div className="progress" style={{ height: '8px' }}>
                  <div 
                    className="progress-bar bg-warning" 
                    role="progressbar" 
                    style={{ width: `${(earnings.pending / (earnings.total || 1)) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="row g-3">
            <div className="col-6">
              <div className="card border-0 shadow-sm bg-primary text-white">
                <div className="card-body text-center p-3">
                  <div className="fs-4 fw-bold">{statistics.totalBookings}</div>
                  <div className="small">Total Bookings</div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0 shadow-sm bg-success text-white">
                <div className="card-body text-center p-3">
                  <div className="fs-4 fw-bold">{statistics.upcomingBookings}</div>
                  <div className="small">Upcoming</div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0 shadow-sm bg-info text-white">
                <div className="card-body text-center p-3">
                  <div className="fs-4 fw-bold">{statistics.completedTours}</div>
                  <div className="small">Completed</div>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="card border-0 shadow-sm bg-warning text-white">
                <div className="card-body text-center p-3">
                  <div className="fs-4 fw-bold">{statistics.rating}</div>
                  <div className="small">Rating</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card border-0 shadow-sm mt-4">
            <div className="card-body">
              <h6 className="fw-bold mb-3">Quick Actions</h6>
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary">
                  <i className="bi bi-calendar-plus me-2"></i>
                  Add Availability
                </button>
                <button className="btn btn-outline-success">
                  <i className="bi bi-plus-circle me-2"></i>
                  Create New Tour
                </button>
                <button className="btn btn-outline-info">
                  <i className="bi bi-pencil-square me-2"></i>
                  Update Profile
                </button>
                <button className="btn btn-outline-secondary">
                  <i className="bi bi-file-earmark-text me-2"></i>
                  Generate Report
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="col-lg-9">
          {/* Tabs Navigation */}
          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body p-0">
              <ul className="nav nav-tabs nav-fill">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <i className="bi bi-house-door me-2"></i>
                    Overview
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Bookings ({bookings.length})
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => setActiveTab('reviews')}
                  >
                    <i className="bi bi-star me-2"></i>
                    Reviews ({reviews.length})
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'profile' ? 'active' : ''}`}
                    onClick={() => setActiveTab('profile')}
                  >
                    <i className="bi bi-person me-2"></i>
                    Profile
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'earnings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('earnings')}
                  >
                    <i className="bi bi-currency-dollar me-2"></i>
                    Earnings
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="row">
                {/* Upcoming Bookings */}
                <div className="col-12 mb-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 className="fw-bold mb-0">Upcoming Bookings</h5>
                        <Link to="#" className="text-decoration-none">
                          View All
                        </Link>
                      </div>
                      {bookings.filter(b => b.status === 'upcoming').length > 0 ? (
                        <div className="table-responsive">
                          <table className="table table-hover">
                            <thead>
                              <tr>
                                <th>Tour</th>
                                <th>Client</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
                              {bookings
                                .filter(b => b.status === 'upcoming')
                                .slice(0, 5)
                                .map(booking => (
                                  <tr key={booking.id}>
                                    <td>
                                      <div className="d-flex align-items-center">
                                        <img
                                          src={booking.image}
                                          alt={booking.tourTitle}
                                          className="rounded me-3"
                                          style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        />
                                        <div>
                                          <div className="fw-bold">{booking.tourTitle}</div>
                                          <small className="text-muted">{booking.location}</small>
                                        </div>
                                      </div>
                                    </td>
                                    <td>
                                      <div className="fw-semibold">Client #{booking.userId}</div>
                                      <small className="text-muted">{booking.numberOfPeople} people</small>
                                    </td>
                                    <td>{formatDate(booking.date)}</td>
                                    <td>
                                      <span className={`badge bg-${booking.status === 'upcoming' ? 'warning' : 'success'}`}>
                                        {booking.status}
                                      </span>
                                    </td>
                                    <td>
                                      <div className="btn-group btn-group-sm">
                                        <button 
                                          className="btn btn-outline-success"
                                          onClick={() => handleBookingAction(booking.id, 'confirm')}
                                        >
                                          Confirm
                                        </button>
                                        <button 
                                          className="btn btn-outline-danger"
                                          onClick={() => handleBookingAction(booking.id, 'cancel')}
                                        >
                                          Cancel
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                          <h5>No Upcoming Bookings</h5>
                          <p className="text-muted">You don't have any upcoming tours scheduled.</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recent Reviews */}
                <div className="col-md-6 mb-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Recent Reviews</h5>
                      {reviews.length > 0 ? (
                        reviews.slice(0, 3).map(review => (
                          <div key={review.id} className="mb-3 pb-3 border-bottom">
                            <div className="d-flex justify-content-between mb-2">
                              <div>
                                <div className="fw-bold">{review.userName}</div>
                                <div className="text-warning small">
                                  {'★'.repeat(review.rating)}
                                  {'☆'.repeat(5 - review.rating)}
                                </div>
                              </div>
                              <small className="text-muted">{review.date}</small>
                            </div>
                            <p className="mb-0">{review.comment}</p>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-4">
                          <i className="bi bi-chat-square-text fs-1 text-muted mb-3"></i>
                          <p className="text-muted">No reviews yet</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Earnings Summary */}
                <div className="col-md-6 mb-4">
                  <div className="card border-0 shadow-sm h-100">
                    <div className="card-body">
                      <h5 className="fw-bold mb-3">Earnings Summary</h5>
                      <div className="mb-4">
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>Total Earnings</span>
                          <span className="fw-bold fs-5">${earnings.total}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                          <span>This Month</span>
                          <span className="fw-bold text-primary">${earnings.thisMonth}</span>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span>Pending</span>
                          <span className="fw-bold text-warning">${earnings.pending}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4">
                        <h6 className="fw-bold mb-3">Popular Tour Types</h6>
                        <div className="mb-2">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Historical Tours</span>
                            <span>65%</span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-success" style={{ width: '65%' }}></div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Desert Adventures</span>
                            <span>25%</span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-info" style={{ width: '25%' }}></div>
                          </div>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex justify-content-between mb-1">
                            <span>Cultural Experiences</span>
                            <span>10%</span>
                          </div>
                          <div className="progress" style={{ height: '8px' }}>
                            <div className="progress-bar bg-warning" style={{ width: '10%' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">All Bookings</h5>
                    <div className="btn-group">
                      <button className="btn btn-outline-primary btn-sm active">All</button>
                      <button className="btn btn-outline-primary btn-sm">Upcoming</button>
                      <button className="btn btn-outline-primary btn-sm">Past</button>
                    </div>
                  </div>
                  
                  {bookings.length > 0 ? (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Booking ID</th>
                            <th>Tour</th>
                            <th>Client</th>
                            <th>Date</th>
                            <th>People</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookings.map(booking => (
                            <tr key={booking.id}>
                              <td>
                                <code>#{booking.id.slice(0, 8)}</code>
                              </td>
                              <td>
                                <div className="fw-semibold">{booking.tourTitle}</div>
                                <small className="text-muted">{booking.location}</small>
                              </td>
                              <td>Client #{booking.userId}</td>
                              <td>{formatDate(booking.date)}</td>
                              <td>{booking.numberOfPeople}</td>
                              <td>
                                <div className="fw-bold">${booking.totalPrice}</div>
                              </td>
                              <td>
                                <span className={`badge bg-${booking.status === 'upcoming' ? 'warning' : 
                                                booking.status === 'confirmed' ? 'success' : 
                                                booking.status === 'cancelled' ? 'danger' : 'secondary'}`}>
                                  {booking.status}
                                </span>
                              </td>
                              <td>
                                <div className="btn-group btn-group-sm">
                                  <button className="btn btn-outline-primary">View</button>
                                  <button className="btn btn-outline-success">Contact</button>
                                  {booking.status === 'upcoming' && (
                                    <button 
                                      className="btn btn-outline-danger"
                                      onClick={() => handleBookingAction(booking.id, 'cancel')}
                                    >
                                      Cancel
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-calendar-x fs-1 text-muted mb-3"></i>
                      <h5>No Bookings Yet</h5>
                      <p className="text-muted">You haven't received any bookings yet.</p>
                      <button className="btn btn-primary">Promote Your Profile</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      <h5 className="fw-bold mb-0">Customer Reviews</h5>
                      <p className="text-muted mb-0">Overall rating: {guideData.rating} stars</p>
                    </div>
                    <div>
                      <span className="badge bg-primary">Average Response: 2 hours</span>
                    </div>
                  </div>
                  
                  {reviews.length > 0 ? (
                    reviews.map(review => (
                      <div key={review.id} className="card mb-3 border">
                        <div className="card-body">
                          <div className="d-flex justify-content-between align-items-start mb-3">
                            <div className="d-flex align-items-center">
                              <div className="rounded-circle bg-light d-flex align-items-center justify-content-center me-3"
                                   style={{ width: '50px', height: '50px' }}>
                                <i className="bi bi-person fs-4"></i>
                              </div>
                              <div>
                                <h6 className="fw-bold mb-1">{review.userName}</h6>
                                <div className="text-warning">
                                  {'★'.repeat(review.rating)}
                                  {'☆'.repeat(5 - review.rating)}
                                </div>
                              </div>
                            </div>
                            <small className="text-muted">{review.date}</small>
                          </div>
                          <p className="mb-3">{review.comment}</p>
                          <div className="d-flex justify-content-end">
                            <button className="btn btn-outline-primary btn-sm me-2">Reply</button>
                            <button className="btn btn-outline-secondary btn-sm">Report</button>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <i className="bi bi-chat-square-text fs-1 text-muted mb-3"></i>
                      <h5>No Reviews Yet</h5>
                      <p className="text-muted">Your reviews will appear here once clients start rating your tours.</p>
                      <button className="btn btn-primary">Request Reviews from Past Clients</button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="row">
                <div className="col-md-8">
                  <div className="card border-0 shadow-sm mb-4">
                    <div className="card-body">
                      <h5 className="fw-bold mb-4">Edit Profile</h5>
                      <form>
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Full Name</label>
                            <input
                              type="text"
                              className="form-control"
                              defaultValue={guideData.name}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              defaultValue={guideData.email || user.email}
                              disabled
                            />
                          </div>
                        </div>
                        
                        <div className="row mb-3">
                          <div className="col-md-6">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="tel"
                              className="form-control"
                              defaultValue={guideData.phone}
                            />
                          </div>
                          <div className="col-md-6">
                            <label className="form-label">Daily Rate ($)</label>
                            <input
                              type="number"
                              className="form-control"
                              defaultValue={guideData.price}
                            />
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Specialization</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={guideData.specialty}
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Experience</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={guideData.experience}
                          />
                        </div>
                        
                        <div className="mb-3">
                          <label className="form-label">Bio/Description</label>
                          <textarea
                            className="form-control"
                            rows="4"
                            defaultValue={guideData.description || guideData.bio}
                          ></textarea>
                        </div>
                        
                        <div className="mb-4">
                          <label className="form-label">Languages (comma separated)</label>
                          <input
                            type="text"
                            className="form-control"
                            defaultValue={guideData.languages ? guideData.languages.join(', ') : ''}
                          />
                        </div>
                        
                        <button type="submit" className="btn btn-primary px-4">
                          Update Profile
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <h6 className="fw-bold mb-3">Profile Photo</h6>
                      <div className="text-center mb-4">
                        <img
                          src={guideData.img}
                          alt={guideData.name}
                          className="rounded-circle mb-3"
                          style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                        />
                        <button className="btn btn-outline-primary w-100">Change Photo</button>
                      </div>
                      
                      <div className="mb-4">
                        <h6 className="fw-bold mb-3">Verification Status</h6>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          <span>Email Verified</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          <span>Phone Verified</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="bi bi-check-circle-fill text-success me-2"></i>
                          <span>ID Verified</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="bi bi-clock text-warning me-2"></i>
                          <span>Background Check (Pending)</span>
                        </div>
                      </div>
                      
                      <div>
                        <h6 className="fw-bold mb-3">Account Settings</h6>
                        <div className="d-grid gap-2">
                          <button className="btn btn-outline-secondary">
                            <i className="bi bi-shield-check me-2"></i>
                            Privacy Settings
                          </button>
                          <button className="btn btn-outline-secondary">
                            <i className="bi bi-bell me-2"></i>
                            Notification Settings
                          </button>
                          <button className="btn btn-outline-danger">
                            <i className="bi bi-power me-2"></i>
                            Deactivate Account
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Earnings Tab */}
            {activeTab === 'earnings' && (
              <div className="card border-0 shadow-sm">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <h5 className="fw-bold mb-0">Earnings & Payments</h5>
                    <button className="btn btn-primary">
                      <i className="bi bi-download me-2"></i>
                      Export Statements
                    </button>
                  </div>
                  
                  <div className="row mb-4">
                    <div className="col-md-4">
                      <div className="card bg-light border-0">
                        <div className="card-body text-center">
                          <div className="text-primary fw-bold fs-3">${earnings.total}</div>
                          <div className="text-muted">Total Earnings</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light border-0">
                        <div className="card-body text-center">
                          <div className="text-success fw-bold fs-3">${earnings.thisMonth}</div>
                          <div className="text-muted">This Month</div>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="card bg-light border-0">
                        <div className="card-body text-center">
                          <div className="text-warning fw-bold fs-3">${earnings.pending}</div>
                          <div className="text-muted">Pending Payout</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Booking ID</th>
                          <th>Client</th>
                          <th>Service</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bookings.map(booking => (
                          <tr key={booking.id}>
                            <td>{formatDate(booking.date)}</td>
                            <td>
                              <code>#{booking.id.slice(0, 8)}</code>
                            </td>
                            <td>Client #{booking.userId}</td>
                            <td>{booking.tourTitle}</td>
                            <td>
                              <div className="fw-bold">${booking.totalPrice}</div>
                            </td>
                            <td>
                              <span className={`badge bg-${booking.status === 'completed' ? 'success' : 'warning'}`}>
                                {booking.status === 'completed' ? 'Paid' : 'Pending'}
                              </span>
                            </td>
                            <td>
                              {booking.status === 'completed' ? (
                                <button className="btn btn-outline-success btn-sm">View Receipt</button>
                              ) : (
                                <button className="btn btn-outline-primary btn-sm">Request Payment</button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  <div className="text-center mt-4">
                    <button className="btn btn-outline-primary me-2">Withdraw Earnings</button>
                    <button className="btn btn-outline-secondary">View Payment History</button>
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

export default GuideDashboard;