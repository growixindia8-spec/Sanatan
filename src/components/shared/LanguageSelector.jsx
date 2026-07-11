import React, { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { languages } from '../../data/languages';
import { useTranslation } from '../../i18n/LanguageContext';

const LanguageSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { i18n } = useTranslation();
  const dropdownRef = useRef(null);
  const [toastMessage, setToastMessage] = useState(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLangClick = (lang) => {
    if (lang === 'हिंदी' || lang === 'English') {
      i18n.changeLanguage(lang);
      setIsOpen(false);
    } else {
      setToastMessage(`यह भाषा (${lang}) जल्द उपलब्ध होगी। / ${lang} language will be available soon.`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3000);
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 text-gray-500 hover:text-saffron transition-colors font-medium text-sm focus:outline-none"
      >
        <Globe size={16} />
        <span>{i18n.language}</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-12 w-[340px] md:w-[480px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-[60]"
          >
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-charcoal tracking-wide">👉 Choose Your Language | भाषा चुनें</h3>
            </div>
            
            <div className="p-6 max-h-[60vh] overflow-y-auto">
              <div className="flex flex-wrap gap-2.5">
                {languages.map((lang) => {
                  const isActive = i18n.language === lang || (lang !== 'हिंदी' && lang !== 'English' && false);
                  return (
                    <button
                      key={lang}
                      onClick={() => handleLangClick(lang)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                        i18n.language === lang 
                          ? 'bg-saffron text-white shadow-md shadow-orange-500/20 ring-2 ring-saffron ring-offset-1' 
                          : 'bg-white border border-gray-200 text-gray-600 hover:border-saffron hover:text-saffron'
                      }`}
                    >
                      {lang}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-orange-50 px-6 py-4 border-t border-orange-100">
              <p className="text-xs text-saffron text-center italic leading-relaxed font-medium">
                🚩ॐ "हर गली, हर गाँव, हर शहर, अपने देश से लेकर पूरे विश्व तक सनातन धर्म का संरक्षण, संवर्धन, प्रचार-प्रसार और विस्तार करना ही हमारा संकल्प और लक्ष्य है।" ॐ🚩
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-[#1a202c] text-white border border-gray-700 px-6 py-4 rounded-2xl shadow-2xl z-[100] max-w-sm flex flex-col gap-1 font-sans"
          >
            <div className="flex items-center gap-2 text-saffron font-bold text-sm">
              <span>🚩</span>
              <span>Notice / सूचना</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-devanagari mt-1">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;
