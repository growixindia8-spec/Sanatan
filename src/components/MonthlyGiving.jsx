import React from 'react';

export default function MonthlyGiving() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">Monthly Giving · Daily Support</h2>
        <p className="text-saffron font-bold text-lg mb-8">नियमित सेवा, स्थायी प्रभाव</p>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-cream p-8 rounded-2xl shadow border border-gray-100">
            <h3 className="text-2xl font-bold font-devanagari mb-2">सेवक</h3>
            <p className="text-3xl font-bold text-saffron mb-4">₹500<span className="text-sm text-gray-500 font-normal">/माह</span></p>
            <button className="w-full bg-charcoal text-white py-3 rounded-full font-bold mb-6 hover:bg-gray-800">नित्य दान प्रारंभ करें</button>
            <p className="text-sm text-gray-600 font-devanagari">आपका मासिक सहयोग जरूरतमंद लोगों तक सहायता पहुँचाने...</p>
          </div>
          
          <div className="bg-maroon text-white p-8 rounded-2xl shadow-2xl transform md:-translate-y-4 relative">
            <span className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gold text-charcoal px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Most chosen</span>
            <h3 className="text-2xl font-bold font-devanagari mb-2">धर्मवीर</h3>
            <p className="text-3xl font-bold text-gold mb-4">₹2,100<span className="text-sm text-gray-300 font-normal">/माह</span></p>
            <button className="w-full bg-gold text-charcoal py-3 rounded-full font-bold mb-6 hover:bg-yellow-500">नित्य दान प्रारंभ करें</button>
            <p className="text-sm text-gray-200 font-devanagari">गौ सेवा, सनातन संस्कृति संरक्षण, स्वास्थ्य सहायता...</p>
          </div>
          
          <div className="bg-cream p-8 rounded-2xl shadow border border-gray-100">
            <h3 className="text-2xl font-bold font-devanagari mb-2">सहयोगी</h3>
            <p className="text-3xl font-bold text-saffron mb-4">₹1,100<span className="text-sm text-gray-500 font-normal">/माह</span></p>
            <button className="w-full bg-charcoal text-white py-3 rounded-full font-bold mb-6 hover:bg-gray-800">नित्य दान प्रारंभ करें</button>
            <p className="text-sm text-gray-600 font-devanagari">आपका मासिक सहयोग अन्न सेवा, शिक्षा सहायता...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
