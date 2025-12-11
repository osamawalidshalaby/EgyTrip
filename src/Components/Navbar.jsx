
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

  const getAvatar = () => {
    if (user?.avatar) return user.avatar;
    switch (user?.role) {
      case 'admin': return '👑';
      case 'guide': return '🧭';
      default: return '👤';
    }
  };

  const getUserDisplayName = () => {
    if (user?.name) return user.name.split(' ')[0];
    if (user?.username) return user.username;
    return 'Account';
  };

  const getRoleBadge = () => {
    switch (user?.role) {
      case 'admin':
        return <span className="badge bg-warning text-dark ms-2">Admin</span>;
      case 'guide':
        return <span className="badge bg-info ms-2">Guide</span>;
      default:
        return null;
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 fixed-top custom-navbar">
      <div className="container">
        {/* Logo and Brand */}
        <div className="d-flex align-items-center">
          <NavLink 
            to="/" 
            className="d-flex align-items-center text-decoration-none"
            onClick={() => setMenuOpen(false)}
          >
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
          aria-expanded={menuOpen}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navigation Menu */}
        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            {/* Home Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/' 
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-house-door me-1"></i>
                Home
              </NavLink>
            </li>

            {/* Destinations Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/destinations' 
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-compass me-1"></i>
                Destinations
              </NavLink>
            </li>

            {/* Guide Dashboard Link (Visible to Guides Only) */}
            {isAuthenticated && user?.role === 'guide' && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => 
                    `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                  } 
                  to="/guide-dashboard" 
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-person-badge me-1"></i>
                  Guide Dashboard
                </NavLink>
              </li>
            )}

            {/* Admin Panel Link (Visible to Admins Only) */}
            {isAuthenticated && user?.role === 'admin' && (
              <li className="nav-item">
                <NavLink 
                  className={({ isActive }) => 
                    `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                  } 
                  to="/admin-dashboard" 
                  onClick={() => setMenuOpen(false)}
                >
                  <i className="bi bi-shield-check me-1"></i>
                  Admin Panel
                </NavLink>
              </li>
            )}

            {/* About Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/about' 
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-info-circle me-1"></i>
                About
              </NavLink>
            </li>

            {/* Contact Link */}
            <li className="nav-item">
              <NavLink 
                className={({ isActive }) => 
                  `nav-link custom-nav-link ${isActive ? 'active' : ''}`
                } 
                to='/contact' 
                onClick={() => setMenuOpen(false)}
              >
                <i className="bi bi-envelope me-1"></i>
                Contact
              </NavLink>
            </li>
          </ul>
          
          {/* Authentication Section */}
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
                  <span className="me-2 fs-5">{getAvatar()}</span>
                  <span className="d-none d-md-inline fw-medium">
                    {getUserDisplayName()}
                    {getRoleBadge()}
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                  {/* User Info */}
                  <li className="px-3 py-2">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <span className="fs-4">{getAvatar()}</span>
                      </div>
                      <div>
                        <div className="fw-bold">{user?.name || getUserDisplayName()}</div>
                        <div className="text-muted small">{user?.email}</div>
                        <div>
                          {user?.role === 'admin' && (
                            <span className="badge bg-warning text-dark">Administrator</span>
                          )}
                          {user?.role === 'guide' && (
                            <span className="badge bg-info">Tour Guide</span>
                          )}
                          {user?.role === 'user' && (
                            <span className="badge bg-secondary">Traveler</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </li>
                  <li><hr className="dropdown-divider" /></li>

                  {/* Dashboard Links */}
                  {user?.role === 'admin' && (
                    <li>
                      <NavLink 
                        className="dropdown-item" 
                        to="/admin-dashboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        <i className="bi bi-speedometer2 me-2"></i>
                        Admin Dashboard
                      </NavLink>
                    </li>
                  )}
                  
                  {user?.role === 'guide' && (
                    <li>
                      <NavLink 
                        className="dropdown-item" 
                        to="/guide-dashboard"
                        onClick={() => setMenuOpen(false)}
                      >
                        <i className="bi bi-person-badge me-2"></i>
                        Guide Dashboard
                      </NavLink>
                    </li>
                  )}

                  {/* Common Links */}
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
                      <i className="bi bi-calendar-check me-2"></i>
                      My Bookings
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

                  {/* Logout Button */}
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
                {/* Login Button */}
                <NavLink to="/auth" onClick={() => setMenuOpen(false)}>
                  <button className="btn btn-outline-primary px-4 py-2 fw-medium custom-login-btn">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Login
                  </button>
                </NavLink>

                {/* Sign Up Button */}
                <NavLink to="/auth" onClick={() => setMenuOpen(false)}>
                  <button className="btn btn-primary px-4 py-2 fw-medium custom-signup-btn">
                    <i className="bi bi-person-plus me-2"></i>
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