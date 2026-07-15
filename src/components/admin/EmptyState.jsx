import React from "react";
import { Inbox } from "lucide-react";

export default function EmptyState({ message = "No matching records found." }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center text-center shadow-sm">
      <div className="w-12 h-12 bg-gray-50 border border-gray-150 rounded-2xl flex items-center justify-center text-gray-400 mb-4">
        <Inbox size={20} />
      </div>
      <h4 className="font-bold text-charcoal text-sm">{message}</h4>
      <p className="text-gray-400 text-[11px] mt-1">Try modifying your filters or search keywords.</p>
    </div>
  );
}
