import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, ArrowLeft, ArrowRight } from 'lucide-react';
import DonateButton from './shared/DonateButton';

// Future Mission Images
import image1 from '../assets/future-missions/image1.png';
import image2 from '../assets/future-missions/image2.png';
import image3 from '../assets/future-missions/image3.png';
import image4 from '../assets/future-missions/image4.png';
import image5 from '../assets/future-missions/image5.png';


const tabsData = [
  {
    image: image1,
    title: "सनातन हेल्प सेंटर",
    description: "सनातन हेल्प सेंटर का उद्देश्य सनातनी समाज के प्रत्येक जरूरतमंद व्यक्ति एवं परिवार को मार्गदर्शन, सहायता एवं सहयोग उपलब्ध कराना है। सामाजिक, कानूनी, प्रशासनिक, दस्तावेज़ी, रोजगार, स्वास्थ्य एवं अन्य आवश्यक सेवाओं से संबंधित सहायता प्रदान करने का प्रयास किया जाएगा। सनातन हेल्प सेंटर द्वारा प्रदान की जाने वाली सहायता, मार्गदर्शन एवं सहयोग सेवाएँ पूर्णतः निःशुल्क (Free of Cost) होंगी। केवल सरकारी विभागों, संस्थाओं अथवा तृतीय-पक्ष सेवा प्रदाताओं द्वारा निर्धारित शुल्क, फीस या अन्य देय राशि का भुगतान संबंधित व्यक्ति को स्वयं करना होगा।",
    posterTitle: "सनातन सहायता केंद्र",
    tagline: "मार्गदर्शन, सुरक्षा व निःशुल्क सहायता",
    bgClass: "bg-[#0F1E36]"
  },
  {
    image: image2,
    title: "सनातन भोजनालय",
    description: "\"कोई भूखा न रहे\" हमारे प्रमुख संकल्पों में से एक है। इस उद्देश्य को आगे बढ़ाते हुए विभिन्न क्षेत्रों में छोटे एवं बड़े स्तर पर ऐसे भोजनालय विकसित करने का प्रयास किया जाएगा, जहाँ जरूरतमंद लोगों को निःशुल्क तथा अन्य नागरिकों को सम्मानजनक, स्वच्छ एवं किफायती दरों पर पौष्टिक भोजन उपलब्ध कराया जा सके। यह पहल सेवा, सम्मान और आत्मनिर्भरता के संतुलन पर आधारित होगी।",
    posterTitle: "सनातनी भोजनालय",
    tagline: "॥ कोई भूखा न रहे, यही हमारा संकल्प ॥",
    bgClass: "bg-black"
  },
  {
    image: image3,
    title: "रोटी • कपड़ा • मकान एवं कौशल विकास केंद्र",
    description: "\"रोटी, कपड़ा और मकान\" मनुष्य की मूलभूत आवश्यकताएँ हैं। इस अभियान के अंतर्गत समाज के वंचित, निर्धन एवं बेसहारा परिवारों को भोजन, वस्त्र और सुरक्षित आवास सहायता प्रदान करने का प्रयास किया जाएगा। इसके साथ ही, युवाओं और महिलाओं को विभिन्न क्षेत्रों में व्यावसायिक प्रशिक्षण और कौशल विकास (Skill Development) के अवसर उपलब्ध कराए जाएंगे, ताकि वे आत्मनिर्भर बनकर सम्मानजनक जीवन जी सकें।",
    posterTitle: "कौशल विकास व जीवन आधार",
    tagline: "रोटी, कपड़ा, मकान एवं आत्मनिर्भरता",
    bgClass: "bg-[#0C3827]"
  },
  {
    image: image4,
    title: "सनातन शेल्टर हाउस",
    description: "सनातन शेल्टर हाउस (Sanatan Shelter House) का मुख्य उद्देश्य बेसहारा, वृद्ध, अनाथ एवं संकट में फंसाए गए लोगों को एक सुरक्षित, सम्मानजनक और स्नेहमयी आश्रय प्रदान करना है। यहाँ न केवल रहने और भोजन की व्यवस्था होगी, बल्कि उनके स्वास्थ्य, मानसिक संबल और कल्याण के लिए भी आवश्यक देखभाल और सहायता सेवाएँ उपलब्ध कराई जाएंगी।",
    posterTitle: "सनातन शेल्टर हाउस",
    tagline: "सुरक्षित आश्रय, सम्मानजनक जीवन",
    bgClass: "bg-[#450C0C]"
  },
  {
    image: image5,
    title: "सनातन गुरुकुल एवं संस्कार केंद्र",
    description: "सनातन गुरुकुल एवं संस्कार केंद्र की स्थापना के माध्यम से नई पीढ़ी को आधुनिक शिक्षा के साथ-साथ हमारी प्राचीन वैदिक संस्कृति, नैतिक मूल्यों और संस्कारों से जोड़ने का प्रयास किया जाएगा। यहाँ छात्रों को अपनी समृद्ध विरासत का ज्ञान, सदाचार, अनुशासन और व्यावहारिक कौशल प्रदान किया जाएगा, ताकि वे एक जागरूक, संस्कारी और समाज-उपयोगी नागरिक बन सकें।",
    posterTitle: "सनातन गुरुकुल",
    tagline: "वैदिक ज्ञान, आधुनिक शिक्षा व संस्कार",
    bgClass: "bg-[#422006]"
  }
];

export default function FutureMissions() {
  const [activeTab, setActiveTab] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % tabsData.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [activeTab, isPaused]);

  const handleNext = () => {
    setActiveTab((prev) => (prev + 1) % tabsData.length);
  };

  const handlePrev = () => {
    setActiveTab((prev) => (prev - 1 + tabsData.length) % tabsData.length);
  };

  const handleShare = async (mission) => {
    const shareData = {
      title: mission.title,
      text: `${mission.title}: ${mission.description}`,
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
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
      className="py-20 bg-white border-b border-gray-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="text-left mb-10">
          <span className="text-xs font-bold text-gray-400 tracking-widest uppercase block mb-1">
            Future Missions & Initiatives
          </span>
          <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-charcoal">
            भविष्य में आने वाले सेवा एवं जनकल्याण अभियान
          </h2>
          {/* Orange Underline Bar */}
          <div className="h-1.5 w-24 bg-[#FF6B00] mt-3 rounded-full" />
        </div>

        {/* Tab Pill Selector */}
        <div className="flex overflow-x-auto space-x-3 mb-10 pb-2 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
          {tabsData.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              className={`whitespace-nowrap px-6 py-2.5 rounded-full font-devanagari font-semibold text-[13px] tracking-wide transition-all duration-300 ${activeTab === idx
                  ? 'bg-charcoal text-white shadow-md'
                  : 'bg-white text-charcoal border border-gray-200 hover:border-gray-300'
                }`}
            >
              {tab.title}
            </button>
          ))}
        </div>

        {/* Content Card Layout (2-Column) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

          {/* Left Column: Designed Poster Card */}
          <div className="lg:col-span-5 flex">
            <div className={`w-full ${tabsData[activeTab].bgClass} border-4 border-double border-yellow-600 rounded-2xl p-6 flex flex-col justify-between items-center text-center shadow-lg relative min-h-[360px]`}>

              {/* Inner thin glowing border */}
              <div className="absolute inset-2 border border-yellow-500/20 rounded-lg pointer-events-none" />

              <div className="text-center pt-4">
                <span className="text-[10px] font-bold text-yellow-400 tracking-widest uppercase block mb-1">PROPOSED MISSION</span>
                <h4 className="text-white text-lg font-bold font-devanagari tracking-wide">
                  {tabsData[activeTab].posterTitle}
                </h4>
              </div>

              {/* Mission Image */}
              <div className="my-6 transform hover:scale-105 transition-transform duration-300">
                <img
                  src={tabsData[activeTab].image}
                  alt={tabsData[activeTab].title}
                  className="w-40 h-40 object-cover rounded-xl"
                />
              </div>

              <div className="w-full">
                <p className="text-yellow-400 font-devanagari text-[13px] font-medium leading-relaxed mb-4 px-2">
                  {tabsData[activeTab].tagline}
                </p>
                <div className="border-t border-yellow-500/20 pt-3 text-[9px] font-semibold text-gray-400 uppercase tracking-wider">
                  A Proud Initiative of Sanatan Dharm Manav Kalyan Foundation
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: White Content Card */}
          <div className="lg:col-span-7 flex">
            <div className="w-full bg-white border border-gray-100 shadow-sm rounded-2xl p-6 md:p-8 flex flex-col justify-between">

              <div className="space-y-4">
                <h3 className="text-2xl font-bold font-devanagari text-charcoal">
                  {tabsData[activeTab].title}
                </h3>
                <p className="text-gray-600 font-devanagari leading-relaxed text-[15px] md:text-[16px]">
                  {tabsData[activeTab].description}
                </p>
              </div>

              <div className="mt-8 space-y-6">

                {/* Two Orange Pill Buttons Side-by-Side */}
                <div className="flex flex-col sm:flex-row gap-3.5 w-full">
                  <DonateButton
                    campaign={tabsData[activeTab].title}
                    className="flex-1 py-3 px-6 text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleShare(tabsData[activeTab])}
                    className="flex-1 border-2 border-[#FF6A00] text-[#FF6A00] py-3 px-6 rounded-full font-bold hover:bg-orange-50/50 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2 btn-animated cursor-pointer"
                  >
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                </div>

                {/* Carousel Controls Row */}
                <div className="border-t border-gray-100 pt-5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="text-gray-400 hover:text-charcoal transition-colors font-semibold text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <ArrowLeft size={16} />
                    <span>Previous</span>
                  </button>

                  {/* Dot Indicators */}
                  <div className="flex space-x-2">
                    {tabsData.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveTab(idx)}
                        className={`h-2.5 rounded-full transition-all duration-300 ${activeTab === idx
                            ? "w-6 bg-[#FF6A00]"
                            : "w-2.5 bg-gray-200 hover:bg-gray-300"
                          }`}
                        aria-label={`Go to slide ${idx + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={handleNext}
                    className="text-gray-400 hover:text-charcoal transition-colors font-semibold text-sm flex items-center gap-1 cursor-pointer"
                  >
                    <span>Next</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 bg-[#1a202c] text-white border border-gray-700 px-6 py-4 rounded-2xl shadow-2xl z-[100] max-w-sm flex flex-col gap-1 font-sans"
          >
            <div className="flex items-center gap-2 text-saffron font-bold text-sm">
              <span>🚩</span>
              <span>Notice / सूचना</span>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed font-devanagari mt-1">
              {toastMessage}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
