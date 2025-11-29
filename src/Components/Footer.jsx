import React from 'react';
import { Instagram, Facebook, Twitter } from 'react-bootstrap-icons';


// Footer Component
function Footer() {
    return (
    <footer className="bg-light py-5">
      <div className="container">
        <div className="row">
          {/* Company Column */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Company</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Press</a>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Support</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Contact Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Terms of Service</a>
              </li>
            </ul>
          </div>

          {/* Top Destinations Column */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Top Destinations</h6>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Italy</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Japan</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Thailand</a>
              </li>
              <li className="mb-2">
                <a href="#" className="text-decoration-none text-muted">Costa Rica</a>
              </li>
            </ul>
          </div>

          {/* Follow Us Column */}
          <div className="col-md-3">
            <h6 className="fw-bold mb-3">Follow Us</h6>
            <div className="d-flex gap-3">
              <a href="#" className="text-muted">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-muted">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-muted">
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-4 pt-4 border-top">
          <div className="col text-center">
            <p className="text-muted mb-0">© 2024 TourBooker. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;