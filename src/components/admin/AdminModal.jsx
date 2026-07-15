import React, { useEffect } from "react";
import { X } from "lucide-react";

export default function AdminModal({ isOpen, onClose, title, children }) {
  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden relative z-10 border border-gray-100 flex flex-col max-h-[90vh]">
        <div className="h-1 bg-gradient-to-r from-orange-500 to-red-600"></div>
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h3 className="font-extrabold text-charcoal text-sm uppercase tracking-wider">{title}</h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-xl bg-gray-550/10 hover:bg-gray-50 flex items-center justify-center text-gray-500 hover:text-charcoal transition-all border border-gray-150"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-6 overflow-y-auto flex-grow text-xs">
          {children}
        </div>
      </div>
    </div>
  );
}
