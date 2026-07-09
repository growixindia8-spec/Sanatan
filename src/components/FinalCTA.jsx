import React from 'react';

export default function FinalCTA() {
  return (
    <section className="py-16 bg-saffron text-white text-center">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-4">Take Action Today</h2>
        <p className="text-lg font-devanagari mb-8">सेवा, सहयोग एवं सहभागिता के माध्यम से समाज हित के अभियानों से जुड़ें और सकारात्मक परिवर्तन का हिस्सा बनें।</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className="bg-white text-saffron px-8 py-3 rounded-full font-bold hover:bg-gray-100 shadow-lg">Donate Now</button>
          <button className="bg-maroon text-white px-8 py-3 rounded-full font-bold hover:bg-red-900 shadow-lg border border-maroon">Join the Mission</button>
        </div>
      </div>
    </section>
  );
}
