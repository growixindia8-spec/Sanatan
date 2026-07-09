import React from 'react';
import { ArrowLeft, Heart, Award, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Reusable Components
import Header from '../../components/Header';
import ActivitiesSubNav from '../../components/activities/ActivitiesSubNav';
import FinalCTA from '../../components/FinalCTA';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

export default function CurrentActivities() {
  const activities = [
    { 
      title: "सनातन संस्कृति संरक्षण एवं जनजागरण", 
      desc: "सनातन मूल्यों, भारतीय परंपराओं एवं सामाजिक जागरूकता के संरक्षण का सतत अभियान।", 
      goal: "₹5,00,000", 
      raised: "₹0",
      image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600"
    },
    { 
      title: "अन्न सेवा एवं भोजन सहायता", 
      desc: "जरूरतमंद एवं असहाय लोगों तक भोजन एवं सहायता पहुँचाने का सेवा अभियान।", 
      goal: "₹5,00,000", 
      raised: "₹0",
      image: "https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=600"
    },
    { 
      title: "महिला सुरक्षा एवं सम्मान अभियान", 
      desc: "सुरक्षा, सम्मान, जागरूकता एवं सहयोग के लिए समर्पित अभियान।", 
      goal: "₹5,00,000", 
      raised: "₹0",
      image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=600"
    }
  ];

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
            <h1 className="text-3xl md:text-4xl font-extrabold text-charcoal tracking-wide mb-3">
              Activities & Programs
            </h1>
            <p className="text-xs text-[#FF6A00] font-extrabold tracking-[0.2em] uppercase mb-4">
              🚩 SERVICE · CULTURE · SOCIAL WELFARE
            </p>
            <p className="text-gray-600 font-devanagari text-base md:text-lg">
              सनातन धर्म मानव कल्याण फाउंडेशन द्वारा समाज के उत्थान, सुरक्षा, शिक्षा और अन्न सेवा के क्षेत्रों में चलाए जा रहे प्रमुख अभियान।
            </p>
          </div>

        </div>
      </section>

      {/* Shared Sub Navigation Tabs */}
      <ActivitiesSubNav />

      {/* Main Content Area - Key Activities */}
      <section className="py-16 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-[#FF6A00] font-bold tracking-[0.2em] uppercase block mb-1">
              ACTIVITIES
            </span>
            <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">
              हमारी प्रमुख गतिविधियाँ एवं कार्यक्षेत्र
            </h2>
            <p className="text-gray-600 font-devanagari">Our Key Activities & Areas of Work</p>
            {/* Saffron Underline */}
            <div className="h-1 w-20 bg-[#FF6A00] mx-auto mt-3 rounded-full" />
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((act, i) => (
              <div 
                key={i} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Image Header */}
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={act.image} 
                      alt={act.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    
                    {/* Visual 0% circular progress indicator */}
                    <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 flex items-center gap-1.5 shadow-sm">
                      <div className="w-8 h-8 rounded-full border-2 border-gray-200 border-t-[#FF6A00] flex items-center justify-center text-[10px] font-bold text-[#FF6A00]">
                        0%
                      </div>
                      <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider pr-1">Progress</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold font-devanagari text-maroon mb-2">{act.title}</h3>
                    <p className="text-gray-600 font-devanagari text-sm mb-4 leading-relaxed">{act.desc}</p>
                  </div>
                </div>

                {/* Progress Stats & Donate Actions */}
                <div className="px-6 pb-6 pt-2">
                  <div className="flex justify-between items-end border-t border-gray-100 pt-4 mb-4">
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Raised</p>
                      <p className="font-extrabold text-[#FF6A00] text-lg">{act.raised}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">Goal</p>
                      <p className="font-extrabold text-charcoal text-lg">{act.goal}</p>
                    </div>
                  </div>
                  <a 
                    href="#donate" 
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Initiating mock campaign donation desk for: ${act.title}`);
                    }}
                    className="block w-full text-center py-2.5 bg-[#FF6A00] hover:bg-orange-600 text-white rounded-full font-bold text-sm uppercase tracking-wider transition-all active:scale-95 shadow-md shadow-orange-500/10"
                  >
                    Donate to Campaign
                  </a>
                </div>
              </div>
            ))}
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
