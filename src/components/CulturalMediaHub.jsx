import React from 'react';

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
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {media.map((item, idx) => (
            <div key={idx} className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-saffron transition-colors">
              <div className="w-12 h-12 bg-gray-700 rounded-lg mx-auto mb-4"></div>
              <h3 className="font-bold mb-1">{item.type}</h3>
              <p className="text-sm text-gray-400 mb-4">{item.count}</p>
              <a href="#" className="text-saffron text-sm font-medium hover:text-white">Watch trailer &rarr;</a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
