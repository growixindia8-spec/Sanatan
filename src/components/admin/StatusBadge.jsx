import React from "react";

export default function StatusBadge({ status }) {
  const getBadgeStyle = (status = "") => {
    const s = status.toLowerCase();
    switch (s) {
      case "active":
      case "verified":
      case "paid":
      case "approved":
      case "resolved":
      case "replied":
        return "bg-green-50 text-green-700 border-green-100";
      case "pending":
      case "new":
      case "investigating":
      case "in-review":
      case "contacted":
      case "assigned":
        return "bg-amber-50 text-amber-700 border-amber-150 border-yellow-200 text-yellow-700";
      case "failed":
      case "rejected":
      case "suspended":
      case "spam":
      case "not-interested":
        return "bg-red-50 text-red-700 border-red-100";
      case "archived":
      case "closed":
      case "unsubscribed":
        return "bg-gray-100 text-gray-700 border-gray-200";
      default:
        return "bg-blue-50 text-blue-700 border-blue-100";
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-extrabold uppercase border ${getBadgeStyle(status)}`}>
      {status}
    </span>
  );
}
