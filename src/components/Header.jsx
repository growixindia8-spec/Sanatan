import React, { useState } from 'react';
import { Menu, X, ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);

  const menuData = [
    { name: 'HOME', path: '/' },
    { name: 'ABOUT', path: '/about' },
    {
      name: 'ACTIVITIES',
      items: [
        { name: 'Current Activities', path: '/activities/current' },
        { name: 'Future Missions', path: '/activities/future-missions' },
        { name: 'Festivals', path: '/activities/festival-seva-calendar' }
      ]
    },
    {
      name: 'DONATE',
      items: [
        { name: 'Donation Hub', path: '/donate' },
        { name: 'Start Fundraiser', path: '/donate/start-fundraiser' },
        { name: 'View Fundraisers', path: '/donate/view-fundraisers' }
      ]
    },
    {
      name: 'JOIN US',
      pageTitle: 'MEMBERSHIP & REGISTRATION',
      items: [
        { name: 'Register Now', path: '#' },
        { name: 'General Member', path: '#' },
        { name: 'Patron Member', path: '#' },
        { name: 'Sanatani Sena', path: '#' },
        { name: 'Vigilance Department', path: '#' },
        { name: 'Sanatan Seva Network', path: '#' }
      ]
    },
    {
      name: 'MEDIA',
      items: [
        { name: 'News & Events', path: '/media' },
        { name: 'Photo Gallery', path: '/media' },
        { name: 'Video Gallery', path: '/media' }
      ]
    },
    {
      name: 'PORTAL',
      items: [
        { name: 'Login / Register', path: '/portal' },
        { name: 'My Profile', path: '/portal' },
        { name: 'Verification Portal', path: '/portal' },
        { name: 'Announcements', path: '/portal' }
      ]
    },
    {
      name: 'PARTNERS',
      items: [
        { name: 'CSR Partnership', path: '/partners' },
        { name: 'Sponsorship', path: '/partners' },
        { name: 'Become a Partner', path: '/partners' }
      ]
    },
    {
      name: 'CONTACT',
      items: [
        { name: 'Contact Us', path: '#' },
        { name: 'Raise a Complaint', path: '#' }
      ]
    }
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity">
            {/* Custom Saffron Ribbon / Om Graphic Logo (48px height) */}
            <svg width="48" height="48" viewBox="0 0 50 50" fill="none" className="mr-3 filter drop-shadow-sm">
              <circle cx="25" cy="25" r="22" fill="url(#saffronGrad)" />
              {/* Inner glowing circle */}
              <circle cx="25" cy="25" r="19" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
              {/* Devanagari Om path */}
              <path 
                d="M 23 15 
                   C 25 13, 29 13, 29 17 
                   C 29 20, 26 21, 24.5 21.5 
                   C 26.5 22, 31 23, 31 27.5 
                   C 31 32, 25.5 35.5, 20.5 33.5 
                   L 21.5 31 
                   C 25 32, 28.5 30, 28.5 27 
                   C 28.5 24.2, 25 24, 23 24 
                   L 21 24 
                   L 21 21.5 
                   L 23 21.5 
                   C 25 21.5, 26.5 20.5, 26.5 18 
                   C 26.5 15.5, 24.5 15.5, 23 16 
                   Z 
                   M 26 25 
                   C 31.5 27.5, 34 31, 35 34.5 
                   L 32.5 35 
                   C 31.5 32.5, 29.5 29.5, 25 27 
                   Z 
                   M 20.5 11 
                   C 22.5 10.5, 24.5 11.5, 24.5 13.5 
                   C 24.5 15.5, 22.5 16.5, 20.5 16 
                   C 18.5 15.5, 17.5 13.5, 17.5 11.5 
                   C 17.5 9.5, 18.5 8.5, 20.5 8.5 
                   L 20.5 11 
                   M 28.5 14 
                   C 33.5 15, 36.5 19, 36.5 24.5 
                   C 36.5 31.5, 29.5 38.5, 20.5 38.5 
                   C 14.5 38.5, 9.5 33.5, 9.5 27.5 
                   C 9.5 20.5, 15.5 14.5, 22.5 14.5 
                   C 24 14.5, 25.5 14.8, 27 15.2" 
                stroke="white" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <defs>
                <linearGradient id="saffronGrad" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#FF9933" />
                  <stop offset="100%" stopColor="#FF6A00" />
                </linearGradient>
              </defs>
            </svg>
            <span className="font-bold text-base md:text-[17px] text-charcoal leading-tight max-w-[210px] uppercase tracking-wide">
              Sanatan Dharm
              <br />
              <span className="text-gray-500 font-medium text-xs lowercase">Manav Kalyan Foundation</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex space-x-1 xl:space-x-2 items-center h-full">
            {menuData.map((menu, idx) => {
              const hasDropdown = !!menu.items;
              return (
                <div
                  key={menu.name}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => hasDropdown && setActiveDropdown(idx)}
                  onMouseLeave={() => hasDropdown && setActiveDropdown(null)}
                >
                  {menu.path && menu.path.startsWith('/') ? (
                    <Link
                      to={menu.path}
                      className={`flex items-center text-charcoal hover:text-saffron transition-colors font-semibold text-[13px] tracking-wider uppercase px-2 xl:px-3 py-2 rounded-md ${
                        activeDropdown === idx ? 'text-saffron' : ''
                      }`}
                    >
                      <span>{menu.name}</span>
                    </Link>
                  ) : (
                    <a
                      href={menu.path || '#'}
                      className={`flex items-center text-charcoal hover:text-saffron transition-colors font-semibold text-[13px] tracking-wider uppercase px-2 xl:px-3 py-2 rounded-md ${
                        activeDropdown === idx ? 'text-saffron' : ''
                      }`}
                    >
                      <span>{menu.name}</span>
                      {hasDropdown && <ChevronDown size={14} className="ml-1 opacity-70" />}
                    </a>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {hasDropdown && activeDropdown === idx && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-[76px] w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50"
                      >
                        {menu.pageTitle && (
                          <div className="px-4 py-2 border-b border-gray-50 text-[10px] font-bold text-gray-400 tracking-widest uppercase">
                            {menu.pageTitle}
                          </div>
                        )}
                        {menu.items.map((subItem) => 
                          subItem.path && subItem.path.startsWith('/') ? (
                            <Link
                              key={subItem.name}
                              to={subItem.path}
                              className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream hover:text-saffron transition-colors font-medium"
                            >
                              {subItem.name}
                            </Link>
                          ) : (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream hover:text-saffron transition-colors font-medium"
                            >
                              {subItem.name}
                            </a>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* Right Side Controls */}
          <div className="hidden lg:flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-saffron transition-colors font-medium text-sm">
              <Globe size={16} />
              <span>हिंदी</span>
            </button>
            <button className="bg-[#FF6A00] text-white px-6 py-2.5 rounded-full font-bold hover:bg-orange-600 transition-all hover:scale-105 shadow-md shadow-orange-500/20 active:scale-95 text-sm uppercase tracking-wider">
              Donate Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-gray-500 hover:text-saffron transition-colors font-medium text-sm">
              <Globe size={16} />
              <span>हिंदी</span>
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-saffron p-1">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-white border-t border-gray-100 max-h-[calc(100vh-80px)] overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-3 flex flex-col">
              {menuData.map((menu, idx) => {
                const hasDropdown = !!menu.items;
                const isExpanded = mobileExpandedMenu === idx;

                return (
                  <div key={menu.name} className="border-b border-gray-50 pb-2">
                    {hasDropdown ? (
                      <button
                        onClick={() => setMobileExpandedMenu(isExpanded ? null : idx)}
                        className="flex justify-between items-center w-full py-2 text-charcoal hover:text-saffron transition-colors font-semibold text-sm tracking-wider uppercase text-left"
                      >
                        <span>{menu.name}</span>
                        <ChevronDown
                          size={18}
                          className={`transition-transform duration-200 ${isExpanded ? 'rotate-180 text-saffron' : 'opacity-70'}`}
                        />
                      </button>
                    ) : menu.path && menu.path.startsWith('/') ? (
                      <Link
                        to={menu.path}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-charcoal hover:text-saffron transition-colors font-semibold text-sm tracking-wider uppercase text-left w-full"
                      >
                        {menu.name}
                      </Link>
                    ) : (
                      <a
                        href={menu.path || '#'}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-charcoal hover:text-saffron transition-colors font-semibold text-sm tracking-wider uppercase text-left w-full"
                      >
                        {menu.name}
                      </a>
                    )}

                    {/* Mobile Submenu Accordion */}
                    <AnimatePresence>
                      {hasDropdown && isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pl-4 mt-2 space-y-2 border-l-2 border-cream"
                        >
                          {menu.pageTitle && (
                            <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">
                              {menu.pageTitle}
                            </div>
                          )}
                          {menu.items.map((subItem) => 
                            subItem.path && subItem.path.startsWith('/') ? (
                              <Link
                                key={subItem.name}
                                to={subItem.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-sm text-gray-600 hover:text-saffron font-medium"
                              >
                                {subItem.name}
                              </Link>
                            ) : (
                              <a
                                key={subItem.name}
                                href={subItem.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-sm text-gray-600 hover:text-saffron font-medium"
                              >
                                {subItem.name}
                              </a>
                            )
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-4 flex flex-col space-y-4">
                <button className="bg-[#FF6A00] text-white py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10 text-center w-full uppercase tracking-wider">
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
