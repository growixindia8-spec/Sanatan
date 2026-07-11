import React from 'react';
import { MessageSquare, Phone } from 'lucide-react';

export default function OtpDeliveryChoice({ delivery, setDelivery }) {
  return (
    <div className="space-y-3">
      <label className="block text-xs font-bold text-charcoal uppercase tracking-wider mb-2">
        OTP Delivery Method / ओटीपी भेजने का माध्यम
      </label>
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => setDelivery('whatsapp')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
            delivery === 'whatsapp'
              ? 'border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500/20'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
          }`}
        >
          <MessageSquare size={16} />
          <span>WhatsApp (Default)</span>
        </button>
        <button
          type="button"
          onClick={() => setDelivery('sms')}
          className={`flex items-center justify-center gap-2 p-3 rounded-xl border text-sm font-semibold transition-all ${
            delivery === 'sms'
              ? 'border-blue-500 bg-blue-50 text-blue-700 ring-2 ring-blue-500/20'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
          }`}
        >
          <Phone size={16} />
          <span>SMS</span>
        </button>
      </div>
    </div>
  );
}
