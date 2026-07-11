import React from 'react';
import { Eye, ShieldCheck, Lock, Users } from 'lucide-react';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Eye,
      title: "Transparency & Accountability",
      desc: "हम संस्था के कार्यों, अभियानों एवं उपलब्ध संसाधनों के उपयोग में पूर्ण पारदर्शिता सुनिश्चित करते हैं।"
    },
    {
      icon: ShieldCheck,
      title: "Registered & Verified Organization",
      desc: "Section 8 Company, 12A, 80G, CSR-1 एवं NGO Darpan में पंजीकृत संस्था।"
    },
    {
      icon: Lock,
      title: "Safe & Secure Contributions",
      desc: "सभी ऑनलाइन सहयोग राशि अधिकृत एवं सुरक्षित भुगतान माध्यमों द्वारा ही स्वीकार की जाती है।"
    },
    {
      icon: Users,
      title: "Dedicated Team & Volunteers",
      desc: "संस्था की टीम, स्वयंसेवक एवं सहयोगी सदस्य सेवा भाव और निष्ठा के साथ कार्यरत हैं।"
    }
  ];

  return (
    <section className="py-16 bg-[#FBF1E7]">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-black mb-2">Why Choose Us</h2>
        <p className="text-saffron font-bold uppercase tracking-widest text-sm mb-12">BUILT ON TRUST, TRANSPARENCY & SERVICE</p>
        <div className="grid md:grid-cols-4 gap-6">
          {cards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div key={idx} className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 bg-saffron rounded-full mx-auto mb-6 flex items-center justify-center text-white">
                  <Icon size={24} strokeWidth={2} />
                </div>
                <h4 className="font-bold text-black font-devanagari text-lg mb-3 leading-snug">{card.title}</h4>
                <p className="text-sm text-gray-700 font-devanagari leading-relaxed">{card.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
