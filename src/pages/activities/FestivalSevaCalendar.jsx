import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronLeft, ChevronRight, Calendar, Heart, ShieldAlert, Loader } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';

// Import Reusable Components
import Header from '../../components/Header';
import ActivitiesSubNav from '../../components/activities/ActivitiesSubNav';
import FinalCTA from '../../components/FinalCTA';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

// Import Static Data for Offline Fallback
import { festivalsData } from '../../data/festivals';
import { api } from '../../lib/apiClient';

export default function FestivalSevaCalendar() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const months = [
    { name: "January", val: "01" },
    { name: "February", val: "02" },
    { name: "March", val: "03" },
    { name: "April", val: "04" },
    { name: "May", val: "05" },
    { name: "June", val: "06" },
    { name: "July", val: "07" },
    { name: "August", val: "08" },
    { name: "September", val: "09" },
    { name: "October", val: "10" },
    { name: "November", val: "11" },
    { name: "December", val: "12" }
  ];

  // Helper to format today as YYYY-MM (e.g. 2027-07)
  // Let's use 2027 as default year if we want to align with the static data year, or current year.
  // The static data has dates in 2027, let's use 2027 as standard default.
  const getInitialMonthStr = () => {
    const today = new Date();
    const currentYear = today.getFullYear();
    // If we're in 2026, default to 2027 to show static data fallback, or match current year.
    const year = currentYear < 2027 ? 2027 : currentYear;
    const month = String(today.getMonth() + 1).padStart(2, '0');
    return `${year}-${month}`;
  };

  const monthParam = searchParams.get('month') || getInitialMonthStr();
  const [yearStr, monthStr] = monthParam.split('-');
  const selectedYear = parseInt(yearStr, 10) || 2027;
  const selectedMonthVal = monthStr || "07";

  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOfflineFallback, setIsOfflineFallback] = useState(false);

  // Sync and fetch from backend
  useEffect(() => {
    const loadFestivals = async () => {
      try {
        setLoading(true);
        setIsOfflineFallback(false);
        const data = await api.getFestivals(monthParam);
        
        // If backend returns data, use it. If not, fallback to static data
        if (data.success && data.data && data.data.length > 0) {
          setFestivals(data.data);
        } else {
          // Empty state from DB or unreachable, use offline fallback filtering
          useStaticFallback();
        }
      } catch (err) {
        console.warn("Backend unavailable, using static fallback:", err.message);
        useStaticFallback();
      } finally {
        setLoading(false);
      }
    };

    const useStaticFallback = () => {
      // Find month name matching the selectedMonthVal
      const monthObj = months.find(m => m.val === selectedMonthVal);
      const monthName = monthObj ? monthObj.name : "July";
      
      const filtered = festivalsData.filter(
        (f) => f.month.toLowerCase() === monthName.toLowerCase()
      );
      
      // Map static data format to look like model records
      const mapped = filtered.map((f, idx) => ({
        _id: `static_${idx}`,
        festivalName: f.name,
        festivalDate: new Date(`${f.date}`),
        associatedMission: f.mission,
        status: f.status.toLowerCase(),
        donationLink: f.donationLink
      }));
      
      setFestivals(mapped);
      setIsOfflineFallback(true);
    };

    loadFestivals();
  }, [monthParam, selectedMonthVal]);

  // Month navigation handlers
  const handlePrevMonth = () => {
    let m = parseInt(selectedMonthVal, 10) - 1;
    let y = selectedYear;
    if (m < 1) {
      m = 12;
      y -= 1;
    }
    const formattedMonth = String(m).padStart(2, '0');
    setSearchParams({ month: `${y}-${formattedMonth}` });
  };

  const handleNextMonth = () => {
    let m = parseInt(selectedMonthVal, 10) + 1;
    let y = selectedYear;
    if (m > 12) {
      m = 1;
      y += 1;
    }
    const formattedMonth = String(m).padStart(2, '0');
    setSearchParams({ month: `${y}-${formattedMonth}` });
  };

  const handleMonthSelect = (val) => {
    setSearchParams({ month: `${selectedYear}-${val}` });
  };

  const handleYearSelect = (val) => {
    setSearchParams({ month: `${val}-${selectedMonthVal}` });
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal font-sans antialiased">
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
          
          {/* Month & Year Navigation Bar */}
          <div className="bg-white rounded-2xl p-6 shadow-md border border-saffron/10 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
            
            {/* Previous button */}
            <button 
              onClick={handlePrevMonth}
              className="w-full sm:w-auto px-5 py-2.5 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-charcoal rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span>Previous Month</span>
            </button>

            {/* Selection Dropdown */}
            <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center">
              <Calendar size={18} className="text-[#FF6A00] shrink-0" />
              
              {/* Month Dropdown */}
              <select 
                value={selectedMonthVal} 
                onChange={(e) => handleMonthSelect(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-extrabold text-charcoal focus:outline-none focus:ring-2 focus:ring-[#FF6A00] cursor-pointer"
              >
                {months.map((m) => (
                  <option key={m.val} value={m.val}>{m.name}</option>
                ))}
              </select>

              {/* Year Dropdown */}
              <select 
                value={selectedYear} 
                onChange={(e) => handleYearSelect(e.target.value)}
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-extrabold text-charcoal focus:outline-none focus:ring-2 focus:ring-[#FF6A00] cursor-pointer"
              >
                {[2025, 2026, 2027, 2028, 2029].map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>

            {/* Next button */}
            <button 
              onClick={handleNextMonth}
              className="w-full sm:w-auto px-5 py-2.5 border border-gray-200 bg-gray-50 hover:bg-gray-100 text-charcoal rounded-full font-bold text-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
            >
              <span>Next Month</span>
              <ChevronRight size={16} />
            </button>

          </div>

          {/* Festival Cards Grid */}
          {loading ? (
            <div className="bg-white rounded-2xl p-16 text-center border border-gray-100 shadow-sm mb-12">
              <Loader size={36} className="animate-spin text-saffron mx-auto mb-3" />
              <p className="text-xs text-gray-400">Loading campaigns and rituals...</p>
            </div>
          ) : festivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {festivals.map((fest) => {
                const donationUrl = fest.donationLink 
                  ? fest.donationLink 
                  : `/donate?festivalId=${fest._id}&campaign=${encodeURIComponent(fest.festivalName)}&projectFor=${encodeURIComponent(fest.associatedMission)}&sourceType=festival`;

                return (
                  <div 
                    key={fest._id} 
                    className="bg-white rounded-2xl p-6 shadow-sm border border-gray-150 hover:border-saffron/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Title */}
                      <h3 className="text-lg font-bold font-devanagari text-maroon mb-2 flex items-center gap-1.5 leading-snug">
                        {fest.festivalName}
                      </h3>

                      {/* Date */}
                      <div className="text-xs text-gray-500 font-semibold mb-3">
                        📅 Date: {new Date(fest.festivalDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </div>

                      {/* Associated Mission */}
                      <div className="bg-[#FFF8F0] p-3 rounded-xl border-l-4 border-saffron mb-5">
                        <p className="text-xs text-gray-600 font-devanagari leading-relaxed">
                          <strong className="text-charcoal font-bold block mb-0.5">Associated Mission:</strong>
                          {fest.associatedMission}
                        </p>
                      </div>
                    </div>

                    {/* Donate Link */}
                    <Link 
                      to={donationUrl}
                      className="w-full text-center py-2.5 bg-[#FF6A00] hover:bg-[#FF7518] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-orange-500/10 block"
                    >
                      Donate Now / दान करें
                    </Link>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-inner mb-12">
              <Calendar size={48} className="text-gray-300 mx-auto mb-3" />
              <h3 className="font-extrabold text-charcoal text-base font-devanagari">इस महीने कोई पर्व निर्धारित नहीं है</h3>
              <p className="text-xs text-gray-400 mt-1">Please select another month to view associated service activities.</p>
            </div>
          )}

          {isOfflineFallback && (
            <div className="bg-amber-50/50 border border-dashed border-amber-200 p-4 rounded-xl text-center shadow-inner mb-6">
              <span className="inline-flex items-center gap-1.5 text-xs text-amber-700 font-devanagari">
                <ShieldAlert size={14} className="shrink-0" />
                <span>संपादकीय सूचना: डेटाबेस वर्तमान में ऑफ़लाइन है। स्थिर बैकअप डेटा प्रदर्शित किया जा रहा है।</span>
              </span>
            </div>
          )}

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
