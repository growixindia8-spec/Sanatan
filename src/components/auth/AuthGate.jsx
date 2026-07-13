import React, { useState } from 'react';
import { ShieldCheck } from 'lucide-react';
import OtpVerification from './OtpVerification';
import SetPasswordStep from './SetPasswordStep';
import LoginWithPassword from './LoginWithPassword';
import ForgotPassword from './ForgotPassword';
import { usePortalAuth } from '../../context/PortalAuthContext';

export default function AuthGate({ onSuccess, title = "Secure Access", subtitle = "Verify your account to continue.", fullName = "", email = "" }) {
  const [activeTab, setActiveTab] = useState('login'); // 'login', 'register'
  const [registerStep, setRegisterStep] = useState('mobile'); // 'mobile', 'password'
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  // Password Recovery Toggle
  const [showRecovery, setShowRecovery] = useState(false);

  const { registerUser } = usePortalAuth();

  const handleOtpVerified = (verifiedMobile) => {
    setMobile(verifiedMobile);
    setRegisterStep('password');
  };

  const handleSetPassword = async (password) => {
    setError('');
    const success = await registerUser(mobile, password, fullName, email);
    if (success) {
      // Success callback
      onSuccess(mobile);
    } else {
      setError('पंजीकरण विफल। कृपया पुनः प्रयास करें। / Registration failed. Please try again.');
    }
  };

  const handleLoginSuccess = (userMobile) => {
    onSuccess(userMobile);
  };

  const handleRecoverySuccess = (userMobile) => {
    setShowRecovery(false);
    setActiveTab('login');
    onSuccess(userMobile);
  };

  return (
    <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
      {/* Top Saffron/Red Gradient Accent */}
      <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-red-600"></div>

      <div className="p-8">
        {/* Header Icon & Details */}
        {!showRecovery && (
          <div className="flex flex-col items-center mb-6 text-center">
            <div className="w-12 h-12 bg-[#FF6600] rounded-2xl flex items-center justify-center mb-3 shadow-lg shadow-orange-500/30">
              <ShieldCheck size={24} className="text-white" />
            </div>
            <span className="text-[10px] font-bold text-[#FF6600] tracking-widest uppercase mb-0.5">
              Secure Access
            </span>
            <h2 className="text-xl font-bold font-serif text-charcoal">
              {title}
            </h2>
            <p className="text-gray-500 text-xs mt-1">
              {subtitle}
            </p>
          </div>
        )}

        {/* Forgot Password Flow */}
        {showRecovery ? (
          <ForgotPassword
            onBack={() => setShowRecovery(false)}
            onResetSuccess={handleRecoverySuccess}
          />
        ) : (
          <>
            {/* Login & Register Tabs */}
            {registerStep !== 'password' && (
              <div className="flex bg-gray-100 p-1 rounded-xl mb-6">
                <button
                  onClick={() => {
                    setActiveTab('login');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'login'
                      ? 'bg-white text-charcoal shadow-sm'
                      : 'text-gray-500 hover:text-charcoal'
                  }`}
                >
                  Login (Returning Member)
                </button>
                <button
                  onClick={() => {
                    setActiveTab('register');
                    setError('');
                  }}
                  className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
                    activeTab === 'register'
                      ? 'bg-white text-charcoal shadow-sm'
                      : 'text-gray-500 hover:text-charcoal'
                  }`}
                >
                  New Registration
                </button>
              </div>
            )}

            {error && (
              <div className="mb-5 p-3 bg-red-50 text-red-600 text-xs text-center rounded-xl border border-red-100 font-semibold">
                {error}
              </div>
            )}

            {/* TAB CONTENTS */}
            {activeTab === 'login' ? (
              <LoginWithPassword
                onLoginSuccess={handleLoginSuccess}
                onForgotPasswordClick={() => setShowRecovery(true)}
              />
            ) : (
              // REGISTER FLOW STEPS
              <div>
                {registerStep === 'mobile' && (
                  <OtpVerification purpose="register" onVerified={handleOtpVerified} />
                )}

                {registerStep === 'password' && (
                  <SetPasswordStep onSubmit={handleSetPassword} />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
