import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const slides = [
  {
    key: "sanataniSena",
    categoryParam: "sanatani-sena",
    title: "Sanatani Sena",
    cta: "Join Sanatani Sena →",
    image: "/sanatani-sena.jpg"
  },
  {
    key: "vigilance",
    categoryParam: "vigilance",
    title: "Vigilance Department",
    cta: "Join Vigilance Department →",
    image: "/vigilance-department.jpg"
  },
  {
    key: "sevaNetwork",
    categoryParam: "seva-network",
    title: "Sanatan Seva Network",
    cta: "Join Seva Network →",
    image: "/seva-network.jpg"
  },
  {
    key: "activeMember",
    categoryParam: "active-member",
    title: "Active Member",
    cta: "Become Active Member →",
    image: "/active-member.jpg"
  },
  {
    key: "patronMember",
    categoryParam: "patron",
    title: "Supporting / Patron Member",
    cta: "Become Patron Member →",
    image: "/patron-member.jpg"
  }
];

export default function VolunteerEcosystem({ onCardClick, hideHeader = false }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      const maxIdx = isMobile ? slides.length - 1 : slides.length - 3;
      setCurrentIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, isMobile]);

  const handlePrev = (e) => {
    e.stopPropagation();
    const maxIdx = isMobile ? slides.length - 1 : slides.length - 3;
    setCurrentIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
  };

  const handleNext = (e) => {
    e.stopPropagation();
    const maxIdx = isMobile ? slides.length - 1 : slides.length - 3;
    setCurrentIndex((prev) => (prev >= maxIdx ? 0 : prev + 1));
  };

  const handleCardClick = (slide) => {
    if (onCardClick) {
      onCardClick(slide.key);
    } else {
      navigate(`/join-the-mission?category=${slide.categoryParam}`);
    }
  };

  const totalDots = isMobile ? 5 : 3;

  return (
    <section 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`bg-gray-50 select-none ${hideHeader ? 'py-2' : 'py-16 border-b border-gray-100'}`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {!hideHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-sans text-charcoal">
              Volunteer Ecosystem
            </h2>
            <p className="text-[#FF6B00] font-devanagari font-bold text-[15px] tracking-wide mt-2">
              साथ आइए। सेवा से जुड़िए। परिवर्तन का हिस्सा बनिए।
            </p>
            <div className="h-1.5 w-24 bg-[#FF6B00] mx-auto mt-4 rounded-full" />
          </div>
        )}

        <div className="relative">
          {/* Card Viewport */}
          <div className="overflow-hidden relative px-1">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (isMobile ? 100 : 33.333)}%)`
              }}
            >
              {slides.map((slide) => (
                <div 
                  key={slide.key} 
                  className="w-full md:w-1/3 shrink-0 px-2 sm:px-3 py-4"
                >
                  <div 
                    onClick={() => handleCardClick(slide)}
                    className="relative rounded-3xl overflow-hidden shadow-md cursor-pointer group h-[380px] sm:h-[420px] border border-orange-500/10 transition-transform duration-350 hover:scale-[1.02] bg-charcoal"
                  >
                    {/* Full-bleed image */}
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      onError={(e) => {
                        e.target.onerror = null;
                        // Use a fallback if image fails to load
                        e.target.src = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200";
                      }}
                    />
                    {/* Bottom caption overlay (dark gradient overlay) */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                    
                    {/* White bold text caption at the bottom */}
                    <div className="absolute bottom-8 left-6 right-6 text-left relative z-10">
                      <h4 className="text-white text-xl md:text-2xl font-bold tracking-wide leading-tight group-hover:text-yellow-400 transition-colors font-serif">
                        {slide.title}
                      </h4>
                      <div className="text-[#FF6600] font-bold text-sm mt-3 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{slide.cta}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button 
            onClick={handlePrev}
            className="absolute -left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md hover:bg-white text-white hover:text-charcoal flex items-center justify-center transition-all z-20 shadow-md border border-white/20"
            aria-label="Previous slide"
          >
            <ArrowLeft size={18} />
          </button>
          <button 
            onClick={handleNext}
            className="absolute -right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/40 backdrop-blur-md hover:bg-white text-white hover:text-charcoal flex items-center justify-center transition-all z-20 shadow-md border border-white/20"
            aria-label="Next slide"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Carousel Dot Indicators */}
        <div className="flex justify-center space-x-2 mt-4">
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentIndex === idx 
                  ? "w-6 bg-[#FF6A00]" 
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
