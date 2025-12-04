<<<<<<< HEAD
=======
// Navbar Component

>>>>>>> main
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import logo from '../assets/logo.png';
<<<<<<< HEAD
import './Navbar.css'; 

function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 sticky-top custom-navbar">
      <div className="container">
    
        <div className="d-flex align-items-center">
          <img
            src={logo}
            alt="TourBooker Logo"
            width="40"
            height="40"
            className="d-inline-block align-text-top me-2 logo-img"
          />
          <a className="navbar-brand fw-bold text-primary fs-3 mb-0 brand-text">
            EgyTrip
          </a>
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
              <a className="nav-link custom-nav-link" href='/'>
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-nav-link" href='/destination'>
                Destinations
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-nav-link" href='/about'>
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link custom-nav-link" href='/contact'>
                Contact
              </a>
            </li>
          </ul>
          
          {/* Auth Buttons */}
          <div className="d-flex flex-column flex-lg-row gap-2 ms-lg-3 mt-3 mt-lg-0">
            <a href="/user">
              <button className="btn btn-outline-primary px-4 py-2 fw-medium custom-login-btn">
              Login
            </button>
            </a>
            <a href="/user">
            <button className="btn btn-primary px-4 py-2 fw-medium custom-signup-btn">
              Sign Up
            </button>
            </a>
          </div>
=======


function Navbar({ menuOpen, setMenuOpen }) {
  return (
    <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3">
      <div className="container-fluid">
        <img
          src={logo}
          alt="Logo"
          width="40"
          height="40"
          className="d-inline-block align-text-top"
        />
        <a className="navbar-brand fw-bold text-primary fs-3">TourBooker</a>

        <button className="navbar-toggler" type="button" onClick={() => setMenuOpen(!menuOpen)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 gap-3">
            <li className="nav-item"><a className="nav-link">Home</a></li>
            <li className="nav-item"><a className="nav-link">Destinations</a></li>
            <li className="nav-item"><a className="nav-link">About</a></li>
            <li className="nav-item"><a className="nav-link">Contact</a></li>
          </ul>
          <button className="btn btn-outline-primary ms-3">Login</button>
          <button className="btn btn-primary ms-2">Sign Up</button>
>>>>>>> main
        </div>
      </div>
    </nav>
  );
}

export default Navbar;