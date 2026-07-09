import React, { useState } from 'react';
import { ShieldCheck, Phone } from 'lucide-react';

export default function LoginGateCard({ onSendOtp }) {
  const [mobile, setMobile] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(mobile.length >= 10) onSendOtp(mobile);
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-red-500"></div>
      
      <div className="p-8">
        {/* Header Row */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-14 h-14 bg-[#FF6A00] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <span className="text-xs font-bold text-[#FF6A00] tracking-widest uppercase mb-1">
            Secure Access
          </span>
          <h2 className="text-2xl font-bold font-serif text-charcoal">
            Start Fundraiser Login
          </h2>
        </div>

        <p className="text-gray-500 text-sm text-center mb-8">
          Verify your mobile to access the secure Fundraising Request workspace.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-charcoal mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-400" />
              </div>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent text-charcoal font-medium transition-shadow"
                placeholder="98XXXXXXXX"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6A00] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98]"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}
