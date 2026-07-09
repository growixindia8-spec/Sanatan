import React from 'react';
import { mediaCoverage } from '../../data/mediaCoverage';
import { ExternalLink } from 'lucide-react';

export default function MediaCoverageGrid() {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">✦ MEDIA COVERAGE</span>
        <h2 className="text-3xl font-bold font-serif text-charcoal">In The Press</h2>
        <p className="text-gray-600 font-medium mt-2 max-w-2xl mx-auto">News articles and press mentions covering the Foundation's work.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {mediaCoverage.map((item) => (
          <div key={item.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-gray-100 flex flex-col group h-full">
            <div className="h-12 mb-6 flex items-center">
              <img src={item.logo} alt={item.publication} className="h-full max-w-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all" />
            </div>
            <span className="text-xs text-gray-400 font-mono mb-2">{item.date}</span>
            <h3 className="font-bold text-charcoal text-lg mb-4 line-clamp-3 group-hover:text-saffron transition-colors flex-grow">
              {item.headline}
            </h3>
            <a href={item.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-saffron hover:text-orange-600 mt-auto">
              Read More <ExternalLink size={14} className="ml-1" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
