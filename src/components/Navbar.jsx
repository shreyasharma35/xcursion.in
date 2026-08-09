import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.nav 
      className={`navbar ${isScrolled ? 'scrolled glass' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="container nav-container">
        <div className="logo">
          <a href="#">Xcursion In<span>.</span></a>
        </div>
        
        <div className="nav-links desktop-only">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#testimonials">Testimonials</a>
        </div>
        
        <div className="nav-actions desktop-only">
          <a href="#contact" className="btn-nav">Enquire Now</a>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          className="mobile-menu glass"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
        >
          <a href="#home" onClick={toggleMobileMenu}>Home</a>
          <a href="#about" onClick={toggleMobileMenu}>About</a>
          <a href="#services" onClick={toggleMobileMenu}>Services</a>
          <a href="#testimonials" onClick={toggleMobileMenu}>Testimonials</a>
          <a href="#contact" onClick={toggleMobileMenu} className="mobile-btn">Enquire Now</a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
