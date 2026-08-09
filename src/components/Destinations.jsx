import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Sparkles } from 'lucide-react';
import './Destinations.css';

const Destinations = () => {
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [insight, setInsight] = useState("");
  const [insightLoading, setInsightLoading] = useState(false);

  const places = [
    {
      id: 1,
      name: "Ladakh",
      country: "India",
      image: "/images/dest_ladakh_1786304130379.png",
      span: "col-span-2 row-span-2",
      desc: "Known as the Land of High Passes, Ladakh is a mesmerizing high-altitude desert featuring dramatic landscapes, ancient Buddhist monasteries, and crystal-clear lakes.",
      attractions: ["Pangong Tso Lake", "Nubra Valley & Sand Dunes", "Thiksey Monastery"]
    },
    {
      id: 2,
      name: "Goa",
      country: "India",
      image: "/images/dest_goa_1786304144571.png",
      span: "col-span-1 row-span-1",
      desc: "A coastal paradise in India, Goa blends Portuguese heritage with vibrant nightlife, serene beaches, and lush tropical landscapes.",
      attractions: ["Basilica of Bom Jesus", "Baga & Calangute Beaches", "Dudhsagar Waterfalls"]
    },
    {
      id: 3,
      name: "Vietnam",
      country: "Southeast Asia",
      image: "/images/dest_vietnam_1786304155263.png",
      span: "col-span-1 row-span-1",
      desc: "A country of breathtaking natural beauty and deep history, offering everything from misty limestone peaks to bustling ancient towns.",
      attractions: ["Halong Bay Cruises", "Hoi An Ancient Town", "Cu Chi Tunnels"]
    },
    {
      id: 4,
      name: "Singapore",
      country: "Asia",
      image: "/images/dest_singapore_1786304166860.png",
      span: "col-span-2 row-span-1",
      desc: "A futuristic island city-state where nature meets cutting-edge architecture, offering world-class dining, shopping, and entertainment.",
      attractions: ["Gardens by the Bay", "Marina Bay Sands", "Sentosa Island"]
    }
  ];

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedPlace) {
      document.body.style.overflow = 'hidden';
      fetchInsight(selectedPlace.name);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; }
  }, [selectedPlace]);

  const fetchInsight = async (destinationName) => {
    setInsightLoading(true);
    setInsight("");
    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY_HERE') return;

      const prompt = `Give me a 1-sentence captivating, real-time insight about traveling to ${destinationName} this month. For example, mention current weather vibe, a hidden gem tip, or a cultural note. Keep it alluring and professional.`;
      
      const response = await fetch("/api/groq/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        setInsight(data.choices[0].message.content.replace(/"/g, ''));
      }
    } catch (e) {
      console.error("AI Insight Error:", e);
    } finally {
      setInsightLoading(false);
    }
  };

  return (
    <section id="destinations" className="destinations-section section-padding">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Destinations
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Explore some of our most highly requested getaways, offering everything from pristine beaches to majestic mountains.
        </motion.p>

        <div className="destinations-grid">
          {places.map((place, index) => (
            <motion.div 
              key={place.id} 
              className={`destination-card ${place.span}`}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => setSelectedPlace(place)}
            >
              <img src={place.image} alt={place.name} />
              <div className="destination-overlay">
                <div className="destination-info">
                  <span className="destination-country">{place.country}</span>
                  <h3>{place.name}</h3>
                </div>
                <button className="explore-btn" onClick={(e) => {
                  e.stopPropagation();
                  setSelectedPlace(place);
                }}>
                  Explore
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Destination Detail Modal */}
      <AnimatePresence>
        {selectedPlace && (
          <motion.div 
            className="modal-backdrop glass"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPlace(null)}
          >
            <motion.div 
              className="modal-content"
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
            >
              <button className="close-modal" onClick={() => setSelectedPlace(null)}>
                <X size={24} />
              </button>
              
              <div className="modal-header">
                <img src={selectedPlace.image} alt={selectedPlace.name} />
                <div className="modal-header-overlay">
                  <span className="modal-country"><MapPin size={16} /> {selectedPlace.country}</span>
                  <h2>{selectedPlace.name}</h2>
                </div>
              </div>
              
              <div className="modal-body">
                <p className="modal-desc">{selectedPlace.desc}</p>
                
                <div className="modal-attractions">
                  <h4>Top Attractions</h4>
                  <ul>
                    {selectedPlace.attractions.map((attr, idx) => (
                      <li key={idx}>{attr}</li>
                    ))}
                  </ul>
                </div>
                
                {import.meta.env.VITE_GROQ_API_KEY && import.meta.env.VITE_GROQ_API_KEY !== 'YOUR_GROQ_API_KEY_HERE' && (
                  <div className="ai-insight-box">
                    <h4 className="flex items-center gap-2" style={{color: 'var(--accent-color)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center'}}>
                      <Sparkles size={14} /> AI Live Insight
                    </h4>
                    {insightLoading ? (
                      <p style={{fontStyle: 'italic', color: '#888', fontSize: '0.9rem'}}>Analyzing current travel trends...</p>
                    ) : (
                      <p style={{fontSize: '0.95rem', color: '#ccc', fontStyle: 'italic'}}>"{insight}"</p>
                    )}
                  </div>
                )}
                
                <div className="modal-actions">
                  <a href="#contact" className="btn-primary" onClick={() => setSelectedPlace(null)}>
                    Enquire Now
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Destinations;
