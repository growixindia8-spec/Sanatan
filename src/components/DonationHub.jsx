import React from 'react';

export default function DonationHub() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">Donation & Support Hub</h2>
        <p className="text-saffron font-bold text-lg mb-8">सहयोग के अनेक माध्यम, उद्देश्य एक</p>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <button className="bg-charcoal text-white px-8 py-2 rounded-full font-bold">UPI / QR</button>
            <button className="bg-gray-100 text-gray-600 px-8 py-2 rounded-full font-bold hover:bg-gray-200">Bank Transfer</button>
            <button className="bg-gray-100 text-gray-600 px-8 py-2 rounded-full font-bold hover:bg-gray-200">Other Ways</button>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-12">
            <div className="w-48 h-48 bg-gray-200 border-4 border-saffron rounded-xl p-2 relative">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500 font-bold">QR Code</div>
            </div>
            <div className="text-left space-y-4">
              <div>
                <p className="text-sm text-gray-500 font-bold">UPI ID</p>
                <div className="flex gap-4 items-center">
                  <p className="text-xl font-bold text-charcoal">sanatandharm@upi</p>
                  <button className="text-saffron font-bold text-sm bg-orange-50 px-3 py-1 rounded">Copy</button>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 font-bold mb-2">Supported Payment Methods</p>
                <div className="flex gap-4">
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
