import React, { useState, useEffect } from 'react';
import { ShieldCheck, Phone, KeyRound, CheckCircle } from 'lucide-react';
import { api } from "../../lib/apiClient";

export default function OtpVerification({ 
  onSuccess, 
  title = "Secure Access", 
  subtitle = "Verify your mobile number to continue.",
  purpose = "register",
  deliveryMethod = "sms"
}) {
  const [step, setStep] = useState('mobile'); // 'mobile', 'otp', 'success'
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [serverTestOtp, setServerTestOtp] = useState("");

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

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');
    
    // Validate 10 digit Indian number
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Please enter a valid 10-digit Indian mobile number.');
      return;
    }

    setLoading(true);
    try {
      const res = await api.sendOtp(mobile, purpose, deliveryMethod);
      if (res.success) {
        setStep('otp');
        setTimer(30);
        setOtp('');
        if (res.testOtp) {
          setServerTestOtp(res.testOtp);
        } else {
          setServerTestOtp("");
        }
      } else {
        setError(res.message || 'Failed to send OTP.');
      }
    } catch (err) {
      setError(err.message || 'Error occurred while sending OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    if (otp.length !== 6) {
      setError('Please enter exactly 6-digit OTP.');
      return;
    }

    setLoading(true);
    try {
      const data = await api.verifyOtp(mobile, otp, purpose);
      if (data.success) {
        setStep('success');
        setTimeout(() => {
          onSuccess(mobile, data.tempToken);
        }, 1500);
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError(err.message || 'Verification failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (loading) return;
    setTimer(30);
    setError('');
    setLoading(true);
    try {
      const res = await api.sendOtp(mobile, purpose, deliveryMethod);
      if (res.testOtp) {
        setServerTestOtp(res.testOtp);
      } else {
        setServerTestOtp("");
      }
    } catch (err) {
      setError(err.message || 'Failed to resend OTP.');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'success') {
    return (
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden p-12 flex flex-col items-center justify-center min-h-[400px] animate-fadeIn">
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
          {step === 'mobile' ? subtitle : (
            import.meta.env.PROD 
              ? "OTP sent successfully by SMS." 
              : `Enter the OTP sent to +91 ${mobile}`
          )}
        </p>

        {!import.meta.env.PROD && serverTestOtp && step === 'otp' && (
          <div className="mb-6 bg-orange-50 border border-orange-200 text-orange-900 px-4 py-2.5 rounded-xl text-center text-sm font-bold font-mono">
            🔧 Test Mode OTP: {serverTestOtp}
          </div>
        )}

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
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6600] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send OTP"}
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
                  disabled={loading}
                />
              </div>
            </div>

            <div className="text-center text-sm">
              {timer > 0 ? (
                <span className="text-gray-500">Resend OTP in <span className="font-bold text-[#FF6600]">{timer}s</span></span>
              ) : (
                <button 
                  type="button" 
                  onClick={handleResend} 
                  disabled={loading}
                  className="text-[#FF6600] font-bold hover:underline disabled:opacity-50"
                >
                  Resend OTP
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF6600] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "Verifying..." : "Verify & Continue"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
