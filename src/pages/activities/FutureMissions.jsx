import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Reusable Components
import Header from '../../components/Header';
import ActivitiesSubNav from '../../components/activities/ActivitiesSubNav';
import FutureMissionsComponent from '../../components/FutureMissions';
import FinalCTA from '../../components/FinalCTA';
import Newsletter from '../../components/Newsletter';
import Footer from '../../components/Footer';
import WhatsAppButton from '../../components/WhatsAppButton';

export default function FutureMissionsPage() {
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
              Future Missions
            </h1>
            <p className="text-xs text-[#FF6A00] font-extrabold tracking-[0.2em] uppercase mb-4">
              🚩 PROPOSED INITIATIVES & ROADMAP
            </p>
            <p className="text-gray-600 font-devanagari text-base md:text-lg">
              आगामी परियोजनाएँ और सेवा प्रकल्प जिनके माध्यम से संस्था समाज में सकारात्मक सुधार एवं आत्मनिर्भरता स्थापित करने के लिए प्रतिबद्ध है।
            </p>
          </div>

        </div>
      </section>

      {/* Shared Sub Navigation Tabs */}
      <ActivitiesSubNav />

      {/* Reused Future Missions Section */}
      <div className="bg-white">
        <FutureMissionsComponent />
      </div>

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
