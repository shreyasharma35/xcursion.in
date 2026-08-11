import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const Services = () => {
  const services = [
    {
      title: "Room for Your Budget",
      location: "Comfortable Stays Everywhere",
      image: "/images/budget_room.png",
      desc: "Travel doesn't have to break the bank. We handpick cozy, clean, and budget-friendly accommodations that offer incredible value without compromising on experience."
    },
    {
      title: "Cultural Trips",
      location: "Immersive Heritage Experiences",
      image: "/images/cultural_trip.png",
      desc: "Dive deep into the heart of local traditions. Explore ancient monuments, vibrant festivals, and authentic culinary secrets that connect you to the soul of the destination."
    },
    {
      title: "Adventure Trips",
      location: "Thrilling Global Expeditions",
      image: "/images/adventure_trip.png",
      desc: "Get your adrenaline pumping with our high-octane adventure tours. From high-altitude trekking to white-water rafting, conquer the extraordinary."
    },
    {
      title: "Cycling Trips",
      location: "Scenic Trails & Routes",
      image: "/images/cycling_trip.png",
      desc: "Pedal through breathtaking landscapes at your own pace. Our curated cycling routes offer the perfect blend of fitness, nature, and scenic exploration."
    },
    {
      title: "Wildlife, Safari & Photography",
      location: "Into the Wild",
      image: "/images/wildlife_safari.png",
      desc: "Embark on thrilling safaris led by expert naturalists. Capture stunning photographs of majestic wildlife in their natural, untamed habitats."
    },
    {
      title: "School Trips",
      location: "Educational & Safe Journeys",
      image: "/images/school_trip.png",
      desc: "Inspire young minds with carefully planned educational tours. We prioritize safety, learning, and fun, turning every destination into a vibrant outdoor classroom."
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
