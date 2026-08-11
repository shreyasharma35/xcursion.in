import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Mail, MessageCircle, Phone, FileText } from 'lucide-react';
import './Chatbot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      sender: 'bot', 
      text: "Hey, I am Anushka! ✈️ Your personal AI Travel Concierge. Where are you dreaming of traveling next?" 
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleCallClick = (e) => {
    e.preventDefault();
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth < 768;
    
    if (isMobile) {
      window.location.href = "tel:+919818451355";
    } else {
      setMessages(prev => [...prev, { 
        sender: 'bot', 
        text: "You can reach our experts by calling us directly at **+91 9818451355**." 
      }]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GROQ_API_KEY;
      
      const systemPrompt = `You are Anushka, an elite AI travel concierge for Xcursion In. When a user asks about a destination, give a captivating, real-time insight about traveling there. Mention current weather vibe, a hidden gem tip, or a cultural note. Crucially, include a bolded statement on whether it is worth going there RIGHT NOW, presented in a stylish and confident tone. Keep it alluring and professional. Do NOT answer anything outside of providing these travel insights. If the user asks for bookings, pricing, customer service, or non-travel topics, you MUST reply EXACTLY with the phrase "CONTACT_SUPPORT" and nothing else.`;
      
      // Formatting previous conversation context
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'bot' ? 'assistant' : 'user',
        content: msg.text
      }));
      
      const response = await fetch("/api/groq/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            { role: "system", content: systemPrompt },
            ...chatHistory,
            { role: "user", content: userMessage }
          ],
          temperature: 0.7
        })
      });

      if (response.ok) {
        const data = await response.json();
        let aiReply = data.choices[0].message.content.trim();
        
        if (aiReply.includes("CONTACT_SUPPORT")) {
          setMessages(prev => [...prev, { sender: 'bot', isFallback: true }]);
        } else {
          setMessages(prev => [...prev, { sender: 'bot', text: aiReply }]);
        }
      } else {
        throw new Error("API response error");
      }
    } catch (e) {
      console.error("Chatbot Error:", e);
      setMessages(prev => [...prev, { sender: 'bot', text: "I'm having a little trouble connecting right now. Please try again in a moment!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chatbot-window"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
          >
            <div className="chatbot-header">
              <img src="/images/chatbot_icon.png" alt="Anushka" className="chatbot-header-avatar" />
              <div className="chatbot-header-info">
                <h3>Anushka</h3>
                <p>AI Travel Concierge</p>
              </div>
              <button className="chatbot-close-icon" onClick={() => setIsOpen(false)} style={{background: 'none', border: 'none', marginLeft: 'auto', cursor: 'pointer'}}>
                <X size={20} />
              </button>
            </div>
            
            <div className="chatbot-messages">
              {messages.map((msg, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`chat-message ${msg.sender}`}
                >
                  {msg.isFallback ? (
                    <div>
                      <p style={{margin: '0 0 10px 0'}}>I am an AI travel assistant. For bookings, pricing, or other inquiries, please reach out to our Xcursion In experts directly:</p>
                      <div className="contact-buttons-container">
                        <div className="contact-btn" style={{ cursor: 'text', userSelect: 'text' }} title="Select and copy">
                          <Mail size={18} color="#0ea5e9" style={{ flexShrink: 0 }} /> 
                          <span style={{ userSelect: 'all' }}>Xcursionin@gmail.com</span>
                        </div>
                        <a href="#contact" className="contact-btn" onClick={() => setIsOpen(false)}>
                          <FileText size={18} color="#8b5cf6" style={{ flexShrink: 0 }} /> Submit Enquiry
                        </a>
                        <a href="https://wa.me/919818451355" target="_blank" rel="noreferrer" className="contact-btn">
                          <MessageCircle size={18} color="#22c55e" style={{ flexShrink: 0 }} /> WhatsApp Us
                        </a>
                        <a href="tel:+919818451355" className="contact-btn" onClick={handleCallClick}>
                          <Phone size={18} color="#f59e0b" style={{ flexShrink: 0 }} /> Call Us
                        </a>
                      </div>
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>') }} />
                  )}
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chatbot-typing">
                  <span></span><span></span><span></span>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chatbot-input-area" onSubmit={handleSend}>
              <input 
                type="text" 
                placeholder="Ask about a destination..." 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button type="submit" disabled={!input.trim() || isLoading}>
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="chatbot-toggle-wrapper">
        <button className="chatbot-button" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X size={28} color="white" />
          ) : (
            <img src="/images/chatbot_icon.png" alt="Chat with Anushka" className="chatbot-icon-img" />
          )}
        </button>
        <AnimatePresence>
          {!isOpen && (
            <motion.div 
              className="chatbot-tooltip"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ delay: 1 }}
            >
              ✨ Ready for your next adventure? Ask Anushka!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Chatbot;
