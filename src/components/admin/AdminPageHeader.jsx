import React from "react";

export default function AdminPageHeader({ title, description, actions }) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-6 border-b border-gray-200">
      <div>
        <h2 className="text-xl font-extrabold text-charcoal font-serif tracking-tight">{title}</h2>
        {description && <p className="text-gray-400 text-xs mt-1 leading-relaxed">{description}</p>}
      </div>
      {actions && <div className="flex items-center gap-3 w-full sm:w-auto">{actions}</div>}
    </div>
  );
}
