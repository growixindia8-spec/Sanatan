import React from "react";
import { AlertCircle } from "lucide-react";

export default function ErrorState({ error, onRetry }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-250 border-red-200 p-8 shadow-sm text-center max-w-lg mx-auto my-6">
      <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-red-100">
        <AlertCircle size={24} />
      </div>
      <h4 className="font-extrabold text-charcoal text-sm uppercase tracking-wider mb-2">Request Failed</h4>
      <p className="text-gray-500 text-xs mb-6 leading-relaxed">{error || "An unexpected error occurred while loading this resource."}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="bg-charcoal text-white font-bold py-2.5 px-6 rounded-xl hover:bg-gray-800 transition-all text-xs"
        >
          Retry Connection
        </button>
      )}
    </div>
  );
}
