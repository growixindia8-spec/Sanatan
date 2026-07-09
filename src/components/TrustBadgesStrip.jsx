import React from 'react';
import { ShieldCheck, Award, FileText, Landmark, FileCheck, CheckCircle } from 'lucide-react';

const badges = [
  {
    icon: Landmark,
    code: "Section 8",
    label: "Company Registered",
    color: "text-amber-600 bg-amber-50"
  },
  {
    icon: ShieldCheck,
    code: "12A",
    label: "Income Tax Exempt",
    color: "text-blue-600 bg-blue-50"
  },
  {
    icon: FileText,
    code: "80G",
    label: "50% Tax Deduction",
    color: "text-emerald-600 bg-emerald-50"
  },
  {
    icon: Award,
    code: "CSR-1",
    label: "MCA Certified",
    color: "text-purple-600 bg-purple-50"
  },
  {
    icon: FileCheck,
    code: "NGO Darpan",
    label: "Niti Aayog Listed",
    color: "text-indigo-600 bg-indigo-50"
  },
  {
    icon: CheckCircle,
    code: "ISO 9001:2015",
    label: "Certified Operations",
    color: "text-teal-600 bg-teal-50"
  }
];

export default function TrustBadgesStrip() {
  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-devanagari text-charcoal tracking-wide mb-2">
            वैधानिक पंजीकरण एवं प्रमाणपत्र
          </h2>
          <p className="text-xs font-extrabold text-[#2E7D32] tracking-[0.2em] uppercase font-sans">
            VERIFIED · TRANSPARENT · TRUSTED
          </p>
        </div>

        {/* 6 Cards in single row wrapping on mobile/tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center justify-center bg-white shadow-sm border border-gray-100 hover:border-saffron/20 hover:shadow-md transition-all duration-300 rounded-[12px] p-6 text-center group"
              >
                {/* Circular Badge Icon (~56px = w-14 h-14) */}
                <div className={`w-14 h-14 rounded-full flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110 ${badge.color}`}>
                  <Icon size={26} strokeWidth={2} />
                </div>
                
                {/* Text Section */}
                <span className="font-bold text-charcoal text-[15px] block mb-1">
                  {badge.code}
                </span>
                <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">
                  {badge.label}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
