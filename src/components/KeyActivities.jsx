import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityDetailModal from './shared/ActivityDetailModal';

export default function KeyActivities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    { 
    { title: "à¤¸à¤¨à¤¾à¤¤à¤¨à¥€ à¤¸à¥‡à¤¨à¤¾", desc: "", goal: "â‚¹5,00,000", raised: "â‚¹0", quote: "", tags: "", paragraphs: [] },
    { title: "à¤µà¤¿à¤œà¤¿à¤²à¥‡à¤‚à¤¸ à¤µà¤¿à¤­à¤¾à¤—", desc: "", goal: "â‚¹5,00,000", raised: "â‚¹0", quote: "", tags: "", paragraphs: [] },
    { title: "à¤¸à¤¨à¤¾à¤¤à¤¨ à¤¸à¥‡à¤µà¤¾ à¤¨à¥‡à¤Ÿà¤µà¤°à¥�à¤•", desc: "", goal: "â‚¹5,00,000", raised: "â‚¹0", quote: "", tags: "", paragraphs: [] }
  ];¤¤à¥�à¤µ à¤¹à¥ˆà¥¤ à¤†à¤‡à¤�, à¤‡à¤¸ à¤…à¤­à¤¿à¤¯à¤¾à¤¨ à¤•à¥‹ à¤†à¤—à¥‡ à¤¬à¤¢à¤¼à¤¾à¤¨à¥‡ à¤®à¥‡à¤‚ à¤…à¤ªà¤¨à¤¾ à¤¸à¤¹à¤¯à¥‹à¤— à¤¦à¥‡à¤‚à¥¤"
      ]
    },
    { 
      title: "à¤…à¤¨à¥�à¤¨ à¤¸à¥‡à¤µà¤¾ à¤�à¤µà¤‚ à¤­à¥‹à¤œà¤¨ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾", 
      desc: "à¤œà¤°à¥‚à¤°à¤¤à¤®à¤‚à¤¦ à¤�à¤µà¤‚ à¤…à¤¸à¤¹à¤¾à¤¯ à¤²à¥‹à¤—à¥‹à¤‚ à¤¤à¤• à¤­à¥‹à¤œà¤¨ à¤�à¤µà¤‚ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤ªà¤¹à¥�à¤�à¤šà¤¾à¤¨à¥‡ à¤•à¤¾ à¤¸à¥‡à¤µà¤¾ à¤…à¤­à¤¿à¤¯à¤¾à¤¨à¥¤", 
      goal: "â‚¹5,00,000", 
      raised: "â‚¹0",
      quote: "à¤­à¥‚à¤–à¥‡ à¤•à¥‹ à¤­à¥‹à¤œà¤¨, à¤…à¤¸à¤¹à¤¾à¤¯ à¤•à¥‹ à¤¸à¤‚à¤¬à¤² â€” à¤¯à¤¹à¥€ à¤¹à¥ˆ à¤¸à¤šà¥�à¤šà¥€ à¤®à¤¾à¤¨à¤µ à¤¸à¥‡à¤µà¤¾!",
      tags: "à¤…à¤¨à¥�à¤¨ à¤¸à¥‡à¤µà¤¾ Â· à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ Â· à¤•à¤°à¥�à¤£à¤¾ Â· à¤¸à¥‡à¤µà¤¾ à¤­à¤¾à¤µ",
      paragraphs: [
        "à¤œà¤°à¥‚à¤°à¤¤à¤®à¤‚à¤¦ à¤�à¤µà¤‚ à¤…à¤¸à¤¹à¤¾à¤¯ à¤²à¥‹à¤—à¥‹à¤‚ à¤¤à¤• à¤­à¥‹à¤œà¤¨ à¤�à¤µà¤‚ à¤¸à¤¹à¤¾à¤¯à¤¤à¤¾ à¤ªà¤¹à¥�à¤�à¤šà¤¾à¤¨à¥‡ à¤•à¤¾ à¤¸à¥‡à¤µà¤¾ à¤…à¤­à¤¿à¤¯à¤¾à¤¨à¥¤",
        "[CLIENT: Please provide paragraph 2 content]",
        "[CLIENT: Please provide paragraph 3 content]",
        "[CLIENT: Please provide paragraph 4 content]"
      ]
    },
    { 
      title: "à¤®à¤¹à¤¿à¤²à¤¾ à¤¸à¥�à¤°à¤•à¥�à¤·à¤¾ à¤�à¤µà¤‚ à¤¸à¤®à¥�à¤®à¤¾à¤¨ à¤…à¤­à¤¿à¤¯à¤¾à¤¨", 
      desc: "à¤¸à¥�à¤°à¤•à¥�à¤·à¤¾, à¤¸à¤®à¥�à¤®à¤¾à¤¨, à¤œà¤¾à¤—à¤°à¥‚à¤•à¤¤à¤¾ à¤�à¤µà¤‚ à¤¸à¤¹à¤¯à¥‹à¤— à¤•à¥‡ à¤²à¤¿à¤� à¤¸à¤®à¤°à¥�à¤ªà¤¿à¤¤ à¤…à¤­à¤¿à¤¯à¤¾à¤¨à¥¤", 
      goal: "â‚¹5,00,000", 
      raised: "â‚¹0",
      quote: "à¤¨à¤¾à¤°à¥€ à¤•à¤¾ à¤¸à¤®à¥�à¤®à¤¾à¤¨ à¤¹à¥€ à¤°à¤¾à¤·à¥�à¤Ÿà¥�à¤° à¤•à¤¾ à¤¸à¤®à¥�à¤®à¤¾à¤¨ à¤¹à¥ˆà¥¤",
      tags: "à¤¸à¥�à¤°à¤•à¥�à¤·à¤¾ Â· à¤¸à¤®à¥�à¤®à¤¾à¤¨ Â· à¤œà¤¾à¤—à¤°à¥‚à¤•à¤¤à¤¾ Â· à¤¸à¤¹à¤¯à¥‹à¤—",
      paragraphs: [
        "à¤¸à¥�à¤°à¤•à¥�à¤·à¤¾, à¤¸à¤®à¥�à¤®à¤¾à¤¨, à¤œà¤¾à¤—à¤°à¥‚à¤•à¤¤à¤¾ à¤�à¤µà¤‚ à¤¸à¤¹à¤¯à¥‹à¤— à¤•à¥‡ à¤²à¤¿à¤� à¤¸à¤®à¤°à¥�à¤ªà¤¿à¤¤ à¤…à¤­à¤¿à¤¯à¤¾à¤¨à¥¤",
        "[CLIENT: Please provide paragraph 2 content]",
        "[CLIENT: Please provide paragraph 3 content]",
        "[CLIENT: Please provide paragraph 4 content]"
      ]
    }
      title: "सनातन संस्कृति संरक्षण एवं जनजागरण", 
      desc: "सनातन मूल्यों, भारतीय परंपराओं एवं सामाजिक जागरूकता के संरक्षण का सतत अभियान।", 
      goal: "₹5,00,000", 
      raised: "₹0",
      quote: "संस्कृति और संस्कार बचाइए, भविष्य को सशक्त बनाइए!",
      tags: "संस्कृति · संस्कार · जागरूकता · संगठन",
      paragraphs: [
        "भारतीय संस्कृति, सनातन परंपराओं, नैतिक मूल्यों एवं सामाजिक जागरूकता का संरक्षण और संवर्धन हमारे प्रमुख उद्देश्यों में से एक है।",
        "इस अभियान के माध्यम से समाज में सकारात्मक विचार, सांस्कृतिक चेतना, पारिवारिक मूल्य, सामाजिक समरसता एवं राष्ट्रीय भावना को मजबूत करने का प्रयास किया जाता है।",
        "विभिन्न जनजागरण कार्यक्रमों, सांस्कृतिक गतिविधियों, प्रशिक्षण, संवाद एवं डिजिटल माध्यमों के द्वारा सनातन संस्कृति को वर्तमान एवं भविष्य की पीढ़ियों तक पहुंचाने का संकल्प लिया गया है।",
        "सनातन संस्कृति और मूल्यों का संरक्षण केवल हमारा नहीं, हम सभी का दायित्व है। आइए, इस अभियान को आगे बढ़ाने में अपना सहयोग दें।"
      ]
    },
    { 
      title: "अन्न सेवा एवं भोजन सहायता", 
      desc: "जरूरतमंद एवं असहाय लोगों तक भोजन एवं सहायता पहुंचाने का सेवा अभियान।", 
      goal: "₹5,00,000", 
      raised: "₹0",
      quote: "भूखे को भोजन, असहाय को संबल — यही है सच्ची मानव सेवा!",
      tags: "अन्न सेवा · सहायता · करुणा · सेवा भाव",
      paragraphs: [
        "जरूरतमंद एवं असहाय लोगों तक भोजन एवं सहायता पहुंचाने का सेवा अभियान।",
        "[CLIENT: Please provide paragraph 2 content]",
        "[CLIENT: Please provide paragraph 3 content]",
        "[CLIENT: Please provide paragraph 4 content]"
      ]
    },
    { 
      title: "महिला सुरक्षा एवं सम्मान अभियान", 
      desc: "सुरक्षा, सम्मान, जागरूकता एवं सहयोग के लिए समर्पित अभियान।", 
      goal: "₹5,00,000", 
      raised: "₹0",
      quote: "नारी का सम्मान ही राष्ट्र का सम्मान है।",
      tags: "सुरक्षा · सम्मान · जागरूकता · सहयोग",
      paragraphs: [
        "सुरक्षा, सम्मान, जागरूकता एवं सहयोग के लिए समर्पित अभियान।",
        "[CLIENT: Please provide paragraph 2 content]",
        "[CLIENT: Please provide paragraph 3 content]",
        "[CLIENT: Please provide paragraph 4 content]"
      ]
    },
    { title: "चिकित्सा एवं स्वास्थ्य सहायता", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "शिक्षा एवं संस्कार सहायता", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "आपदा राहत एवं मानव सेवा", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "गौ सेवा एवं संरक्षण", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "पर्यावरण संरक्षण एवं वृक्षारोपण", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "फिल्म, वेब सीरीज, संगीत एवं सांस्कृतिक जनजागरण", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "Fraud Awareness & Help Center", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "सनातनी सेना", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "विजिलेंस विभाग", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] },
    { title: "सनातन सेवा नेटवर्क", desc: "", goal: "₹5,00,000", raised: "₹0", quote: "", tags: "", paragraphs: [] }
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-devanagari text-[#FF6A00] mb-2">वर्तमान गतिविधियाँ</h2>
          <p className="font-devanagari text-[#FF6A00]">OUR CURRENT ACTIVITIES</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col">
              <div className="h-48 bg-gray-200">
                <img 
                  src={`https://placehold.co/400x300/800000/ffffff?text=${encodeURIComponent(act.title)}`}
                  alt={act.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold font-devanagari text-saffron mb-2">{act.title}</h3>
                <p className="text-gray-600 font-devanagari text-sm mb-4 flex-1">{act.desc}</p>
                <div className="flex justify-between items-end mb-4 pt-4 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-gray-500">Raised</p>
                    <p className="font-bold text-charcoal">{act.raised}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Goal</p>
                    <p className="font-bold text-charcoal">{act.goal}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedActivity(act);
                  }}
                  className="block w-full text-center py-2 border border-saffron text-saffron rounded-full hover:bg-saffron hover:text-white transition-colors font-medium"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/activities/current" className="inline-block bg-saffron text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#e65c00] transition-colors uppercase tracking-wider text-sm">View All</Link>
        </div>
      </div>

      <ActivityDetailModal 
        isOpen={!!selectedActivity} 
        onClose={() => setSelectedActivity(null)} 
        activity={selectedActivity} 
      />
    </section>
  );
}
