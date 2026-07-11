import React, { useState } from 'react';
import { Heart, ChevronRight } from 'lucide-react';

export default function DonationTiers({ tiers, onSelectTier }) {
  const [selectedAmt, setSelectedAmt] = useState(null);
  const [customAmt, setCustomAmt] = useState('');

  const handleSelect = (amount) => {
    setSelectedAmt(amount);
    setCustomAmt('');
    if (onSelectTier) onSelectTier(amount);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value;
    setCustomAmt(val);
    setSelectedAmt('custom');
    if (onSelectTier) onSelectTier(val);
  };

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="space-y-4">
      {tiers.map((tier, idx) => (
        <div 
          key={idx}
          onClick={() => handleSelect(tier.amount)}
          className={`cursor-pointer rounded-2xl border-2 transition-all p-4 sm:p-5 flex items-center justify-between group ${
            selectedAmt === tier.amount 
              ? 'border-saffron bg-orange-50 shadow-md shadow-orange-500/10' 
              : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/30 hover:shadow-sm'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
              selectedAmt === tier.amount ? 'bg-saffron text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-orange-100 group-hover:text-saffron'
            }`}>
              <Heart size={20} className={selectedAmt === tier.amount ? 'animate-pulse' : ''} />
            </div>
            <div>
              <h4 className="font-bold text-charcoal text-lg sm:text-xl">{formatCurrency(tier.amount)}</h4>
              <p className="text-sm text-gray-500 font-medium">{tier.label}</p>
              {tier.description && (
                <p className="text-xs text-gray-400 mt-0.5">{tier.description}</p>
              )}
            </div>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            selectedAmt === tier.amount ? 'border-saffron bg-saffron text-white' : 'border-gray-200 text-transparent group-hover:border-orange-300'
          }`}>
            <ChevronRight size={14} />
          </div>
        </div>
      ))}

      {/* Custom Amount */}
      <div 
        onClick={() => {
          setSelectedAmt('custom');
          document.getElementById('custom-amount-input')?.focus();
        }}
        className={`cursor-pointer rounded-2xl border-2 transition-all p-4 sm:p-5 flex items-center gap-4 ${
          selectedAmt === 'custom' 
            ? 'border-saffron bg-orange-50 shadow-md shadow-orange-500/10' 
            : 'border-gray-100 bg-white hover:border-orange-200 hover:bg-orange-50/30'
        }`}
      >
        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
          selectedAmt === 'custom' ? 'bg-saffron text-white' : 'bg-gray-50 text-gray-400'
        }`}>
          <span className="font-bold font-mono">₹</span>
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-500 font-medium mb-1">Custom Amount</p>
          <input
            id="custom-amount-input"
            type="number"
            placeholder="Enter amount"
            value={customAmt}
            onChange={handleCustomChange}
            className="w-full bg-transparent text-charcoal font-bold text-lg focus:outline-none placeholder-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
