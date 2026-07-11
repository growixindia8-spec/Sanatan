import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, KeyRound, CheckCircle } from 'lucide-react';

export default function OtpVerification({ onSuccess, title = "Secure Access", subtitle = "Verify your mobile number to continue." }) {
  const [step, setStep] = useState('mobile'); // 'mobile', 'otp', 'success'
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);

  // Countdown timer effect
  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  const handleSendOtp = (e) => {
    e.preventDefault();
    setError('');
    
    // Validate 10 digit number
    if (!/^\d{10}$/.test(mobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Mock API call
    console.log(`Sending mock OTP to ${mobile}`);
    setStep('otp');
    setTimer(30);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setError('');

    // Mock verify (accepts 123456 or any 6 digit for dev)
    if (otp === '123456' || otp.length >= 4) {
      setStep('success');
      setTimeout(() => {
        onSuccess(mobile);
      }, 1500);
    } else {
      setError('Invalid OTP. Use 123456 for testing.');
    }
  };

  const handleResend = () => {
    setTimer(30);
    setError('');
    console.log(`Resending mock OTP to ${mobile}`);
  };

  if (step === 'success') {
    return (
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden p-12 flex flex-col items-center justify-center min-h-[400px]">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-6 animate-bounce">
          <CheckCircle size={40} strokeWidth={2.5} />
        </div>
        <h2 className="text-2xl font-bold text-charcoal mb-2">Mobile Verified!</h2>
        <p className="text-gray-500">Redirecting securely...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
      {/* Top Gradient Bar */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-red-500"></div>
      
      <div className="p-8">
        {/* Header */}
        <div className="flex flex-col items-center mb-6 text-center">
          <div className="w-14 h-14 bg-[#FF6600] rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/30">
            <ShieldCheck size={28} className="text-white" />
          </div>
          <span className="text-xs font-bold text-[#FF6600] tracking-widest uppercase mb-1">
            Secure Access
          </span>
          <h2 className="text-2xl font-bold font-serif text-charcoal">
            {title}
          </h2>
        </div>

        <p className="text-gray-500 text-sm text-center mb-8">
          {step === 'mobile' ? subtitle : `Enter the OTP sent to +91 ${mobile}`}
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm text-center rounded-lg border border-red-100">
            {error}
          </div>
        )}

        {step === 'mobile' ? (
          <form onSubmit={handleSendOtp} className="space-y-6">
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
                  onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-medium transition-shadow"
                  placeholder="98XXXXXXXX"
                  maxLength={10}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6600] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98]"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp} className="space-y-6">
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
                  className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-bold text-center tracking-widest text-lg transition-shadow"
                  placeholder="••••••"
                  maxLength={6}
                  required
                />
              </div>
            </div>

            <div className="text-center text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">Resend OTP in <span className="font-bold text-[#FF6600]">{timer}s</span></span>
              ) : (
                <button type="button" onClick={handleResend} className="text-[#FF6600] font-bold hover:underline">
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#FF6600] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98]"
            >
              Verify & Continue
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
