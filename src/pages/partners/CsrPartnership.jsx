import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Download, Phone } from 'lucide-react';
import CsrEnquiryForm from '../../components/partners/CsrEnquiryForm';
import WhyPartnerBox from '../../components/partners/WhyPartnerBox';
import DonateButton from '../../components/shared/DonateButton';

const CsrPartnership = () => {
  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Top Banner / Header Section */}
      <div className="bg-white pt-8 pb-16 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-7xl mx-auto">
          <Link to="/" className="inline-flex items-center text-gray-500 hover:text-saffron transition-colors text-sm font-medium mb-8">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-block bg-orange-50 border border-orange-100 rounded-full px-4 py-1.5 mb-6">
              <span className="text-saffron font-bold text-sm tracking-widest uppercase">
                ⚡ CORPORATE SOCIAL RESPONSIBILITY
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-black font-serif uppercase tracking-tight mb-4">
              CSR CONTACT & PARTNERSHIP
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-charcoal font-serif mb-6">
              CSR संपर्क एवं सहभागिता
            </h2>
            
            <p className="text-xl md:text-2xl text-saffron font-medium mb-8">
              साथ मिलकर समाज में सकारात्मक परिवर्तन लाएँ
            </p>
            
            <p className="text-lg text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto">
              We invite forward-thinking corporates to collaborate with us across <strong className="text-gray-900 font-bold">educational empowerment, medical aid, women safety, environmental sustainability, and Gau Seva</strong> drives — building measurable impact through structured CSR partnerships.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-black text-white rounded-full font-bold hover:bg-gray-900 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                <Download className="w-5 h-5 mr-2" />
                Download CSR Profile
              </a>
              
              <a 
                href="tel:#" 
                className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-3.5 bg-white text-saffron border-2 border-saffron rounded-full font-bold hover:bg-orange-50 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
              >
                <Phone className="w-5 h-5 mr-2" />
                Request a Call Back
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
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

      {/* Take Action Today Section */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-24 mb-16 text-center">
        <h2 className="text-3xl font-bold text-charcoal mb-6">Take Action Today</h2>
        <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          आपका सहयोग किसी के जीवन में नई उम्मीद ला सकता है। सेवा, सहयोग एवं सहभागिता के माध्यम से समाज हित के अभियानों से जुड़ें और सकारात्मक परिवर्तन का हिस्सा बनें।
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <DonateButton className="w-full sm:w-auto" />
          <button className="w-full sm:w-auto px-8 py-3.5 bg-white text-charcoal border-2 border-gray-200 rounded-full font-bold hover:border-gray-300 hover:bg-gray-50 transition-all uppercase tracking-wide">
            Join the Mission
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-charcoal text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Newsletter</h2>
          <p className="text-gray-300 mb-2 font-medium">सेवा, संस्कार और समाज से जुड़े रहने के लिए</p>
          <p className="text-gray-400 mb-8 text-sm">
            <span className="text-saffron mr-1">🚩</span> 
            सनातन पर्व, सेवा अभियान, विशेष कार्यक्रमों एवं महत्वपूर्ण अपडेट्स की जानकारी प्राप्त करने के लिए Subscribe करें।
          </p>
          <form className="flex flex-col sm:flex-row max-w-md mx-auto gap-3">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              required
              className="flex-grow px-4 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-saffron"
            />
            <button 
              type="submit"
              className="px-6 py-3 bg-saffron text-white rounded-full font-bold hover:bg-orange-600 transition-colors uppercase tracking-wide whitespace-nowrap"
            >
              Subscribe Now
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CsrPartnership;
