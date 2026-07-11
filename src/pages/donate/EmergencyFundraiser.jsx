import React, { useState } from 'react';
import { Share2, AlertCircle, Shield, ChevronRight } from 'lucide-react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ProgressStats from '../../components/donate/emergency/ProgressStats';
import DonationTiers from '../../components/donate/emergency/DonationTiers';
import SupporterWall from '../../components/donate/emergency/SupporterWall';
import DonateButton from '../../components/shared/DonateButton';

export default function EmergencyFundraiser() {
  const [selectedAmount, setSelectedAmount] = useState(0);

  const campaignDetails = {
    title: 'Emergency Flood Relief for Assam',
    subtitle: 'Thousands of families have lost their homes. They need our immediate support.',
    raised: 1250000,
    goal: 5000000,
    donors: 842,
    daysLeft: 12,
    tiers: [
      { amount: 1500, label: 'Provide a Ration Kit', description: 'Feeds a family of 4 for a week.' },
      { amount: 5000, label: 'Medical & Survival Kit', description: 'Essential medicines and blankets.' },
      { amount: 10000, label: 'Shelter Support', description: 'Temporary tent and bedding for a family.' }
    ],
    supporters: [
      { name: 'Ramesh Sharma', amount: 5000, time: '2 mins ago', message: 'May God give them strength.' },
      { name: 'Anonymous', amount: 1500, time: '15 mins ago', message: '' },
      { name: 'Priya Patel', amount: 10000, time: '1 hour ago', message: 'Standing with Assam in these tough times.' },
      { name: 'Amit Kumar', amount: 2500, time: '3 hours ago', message: 'हर हर महादेव' },
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <Header />
      
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-center gap-3">
          <AlertCircle className="animate-pulse" size={20} />
          <p className="font-bold text-sm tracking-wide uppercase text-center">
            Urgent Appeal: Help us reach the goal before the monsoon worsens!
          </p>
        </div>
      </div>

      <main className="flex-grow py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="mb-8">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="bg-red-100 text-red-700 font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Emergency Response
              </span>
              <span className="bg-orange-100 text-saffron font-bold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                Tax Exempt (80G)
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-charcoal mb-4 leading-tight">
              {campaignDetails.title}
            </h1>
            <p className="text-xl text-gray-600 font-medium">
              {campaignDetails.subtitle}
            </p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            
            {/* Left Column - Story & Details */}
            <div className="lg:w-7/12 xl:w-2/3 space-y-8">
              {/* Media Placeholder */}
              <div className="aspect-video bg-gray-200 rounded-3xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1542385151-efd9000785a0?q=80&w=1600" 
                  alt="Flood Relief" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                  <p className="text-white font-bold text-lg">Volunteers distributing food packets in affected areas.</p>
                </div>
              </div>

              {/* Story Content */}
              <div className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100">
                <h2 className="text-2xl font-bold text-charcoal mb-6 flex items-center gap-2">
                  <span className="w-8 h-2 bg-saffron rounded-full"></span>
                  About The Campaign
                </h2>
                
                <div className="prose prose-lg text-gray-600 font-medium leading-relaxed font-devanagari">
                  <p className="mb-4">
                    Assam is currently facing one of its worst floods in recent history. Over 500 villages have been submerged, leaving thousands without shelter, food, or clean drinking water.
                  </p>
                  <p className="mb-4">
                    सनातन धर्म मानव कल्याण फाउंडेशन (Sanatan Dharm Manav Kalyan Foundation) की टीम ज़मीनी स्तर पर राहत कार्य कर रही है। हम बाढ़ प्रभावित क्षेत्रों में राशन किट, तिरपाल, और आवश्यक दवाइयां पहुँचा रहे हैं।
                  </p>
                  <p className="mb-4">
                    आपका सहयोग इस समय किसी के जीवन की रक्षा कर सकता है। हमारे स्वयंसेवक दिन-रात काम कर रहे हैं, लेकिन आवश्यकता बहुत बड़ी है। हमें आपके तत्काल समर्थन की आवश्यकता है।
                  </p>
                  
                  <div className="bg-orange-50 border-l-4 border-saffron p-6 rounded-r-2xl my-8">
                    <h3 className="text-lg font-bold text-charcoal mb-2 font-sans">How your funds will be used:</h3>
                    <ul className="list-disc pl-5 space-y-2 text-base font-sans">
                      <li>Procurement of dry ration (Rice, Dal, Oil, Salt).</li>
                      <li>Distribution of Tarpaulins for temporary shelters.</li>
                      <li>Medical camps and distribution of water purification tablets.</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-gray-100">
                  <Shield className="text-green-600 flex-shrink-0" size={32} />
                  <div>
                    <p className="font-bold text-charcoal">Verified Campaign</p>
                    <p className="text-sm text-gray-500">This fundraiser has been verified by the Trust committee. 100% of your donation goes directly to the cause.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Donation & Stats */}
            <div className="lg:w-5/12 xl:w-1/3 space-y-8">
              
              <ProgressStats 
                raised={campaignDetails.raised}
                goal={campaignDetails.goal}
                donors={campaignDetails.donors}
                daysLeft={campaignDetails.daysLeft}
              />

              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-8 sticky top-28">
                <h3 className="text-xl font-bold text-charcoal mb-6">Select a Donation Amount</h3>
                
                <DonationTiers 
                  tiers={campaignDetails.tiers} 
                  onSelectTier={(amt) => setSelectedAmount(amt)}
                />

                <div className="mt-8 space-y-4">
                  <DonateButton 
                    campaign="Assam Flood Relief"
                    className="w-full py-4 text-lg btn-animated"
                    onClick={() => {
                      if (!selectedAmount) alert('Please select or enter an amount first.');
                    }}
                  >
                    Donate ₹{selectedAmount || '...'} Now
                  </DonateButton>
                  
                  <button className="w-full py-4 border-2 border-gray-200 text-charcoal rounded-full font-bold hover:border-charcoal transition-colors flex items-center justify-center gap-2 btn-animated">
                    <Share2 size={18} />
                    Share This Campaign
                  </button>
                </div>
                
                <p className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
                  Secure Payments by Razorpay <ChevronRight size={12} />
                </p>
              </div>

              <SupporterWall supporters={campaignDetails.supporters} />
              
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
