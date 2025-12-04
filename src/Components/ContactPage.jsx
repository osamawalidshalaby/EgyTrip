import React, { useState } from 'react';
import Navbar from './Navbar.jsx';
import { IoMdClock } from "react-icons/io";
import { FaMapPin } from "react-icons/fa";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    governorate: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you for contacting us! We will get back to you soon.');
    setFormData({
      name: '',
      email: '',
      phone: '',
      governorate: '',
      message: ''
    });
  };

  const contactInfo = [
    {
      icon: <FaPhoneAlt size={50} color='#0b5ed7'/>,
      title: 'Phone',
      content: '+20 123 456 7890',
      link: 'tel:+201234567890'
    },
    {
      icon: <MdMarkEmailUnread size={50} color='#0b5ed7'/>,
      title: 'Email',
      content: 'info@egypttours.com',
      link: 'mailto:info@egypttours.com'
    },
    {
      icon: <FaMapPin size={50} color='#0b5ed7'/>,
      title: 'Address',
      content: 'Cairo, Egypt',
      link: null
    },
    {
      icon: <IoMdClock size={50} color='#0b5ed7'/>,
      title: 'Working Hours',
      content: 'Sun - Thu: 9AM - 6PM',
      link: null
    }
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
        <Navbar/>
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%,  #0b5ed7 100%)',
        color: 'white',
        padding: '80px 20px',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '20px' }}>
            Get in Touch
          </h1>
          <p style={{ fontSize: '1.3rem', maxWidth: '800px', margin: '0 auto' }}>
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

   
      <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginBottom: '60px' }}>
          {contactInfo.map((info, index) => (
            <div
              key={index}
              style={{
                background: 'white',
                padding: '30px 20px',
                borderRadius: '10px',
                boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
                textAlign: 'center',
                transition: 'transform 0.3s',
                cursor: info.link ? 'pointer' : 'default'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              onClick={() => info.link && window.open(info.link, '_self')}
            >
              <div style={{ fontSize: '3rem', marginBottom: '15px' }}>{info.icon}</div>
              <h4 style={{ marginBottom: '10px', fontWeight: '600', color: '#333' }}>{info.title}</h4>
              <p style={{ color: ' #0b5ed7', fontWeight: '500' }}>{info.content}</p>
            </div>
          ))}
        </div>

        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'start' }}>
          
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '15px',
            boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ color: ' #0b5ed7', marginBottom: '30px', fontWeight: 'bold' }}>
              Send us a Message
            </h2>
            <div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = ' #0b5ed7'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = ' #0b5ed7'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    outline: 'none'
                  }}
                  onFocus={(e) => e.target.style.borderColor = ' #0b5ed7'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Interested Governorate
                </label>
                <select
                  name="governorate"
                  value={formData.governorate}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    outline: 'none',
                    cursor: 'pointer'
                  }}
                  onFocus={(e) => e.target.style.borderColor = ' #0b5ed7'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                >
                  <option value="">Select a governorate</option>
                  <option value="cairo">Cairo</option>
                  <option value="giza">Giza</option>
                  <option value="alexandria">Alexandria</option>
                  <option value="luxor">Luxor</option>
                  <option value="aswan">Aswan</option>
                  <option value="sharm">Sharm El-Sheikh</option>
                  <option value="hurghada">Hurghada</option>
                </select>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#333' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '2px solid #e0e0e0',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'border-color 0.3s',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                  onFocus={(e) => e.target.style.borderColor = ' #0b5ed7'}
                  onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                />
              </div>

              <button
                onClick={handleSubmit}
                style={{
                  width: '100%',
                  padding: '15px',
                  background: 'linear-gradient(135deg, #667eea 0%,  #0b5ed7 100%)',
                  border: 'none',
                  color: 'white',
                  fontSize: '1.1rem',
                  fontWeight: 'bold',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s'
                }}
                onMouseEnter={(e) => e.target.style.opacity = '0.9'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Send Message
              </button>
            </div>
          </div>

            <div style={{
                background: 'white',
                padding: '40px',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)'
            }}>
                <h2 style={{ color: ' #0b5ed7', marginBottom: '30px', fontWeight: 'bold' }}>
                Find Us
                </h2>
                <div style={{
                width: '100%',
                height: '400px',
                borderRadius: '10px',
                overflow: 'hidden',
                marginBottom: '20px',
                background: '#e0e0e0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
                }}>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110502.61184917396!2d31.34086747312484!3d30.05961134447995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14583fa60b21beeb%3A0x79dfb296e8423bba!2z2KfZhNmC2KfZh9ix2KnYjCDZhdit2KfZgdi42Kkg2KfZhNmC2KfZh9ix2KnigKw!5e0!3m2!1sar!2seg!4v1764864631069!5m2!1sar!2seg"
                        style={{ border: 0, width: '100%', height: '100%' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
            </div>
            
            <div style={{ marginTop: '30px' }}>
              <h4 style={{ marginBottom: '15px', color: '#333' }}>Follow Us</h4>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
                {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map((social, index) => (
                  <button
                    key={index}
                    style={{
                      padding: '10px 20px',
                      background: '#f8f9fa',
                      border: '2px solid  #0b5ed7',
                      color: ' #0b5ed7',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: '600',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = ' #0b5ed7';
                      e.target.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#f8f9fa';
                      e.target.style.color = ' #0b5ed7';
                    }}
                  >
                    {social}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ background: '#f8f9fa', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ textAlign: 'center', color: ' #0b5ed7', marginBottom: '50px', fontWeight: 'bold', fontSize: '2rem' }}>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {[
              {
                q: 'How do I book a tour guide?',
                a: 'Simply browse our guides, select your preferred one, and click the "Book Now" button.'
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept cash, credit cards, and online payment through our secure platform.'
              },
              {
                q: 'Can I cancel my booking?',
                a: 'Yes, you can cancel up to 24 hours before the tour for a full refund.'
              }
            ].map((faq, index) => (
              <div key={index} style={{
                background: 'white',
                padding: '25px',
                borderRadius: '10px',
                boxShadow: '0 3px 10px rgba(0,0,0,0.08)'
              }}>
                <h5 style={{ color: ' #0b5ed7', marginBottom: '15px', fontWeight: '600' }}>{faq.q}</h5>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}