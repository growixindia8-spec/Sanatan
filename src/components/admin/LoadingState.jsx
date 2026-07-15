import React from "react";
import { Loader } from "lucide-react";

export default function LoadingState({ message = "Loading content, please wait..." }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-12 flex flex-col items-center justify-center shadow-sm">
      <Loader size={36} className="text-[#FF6600] animate-spin mb-4" />
      <span className="text-gray-500 font-medium text-xs">{message}</span>
    </div>
  );
}
