import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ActivityDetailModal from './shared/ActivityDetailModal';

// Activity images
import image1 from '../assets/activities/image1.jpg';
import image2 from '../assets/activities/image2.jpg';
import image3 from '../assets/activities/image3.jpg';
import image4 from '../assets/activities/image4.jpg';
import image5 from '../assets/activities/image5.jpg';
import image6 from '../assets/activities/image6.jpg';

export default function KeyActivities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  const activities = [
    {
      image: image1,
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
      image: image2,
      title: "अन्न सेवा एवं भोजन सहायता",
      desc: "जरूरतमंद एवं असहाय लोगों तक भोजन एवं सहायता पहुंचाने का सेवा अभियान।",
      goal: "₹5,00,000",
      raised: "₹0",
      quote: "भूखे को भोजन, असहाय को संबल — यही है सच्ची मानव सेवा!",
      tags: "अन्न सेवा · सहायता · करुणा · सेवा भाव",
      paragraphs: [
        "जरूरतमंद एवं असहाय लोगों तक भोजन एवं सहायता पहुंचाने का सेवा अभियान।",
        "समाज के गरीब, लाचार और भूखे व्यक्तियों को स्वच्छ और पौष्टिक भोजन नियमित रूप से उपलब्ध कराया जाता है।",
        "विभिन्न त्योहारों, मेलों और आपातकाल परिस्थितियों में बड़े स्तर पर भंडारों का आयोजन कर अन्न सेवा की जाती है।"
      ]
    },
    {
      image: image3,
      title: "महिला सुरक्षा एवं सम्मान अभियान",
      desc: "सुरक्षा, सम्मान, जागरूकता एवं सहयोग के लिए समर्पित अभियान।",
      goal: "₹5,00,000",
      raised: "₹0",
      quote: "नारी का सम्मान ही राष्ट्र का सम्मान है।",
      tags: "सुरक्षा · सम्मान · जागरूकता · सहयोग",
      paragraphs: [
        "महिलाओं की सुरक्षा, स्वावलंबन और सम्मान के प्रति समाज में जागरूकता फैलाना हमारा मुख्य उद्देश्य है।",
        "विपत्ति में फंसी महिलाओं के मार्गदर्शन और सहायता के लिए हेल्प सेंटर एवं विजिलेंस विंग निरंतर कार्यरत है।"
      ]
    },
    {
      image: image4,
      title: "चिकित्सा एवं स्वास्थ्य सहायता",
      desc: "निर्धन एवं जरूरतमंद लोगों को चिकित्सा सुविधा एवं स्वास्थ्य सहायता उपलब्ध कराना।",
      goal: "₹5,00,000",
      raised: "₹0",
      quote: "स्वस्थ तन, सुखी मन — समाज का हो नवजीवन।",
      tags: "चिकित्सा · स्वास्थ्य · सहायता · शिविर",
      paragraphs: [
        "निर्धन एवं जरूरतमंद परिवारों को निःशुल्क चिकित्सा सहायता, परामर्श एवं आवश्यक औषधियां उपलब्ध कराने का सेवा कार्य।",
        "समय-समय पर स्वास्थ्य जांच शिविरों का आयोजन कर ग्रामीण एवं पिछड़े क्षेत्रों तक स्वास्थ्य सेवाएं पहुँचाना।"
      ]
    },
    {
      image: image5,
      title: "शिक्षा एवं संस्कार सहायता",
      desc: "बच्चों को नैतिक शिक्षा, संस्कार और आवश्यक शिक्षण सामग्री प्रदान करना।",
      goal: "₹5,00,000",
      raised: "₹0",
      quote: "संस्कारी शिक्षा ही चरित्र निर्माण का आधार है।",
      tags: "शिक्षा · संस्कार · सहायता · बाल विकास",
      paragraphs: [
        "समाज के आर्थिक रूप से कमजोर बच्चों को स्कूल बैग, पुस्तकें, कॉपियां एवं अन्य शिक्षण सामग्री उपलब्ध कराना।",
        "नैतिक शिक्षा, सनातन मूल्यों और संस्कारों से भरपूर बाल विकास कार्यक्रमों का संचालन करना।"
      ]
    },
    {
      image: image6,
      title: "आपदा राहत एवं मानव सेवा",
      desc: "प्राकृतिक आपदाओं के समय त्वरित सहायता एवं मानवीय राहत पहुँचाना।",
      goal: "₹5,00,000",
      raised: "₹0",
      quote: "संकट के समय सहायता, मानवता की सच्ची परिभाषा।",
      tags: "आपदा राहत · मानव सेवा · त्वरित सहायता",
      paragraphs: [
        "बाढ़, भूकंप, आगजनी या महामारी जैसी आपदाओं के समय प्रभावित परिवारों तक सूखा राशन, वस्त्र, तंबू एवं चिकित्सा सुविधा पहुँचाना।",
        "संकटकालीन परिस्थितियों में स्वयंसेवकों की टीम द्वारा प्रत्यक्ष सहायता कार्य।"
      ]
    },


  ];

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-devanagari text-[#FF6A00] mb-2">
            वर्तमान गतिविधियाँ
          </h2>

          <p className="font-devanagari text-[#FF6A00]">
            OUR CURRENT ACTIVITIES
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 flex flex-col"
            >
              <div className="h-48 bg-gray-200">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-bold font-devanagari text-saffron mb-2">
                  {act.title}
                </h3>

                <p className="text-gray-600 font-devanagari text-sm mb-4 flex-1">
                  {act.desc}
                </p>

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
          <Link
            to="/activities/current"
            className="inline-block bg-saffron text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-[#e65c00] transition-colors uppercase tracking-wider text-sm"
          >
            View All
          </Link>
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