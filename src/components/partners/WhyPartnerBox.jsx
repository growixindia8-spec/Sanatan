import React from 'react';
import { Check } from 'lucide-react';

export default function WhyPartnerBox() {
  const points = [
    "Registered Section 8 Organization",
    "CSR Registered Organization",
    "12A & 80G Eligible",
    "NGO Darpan Registered",
    "Transparent Reporting System",
    "Dedicated Project Monitoring",
    "Impact-Based Implementation",
    "Regular Activity & Utilization Updates"
  ];

  return (
    <div className="bg-orange-50/50 rounded-2xl p-6 md:p-8 border border-orange-100 flex flex-col space-y-6">
      <div className="flex items-center space-x-3">
        <h3 className="text-lg font-bold text-charcoal">Why Partner With Us?</h3>
      </div>
      
      <ul className="space-y-3.5 flex-grow">
        {points.map((pt, index) => (
          <li key={index} className="flex items-start gap-2.5 text-sm text-gray-700 font-semibold">
            <span className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <Check size={12} strokeWidth={3} />
            </span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>

      <div className="pt-5 border-t border-orange-100/80">
        <h4 className="text-xs font-bold text-[#FF6A00] uppercase tracking-wider mb-2">Important Note</h4>
        <p className="text-xs text-gray-600 leading-relaxed font-devanagari">
          CSR सहयोग एवं परियोजनाओं का अंतिम स्वरूप दोनों पक्षों की पारस्परिक सहमति, उपलब्ध संसाधनों, वैधानिक आवश्यकताओं एवं संस्था की नीति के अनुसार निर्धारित किया जाएगा।
        </p>
      </div>
    </div>
  );
}
