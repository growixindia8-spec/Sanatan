import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import MediaTabs from '../components/media/MediaTabs';
import DonateButton from '../components/shared/DonateButton';

export default function Media() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-white py-12 md:py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Home Link */}
            <div className="mb-6">
              <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-saffron transition-colors text-sm font-semibold">
                <ArrowLeft size={16} />
                <span>Back to Home</span>
              </Link>
            </div>
            
            <div className="text-center">
              <span className="inline-block bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                🚩 MEDIA & MULTIMEDIA LIBRARY
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif text-charcoal mb-6">
                The Visual Soul of Sanatan Seva
              </h1>
              <p className="max-w-3xl mx-auto text-gray-600 text-lg leading-relaxed">
                A curated archive of photographs, films, sacred audio and press coverage — chronicling the Foundation's journey across temples, communities and causes.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <MediaTabs />
        </div>

        {/* Take Action Today Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <div className="bg-gradient-to-r from-saffron to-[#ff5500] rounded-3xl shadow-xl p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Take Action Today</h2>
            <p className="text-white/90 text-lg md:text-xl font-devanagari max-w-3xl mx-auto mb-10 leading-relaxed">
              आपका सहयोग किसी के जीवन में नई उम्मीद ला सकता है। सेवा, सहयोग एवं सहभागिता के माध्यम से समाज हित के अभियानों से जुड़ें और सकारात्मक परिवर्तन का हिस्सा बनें।
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <DonateButton className="bg-white text-saffron hover:bg-gray-50" />
              <button className="bg-charcoal text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 transition-all uppercase tracking-wider btn-animated">
                Join the Mission
              </button>
            </div>
          </div>
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
