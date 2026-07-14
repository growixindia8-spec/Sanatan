import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Compass } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* 404 Content */}
      <main className="flex-grow flex items-center justify-center bg-cream py-20 px-4">
        <div className="max-w-md w-full bg-white border border-gray-100 rounded-3xl shadow-xl p-8 md:p-10 text-center relative overflow-hidden">
          
          {/* Subtle background decoration */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF6B00]/5 rounded-bl-full pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#FF6B00]/5 rounded-tr-full pointer-events-none" />

          {/* Compass Icon */}
          <div className="w-20 h-20 bg-orange-50 text-saffron rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
            <Compass size={40} className="animate-spin-slow text-[#FF6A00]" />
          </div>

          {/* Heading */}
          <h1 className="text-6xl font-bold font-sans text-charcoal mb-2">404</h1>
          <h2 className="text-2xl font-bold font-devanagari text-maroon mb-4">
            पृष्ठ नहीं मिला
          </h2>
          <p className="text-sm text-gray-500 font-devanagari mb-8 leading-relaxed">
            क्षमा करें, जिस पृष्ठ को आप खोजने का प्रयास कर रहे हैं वह मौजूद नहीं है या हटा दिया गया है।<br/>
            <span className="font-sans text-xs">The page you are looking for does not exist or has been moved.</span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Link 
              to="/" 
              className="w-full bg-[#FF6A00] text-white py-3.5 rounded-xl font-bold text-center hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-95 transform duration-200"
            >
              मुख्य पृष्ठ पर जाएं / Go to Home
            </Link>
            <Link 
              to="/contact-us" 
              className="w-full bg-gray-50 border border-gray-200 text-charcoal py-3.5 rounded-xl font-bold text-center hover:bg-gray-100 transition-colors active:scale-95 transform duration-200"
            >
              हमसे संपर्क करें / Contact Us
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
