import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AmountSelector from '../../components/donate/AmountSelector';
import ScanAndPayCard from '../../components/donate/ScanAndPayCard';
import Newsletter from '../../components/Newsletter';

export default function DonationHub() {
  const [contributionType, setContributionType] = useState('Monthly');

  const types = ['One Time', 'Monthly', 'Quarterly', 'Yearly'];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Header Section */}
        <div className="bg-white py-12 md:py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-6">
              ✨ Support a cause that changes lives
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-charcoal mb-4">Donation & Support Hub</h1>
            <p className="text-xl text-maroon font-devanagari font-medium mb-6">सहयोग के अनेक माध्यम, उद्देश्य एक।</p>
            <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed bg-cream/50 p-6 rounded-2xl border border-orange-100">
              आपका सहयोग किसी के जीवन में आशा, सहारा और सम्मान की नई शुरुआत बन सकता है। आपका छोटा सा योगदान सेवा, शिक्षा, स्वास्थ्य सहायता, संस्कृति संरक्षण एवं मानव कल्याण के अनेक कार्यों में सहायक बनता है। <br/>
              <span className="inline-block mt-3 font-bold text-saffron">🚩 सेवा ही सच्चा धर्म है 🚩</span>
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Left Column - Form */}
            <div className="lg:w-7/12 xl:w-2/3">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-charcoal mb-1">Donation Details</h2>
                    <p className="text-gray-500 text-sm">Fill in your details and choose how you want to contribute.</p>
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button className="bg-white text-saffron font-bold text-sm px-4 py-1.5 rounded shadow-sm">Online</button>
                    <button className="text-gray-500 font-medium text-sm px-4 py-1.5 hover:text-gray-700">Offline</button>
                  </div>
                </div>

                {/* Contribution Type */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {types.map(type => (
                    <button
                      key={type}
                      onClick={() => setContributionType(type)}
                      className={`px-5 py-2 rounded-full font-semibold text-sm transition-colors ${
                        contributionType === type 
                          ? 'bg-charcoal text-white shadow-md' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {contributionType === 'Monthly' && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                    <p className="text-sm text-orange-800">
                      <strong>Recurring Donation Flow Active</strong> — AutoPay / ECS Subscription will be set up for your <strong>Monthly</strong> contribution.
                    </p>
                  </div>
                )}

                {/* Amount Selector Component */}
                <AmountSelector contributionType={contributionType} />

                {/* Project / Donation For */}
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-2">Project / Donation For</label>
                  <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron text-charcoal font-medium">
                    <option>सनातन संस्कृति एवं जनजागरण</option>
                    <option>अन्न सेवा एवं भोजन सहायता</option>
                    <option>चिकित्सा एवं स्वास्थ्य सहायता</option>
                    <option>गौ सेवा एवं संरक्षण</option>
                    <option>शिक्षा एवं संस्कार सहायता</option>
                  </select>
                </div>

                {/* 80G Banner */}
                <div className="bg-orange-50/80 border border-orange-200 rounded-xl p-4 flex gap-4 mb-8">
                  <div className="text-2xl mt-1">🎁</div>
                  <div>
                    <p className="font-bold text-orange-900 mb-1">80G Tax Benefit Available</p>
                    <p className="text-sm text-orange-800 font-devanagari mb-1">Eligible Donations पर आयकर अधिनियम के प्रचलित नियमों के अनुसार Tax Exemption का लाभ प्राप्त किया जा सकता है।</p>
                    <p className="text-xs font-mono text-orange-700 bg-orange-200/50 inline-block px-2 py-0.5 rounded">80G Registration No. ABTCS1749KF20261</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="space-y-5 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Full Name *</label>
                      <input type="text" className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" placeholder="Your Name" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Mobile *</label>
                      <input type="text" className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" placeholder="Phone Number" />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                      <input type="email" className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" placeholder="Email Address" />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-1">Payment Mode</label>
                      <select className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron">
                        <option>Online (Razorpay / UPI)</option>
                        <option>Bank Transfer (NEFT/RTGS)</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input type="checkbox" className="mt-1 w-4 h-4 text-saffron focus:ring-saffron rounded border-gray-300" />
                      <div>
                        <p className="font-bold text-charcoal">I Want To Claim 80G Tax Benefit</p>
                        <p className="text-xs text-gray-500 mt-0.5">PAN is required for 80G verification.</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Security Note */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 flex gap-3 items-start">
                  <div className="text-amber-500 mt-0.5">⚠️</div>
                  <p className="text-sm text-amber-800 font-devanagari">
                    <strong>Security Note:</strong> भुगतान करते समय कृपया सुनिश्चित करें कि स्क्रीन पर <strong>'Sanatan Dharm Manav Kalyan Foundation'</strong> नाम प्रदर्शित हो रहा हो। नाम सत्यापित करने के बाद ही भुगतान करें।
                  </p>
                </div>

                <button className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg shadow-orange-500/30">
                  {contributionType === 'One Time' ? 'Donate Now with Razorpay' : `Start ${contributionType} AutoPay with Razorpay`}
                </button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  Secure payment options supported: UPI, QR, bank transfer, cards, and net banking.
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:w-5/12 xl:w-1/3 space-y-6">
              <ScanAndPayCard />

              <div className="bg-gradient-to-br from-[#FF9933] to-[#FF6A00] text-white rounded-2xl shadow-xl p-6 sm:p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 opacity-10 transform translate-x-1/3 -translate-y-1/3 text-9xl">🛡️</div>
                <h3 className="text-xl font-bold mb-2 relative z-10">Verified Donation Flow</h3>
                <p className="text-white/80 text-sm mb-6 relative z-10">Designed to keep your payment and receipt records in sync.</p>
                
                <ul className="space-y-4 relative z-10">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-saffron flex items-center justify-center text-xs font-bold mt-0.5">1</span>
                    <p className="text-sm font-medium">Choose an amount and project.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-saffron flex items-center justify-center text-xs font-bold mt-0.5">2</span>
                    <p className="text-sm font-medium">Pay online with Razorpay or scan the QR and transfer manually.</p>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white text-saffron flex items-center justify-center text-xs font-bold mt-0.5">3</span>
                    <p className="text-sm font-medium">Online payments are verified automatically and manual payments are reviewed by the team.</p>
                  </li>
                </ul>
              </div>
            </div>

          </div>

          {/* BELOW FORM — 3-column info cards */}
          <div className="mt-16 border-t border-gray-200 pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Card 1 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider mb-2 block">Why Donate</span>
                <h3 className="text-xl font-bold font-devanagari text-charcoal mb-4">क्यों सहयोग करें?</h3>
                <ul className="space-y-3">
                  {['हर सहयोग किसी ज़रूरतमंद के जीवन में आशा बनता है।', 'सनातन संस्कृति, शिक्षा एवं संस्कार के संरक्षण में योगदान।', 'अन्न सेवा, चिकित्सा, गौ सेवा एवं आपदा राहत कार्यक्रमों को सशक्त करता है।', 'Verified NGO — पूर्ण पारदर्शिता एवं नियमित रिपोर्टिंग।'].map((item, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="text-saffron mt-1 text-xs">●</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 2 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider mb-2 block">Trust & Transparency</span>
                <h3 className="text-xl font-bold text-charcoal mb-4">Verified & Compliant</h3>
                <ul className="space-y-3">
                  {['Verified NGO', 'Proper Fund Utilization', 'Regular Updates & Reports', 'CSR Compliance'].map((item, i) => (
                    <li key={i} className="flex gap-3 items-center">
                      <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Card 3 */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 hover:shadow-md transition-shadow">
                <span className="text-xs font-bold text-saffron uppercase tracking-wider mb-2 block">Where Your Donation Goes</span>
                <h3 className="text-xl font-bold text-charcoal mb-4">Active Programs</h3>
                <div className="flex flex-wrap gap-2">
                  {['Annapurna / अन्न सेवा', 'Gau Seva / गौ सेवा', 'Medical Help / चिकित्सा सहायता', 'Education & Gurukul / शिक्षा', 'Disaster Relief / आपदा राहत', 'Cultural Preservation / संस्कृति संरक्षण'].map((item, i) => (
                    <a key={i} href="/activities/current" className="inline-block px-3 py-1.5 rounded-full border border-saffron/30 text-saffron bg-orange-50 text-xs font-semibold hover:bg-saffron hover:text-white transition-colors">
                      {item}
                    </a>
                  ))}
                </div>
              </div>

            </div>

            <div className="text-center mt-12 mb-16">
              <p className="text-lg font-bold text-maroon font-devanagari tracking-wide">
                🚩 सेवा • सुरक्षा • संस्कार • धर्म — मानव कल्याण हमारा कर्म 🚩
              </p>
            </div>

            {/* Take Action Today */}
            <div className="bg-gradient-to-r from-saffron to-[#ff5500] rounded-3xl shadow-xl p-10 md:p-14 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Take Action Today</h2>
              <p className="text-white/90 text-lg md:text-xl font-devanagari max-w-3xl mx-auto mb-10 leading-relaxed">
                आपका सहयोग किसी के जीवन में नई उम्मीद ला सकता है। सेवा, सहयोग एवं सहभागिता के माध्यम से समाज हित के अभियानों से जुड़ें और सकारात्मक परिवर्तन का हिस्सा बनें।
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-saffron font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all uppercase tracking-wider">
                  Donate Now
                </button>
                <button className="bg-charcoal text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all uppercase tracking-wider">
                  Join the Mission
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Reused Newsletter Component */}
      <Newsletter />
      
      <Footer />
    </div>
  );
}
