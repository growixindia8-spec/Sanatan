import React from 'react';

export default function Newsletter() {
  return (
    <section className="py-16 bg-cream border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">सेवा, संस्कार और समाज से जुड़े रहने के लिए</h2>
        <p className="text-gray-600 font-devanagari mb-8">🚩 सनातन पर्व, सेवा अभियान, विशेष कार्यक्रमों एवं महत्वपूर्ण अपडेट्स की जानकारी प्राप्त करने के लिए Subscribe करें।</p>
        
        <form className="flex flex-col sm:flex-row justify-center max-w-xl mx-auto gap-4">
          <input type="email" placeholder="Your Email Address" className="flex-1 rounded-full px-6 py-3 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-saffron bg-white" />
          <button type="submit" className="bg-saffron text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 shadow-lg">Subscribe Now</button>
        </form>
      </div>
    </section>
  );
}
