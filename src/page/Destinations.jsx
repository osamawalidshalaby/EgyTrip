import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TourCard = ({ tour, onClick }) => {
  return (
    <div 
      className="card border-0 shadow-sm h-100" 
      style={{ overflow: 'hidden', cursor: 'pointer' }}
      onClick={() => onClick(tour.id)}
    >
      <img
        src={tour.img}
        className="card-img-top"
        alt={tour.title}
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <div className="card-body d-flex flex-column">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0 flex-grow-1">{tour.title}</h5>
          <span className="badge bg-info ms-2">{tour.type}</span>
        </div>
        <p className="text-muted mb-3">
          <i className="bi bi-geo-alt me-1"></i>
          {tour.location}
        </p>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <span className="text-primary fw-bold fs-4">${tour.price}</span>
            <span className="text-muted d-block small">per person</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="fw-semibold me-1">{tour.rating}</span>
            <span className="text-warning">
              <i className="bi bi-star-fill"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

const GuideCard = ({ guide, onClick }) => {
  return (
    <div 
      className="card border-0 shadow-sm h-100"
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(guide.id)}
    >
      <div className="card-img-top position-relative">
        <img
          src={guide.img}
          alt={guide.name}
          style={{ height: '200px', width: '100%', objectFit: 'cover' }}
        />
        <span className="position-absolute top-0 end-0 m-2 badge bg-success">
          Available
        </span>
      </div>
      <div className="card-body">
        <h5 className="card-title fw-bold mb-2">{guide.name}</h5>
        <p className="text-muted mb-2">
          <i className="bi bi-briefcase me-1"></i>
          {guide.specialty}
        </p>
        <div className="d-flex align-items-center mb-3">
          <span className="text-warning me-1">
            <i className="bi bi-star-fill"></i>
          </span>
          <span className="fw-semibold me-2">{guide.rating}</span>
          <span className="text-muted small">({guide.reviews || 0} reviews)</span>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-primary fw-bold fs-5">${guide.price}<small className="text-muted fs-6">/day</small></span>
          <span className="badge bg-light text-dark">
            <i className="bi bi-clock me-1"></i>
            {guide.experience}
          </span>
        </div>
        <button 
          className="btn btn-outline-primary w-100 mt-3"
          onClick={(e) => {
            e.stopPropagation();
            onClick(guide.id);
          }}
        >
          View Profile
        </button>
      </div>
    </div>
  );
};

// Sidebar Filters Component
const Sidebar = ({ filters, setFilters, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [tourTypes, setTourTypes] = useState(['Sightseeing', 'Adventure', 'Cultural']);

  const handleTourTypeChange = (type) => {
    setTourTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  };

  const handleApply = () => {
    setFilters({
      ...filters,
      tourTypes,
      priceRange
    });
    onApplyFilters();
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm" style={{ position: 'sticky', top: '100px' }}>
      <h5 className="fw-bold mb-4">
        <i className="bi bi-funnel me-2"></i>
        Refine Your Search
      </h5>

      {/* Destination City */}
      <div className="mb-4">
        <label className="fw-semibold mb-2">Destination</label>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">
            <i className="bi bi-search"></i>
          </span>
          <input 
            type="text" 
            className="form-control border-start-0" 
            placeholder="e.g., Cairo, Luxor"
            value={filters.destination}
            onChange={(e) => setFilters({...filters, destination: e.target.value})}
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Price Range: ${priceRange[0]} - ${priceRange[1]}</label>
        <div className="position-relative">
          <input 
            type="range" 
            className="form-range" 
            min="0" 
            max="500" 
            step="10"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={{ accentColor: '#0d6efd' }}
          />
          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">$0</span>
            <span className="text-muted">$500</span>
          </div>
        </div>
      </div>

      {/* Customer Rating */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Minimum Rating</label>
        <div className="btn-group w-100" role="group">
          {[4, 3, 2, 1].map(rating => (
            <button
              key={rating}
              type="button"
              className={`btn btn-outline-primary ${filters.minRating === rating ? 'active' : ''}`}
              onClick={() => setFilters({...filters, minRating: rating})}
            >
              {rating}+
            </button>
          ))}
        </div>
      </div>

      {/* Tour Type */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Tour Type</label>
        <div className="d-flex flex-wrap gap-2">
          {['Sightseeing', 'Adventure', 'Cultural', 'Historical', 'Culinary', 'Shopping'].map(type => (
            <div key={type} className="form-check">
              <input 
                className="form-check-input" 
                type="checkbox" 
                id={type.toLowerCase()}
                checked={tourTypes.includes(type)}
                onChange={() => handleTourTypeChange(type)}
              />
              <label className="form-check-label" htmlFor={type.toLowerCase()}>
                {type}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Duration */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Duration</label>
        <select 
          className="form-select"
          value={filters.duration}
          onChange={(e) => setFilters({...filters, duration: e.target.value})}
        >
          <option value="">Any duration</option>
          <option value="half-day">Half day (2-4 hours)</option>
          <option value="full-day">Full day (8-10 hours)</option>
          <option value="multi-day">Multi-day</option>
        </select>
      </div>

      {/* Apply Filters Button */}
      <button 
        className="btn btn-primary w-100 py-2 fw-semibold"
        onClick={handleApply}
      >
        <i className="bi bi-check-circle me-2"></i>
        Apply Filters
      </button>

      {/* Reset Filters */}
      <button 
        className="btn btn-outline-secondary w-100 py-2 mt-2"
        onClick={() => {
          setFilters({
            destination: '',
            tourTypes: [],
            minRating: 0,
            priceRange: [0, 500],
            duration: ''
          });
          setTourTypes(['Sightseeing', 'Adventure', 'Cultural']);
          setPriceRange([0, 500]);
        }}
      >
        Reset Filters
      </button>
    </div>
  );
};

// Main Tours Listing Page
const Destinations = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('popularity');
  const [filters, setFilters] = useState({
    destination: '',
    tourTypes: [],
    minRating: 0,
    priceRange: [0, 500],
    duration: ''
  });
  const [tours, setTours] = useState([]);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tours');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [toursRes, guidesRes] = await Promise.all([
        fetch('http://localhost:3000/tours'),
        fetch('http://localhost:3000/guides')
      ]);
      
      const toursData = await toursRes.json();
      const guidesData = await guidesRes.json();
      
      setTours(toursData);
      setGuides(guidesData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = () => {
    console.log('Filters applied:', filters);
    // Here you would filter the tours based on filters
  };

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  const handleGuideClick = (guideId) => {
    navigate(`/guide/${guideId}`);
  };

  const filteredTours = tours.filter(tour => {
    if (filters.destination && !tour.location.toLowerCase().includes(filters.destination.toLowerCase())) {
      return false;
    }
    if (filters.tourTypes.length > 0 && !filters.tourTypes.includes(tour.type)) {
      return false;
    }
    if (filters.minRating > 0 && tour.rating < filters.minRating) {
      return false;
    }
    if (tour.price < filters.priceRange[0] || tour.price > filters.priceRange[1]) {
      return false;
    }
    return true;
  });

  const sortedTours = [...filteredTours].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.rating - a.rating; // popularity
    }
  });

  if (loading) {
    return (
      <div className="container py-5 text-center" style={{ marginTop: '100px' }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading destinations...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh', paddingTop: '100px' }}>
      <div className="container-fluid px-4 py-4">
        <div className="row">
          {/* Sidebar */}
          <div className="col-lg-3">
            <Sidebar 
              filters={filters} 
              setFilters={setFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>

          {/* Main Content */}
          <div className="col-lg-9">
            {/* Header with Tabs */}
            <div className="card border-0 shadow-sm mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <div>
                    <h2 className="fw-bold mb-2">Explore Egypt</h2>
                    <p className="text-muted mb-0">
                      Discover {tours.length} tours and {guides.length} professional guides
                    </p>
                  </div>
                  <div className="dropdown">
                    <button 
                      className="btn btn-outline-primary dropdown-toggle px-4" 
                      type="button" 
                      data-bs-toggle="dropdown"
                    >
                      <i className="bi bi-sort-down me-2"></i>
                      Sort by: {sortBy === 'popularity' ? 'Popularity' : 
                               sortBy === 'price-low' ? 'Price: Low to High' :
                               sortBy === 'price-high' ? 'Price: High to Low' : 'Rating'}
                    </button>
                    <ul className="dropdown-menu">
                      <li>
                        <button className="dropdown-item" onClick={() => setSortBy('popularity')}>
                          <i className="bi bi-fire me-2"></i>
                          Popularity
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => setSortBy('price-low')}>
                          <i className="bi bi-arrow-up me-2"></i>
                          Price: Low to High
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => setSortBy('price-high')}>
                          <i className="bi bi-arrow-down me-2"></i>
                          Price: High to Low
                        </button>
                      </li>
                      <li>
                        <button className="dropdown-item" onClick={() => setSortBy('rating')}>
                          <i className="bi bi-star me-2"></i>
                          Rating
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Tabs Navigation */}
                <ul className="nav nav-tabs nav-fill">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'tours' ? 'active' : ''}`}
                      onClick={() => setActiveTab('tours')}
                    >
                      <i className="bi bi-compass me-2"></i>
                      Tours ({tours.length})
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === 'guides' ? 'active' : ''}`}
                      onClick={() => setActiveTab('guides')}
                    >
                      <i className="bi bi-person-badge me-2"></i>
                      Guides ({guides.length})
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Content based on active tab */}
            {activeTab === 'tours' ? (
              <>
                {/* Tours Count */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">
                    {filteredTours.length} {filteredTours.length === 1 ? 'Tour' : 'Tours'} Found
                  </h4>
                  <div className="text-muted">
                    Showing {Math.min(9, filteredTours.length)} of {filteredTours.length}
                  </div>
                </div>

                {/* Tours Grid */}
                <div className="row g-4">
                  {sortedTours.slice(0, 9).map(tour => (
                    <div key={tour.id} className="col-md-6 col-lg-4">
                      <TourCard tour={tour} onClick={handleTourClick} />
                    </div>
                  ))}
                </div>

                {/* No Results Message */}
                {filteredTours.length === 0 && (
                  <div className="text-center py-5">
                    <i className="bi bi-compass fs-1 text-muted mb-3"></i>
                    <h4>No tours found</h4>
                    <p className="text-muted">Try adjusting your filters or search terms</p>
                    <button 
                      className="btn btn-primary"
                      onClick={() => setFilters({
                        destination: '',
                        tourTypes: [],
                        minRating: 0,
                        priceRange: [0, 500],
                        duration: ''
                      })}
                    >
                      Clear All Filters
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                {/* Guides Section */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h4 className="fw-bold mb-0">
                    Professional Tour Guides
                  </h4>
                  <div className="text-muted">
                    Showing {Math.min(6, guides.length)} of {guides.length} guides
                  </div>
                </div>

                {/* Guides Grid */}
                <div className="row g-4">
                  {guides.slice(0, 6).map(guide => (
                    <div key={guide.id} className="col-md-6 col-lg-4">
                      <GuideCard guide={guide} onClick={handleGuideClick} />
                    </div>
                  ))}
                </div>

                {/* All Guides Link */}
                <div className="text-center mt-5">
                  <Link to="/guides" className="btn btn-outline-primary px-5">
                    View All Guides
                  </Link>
                </div>
              </>
            )}

            {/* Pagination (for tours only) */}
            {activeTab === 'tours' && filteredTours.length > 0 && (
              <nav className="d-flex justify-content-center mt-5">
                <ul className="pagination">
                  <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <i className="bi bi-chevron-left"></i>
                    </button>
                  </li>
                  {[1, 2, 3].map(page => (
                    <li key={page} className="page-item">
                      <button 
                        className={`page-link ${currentPage === page ? 'active' : ''}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </button>
                    </li>
                  ))}
                  <li className="page-item">
                    <span className="page-link">...</span>
                  </li>
                  <li className={`page-item ${currentPage === 3 ? 'disabled' : ''}`}>
                    <button 
                      className="page-link" 
                      onClick={() => setCurrentPage(currentPage + 1)}
                    >
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </li>
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;