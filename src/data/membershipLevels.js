export const membershipLevels = {
  sanataniSena: {
    title: "Sanatani Sena",
    tagline: "🚩 समाज सेवा, जनजागरण, आयोजन, राहत कार्य, धार्मिक-सांस्कृतिक अभियान एवं जनसंपर्क",
    description: "समाज सेवा, जनजागरण, आयोजन, राहत कार्य, धार्मिक-सांस्कृतिक अभियान एवं जनसंपर्क कार्यों में सक्रिय स्वयंसेवक के रूप में जुड़ें।",
    levels: [
      { id: "ss_1", name: "Local Volunteer", amount: 101, idCardAmount: 0, requirement: "—", desc: "स्थानीय स्तर पर सेवा, जनजागरण, कार्यक्रम एवं अभियान में सहयोग।" },
      { id: "ss_2", name: "Volunteer with ID Card", amount: 501, idCardAmount: 0, requirement: "—", desc: "ID Card सहित सक्रिय स्वयंसेवक के रूप में सेवा कार्यों में भागीदारी।" },
      { id: "ss_3", name: "District Coordinator", amount: 1001, idCardAmount: 2100, requirement: "न्यूनतम 5 सदस्य नेटवर्क", desc: "जिला स्तर पर टीम, कार्यक्रम और सेवा गतिविधियों का समन्वय।" },
      { id: "ss_4", name: "State Coordinator", amount: 5001, idCardAmount: 11000, requirement: "न्यूनतम 10 सदस्य नेटवर्क", desc: "राज्य स्तर पर संगठन विस्तार, अभियान और टीम Coordination." },
      { id: "ss_5", name: "National Coordinator", amount: 21000, idCardAmount: 51000, requirement: "न्यूनतम 20 सदस्य नेटवर्क", desc: "राष्ट्रीय स्तर पर अभियान, संगठन विस्तार और प्रमुख गतिविधियों का समन्वय।" }
    ]
  },
  activeMember: {
    title: "Active Member",
    tagline: "Foundation के सक्रिय सदस्य के रूप में सेवा कार्यों और सामाजिक अभियानों में भागीदारी",
    description: "फाउंडेशन के सक्रिय सदस्य के रूप में जुड़कर सेवा कार्यों, कार्यक्रमों और सामाजिक अभियानों में भाग लें।",
    levels: [
      { id: "am_1", name: "Active Member", amount: 501, desc: "Foundation के सक्रिय सदस्य के रूप में सेवा कार्यों और अभियानों में भागीदारी।" },
      { id: "am_2", name: "Active Member with Certificate", amount: 1001, desc: "सदस्यता प्रमाणपत्र सहित सक्रिय सदस्यता।" }
    ]
  },
  vigilance: {
    title: "Vigilance Department",
    tagline: "जागरूकता, सत्यापन, अनुशासन, सहायता, Fraud Awareness और सामाजिक सुरक्षा",
    description: "जागरूकता, सत्यापन, अनुशासन, सहायता, Fraud Awareness और सामाजिक सुरक्षा से जुड़े कार्यों में योगदान दें।",
    levels: [
      { id: "vd_1", name: "Local Volunteer", amount: 501, desc: "जागरूकता, सूचना, सत्यापन एवं सामाजिक अनुशासन से जुड़े स्थानीय कार्य।" },
      { id: "vd_2", name: "Volunteer with ID Card", amount: 1001, desc: "ID Card सहित Vigilance Volunteer के रूप में सेवा।" },
      { id: "vd_3", name: "District Coordinator", amount: 2100, desc: "जिला स्तर पर Vigilance Awareness, Verification और Reporting Coordination." },
      { id: "vd_4", name: "State Coordinator", amount: 11000, desc: "राज्य स्तर पर Vigilance टीम और अभियान का समन्वय।" },
      { id: "vd_5", name: "National Coordinator", amount: 51000, desc: "राष्ट्रीय स्तर पर Vigilance Department की Strategy, Monitoring और Coordination." }
    ]
  },
  sevaNetwork: {
    title: "Sanatan Seva Network",
    tagline: "Professional सेवा, सलाह या सहयोग समाजहित में नियमित योगदान",
    description: "Doctor, Advocate, Teacher, Businessman, Technical Expert या अन्य Professional अपनी सेवा, सलाह या सहयोग समाजहित में दे सकते हैं।",
    levels: [
      { id: "sn_1", name: "Professional Registration", amount: 1100, desc: "Doctor, Advocate, Teacher, Business, Technical या अन्य Professional सेवा नेटवर्क में जुड़ें।" },
      { id: "sn_2", name: "Certificate सहित", amount: 2100, desc: "प्रमाणपत्र सहित Sanatan Seva Network Member." },
      { id: "sn_3", name: "Special Service Partner", amount: 5100, desc: "विशेष सेवा सहयोगी के रूप में समाजहित में नियमित या विशेष सहयोग।" }
    ],
    professions: [
      "Doctor", "Advocate", "Teacher", "Businessman", "Technical Expert", "CA / Accountant", "Media / Artist", "Social Worker", "Other Service Provider"
    ]
  },
  patronMember: {
    title: "Supporting / Patron Member",
    tagline: "Foundation को मार्गदर्शन एवं आर्थिक सहयोग देने वाले विशेष सदस्य",
    description: "फाउंडेशन के कार्यों को आर्थिक, सामाजिक एवं मार्गदर्शक सहयोग देने हेतु विशेष सदस्य के रूप में जुड़ें।",
    levels: [
      { id: "pm_1", name: "Supporting Member", amount: 21000, desc: "Foundation के सेवा कार्यों में विशेष सहयोग।" },
      { id: "pm_2", name: "Patron Member", amount: 51000, desc: "Foundation को मार्गदर्शन एवं आर्थिक सहयोग देने वाले विशेष सदस्य।" },
      { id: "pm_3", name: "Chief Patron / Special Patron", amount: 100001, desc: "Foundation के प्रमुख सहयोगी एवं संरक्षक सदस्य।" }
    ]
  }
};
