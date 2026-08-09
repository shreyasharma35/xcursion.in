import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const images = [
  "/images/hero_background_1786303057613.png",
  "/images/hero_slide_2_1786304106684.png",
  "/images/hero_slide_3_1786304117470.png"
];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds
    
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="hero-section">
      <div className="hero-slideshow">
        {images.map((src, index) => (
          <img 
            key={index}
            src={src} 
            alt={`Slide ${index + 1}`} 
            className={`hero-slide ${index === currentIndex ? 'active' : ''}`}
          />
        ))}
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container hero-content">
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Curating Exceptional<br/>Travel Experiences.
        </motion.h1>
        
        <motion.p 
          className="hero-subtitle"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          13 Years of crafting bespoke holidays and unforgettable memories across the globe.
        </motion.p>
        
        <motion.div 
          className="hero-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <a href="#contact" className="btn-primary">Start Planning</a>
          <a href="#destinations" className="btn-secondary">Explore Destinations</a>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
