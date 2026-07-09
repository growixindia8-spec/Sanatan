import React from 'react';
import { ChevronDown } from 'lucide-react';

const missions = [
  {
    image: "https://images.unsplash.com/photo-1544027760-ec32dea4b4d7?q=80&w=600",
    title: "Active Missions",
    dotColor: "bg-green-500",
    textColor: "text-green-600",
    subtitle: "वर्तमान सेवा अभियान",
    description: "ये सत्यापित सेवा अभियान वर्तमान में सक्रिय हैं और लगातार सहयोग प्राप्त कर रहे हैं।"
  },
  {
    image: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600",
    title: "Waiting for Support",
    dotColor: "bg-orange-500",
    textColor: "text-orange-600",
    subtitle: "सहयोग की प्रतीक्षा में",
    description: "ये सत्यापित अभियान आवश्यक सहयोग की प्रतीक्षा में हैं। आपका सहयोग इन्हें आगे बढ़ाने में सहायक बनेगा।"
  },
  {
    image: "https://images.unsplash.com/photo-1516841273335-e39b37888115?q=80&w=600",
    title: "Completed Missions",
    dotColor: "bg-blue-500",
    textColor: "text-blue-600",
    subtitle: "सफलतापूर्वक पूर्ण अभियान",
    description: "आपके सहयोग से पूर्ण हुए अभियान एवं सेवा प्रयास — समाज में सकारात्मक परिवर्तन का प्रमाण। 🚩"
  }
];

export default function MissionStatusTabs() {
  return (
    <section className="py-20 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-charcoal">
            हमारे अभियान, <span className="text-[#FF6B00]">हमारी प्रगति</span>
          </h2>
          
          <span className="text-[11px] font-extrabold text-[#FF6B00] tracking-[0.2em] uppercase block mt-2.5 font-sans">
            ACTIVE, WAITING FOR SUPPORT & COMPLETED MISSIONS
          </span>
          
          <p className="text-gray-500 text-sm mt-2 font-sans">
            A live, paginated view of every initiative — active, awaiting support, or completed.
          </p>
        </div>

        {/* Grid Cards (3 in a row) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {missions.map((m, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-gray-100 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              {/* Card Image */}
              <div className="relative aspect-video w-full overflow-hidden">
                <img 
                  src={m.image} 
                  alt={m.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  
                  {/* Title Bar */}
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${m.dotColor}`} />
                      <span className={`font-bold text-[17px] ${m.textColor}`}>
                        {m.title}
                      </span>
                    </div>
                    <ChevronDown size={18} className="text-gray-400 group-hover:text-charcoal transition-colors" />
                  </div>

                  {/* Hindi Subtitle */}
                  <span className="text-xs font-bold text-gray-400 font-devanagari tracking-wide uppercase block mb-3">
                    {m.subtitle}
                  </span>

                  {/* Hindi Description */}
                  <p className="text-gray-600 font-devanagari text-[14px] leading-relaxed">
                    {m.description}
                  </p>

                </div>

                <div className="mt-6 border-t border-gray-50 pt-4 text-xs font-bold uppercase tracking-wider text-gray-400 group-hover:text-[#FF6B00] transition-colors flex items-center gap-1">
                  <span>Click to view</span>
                  <span>&rarr;</span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* Bottom View Reports Button */}
        <div className="text-center mt-12">
          <button className="bg-charcoal text-white px-8 py-3 rounded-full font-bold shadow-md hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 text-sm uppercase tracking-wider">
            View Reports
          </button>
        </div>

      </div>
    </section>
  );
}
