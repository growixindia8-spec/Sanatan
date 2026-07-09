import React from 'react';
import { campaigns } from '../data/fundraisers';
import FundraiserCard from './donate/FundraiserCard';

export default function ActiveFundraisers() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">सत्यापित अभियान, असाधारण प्रभाव</h2>
            <p className="text-gray-600 font-medium">Active Fundraisers</p>
          </div>
          <a href="/donate/view-fundraisers" className="text-saffron font-bold hover:underline hidden md:block">View All Fundraisers &rarr;</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {campaigns.slice(0, 3).map((camp, i) => (
            <FundraiserCard key={i} camp={camp} />
          ))}
        </div>
        <div className="mt-8 text-center md:hidden">
          <a href="/donate/view-fundraisers" className="text-saffron font-bold hover:underline">View All Fundraisers &rarr;</a>
        </div>
      </div>
    </section>
  );
}
