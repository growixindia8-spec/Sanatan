import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Heart, ShieldAlert } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Reusable Components
import Header from '../../components/Header';
import ActivitiesSubNav from '../../components/activities/ActivitiesSubNav';
import FinalCTA from '../../components/FinalCTA';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';
import DonateButton from '../../components/shared/DonateButton';

// Import Static Data
import { festivalsData } from '../../data/festivals';

export default function FestivalSevaCalendar() {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Set default month to current month (e.g. July)
  const defaultMonth = months[new Date().getMonth()];
  const [selectedMonth, setSelectedMonth] = useState(defaultMonth);

  // Filter festivals based on selected month
  const filteredFestivals = festivalsData.filter(
    (f) => f.month.toLowerCase() === selectedMonth.toLowerCase()
  );

  // Month navigation handlers
  const handlePrevMonth = () => {
    const currentIdx = months.indexOf(selectedMonth);
    const prevIdx = (currentIdx - 1 + 12) % 12;
    setSelectedMonth(months[prevIdx]);
  };

  const handleNextMonth = () => {
    const currentIdx = months.indexOf(selectedMonth);
    const nextIdx = (currentIdx + 1) % 12;
    setSelectedMonth(months[nextIdx]);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal font-sans antialiased">
      
      {/* Navigation Header */}
      <Header />

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white to-[#FBF1E7] border-b border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Back link */}
          <div className="mb-4">
            <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-[#FF6A00] transition-colors text-sm font-semibold">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal tracking-wide mb-3 font-devanagari">
              सनातन पर्व एवं सेवा कैलेंडर
            </h1>
            <p className="text-xs text-[#FF6A00] font-extrabold tracking-[0.2em] uppercase mb-4">
              Sanatan Festival & Seva Calendar
            </p>
            <p className="text-gray-600 font-devanagari text-base">
              सनातन धर्म मानव कल्याण फाउंडेशन द्वारा विभिन्न हिंदू त्योहारों एवं पुण्य तिथियों पर आयोजित किए जाने वाले सेवा अभियानों का मासिक कैलेंडर।
            </p>
          </div>

        </div>
      </section>

      {/* Shared Sub Navigation Tabs */}
      <ActivitiesSubNav />

      {/* Main Calendar Content */}
      <section className="py-16 bg-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          
          {/* Section 1 — Month Navigation Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-saffron/10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Previous button */}
            <button 
              onClick={handlePrevMonth}
              className="w-full sm:w-auto px-4 py-2 border border-gray-255 bg-gray-50 hover:bg-gray-100 text-charcoal rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <ChevronLeft size={16} />
              <span>Previous Month</span>
            </button>

            {/* Selection Dropdown */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <Calendar size={18} className="text-[#FF6A00]" />
              <select 
                value={selectedMonth} 
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-extrabold text-charcoal focus:outline-none focus:ring-2 focus:ring-[#FF6A00]"
              >
                {months.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            {/* Next button */}
            <button 
              onClick={handleNextMonth}
              className="w-full sm:w-auto px-4 py-2 border border-gray-255 bg-gray-50 hover:bg-gray-100 text-charcoal rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95"
            >
              <span>Next Month</span>
              <ChevronRight size={16} />
            </button>

          </div>

          {/* Section 2 — Festival Cards Grid */}
          {filteredFestivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {filteredFestivals.map((fest, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-xl p-6 shadow-sm border border-gray-150 hover:border-saffron/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Title */}
                    <h3 className="text-lg font-bold font-devanagari text-maroon mb-2 flex items-center gap-1.5">
                      {fest.name}
                    </h3>

                    {/* Date */}
                    <div className="text-xs text-gray-500 font-semibold mb-3">
                      📅 Date: {fest.date}
                    </div>

                    {/* Associated Mission / Seva details */}
                    <div className="bg-[#FFF8F0] p-3 rounded-lg border-l-4 border-saffron mb-5">
                      <p className="text-xs text-gray-600 font-devanagari leading-relaxed">
                        <strong className="text-charcoal font-bold block mb-0.5">Associated Mission:</strong>
                        {fest.mission}
                      </p>
                    </div>
                  </div>

                  {/* Donate Button */}
                  <DonateButton 
                    campaign={fest.name}
                    className="w-full text-center py-2.5 bg-[#FF6A00] hover:bg-[#FF7518] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-orange-500/10 block"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-inner mb-12">
              <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
              <h3 className="font-extrabold text-charcoal text-base font-devanagari">इस महीने कोई पर्व निर्धारित नहीं है</h3>
              <p className="text-xs text-gray-400 mt-1">Please select another month to view associated service activities.</p>
            </div>
          )}

          {/* Admin Panel requirements details in code placeholder comments */}
          {/* 
            ADMIN COMPONENT SPECIFICATIONS (Future Backend API Integration):
            - Fields:
              1. Festival Name (string, required)
              2. Festival Date (date string, required)
              3. Festival Month (enum / string, e.g. "January", required)
              4. Associated Mission / Service (string / text, required)
              5. Donation Link (string URL, optional)
              6. Status (Active / Completed)
            - API Methods:
              - POST /api/festivals -> Create a new festival entry
              - PUT /api/festivals/:id -> Update an entry
              - DELETE /api/festivals/:id -> Remove an entry
          */}
          <div className="bg-white/80 border border-dashed border-gray-300 p-4 rounded-xl text-center shadow-inner">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-400 font-devanagari">
              <ShieldAlert size={14} />
              <span>पर्व कैलेंडर को समय-समय पर अद्यतन (Update) किया जाता है।</span>
            </span>
          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <FinalCTA />

      {/* NEWSLETTER */}
      <Newsletter />

      {/* FOOTER */}
      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppButton />

    </div>
  );
}
