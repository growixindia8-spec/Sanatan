import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function UtilityBar() {
  const navigate = useNavigate();
  const PORTAL_URL =
    import.meta.env.VITE_PORTAL_URL?.replace(/\/$/, "") ||
    "http://localhost:5174";

  return (
    <div className="sticky top-[80px] z-40 bg-white py-3 border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 3 equal-width buttons in a single row */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 w-full">
          <button
            type="button"
            aria-label="Login or Register to Member Portal"
            onClick={() => window.location.assign(`${PORTAL_URL}/portal?view=login`)}
            className="bg-[#1B5FAE] text-white py-3.5 px-4 rounded-lg font-bold text-center text-xs md:text-sm uppercase tracking-wider hover:bg-blue-700 transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
          >
            Login / Register
          </button>
          <button
            type="button"
            aria-label="Start a Fundraiser"
            onClick={() => navigate("/donate/start-fundraiser")}
            className="bg-[#0F9D6B] text-white py-3.5 px-4 rounded-lg font-bold text-center text-xs md:text-sm uppercase tracking-wider hover:bg-emerald-700 transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
          >
            Start Fundraiser
          </button>
          <button
            type="button"
            aria-label="Need Help, contact us"
            onClick={() => navigate("/contact-us")}
            className="bg-[#D6342E] text-white py-3.5 px-4 rounded-lg font-bold text-center text-xs md:text-sm uppercase tracking-wider hover:bg-red-700 transition-all duration-300 shadow-sm active:scale-95 flex items-center justify-center cursor-pointer"
          >
            Need Help
          </button>
        </div>
      </div>
    </div>
  );
}

