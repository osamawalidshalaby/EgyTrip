import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalTours: 0,
    totalBookings: 0,
    totalGuides: 0,
    recentBookings: [],
    recentUsers: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAdminData();
    }
  }, [user]);

  const fetchAdminData = async () => {
    try {
      const [usersRes, toursRes, bookingsRes, guidesRes] = await Promise.all([
        fetch('http://localhost:3000/users'),
        fetch('http://localhost:3000/tours'),
        fetch('http://localhost:3000/bookings'),
        fetch('http://localhost:3000/guides')
      ]);

      const users = await usersRes.json();
      const tours = await toursRes.json();
      const bookings = await bookingsRes.json();
      const guides = await guidesRes.json();

      // Sort recent bookings (last 5)
      const recentBookings = [...bookings]
        .sort((a, b) => new Date(b.bookingDate) - new Date(a.bookingDate))
        .slice(0, 5);

      // Sort recent users (last 5)
      const recentUsers = [...users]
        .filter(u => u.role !== 'admin')
        .sort((a, b) => new Date(b.joinedDate) - new Date(a.joinedDate))
        .slice(0, 5);

      setStats({
        totalUsers: users.length,
        totalTours: tours.length,
        totalBookings: bookings.length,
        totalGuides: guides.length,
        recentBookings,
        recentUsers
      });

    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTour = async (tourId) => {
    if (window.confirm('Are you sure you want to delete this tour?')) {
      try {
        await fetch(`http://localhost:3000/tours/${tourId}`, {
          method: 'DELETE'
        });
        fetchAdminData();
        alert('Tour deleted successfully!');
      } catch (error) {
        console.error('Error deleting tour:', error);
        alert('Failed to delete tour.');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await fetch(`http://localhost:3000/users/${userId}`, {
          method: 'DELETE'
        });
        fetchAdminData();
        alert('User deleted successfully!');
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user.');
      }
    }
  };

  const handleApproveGuide = async (guideId) => {
    try {
      await fetch(`http://localhost:3000/guides/${guideId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ approved: true })
      });
      fetchAdminData();
      alert('Guide approved successfully!');
    } catch (error) {
      console.error('Error approving guide:', error);
      alert('Failed to approve guide.');
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading admin dashboard...</p>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="alert alert-danger" role="alert">
          <h4 className="alert-heading">Access Denied!</h4>
          <p>You don't have permission to access the admin dashboard.</p>
          <hr />
          <Link to="/" className="btn btn-primary">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid px-0" style={{ marginTop: '80px' }}>
      {/* Admin Header */}
      <div className="bg-dark text-white py-4">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="fw-bold mb-2">Admin Dashboard</h1>
              <p className="mb-0 text-light">
                <i className="bi bi-shield-check me-2"></i>
                Welcome, {user.name} | {user.email}
              </p>
            </div>
            <div>
              <span className="badge bg-warning text-dark px-3 py-2">
                <i className="bi bi-star-fill me-1"></i>
                Administrator
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid px-0">
        <div className="row g-0">
          {/* Sidebar */}
          <div className="col-lg-2 bg-light border-end" style={{ minHeight: 'calc(100vh - 80px)' }}>
            <div className="p-3">
              <h6 className="fw-bold text-uppercase text-muted mb-3">Main Menu</h6>
              <ul className="nav flex-column">
                <li className="nav-item mb-2">
                  <button
                    className={`nav-link w-100 text-start ${activeTab === 'overview' ? 'active' : ''}`}
                    onClick={() => setActiveTab('overview')}
                  >
                    <i className="bi bi-speedometer2 me-2"></i>
                    Overview
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className={`nav-link w-100 text-start ${activeTab === 'tours' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tours')}
                  >
                    <i className="bi bi-compass me-2"></i>
                    Tours
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className={`nav-link w-100 text-start ${activeTab === 'users' ? 'active' : ''}`}
                    onClick={() => setActiveTab('users')}
                  >
                    <i className="bi bi-people me-2"></i>
                    Users
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className={`nav-link w-100 text-start ${activeTab === 'bookings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('bookings')}
                  >
                    <i className="bi bi-calendar-check me-2"></i>
                    Bookings
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className={`nav-link w-100 text-start ${activeTab === 'guides' ? 'active' : ''}`}
                    onClick={() => setActiveTab('guides')}
                  >
                    <i className="bi bi-person-badge me-2"></i>
                    Guides
                  </button>
                </li>
                <li className="nav-item mb-2">
                  <button
                    className={`nav-link w-100 text-start ${activeTab === 'add-tour' ? 'active' : ''}`}
                    onClick={() => setActiveTab('add-tour')}
                  >
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Tour
                  </button>
                </li>
              </ul>

              <hr className="my-4" />

              <h6 className="fw-bold text-uppercase text-muted mb-3">Quick Actions</h6>
              <div className="d-grid gap-2">
                <Link to="/destinations" className="btn btn-outline-primary btn-sm">
                  View Website
                </Link>
                <button className="btn btn-outline-success btn-sm" onClick={fetchAdminData}>
                  Refresh Data
                </button>
                <button className="btn btn-outline-danger btn-sm" onClick={logout}>
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="col-lg-10 p-4">
            {/* Statistics Cards */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card border-0 shadow-sm bg-primary text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fs-3 fw-bold">{stats.totalUsers}</div>
                        <div>Total Users</div>
                      </div>
                      <i className="bi bi-people fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm bg-success text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fs-3 fw-bold">{stats.totalTours}</div>
                        <div>Total Tours</div>
                      </div>
                      <i className="bi bi-compass fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm bg-warning text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fs-3 fw-bold">{stats.totalBookings}</div>
                        <div>Total Bookings</div>
                      </div>
                      <i className="bi bi-calendar-check fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card border-0 shadow-sm bg-info text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div className="fs-3 fw-bold">{stats.totalGuides}</div>
                        <div>Total Guides</div>
                      </div>
                      <i className="bi bi-person-badge fs-1"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="row">
                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-white">
                        <h5 className="fw-bold mb-0">
                          <i className="bi bi-calendar-check me-2"></i>
                          Recent Bookings
                        </h5>
                      </div>
                      <div className="card-body">
                        {stats.recentBookings.length > 0 ? (
                          <div className="list-group list-group-flush">
                            {stats.recentBookings.map(booking => (
                              <div key={booking.id} className="list-group-item border-0 px-0 py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <h6 className="fw-bold mb-1">{booking.tourTitle}</h6>
                                    <small className="text-muted">
                                      {new Date(booking.date).toLocaleDateString()} • ${booking.totalPrice}
                                    </small>
                                  </div>
                                  <span className={`badge bg-${booking.status === 'upcoming' ? 'warning' : 'success'}`}>
                                    {booking.status}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted text-center">No recent bookings</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6">
                    <div className="card border-0 shadow-sm mb-4">
                      <div className="card-header bg-white">
                        <h5 className="fw-bold mb-0">
                          <i className="bi bi-person-plus me-2"></i>
                          Recent Users
                        </h5>
                      </div>
                      <div className="card-body">
                        {stats.recentUsers.length > 0 ? (
                          <div className="list-group list-group-flush">
                            {stats.recentUsers.map(user => (
                              <div key={user.id} className="list-group-item border-0 px-0 py-3">
                                <div className="d-flex justify-content-between align-items-center">
                                  <div>
                                    <h6 className="fw-bold mb-1">{user.name}</h6>
                                    <small className="text-muted">
                                      {user.email} • {user.role}
                                    </small>
                                  </div>
                                  <span className={`badge bg-${user.role === 'guide' ? 'info' : 'secondary'}`}>
                                    {user.role}
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted text-center">No recent users</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Tours Management Tab */}
              {activeTab === 'tours' && (
                <ToursManagement onRefresh={fetchAdminData} onDelete={handleDeleteTour} />
              )}

              {/* Users Management Tab */}
              {activeTab === 'users' && (
                <UsersManagement onRefresh={fetchAdminData} onDelete={handleDeleteUser} />
              )}

              {/* Add New Tour Tab */}
              {activeTab === 'add-tour' && (
                <AddTourForm onRefresh={fetchAdminData} />
              )}

              {/* Bookings Management Tab */}
              {activeTab === 'bookings' && (
                <BookingsManagement onRefresh={fetchAdminData} />
              )}

              {/* Guides Management Tab */}
              {activeTab === 'guides' && (
                <GuidesManagement onRefresh={fetchAdminData} onApprove={handleApproveGuide} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Tours Management Component
const ToursManagement = ({ onRefresh, onDelete }) => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await fetch('http://localhost:3000/tours');
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error('Error fetching tours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (tourId) => {
    // Navigate to edit page or open modal
    console.log('Edit tour:', tourId);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border spinner-border-sm" role="status"></div>
        <p className="mt-2">Loading tours...</p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Tours Management</h5>
          <button className="btn btn-primary btn-sm" onClick={fetchTours}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Image</th>
                <th>Title</th>
                <th>Location</th>
                <th>Type</th>
                <th>Price</th>
                <th>Rating</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tours.map(tour => (
                <tr key={tour.id}>
                  <td>#{tour.id}</td>
                  <td>
                    <img
                      src={tour.img}
                      alt={tour.title}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '4px' }}
                    />
                  </td>
                  <td>
                    <strong>{tour.title}</strong>
                    {tour.description && (
                      <small className="d-block text-muted" style={{ maxWidth: '200px' }}>
                        {tour.description.substring(0, 50)}...
                      </small>
                    )}
                  </td>
                  <td>{tour.location}</td>
                  <td>
                    <span className="badge bg-info">{tour.type}</span>
                  </td>
                  <td>
                    <strong className="text-primary">${tour.price}</strong>
                  </td>
                  <td>
                    <span className="text-warning">
                      <i className="bi bi-star-fill me-1"></i>
                      {tour.rating}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(tour.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(tour.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button className="btn btn-outline-secondary">
                        <i className="bi bi-eye"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Users Management Component
const UsersManagement = ({ onRefresh, onDelete }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setUsers(data.filter(user => user.role !== 'admin')); // Exclude admins
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userId) => {
    console.log('Edit user:', userId);
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border spinner-border-sm" role="status"></div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Users Management</h5>
          <button className="btn btn-primary btn-sm" onClick={fetchUsers}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Role</th>
                <th>Joined</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>#{user.id}</td>
                  <td>
                    <strong>{user.name}</strong>
                    <div className="small text-muted">{user.username}</div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user.phone || 'N/A'}</td>
                  <td>
                    <span className={`badge bg-${user.role === 'guide' ? 'info' : 'secondary'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td>{user.joinedDate}</td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        className="btn btn-outline-primary"
                        onClick={() => handleEdit(user.id)}
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(user.id)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                      <button className="btn btn-outline-secondary">
                        <i className="bi bi-envelope"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Add New Tour Form Component
const AddTourForm = ({ onRefresh }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    rating: '4.5',
    img: '',
    type: 'sightseeing',
    duration: '8 hours',
    description: '',
    highlights: '',
    includes: '',
    groupSize: '15 people max',
    meetingPoint: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate unique ID
      const tourId = Date.now().toString();
      
      const newTour = {
        id: tourId,
        title: formData.title,
        location: formData.location,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
        img: formData.img || 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=500&h=300&fit=crop',
        type: formData.type,
        duration: formData.duration,
        description: formData.description,
        highlights: formData.highlights.split(',').map(item => item.trim()),
        includes: formData.includes.split(',').map(item => item.trim()),
        groupSize: formData.groupSize,
        meetingPoint: formData.meetingPoint
      };

      const response = await fetch('http://localhost:3000/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTour)
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({
          title: '',
          location: '',
          price: '',
          rating: '4.5',
          img: '',
          type: 'sightseeing',
          duration: '8 hours',
          description: '',
          highlights: '',
          includes: '',
          groupSize: '15 people max',
          meetingPoint: ''
        });
        
        setTimeout(() => setSuccess(false), 3000);
        onRefresh();
      }
    } catch (error) {
      console.error('Error adding tour:', error);
      alert('Failed to add tour. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <h5 className="fw-bold mb-0">Add New Tour</h5>
      </div>
      <div className="card-body">
        {success && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle-fill me-2"></i>
            Tour added successfully!
            <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Tour Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                placeholder="e.g., Great Pyramids Adventure"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Location *</label>
              <input
                type="text"
                className="form-control"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="e.g., Giza, Egypt"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Price ($) *</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="1"
                step="0.01"
                placeholder="89"
              />
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Rating (1-5)</label>
              <select
                className="form-select"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                {[5, 4.9, 4.8, 4.7, 4.6, 4.5, 4.4, 4.3, 4.2, 4.1, 4.0].map(r => (
                  <option key={r} value={r}>{r} stars</option>
                ))}
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label fw-semibold">Tour Type</label>
              <select
                className="form-select"
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option value="sightseeing">Sightseeing</option>
                <option value="adventure">Adventure</option>
                <option value="cultural">Cultural</option>
                <option value="historical">Historical</option>
                <option value="culinary">Culinary</option>
                <option value="shopping">Shopping</option>
              </select>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Image URL</label>
              <input
                type="url"
                className="form-control"
                name="img"
                value={formData.img}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <div className="form-text">Leave empty to use default image</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Duration</label>
              <input
                type="text"
                className="form-control"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                placeholder="e.g., 8 hours, 2 days"
              />
            </div>

            <div className="col-12 mb-3">
              <label className="form-label fw-semibold">Description *</label>
              <textarea
                className="form-control"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                required
                placeholder="Describe the tour experience..."
              ></textarea>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Highlights</label>
              <textarea
                className="form-control"
                name="highlights"
                value={formData.highlights}
                onChange={handleChange}
                rows="2"
                placeholder="Comma separated: Professional guide, Hotel pickup, Lunch included"
              ></textarea>
              <div className="form-text">Separate with commas</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">What's Included</label>
              <textarea
                className="form-control"
                name="includes"
                value={formData.includes}
                onChange={handleChange}
                rows="2"
                placeholder="Comma separated: Entrance fees, Transportation, Guide services"
              ></textarea>
              <div className="form-text">Separate with commas</div>
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Group Size</label>
              <input
                type="text"
                className="form-control"
                name="groupSize"
                value={formData.groupSize}
                onChange={handleChange}
                placeholder="e.g., 15 people max"
              />
            </div>

            <div className="col-md-6 mb-3">
              <label className="form-label fw-semibold">Meeting Point</label>
              <input
                type="text"
                className="form-control"
                name="meetingPoint"
                value={formData.meetingPoint}
                onChange={handleChange}
                placeholder="e.g., Hotel lobby, Cairo"
              />
            </div>
          </div>

          <div className="d-flex gap-2 mt-4">
            <button
              type="submit"
              className="btn btn-primary px-4"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                  Adding...
                </>
              ) : (
                <>
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Tour
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setFormData({
                title: '',
                location: '',
                price: '',
                rating: '4.5',
                img: '',
                type: 'sightseeing',
                duration: '8 hours',
                description: '',
                highlights: '',
                includes: '',
                groupSize: '15 people max',
                meetingPoint: ''
              })}
            >
              Clear Form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Bookings Management Component
const BookingsManagement = ({ onRefresh }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await fetch('http://localhost:3000/bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border spinner-border-sm" role="status"></div>
        <p className="mt-2">Loading bookings...</p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Bookings Management</h5>
          <button className="btn btn-primary btn-sm" onClick={fetchBookings}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Tour</th>
                <th>User</th>
                <th>Guide</th>
                <th>Date</th>
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
                  <td>{booking.tourTitle}</td>
                  <td>User #{booking.userId}</td>
                  <td>{booking.guideName || 'N/A'}</td>
                  <td>{new Date(booking.date).toLocaleDateString()}</td>
                  <td>
                    <strong className="text-primary">${booking.totalPrice}</strong>
                  </td>
                  <td>
                    <span className={`badge bg-${booking.status === 'upcoming' ? 'warning' : 
                                      booking.status === 'confirmed' ? 'success' : 
                                      booking.status === 'cancelled' ? 'danger' : 'secondary'}`}>
                      {booking.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-outline-primary btn-sm">
                      <i className="bi bi-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Guides Management Component
const GuidesManagement = ({ onRefresh, onApprove }) => {
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch('http://localhost:3000/guides');
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error('Error fetching guides:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="spinner-border spinner-border-sm" role="status"></div>
        <p className="mt-2">Loading guides...</p>
      </div>
    );
  }

  return (
    <div className="card border-0 shadow-sm">
      <div className="card-header bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="fw-bold mb-0">Guides Management</h5>
          <button className="btn btn-primary btn-sm" onClick={fetchGuides}>
            <i className="bi bi-arrow-clockwise me-1"></i>
            Refresh
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialty</th>
                <th>Experience</th>
                <th>Price/Day</th>
                <th>Rating</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {guides.map(guide => (
                <tr key={guide.id}>
                  <td>#{guide.id}</td>
                  <td>
                    <div className="d-flex align-items-center">
                      <img
                        src={guide.img}
                        alt={guide.name}
                        className="rounded-circle me-3"
                        style={{ width: '40px', height: '40px', objectFit: 'cover' }}
                      />
                      <div>
                        <strong>{guide.name}</strong>
                      </div>
                    </div>
                  </td>
                  <td>{guide.specialty}</td>
                  <td>{guide.experience}</td>
                  <td>
                    <strong className="text-primary">${guide.price}</strong>
                  </td>
                  <td>
                    <span className="text-warning">
                      <i className="bi bi-star-fill me-1"></i>
                      {guide.rating}
                    </span>
                  </td>
                  <td>
                    <span className={`badge bg-${guide.approved ? 'success' : 'warning'}`}>
                      {guide.approved ? 'Approved' : 'Pending'}
                    </span>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      {!guide.approved && (
                        <button
                          className="btn btn-outline-success"
                          onClick={() => onApprove(guide.id)}
                        >
                          <i className="bi bi-check-circle"></i>
                        </button>
                      )}
                      <button className="btn btn-outline-primary">
                        <i className="bi bi-eye"></i>
                      </button>
                      <button className="btn btn-outline-danger">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;