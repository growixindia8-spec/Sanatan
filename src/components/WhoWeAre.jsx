import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WhoWeAre() {
  const circles = [
    { label: "Values", translation: "संस्कार", pos: "top-4 left-1/2 -translate-x-1/2" },
    { label: "Culture", translation: "संस्कृति", pos: "top-1/4 right-4" },
    { label: "Support", translation: "सहयोग", pos: "bottom-1/4 right-4" },
    { label: "Service", translation: "सेवा", pos: "bottom-4 left-1/2 -translate-x-1/2" },
    { label: "Dedication", translation: "समर्पण", pos: "bottom-1/4 left-4" },
    { label: "Empowerment", translation: "सशक्तिकरण", pos: "top-1/4 left-4" }
  ];

  return (
    <section className="py-20 bg-[#FBF1E7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left Column - Graphic Poster */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <div className="w-full max-w-[480px] aspect-[4/5] bg-[#5E0C09] rounded-2xl p-6 relative flex flex-col justify-between border-4 border-double border-[#FF6B00] shadow-xl overflow-hidden group">

              {/* Decorative Border Line */}
              <div className="absolute inset-2 border border-yellow-500/30 rounded-xl pointer-events-none" />

              {/* Title inside poster */}
              <div className="text-center z-10 pt-2">
                <span className="text-yellow-400 font-bold uppercase tracking-widest text-[11px]">FOUNDATION PILLARS</span>
                <h4 className="text-white text-xl font-bold font-devanagari tracking-wide mt-1">सेवा व संस्कृति अभियान</h4>
              </div>

              {/* Central Emblem & 6 Satellites Layout */}
              <div className="relative w-full h-[280px] flex items-center justify-center my-4 z-10">
                {/* Connecting ring */}
                <div className="absolute w-[200px] h-[200px] rounded-full border border-yellow-500/20 animate-[spin_40s_linear_infinite]" />

                {/* Central Emblem */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-yellow-500 via-amber-400 to-yellow-600 flex flex-col items-center justify-center shadow-lg border-2 border-white/40 z-20">
                  <svg width="40" height="40" viewBox="0 0 50 50" fill="none" className="filter drop-shadow-md">
                    <path
                      d="M 25 15 
                         C 27 13, 31 13, 31 17 
                         C 31 20, 28 21, 26.5 21.5 
                         C 28.5 22, 33 23, 33 27.5 
                         C 33 32, 27.5 35.5, 22.5 33.5 
                         L 23.5 31 
                         C 27 32, 30.5 30, 30.5 27 
                         C 30.5 24.2, 27 24, 25 24 
                         L 23 24 
                         L 23 21.5 
                         L 25 21.5 
                         C 27 21.5, 28.5 20.5, 28.5 18 
                         C 28.5 15.5, 26.5 15.5, 25 16 
                         Z 
                         M 28 25 
                         C 33.5 27.5, 36 31, 37 34.5 
                         L 34.5 35 
                         C 33.5 32.5, 31.5 29.5, 27 27 
                         Z 
                         M 22.5 11 
                         C 24.5 10.5, 26.5 11.5, 26.5 13.5 
                         C 26.5 15.5, 24.5 16.5, 22.5 16 
                         C 20.5 15.5, 19.5 13.5, 19.5 11.5 
                         C 19.5 9.5, 20.5 8.5, 22.5 8.5 
                         L 22.5 11 
                         M 30.5 14 
                         C 35.5 15, 38.5 19, 38.5 24.5 
                         C 38.5 31.5, 31.5 38.5, 22.5 38.5 
                         C 16.5 38.5, 11.5 33.5, 11.5 27.5 
                         C 11.5 20.5, 17.5 14.5, 24.5 14.5 
                         C 26 14.5, 27.5 14.8, 29 15.2"
                      stroke="#5E0C09"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="text-[10px] font-bold text-[#5E0C09] tracking-wider uppercase mt-1">SANATAN</span>
                </div>

                {/* 6 Satellites */}
                {circles.map((item, idx) => (
                  <div
                    key={idx}
                    className={`absolute ${item.pos} bg-white/95 backdrop-blur-sm shadow-md border border-[#FF6B00]/40 rounded-full px-3 py-1.5 flex flex-col items-center justify-center z-20 group-hover:scale-105 transition-transform duration-300 min-w-[76px]`}
                  >
                    <span className="text-[8px] font-bold text-gray-400 uppercase tracking-wide leading-none">{item.label}</span>
                    <span className="text-[10px] font-bold font-devanagari text-charcoal tracking-wide leading-none mt-0.5">{item.translation}</span>
                  </div>
                ))}
              </div>

              {/* Shloka at Bottom */}
              <div className="bg-[#410604] border-t border-yellow-500/20 py-3 px-4 rounded-lg -mx-2 text-center shadow-inner z-10">
                <p className="text-white text-xs md:text-sm font-devanagari font-semibold leading-relaxed tracking-wide italic">
                  "अयं निजः परो वेति गणना लघुचेतसाम् ।<br />
                  उदारचरितानां तु वसुधैव कुटुम्बकम् ॥"
                </p>
              </div>

              {/* Overlapping Badge: Verified Trust (overlaps bottom-right) */}
              <div className="absolute bottom-4 -right-1 z-30 bg-white shadow-lg border border-green-500/30 pl-3 pr-4 py-1.5 rounded-l-full flex items-center gap-1.5 transform hover:translate-x-1 transition-transform">
                <div className="w-5 h-5 rounded-full bg-[#2E7D32] flex items-center justify-center text-white">
                  <Check size={12} strokeWidth={3} />
                </div>
                <span className="text-[10px] font-extrabold text-[#2E7D32] tracking-wider uppercase">VERIFIED TRUST</span>
              </div>

            </div>
          </div>

          {/* Right Column - Text Info */}
          <div className="w-full lg:w-1/2">
            <h3 className="text-charcoal font-bold text-3xl md:text-4xl tracking-wide mb-1 font-sans">
              Who We Are
            </h3>
            <h4 className="text-[#FF6B00] text-sm uppercase tracking-widest font-semibold font-devanagari mb-6">
              हमारा परिचय
            </h4>

            <div className="space-y-5 text-gray-700 font-devanagari leading-relaxed text-[15px] md:text-base">
              <p>
                Sanatan Dharm Manav Kalyan Foundation एक Registered Section 8 Non-Profit Organization है, जो मानव सेवा, सामाजिक कल्याण, सनातन संस्कृति संरक्षण एवं जनजागरण के उद्देश्य से कार्यरत है।
              </p>
              <p>
                हमारा संकल्प है कि कोई भूखा न रहे, कोई जरूरतमंद सहायता से वंचित न रहे, महिलाएँ सुरक्षित एवं सम्मानित रहें तथा शिक्षा, स्वास्थ्य, गौ सेवा, पर्यावरण संरक्षण एवं आपदा राहत जैसे क्षेत्रों में समाज को वास्तविक सहयोग प्रदान किया जा सके।
              </p>
              <p>
                संस्था सेवा, संस्कार, सुरक्षा और सामाजिक उत्तरदायित्व के मूल्यों के साथ कार्य करते हुए एक जागरूक, सशक्त एवं सहयोगी समाज के निर्माण के लिए प्रतिबद्ध है। प्राप्त प्रत्येक सहयोग का उपयोग पारदर्शिता एवं जिम्मेदारी के साथ जनकल्याण एवं मानव सेवा के कार्यों में किया जाता है।
              </p>
              <div className="border-l-4 border-[#FF6A00] pl-4 py-2 bg-[#FF6A00]/5 my-6 rounded-r-xl">
                <p className="text-[#FF6A00] font-devanagari font-bold text-lg md:text-xl">
                  🚩 सेवा • सुरक्षा • संस्कार • धर्म — मानव कल्याण हमारा कर्म
                </p>
              </div>

              <div className="pt-2">
                <Link to="/about" className="inline-block bg-white border-2 border-[#FF6A00] text-[#FF6A00] hover:bg-[#FF6A00] hover:text-white font-bold py-2.5 px-6 rounded-xl transition-colors btn-animated text-sm uppercase tracking-wider">
                  Read More
                </Link>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

