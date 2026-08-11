import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, MapPin, Calendar, Compass, Send, ChevronDown } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import './ItineraryGenerator.css';

const ComboBox = ({ label, icon: Icon, value, setValue, options, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="form-group" ref={dropdownRef} style={{ position: 'relative' }}>
      <label><Icon size={16} /> {label}</label>
      <div className="combobox-wrapper" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
        <input 
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          required
          style={{ width: '100%', paddingRight: '40px' }}
        />
        <button 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
          style={{ 
            position: 'absolute', right: '10px', background: 'transparent', 
            border: 'none', cursor: 'pointer', color: 'inherit',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 0
          }}
        >
          <ChevronDown size={20} />
        </button>
      </div>
      {isOpen && options && options.length > 0 && (
        <ul className="combobox-dropdown" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, 
          background: 'var(--glass-bg)', backdropFilter: 'blur(10px)',
          border: '1px solid var(--glass-border)', borderRadius: '8px',
          marginTop: '4px', padding: '0.5rem 0', zIndex: 10, listStyle: 'none',
          maxHeight: '200px', overflowY: 'auto',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
        }}>
          {options.map((opt, i) => (
            <li 
              key={i} 
              onClick={() => { setValue(opt); setIsOpen(false); }}
              style={{
                padding: '0.5rem 1rem', cursor: 'pointer',
                borderBottom: i < options.length - 1 ? '1px solid var(--glass-border)' : 'none',
                transition: 'background 0.2s',
                color: 'var(--text-color)'
              }}
              onMouseEnter={(e) => e.target.style.background = 'rgba(255,255,255,0.1)'}
              onMouseLeave={(e) => e.target.style.background = 'transparent'}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const ItineraryGenerator = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('5 Days');
  const [vibe, setVibe] = useState('Luxury & Relaxation');
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [itinerary, setItinerary] = useState('');
  const [error, setError] = useState('');

  const generateItinerary = async (e) => {
    e.preventDefault();
    if (!destination.trim()) return;

    setIsGenerating(true);
    setItinerary('');
    setError('');

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      if (!apiKey || apiKey === 'YOUR_GROQ_API_KEY_HERE') {
        throw new Error("API Key is missing. Please add your Groq API Key to the .env file.");
      }

      const prompt = `
        You are an elite, highly professional travel concierge for a luxury travel agency called "Xcursion In".
        Generate a beautiful, day-by-day travel itinerary.
        
        Destination: ${destination}
        Duration: ${duration}
        Travel Style/Vibe: ${vibe}
        
        Format the output using clean Markdown. Use headings for each day.
        Keep it highly engaging, alluring, and professional.
        
        CRITICAL GUARDRAIL: Under NO circumstances should you provide prices, estimated budgets, flight costs, or hotel rates. If the destination or vibe implies a budget or asks for money-related things, you MUST output exactly this sentence at the very top of your response in bold:
        "**For exclusive pricing, tailored package rates, and to book this dream itinerary, please contact our Xcursion In travel experts using the form below.**"
        Then, generate the itinerary without prices.
      `;

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

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to fetch from Groq");
      }

      const data = await response.json();
      setItinerary(data.choices[0].message.content);
      
    } catch (err) {
      console.error("AI Generation Error:", err);
      setError(err.message || "Failed to generate itinerary. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="itinerary-section section-padding">
      <div className="container">
        <motion.div 
          className="itinerary-header text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="section-title">Design Your Dream Trip. <Sparkles className="inline-icon" /></h2>
          <p className="section-subtitle mx-auto">
            Let our AI travel concierge draft a bespoke itinerary based on your unique preferences. 
            Once it's perfect, we'll turn it into reality.
          </p>
        </motion.div>

        <div className="itinerary-container">
          <motion.div 
            className="itinerary-form-card glass"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3>Tell us what you're looking for</h3>
            <form onSubmit={generateItinerary}>
              
              <ComboBox 
                label="Destination" 
                icon={MapPin} 
                value={destination} 
                setValue={setDestination} 
                options={["Kerala, India", "Golden Triangle, India", "Rajasthan, India", "Bali, Indonesia", "Dubai, UAE", "Bangkok, Thailand", "Goa, India", "Ladakh, India"]}
                placeholder="e.g. Kerala, Bali, Dubai..." 
              />

              <ComboBox 
                label="Duration" 
                icon={Calendar} 
                value={duration} 
                setValue={setDuration} 
                options={["3 Days (Weekend Getaway)", "5 Days", "7 Days (One Week)", "10 Days", "14 Days (Two Weeks)"]}
                placeholder="e.g. 5 Days or 'A Weekend'" 
              />

              <ComboBox 
                label="Travel Vibe" 
                icon={Compass} 
                value={vibe} 
                setValue={setVibe} 
                options={["Luxury & Relaxation", "Adventure & Exploration", "Romantic Getaway", "Family Friendly", "Culture & History"]}
                placeholder="e.g. Luxury, Adventure, or 'Foodie'" 
              />

              <button 
                type="submit" 
                className="btn-primary" 
                style={{width: '100%', marginTop: '1rem'}}
                disabled={isGenerating}
              >
                {isGenerating ? 'Designing your trip...' : 'Generate Magic'} <Sparkles size={16} style={{marginLeft: '8px'}} />
              </button>

              {error && <div className="error-message">{error}</div>}
            </form>
          </motion.div>

          <motion.div 
            className="itinerary-result"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {!itinerary && !isGenerating && (
              <div className="empty-state">
                <Compass size={48} className="empty-icon" />
                <p>Your bespoke itinerary will appear here.</p>
              </div>
            )}

            {isGenerating && (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Consulting our travel experts...</p>
              </div>
            )}

            {itinerary && !isGenerating && (
              <div className="result-content glass">
                <div className="markdown-body">
                  <ReactMarkdown>{itinerary}</ReactMarkdown>
                </div>
                
                <div className="result-actions">
                  <p>Love this plan? Let us make it happen.</p>
                  <a href="#contact" className="btn-secondary">
                    Get a Quote for this Trip <Send size={16} style={{marginLeft: '8px'}} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryGenerator;
