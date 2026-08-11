import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");
    
    const formElement = event.target;

    // Key 1: xcursion email
    const formData1 = new FormData(formElement);
    formData1.append("access_key", "26654c6c-f115-429f-95ad-621e9bc5c48d");

    // Key 2: travel with us email
    const formData2 = new FormData(formElement);
    formData2.append("access_key", "9b66fcae-de6b-4a6b-98a2-63ed7440dfee");

    try {
      // Fire both requests at the same time
      const [res1, res2] = await Promise.all([
        fetch("https://api.web3forms.com/submit", { method: "POST", body: formData1 }),
        fetch("https://api.web3forms.com/submit", { method: "POST", body: formData2 })
      ]);
      
      const data1 = await res1.json();
      const data2 = await res2.json();

      if (data1.success && data2.success) {
        setResult("Form Submitted Successfully! We will contact you soon.");
        event.target.reset();
      } else {
        console.log("Error sending to Email 1:", data1);
        console.log("Error sending to Email 2:", data2);
        setResult(data1.success ? data2.message : data1.message);
      }
    } catch (error) {
      console.log("Error", error);
      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <section id="contact" className="contact-section section-padding">
      <div className="container">
        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="section-title" style={{ textAlign: 'left' }}>Get in Touch.</h2>
            <p className="section-subtitle" style={{ textAlign: 'left', marginLeft: 0 }}>
              Ready to plan your next extraordinary journey? Contact us today.
            </p>

            <div className="info-items">
              <div className="info-item">
                <div className="info-icon"><MapPin /></div>
                <div>
                  <h4>Visit Us</h4>
                  <p>Janakpuri C Block<br />Delhi, India</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Phone /></div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 9818451355</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon"><Mail /></div>
                <div>
                  <h4>Email Us</h4>
                  <p>Xcursionin@gmail.com, <br />Travelwithus@xcursionin.in</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form glass"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3>Send an Enquiry</h3>
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input type="text" name="name" placeholder="Your Name" required />
              </div>
              <div className="form-group">
                <input type="email" name="email" placeholder="Your Email" required />
              </div>
              <div className="form-group">
                <input type="tel" name="phone" placeholder="Your Phone Number" />
              </div>
              <div className="form-group">
                <textarea name="message" placeholder="Tell us about your travel plans..." rows="4" required></textarea>
              </div>
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>Submit Enquiry</button>
            </form>
            <span style={{ display: 'block', marginTop: '1rem', color: 'var(--accent-color)', textAlign: 'center' }}>{result}</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
