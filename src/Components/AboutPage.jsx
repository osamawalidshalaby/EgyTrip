import React from 'react';
import Navbar from './Navbar.jsx';
import { FaMap } from "react-icons/fa";
import { MdPriceChange } from "react-icons/md";
import { AiFillSafetyCertificate } from "react-icons/ai";

export default function AboutPage() {
  const tourGuides = [
    {
      name: "Ahmed Mahmoud",
      specialty: "Cairo & Giza",
      price: "500 EGP/day",
      experience: "10 years",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop"
    },
    {
      name: "Sara Abdullah",
      specialty: "Alexandria",
      price: "450 EGP/day",
      experience: "7 years",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=300&fit=crop"
    },
    {
      name: "Mohamed Hassan",
      specialty: "Luxor & Aswan",
      price: "600 EGP/day",
      experience: "12 years",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=300&fit=crop"
    },
    {
      name: "Nourhan Ali",
      specialty: "Sharm El-Sheikh",
      price: "550 EGP/day",
      experience: "8 years",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=300&fit=crop"
    }
  ];

  const features = [
    {
      icon: <AiFillSafetyCertificate size={50} color='#0b5ed7'/>,
      title: "Certified Guides",
      description: "All our guides are certified by the Ministry of Tourism and have extensive experience in the field"
    },
    {
      icon: <MdPriceChange size={50} color='#0b5ed7'/>,
      title: "Competitive Prices",
      description: "We offer multiple options with suitable prices for all budgets from 400 to 600 EGP"
    },
    {
      icon: <FaMap size={50} color='#0b5ed7'/>,
      title: "Comprehensive Coverage",
      description: "We cover all tourist governorates in Egypt from Cairo to the Red Sea"
    }
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navbar/>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #0b5ed7 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Discover the Beauty of Egypt with Us
          </h1>
          <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
            Your perfect platform for booking the best tour guides across all Egyptian governorates at competitive prices
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#0b5ed7', marginBottom: '20px', fontWeight: 'bold', fontSize: '2rem' }}>
              Who We Are
            </h2>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555', marginBottom: '20px' }}>
              We are an Egyptian tourism platform specialized in connecting tourists with the best certified tour guides 
              throughout Egypt. Our goal is to make your tourism experience unforgettable by providing professional 
              guides who know every detail of the tourist attractions and Egypt's ancient history.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
              Whether you want to visit the Pyramids in Giza, enjoy Alexandria's beaches, 
              explore Luxor's temples, or dive in the Red Sea, we have the perfect guide for you!
            </p>
          </div>
          <div>
            <img 
              src="https://images.unsplash.com/photo-1568322445389-f64ac2515020?w=800&h=600&fit=crop" 
              alt="Tourism in Egypt"
              style={{ width: '100%', borderRadius: '15px', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}
            />
          </div>
        </div>
      </div>

      <div style={{ background: '#f8f9fa', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: '#0b5ed7', marginBottom: '50px', fontWeight: 'bold', fontSize: '2rem' }}>
            Why Choose Us?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            {features.map((feature, index) => (
              <div 
                key={index}
                style={{
                  background: 'white',
                  padding: '30px 20px',
                  borderRadius: '10px',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                  textAlign: 'center',
                  transition: 'transform 0.3s',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{feature.icon}</div>
                <h4 style={{ marginBottom: '15px', fontWeight: '600' }}>{feature.title}</h4>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <h2 style={{ textAlign: 'center', color: '#0b5ed7', marginBottom: '50px', fontWeight: 'bold', fontSize: '2rem' }}>
          Meet Some of Our Guides
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
          {tourGuides.map((guide, index) => (
            <div 
              key={index}
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <img 
                src={guide.image} 
                alt={guide.name}
                style={{ width: '100%', height: '250px', objectFit: 'cover' }}
              />
              <div style={{ padding: '20px' }}>
                <h5 style={{ fontWeight: 'bold', marginBottom: '15px' }}>{guide.name}</h5>
                <p style={{ marginBottom: '10px', color: '#555' }}>
                  <strong>Specialty:</strong> {guide.specialty}
                </p>
                <p style={{ marginBottom: '10px', color: '#555' }}>
                  <strong>Experience:</strong> {guide.experience}
                </p>
                <p style={{ color: '#0b5ed7', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '15px' }}>
                  {guide.price}
                </p>
                <button 
                  style={{
                    width: '100%',
                    padding: '10px',
                    background: 'linear-gradient(135deg, #667eea 0%, #0b5ed7 100%)',
                    border: 'none',
                    color: 'white',
                    fontWeight: 'bold',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'opacity 0.3s'
                  }}
                  onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                  onMouseLeave={(e) => e.target.style.opacity = '1'}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #0b5ed7 100%)',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ marginBottom: '20px', fontWeight: 'bold', fontSize: '2rem' }}>
            Ready to Start Your Adventure?
          </h2>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
            Choose your favorite governorate and book a tour guide now!
          </p>
          <button 
            style={{
              background: 'white',
              color: '#0b5ed7',
              border: 'none',
              padding: '15px 40px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: '50px',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
          >
            Start Booking
          </button>
        </div>
      </div>
    </div>
  );
}

