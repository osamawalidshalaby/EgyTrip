import React from 'react';
import SearchBar from './SearchBar.jsx';

// Hero Section Component
function HeroSection() {
  return (
    <header
      className="text-white text-center d-flex align-items-center container-fluid "
      style={{
        height: "100vh",
        backgroundImage: `url('https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative"
      }}
    >
      <div style={{ backgroundColor: "rgba(0,0,0,0.5)", position: "absolute", inset: 0 }}></div>

      <div className="container-fluid position-relative">
        <h1 className="display-3 fw-bold">Find Your Next Adventure</h1>
        <p className="lead mb-4">Discover amazing places at exclusive deals</p>

        <SearchBar />
      </div>
    </header>
  );
}

export default HeroSection;