import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import DonateButton from './shared/DonateButton';
import LanguageSelector from './shared/LanguageSelector';
import { useTranslation } from '../i18n/LanguageContext';
import logo from '../assets/logo-sanatan.jpg';

const translationKeys = {
  'HOME': 'nav.home',
  'ABOUT': 'nav.about',
  'ACTIVITIES': 'nav.activities',
  'DONATE': 'nav.donate',
  'JOIN US': 'nav.joinUs',
  'MEDIA': 'nav.media',
  'PORTAL': 'nav.portal',
  'PARTNERS': 'nav.partners',
  'MORE': 'nav.more',
  'Current Activities': 'nav.currentActivities',
  'Future Missions': 'nav.futureMissions',
  'Festivals': 'nav.festivals',
  'Donation Hub': 'nav.donationHub',
  'Start Fundraiser': 'nav.startFundraiser',
  'View Fundraisers': 'nav.viewFundraisers',
  'Register Now': 'nav.registerNow',
  'General Member': 'nav.generalMember',
  'Patron Member': 'nav.patronMember',
  'Sanatani Sena': 'nav.sanataniSena',
  'Vigilance Department': 'nav.vigilance',
  'Sanatan Seva Network': 'nav.sevaNetwork',
  'News & Events': 'nav.newsEvents',
  'Photo Gallery': 'nav.photoGallery',
  'Video Gallery': 'nav.videoGallery',
  'Login / Register': 'nav.loginRegister',
  'My Profile': 'nav.myProfile',
  'Verification Portal': 'nav.verificationPortal',
  'Announcements': 'nav.announcements',
  'CSR Partnership': 'nav.csrPartnership',
  'Sponsorship': 'nav.sponsorship',
  'Become a Partner': 'nav.becomePartner',
  'Raise a Complaint': 'nav.raiseComplaint',
  'FAQ': 'nav.faq',
  'Community Voices': 'nav.communityVoices',
  'Legal Documents': 'nav.legalDocuments',
  'Contact Us': 'nav.contactUs'
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileExpandedMenu, setMobileExpandedMenu] = useState(null);
  const { t } = useTranslation();

  const getTranslatedName = (name) => {
    const key = translationKeys[name];
    return key ? t(key) : name;
  };

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
    { name: 'JOIN US', path: '/join-the-mission' },
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
        { name: 'CSR Partnership', path: '/partners/csr' },
        { name: 'Sponsorship', path: '/partners' },
        { name: 'Become a Partner', path: '/partners' }
      ]
    },
    {
      name: 'MORE',
      items: [
        { name: 'Raise a Complaint', path: '/raise-a-complaint' },
        { name: 'FAQ', path: '/faq' },
        { name: 'Community Voices', path: '/community-voices' },
        { name: 'Legal Documents', path: '/legal-documents' },
        { name: 'Contact Us', path: '/contact-us' }
      ]
    }
  ];

  return (
    <header className="sticky top-0 bg-white shadow-sm border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* Logo Section */}
          <Link to="/" className="flex items-center flex-shrink-0 cursor-pointer hover:opacity-90 transition-opacity py-1">
            <img
              src={logo}
              alt="Sanatan Dharm Manav Kalyan Foundation Logo"
              className="h-10 md:h-12 w-auto max-w-[160px] md:max-w-[200px] object-contain filter drop-shadow-sm"
            />
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
                      className={`flex items-center text-charcoal hover:text-saffron transition-colors font-semibold text-[13px] tracking-wider uppercase px-2 xl:px-3 py-2 rounded-md ${activeDropdown === idx ? 'text-saffron' : ''
                        }`}
                    >
                      <span>{getTranslatedName(menu.name)}</span>
                    </Link>
                  ) : (
                    <a
                      href={menu.path || '#'}
                      className={`flex items-center text-charcoal hover:text-saffron transition-colors font-semibold text-[13px] tracking-wider uppercase px-2 xl:px-3 py-2 rounded-md ${activeDropdown === idx ? 'text-saffron' : ''
                        }`}
                    >
                      <span>{getTranslatedName(menu.name)}</span>
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
                              {getTranslatedName(subItem.name)}
                            </Link>
                          ) : (
                            <a
                              key={subItem.name}
                              href={subItem.path}
                              className="block px-4 py-2.5 text-sm text-charcoal hover:bg-cream hover:text-saffron transition-colors font-medium"
                            >
                              {getTranslatedName(subItem.name)}
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
            <LanguageSelector />
            <DonateButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center space-x-4">
            <LanguageSelector />
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
                        <span>{getTranslatedName(menu.name)}</span>
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
                        {getTranslatedName(menu.name)}
                      </Link>
                    ) : (
                      <a
                        href={menu.path || '#'}
                        onClick={() => setIsOpen(false)}
                        className="block py-2 text-charcoal hover:text-saffron transition-colors font-semibold text-sm tracking-wider uppercase text-left w-full"
                      >
                        {getTranslatedName(menu.name)}
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
                                {getTranslatedName(subItem.name)}
                              </Link>
                            ) : (
                              <a
                                key={subItem.name}
                                href={subItem.path}
                                onClick={() => setIsOpen(false)}
                                className="block py-2 text-sm text-gray-600 hover:text-saffron font-medium"
                              >
                                {getTranslatedName(subItem.name)}
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
                <DonateButton className="w-full py-3" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
