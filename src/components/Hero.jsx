import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DonateButton from './shared/DonateButton';
import { useTranslation } from '../i18n/LanguageContext';
import Typewriter from './shared/Typewriter';

const slides = [
  {
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=1600",
    heading: "अगर हम नहीं, आप नहीं, तो कौन?",
    subtext: "सनातन, संस्कार और समाज के लिए अभी से ही आगे बढ़िए।",
    buttonText: "Join Us"
  },
  {
    image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=1600",
    heading: "सनातन बचेगा तो संस्कृति बचेगी।",
    subtext: "अपनी विरासत को आने वाली पीढ़ियों तक पहुँचाइए।",
    buttonText: "Join The Mission"
  },
  {
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1600",
    heading: "अब समय केवल सोचने का नहीं, कुछ करने का है।",
    subtext: "आपकी छोटी सी सेवा किसी की सबसे बड़ी उम्मीद बन सकती है।",
    buttonText: "Donate Now"
  },
  {
    image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1600",
    heading: "परिवर्तन आपकी प्रतीक्षा में है।",
    subtext: "आपका एक कदम अनेक जीवन में सकारात्मक बदलाव ला सकता है।",
    buttonText: "Become A Volunteer"
  },
  {
    image: "https://images.unsplash.com/photo-1532186651327-6ac23687d189?q=80&w=1600",
    heading: "इतिहास दर्शकों को नहीं, योगदान देने वालों को याद रखता है।",
    subtext: "सेवा, सुरक्षा और जागरूकता के साथ एक सशक्त समाज का निर्माण करें।",
    buttonText: "Join Now"
  },
  {
    image: "https://images.unsplash.com/photo-1606293459207-e81debe268fa?q=80&w=1600",
    heading: "धर्मो रक्षति रक्षितः",
    subtext: "Protect Dharma • Preserve Culture • Serve Humanity",
    buttonText: "Join The Movement"
  }
];

const announcements = [
  "🚩 सांस्कृतिक जनजागरण परियोजनाओं पर कार्य जारी है",
  "🚩 धर्म की रक्षा, संस्कृति की रक्षा और समाज सेवा — हम सबकी सामूहिक जिम्मेदारी है",
  "🚩 आपदा राहत एवं मानव सेवा अभियान हेतु सहयोग आमंत्रित है",
  "🚩 UPI, QR Code, Bank Transfer के माध्यम से दान करें"
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { t } = useTranslation();

  const translatedSlides = slides.map((slide, idx) => ({
    ...slide,
    heading: t(`hero.slides.${idx}.heading`),
    subtext: t(`hero.slides.${idx}.subtext`)
  }));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000); // Increased slightly to give time for typing reveal
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full flex flex-col">
      {/* Hero Slider Container */}
      <div className="relative h-[69vh] md:h-[55vh] w-full overflow-hidden bg-gray-900">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center w-full h-full scale-105 transform transition-transform duration-7000"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            {/* Dark gradient overlay bottom-to-top */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            {/* Slide Content */}
            <div className="absolute bottom-16 left-0 right-0 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
              <div className="max-w-2xl text-left">
                <Typewriter
                  headingText={translatedSlides[currentSlide].heading}
                  subtextText={translatedSlides[currentSlide].subtext}
                />

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                >
                  {slides[currentSlide].buttonText === 'Donate Now' ? (
                    <DonateButton className="px-8 py-3 text-sm" />
                  ) : (
                    <button className="bg-[#FF6A00] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm uppercase tracking-wider btn-animated">
                      {slides[currentSlide].buttonText}
                    </button>
                  )}
                </motion.div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Elongated Orange Pill Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex space-x-2.5">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${currentSlide === idx
                ? "w-8 bg-[#FF6A00]"
                : "w-2.5 bg-white/50 hover:bg-white"
                }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
      <br />
      {/* Announcement Ticker directly below the hero */}
      <div className="bg-[#FF7518] text-white py-3 overflow-hidden flex whitespace-nowrap z-20 border-t border-orange-400 select-none shadow-md">
        <div className="flex w-full overflow-hidden relative">
          <motion.div
            initial={{ x: '0%' }}
            animate={{ x: '-50%' }}
            transition={{ ease: 'linear', duration: 30, repeat: Infinity }}
            className="flex items-center space-x-12 pr-12 whitespace-nowrap cursor-default hover:[animation-play-state:paused]"
            style={{ display: 'inline-flex' }}
          >
            {/* Loop multiple times to create a clean seamless scroller */}
            {[...announcements, ...announcements, ...announcements].map((msg, index) => (
              <span key={index} className="inline-flex items-center font-devanagari text-sm font-semibold tracking-wide pr-4">
                {msg}
                <p className="text-white text-xs ml-3 inline-block transform scale-110"></p>
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
