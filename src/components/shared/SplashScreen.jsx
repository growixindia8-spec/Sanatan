import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SplashScreen() {
  const [showSplash, setShowSplash] = useState(false);

  useEffect(() => {
    const hasSeenSplash = sessionStorage.getItem('hasSeenSplash');
    if (!hasSeenSplash) {
      setShowSplash(true);
      sessionStorage.setItem('hasSeenSplash', 'true');
    }
  }, []);

  return (
    <AnimatePresence>
      {showSplash && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-cream"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            onAnimationComplete={() => {
              setTimeout(() => setShowSplash(false), 1200);
            }}
            className="flex flex-col items-center justify-center"
          >
            {/* Custom Saffron Ribbon / Om Graphic Logo */}
            <svg width="160" height="160" viewBox="0 0 50 50" fill="none" className="mb-6 filter drop-shadow-xl">
              <circle cx="25" cy="25" r="22" fill="url(#saffronGradSplash)" />
              {/* Inner glowing circle */}
              <circle cx="25" cy="25" r="19" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
              {/* Devanagari Om path */}
              <path 
                d="M 23 15 
                   C 25 13, 29 13, 29 17 
                   C 29 20, 26 21, 24.5 21.5 
                   C 26.5 22, 31 23, 31 27.5 
                   C 31 32, 25.5 35.5, 20.5 33.5 
                   L 21.5 31 
                   C 25 32, 28.5 30, 28.5 27 
                   C 28.5 24.2, 25 24, 23 24 
                   L 21 24 
                   L 21 21.5 
                   L 23 21.5 
                   C 25 21.5, 26.5 20.5, 26.5 18 
                   C 26.5 15.5, 24.5 15.5, 23 16 
                   Z 
                   M 26 25 
                   C 31.5 27.5, 34 31, 35 34.5 
                   L 32.5 35 
                   C 31.5 32.5, 29.5 29.5, 25 27 
                   Z 
                   M 20.5 11 
                   C 22.5 10.5, 24.5 11.5, 24.5 13.5 
                   C 24.5 15.5, 22.5 16.5, 20.5 16 
                   C 18.5 15.5, 17.5 13.5, 17.5 11.5 
                   C 17.5 9.5, 18.5 8.5, 20.5 8.5 
                   L 20.5 11 
                   M 28.5 14 
                   C 33.5 15, 36.5 19, 36.5 24.5 
                   C 36.5 31.5, 29.5 38.5, 20.5 38.5 
                   C 14.5 38.5, 9.5 33.5, 9.5 27.5 
                   C 9.5 20.5, 15.5 14.5, 22.5 14.5 
                   C 24 14.5, 25.5 14.8, 27 15.2" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="saffronGradSplash" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF9933" />
                  <stop offset="100%" stopColor="#FF6A00" />
                </linearGradient>
              </defs>
            </svg>
            <div className="text-center overflow-hidden">
              <motion.div
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
              >
                <h1 className="font-bold text-4xl text-charcoal leading-tight uppercase tracking-widest font-devanagari">
                  Sanatan Dharm
                </h1>
                <h2 className="text-gray-500 font-medium text-lg mt-2 tracking-[0.2em] uppercase">
                  Manav Kalyan Foundation
                </h2>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
