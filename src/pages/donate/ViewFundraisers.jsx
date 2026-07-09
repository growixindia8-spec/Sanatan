import React from 'react';
import { campaigns } from '../../data/fundraisers';
import FundraiserCard from '../../components/donate/FundraiserCard';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function ViewFundraisers() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10 text-center">
            <h1 className="text-4xl font-bold font-devanagari text-maroon mb-2">सत्यापित अभियान, असाधारण प्रभाव।</h1>
            <p className="text-gray-600 font-medium text-lg">All Fundraisers</p>
          </div>
          
          {/* Optional Filter/Search Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <div className="flex flex-wrap gap-2">
              {['All', 'Annadanam', 'Education', 'Healthcare', 'Dharma Seva', 'Gaushala', 'Vedic Education'].map(cat => (
                <button key={cat} className={`px-4 py-2 rounded-full text-sm font-semibold border ${cat === 'All' ? 'bg-saffron text-white border-saffron' : 'bg-white text-gray-700 border-gray-200 hover:border-saffron hover:text-saffron'} transition-colors`}>
                  {cat}
                </button>
              ))}
            </div>
            <div className="w-full md:w-64">
              <input 
                type="text" 
                placeholder="Search campaigns..." 
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {campaigns.map((camp, i) => (
              <FundraiserCard key={i} camp={camp} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="px-8 py-3 border-2 border-saffron text-saffron font-bold rounded-full hover:bg-saffron hover:text-white transition-colors uppercase tracking-wide">
              Load More
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
