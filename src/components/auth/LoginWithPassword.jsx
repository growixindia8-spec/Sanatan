import React, { useState } from 'react';
import { Lock, Phone, Eye, EyeOff } from 'lucide-react';
import { usePortalAuth } from '../../context/PortalAuthContext';

export default function LoginWithPassword({ onLoginSuccess, onForgotPasswordClick }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState('');
  const { login } = usePortalAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const success = await login(mobile, password);
      if (success) {
        onLoginSuccess(mobile);
      } else {
        setError('गलत मोबाइल नंबर या पासवर्ड। / Invalid mobile number or password.');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="p-3 bg-red-50 text-red-600 border border-red-100 rounded-xl text-center text-xs font-semibold">
          {error}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold text-charcoal mb-2">Mobile Number</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Phone size={16} />
          </div>
          <input
            type="tel"
            value={mobile}
            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-medium text-sm"
            placeholder="10-digit number"
            maxLength={10}
            required
          />
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-xs font-bold text-charcoal">Password</label>
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-xs text-[#FF6600] font-bold hover:underline"
          >
            Forgot Password?
          </button>
        </div>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Lock size={16} />
          </div>
          <input
            type={showPass ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-11 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-medium text-sm"
            placeholder="Enter password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-charcoal"
          >
            {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-[#FF6600] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-colors shadow-md shadow-orange-500/20 active:scale-[0.98]"
      >
        Login
      </button>
    </form>
  );
}
