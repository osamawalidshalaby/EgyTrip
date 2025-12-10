import React from 'react';
import { Grid, Map, PlusCircle, Calendar, Star, DollarSign, User, LogOut } from 'react-feather'; 

const GuideSidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark vh-100" style={{ width: '250px', position: 'fixed', left: 0, top: 0 }}>
      <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
        <span className="fs-4 fw-bold text-info me-2">🧭</span>
        <span className="fs-4 fw-bold">TourVenture</span>
      </a>
      <hr />
      
      {/* Profile Section */}
      <div className="mb-4 text-center">
         <div className="rounded-circle bg-secondary mx-auto mb-2 d-flex justify-content-center align-items-center" style={{width: '60px', height: '60px'}}>
            <span className="fs-2">👩‍🦰</span>
         </div>
         <h6 className="mb-0">Elena Petrova</h6>
         <small className="text-white-50">Mountain Guide</small>
      </div>

      <ul className="nav nav-pills flex-column mb-auto gap-2">
        <li className="nav-item">
          <a href="#" className="nav-link active bg-success d-flex align-items-center gap-2" aria-current="page">
            <Grid size={18} /> Overview
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white d-flex align-items-center gap-2">
            <Map size={18} /> My Tours
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white d-flex align-items-center gap-2">
            <PlusCircle size={18} /> Add Tour
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white d-flex align-items-center gap-2">
            <Calendar size={18} /> Bookings
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white d-flex align-items-center gap-2">
            <Star size={18} /> Reviews
          </a>
        </li>
        <li>
          <a href="#" className="nav-link text-white d-flex align-items-center gap-2">
            <DollarSign size={18} /> Earnings
          </a>
        </li>
      </ul>
      <hr />
      <div className="dropdown">
        <a href="#" className="d-flex align-items-center text-white text-decoration-none gap-2">
          <LogOut size={18} />
          <strong>Log Out</strong>
        </a>
      </div>
    </div>
  );
};

export default GuideSidebar;