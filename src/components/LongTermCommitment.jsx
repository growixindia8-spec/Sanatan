import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LongTermCommitment() {
  return (
    <section className="py-16 bg-white border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Full-width rounded box with thin orange border and light cream/white bg */}
        <div className="w-full bg-[#FFFBF7] border border-[#FF6B00]/40 rounded-3xl p-10 md:p-14 text-center shadow-sm relative overflow-hidden group">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B00]/5 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FF6B00]/5 rounded-tr-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

          {/* Heading */}
          <h3 className="text-[#FF6B00] font-bold text-lg font-devanagari mb-1">
            हमारा दीर्घकालिक संकल्प
          </h3>
          
          {/* Subheading */}
          <span className="text-[11px] font-bold text-gray-400 tracking-[0.2em] uppercase block mb-8 font-sans">
            OUR LONG-TERM COMMITMENT
          </span>

          {/* Quote */}
          <blockquote className="text-xl md:text-3xl font-devanagari font-medium italic text-charcoal leading-relaxed max-w-4xl mx-auto mb-8">
            "सेवा, सहायता, संस्कार, सुरक्षा एवं आत्मनिर्भरता के माध्यम से एक सशक्त, जागरूक, संगठित एवं आत्मनिर्भर समाज का निर्माण करना हमारा लक्ष्य है।"
          </blockquote>

          {/* Link */}
          <div className="flex justify-center">
            <Link 
              to="/about" 
              className="text-[#FF6B00] hover:text-orange-600 transition-colors font-bold text-sm flex items-center gap-1.5 hover:scale-105 transform duration-300"
            >
              <span>Know More</span>
              <ChevronDown size={16} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}

