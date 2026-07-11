import React from 'react';
import { X } from 'lucide-react';

export default function CertificateModal({ isOpen, onClose, certificate }) {
  if (!isOpen || !certificate) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>
      
      {/* Modal Content */}
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col transform transition-all">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-white/80 hover:bg-white text-saffron border border-saffron hover:scale-110 transition-all shadow-sm"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className="p-8 text-center flex flex-col items-center">
          <h3 className="text-2xl font-devanagari font-bold text-charcoal mb-6">
            {certificate.code} — {certificate.label}
          </h3>
          
          <div className="w-full bg-gray-50 rounded-xl p-4 flex items-center justify-center min-h-[300px] border border-gray-100">
            {/* Placeholder for actual certificate scan */}
            <img 
              src={`https://placehold.co/600x800/fbf1e7/ff6600?text=${encodeURIComponent(certificate.code)}`} 
              alt={`${certificate.code} Certificate`}
              className="max-w-full max-h-[60vh] object-contain rounded drop-shadow-md"
            />
          </div>
          
          <p className="mt-6 text-sm text-gray-500">
            Official Document / Registration Certificate
          </p>
        </div>
      </div>
    </div>
  );
}
