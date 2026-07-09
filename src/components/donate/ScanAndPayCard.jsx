import React, { useState } from 'react';

export default function ScanAndPayCard() {
  const [activeTab, setActiveTab] = useState('QR Codes');
  const [activeQrTab, setActiveQrTab] = useState('Indian Bank');

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
      <h3 className="text-2xl font-bold text-charcoal mb-1">Scan & Pay</h3>
      <p className="text-gray-500 mb-6 text-sm">Use QR or bank transfer for instant payments.</p>

      {/* Main Tabs */}
      <div className="flex border-b border-gray-200 mb-6">
        {['QR Codes', 'Bank Transfer', 'Other Ways'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-3 px-4 font-semibold text-sm transition-colors relative ${
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
        <div>
          {/* Sub Tabs */}
          <div className="flex space-x-2 mb-6">
            {['Indian Bank', 'Google Pay'].map(subTab => (
              <button
                key={subTab}
                onClick={() => setActiveQrTab(subTab)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${
                  activeQrTab === subTab 
                    ? 'bg-orange-100 text-saffron border border-orange-200' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {subTab}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 p-6 rounded-xl border border-gray-200">
            {/* Placeholder QR */}
            <div className="w-48 h-48 bg-white border-4 border-white shadow-sm flex items-center justify-center rounded-lg mb-4">
               <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=sanatan@indianbank&pn=SanatanFoundation" alt="QR Code" className="w-full h-full object-contain opacity-80" />
            </div>
            <p className="font-bold text-charcoal">{activeQrTab}</p>
            <p className="text-sm text-gray-500">Scan with any UPI app</p>
          </div>
        </div>
      )}

      {activeTab === 'Bank Transfer' && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 space-y-4">
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Account Name</p>
             <p className="font-medium text-charcoal">Sanatan Dharm Manav Kalyan Foundation</p>
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Account Number</p>
             <p className="font-medium text-charcoal font-mono">12345678901234</p>
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">IFSC Code</p>
             <p className="font-medium text-charcoal font-mono">IDIB000S123</p>
           </div>
           <div>
             <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Bank</p>
             <p className="font-medium text-charcoal">Indian Bank</p>
           </div>
        </div>
      )}

      {activeTab === 'Other Ways' && (
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
           <p className="text-gray-600">Please contact us for cheque or draft payments.</p>
        </div>
      )}
    </div>
  );
}
