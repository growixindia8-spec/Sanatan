import React from 'react';

export default function UtilityBar() {
  return (
    <div className="sticky top-[80px] z-40 bg-white py-3 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 equal-width buttons in a single row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
          <a
            href="#"
            className="bg-[#1B5FAE] text-white py-3.5 px-4 rounded-lg font-bold text-center text-xs md:text-sm uppercase tracking-wider hover:bg-blue-700 transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center"
          >
            Login / Register
          </a>
          <a
            href="#"
            className="bg-[#0F9D6B] text-white py-3.5 px-4 rounded-lg font-bold text-center text-xs md:text-sm uppercase tracking-wider hover:bg-emerald-700 transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center"
          >
            Start Fundraiser
          </a>
          <a
            href="#"
            className="bg-[#D6342E] text-white py-3.5 px-4 rounded-lg font-bold text-center text-xs md:text-sm uppercase tracking-wider hover:bg-red-700 transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center"
          >
            Need Help
          </a>
        </div>
      </div>
    </div>
  );
}
