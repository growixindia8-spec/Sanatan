import React, { useState } from 'react';
import { ShieldCheck, KeyRound } from 'lucide-react';
import { api } from "../../lib/apiClient";

export default function OtpVerifyCard({ mobile, purpose = "donation", onVerify }) {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    if (!mobile) {
      setError('Mobile number is missing.');
      return;
    }

    if (otp.length !== 6) {
      setError('Please enter exactly 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.verifyOtp(mobile, otp, purpose);
      if (data.success) {
        onVerify(otp, data.tempToken);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
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
            Enter OTP
          </h2>
        </div>

        <p className="text-gray-500 text-sm text-center mb-8">
          Enter the one-time password sent to +91 {mobile || 'your phone'}.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm text-center rounded-lg border border-red-100 font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-charcoal mb-2 text-center">
              One-Time Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <KeyRound size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6A00] focus:border-transparent text-charcoal font-bold text-center tracking-widest text-lg transition-shadow"
                placeholder="••••••"
                maxLength={6}
                required
                disabled={loading}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF6A00] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Verify & Continue"}
          </button>
        </form>
      </div>
    </div>
  );
}
