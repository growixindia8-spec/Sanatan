import React from 'react';
import { ShieldCheck, Search } from 'lucide-react';

export default function TrustVerificationPortal() {
  return (
    <section id="verification-portal" className="py-16 bg-[#FBF1E7]">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Dark navy-to-black gradient background card */}
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left Side Content */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={28} className="text-green-500" strokeWidth={2.5} />
              </div>
              <span className="text-saffron text-sm font-bold tracking-widest uppercase mb-3">
                TRUST & VERIFICATION PORTAL
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-white mb-6 leading-tight">
                विश्वास के साथ सत्यापन।<br/>भरोसे के साथ पुष्टि।
              </h2>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Volunteer IDs, member certificates, coordinator postings, donation receipts — every credential issued by us is checkable in real time.
              </p>
            </div>

            {/* Right Side Form Card */}
            <div className="p-10 md:p-14 bg-white/5 border-l border-white/10 backdrop-blur-sm flex flex-col justify-center">
              <form className="space-y-6">
                
                {/* Document Type */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                    Document Type
                  </label>
                  <div className="relative">
                    <select className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all appearance-none">
                      <option className="bg-slate-900 text-white">Volunteer ID</option>
                      <option className="bg-slate-900 text-white">Member Certificate</option>
                      <option className="bg-slate-900 text-white">Coordinator ID</option>
                      <option className="bg-slate-900 text-white">Donation Receipt</option>
                      <option className="bg-slate-900 text-white">Appointment Letter</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Credential Number */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                    Credential Number
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. SDV-2024-00128" 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all placeholder-gray-600" 
                  />
                </div>

                {/* Submit Button */}
                <button type="button" className="w-full flex items-center justify-center gap-2 bg-[#FF6600] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e65c00] transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/20 active:scale-95 mt-4">
                  <Search size={18} strokeWidth={2.5} />
                  Verify Now
                </button>

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
