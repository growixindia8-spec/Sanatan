import React from 'react';
import { NavLink } from 'react-router-dom';

export default function ActivitiesSubNav() {
  const links = [
    { name: 'Current Activities', path: '/activities/current' },
    { name: 'Future Missions', path: '/activities/future-missions' },
    { name: 'Festivals', path: '/activities/festival-seva-calendar' }
  ];

  return (
    <div className="bg-white border-b border-gray-100 py-4 shadow-sm sticky top-[80px] z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-2 md:space-x-4 overflow-x-auto scrollbar-hide">
          {links.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => 
                `px-5 py-2.5 rounded-full font-semibold text-[13px] md:text-sm tracking-wide uppercase transition-all duration-300 text-center ${
                  isActive 
                    ? 'bg-[#FF6A00] text-white shadow-md shadow-orange-500/20' 
                    : 'bg-[#FFF8F0] text-charcoal border border-saffron/10 hover:border-saffron/30 hover:bg-cream/40'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
}
