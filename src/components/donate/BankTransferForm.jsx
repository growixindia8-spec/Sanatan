import React from 'react';
import { Copy, CheckCircle2, Upload, AlertCircle } from 'lucide-react';

export default function BankTransferForm() {
  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard: ' + text);
  };

  return (
    <div className="animate-fade-in">
      {/* Account Details Box */}
      <div className="bg-orange-50/50 border border-orange-200 rounded-2xl p-6 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
          <span className="text-8xl">🏦</span>
        </div>
        
        <h3 className="text-xl font-bold text-charcoal mb-4 relative z-10 flex items-center gap-2">
          <span className="w-8 h-8 rounded-full bg-orange-100 text-saffron flex items-center justify-center text-sm">1</span>
          Trust Bank Account Details
        </h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 relative z-10">
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Name</p>
            <p className="font-bold text-charcoal">Sanatan Dharm Manav Kalyan Foundation</p>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Account Number</p>
              <p className="font-bold text-charcoal font-mono text-lg">99887766554433</p>
            </div>
            <button 
              onClick={() => handleCopy('99887766554433')}
              className="p-2 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors"
              title="Copy Account Number"
            >
              <Copy size={18} />
            </button>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center group">
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">IFSC Code</p>
              <p className="font-bold text-charcoal font-mono text-lg">SBIN0001234</p>
            </div>
            <button 
              onClick={() => handleCopy('SBIN0001234')}
              className="p-2 text-gray-400 hover:text-saffron hover:bg-orange-50 rounded-lg transition-colors"
              title="Copy IFSC Code"
            >
              <Copy size={18} />
            </button>
          </div>
          <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Bank & Branch</p>
            <p className="font-bold text-charcoal">State Bank of India, New Delhi</p>
          </div>
        </div>
      </div>

      <h3 className="text-xl font-bold text-charcoal mb-4 flex items-center gap-2">
        <span className="w-8 h-8 rounded-full bg-orange-100 text-saffron flex items-center justify-center text-sm">2</span>
        Submit Transfer Details
      </h3>
      <p className="text-sm text-gray-500 mb-6">After making the transfer, please submit your transaction details below for verification and receipt generation.</p>

      {/* Verification Form */}
      <div className="space-y-5 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Transaction ID (UTR) *</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors" placeholder="e.g. SBIN000123456789" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Date of Transfer *</label>
            <input type="date" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors text-gray-700" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Amount Transferred (₹) *</label>
            <input type="number" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors" placeholder="Amount in INR" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Your Full Name *</label>
            <input type="text" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors" placeholder="Full Name" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Email Address *</label>
            <input type="email" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors" placeholder="For Receipt & Updates" />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number *</label>
            <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors" placeholder="Phone Number" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-1">Donation Purpose / Project</label>
          <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:bg-white transition-colors text-charcoal font-medium">
            <option>सनातन संस्कृति एवं जनजागरण</option>
            <option>अन्न सेवा एवं भोजन सहायता</option>
            <option>चिकित्सा एवं स्वास्थ्य सहायता</option>
            <option>गौ सेवा एवं संरक्षण</option>
            <option>शिक्षा एवं संस्कार सहायता</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Upload Screenshot (Optional)</label>
          <div className="w-full p-6 bg-gray-50 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 hover:border-saffron transition-colors group">
            <Upload className="text-gray-400 group-hover:text-saffron mb-2 transition-colors" size={24} />
            <p className="text-sm text-gray-600 font-medium">Click to upload payment screenshot</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
          </div>
        </div>

        <div className="pt-2">
          <label className="flex items-start gap-3 cursor-pointer">
            <input type="checkbox" className="mt-1 w-4 h-4 text-saffron focus:ring-saffron rounded border-gray-300" />
            <div>
              <p className="font-bold text-charcoal">I Want To Claim 80G Tax Benefit</p>
              <p className="text-xs text-gray-500 mt-0.5">We will contact you for PAN details if required.</p>
            </div>
          </label>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 flex gap-3 items-start">
        <AlertCircle className="text-amber-500 mt-0.5 flex-shrink-0" size={18} />
        <p className="text-sm text-amber-800 font-devanagari">
          <strong>Note:</strong> मैन्युअल बैंक ट्रांसफर को वेरीफाई होने में 24-48 घंटे लग सकते हैं। वेरिफिकेशन के बाद रसीद आपके ईमेल पर भेज दी जाएगी।
        </p>
      </div>

      <button className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg shadow-orange-500/30 uppercase tracking-wider btn-animated">
        Submit Transfer Details
      </button>
    </div>
  );
}
