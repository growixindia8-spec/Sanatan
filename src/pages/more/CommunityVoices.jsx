import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CommunityVoices() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
            Our Community
          </span>
          <h1 className="text-4xl font-bold text-charcoal mb-4">Community Voices</h1>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">Hear from our volunteers, donors, and beneficiaries about their experiences with Sanatan Dharm Manav Kalyan Foundation.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative">
                <span className="text-6xl text-orange-100 absolute top-4 left-4 font-serif leading-none">"</span>
                <p className="text-gray-600 relative z-10 font-medium italic mb-6 mt-4">
                  "This foundation has completely changed the way I look at social service. Being part of the Gau Seva mission gives me immense peace."
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-saffron text-white flex items-center justify-center font-bold">
                    A
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal text-sm">Aman Sharma</h4>
                    <p className="text-xs text-gray-500">Volunteer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
