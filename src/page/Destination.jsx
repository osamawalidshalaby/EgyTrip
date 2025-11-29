import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar'
// Navbar Component
// const Navbar = () => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-white border-bottom sticky-top">
//       <div className="container-fluid px-4">
//         <a className="navbar-brand d-flex align-items-center fw-bold fs-4" href="#">
//           <div className="rounded-circle bg-info d-flex align-items-center justify-content-center me-2" 
//                style={{ width: '40px', height: '40px' }}>
//             <span className="text-white">🧭</span>
//           </div>
//           Touro
//         </a>
//         <div className="collapse navbar-collapse justify-content-center">
//           <ul className="navbar-nav gap-4">
//             <li className="nav-item">
//               <a className="nav-link text-dark" href="#">Home</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-info fw-semibold" href="#">Destinations</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-dark" href="#">Deals</a>
//             </li>
//             <li className="nav-item">
//               <a className="nav-link text-dark" href="#">About</a>
//             </li>
//           </ul>
//         </div>
//         <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" 
//              style={{ width: '45px', height: '45px', cursor: 'pointer' }}>
//           <span>👤</span>
//         </div>
//       </div>
//     </nav>
//   );
// };

// Tour Card Component
const TourCard = ({ tour }) => {
  return (
    <div className="card border-0 shadow-sm h-100" style={{ overflow: 'hidden' }}>
      <img 
        src={tour.image} 
        className="card-img-top" 
        alt={tour.title}
        style={{ height: '200px', objectFit: 'cover' }}
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
            placeholder="e.g., Paris"
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
            onClick={() => onPageChange(8)}
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
const ToursListingPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState('Popularity');
  const [filters, setFilters] = useState({
    destination: '',
    tourTypes: ['Sightseeing', 'Culinary']
  });

  const tours = [
    {
      id: 1,
      title: 'Eiffel Tower Summit Experience',
      price: 99,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400&h=300&fit=crop'
    },
    {
      id: 2,
      title: 'Alpine Peaks Hiking Adventure',
      price: 120,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=300&fit=crop'
    },
    {
      id: 3,
      title: 'Authentic Parisian Cooking Class',
      price: 75,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=300&fit=crop'
    },
    {
      id: 4,
      title: 'Louvre Museum Skip-the-Line Tour',
      price: 65,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?w=400&h=300&fit=crop'
    },
    {
      id: 5,
      title: 'Charming Montmartre Walking Tour',
      price: 49,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop'
    },
    {
      id: 6,
      title: 'Seine River Evening Cruise with Dinner',
      price: 150,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=300&fit=crop'
    }
  ];

  const handleApplyFilters = () => {
    console.log('Filters applied:', filters);
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Navbar />
      
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
                <h2 className="fw-bold mb-2">Paris: 32 Tours Found</h2>
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
              totalPages={8}
              onPageChange={setCurrentPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToursListingPage;