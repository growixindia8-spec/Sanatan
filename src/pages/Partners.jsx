import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import CsrPartnerships from '../components/CsrPartnerships';

export default function Partners() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-white py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              🚩 COLLABORATE WITH US
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-charcoal mb-4">
              Partners & Sponsors
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              Join hands with Sanatan Dharm Manav Kalyan Foundation to amplify social impact through corporate social responsibility and strategic sponsorships.
            </p>
          </div>
        </div>

        {/* CSR Partnerships Component */}
        <div className="py-8">
          <CsrPartnerships />
        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
