import React from 'react';

export default function FundraiserCard({ camp }) {
  const formatCurrency = (num) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(num);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden flex flex-col">
      <div 
        className="relative h-48 bg-gray-200 bg-cover bg-center" 
        style={{ backgroundImage: `url(${camp.image})` }}
      >
        <span className="absolute top-4 left-4 bg-white text-xs font-bold px-2 py-1 rounded shadow text-green-600">
          Verified
        </span>
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <span className="text-xs font-bold text-saffron uppercase tracking-wider mb-2">{camp.cat}</span>
        <h3 className="text-lg font-bold text-charcoal leading-tight mb-4">{camp.title}</h3>
        
        <div className="mt-auto">
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div className="bg-saffron h-2 rounded-full" style={{width: `${camp.progress}%`}}></div>
          </div>
          <div className="flex justify-between text-sm mb-4">
            <span className="font-bold text-charcoal">{formatCurrency(camp.raised)} raised</span>
            <span className="text-gray-500">of {formatCurrency(camp.goal)}</span>
          </div>
          
          <div className="flex justify-between items-center bg-cream p-3 rounded-lg mb-4 text-xs">
            <span className="font-medium text-gray-700">{camp.donors} Donors</span>
            <span className="font-medium text-maroon">{camp.taxSaved}</span>
          </div>
          
          <button className="w-full bg-saffron text-white py-3 rounded-full font-bold hover:bg-orange-600 transition-colors">
            Donate
          </button>
        </div>
      </div>
    </div>
  );
}
