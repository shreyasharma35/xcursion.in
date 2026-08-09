import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import './Testimonials.css';

const Testimonials = () => {
  const reviews = [
    {
      name: "Vandana Verma",
      text: "Thank you so much Xcursion for suggesting this wonderful venue to celebrate holi and the most important day of our life. The arrangements were amazing and we have relaxed quick vacation. Looking forward to many more beautiful venue and filled vacations from you.",
      rating: 5
    },
    {
      name: "Andrew & Nikke",
      text: "Hello XI team! We arrived home yesterday afternoon & had a fabulous holiday 👍🌺 Thank you so much for organising Ahmod & Driver to take us around Aurangabad, Ellora & Ajanta. They were a great team; Guide was Superb; knowledgeable, humorous & resourceful! Lemon Tree was very comfy... Will definitely return.",
      rating: 5
    },
    {
      name: "Happy Client",
      text: "I recently stayed at Winnies Holiday Resort & Spa, Kasauli, for 2 nights and 3 days, booked through Xcursion, and it was an amazing experience! From the moment we arrived, we were greeted with warm hospitality. The rooms were spacious and well-maintained. Highly recommend!",
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section section-padding">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Client Stories
        </motion.h2>
        <motion.p 
          className="section-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Don't just take our word for it. Read what our travelers have to say about their experiences with Xcursion In.
        </motion.p>

        <div className="testimonials-grid">
          {reviews.map((rev, index) => (
            <motion.div 
              key={index} 
              className="testimonial-card glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <Quote className="quote-icon" size={40} />
              <div className="stars">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={18} fill="currentColor" />
                ))}
              </div>
              <p className="review-text">"{rev.text}"</p>
              <div className="reviewer-info">
                <div className="reviewer-avatar">
                  {rev.name.charAt(0)}
                </div>
                <h4>{rev.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
