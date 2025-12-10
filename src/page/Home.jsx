import { useState, useEffect } from 'react'
import Navbar from '../Components/Navbar.jsx';
import HeroSection from '../Components/HeroSection.jsx'
import PopularTours from '../Components/PopularTours.jsx'
import Testimonials from '../Components/Testimonials.jsx'
import Footer from '../Components/Footer.jsx'
import { useNavigate } from 'react-router-dom';

const TourCard = ({ tour, onClick }) => {
  return (
    <div 
      className="card border-0 shadow-sm h-100 position-relative tour-card" 
      style={{ 
        overflow: 'hidden', 
        cursor: 'pointer',
        transition: 'all 0.3s ease-in-out',
      }}
      onClick={() => onClick(tour.id)}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.boxShadow = '0 12px 24px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
      }}
    >
      <div style={{ overflow: 'hidden' }}>
        <img
          src={tour.img}
          className="card-img-top tour-card-image"
          alt={tour.title}
          style={{ 
            height: '220px', 
            width: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
          }}
        />
      </div>
      
      <div className="card-body d-flex flex-column position-relative" style={{ zIndex: 1 }}>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="card-title fw-bold mb-0 flex-grow-1" style={{ fontSize: '1.1rem' }}>
            {tour.title}
          </h5>
          <span 
            className="badge bg-info ms-2"
            style={{ 
              backgroundColor: '#0dcaf0',
              fontSize: '0.75rem',
              padding: '0.35rem 0.65rem'
            }}
          >
            {tour.type}
          </span>
        </div>
        
        <p className="text-muted mb-3 d-flex align-items-center">
          <i className="bi bi-geo-alt me-2"></i>
          <span style={{ fontSize: '0.9rem' }}>{tour.location}</span>
        </p>
        
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <div className="d-flex flex-column">
            <span className="text-primary fw-bold fs-4" style={{ color: '#0d6efd' }}>
              ${tour.price}
            </span>
            <span className="text-muted d-block small" style={{ fontSize: '0.8rem' }}>
              per person
            </span>
          </div>
          
          <div 
            className="d-flex align-items-center bg-light px-3 py-2 rounded-pill"
            style={{ 
              backgroundColor: '#f8f9fa',
              boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
            }}
          >
            <span className="fw-bold me-1" style={{ color: '#212529' }}>
              {tour.rating}
            </span>
            <div className="d-flex">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-warning" style={{ fontSize: '0.9rem' }}>
                  <i className={`bi ${i < Math.floor(tour.rating) ? 'bi-star-fill' : 'bi-star'}`}></i>
                </span>
              ))}
            </div>
          </div>
        </div>
        
        {/* Book Now Button (Hidden until hover) */}
        <button 
          className="btn btn-primary w-100 mt-3 book-now-btn"
          style={{
            backgroundColor: '#0d6efd',
            borderColor: '#0d6efd',
            transform: 'translateY(100%)',
            opacity: 0,
            transition: 'all 0.3s ease-in-out',
            position: 'absolute',
            bottom: '1rem',
            left: '1rem',
            right: '1rem',
            zIndex: 2
          }}
          onClick={(e) => {
            e.stopPropagation();
            onClick(tour.id);
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.opacity = '1';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          <i className="bi bi-calendar-check me-2"></i>
          Book Now
        </button>
      </div>
    </div>
  );
};


function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [tours, setTours] = useState([]);
  const navigate = useNavigate();

  const handleTourClick = (tourId) => {
    navigate(`/tour/${tourId}`);
  };

  useEffect(() => {
    fetch('http://localhost:3000/tours')
      .then(res => res.json())
      .then(data => {
        setTours(data.slice(0, 4)); 
      })
      .catch(err => console.log(err));
  }, []);

  const testimonials = [
    { name: 'Sarah Johnson', role: 'Travel Blogger', text: 'This platform made our trip so much easier to plan!', img: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Michael Chen', role: 'Photographer', text: 'I discovered hidden gems thanks to this website!', img: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Emma Williams', role: 'Adventure Seeker', text: 'Amazing experience with professional tour guides.', img: 'https://i.pravatar.cc/150?img=5' }
  ];

  return (
    <div className="font-sans container-fluid p-0 m-0" style={{ overflowX: 'hidden' }}>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <HeroSection />
      
      {/* Popular Tours Section */}
      <div className="container my-5 px-4">
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="fw-bold mb-2">Popular Tours</h2>
            <p className="text-muted">Discover our most booked adventures</p>
          </div>
        </div>
        
        <div className="row g-4">
          {tours.slice(0, 9).map(tour => (
            <div key={tour.id} className="col-md-6 col-lg-4">
              <TourCard tour={tour} onClick={handleTourClick} />
            </div>
          ))}
        </div>
      </div>
      
      <Testimonials testimonials={testimonials} />
      <Footer />
      
      {/* Add CSS for better hover effects */}
      <style>
        {`
          .tour-card {
            border-radius: 12px;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            transition: all 0.3s ease-in-out;
          }
          
          .tour-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
          }
          
          .tour-card:hover .book-now-btn {
            opacity: 1;
            transform: translateY(0);
          }
          
          .tour-card-image {
            border-top-left-radius: 12px;
            border-top-right-radius: 12px;
            transition: transform 0.5s ease;
          }
          
          .tour-card:hover .tour-card-image {
            transform: scale(1.05);
          }
          
          .card-body {
            background-color: white;
            border-bottom-left-radius: 12px;
            border-bottom-right-radius: 12px;
            position: relative;
            overflow: hidden;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .row.g-4 {
              display: flex;
              flex-wrap: nowrap;
              overflow-x: auto;
              scroll-snap-type: x mandatory;
              padding-bottom: 1rem;
            }
            
            .row.g-4 > .col-md-6 {
              flex: 0 0 auto;
              width: 85%;
              scroll-snap-align: start;
              margin-right: 1rem;
            }
            
            .tour-card {
              min-width: 100%;
            }
          }
          
          /* Hide horizontal scrollbar but keep functionality */
          .row.g-4::-webkit-scrollbar {
            height: 6px;
          }
          
          .row.g-4::-webkit-scrollbar-track {
            background: #f1f1f1;
            border-radius: 10px;
          }
          
          .row.g-4::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 10px;
          }
          
          .row.g-4::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
    </div>
  )
}

export default Home;