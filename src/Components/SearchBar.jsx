import React from 'react';
import { MapPin, Calendar, Users, Search } from 'react-feather';

// Search Bar Component
function SearchBar() {
  return (
    <div className="bg-white p-4 rounded-4 shadow-lg mx-auto" style={{ maxWidth: "900px" }}>
      <div className="row g-3">
        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text"><MapPin size={18} /></span>
            <input type="text" placeholder="Location" className="form-control" />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text"><Calendar size={18} /></span>
            <input type="date" className="form-control" />
          </div>
        </div>

        <div className="col-md-3">
          <div className="input-group">
            <span className="input-group-text"><Users size={18} /></span>
            <input type="number" placeholder="Guests" className="form-control" />
          </div>
        </div>

        <div className="col-md-3">
          <button className="btn btn-primary w-100 d-flex align-items-center justify-content-center">
            <Search size={18} className="me-2" />
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;