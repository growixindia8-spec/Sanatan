import React, { useState } from 'react';
import { Copy, CheckCircle } from 'lucide-react';

export default function DonationHub() {
  const [activeTab, setActiveTab] = useState('UPI / QR');
  const [activeQrSubTab, setActiveQrSubTab] = useState('Google Pay');
  const [copiedField, setCopiedField] = useState(null);

  const handleCopy = (text, fieldId) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  return (
    <section className="py-16 bg-cream border-b border-gray-50">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">Donation & Support Hub</h2>
        <p className="text-saffron font-bold text-lg mb-8">सहयोग के अनेक माध्यम, उद्देश्य एक</p>
        
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 mb-8 justify-center">
            {['UPI / QR', 'Bank Transfer', 'Other Ways'].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 px-6 sm:px-8 font-semibold text-sm sm:text-base transition-colors relative cursor-pointer ${
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
          
          {/* Tab Contents */}
          {activeTab === 'UPI / QR' && (
            <div className="space-y-6 animate-fade-in">
              {/* Sub Tabs */}
              <div className="flex space-x-2 justify-center mb-6">
                {['Google Pay', 'Indian Bank'].map((subTab) => (
                  <button
                    key={subTab}
                    type="button"
                    onClick={() => {
                      setActiveQrSubTab(subTab);
                      setCopiedField(null);
                    }}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                      activeQrSubTab === subTab
                        ? 'bg-orange-100 text-saffron border border-orange-200 shadow-sm'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 border border-transparent'
                    }`}
                  >
                    {subTab}
                  </button>
                ))}
              </div>

              <div className="flex flex-col md:flex-row items-center justify-center gap-12">
                <div className="w-56 h-72 bg-white border-4 border-saffron rounded-2xl p-2 relative shadow-md flex items-center justify-center overflow-hidden">
                  <img 
                    src={activeQrSubTab === 'Google Pay' ? '/qrs/google-pay-qr.png' : '/qrs/indian-bank-qr.png'} 
                    alt={`${activeQrSubTab} QR Code`} 
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-left space-y-4 w-full md:w-auto">
                  <div>
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">
                      {activeQrSubTab} UPI ID
                    </p>
                    <div className="flex gap-4 items-center bg-gray-50 px-4 py-3 rounded-xl border border-gray-100">
                      <p className="text-lg md:text-xl font-bold text-charcoal font-mono">
                        {activeQrSubTab === 'Google Pay' ? '9768000666-4@okbizaxis' : 'sanatandharmmanavkalyanfo@indianbk'}
                      </p>
                      <button 
                        type="button"
                        onClick={() => handleCopy(
                          activeQrSubTab === 'Google Pay' ? '9768000666-4@okbizaxis' : 'sanatandharmmanavkalyanfo@indianbk', 
                          'upi'
                        )}
                        className="text-saffron font-bold text-xs bg-orange-50 hover:bg-orange-100 px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedField === 'upi' ? (
                          <>
                            <CheckCircle size={14} className="text-green-600" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy size={14} />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-bold mb-2">Supported Payment Methods</p>
                    <div className="flex gap-3 text-xs text-gray-400 font-semibold items-center">
                      <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md">BHIM UPI</span>
                      <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md">Google Pay</span>
                      <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md">PhonePe</span>
                      <span className="px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-md">Paytm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'Bank Transfer' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left animate-fade-in">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm md:col-span-2">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Name</p>
                <p className="font-bold text-charcoal text-base md:text-lg">SANATAN DHARM MANAV KALYAN FOUNDATION</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
                  <p className="font-bold text-charcoal font-mono text-base md:text-lg">036888700000333</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy('036888700000333', 'accNum')}
                  className="p-2 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                  title="Copy Account Number"
                >
                  {copiedField === 'accNum' ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IFSC Code</p>
                  <p className="font-bold text-charcoal font-mono text-base md:text-lg">YESB0000368</p>
                </div>
                <button 
                  type="button"
                  onClick={() => handleCopy('YESB0000368', 'ifsc')}
                  className="p-2 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors cursor-pointer"
                  title="Copy IFSC Code"
                >
                  {copiedField === 'ifsc' ? (
                    <CheckCircle size={18} className="text-green-600" />
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank Name</p>
                <p className="font-bold text-charcoal">YES BANK LTD</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Type</p>
                <p className="font-bold text-charcoal">CURRENT</p>
              </div>
            </div>
          )}

          {activeTab === 'Other Ways' && (
            <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 text-left space-y-4 animate-fade-in font-devanagari">
              <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                यदि आप चेक (Cheque), डिमांड ड्राफ्ट (Demand Draft) या नकद (Cash) के माध्यम से ऑफलाइन सहयोग करना चाहते हैं, तो कृपया हमारे मुख्यालय से संपर्क करें या दिए गए हेल्पलाइन नंबर पर बात करें।
              </p>
              <div className="border-t border-gray-200/80 pt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs md:text-sm">
                <div>
                  <p className="text-gray-500 font-bold uppercase tracking-wider">Helpline Number / हेल्पलाइन नंबर</p>
                  <p className="font-bold text-charcoal text-base font-sans mt-0.5">+91 99999 99999</p>
                </div>
                <div>
                  <p className="text-gray-500 font-bold uppercase tracking-wider">Office Address / कार्यालय का पता</p>
                  <p className="font-bold text-charcoal mt-0.5">नई दिल्ली, भारत (New Delhi, India)</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
