import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Luxury Hill Resorts",
      location: "Kasauli, Himachal Pradesh",
      image: "/images/kasauli_resort_1786303067130.png",
      desc: "Escape to the tranquil hills with our curated selection of premium resorts. Experience world-class hospitality amidst lush greenery."
    },
    {
      title: "Historical Expeditions",
      location: "Aurangabad, Maharashtra",
      image: "/images/aurangabad_monument_1786303095573.png",
      desc: "Journey through time exploring magnificent heritage sites like the Ellora Caves and Chand Minar with our expert guides."
    },
    {
      title: "Bespoke Hotel Booking",
      location: "Global Destinations",
      image: "/images/hero_background_1786303057613.png",
      desc: "We secure the finest accommodations tailored to your preferences, ensuring a luxurious stay wherever you travel."
    }
  ];

  return (
    <section id="services" className="services-section section-padding">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Curated Experiences
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          From tranquil mountain retreats to breathtaking historical tours, we craft itineraries that resonate with your travel desires.
        </motion.p>

        <div className="services-grid">
          {services.map((srv, index) => (
            <motion.div 
              key={index} 
              className="service-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="service-image">
                <img src={srv.image} alt={srv.title} />
                <div className="service-overlay">
                  <a href="#contact" className="btn-primary" style={{padding: '0.8rem 1.5rem', fontSize: '0.9rem'}}>Enquire</a>
                </div>
              </div>
              <div className="service-content">
                <span className="service-location">{srv.location}</span>
                <h3>{srv.title}</h3>
                <p>{srv.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
