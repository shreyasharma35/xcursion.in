import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Destinations from './components/Destinations';
import ItineraryGenerator from './components/ItineraryGenerator';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Destinations />
          <ItineraryGenerator />
          <Services />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
