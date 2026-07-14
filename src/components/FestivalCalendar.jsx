import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Calendar, Share2, Heart, ChevronRight, Loader } from 'lucide-react';
import { api } from '../lib/apiClient';

export default function FestivalCalendar() {
  const [festivals, setFestivals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState(null);
  const [error, setError] = useState(false);

  const fetchHomeFestivals = async () => {
    try {
      setLoading(true);
      setError(false);
      const res = await api.getHomeFestivals();
      setFestivals(res.data || []);
    } catch (err) {
      console.error("Failed to fetch home festivals, displaying fallback:", err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHomeFestivals();
  }, []);

  const handleShare = async (fest) => {
    const title = fest.festivalName;
    const description = `Associated Mission: ${fest.associatedMission}`;
    const shareData = {
      title: title,
      text: `${title} - ${description}`,
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Web Share failed:", err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setToastMessage("Link copied successfully.");
        setTimeout(() => setToastMessage(null), 3000);
      } catch (err) {
        console.error("Clipboard copy failed:", err);
      }
    }
  };

  return (
    <section className="py-16 bg-cream border-b border-gray-50 text-charcoal font-sans">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal mb-2 font-devanagari tracking-wide">
            सनातन पर्व एवं सेवा कैलेंडर
          </h2>
          <p className="text-xs text-[#FF6A00] font-extrabold tracking-[0.2em] uppercase mb-3">
            Festival & Seva Calendar
          </p>
          <div className="h-1 w-16 bg-gradient-to-r from-orange-500 to-red-600 mx-auto rounded-full"></div>
        </div>

        {/* Display Content */}
        {loading ? (
          <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center shadow-sm max-w-3xl mx-auto">
            <Loader size={36} className="animate-spin text-saffron mx-auto mb-3" />
            <p className="text-xs text-gray-400">पर्व लोड हो रहे हैं / Loading campaigns...</p>
          </div>
        ) : festivals.length > 0 ? (
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {festivals.map((fest) => {
                const donationUrl = fest.donationLink 
                  ? fest.donationLink 
                  : `/donate?festivalId=${fest._id}&campaign=${encodeURIComponent(fest.festivalName)}&projectFor=${encodeURIComponent(fest.associatedMission)}&sourceType=festival`;

                return (
                  <div 
                    key={fest._id}
                    className="bg-white rounded-2xl border border-gray-150 p-6 shadow-sm hover:shadow-md hover:border-saffron/20 transition-all flex flex-col justify-between"
                  >
                    <div>
                      {/* Festival date & status badge */}
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-[11px] font-bold text-gray-400 tracking-wider">
                          📅 {new Date(fest.festivalDate).toLocaleDateString('hi-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                        </span>
                        <span className={`px-2 py-0.5 rounded text-[9px] font-extrabold uppercase tracking-wider border ${
                          fest.status === 'active' 
                            ? 'bg-green-50 text-green-600 border-green-100' 
                            : 'bg-orange-50 text-orange-600 border-orange-100'
                        }`}>
                          {fest.status}
                        </span>
                      </div>

                      {/* Festival Name */}
                      <h4 className="text-lg font-bold font-devanagari text-maroon mb-2 flex items-center gap-1.5 leading-snug">
                        {fest.festivalName}
                      </h4>

                      {/* Associated Mission Info */}
                      <div className="bg-[#FFF8F0] p-3.5 rounded-xl border-l-4 border-saffron mb-6">
                        <span className="text-[9px] font-extrabold text-[#FF6A00] tracking-wider uppercase block mb-1">
                          Associated Seva Mission
                        </span>
                        <p className="text-xs text-gray-600 font-devanagari leading-relaxed">
                          {fest.associatedMission}
                        </p>
                      </div>
                    </div>

                    {/* Form Controls / Buttons */}
                    <div className="flex items-center gap-3 pt-3 border-t border-gray-50">
                      <Link 
                        to={donationUrl}
                        className="flex-grow bg-[#FF6A00] hover:bg-[#FF7518] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl shadow-md shadow-orange-500/10 transition-all active:scale-[0.98] flex items-center justify-center gap-1.5"
                      >
                        <Heart size={14} className="fill-current" />
                        <span>Donate / दान करें</span>
                      </Link>
                      
                      <button
                        type="button"
                        onClick={() => handleShare(fest)}
                        className="p-2.5 bg-neutral-50 hover:bg-neutral-100 border border-gray-200 text-gray-500 hover:text-charcoal rounded-xl transition-all active:scale-95"
                        title="Share Campaign"
                      >
                        <Share2 size={15} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* View Full Calendar Button */}
            <div className="text-center pt-6">
              <Link 
                to="/activities/festival-seva-calendar"
                className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-charcoal hover:text-[#FF6A00] hover:border-[#FF6A00] font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-full transition-all shadow-sm active:scale-95"
              >
                <span>संपूर्ण कैलेंडर देखें / View Full Calendar</span>
                <ChevronRight size={14} />
              </Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-gray-150 p-12 text-center shadow-sm max-w-xl mx-auto">
            <Calendar size={44} className="text-gray-300 mx-auto mb-3" />
            <h4 className="font-extrabold text-charcoal font-devanagari mb-2">इस महीने कोई पर्व निर्धारित नहीं है</h4>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
              वर्तमान में कोई सेवा अभियान सक्रिय नहीं है। आप आने वाले महीनों के अभियान देख सकते हैं।
            </p>
            <Link 
              to="/activities/festival-seva-calendar"
              className="inline-flex items-center gap-1.5 bg-[#FF6A00] hover:bg-orange-600 text-white font-bold text-xs uppercase tracking-wider px-5 py-2.5 rounded-xl shadow-md transition-all active:scale-95"
            >
              <span>आने वाले पर्व देखें / View Upcoming</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        )}

        {/* Share Feedback Notice Toast */}
        <AnimatePresence>
          {toastMessage && (
            <div className="fixed bottom-6 right-6 bg-[#1a202c] text-white border border-gray-700 px-6 py-4 rounded-2xl shadow-2xl z-[100] max-w-sm flex flex-col gap-1 font-sans">
              <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                <span>🚩</span>
                <span>Notice / सूचना</span>
              </div>
              <p className="text-xs text-gray-300 leading-relaxed font-devanagari mt-1">
                {toastMessage}
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
