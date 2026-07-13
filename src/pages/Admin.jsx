import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Lock, Phone, Eye, EyeOff, ShieldAlert, Loader } from 'lucide-react';
import { usePortalAuth } from '../context/PortalAuthContext';

export default function Admin() {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  const { login } = usePortalAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    setLoading(true);

    try {
      const success = await login(mobile, password);
      if (success) {
        setSuccessMsg('Successfully logged in! Redirecting to workspace...');
        // Redirect to portal workspace after brief delay
        setTimeout(() => {
          window.location.href = import.meta.env.VITE_PORTAL_URL || 'http://localhost:5174';
        }, 1500);
      } else {
        setError('अमान्य लॉगिन क्रेडेंशियल। / Invalid admin credentials.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
          {/* Saffron/Orange Accent bar */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 to-red-600"></div>
          
          <div className="p-8">
            {/* Header / Logo Icon */}
            <div className="flex flex-col items-center mb-8 text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-orange-500/10">
                <Lock size={32} className="text-[#FF6600]" />
              </div>
              <span className="text-[10px] font-extrabold text-[#FF6600] tracking-widest uppercase mb-1">
                Security Gateway
              </span>
              <h2 className="text-2xl font-bold font-serif text-charcoal">
                Admin Panel Login
              </h2>
              <p className="text-gray-500 text-xs mt-1">
                Authorized regional coordinators and system administrators only.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 text-xs font-semibold rounded-xl border border-red-100 flex items-center gap-2">
                <ShieldAlert size={16} className="shrink-0 text-red-500" />
                <span>{error}</span>
              </div>
            )}

            {/* Success Message */}
            {successMsg && (
              <div className="mb-6 p-4 bg-green-50 text-green-700 text-xs font-semibold rounded-xl border border-green-100 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping"></div>
                <span>{successMsg}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Registered Mobile</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Phone size={16} />
                  </div>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-medium text-sm transition-all"
                    placeholder="10-digit mobile number"
                    maxLength={10}
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Access Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                    <Lock size={16} />
                  </div>
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-11 pr-10 py-3.5 bg-white border border-gray-250 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-medium text-sm transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-charcoal transition-colors"
                  >
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#FF6A00] text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-[0.98] flex items-center justify-center gap-2 text-sm uppercase tracking-wider disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader size={18} className="animate-spin" />
                    <span>Verifying Credentials...</span>
                  </>
                ) : (
                  <span>Access Workspace</span>
                )}
              </button>
            </form>
          </div>
          
          <div className="bg-gray-50/50 p-4 border-t border-gray-100 text-center text-[10px] text-gray-400 font-bold uppercase tracking-wider">
            Sanatan Dharm Foundation
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
