import React from 'react';
import { motion } from 'framer-motion';
import { Award, Clock, MapPin, Shield } from 'lucide-react';
import './About.css';

const About = () => {
  const features = [
    { icon: <Clock size={32} />, title: '13 Years Experience', desc: 'Trusted by thousands of happy travelers.' },
    { icon: <MapPin size={32} />, title: 'Based in Delhi', desc: 'Operating globally from Janakpuri.' },
    { icon: <Award size={32} />, title: 'Premium Service', desc: 'Rated 4.7 stars by our valued clients.' },
    { icon: <Shield size={32} />, title: 'Reliable Booking', desc: 'Secure and hassle-free travel arrangements.' }
  ];

  return (
    <section id="about" className="about-section section-padding">
      <div className="container">
        <div className="about-grid">
          <motion.div 
            className="about-content"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title" style={{textAlign: 'left'}}>Elevating Your Travel Standard.</h2>
            <p className="about-text">
              Discover Your Next Great Adventure. Escape the ordinary and dive into unforgettable experiences. Whether you're seeking the thrill of a mountain trek, the serenity of a hidden beach, or the vibrant culture of a bustling city, XcursionIn brings the world to your fingertips.
            </p>
            <p className="about-text">
              Stop dreaming about your perfect getaway and start exploring today. Your journey begins here.
            </p>
            <a href="#services" className="btn-primary" style={{display: 'inline-block', marginTop: '1rem'}}>Discover More</a>
          </motion.div>
          
          <div className="features-grid">
            {features.map((feat, idx) => (
              <motion.div 
                key={idx} 
                className="feature-card glass"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <div className="feature-icon">{feat.icon}</div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
