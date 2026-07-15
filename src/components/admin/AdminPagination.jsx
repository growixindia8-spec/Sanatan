import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function AdminPagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm mt-6">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        Page {currentPage} of {totalPages}
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="w-9 h-9 rounded-xl border border-gray-150 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent flex items-center justify-center text-gray-600 transition-colors"
        >
          <ChevronLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="w-9 h-9 rounded-xl border border-gray-150 hover:bg-gray-50 disabled:opacity-50 disabled:hover:bg-transparent flex items-center justify-center text-gray-600 transition-colors"
        >
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
