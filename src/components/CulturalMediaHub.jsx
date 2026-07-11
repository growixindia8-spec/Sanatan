import React from 'react';
import { Link } from 'react-router-dom';

export default function CulturalMediaHub() {
  const media = [
    { type: "Films & Documentaries", count: "24 productions" },
    { type: "Web Series", count: "6 ongoing seasons" },
    { type: "Bhakti & Bhajan", count: "180+ tracks" },
    { type: "Cultural Campaigns", count: "12 active initiatives" }
  ];

  return (
    <section className="py-16 bg-charcoal text-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-2">Cultural Media Hub</h2>
        <p className="text-gray-400 mb-10">Sanatan Stories. Streaming Soon.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {media.map((item, idx) => (
            <Link 
              key={idx} 
              to="/media" 
              className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-saffron hover:scale-[1.02] transition-all block cursor-pointer group"
            >
              <div className="w-12 h-12 bg-gray-700 group-hover:bg-saffron rounded-lg mx-auto mb-4 transition-colors flex items-center justify-center text-white text-lg font-bold">
                🚩
              </div>
              <h3 className="font-bold mb-1 group-hover:text-saffron transition-colors">{item.type}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.count}</p>
              <span className="text-saffron text-sm font-medium group-hover:text-white transition-colors">Watch trailer &rarr;</span>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Link 
            to="/media"
            className="bg-saffron text-white py-3.5 px-8 rounded-full font-bold uppercase tracking-wider hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-95"
          >
            Explore Media Hub &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}
