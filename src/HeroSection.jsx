import React from "react";
import { Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./HeroSection.css";

const HeroSection=()=> {

  return (
    <section className="hero">
        <iframe
            src="https://www.youtube.com/embed/GMe9957kAzE?controls=0&rel=0&playsinline=1&mute=1&autoplay=1&loop=1&playlist=GMe9957kAzE"
            frameBorder="0"
            allow="autoplay; fullscreen"
            title="Egypt Video"
        ></iframe>
    
        <div className="overlay"></div>

        <div className="hero-content">
            <p className="fs-3" style={{ fontFamily: "fantasy", color: "#f38f39" }}>
            Visit Egypt
            </p>
            <h1>Where Would You Like To Go?</h1>
            <p style={{ opacity: 0.5 }}>
            Find the Most Beautiful & Historic Places Around Egypt
            </p>

            <Row className="bg-light rounded-3 text-dark">
        
            <Col xs={12} md={4} className="border-end d-flex align-items-center">
                <div className="icon p-2">
                <i className="bi bi-clock fs-2" style={{ color: "#f38f39" }}></i>
                </div>
                <div className="content">
                <p className="text-secondary fs-6 m-0 d-flex justify-content-start">
                    Date Form
                </p>
                <input
                    type="date"
                
                    className="border-0 mx-0 p-0 bg-light fw-bold"
                />
                </div>
            </Col>

            
            <Col xs={12} md={4} className="border-end d-flex align-items-center">
                <div className="icon p-2">
                <i className="bi bi-people fs-2" style={{ color: "#f38f39" }}></i>
                </div>
                <div className="content">
                <p className="text-secondary fs-6 m-0">Guests</p>
                <div id="guests" className="fw-bold">
                    0
                </div>
                </div>
            </Col>

            
            <Col xs={12} md={4} className="g-0">
                <Row className="g-0 w-100 h-100">
                <Col className="col-4 border-end d-flex align-items-center justify-content-center">
                    <i
                    className="bi bi-menu-down fs-2"
                    style={{ color: "#f38f39" }}
                    ></i>
                </Col>
                <Col
                    className="col-8 d-flex align-items-center justify-content-center rounded-end"
                    style={{ backgroundColor: "#f38f39" }}
                >
                    <i className="bi bi-search fs-6 text-white"></i>
                    <input
                    type="submit"
                    className="border-0 text-white fw-bold fs-5"
                    value="Search"
                    style={{ backgroundColor: "#f38f39" }}
                    />
                </Col>
                </Row>
            </Col>
            </Row>
        </div>
    </section>
  );
}


export default HeroSection;