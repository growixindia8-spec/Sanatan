import React, { useState } from 'react';
import { Lock, ArrowLeft } from 'lucide-react';
import OtpVerification from './OtpVerification';

export default function ForgotPassword({ onBack, onResetSuccess }) {
  const [step, setStep] = useState('verify'); // 'verify', 'reset'
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleOtpVerified = (verifiedMobile) => {
    setError('');
    let savedUsers = {};
    try {
      savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    } catch (err) {
      savedUsers = {};
    }
    
    if (!savedUsers[verifiedMobile]) {
      setError('यह मोबाइल नंबर पंजीकृत नहीं है। / This mobile number is not registered.');
      return;
    }

    setMobile(verifiedMobile);
    setStep('reset');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setError('');

    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    let savedUsers = {};
    try {
      savedUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
    } catch (err) {
      savedUsers = {};
    }
    savedUsers[mobile] = password;
    localStorage.setItem('registeredUsers', JSON.stringify(savedUsers));

    onResetSuccess(mobile);
  };

  return (
    <div className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-center text-xs font-semibold">
          {error}
        </div>
      )}

      {step === 'verify' ? (
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1 text-gray-500 hover:text-charcoal text-xs font-bold transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            <span>Back to Login</span>
          </button>
          <div className="text-center mb-6">
            <h3 className="text-lg font-bold text-charcoal">Reset Password</h3>
            <p className="text-xs text-gray-500 mt-1">ओटीपी द्वारा पासवर्ड रिसेट करें</p>
          </div>
          <OtpVerification onVerified={handleOtpVerified} />
        </div>
      ) : (
        <form onSubmit={handleResetPassword} className="space-y-4">
          <div className="text-center mb-2">
            <h3 className="text-lg font-bold text-charcoal">Set New Password</h3>
            <p className="text-xs text-gray-500 mt-1">नया पासवर्ड दर्ज करें</p>
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal mb-2">New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-sm text-charcoal"
              placeholder="Min 6 characters"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-charcoal mb-2">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] text-sm text-charcoal"
              placeholder="Confirm password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#FF6600] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20"
          >
            Reset Password & Login
          </button>
        </form>
      )}
    </div>
  );
}
