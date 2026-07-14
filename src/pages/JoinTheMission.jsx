import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VolunteerEcosystem from '../components/VolunteerEcosystem';

export default function JoinTheMission() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col justify-center">
        <div className="space-y-12 animate-fadeIn">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal mb-4">
              Join The Mission <span className="text-[#FF6600]">(MEMBERSHIP ECOSYSTEM)</span>
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-saffron mb-4 font-devanagari">
              सनातन सेवा अभियान से जुड़ें
            </h2>
            <p className="text-sm text-gray-650 text-gray-600 font-devanagari leading-relaxed">
              सनातन धर्म मानव कल्याण फाउंडेशन के साथ जुड़कर आप सेवा, सुरक्षा, संस्कार, धर्म एवं मानव कल्याण के विभिन्न अभियानों का हिस्सा बन सकते हैं।
              अपनी रुचि, योग्यता, स्थान और उपलब्ध समय के अनुसार सही Category चुनें और आगे की प्रक्रिया पूरी करें।
            </p>
          </div>

          {/* Auto-slide Carousel */}
          <div className="max-w-6xl mx-auto">
            <VolunteerEcosystem 
              hideHeader={true} 
              onCardClick={(categoryParam) => navigate(`/join-the-mission/${categoryParam}`)} 
            />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
