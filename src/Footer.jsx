import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./footer.css";

const EgyTripFooter = () => {
  return (
    <footer className="footer bg-black text-light">
      <div className="container">
        <Row>
          {/* Logo & Info */}
          <Col md={3} className="mb-4">
            <img
              src="../DEPI/OfficialLogo.png"
              alt="EgyTrip Logo"
              className="footer-logo"
            />
            <p>
              <em>EgyTrip</em> specializes in designing luxury private vacations
              that go far beyond expectations. Every journey is crafted to
              reflect the elegance of Egypt and the uniqueness of each traveler,
              creating unforgettable memories.
            </p>
            <hr style={{ borderColor: "#333" }} />
            <p>
              <i className="fas fa-envelope me-2"></i> info@egytrip.com
            </p>
            <p>
              <i className="fas fa-phone me-2"></i> +20 100 830 5910
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={2} className="mb-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">About</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          {/* Explore */}
          <Col md={2} className="mb-4">
            <h5>Explore</h5>
            <ul className="list-unstyled">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Places To Go</a></li>
              <li><a href="#">Plan Your Visit</a></li>
              <li><a href="#">Customize Your Trip</a></li>
              <li><a href="#">News & Blog</a></li>
              <li><a href="#">Events</a></li>
            </ul>
          </Col>

          {/* EgyTrip.com */}
          <Col md={2} className="mb-4">
            <h5>EgyTrip.com</h5>
            <ul className="list-unstyled">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Cancellation Policy</a></li>
              <li><a href="#">Travel Agencies</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </Col>

          {/* Mailing List */}
          <Col md={3} className="mb-4">
            <h5>Our Mailing List</h5>
            <form>
              <div className="mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  required
                />
              </div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="mb-3">
                <select className="form-select" required>
                  <option value="" disabled selected>
                    Select Country
                  </option>
                  <option value="Egypt">Egypt</option>
                  <option value="USA">United States</option>
                  <option value="UK">United Kingdom</option>
                  <option value="France">France</option>
                  <option value="Germany">Germany</option>
                  <option value="Italy">Italy</option>
                  <option value="UAE">United Arab Emirates</option>
                  <option value="Saudi Arabia">Saudi Arabia</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button type="submit" className="mailinglist-btn">
                JOIN
              </button>
            </form>
          </Col>
        </Row>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-actions">
            <a href="#" className="back-to-top">
              <i className="fas fa-arrow-up"></i>
            </a>
            <div className="social-icons">
              <a href="#"><i className="fab fa-facebook-f"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
          <p className="copyright mb-0">
            © 2025 EgyTrip. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EgyTripFooter;