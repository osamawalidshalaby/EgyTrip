import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar.jsx';

const TourCard = ({ tour }) => {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ overflow: 'hidden' }}>
      <img
        src={tour.img}
        className="card-img-top"
        alt={tour.title}
       style={{ height: '90px', width: '100%', objectFit: 'cover' }}


      />
      <div className="card-body d-flex flex-column">
        <h5 className="card-title fw-bold mb-3">{tour.title}</h5>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div>
            <span className="text-info fw-semibold">from ${tour.price}</span>
          </div>
          <div className="d-flex align-items-center">
            <span className="fw-semibold me-1">{tour.rating}</span>
            <span className="text-warning">⭐</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Sidebar Filters Component
const Sidebar = ({ filters, setFilters, onApplyFilters }) => {
  const [priceRange, setPriceRange] = useState([50, 500]);

  const handleTourTypeChange = (type) => {
    setFilters(prev => ({
      ...prev,
      tourTypes: prev.tourTypes.includes(type)
        ? prev.tourTypes.filter(t => t !== type)
        : [...prev.tourTypes, type]
    }));
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm" style={{ position: 'sticky', top: '80px' }}>
      <h5 className="fw-bold mb-4">Refine Your Search</h5>

      {/* Destination City */}
      <div className="mb-4">
        <label className="fw-semibold mb-2">Destination City</label>
        <div className="input-group">
          <span className="input-group-text bg-white border-end-0">🔍</span>
          <input 
            type="text" 
            className="form-control border-start-0" 
            placeholder="e.g., Cairo"
            value={filters.destination}
            onChange={(e) => setFilters({...filters, destination: e.target.value})}
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Price Range</label>
        <div className="position-relative">
          <input 
            type="range" 
            className="form-range" 
            min="0" 
            max="500" 
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            style={{ accentColor: '#17a2b8' }}
          />
          <div className="d-flex justify-content-between mt-2">
            <span className="text-muted">${priceRange[0]}</span>
            <span className="text-muted">${priceRange[1]}</span>
          </div>
        </div>
      </div>

      {/* Customer Rating */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Customer Rating</label>
        <div className="d-flex align-items-center gap-1">
          {[1, 2, 3, 4].map(star => (
            <span key={star} className="text-warning fs-5">⭐</span>
          ))}
          <span className="text-secondary fs-5">⭐</span>
          <span className="ms-2 text-muted">4 & up</span>
        </div>
      </div>

      {/* Tour Type */}
      <div className="mb-4">
        <label className="fw-semibold mb-3">Tour Type</label>
        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="sightseeing"
            checked={filters.tourTypes.includes('Sightseeing')}
            onChange={() => handleTourTypeChange('Sightseeing')}
            style={{ accentColor: '#17a2b8' }}
          />
          <label className="form-check-label" htmlFor="sightseeing">
            Sightseeing
          </label>
        </div>
        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="adventure"
            checked={filters.tourTypes.includes('Adventure')}
            onChange={() => handleTourTypeChange('Adventure')}
          />
          <label className="form-check-label" htmlFor="adventure">
            Adventure
          </label>
        </div>
        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="culinary"
            checked={filters.tourTypes.includes('Culinary')}
            onChange={() => handleTourTypeChange('Culinary')}
            style={{ accentColor: '#17a2b8' }}
          />
          <label className="form-check-label" htmlFor="culinary">
            Culinary
          </label>
        </div>
        <div className="form-check mb-2">
          <input 
            className="form-check-input" 
            type="checkbox" 
            id="cultural"
            checked={filters.tourTypes.includes('Cultural')}
            onChange={() => handleTourTypeChange('Cultural')}
          />
          <label className="form-check-label" htmlFor="cultural">
            Cultural
          </label>
        </div>
      </div>

      {/* Apply Filters Button */}
      <button 
        className="btn btn-info text-white w-100 py-2 fw-semibold"
        onClick={onApplyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

// Pagination Component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav className="d-flex justify-content-center mt-5">
      <ul className="pagination gap-2">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link border-0 text-dark" 
            onClick={() => onPageChange(currentPage - 1)}
          >
            ‹
          </button>
        </li>
        {[1, 2, 3].map(page => (
          <li key={page} className="page-item">
            <button 
              className={`page-link border-0 ${currentPage === page ? 'bg-info text-white' : 'text-dark'}`}
              onClick={() => onPageChange(page)}
              style={{ borderRadius: '8px' }}
            >
              {page}
            </button>
          </li>
        ))}
        <li className="page-item">
          <span className="page-link border-0 text-dark bg-transparent">...</span>
        </li>
        <li className="page-item">
          <button 
            className="page-link border-0 text-dark"
            onClick={() => onPageChange(3)}
          >
            8
          </button>
        </li>
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link border-0 text-dark" 
            onClick={() => onPageChange(currentPage + 1)}
          >
            ›
          </button>
        </li>
      </ul>
    </nav>
  );
};

// Main Tours Listing Page
const Destinations = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Popularity');
  const [filters, setFilters] = useState({
    destination: '',
    tourTypes: ['Sightseeing', 'Culinary']
  });
    const tours = [
        {
            id: 1,
            title: 'Great Pyramids & Sphinx Adventure',
            location: 'Giza',
            price: 89,
            rating: 5,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBZU0XOALx0zmUZsQNGDc2o5y7X240ZONPBw&s',
            type: 'sightseeing'
        },
        {
            id: 2,
            title: 'Nile River Sunset Cruise',
            location: 'Cairo',
            price: 95,
            rating: 4.8,
            img: 'https://media.istockphoto.com/id/1399402370/photo/felucca-boats-on-nile-river-at-sunset.jpg?s=612x612&w=0&k=20&c=YLL_D5rQLgVea0-u-Q3sRqSKtteeR9vIZFOZ2JHXHfg=',
            type: 'adventure'
        },
        {
            id: 3,
            title: 'Grand Egyptian Museum Tour',
            location: 'Cairo',
            price: 150,
            rating: 5,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0tudT8TJp8ml5bAuXSDYkDpr5hh_AGONdiw&s',
            type: 'culinary'
        },
        {
            id: 4,
            title: 'Luxor Temple & Valley of Kings',
            location: 'Luxor',
            price: 120,
            rating: 4.9,
            img: 'https://egyptunitedtours.com/wp-content/uploads/2024/11/Luxor-and-the-Valley-of-the-Kings.jpg',
            type: 'sightseeing'
        },
        {
            id: 5,
            title: 'Red Sea Snorkeling Experience',
            location: 'Marsa Alam',
            price: 85,
            rating: 4.8,
            img: 'https://www.civitatis.com/f/egipto/marsa-alam/bautismo-buceo-snorkel-mar-rojo-589x392.jpg',
            type: 'adventure'
        },
        {
            id: 6,
            title: 'Khan El Khalili Bazaar Walking Tour',
            location: 'Cairo',
            price: 45,
            rating: 4.6,
            img: 'https://cdn.getyourguide.com/image/format=auto,fit=crop,gravity=auto,quality=60,width=400,height=265,dpr=2/tour_img/871a5eef28a4bda2833be62006c502bb2e3ee1f0edb390c6c3074b874fbbf1f2.jpg',
            type: 'cultural'
        },
        {
            id: 7,
            title: 'Alexandria Day Trip from Cairo',
            location: 'Alexandria',
            price: 110,
            rating: 4.7,
            img: 'https://www.marsaalamtours.com/data1/images/Day-tour-to-Alexandria-from-Cairo/3.jpg',
            type: 'sightseeing'
        },
        {
            id: 8,
            title: 'Siwa Oasis Desert Safari',
            location: 'Siwa',
            price: 150,
            rating: 4.9,
            img: 'https://www.youregypttours.com/storage/490/1584904164.jpg',
            type: 'adventure'
        },
        {
            id: 9,
            title: 'High Dam',
            location: 'Aswan',
            price: 110,
            rating: 4.7,
            img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0yyeys5WyLTli1WLSW8-WnbnK2CbXDEMO0Q&s',
            type: 'sightseeing'
        }
    ];

  const handleApplyFilters = () => {
    console.log('Filters applied:', filters);
  };

  return (
    <div style={{ backgroundColor: '#edf0f3ff', minHeight: '100vh' }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      
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
            {/* Header */}
            <div className="d-flex justify-content-between align-items-start mb-4">
              <div>
                <h2 className="fw-bold mb-2">Egypt: 9 Tours Found</h2>
                <p className="text-muted">Explore adventures, culinary experiences, and sightseeing wonders.</p>
              </div>
              <div className="dropdown">
                <button 
                  className="btn btn-outline-secondary dropdown-toggle px-4" 
                  type="button" 
                  data-bs-toggle="dropdown"
                >
                  Sort by: {sortBy}
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" onClick={() => setSortBy('Popularity')}>Popularity</a></li>
                  <li><a className="dropdown-item" onClick={() => setSortBy('Price: Low to High')}>Price: Low to High</a></li>
                  <li><a className="dropdown-item" onClick={() => setSortBy('Price: High to Low')}>Price: High to Low</a></li>
                  <li><a className="dropdown-item" onClick={() => setSortBy('Rating')}>Rating</a></li>
                </ul>
              </div>
            </div>

            {/* Tours Grid */}
            <div className="row g-4">
              {tours.map(tour => (
                <div key={tour.id} className="col-md-6 col-lg-4">
                  <TourCard tour={tour} />
                </div>
              ))}
            </div>

            {/* Pagination */}
            <Pagination 
              currentPage={currentPage}
              totalPages={3}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Destinations;