import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FundraiserRequestForm from '../../components/donate/FundraiserRequestForm';
import AuthGate from '../../components/auth/AuthGate';

export default function StartFundraiser() {
  const [step, setStep] = useState('info'); // 'info', 'login', 'form'

  const handleVerifyOtp = (mobile) => {
    setStep('form');
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {step === 'info' && (
          <div className="py-12 md:py-16">
            {/* Intro Header */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
              <span className="inline-block bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
                Fundraising Support | सेवा अभियान सहयोग सुविधा
              </span>
              <h1 className="text-3xl md:text-5xl font-bold font-devanagari text-charcoal mb-6 leading-tight">
                मिलकर बदलें किसी का जीवन — आपका सहयोग बन सकता है उम्मीद की किरण
              </h1>
              <p className="text-lg text-gray-600 font-devanagari mb-4 leading-relaxed">
                हर अभियान के पीछे एक सच्ची आवश्यकता, एक संघर्ष और एक उम्मीद होती है।
              </p>
              <p className="text-lg text-gray-600 font-devanagari mb-4 leading-relaxed">
                सनातन धर्म मानव कल्याण फाउंडेशन के माध्यम से आप Verified Missions, Social Causes एवं Genuine Need Cases के लिए Fundraising Request Submit कर सकते हैं।
              </p>
              <p className="text-lg text-gray-600 font-devanagari leading-relaxed">
                यह सुविधा संस्था की निगरानी एवं निर्धारित नीतियों के अनुसार संचालित की जाती है, ताकि सहयोग सही व्यक्ति, सही उद्देश्य और सही समय पर पहुँच सके।
              </p>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
              <div className="text-center mb-10">
                <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">WHO CAN APPLY FOR FUNDRAISING SUPPORT?</span>
                <h2 className="text-2xl font-bold text-charcoal font-devanagari">Fundraising सहायता हेतु कौन आवेदन कर सकता है?</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Card A */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-maroon mb-4 border-b border-gray-100 pb-2">Individual / Family Support</h3>
                  <ul className="space-y-3">
                    {['Medical Emergency', 'Education Support', 'Food & Nutrition Support', 'Women Support & Safety', 'Family Crisis / Financial Hardship', 'Disaster Relief Assistance', 'Senior Citizen Support', 'Child Welfare Support', 'Livelihood & Skill Support', 'Other Genuine Humanitarian Needs'].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-saffron mt-1">✓</span>
                        <span className="text-gray-700 font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card B */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
                  <h3 className="text-lg font-bold text-maroon mb-4 border-b border-gray-100 pb-2">NGO Missions & Activities</h3>
                  <ul className="space-y-3">
                    {['अन्न सेवा एवं भोजन सहायता', 'चिकित्सा एवं स्वास्थ्य सहायता', 'शिक्षा एवं संस्कार सहायता', 'महिला सुरक्षा एवं सम्मान अभियान', 'आपदा राहत एवं मानव सेवा', 'गौ सेवा एवं संरक्षण', 'पर्यावरण संरक्षण एवं वृक्षारोपण', 'सनातन संस्कृति संरक्षण एवं जनजागरण', 'फिल्म, वेब सीरीज़, संगीत एवं सांस्कृतिक जनजागरण', 'Fraud Awareness & Help Center'].map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-saffron mt-1 text-sm">🚩</span>
                        <span className="text-gray-700 font-devanagari font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card C */}
              <div className="bg-orange-50 p-8 rounded-2xl shadow-sm border border-orange-200 mb-8 text-center">
                <h3 className="text-lg font-bold text-maroon mb-6">Future Missions & Service Projects</h3>
                <div className="flex flex-wrap justify-center gap-4">
                  {['सनातन हेल्प सेंटर', 'सनातन भोजनालय', 'रोटी • कपड़ा • मकान एवं कौशल विकास केंद्र', 'सनातन शेल्टर हाउस', 'सनातन गुरुकुल एवं संस्कार केंद्र'].map((item, i) => (
                    <span key={i} className="bg-white px-5 py-2 rounded-full border border-orange-200 font-devanagari font-bold text-saffron shadow-sm">{item}</span>
                  ))}
                </div>
              </div>

              {/* Important Notice Box */}
              <div className="bg-gray-100 p-6 rounded-xl border-l-4 border-gray-400">
                <h4 className="font-bold text-gray-800 mb-2 font-devanagari">महत्वपूर्ण सूचना</h4>
                <p className="text-gray-600 font-devanagari leading-relaxed">
                  केवल वास्तविक, सत्यापन योग्य एवं संस्था के उद्देश्यों के अनुरूप मामलों पर ही विचार किया जाएगा। सहायता उपलब्धता, पात्रता, सत्यापन, संसाधनों एवं संस्था की नीतियों के आधार पर प्रदान की जा सकती है। संस्था द्वारा प्राप्त प्रत्येक अनुरोध पर Fundraising Approval प्रदान करना अनिवार्य नहीं होगा।
                </p>
              </div>
            </div>

            {/* How Fundraising Works */}
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
               <div className="text-center mb-10">
                <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">Process</span>
                <h2 className="text-2xl font-bold text-charcoal font-devanagari uppercase">HOW FUNDRAISING WORKS?</h2>
              </div>

              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    'Applicant Fundraising Request Submit करता है।',
                    'NGO Team उपलब्ध जानकारी एवं दस्तावेज़ों की प्रारंभिक समीक्षा एवं सत्यापन करती है।',
                    'Approved Case / Campaign Website पर Publish किया जाता है।',
                    'Supporters अपनी इच्छा एवं समझ के अनुसार सहयोग करते हैं।',
                    'सहयोग राशि Approved Purpose के अनुसार उपयोग की जाती है।',
                    'NGO आवश्यकतानुसार Updates एवं Records Maintain करती है।'
                  ].map((stepText, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-12 h-12 bg-orange-100 text-saffron font-bold text-xl rounded-full flex items-center justify-center mb-4 border-2 border-white shadow-md">
                        {i + 1}
                      </div>
                      <p className="text-gray-700 font-devanagari font-medium">{stepText}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Apply Now CTA Button */}
            <div className="max-w-md mx-auto px-4 text-center">
              <button 
                onClick={() => setStep('login')}
                className="w-full bg-[#FF6A00] text-white py-4 px-8 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg shadow-orange-500/30 uppercase tracking-wider btn-animated"
              >
                मैं आवेदन करना चाहता/चाहती हूँ
              </button>
            </div>
          </div>
        )}

        {step === 'login' && (
          <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center p-4">
            {/* Blurred Glass Background with warm blobs */}
            <div className="absolute inset-0 bg-white/40 backdrop-blur-2xl overflow-hidden z-0">
               <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-400/30 rounded-full blur-[100px]"></div>
               <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-400/30 rounded-full blur-[100px]"></div>
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-200/20 rounded-full blur-[120px]"></div>
            </div>
            
            <div className="relative z-10 w-full flex justify-center flex-col items-center">
               <button 
                 onClick={() => setStep('info')}
                 className="mb-4 inline-flex items-center gap-1.5 text-gray-600 hover:text-saffron transition-colors text-sm font-semibold bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow-sm"
               >
                 &larr; Back to Information
               </button>
               <AuthGate 
                 title="Start Fundraiser Login" 
                 subtitle="Verify your account to access the secure Fundraising Request workspace." 
                 onSuccess={handleVerifyOtp} 
               />
            </div>
          </div>
        )}

        {step === 'form' && (
          <div className="py-12 md:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <button 
              onClick={() => setStep('info')}
              className="mb-6 inline-flex items-center gap-1.5 text-gray-500 hover:text-saffron transition-colors text-sm font-semibold"
            >
              &larr; Back to Information
            </button>
            <FundraiserRequestForm />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
