import React from 'react';
import { NavLink } from 'react-router-dom';
import Header from '../Header';
import Footer from '../Footer';

export default function LegalPageLayout({ children, title, subtitle, dateInfo }) {
  const links = [
    { name: 'Privacy Policy', path: '/privacy-policy' },
    { name: 'Terms & Conditions', path: '/terms-and-conditions' },
    { name: 'Refund & Cancellation Policy', path: '/refund-policy' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-charcoal font-sans antialiased">
      <Header />

      {/* Top Banner / Heading Accent */}
      <section className="bg-gradient-to-b from-white to-amber-50/50 border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-black text-charcoal tracking-tight mb-2 uppercase">
            {title}
          </h1>
          {subtitle && (
            <p className="text-saffron font-bold text-base md:text-lg tracking-wide font-devanagari">
              {subtitle}
            </p>
          )}
          {dateInfo && (
            <div className="mt-4 inline-block bg-orange-50 border border-orange-100/50 rounded-full px-4 py-1 text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {dateInfo}
            </div>
          )}
        </div>
      </section>

      {/* Inline Top Navigation Tabs for Policies */}
      <div className="bg-white border-b border-gray-200 sticky top-20 z-40">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center overflow-x-auto space-x-1.5 md:space-x-4 py-3 scrollbar-hide">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `whitespace-nowrap px-4 py-2 rounded-full font-bold text-xs md:text-sm transition-all ${
                    isActive
                      ? 'bg-charcoal text-white shadow-sm'
                      : 'bg-transparent text-gray-500 hover:text-charcoal hover:bg-gray-100'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </div>
        </div>
      </div>

      {/* Content Container */}
      <main className="flex-grow max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 md:py-14 print:py-0">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-6 md:p-12 shadow-sm text-gray-700 leading-relaxed text-[15px] space-y-6 print:border-none print:shadow-none print:p-0">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
