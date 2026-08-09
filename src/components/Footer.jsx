import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2>Xcursion In<span>.</span></h2>
            <p>Curating exceptional travel experiences since 13 years. Discover the world with unparalleled luxury and personalized service.</p>
          </div>
          
          <div className="footer-links">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#services">Our Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>
          

        </div>
        
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Xcursion In. All rights reserved.</p>
          <p>Designed for a premium experience.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
