import React from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function SupporterWall({ supporters }) {
  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  const getInitials = (name) => {
    if (!name) return 'A';
    if (name.toLowerCase() === 'anonymous') return 'A';
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="p-6 border-b border-gray-100 bg-gray-50 flex items-center justify-between">
        <h3 className="font-bold text-charcoal text-lg flex items-center gap-2">
          <Heart size={18} className="text-saffron fill-current" />
          Recent Supporters
        </h3>
        <span className="text-xs font-bold text-saffron bg-orange-100 px-3 py-1 rounded-full uppercase tracking-wider">
          Live Updates
        </span>
      </div>

      <div className="p-0">
        <ul className="divide-y divide-gray-50 max-h-[400px] overflow-y-auto">
          {supporters.map((supporter, idx) => (
            <motion.li 
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="p-4 sm:p-6 hover:bg-orange-50/30 transition-colors flex gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 text-saffron flex items-center justify-center font-bold flex-shrink-0">
                {getInitials(supporter.name)}
              </div>
              <div>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-charcoal">{supporter.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-400 font-medium">{supporter.time}</span>
                </div>
                <div className="inline-block bg-orange-100 text-saffron font-bold text-xs px-2 py-0.5 rounded mb-2">
                  Donated {formatCurrency(supporter.amount)}
                </div>
                {supporter.message && (
                  <p className="text-sm text-gray-600 italic font-devanagari border-l-2 border-orange-200 pl-3 py-0.5 mt-1">
                    "{supporter.message}"
                  </p>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
