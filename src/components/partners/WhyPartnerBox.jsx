import React from 'react';
import { CheckCircle2 } from 'lucide-react';

const WhyPartnerBox = () => {
  return (
    <div className="bg-[#f0f4ff] rounded-2xl p-6 md:p-8 border border-blue-100 h-full flex flex-col">
      <div className="flex items-center space-x-3 mb-6">
        <div className="bg-white p-2 rounded-full shadow-sm">
          <CheckCircle2 className="w-6 h-6 text-saffron" />
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-charcoal">Why Partner With Us?</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-6 flex-grow">
        {/* Left Column */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Section 8 registered • 12A / 80G / CSR-1 certified</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Pan-India project footprint</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Quarterly impact dashboards</span>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Transparent fund utilization reports</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Dedicated CSR relationship manager</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle2 className="w-5 h-5 text-saffron mt-0.5 flex-shrink-0" />
            <span className="text-gray-700 font-medium">Co-branded campaign opportunities</span>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-blue-200">
        <p className="text-xs text-gray-500 leading-relaxed text-justify">
          All CSR engagements are coordinated through mutual resource alignment and executed as per CSR Rules, 2014. Partner logos may be displayed on official communication only with prior written consent. Foundation reserves the right to approve partnerships in alignment with its objectives.
        </p>
      </div>
    </div>
  );
};

export default WhyPartnerBox;
