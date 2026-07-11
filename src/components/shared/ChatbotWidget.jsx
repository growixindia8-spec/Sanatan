import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { sender: 'bot', text: '🙏 नमस्ते! मैं आपकी कैसे सहायता कर सकता हूँ?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    setInputValue('');

    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { sender: 'bot', text: 'धन्यवाद! हमारी टीम जल्द आपसे संपर्क करेगी।' }]);
    }, 1000);
  };

  const handleQuickReply = (suggestion) => {
    setMessages(prev => [...prev, { sender: 'user', text: suggestion }]);
    
    setTimeout(() => {
      if (suggestion === 'Donate Now') {
        setMessages(prev => [...prev, { sender: 'bot', text: 'मैं आपको Donation Page पर ले जा रहा हूँ...' }]);
        setTimeout(() => navigate('/donate'), 1500);
      } else if (suggestion === 'Become a Volunteer') {
        setMessages(prev => [...prev, { sender: 'bot', text: 'मैं आपको Volunteer Portal पर ले जा रहा हूँ...' }]);
        setTimeout(() => navigate('/join/volunteer'), 1500);
      } else if (suggestion === 'Contact Us') {
        setMessages(prev => [...prev, { sender: 'bot', text: 'मैं आपको Contact Page पर ले जा रहा हूँ...' }]);
        setTimeout(() => navigate('/contact'), 1500);
      }
    }, 1000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-4">
      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col mb-4 max-h-[80vh] sm:max-h-[600px]"
          >
            {/* Header */}
            <div className="bg-[#FF6600] text-white p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-1.5 rounded-full">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Sanatan Sahayak</h3>
                  <p className="text-[10px] text-orange-100 uppercase tracking-wider">Always here to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 p-1 rounded-full transition-colors focus:outline-none"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 flex-1 min-h-[250px] overflow-y-auto bg-gray-50 flex flex-col gap-4 no-scrollbar">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex items-start gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                  {msg.sender === 'bot' && (
                    <div className="w-8 h-8 rounded-full bg-[#FF6600] flex items-center justify-center flex-shrink-0">
                      <MessageCircle size={14} className="text-white" />
                    </div>
                  )}
                  <div className={`border p-3 shadow-sm max-w-[80%] ${msg.sender === 'user' ? 'bg-[#FF6600] text-white rounded-2xl rounded-tr-none border-[#FF6600]' : 'bg-white text-gray-700 font-devanagari rounded-2xl rounded-tl-none border-gray-200'}`}>
                    <p className="text-sm">{msg.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {['Donate Now', 'Become a Volunteer', 'Contact Us'].map((suggestion) => (
                    <button 
                      key={suggestion}
                      onClick={() => handleQuickReply(suggestion)}
                      className="text-xs bg-orange-50 border border-orange-200 text-[#FF6600] px-3 py-1.5 rounded-full font-medium hover:bg-[#FF6600] hover:text-white transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-3 border-t border-gray-100 bg-white flex items-center gap-2">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..." 
                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-[#FF6600] focus:ring-1 focus:ring-[#FF6600] transition-all"
              />
              <button onClick={handleSend} className="bg-[#FF6600] text-white p-2 rounded-full hover:bg-orange-600 transition-colors shadow-md focus:outline-none">
                <Send size={18} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-[#FF6600] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all btn-animated focus:outline-none z-[100]"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
