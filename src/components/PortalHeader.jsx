import React from 'react';
import logo from '../assets/logo-sanatan.jpg';
import LanguageSelector from './shared/LanguageSelector';
import { ArrowLeft } from 'lucide-react';

export default function PortalHeader() {
  const mainWebsiteUrl = import.meta.env.VITE_MAIN_WEBSITE_URL || 'http://localhost:5173';

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <a href={mainWebsiteUrl} className="flex items-center flex-shrink-0 hover:opacity-90 transition-opacity py-1">
            <img
              src={logo}
              alt="Sanatan Dharm Manav Kalyan Foundation Logo"
              className="h-10 md:h-12 w-auto max-w-[160px] md:max-w-[200px] object-contain filter drop-shadow-sm"
            />
          </a>

          {/* Title Area */}
          <div className="hidden md:flex flex-col text-center">
            <h1 className="text-sm font-black text-charcoal tracking-widest uppercase">
              Member & Coordinator Portal
            </h1>
            <p className="text-[10px] text-saffron font-bold uppercase tracking-wider font-devanagari">
              सदस्य एवं समन्वयक पोर्टल
            </p>
          </div>

          {/* Right Controls */}
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            
            <a
              href={mainWebsiteUrl}
              className="flex items-center gap-1 text-xs font-bold text-gray-500 hover:text-charcoal border border-gray-200 hover:border-gray-300 px-3 py-2 rounded-xl transition-all"
            >
              <ArrowLeft size={14} />
              <span>Main Website</span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
}
