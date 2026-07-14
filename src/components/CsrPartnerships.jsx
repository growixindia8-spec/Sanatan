import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building2, Award, HeartHandshake, FileCheck2, ArrowRight } from 'lucide-react';

export default function CsrPartnerships() {
  const benefits = [
    {
      icon: Award,
      title: "80G Tax Exemption",
      desc: "All corporate contributions are eligible for 50% tax deduction benefits under Section 80G.",
      titleHi: "80G आयकर छूट"
    },
    {
      icon: HeartHandshake,
      title: "Direct Social Impact",
      desc: "Directly fund verified initiatives in rural education, medical support, gaushalas, and disaster relief.",
      titleHi: "प्रत्यक्ष सामाजिक प्रभाव"
    },
    {
      icon: FileCheck2,
      title: "100% Transparency",
      desc: "Receive audited financial records, completion certificates, and real-time field reports for every project.",
      titleHi: "पूर्ण पारदर्शिता"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#FF6A00]/10 border border-[#FF6A00]/20 px-4 py-1.5 rounded-full text-[#FF6A00] font-bold text-xs uppercase tracking-widest mb-4">
            <Building2 size={14} />
            <span>Corporate Social Responsibility</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold text-charcoal mb-4 font-devanagari tracking-tight">
            CSR & Partnerships
          </h2>
          
          <p className="text-saffron font-bold text-base md:text-lg font-devanagari mb-4">
            साझेदारी से सेवा, सहयोग से परिवर्तन
          </p>
          
          <p className="text-sm md:text-base text-gray-500 leading-relaxed font-devanagari max-w-2xl mx-auto">
            सनातन धर्म मानव कल्याण फाउंडेशन विभिन्न सामाजिक, शैक्षिक, स्वास्थ्य और सांस्कृतिक परियोजनाओं के लिए कॉरपोरेट सामाजिक उत्तरदायित्व (CSR) भागीदारी का स्वागत करता है।
          </p>
        </div>

        {/* Feature Box Card */}
        <div className="bg-[#1A1A1A] rounded-3xl shadow-2xl overflow-hidden relative border border-neutral-800 p-8 md:p-14 mb-16">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6A00]/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid lg:grid-cols-12 gap-12 items-center relative z-10">
            {/* Left Box */}
            <div className="lg:col-span-5 space-y-6 text-left">
              <span className="text-[10px] font-black text-[#E5AD23] tracking-widest uppercase block">
                COLLABORATE WITH US
              </span>
              
              <h3 className="text-3xl font-extrabold text-white leading-tight font-devanagari">
                Become a CSR Partner<br/>
                <span className="text-[#FF6A00] font-bold text-xl md:text-2xl mt-2 block font-devanagari">
                  एक सशक्त साझेदारी की ओर
                </span>
              </h3>
              
              <p className="text-[#E5DFDA] text-sm leading-relaxed font-devanagari">
                ग्रामीण शिक्षा से लेकर गौशाला विकास तक — अपनी CSR प्राथमिकताओं के अनुसार हमारी विभिन्न जनकल्याणकारी योजनाओं को प्रायोजित करें। हम पूर्ण अनुपालन रिपोर्ट और ऑडिट क्रेडेंशियल प्रदान करते हैं।
              </p>

              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/partners/csr"
                  className="bg-[#FF6A00] text-white py-3.5 px-8 rounded-xl font-bold hover:bg-orange-600 transition-all hover:scale-[1.02] shadow-md shadow-orange-500/20 active:scale-95 text-xs text-center flex items-center justify-center gap-2 tracking-wider uppercase font-sans cursor-pointer"
                >
                  <span>Partner With Us</span>
                  <ArrowRight size={14} />
                </Link>
                
                <button
                  type="button"
                  className="bg-transparent border border-neutral-700 text-neutral-300 py-3.5 px-8 rounded-xl font-bold hover:bg-neutral-800 hover:text-white transition-all text-xs text-center tracking-wider uppercase font-sans cursor-pointer"
                >
                  Download Profile
                </button>
              </div>
            </div>

            {/* Right Box (Benefits Grid) */}
            <div className="lg:col-span-7 grid sm:grid-cols-3 gap-6">
              {benefits.map((benefit, idx) => {
                const IconComp = benefit.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -5 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-5 text-left flex flex-col justify-between h-full"
                  >
                    <div>
                      <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-[#E5AD23] mb-4">
                        <IconComp size={20} />
                      </div>
                      <h4 className="text-white font-bold text-sm mb-1 leading-snug font-sans">
                        {benefit.title}
                      </h4>
                      <span className="text-yellow-500/80 font-bold text-[10px] tracking-wider font-devanagari block mb-3">
                        {benefit.titleHi}
                      </span>
                    </div>
                    <p className="text-neutral-400 text-[11px] leading-relaxed">
                      {benefit.desc}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Outreach Partners Title Strip */}
        <div className="text-center">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.25em] mb-8 font-sans">
            Our CSR Outreach Partners & Supports
          </p>
          
          <div className="flex flex-wrap gap-8 justify-center items-center opacity-40 grayscale">
            <div className="w-28 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-xs text-neutral-500 tracking-wider">CORP-01</div>
            <div className="w-28 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-xs text-neutral-500 tracking-wider">CORP-02</div>
            <div className="w-28 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-xs text-neutral-500 tracking-wider">CORP-03</div>
            <div className="w-28 h-10 bg-gray-200 rounded-lg flex items-center justify-center font-bold text-xs text-neutral-500 tracking-wider">CORP-04</div>
          </div>
        </div>

      </div>
    </section>
  );
}
