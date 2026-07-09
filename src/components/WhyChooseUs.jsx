import React from 'react';

export default function WhyChooseUs() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-maroon mb-2">Why Choose Us</h2>
        <p className="text-gray-600 mb-10">Built on Trust, Transparency & Service</p>
        <div className="grid md:grid-cols-4 gap-6">
          <div className="p-4">
            <div className="w-12 h-12 bg-saffron rounded-full mx-auto mb-4"></div>
            <h4 className="font-bold mb-2">Transparency & Accountability</h4>
            <p className="text-sm text-gray-600">हम संस्था के कार्यों, अभियानों एवं उपलब्ध संसाधनों के उपयोग में पारदर्शिता...</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-saffron rounded-full mx-auto mb-4"></div>
            <h4 className="font-bold mb-2">Registered & Verified Organization</h4>
            <p className="text-sm text-gray-600">Section 8 Company, 12A, 80G, CSR-1 एवं NGO Darpan...</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-saffron rounded-full mx-auto mb-4"></div>
            <h4 className="font-bold mb-2">Safe & Secure Contributions</h4>
            <p className="text-sm text-gray-600">सभी ऑनलाइन सहयोग राशि अधिकृत एवं सुरक्षित भुगतान माध्यमों...</p>
          </div>
          <div className="p-4">
            <div className="w-12 h-12 bg-saffron rounded-full mx-auto mb-4"></div>
            <h4 className="font-bold mb-2">Dedicated Team & Volunteers</h4>
            <p className="text-sm text-gray-600">संस्था की टीम, स्वयंसेवक एवं सहयोगी सदस्य सेवा...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
