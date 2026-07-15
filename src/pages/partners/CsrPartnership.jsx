import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Phone } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import CsrEnquiryForm from '../../components/partners/CsrEnquiryForm';
import WhyPartnerBox from '../../components/partners/WhyPartnerBox';
import DonateButton from '../../components/shared/DonateButton';

export default function CsrPartnership() {
  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />

      {/* Top Banner / Header Section */}
      <div className="bg-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-saffron transition-colors text-sm font-semibold mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-6">
              <span className="text-[#FF6A00] font-bold text-xs tracking-widest uppercase">
                ⚡ CSR PARTNERSHIP & COLLABORATION
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black tracking-tight mb-3">
              CSR CONTACT & PARTNERSHIP
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal font-serif mb-4 font-devanagari">
              CSR संपर्क एवं सहभागिता
            </h2>
            
            <p className="text-lg md:text-xl text-[#FF6A00] font-bold mb-6 font-devanagari">
              साथ मिलकर समाज में सकारात्मक परिवर्तन लाएँ
            </p>
            
            <p className="text-base text-gray-600 mb-8 leading-relaxed max-w-3xl mx-auto font-devanagari">
              सनातन धर्म मानव कल्याण फाउंडेशन विभिन्न सामाजिक, शैक्षिक, स्वास्थ्य, महिला सशक्तिकरण, पर्यावरण, गौ सेवा एवं सांस्कृतिक परियोजनाओं के लिए Corporate Social Responsibility (CSR) सहयोग का स्वागत करता है। यदि आपकी संस्था CSR Partnership, Project Sponsorship, Employee Volunteering, Cause Marketing या Long-Term Social Impact Initiatives में रुचि रखती है, तो कृपया नीचे दी गई जानकारी साझा करें।
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/csr-profile" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 text-sm uppercase tracking-wider"
              >
                <Download className="w-4 h-4 mr-2" />
                View CSR Profile
              </Link>
              
              <a 
                href="tel:+918888888888" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-white text-[#FF6A00] border-2 border-[#FF6A00] rounded-full font-bold hover:bg-orange-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 text-sm uppercase tracking-wider"
              >
                <Phone className="w-4 h-4 mr-2" />
                Request a Call Back
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 flex-grow">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          {/* Left Column - Form */}
          <div className="w-full lg:w-2/3">
            <CsrEnquiryForm />
          </div>

          {/* Right Column - Sidebar */}
          <div className="w-full lg:w-1/3">
            <div className="sticky top-28">
              <WhyPartnerBox />
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimers & Closing taglines */}
      <div className="bg-gray-100 border-t border-gray-200 py-12 px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs text-gray-500 leading-relaxed font-devanagari max-w-3xl mx-auto bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <strong>Logo Disclaimer / लोगो अस्वीकरण:</strong> यहाँ प्रदर्शित सभी कंपनियों के लोगो केवल CSR संपर्क, जागरूकता एवं सहभागिता के प्रतिनिधिक उद्देश्य से उपयोग किए गए हैं। किसी कंपनी का लोगो प्रदर्शित होना आवश्यक रूप से औपचारिक साझेदारी, समर्थन या अनुमोदन को प्रदर्शित नहीं करता।
          </p>
        </div>

        <div className="pt-4 border-t border-gray-200 max-w-md mx-auto space-y-2">
          <p className="text-saffron font-bold text-sm tracking-wide font-devanagari">
            🚩 सेवा • सुरक्षा • संस्कार • धर्म — मानव कल्याण हमारा कर्म
          </p>
          <p className="text-charcoal font-extrabold text-base tracking-widest uppercase">
            सनातन धर्म मानव कल्याण फाउंडेशन
          </p>
          <p className="text-gray-500 text-xs font-semibold font-devanagari">
            सेवा ही सनातन • समर्पण ही हमारा धर्म
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}
