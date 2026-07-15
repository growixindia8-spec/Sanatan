import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function CsrProfile() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white min-h-screen font-sans flex flex-col">
      <Header />
      
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Controls */}
        <div className="flex justify-end mb-8 print:hidden">
          <button 
            onClick={handlePrint}
            className="bg-[#FF6A00] text-white px-6 py-2 rounded-xl font-bold hover:bg-orange-600 transition-colors"
          >
            Print / Save as PDF
          </button>
        </div>

        {/* Profile Content */}
        <div className="print-content space-y-8">
          <div className="text-center border-b-2 border-orange-200 pb-8">
            <h1 className="text-3xl font-black text-charcoal tracking-tight">SANATAN DHARM MANAV KALYAN FOUNDATION</h1>
            <h2 className="text-xl font-bold text-[#FF6A00] mt-2 font-devanagari">सनातन धर्म मानव कल्याण फाउंडेशन</h2>
            <p className="mt-4 text-gray-600 font-medium">Corporate Social Responsibility (CSR) Partnership Profile</p>
          </div>

          <section>
            <h3 className="text-xl font-bold text-charcoal border-l-4 border-[#FF6A00] pl-4 mb-4">About the Foundation</h3>
            <p className="text-gray-700 leading-relaxed font-devanagari">
              सनातन धर्म मानव कल्याण फाउंडेशन एक गैर-लाभकारी संगठन है, जो समाज के वंचित वर्गों के उत्थान, शिक्षा, स्वास्थ्य, और पर्यावरण संरक्षण के लिए समर्पित है। हमारा उद्देश्य "मानव सेवा ही माधव सेवा है" के मूल मंत्र पर आधारित है।
            </p>
          </section>

          <section>
            <h3 className="text-xl font-bold text-charcoal border-l-4 border-[#FF6A00] pl-4 mb-4">Our Vision & Mission</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h4 className="font-bold text-[#FF6A00] mb-2">Vision (दृष्टिकोण)</h4>
                <p className="text-sm text-gray-700 font-devanagari">एक ऐसा समाज जहां कोई भी व्यक्ति भूखा, अशिक्षित या असहाय न रहे। सनातन मूल्यों के साथ एक आत्मनिर्भर और सशक्त भारत का निर्माण।</p>
              </div>
              <div className="bg-orange-50 p-6 rounded-xl border border-orange-100">
                <h4 className="font-bold text-[#FF6A00] mb-2">Mission (लक्ष्य)</h4>
                <p className="text-sm text-gray-700 font-devanagari">समाज के अंतिम छोर पर खड़े व्यक्ति तक स्वास्थ्य, शिक्षा और सम्मानजनक जीवन जीने के संसाधन पहुंचाना।</p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-bold text-charcoal border-l-4 border-[#FF6A00] pl-4 mb-4">CSR Focus Areas</h3>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-gray-700 list-disc pl-5">
              <li>Education & Skill Development</li>
              <li>Healthcare & Medical Assistance</li>
              <li>Women Empowerment</li>
              <li>Disaster Relief & Humanitarian Aid</li>
              <li>Environmental Protection & Tree Plantation</li>
              <li>Gau Seva (Animal Welfare)</li>
              <li>Food & Nutrition Support (Annadaan)</li>
              <li>Cultural Heritage Awareness</li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-bold text-charcoal border-l-4 border-[#FF6A00] pl-4 mb-4">Partnership Models</h3>
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-bold text-charcoal">Project Sponsorship</h4>
                <p className="text-sm text-gray-600 mt-1">Fund specific long-term initiatives such as building educational centers or conducting rural health camps.</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-bold text-charcoal">Employee Volunteering</h4>
                <p className="text-sm text-gray-600 mt-1">Engage corporate employees in grassroots social work, tree plantations, and community teaching.</p>
              </div>
              <div className="border border-gray-200 rounded-xl p-4">
                <h4 className="font-bold text-charcoal">Cause Marketing</h4>
                <p className="text-sm text-gray-600 mt-1">Co-brand initiatives where a percentage of product sales supports the Foundation's welfare activities.</p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-center">
            <h3 className="text-lg font-bold text-charcoal mb-2">Contact for Partnership</h3>
            <p className="text-gray-600 mb-1">Email: contact@sanatandharmmanavkalyanfoundation.org</p>
            <p className="text-gray-600">Phone: +91 88888 88888</p>
            <p className="text-sm text-gray-500 mt-4 italic">Note: Formal compliance certificates (80G, 12A, CSR-1) will be shared confidentially during the proposal phase.</p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
