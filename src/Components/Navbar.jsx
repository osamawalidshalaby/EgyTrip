import React from 'react';
import { NavLink } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar({ menuOpen, setMenuOpen }) {
  console.log('Navbar rendered with menuOpen:', menuOpen);
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 fixed-top custom-navbar">
      <div className="container">
    
        <div className="d-flex align-items-center">
          <NavLink to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src={logo}
              alt="TourBooker Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top me-2 logo-img"
            />
            <span className="navbar-brand fw-bold text-primary fs-3 mb-0 brand-text">
              EgyTrip
            </span>
          </NavLink>
        </div>

       
        <button 
          className="navbar-toggler border-0 custom-toggler" 
          type="button" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Links */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to='/' onClick={() => setMenuOpen(false)}>
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to='/destinations' onClick={() => setMenuOpen(false)}>
                Destinations
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to="/guide-dashboard" onClick={() => setMenuOpen(false)}>Guide Dashboard
              </NavLink>
</li>

            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to='/about' onClick={() => setMenuOpen(false)}>
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link custom-nav-link" to='/contact' onClick={() => setMenuOpen(false)}>
                Contact
              </NavLink>
            </li>
          </ul>
          
          {/* Auth Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3 mt-3 mt-lg-0">
            <NavLink to="/user" onClick={() => setMenuOpen(false)}>
              <button className="btn btn-outline-primary px-4 py-2 fw-medium custom-login-btn">
              Login
              </button>
            </NavLink>
            <NavLink to="/user" onClick={() => setMenuOpen(false)}>
            <button className="btn btn-primary px-4 py-2 fw-medium custom-signup-btn">
              Sign Up
            </button>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;