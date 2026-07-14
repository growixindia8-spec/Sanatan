import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

export default function ScanAndPayCard() {
  const [activeTab, setActiveTab] = useState('QR Codes');
  const [activeQrTab, setActiveQrTab] = useState('Google Pay');
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const getUpiId = () => {
    return activeQrTab === 'Google Pay' ? '9768000666-4@okbizaxis' : 'sanatandharmmanavkalyanfo@indianbk';
  };

  const getQrImage = () => {
    return activeQrTab === 'Google Pay' ? '/qrs/google-pay-qr.png' : '/qrs/indian-bank-qr.png';
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-charcoal mb-1">Scan & Pay</h3>
      <p className="text-gray-500 mb-6 text-sm font-devanagari">तत्काल सहायता के लिए QR कोड स्कैन करें या सीधे बैंक ट्रांसफर करें।</p>

      {/* Main Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['QR Codes', 'Bank Transfer', 'Other Ways'].map(tab => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative cursor-pointer ${
              activeTab === tab ? 'text-saffron' : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-saffron rounded-t-full"></span>
            )}
          </button>
        ))}
      </div>

      {activeTab === 'QR Codes' && (
        <div className="space-y-6">
          {/* Sub Tabs */}
          <div className="flex space-x-2">
            {['Google Pay', 'Indian Bank'].map(subTab => (
              <button
                key={subTab}
                type="button"
                onClick={() => {
                  setActiveQrTab(subTab);
                  setCopiedField(null);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  activeQrTab === subTab 
                    ? 'bg-orange-100 text-saffron border border-orange-200 shadow-sm' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subTab}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-2xl border border-gray-200">
            {/* Real QR code image */}
            <div className="w-52 h-64 bg-white border-4 border-white shadow-sm flex items-center justify-center rounded-xl mb-4 overflow-hidden">
               <img 
                 src={getQrImage()} 
                 alt={`${activeQrTab} QR Code`} 
                 className="w-full h-full object-contain" 
               />
            </div>
            
            <div className="w-full text-center space-y-2">
              <p className="text-xs text-gray-500 font-bold uppercase tracking-wider">{activeQrTab} UPI ID</p>
              <div className="flex gap-2 items-center justify-center">
                <span className="font-bold text-charcoal font-mono text-sm">{getUpiId()}</span>
                <button
                  type="button"
                  onClick={() => handleCopy(getUpiId(), 'upi')}
                  className="p-1.5 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                  title="Copy UPI ID"
                >
                  {copiedField === 'upi' ? (
                    <CheckCircle size={16} className="text-green-600" />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>
              </div>
              <p className="text-[11px] text-gray-400 font-semibold font-devanagari">किन्हीं भी UPI ऐप्स (GPay, PhonePe, Paytm) से स्कैन करके भुगतान करें।</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Bank Transfer' && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4 text-left">
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Account Name</p>
             <p className="font-bold text-charcoal">SANATAN DHARM MANAV KALYAN FOUNDATION</p>
           </div>
           <div className="flex justify-between items-center">
             <div>
               <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Account Number</p>
               <p className="font-bold text-charcoal font-mono">036888700000333</p>
             </div>
             <button 
               type="button"
               onClick={() => handleCopy('036888700000333', 'accNum')}
               className="p-1.5 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
             >
               {copiedField === 'accNum' ? (
                 <CheckCircle size={18} className="text-green-600" />
               ) : (
                 <Copy size={18} />
               )}
             </button>
           </div>
           <div className="flex justify-between items-center">
             <div>
               <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">IFSC Code</p>
               <p className="font-bold text-charcoal font-mono">YESB0000368</p>
             </div>
             <button 
               type="button"
               onClick={() => handleCopy('YESB0000368', 'ifsc')}
               className="p-1.5 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
             >
               {copiedField === 'ifsc' ? (
                 <CheckCircle size={18} className="text-green-600" />
               ) : (
                 <Copy size={18} />
               )}
             </button>
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Bank Name</p>
             <p className="font-bold text-charcoal">YES BANK LTD</p>
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Account Type</p>
             <p className="font-bold text-charcoal">CURRENT</p>
           </div>
        </div>
      )}

      {activeTab === 'Other Ways' && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center font-devanagari">
           <p className="text-gray-600 text-sm leading-relaxed">
             चेक, डिमांड ड्राफ्ट या नकद सहायता के लिए कृपया हमारे हेल्पलाइन नंबर या कार्यालय पते पर संपर्क करें।
           </p>
        </div>
      )}
    </div>
  );
}
