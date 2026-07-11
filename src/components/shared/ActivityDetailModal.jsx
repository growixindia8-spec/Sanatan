import React from 'react';
import { X, Share2, Heart, HelpCircle } from 'lucide-react';

export default function ActivityDetailModal({ isOpen, onClose, activity }) {
  if (!isOpen || !activity) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Container */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col transform transition-all no-scrollbar">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md text-white hover:bg-white hover:text-charcoal transition-all shadow-sm"
        >
          <X size={20} strokeWidth={2.5} />
        </button>

        {/* Hero Section */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-gray-900">
          <img 
            src={`https://placehold.co/800x400/800000/ffffff?text=${encodeURIComponent(activity.title)}`}
            alt={activity.title}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
          
          <div className="absolute bottom-0 left-0 p-6 w-full">
            <span className="inline-block px-3 py-1 bg-saffron text-white text-[10px] font-bold tracking-wider uppercase rounded-sm mb-3">
              CURRENT ACTIVITY
            </span>
            <h2 className="text-3xl sm:text-4xl font-devanagari font-bold text-white mb-2 leading-tight">
              {activity.title}
            </h2>
            <p className="text-gray-300 font-devanagari italic sm:text-lg">
              "{activity.quote}"
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          <div className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-6 border-b border-gray-100 pb-4">
            {activity.tags}
          </div>

          <div className="space-y-4 text-gray-600 font-devanagari leading-relaxed text-[15px]">
            {activity.paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="mt-8 pt-6 border-t border-gray-100 flex flex-wrap gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 bg-saffron hover:bg-[#e65c00] text-white py-3 px-4 rounded-xl font-bold transition-colors">
              <Heart size={18} /> Donate Now
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 py-3 px-4 rounded-xl font-bold transition-colors">
              <HelpCircle size={18} /> Need Help
            </button>
            <button className="flex-none flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 text-green-700 border border-green-200 py-3 px-4 rounded-xl font-bold transition-colors">
              <Share2 size={18} /> Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
