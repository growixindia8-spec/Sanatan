import React from 'react';

export default function MembersNotice() {
  return (
    <section className="py-16 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-maroon text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 top-0 w-1/2 h-full bg-red-900 opacity-20 transform -skew-x-12"></div>
          <div className="relative z-10 max-w-2xl">
            <span className="bg-red-900 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">Members Only</span>
            <h2 className="text-3xl md:text-4xl font-bold font-devanagari mb-6">आधिकारिक सदस्य सूचना केंद्र</h2>
            <p className="text-gray-200 font-devanagari text-lg mb-8 leading-relaxed">
              संगठन की महत्वपूर्ण घोषणाएँ, अभियान निर्देश, बैठक सूचनाएँ, कार्यक्रम अपडेट एवं अन्य आवश्यक जानकारी केवल पंजीकृत सदस्यों के लिए उपलब्ध है।
            </p>
            <button className="bg-white text-maroon px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors shadow-lg">Login to Access</button>
          </div>
        </div>
      </div>
    </section>
  );
}
