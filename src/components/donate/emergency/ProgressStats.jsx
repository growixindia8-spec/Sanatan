import React from 'react';
import { Users, Clock, Target } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProgressStats({ raised, goal, donors, daysLeft }) {
  const percent = Math.min((raised / goal) * 100, 100);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sm:p-8 mb-8 relative overflow-hidden">
      {/* Decorative background pulse */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-orange-100 rounded-full blur-3xl opacity-50 pointer-events-none" />
      
      <div className="flex justify-between items-end mb-2 relative z-10">
        <div>
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Total Raised</p>
          <p className="text-3xl sm:text-4xl font-bold text-charcoal">{formatCurrency(raised)}</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-500 font-medium">Goal</p>
          <p className="text-sm font-bold text-gray-400">{formatCurrency(goal)}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-4 bg-gray-100 rounded-full overflow-hidden mb-6 relative z-10 shadow-inner">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-[#FF9933] to-[#FF6A00] rounded-full relative"
        >
          {/* Shine effect */}
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-white/20 w-full animate-[shimmer_2s_infinite]" style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)'
          }} />
        </motion.div>
      </div>

      <div className="grid grid-cols-3 gap-4 border-t border-gray-100 pt-6 relative z-10">
        <div className="text-center">
          <div className="w-10 h-10 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-saffron mb-2">
            <Users size={18} />
          </div>
          <p className="text-xl font-bold text-charcoal">{donors}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Supporters</p>
        </div>
        <div className="text-center border-l border-r border-gray-100">
          <div className="w-10 h-10 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-saffron mb-2">
            <Target size={18} />
          </div>
          <p className="text-xl font-bold text-charcoal">{Math.round(percent)}%</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Funded</p>
        </div>
        <div className="text-center">
          <div className="w-10 h-10 mx-auto bg-orange-50 rounded-full flex items-center justify-center text-saffron mb-2">
            <Clock size={18} />
          </div>
          <p className="text-xl font-bold text-charcoal">{daysLeft}</p>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Days Left</p>
        </div>
      </div>
    </div>
  );
}
