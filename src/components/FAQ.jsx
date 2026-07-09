import React, { useState } from 'react';

export default function FAQ() {
  const [open, setOpen] = useState(0);
  const faqs = [
    { q: "संस्था का उद्देश्य क्या है?", a: "संस्था का गठन सनातन धर्म, सनातन संस्कृति एवं सनातन समाज के संरक्षण, संवर्धन एवं सहयोग के उद्देश्य से किया गया है।" },
    { q: "क्या संस्था विधिवत Registered एवं Verified है?", a: "जी हाँ। संस्था विधिवत Registered एवं Verified है। हमारी Registration एवं Certification से संबंधित जानकारी वेबसाइट पर उपलब्ध है।" },
    { q: "सदस्यता के लिए पात्रता क्या है?", a: "सबसे महत्वपूर्ण पात्रता सेवा भाव, सदाचार, सकारात्मक सोच एवं सनातन धर्म के प्रति सम्मान है।" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="text-saffron font-bold text-sm tracking-wider uppercase">FAQ</span>
          <h2 className="text-3xl font-bold font-devanagari text-maroon mt-2">Frequently Asked Questions</h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                className="w-full text-left px-6 py-4 font-bold text-charcoal bg-gray-50 hover:bg-gray-100 flex justify-between items-center font-devanagari"
                onClick={() => setOpen(open === idx ? -1 : idx)}
              >
                {faq.q}
                <span className="text-saffron font-bold text-xl">{open === idx ? '-' : '+'}</span>
              </button>
              {open === idx && (
                <div className="px-6 py-4 bg-white text-gray-700 font-devanagari text-sm">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
