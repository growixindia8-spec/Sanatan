import React from "react";
import { AlertTriangle, Loader } from "lucide-react";

export default function ConfirmDialog({ isOpen, onClose, onConfirm, title, message, loading = false, confirmText = "Confirm", cancelText = "Cancel" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="fixed inset-0 bg-charcoal/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden relative z-10 border border-gray-100 p-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-[#FF6600]">
            <AlertTriangle size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-charcoal text-sm uppercase tracking-wider">{title}</h3>
            <p className="text-gray-500 text-xs mt-1">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-gray-600 font-bold hover:bg-gray-50 text-xs transition-colors"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md shadow-red-500/10 disabled:opacity-50"
          >
            {loading ? <Loader size={14} className="animate-spin" /> : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
