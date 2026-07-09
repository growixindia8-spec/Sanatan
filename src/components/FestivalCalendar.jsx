import React from 'react';

export default function FestivalCalendar() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-maroon mb-2">Festival & Seva Calendar</h2>
          <p className="text-gray-600">Upcoming Campaigns</p>
        </div>
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-5xl mx-auto">
          {/* Calendar Placeholder */}
          <div className="mb-8 text-center">
            <h3 className="text-2xl font-bold mb-4">July 2026</h3>
            <div className="grid grid-cols-7 gap-2 mb-4 text-sm font-bold text-gray-500">
              <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
            </div>
            <div className="grid grid-cols-7 gap-2 text-center">
              {/* Dummy days */}
              {Array.from({length: 31}).map((_, i) => (
                <div key={i} className={`p-4 rounded-lg border ${i === 11 || i === 16 ? 'border-saffron bg-orange-50 text-saffron font-bold cursor-pointer' : 'border-transparent text-gray-700'}`}>
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="bg-orange-100 text-saffron text-xs font-bold px-2 py-1 rounded uppercase">Festival</span>
              <h4 className="text-xl font-bold text-maroon mt-2 mb-1">Guru Purnima Annadanam</h4>
              <p className="text-sm text-gray-600">Join us in feeding 5,000 devotees in Haridwar.</p>
            </div>
            <div className="flex gap-4">
              <button className="bg-saffron text-white px-6 py-2 rounded-full font-bold">Donate Now</button>
              <button className="bg-white border border-gray-300 px-6 py-2 rounded-full font-bold">Share</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
