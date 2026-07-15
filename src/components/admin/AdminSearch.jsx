import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

export default function AdminSearch({ value, onChange, placeholder = "Search..." }) {
  const [searchTerm, setSearchTerm] = useState(value);

  // Debounce the search input updates
  useEffect(() => {
    const timer = setTimeout(() => {
      onChange(searchTerm);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  return (
    <div className="relative w-full max-w-sm">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
        <Search size={16} />
      </div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#FF6600] focus:border-transparent text-charcoal font-medium text-xs shadow-sm transition-all"
      />
    </div>
  );
}
