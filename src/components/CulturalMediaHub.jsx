import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Film, Clapperboard, Music, Radio } from 'lucide-react';

export default function CulturalMediaHub() {
  const media = [
    { type: "Films & Documentaries", count: "24 productions", icon: Film },
    { type: "Web Series", count: "6 ongoing seasons", icon: Clapperboard },
    { type: "Bhakti & Bhajan", count: "180+ tracks", icon: Music },
    { type: "Cultural Campaigns", count: "12 active initiatives", icon: Radio }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#1E1E1E] to-[#121212] text-white overflow-hidden relative">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
        
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight font-devanagari">
          Cultural Media Hub
        </h2>
        
        {/* Animated Subtitle */}
        <motion.div
          animate={{ 
            opacity: [0.5, 1, 0.5],
            scale: [0.98, 1, 0.98]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
          className="inline-block"
        >
          <p className="text-lg md:text-xl font-bold bg-gradient-to-r from-orange-400 via-saffron to-amber-300 bg-clip-text text-transparent mb-12 uppercase tracking-[0.25em] font-sans">
            🎬 Sanatan Stories. Streaming Soon. 🍿
          </p>
        </motion.div>
        
        {/* Animated Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {media.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={idx}
                whileHover={{ 
                  scale: 1.04, 
                  y: -6,
                  borderColor: '#FF6A00',
                  boxShadow: '0 10px 30px -10px rgba(255, 106, 0, 0.15)'
                }}
                transition={{ duration: 0.3 }}
                className="bg-neutral-900 border border-neutral-800 p-6 rounded-2xl cursor-pointer group"
              >
                <Link to="/media" className="block text-center">
                  <div className="w-14 h-14 bg-neutral-800 group-hover:bg-[#FF6A00]/10 rounded-2xl mx-auto mb-5 transition-colors flex items-center justify-center text-[#FF6A00]">
                    <IconComponent size={26} strokeWidth={1.8} />
                  </div>
                  <h3 className="font-extrabold text-base mb-1.5 text-neutral-100 group-hover:text-saffron transition-colors">
                    {item.type}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-5">{item.count}</p>
                  <span className="text-saffron text-xs font-bold uppercase tracking-wider group-hover:text-white transition-colors">
                    Watch trailer &rarr;
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Explore Button */}
        <div className="flex justify-center">
          <Link 
            to="/media"
            className="bg-[#FF6A00] text-white py-3.5 px-8 rounded-full font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-95 text-xs sm:text-sm"
          >
            Explore Media Hub &rarr;
          </Link>
        </div>

      </div>
    </section>
  );
}
