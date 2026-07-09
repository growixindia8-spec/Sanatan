import React, { useState } from 'react';

export default function AmountSelector({ contributionType }) {
  const [selectedAmount, setSelectedAmount] = useState(501);
  const [customAmount, setCustomAmount] = useState('');

  const amounts = [
    { value: 51, label: 'शुभ' },
    { value: 101, label: 'मंगल' },
    { value: 301, label: 'शुभारंभ' },
    { value: 501, label: 'एक परिवार का सहारा', badge: 'Most Chosen' },
    { value: 1001, label: 'शिक्षा सहयोग' },
    { value: 5001, label: 'विशेष सहायता' },
    { value: 11000, label: 'बड़ी मदद' },
    { value: 21000, label: 'महत्वपूर्ण योगदान' },
    { value: 51000, label: 'सम्मानित सहयोगी', badge: 'VIP Supporter' },
    { value: 100001, label: 'गर्व और वित्तीय सम्मान का योगदान', badge: 'VVIP Contributor' }
  ];

  const handleSelect = (val) => {
    setSelectedAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const currentAmount = customAmount ? customAmount : selectedAmount;

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-3">
        <label className="font-bold text-charcoal">Select Amount</label>
        <span className="text-xs text-gray-500">Minimum amount is ₹51</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
        {amounts.map((item) => {
          const isSelected = selectedAmount === item.value;
          return (
            <button
              key={item.value}
              onClick={() => handleSelect(item.value)}
              className={`relative p-3 rounded-xl border-2 flex flex-col items-center justify-center transition-all ${
                isSelected 
                  ? 'border-saffron bg-saffron text-white shadow-md' 
                  : 'border-gray-200 bg-white text-gray-700 hover:border-saffron hover:bg-orange-50'
              }`}
            >
              {item.badge && (
                <span className={`absolute -top-2.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                  isSelected ? 'bg-white text-saffron' : 'bg-saffron text-white'
                }`}>
                  {item.badge}
                </span>
              )}
              <span className="text-lg font-bold">₹{item.value.toLocaleString('en-IN')}</span>
              <span className={`text-xs mt-1 text-center font-devanagari ${isSelected ? 'text-white' : 'text-gray-500'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mb-4">
        <input 
          type="number" 
          placeholder="Custom amount (₹)" 
          value={customAmount}
          onChange={handleCustomChange}
          className="w-full p-4 border-2 border-dashed border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron bg-gray-50 text-charcoal font-bold text-center"
        />
      </div>

      <div className="text-center bg-gray-100 p-3 rounded-lg">
        <span className="text-gray-700 font-medium">
          Current amount: <strong className="text-xl text-maroon">₹{currentAmount || 0}</strong> · {contributionType}
        </span>
      </div>
    </div>
  );
}
