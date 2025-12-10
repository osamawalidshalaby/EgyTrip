// src/Components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../assets/logo.png';
import './Navbar.css';

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setMenuOpen(false);
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 fixed-top custom-navbar">
      <div className="container">
        {/* Logo and Brand */}
        <div className="d-flex align-items-center">
          <NavLink to="/" className="d-flex align-items-center text-decoration-none">
            <img
              src={logo}
              alt="EgyTrip Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-top me-2 logo-img"
            />
            <span className="navbar-brand fw-bold text-primary fs-3 mb-0 brand-text">
              EgyTrip
            </span>
          </NavLink>
        </div>

        {/* Mobile Toggle Button */}
        <button 
          className="navbar-toggler border-0 custom-toggler" 
          type="button" 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/' 
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/destinations' 
                onClick={() => setMenuOpen(false)}
              >
                Destinations
              </NavLink>
            </li>
            {isAuthenticated && user?.role === 'guide' && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => 
                    `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                  } 
                  to="/guide-dashboard" 
                  onClick={() => setMenuOpen(false)}
                >
                  Guide Dashboard
                </NavLink>
              </li>
            )}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/about' 
                onClick={() => setMenuOpen(false)}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/contact' 
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </NavLink>
            </li>
          </ul>
          
          {/* Authentication Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3 mt-3 mt-lg-0">
            {isAuthenticated ? (
              <div className="dropdown">
                <button 
                  className="btn btn-outline-primary dropdown-toggle d-flex align-items-center"
                  type="button"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="me-2">{user.avatar || '👤'}</span>
                  <span className="d-none d-md-inline">{user.name?.split(' ')[0] || 'Account'}</span>
                </button>
                <ul className="dropdown-menu" aria-labelledby="userDropdown">
                  <li>
                    <NavLink 
                      className="dropdown-item" 
                      to="/user" 
                      onClick={() => setMenuOpen(false)}
                    >
                      <i className="bi bi-person-circle me-2"></i>
                      My Account
                    </NavLink>
                  </li>
                  <li>
                    <NavLink 
                      className="dropdown-item" 
                      to="/user" 
                      onClick={() => setMenuOpen(false)}
                    >
                      <i className="bi bi-gear me-2"></i>
                      Settings
                    </NavLink>
                  </li>
                  <li><hr className="dropdown-divider" /></li>
                  <li>
                    <button 
                      className="dropdown-item text-danger" 
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right me-2"></i>
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <>
                <NavLink to="/auth" onClick={() => setMenuOpen(false)}>
                  <button className="btn btn-outline-primary px-4 py-2 fw-medium custom-login-btn">
                    Login
                  </button>
                </NavLink>
                <NavLink to="/auth?tab=signup" onClick={() => setMenuOpen(false)}>
                  <button className="btn btn-primary px-4 py-2 fw-medium custom-signup-btn">
                    Sign Up
                  </button>
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;