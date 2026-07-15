import React from "react";

export default function AdminFilters({ children }) {
  return (
    <div className="flex flex-wrap gap-4 items-center justify-between bg-white rounded-2xl border border-gray-150 p-4 shadow-sm mb-6">
      <div className="flex flex-wrap gap-3 items-center w-full sm:w-auto">
        {children}
      </div>
    </div>
  );
}
