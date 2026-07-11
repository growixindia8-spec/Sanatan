import React from 'react';
import { ShieldCheck, Eye, Users, UserCheck, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const cards = [
  {
    type: "light",
    icon: ShieldCheck,
    eyebrow: "FRONTLINE VOLUNTEERS",
    title: "Sanatani Sena",
    description: "समाज सेवा, अन्नदानम्, गौ सेवा, सांस्कृतिक जनजागरण एवं विभिन्न सेवा अभियानों में सक्रिय रूप से योगदान देने वाले समर्पित स्वयंसेवकों का संगठन।",
    points: [
      "Official ID Card & Uniform (जहाँ लागू हो)",
      "Appointment Letter & Participation Certificate",
      "Training, Recognition & Annual Awards Opportunities",
      "सेवा अभियानों एवं विशेष कार्यक्रमों में सहभागिता"
    ],
    buttonText: "Join Sanatani Sena →"
  },
  {
    type: "dark",
    icon: Eye,
    eyebrow: "COMMUNITY PROTECTION WING",
    title: "Vigilance Department",
    description: "समाज में जागरूकता, सत्यापन, अनुशासन एवं सहयोग को बढ़ावा देने के लिए कार्यरत समर्पित टीम। यह विभाग संदिग्ध गतिविधियों, धोखाधड़ी, डुप्लीकेसी, महिला सुरक्षा एवं विभिन्न सामाजिक समस्याओं से संबंधित सूचनाओं के संकलन एवं उचित मार्गदर्शन में सहयोग करता है।",
    points: [
      "Official ID Card & Uniform (जहाँ लागू हो)",
      "Appointment Letter & Participation Certificate",
      "Training, Recognition & Annual Awards Opportunities",
      "जागृतता एवं सत्यापन अभियानों में सहभागिता"
    ],
    buttonText: "Join Vigilance Department →"
  },
  {
    type: "light",
    icon: Users,
    eyebrow: "COMMUNITY SERVICE NETWORK",
    title: "Sanatan Seva Network",
    description: "समाज के विभिन्न क्षेत्रों से जुड़े सेवा भाव रखने वाले व्यक्तियों, पेशेवरों एवं सहयोगकर्ताओं का एक सशक्त नेटवर्क, जो आवश्यकता पड़ने पर मार्गदर्शन, सहयोग एवं जनकल्याण कार्यों में अपनी विशेषज्ञता के माध्यम से योगदान देता है।",
    points: [
      "Official Membership Certificate",
      "Verified Network Identity (जहाँ लागू हो)",
      "Training, Recognition & Annual Awards Opportunities",
      "सेवा, सहायता एवं जनकल्याण अभियानों में सहभागिता"
    ],
    buttonText: "Join Sanatan Seva Network →"
  },
  {
    type: "light",
    icon: UserCheck,
    eyebrow: "LEADERSHIP & COORDINATION",
    title: "Active Member",
    description: "संस्था की गतिविधियों, सेवा अभियानों एवं जनजागरण कार्यों में नियमित रूप से सहभागिता करने वाले समर्पित सदस्य। Active Members संस्था और समाज के बीच एक महत्वपूर्ण सेतु के रूप में कार्य करते हैं।",
    points: [
      "Official Membership ID Card",
      "Appointment Letter & Participation Certificate",
      "Training, Recognition & Annual Awards Opportunities",
      "विशेष कार्यक्रमों एवं सेवा अभियानों में प्राथमिक सहभागिता"
    ],
    buttonText: "Become an Active Member →"
  },
  {
    type: "light",
    icon: Heart,
    eyebrow: "PATRON & SUPPORT CIRCLE",
    title: "Supporting Member",
    description: "संस्था के सेवा, संस्कार एवं जनकल्याण अभियानों को सशक्त बनाने वाले सम्मानित सहयोगी सदस्य। Supporting Members प्रत्यक्ष रूप से सेवा कार्यों में भाग लें या न लें, उनका सहयोग संस्था के विभिन्न सामाजिक एवं मानवीय प्रयासों को निरंतर आगे बढ़ाने में महत्वपूर्ण भूमिका निभाता है।",
    points: [
      "Official Membership Certificate",
      "Special Recognition & Appreciation Opportunities",
      "Annual Reports & Mission Updates Access",
      "सेवा एवं जनकल्याण अभियानों के सहयोगी सदस्य"
    ],
    buttonText: "Become a Supporting Member →"
  }
];

export default function VolunteerEcosystem() {
  return (
    <section className="py-20 bg-gray-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold font-sans text-charcoal">
            Volunteer Ecosystem
          </h2>
          <p className="text-[#FF6B00] font-devanagari font-bold text-[15px] tracking-wide mt-2">
            साथ आइए। सेवा से जुड़िए। परिवर्तन का हिस्सा बनिए।
          </p>
        </div>

        {/* 5-Card Grid Layout (3 in a row, wraps on md/lg) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((c, idx) => {
            const Icon = c.icon;
            
            if (c.type === "dark") {
              return (
                <div 
                  key={idx}
                  className="bg-gradient-to-br from-[#3D1420] to-[#1F0A10] text-white rounded-2xl p-6 shadow-md border border-[#3D1420]/50 hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    {/* Dark Card Header & Icon */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-yellow-500">
                        <Icon size={22} />
                      </div>
                      <span className="text-[10px] font-extrabold text-[#FF6B00] tracking-wider uppercase font-sans mt-1">
                        {c.eyebrow}
                      </span>
                    </div>

                    {/* Title & Desc */}
                    <h3 className="text-xl font-bold font-sans mb-3 text-white">
                      {c.title}
                    </h3>
                    <p className="text-gray-300 font-devanagari text-[13px] leading-relaxed mb-5">
                      {c.description}
                    </p>

                    {/* Points */}
                    <ul className="space-y-2 mb-6 font-devanagari text-[13px]">
                      {c.points.map((p, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-gray-300">
                          <span className="text-[#FF6B00] mt-1 font-bold">•</span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <Link 
                    to="/join-the-mission"
                    className="w-full bg-[#FF6A00] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10 text-center block"
                  >
                    {c.buttonText}
                  </Link>
                </div>
              );
            }

            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:border-gray-200 hover:shadow-md transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Light Card Header & Icon */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-11 h-11 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF6B00]">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-extrabold text-[#FF6B00] tracking-wider uppercase font-sans mt-1">
                      {c.eyebrow}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-xl font-bold font-sans mb-3 text-charcoal">
                    {c.title}
                  </h3>
                  <p className="text-gray-500 font-devanagari text-[13px] leading-relaxed mb-5">
                    {c.description}
                  </p>

                  {/* Points */}
                  <ul className="space-y-2 mb-6 font-devanagari text-[13px]">
                    {c.points.map((p, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2 text-gray-600">
                        <span className="text-[#FF6B00] mt-1 font-bold">•</span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <Link 
                  to="/join-the-mission"
                  className="w-full bg-[#FF6A00] text-white py-3 rounded-full font-bold text-xs uppercase tracking-wider hover:bg-orange-600 transition-colors shadow-lg shadow-orange-500/10 text-center block"
                >
                  {c.buttonText}
                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
