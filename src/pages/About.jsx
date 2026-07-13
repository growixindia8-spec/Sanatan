import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ArrowLeft, Check, Landmark, ShieldCheck, Award, FileText, FileCheck, CheckCircle,
  Search, Eye, Download, UserCheck, Users, BookOpen, Heart, Calendar, Lock, AlertTriangle,
  Mail, Phone, Shield, FileSpreadsheet, ChevronRight, X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Import Reusable Components
import Header from '../components/Header';
import FinalCTA from '../components/FinalCTA';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';
import { api } from '../lib/apiClient';

export default function About() {
  const { hash } = useLocation();

  // Scroll to Hash coordinates if available, otherwise scroll to top
  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 150);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [hash]);

  // Certificates list
  const certificates = [
    { code: "SEC8", title: "Section 8 Licence", authority: "Ministry of Corporate Affairs" },
    { code: "CIN", title: "Certificate of Incorporation (CIN)", authority: "Registrar of Companies" },
    { code: "PAN", title: "PAN", authority: "Income Tax Department" },
    { code: "TAN", title: "TAN", authority: "Income Tax Department" },
    { code: "DARPAN", title: "NGO Darpan Registration", authority: "Niti Aayog" },
    { code: "CSR", title: "CSR Registration", authority: "MCA — CSR-1" },
    { code: "12A", title: "12A Registration", authority: "Income Tax Department" },
    { code: "80G", title: "80G Registration", authority: "Income Tax Department" },
    { code: "ISO", title: "ISO Certification", authority: "ISO 9001:2015 (यदि उपलब्ध हो)" },
    { code: "MSME", title: "MSME Registration", authority: "Udyam (यदि उपलब्ध हो)" }
  ];

  // Inspirations list
  const inspirations = [
    { name: "स्वामी विवेकानंद (Swami Vivekananda)", desc: "युवा चेतना, अध्यात्म और भारतीय संस्कृति के प्रतीक", photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400" },
    { name: "छत्रपति शिवाजी महाराज (Shivaji Maharaj)", desc: "राष्ट्रधर्म, स्वराज्य और स्वाभिमान के अद्वितीय प्रतीक", photo: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400" },
    { name: "महाराणा प्रताप (Maharana Pratap)", desc: "अदम्य साहस, स्वतंत्रता और स्वाभिमान के पर्याय", photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400" },
    { name: "आदि शंकराचार्य (Adi Shankaracharya)", desc: "सनातन धर्म के पुनरुद्धारक और ज्ञान के पुंज", photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400" },
    { name: "स्वामी दयानंद सरस्वती (Dayanand Saraswati)", desc: "वैदिक संस्कृति के संवाहक एवं समाज सुधारक", photo: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400" },
    { name: "मदन मोहन मालवीय (Madan Mohan Malaviya)", desc: "शिक्षा, राष्ट्रसेवा और सनातन संस्कृति के पोषक", photo: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400" }
  ];

  // Financial transparency items
  const financialItems = [
    "Annual Financial Report",
    "Audit Report",
    "Income & Expenditure Statement",
    "Balance Sheet",
    "Fund Utilization Summary"
  ];

  // Activity reports list
  const activityItems = [
    "Ann Seva Reports",
    "Medical Camps",
    "Education Support",
    "Women Support",
    "Disaster Relief",
    "Plantation Drives",
    "Gau Seva Activities",
    "Awareness Campaigns"
  ];

  // Year filters
  const [financialYear, setFinancialYear] = useState('2025-26');
  const [activityYear, setActivityYear] = useState('2025-26');

  // Verification Portal state
  const [verificationType, setVerificationType] = useState('member');
  const [verificationId, setVerificationId] = useState('');
  const [verificationResult, setVerificationResult] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    if (!verificationId.trim()) return;
    setIsVerifying(true);
    setVerificationResult(null);

    setTimeout(() => {
      setIsVerifying(false);
      const isVol = verificationId.toUpperCase().includes('VOL');
      const isMem = verificationId.toUpperCase().includes('MEM');
      const isVig = verificationId.toUpperCase().includes('VIG');
      const isCert = verificationId.toUpperCase().includes('CERT') || verificationId.toUpperCase().includes('SEC');

      let resType = "Verified Volunteer";
      let name = "Amit Sharma";
      let detail = "Sanatani Sena ID: VOL-2026-0897";
      let date = "12-Jan-2026";
      let status = "Active / Active Duty";

      if (verificationType === 'member' || isMem) {
        resType = "Verified General Member";
        name = "Rajesh Mishra";
        detail = "Membership ID: MEM-2026-4412";
        date = "18-Feb-2026";
        status = "Active Member";
      } else if (verificationType === 'vigilance' || isVig) {
        resType = "Verified Vigilance Officer";
        name = "Vikram Pratap Singh";
        detail = "Vigilance ID: VIG-2026-0045";
        date = "01-Jan-2026";
        status = "Active Field Officer";
      } else if (verificationType === 'certificate' || isCert) {
        resType = "Verified Certificate";
        name = "Section 8 Licence (SEC8-2026)";
        detail = "Registration Number: 141289 / MCA License";
        date = "05-Jan-2024";
        status = "Active / Statutory Compliance OK";
      }

      setVerificationResult({
        type: resType,
        name: name,
        idCode: verificationId.toUpperCase(),
        detail: detail,
        issueDate: date,
        status: status,
        verified: true
      });
    }, 1200);
  };

  // Certificate / OTP Modal State
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [selectedCert, setSelectedCert] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [authError, setAuthError] = useState('');

  const openCertModal = (cert) => {
    setSelectedCert(cert);
    setPhoneNumber('');
    setOtpSent(false);
    setOtpCode('');
    setOtpVerified(false);
    setAuthError('');
    setIsOtpModalOpen(true);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!phoneNumber || phoneNumber.length < 10) {
      setAuthError('कृपया सही 10-अंकीय मोबाइल नंबर दर्ज करें।');
      return;
    }
    setAuthError('');
    try {
      await api.sendOtp(phoneNumber, 'certificate-verification');
      setOtpSent(true);
    } catch (err) {
      setAuthError(err.message || 'OTP भेजने में त्रुटि। कृपया पुनः प्रयास करें।');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await api.verifyOtp(phoneNumber, otpCode, 'certificate-verification');
      if (res.success) {
        setOtpVerified(true);
      } else {
        setAuthError(res.message || 'गलत OTP।');
      }
    } catch (err) {
      setAuthError(err.message || 'गलत OTP! (Test Mode में सही OTP: 123456 है)');
    }
  };

  // PDF Viewer Modal State
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfTitle, setPdfTitle] = useState('');
  const [pdfContent, setPdfContent] = useState('');

  const openPdfViewer = (title, year, type = 'document') => {
    setPdfTitle(`${title} (${year})`);
    if (type === 'financial') {
      setPdfContent(`
        सनातन धर्म मानव कल्याण फाउंडेशन (Section 8 Co.)
        वित्तीय रिपोर्ट संदर्भ: ${title}
        वित्तीय वर्ष: ${year}
        
        [SUMMARY STATEMENT]
        कुल प्राप्त सहयोग राशि (Total Contributions): ₹48,50,000.00
        वितरित सेवा फंड (Service Utilized Funds): ₹42,20,000.00
        संचालन एवं वैधानिक व्यय (Compliance & Admin): ₹3,80,000.00
        सुरक्षित कोष (Reserve Funds): ₹2,50,000.00
        
        [AUDIT SUMMARY]
        • सभी वित्तीय संव्यवहार अधिकृत खातों के माध्यम से संपन्न हुए हैं।
        • 12A एवं 80G के अंतर्गत सभी दानकर्ताओं को रसीदें जारी की गई हैं।
        • MCA और आयकर विभाग के दिशा-निर्देशों के अनुरूप ऑडिट पूरा कर लिया गया है।
      `);
    } else {
      setPdfContent(`
        सनातन धर्म मानव कल्याण फाउंडेशन
        गतिविधि रिपोर्ट संदर्भ: ${title}
        रिपोर्ट वर्ष: ${year}
        
        [ACTIVITY DETAILS & SUMMARY]
        • अभियान / सेवा का नाम: ${title}
        • लाभार्थी (Beneficiaries Reached): 12,000+ व्यक्ति एवं परिवार
        • मुख्य क्षेत्र: खाद्यान्न वितरण, स्वास्थ्य शिविर एवं गौ सेवा
        • स्वयंसेवक सहभागिता (Volunteers Joined): 350+ सनातन सेना सदस्य
        
        [PHOTO & VIDEO REFERENCE METADATA]
        - Google Drive Storage URI: /content/reports/media/${year}/${title.replace(/\s+/g, '_')}
        - Broadcast Videos: 12 Active Clips linked inside members portal.
      `);
    }
    setPdfModalOpen(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cream text-charcoal font-sans antialiased">

      {/* Navigation Header */}
      <Header />

      {/* PAGE HERO */}
      <section className="bg-gradient-to-b from-white to-[#FBF1E7] border-b border-gray-100 py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back to Home Link */}
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-1.5 text-gray-500 hover:text-saffron transition-colors text-sm font-semibold">
              <ArrowLeft size={16} />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="text-center max-w-4xl mx-auto">
            {/* Page Heading */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-charcoal tracking-wide mb-4">
              About Us
            </h1>

            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-saffron/10 border border-saffron/20 text-saffron text-sm font-bold tracking-wide mb-6">
              <span>🚩 Trust · Transparency · Sanatan Sewa</span>
            </div>

            {/* Subtext line */}
            <p className="text-gray-600 font-devanagari text-[17px] md:text-xl leading-relaxed max-w-3xl mx-auto text-balance">
              सनातन धर्म मानव कल्याण फाउंडेशन — सेवा, संस्कार और सामाजिक उत्तरदायित्व को समर्पित एक पंजीकृत संस्था।
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 1 — FOUNDATION INTRODUCTION (हमारा परिचय) */}
      <section id="introduction" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

            {/* Left Column - Text Info */}
            <div className="w-full lg:w-1/2">
              <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
                FOUNDATION INTRODUCTION
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-0.5">
                हमारा परिचय
              </h2>
              <span className="text-sm text-gray-400 font-semibold tracking-wide uppercase block">
                Our Introduction
              </span>

              {/* Highlighted line */}
              <div className="border-l-4 border-saffron pl-4 py-2 bg-saffron/5 my-6 rounded-r-xl">
                <p className="text-saffron font-devanagari font-bold text-lg md:text-xl">
                  🚩 सेवा ही सनातन • समर्पण ही हमारा धर्म
                </p>
              </div>

              {/* Hindi Paragraphs */}
              <div className="space-y-5 text-gray-700 font-devanagari leading-relaxed text-[15px] md:text-base">
                <p>
                  सनातन धर्म मानव कल्याण फाउंडेशन सेवा, संस्कार, सामाजिक उत्तरदायित्व एवं मानव कल्याण को समर्पित एक पंजीकृत संस्था है। हमारा उद्देश्य सनातन संस्कृति एवं भारतीय मूल्यों के संरक्षण के साथ-साथ समाज के विभिन्न वर्गों तक सेवा, सहयोग एवं जागरूकता पहुँचाना है।
                </p>
                <p>
                  हम अन्न सेवा के माध्यम से "कोई भूखा न सोए" के संकल्प, स्वास्थ्य सहायता, शिक्षा एवं संस्कार, महिला सुरक्षा एवं सम्मान, गौ सेवा, पर्यावरण संरक्षण, आपदा राहत तथा अन्य सामाजिक एवं मानवीय अभियानों के माध्यम से सकारात्मक परिवर्तन लाने हेतु कार्यरत हैं।
                </p>
                <p>
                  हमारा उद्देश्य केवल सहायता प्रदान करना नहीं, बल्कि सेवा, संगठन, जागरूकता एवं जनसहभागिता के माध्यम से एक सशक्त, संस्कारित, आत्मनिर्भर एवं उत्तरदायी समाज के निर्माण में सक्रिय योगदान देना है।
                </p>
              </div>
            </div>

            {/* Right Column - Image + Overlapping Badge */}
            <div className="w-full lg:w-1/2 flex justify-center">
              <div className="relative w-full max-w-[480px]">
                {/* Visual Image */}
                <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-xl border-4 border-double border-saffron/40">
                  <img
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800"
                    alt="Sanatan Seva Foundation Activity"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                </div>

                {/* Overlapping Badge Pill (Matches verified trust style) */}
                <div className="absolute bottom-6 -right-2 z-30 bg-white shadow-lg border border-green-500/30 pl-3 pr-5 py-2 rounded-l-full flex items-center gap-2 transform hover:translate-x-1 transition-transform">
                  <div className="w-5.5 h-5.5 rounded-full bg-[#2E7D32] flex items-center justify-center text-white">
                    <Check size={12} strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-extrabold text-[#2E7D32] tracking-wider uppercase">
                    REGISTERED NGO
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2 — VISION & MISSION */}
      <section id="vision-mission" className="py-20 bg-[#FBF1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              VISION & MISSION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari tracking-wide">
              हमारा दृष्टिकोण एवं मिशन
            </h2>
          </div>

          {/* Cards Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">

            {/* Card 1 - Vision */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-saffron/10 hover:border-saffron/30 hover:shadow-lg transition-all duration-300">
              <span className="text-xs font-bold text-saffron uppercase tracking-widest block mb-2">Vision</span>
              <h3 className="text-2xl font-bold text-maroon font-devanagari mb-4 border-b border-gray-100 pb-2">
                हमारा दृष्टिकोण
              </h3>
              <div className="space-y-4 text-gray-700 font-devanagari leading-relaxed text-sm md:text-base">
                <p>
                  एक ऐसे सशक्त, जागरूक, संस्कारित एवं आत्मनिर्भर समाज का निर्माण करना जहाँ सेवा, सुरक्षा, संस्कार एवं सनातन मूल्यों के आधार पर प्रत्येक व्यक्ति सम्मानपूर्वक जीवन जी सके।
                </p>
                <p>
                  हमारा विश्वास है कि जब समाज स्वयं समाज के प्रति अपनी जिम्मेदारी को समझता है और सेवा को अपना कर्तव्य मानता है, तभी वास्तविक एवं स्थायी परिवर्तन संभव होता है।
                </p>
              </div>
            </div>

            {/* Card 2 - Mission */}
            <div className="bg-white rounded-2xl p-8 shadow-md border border-saffron/10 hover:border-saffron/30 hover:shadow-lg transition-all duration-300">
              <span className="text-xs font-bold text-saffron uppercase tracking-widest block mb-2">Mission</span>
              <h3 className="text-2xl font-bold text-maroon font-devanagari mb-4 border-b border-gray-100 pb-2">
                हमारा मिशन
              </h3>
              <div className="space-y-4 text-gray-700 font-devanagari leading-relaxed text-sm md:text-base">
                <p>
                  सनातन धर्म मानव कल्याण फाउंडेशन का मिशन सेवा, संस्कार, सामाजिक जागरूकता एवं मानव कल्याण के माध्यम से समाज में सकारात्मक परिवर्तन लाना है।
                </p>
                <p>
                  हम सनातन संस्कृति एवं मूल्यों के संरक्षण, जरूरतमंद लोगों तक सहायता पहुँचाने, सेवा भावना को प्रोत्साहित करने तथा जनसहभागिता के माध्यम से एक संगठित, जिम्मेदार एवं सशक्त समाज के निर्माण हेतु कार्य करने के लिए प्रतिबद्ध हैं।
                </p>
              </div>
            </div>

          </div>

          {/* Highlighted centered line */}
          <div className="text-center bg-white border border-saffron/20 py-4 px-6 rounded-xl max-w-3xl mx-auto shadow-sm">
            <p className="text-maroon font-devanagari font-bold text-base md:text-lg">
              🚩 सेवा • सुरक्षा • संस्कार • धर्म — मानव कल्याण हमारा कर्म
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 3 — LEADERSHIP (हमारा नेतृत्व) */}
      <section id="leadership" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              LEADERSHIP
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-6">
              हमारा नेतृत्व
            </h2>

            {/* Centered quote */}
            <div className="max-w-3xl mx-auto px-4 italic text-gray-600 font-devanagari text-sm md:text-base leading-relaxed bg-[#FFF8F0] py-4 rounded-xl border-l-4 border-maroon">
              "हमारा नेतृत्व सेवा, पारदर्शिता, उत्तरदायित्व एवं जनसहभागिता के मूल्यों पर आधारित है। हमारा उद्देश्य केवल संस्था का संचालन करना नहीं, बल्कि समाज के साथ मिलकर सकारात्मक परिवर्तन की दिशा में कार्य करना है।"
            </div>
          </div>

          {/* Two leadership cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* Card 1 - Founder */}
            <div className="bg-white border-2 border-dashed border-gray-200 hover:border-saffron/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 shadow-sm transition-all duration-300">

              {/* Photo Column */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-double border-saffron mb-3 shadow-md">
                  <img
                    src="	https://sana
                    .0andharmmanavkalyanfoundation.org/__l5…2bd14313-f5ae-4bf8-ac7e-16c969234eff/founder.jpeg"
                    alt="Sanjay A Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-charcoal text-lg text-center leading-tight">Sanjay A Singh</h4>
                <p className="text-xs text-saffron font-semibold text-center mt-1 uppercase">Founder | Social Entrepreneur</p>
              </div>

              {/* Details Column */}
              <div className="flex-1 flex flex-col justify-between">

                {/* Stacked Quotes */}
                <div className="space-y-3 mb-6">
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "सेवा केवल सहायता नहीं, बल्कि समाज के प्रति हमारी जिम्मेदारी है। जब हम संस्कार, सेवा और सामाजिक उत्तरदायित्व को अपनाते हैं, तभी एक सशक्त, जागरूक एवं संवेदनशील समाज का निर्माण संभव होता है।"
                    </p>
                  </div>
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "सनातन केवल आस्था नहीं, बल्कि जीवन जीने की एक संस्कृति, एक विचारधारा और मानव कल्याण का शाश्वत मार्ग है।"
                    </p>
                  </div>
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "हमारा विश्वास है कि समाज की वास्तविक शक्ति संगठन, सहयोग और जनसहभागिता में निहित है। जब अच्छे लोग एक उद्देश्य के लिए एकजुट होते हैं, तो सकारात्मक परिवर्तन अवश्य होता है।"
                    </p>
                  </div>
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "आइए, सेवा, संस्कार और सनातन मूल्यों के साथ मिलकर ऐसा समाज बनाएं, जहाँ सहायता, सम्मान और मानवता केवल शब्द नहीं, बल्कि प्रत्येक व्यक्ति के जीवन का हिस्सा बनें।"
                    </p>
                  </div>
                </div>

                {/* Tags below */}
                <div className="space-y-1.5 border-t border-gray-100 pt-4">
                  <p className="text-xs text-saffron font-bold font-devanagari">
                    🚩 सेवा • सुरक्षा • संस्कार • धर्म — मानव कल्याण हमारा कर्म
                  </p>
                  <p className="text-xs text-maroon font-bold font-devanagari">
                    🚩 गर्व से कहो हम सनातनी हैं • जय श्री राम • हर हर महादेव
                  </p>
                </div>

              </div>

            </div>

            {/* Card 2 - Co-Founder */}
            <div className="bg-white border-2 border-dashed border-gray-200 hover:border-saffron/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 shadow-sm transition-all duration-300">

              {/* Photo Column */}
              <div className="flex flex-col items-center flex-shrink-0">
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-double border-saffron mb-3 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400"
                    alt="Krishnam Singh"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-bold text-charcoal text-lg text-center leading-tight">Krishnam Singh</h4>
                <p className="text-xs text-saffron font-semibold text-center mt-1 uppercase">Co-Founder & Director</p>
              </div>

              {/* Details Column */}
              <div className="flex-1 flex flex-col justify-between">

                {/* Stacked Quotes */}
                <div className="space-y-3 mb-6">
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "हम केवल बेहतर भविष्य की कल्पना नहीं करते, बल्कि उसे साकार करने का संकल्प भी लेते हैं। सनातन मूल्यों, युवा शक्ति और सेवा भाव के साथ समाज में सकारात्मक परिवर्तन लाना ही हमारा लक्ष्य है।"
                    </p>
                  </div>
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "जब युवा जागरूक होते हैं, तो समाज सशक्त बनता है; और जब समाज संगठित होता है, तो राष्ट्र प्रगति के नए आयाम स्थापित करता है।"
                    </p>
                  </div>
                  <div className="bg-cream/40 p-3 rounded-lg border-l-2 border-saffron">
                    <p className="text-[13px] text-gray-700 font-devanagari italic leading-relaxed">
                      "आइए, हम सभी सेवा, समर्पण और सामाजिक उत्तरदायित्व के साथ मिलकर आने वाली पीढ़ियों के लिए एक सुरक्षित, संस्कारित और सशक्त भारत के निर्माण में अपना योगदान दें।"
                    </p>
                  </div>
                </div>

                {/* Highlighted Tag Line */}
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-xs text-saffron font-bold font-devanagari">
                    🚩 युवा शक्ति • सेवा • संस्कार • राष्ट्र निर्माण
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

      {/* SECTION 4 — OUR INSPIRATIONS (हमारे प्रेरणास्रोत) */}
      <section id="inspirations" className="py-20 bg-[#FBF1E7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              OUR INSPIRATIONS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-4">
              हमारे प्रेरणास्रोत
            </h2>
            <div className="max-w-3xl mx-auto space-y-2 text-gray-600 font-devanagari text-sm md:text-base leading-relaxed">
              <p>
                वे महान व्यक्तित्व जिनके विचार, तप, संघर्ष, नेतृत्व, सेवा एवं राष्ट्रधर्म के प्रति समर्पण ने हमें सनातन, समाज और संस्कृति के संरक्षण, संवर्धन एवं जनकल्याण के लिए निरंतर कार्य करने की प्रेरणा दी है।
              </p>
              <p>
                उनके आदर्श, त्याग एवं जीवन मूल्य हमारे लिए सेवा, संस्कार, सामाजिक उत्तरदायित्व और राष्ट्र निर्माण के मार्गदर्शक हैं।
              </p>
            </div>
          </div>

          {/* Grid of equal-size portrait cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            {inspirations.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl overflow-hidden shadow-sm border border-saffron/10 hover:border-saffron/40 hover:shadow-md transition-all duration-300 flex flex-col group"
              >
                {/* Card Image Wrapper */}
                <div className="aspect-[3/4] w-full overflow-hidden relative bg-gray-100">
                  <img
                    src={item.photo}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                </div>

                {/* Content */}
                <div className="p-3 text-center flex-1 flex flex-col justify-between">
                  <h4 className="font-bold font-devanagari text-charcoal text-xs md:text-sm tracking-wide leading-tight mb-1">
                    {item.name.split(' (')[0]}
                  </h4>
                  <span className="text-[10px] text-gray-400 font-medium block leading-tight font-devanagari">
                    {item.desc}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Important Notice Box */}
          <div className="bg-white/80 backdrop-blur-sm border border-yellow-500/20 p-4 rounded-xl max-w-4xl mx-auto text-center shadow-inner">
            <p className="text-[11px] md:text-xs text-gray-500 font-devanagari leading-relaxed">
              * उपरोक्त सभी व्यक्तित्वों का उल्लेख केवल सम्मान, प्रेरणा एवं वैचारिक संदर्भ के उद्देश्य से किया गया है। संस्था का उनसे किसी प्रकार का आधिकारिक, संगठनात्मक अथवा राजनीतिक संबंध होना आवश्यक नहीं है।
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 5 — TRUST & TRANSPARENCY (पारदर्शिता एवं विश्वास) */}
      <section id="transparency" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              TRUST & TRANSPARENCY
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-2">
              पारदर्शिता एवं विश्वास
            </h2>
            <h3 className="text-saffron font-devanagari font-bold text-lg md:text-xl mb-4">
              विश्वास हमारी सबसे बड़ी पूंजी है।
            </h3>
            <p className="max-w-3xl mx-auto text-gray-600 font-devanagari text-[15px] leading-relaxed">
              सनातन धर्म मानव कल्याण फाउंडेशन पारदर्शिता, जवाबदेही, नैतिक कार्यप्रणाली एवं उत्तरदायित्व के सिद्धांतों पर कार्य करने के लिए प्रतिबद्ध है। हमारा प्रयास है कि संस्था की गतिविधियों, वित्तीय उपयोग एवं प्रमुख दस्तावेजों से संबंधित आवश्यक जानकारी समय-समय पर सार्वजनिक रूप से उपलब्ध कराई जाए।
            </p>
          </div>

          {/* 3x3 numbered grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { num: "01", title: "Registered & Verified Organization", desc: "Section 8 Company · MCA Registered" },
              { num: "02", title: "Section 8 • NGO Darpan • CSR • 12A • 80G", desc: "All statutory registrations active" },
              { num: "03", title: "Donation Transparency", desc: "Every contribution tracked & reported" },
              { num: "04", title: "Financial Reporting", desc: "Audited annual statements" },
              { num: "05", title: "Activity Reports", desc: "Published service & impact records" },
              { num: "06", title: "Secure Payment System", desc: "Encrypted, PCI-grade gateways" },
              { num: "07", title: "Volunteer & Member Verification", desc: "ID-verified Sanatani Sena" },
              { num: "08", title: "Accountability & Compliance", desc: "Statutory & ethical adherence" },
              { num: "09", title: "Public Trust & Transparency", desc: "Open communication with donors" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-[#FFF8F0] p-6 rounded-xl border border-saffron/10 hover:border-saffron/30 shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
              >
                {/* Number */}
                <span className="text-3xl font-extrabold text-saffron/40 font-sans leading-none">{item.num}</span>

                {/* Text content */}
                <div>
                  <h4 className="font-bold text-charcoal text-base mb-1 tracking-wide">{item.title}</h4>
                  <p className="text-xs text-gray-500 font-medium">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Centered Commit Card */}
          <div className="bg-gradient-to-tr from-maroon via-[#9E1B18] to-maroon text-white rounded-2xl p-8 max-w-3xl mx-auto shadow-xl text-center relative overflow-hidden border-2 border-yellow-500/20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,107,0,0.15),transparent)]" />
            <div className="relative z-10">
              <span className="text-[10px] text-yellow-400 font-bold uppercase tracking-widest block mb-2">Our Commitment To Transparency</span>
              <h3 className="text-2xl font-bold font-devanagari mb-4 tracking-wide">
                सेवा के साथ विश्वास, पारदर्शिता एवं उत्तरदायित्व
              </h3>
              <p className="text-sm font-devanagari leading-relaxed text-gray-200">
                हम संस्था की गतिविधियों, सेवा अभियानों, सहयोग राशि के उपयोग एवं उपलब्ध संसाधनों से संबंधित महत्वपूर्ण जानकारी समय-समय पर सार्वजनिक रूप से उपलब्ध कराने का प्रयास करते हैं। हमारा उद्देश्य केवल सेवा करना ही नहीं, बल्कि <strong className="text-white font-bold">विश्वास, पारदर्शिता और उत्तरदायित्व</strong> के साथ सेवा करना है।
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* SECTION 6 — REGISTRATIONS & CERTIFICATES (पंजीकरण एवं प्रमाणपत्र) */}
      <section id="certificates" className="py-20 bg-[#FBF1E7] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              REGISTRATIONS & CERTIFICATES
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-4">
              पंजीकरण एवं प्रमाणपत्र
            </h2>
            <p className="max-w-3xl mx-auto text-gray-600 font-devanagari text-base">
              हमारी संस्था विभिन्न वैधानिक एवं नियामकीय पंजीकरणों के अंतर्गत कार्यरत है। संस्था से संबंधित प्रमाणपत्र एवं पंजीकरण विवरण नीचे उपलब्ध हैं।
            </p>
          </div>

          {/* Grid of certificates (Home page Trust Badges style) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-sm border border-gray-100 hover:border-saffron/20 hover:shadow-md transition-all duration-300 p-5 text-center flex flex-col justify-between group"
              >
                <div>
                  {/* Icon badge */}
                  <div className="w-12 h-12 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                    <FileCheck size={22} />
                  </div>

                  {/* Short code badge code */}
                  <span className="inline-block px-2.5 py-0.5 rounded bg-gray-100 text-[10px] text-gray-500 font-bold uppercase mb-2">
                    {cert.code}
                  </span>

                  {/* Title & Authority */}
                  <h4 className="font-bold text-charcoal text-[14px] leading-snug mb-1">{cert.title}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wide uppercase mb-4">{cert.authority}</p>
                </div>

                {/* Primary Button View Certificate */}
                <button
                  onClick={() => openCertModal(cert)}
                  className="w-full bg-[#FFF8F0] hover:bg-saffron hover:text-white border border-saffron/30 text-saffron font-bold text-xs py-2 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Eye size={13} />
                  <span>View Certificate</span>
                </button>
              </div>
            ))}
          </div>

          {/* Disclaimer line */}
          <div className="text-center">
            <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-devanagari">
              <Lock size={12} className="text-gray-400" />
              <span>सुरक्षा एवं सत्यापन उद्देश्य से प्रमाणपत्र देखने हेतु Login / OTP Verification आवश्यक है।</span>
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 7 — VERIFICATION SERVICES (सत्यापन सेवाएँ) */}
      <section id="verification" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row gap-12 items-stretch">

            {/* Left Column - Information */}
            <div className="w-full lg:w-1/2 flex flex-col justify-between">
              <div>
                <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
                  VERIFICATION SERVICES
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-4">
                  सत्यापन सेवाएँ
                </h2>
                <p className="text-gray-600 font-devanagari mb-6">
                  Website par nimn Verification Services uplabdh rahengi:
                </p>

                {/* List of 4 verification links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                  {[
                    { title: "Certificate Verification", key: "certificate" },
                    { title: "Member Verification", key: "member" },
                    { title: "Volunteer ID Verification", key: "volunteer" },
                    { title: "Vigilance ID Verification", key: "vigilance" }
                  ].map((service) => (
                    <button
                      key={service.key}
                      onClick={() => {
                        setVerificationType(service.key);
                        setVerificationId(
                          service.key === 'member' ? 'MEM-2026-4412' :
                            service.key === 'volunteer' ? 'VOL-2026-0897' :
                              service.key === 'vigilance' ? 'VIG-2026-0045' : 'SEC8-2026'
                        );
                        setVerificationResult(null);
                      }}
                      className={`p-4 rounded-xl border text-left flex items-center justify-between transition-all group ${verificationType === service.key
                        ? 'border-saffron bg-[#FFF8F0] shadow-sm'
                        : 'border-gray-200 hover:border-saffron/30 hover:bg-cream/20'
                        }`}
                    >
                      <span className={`font-bold text-sm ${verificationType === service.key ? 'text-saffron' : 'text-charcoal'}`}>
                        {service.title}
                      </span>
                      <ChevronRight size={16} className={`transition-transform ${verificationType === service.key ? 'text-saffron translate-x-1' : 'text-gray-400 group-hover:translate-x-1'
                        }`} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Note */}
              <div className="bg-[#FBF1E7] border border-saffron/10 p-4 rounded-xl">
                <p className="text-xs text-charcoal font-devanagari font-semibold flex items-center gap-2">
                  <ShieldCheck size={16} className="text-saffron flex-shrink-0" />
                  <span>सभी Verification सुरक्षित Portal के माध्यम से किए जाएंगे।</span>
                </p>
              </div>
            </div>

            {/* Right Column - Active verification form portal mockup */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-gray-100 flex flex-col justify-between h-full relative overflow-hidden">
                {/* Glow ring */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-saffron/5 rounded-full filter blur-xl" />

                <div>
                  {/* Portal Header */}
                  <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                    <div className="w-10 h-10 rounded-xl bg-saffron text-white flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-charcoal text-base tracking-wide uppercase">Verification Portal</h3>
                      <p className="text-[10px] text-gray-400 font-semibold tracking-wider">SECURE VERIFICATION DESK</p>
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleVerify} className="space-y-4 mb-6">
                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">Select Verification Category</label>
                      <select
                        value={verificationType}
                        onChange={(e) => {
                          setVerificationType(e.target.value);
                          setVerificationResult(null);
                          setVerificationId('');
                        }}
                        className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                      >
                        <option value="member">General Member</option>
                        <option value="volunteer">Volunteer ID (Sanatani Sena)</option>
                        <option value="vigilance">Vigilance ID (Vigilance Department)</option>
                        <option value="certificate">Registration Certificate (CIN/SEC8/12A)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2">
                        Enter ID Code / Reference Number
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          value={verificationId}
                          onChange={(e) => setVerificationId(e.target.value)}
                          placeholder={
                            verificationType === 'member' ? 'e.g. MEM-2026-4412' :
                              verificationType === 'volunteer' ? 'e.g. VOL-2026-0897' :
                                verificationType === 'vigilance' ? 'e.g. VIG-2026-0045' : 'e.g. SEC8-2026'
                          }
                          className="w-full rounded-lg border border-gray-300 bg-white pl-3 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                          required
                        />
                        <button type="submit" className="absolute right-2 top-1.5 p-1.5 text-gray-400 hover:text-saffron transition-colors">
                          <Search size={16} />
                        </button>
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1.5 italic">
                        * Try testing with: <strong className="text-saffron">MEM-2026-4412</strong> or <strong className="text-saffron">VOL-2026-0897</strong>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isVerifying}
                      className="w-full bg-saffron hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-lg shadow-md shadow-orange-500/10 active:scale-95 transition-all flex items-center justify-center gap-2"
                    >
                      {isVerifying ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Verifying Identity...</span>
                        </>
                      ) : (
                        <>
                          <ShieldCheck size={16} />
                          <span>Verify Now</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>

                {/* Verification Results Panel */}
                <div className="min-h-[120px] bg-gray-50 rounded-xl p-4 flex flex-col justify-center border border-gray-100">
                  {verificationResult ? (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-3"
                    >
                      {/* Success tag */}
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 rounded-full bg-green-100 text-green-700 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                          <CheckCircle size={10} />
                          <span>VERIFIED & AUTHENTIC</span>
                        </span>
                        <span className="text-[11px] text-gray-400 font-semibold">{verificationResult.idCode}</span>
                      </div>
                      {/* Details */}
                      <div>
                        <p className="text-xs text-gray-400 font-semibold uppercase leading-none">Entity Type</p>
                        <p className="text-sm font-bold text-charcoal mt-1">{verificationResult.type}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2 border-t border-gray-200/50 pt-2.5">
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase leading-none">Name / Title</p>
                          <p className="text-xs font-bold text-charcoal mt-0.5">{verificationResult.name}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-gray-400 font-semibold uppercase leading-none">Status</p>
                          <p className="text-xs font-bold text-green-600 mt-0.5">{verificationResult.status}</p>
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <div className="text-center py-4">
                      <ShieldCheck size={28} className="text-gray-300 mx-auto mb-2" />
                      <p className="text-xs text-gray-400 font-semibold uppercase">Awaiting ID Verification</p>
                      <p className="text-[11px] text-gray-400 mt-0.5">Please choose a category, type an ID and press Verify.</p>
                    </div>
                  )}
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 8 — FINANCIAL TRANSPARENCY (वित्तीय पारदर्शिता) */}
      <section id="financials" className="py-20 bg-[#FBF1E7] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row with dropdown filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
                FINANCIAL TRANSPARENCY
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-2">
                वित्तीय पारदर्शिता
              </h2>
              <p className="text-gray-600 font-devanagari">
                संस्था समय-समय पर निम्न जानकारी उपलब्ध कराने का प्रयास करेगी:
              </p>
            </div>

            {/* Dropdown Year-wise Filter */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Year:</label>
              <div className="relative">
                <select
                  value={financialYear}
                  onChange={(e) => setFinancialYear(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-sm font-bold text-charcoal hover:border-saffron focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option className="hover:bg-orange-50" value="2025-26">FY 2025-26 (Current)</option>
                  <option className="hover:bg-orange-50" value="2024-25">FY 2024-25</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* List of Financial Items */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {financialItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-saffron/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between text-center group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-saffron/10 text-saffron flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform duration-300">
                    <FileSpreadsheet size={20} />
                  </div>
                  <h4 className="font-bold text-charcoal text-sm mb-1 leading-snug">{item}</h4>
                  <span className="text-[10px] text-gray-400 block mb-6 font-semibold uppercase">{financialYear} Report</span>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-4">
                  <button
                    onClick={() => openPdfViewer(item, financialYear, 'financial')}
                    className="bg-[#FFF8F0] hover:bg-saffron hover:text-white text-saffron border border-saffron/20 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
                    title="View Document"
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </button>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading dummy file: ${item.replace(/\s+/g, '_')}_${financialYear}.pdf`);
                    }}
                    className="bg-gray-50 hover:bg-gray-100 text-charcoal border border-gray-200 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-1 transition-all active:scale-95"
                    title="Download PDF"
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* SECTION 9 — ACTIVITY REPORTS (गतिविधि रिपोर्ट) */}
      <section id="reports" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header row with dropdown filter */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
                ACTIVITY REPORTS
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari mb-2">
                गतिविधि रिपोर्ट
              </h2>
              <p className="text-gray-600 font-devanagari">
                हमारे प्रमुख सेवा अभियानों की रिपोर्ट एवं प्रमुख उपलब्धियाँ यहाँ उपलब्ध रहेंगी।
              </p>
              <span className="inline-block mt-2 text-xs font-bold bg-[#FFF8F0] text-saffron px-2.5 py-1 rounded font-devanagari">
                उदाहरण:
              </span>
            </div>

            {/* Dropdown Year-wise Filter */}
            <div className="flex items-center gap-3">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Select Year:</label>
              <div className="relative">
                <select
                  value={activityYear}
                  onChange={(e) => setActivityYear(e.target.value)}
                  className="rounded-xl border border-gray-200 bg-white pl-4 pr-10 py-2.5 text-sm font-bold text-charcoal hover:border-saffron focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all shadow-sm appearance-none cursor-pointer"
                >
                  <option className="hover:bg-orange-50" value="2025-26">2025-26 (Current)</option>
                  <option className="hover:bg-orange-50" value="2024-25">2024-25</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Grid of Activity reports */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {activityItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-5 border border-gray-200 hover:border-saffron/20 hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Icon */}
                  <div className="w-10 h-10 rounded-lg bg-cream border border-saffron/10 text-saffron flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <BookOpen size={18} />
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-charcoal text-[15px] leading-snug mb-1">{item}</h4>
                  <p className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mb-5">{activityYear} Operations</p>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-2 border-t border-gray-100 pt-3">
                  <button
                    onClick={() => openPdfViewer(item, activityYear, 'activity')}
                    className="bg-[#FFF8F0] hover:bg-saffron hover:text-white text-saffron border border-saffron/20 py-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <Eye size={11} />
                    <span>View PDF</span>
                  </button>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert(`Downloading dummy report: ${item.replace(/\s+/g, '_')}_Report_${activityYear}.pdf`);
                    }}
                    className="bg-gray-50 hover:bg-gray-100 text-charcoal border border-gray-200 py-2 rounded-lg font-bold text-[11px] flex items-center justify-center gap-1 transition-all active:scale-95"
                  >
                    <Download size={11} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Note */}
          <div className="text-center bg-[#FFF8F0] border border-dashed border-saffron/30 py-3 px-4 rounded-lg max-w-xl mx-auto">
            <span className="text-xs text-charcoal font-devanagari font-semibold">
              * प्रत्येक रिपोर्ट के साथ Summary, Photos एवं Videos उपलब्ध कराए जा सकते हैं।
            </span>
          </div>

        </div>
      </section>

      {/* SECTION 10 — POLICIES & COMPLIANCE (नीतियाँ एवं अनुपालन) */}
      <section id="policies" className="py-20 bg-[#FBF1E7] border-t border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              POLICIES & COMPLIANCE
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari">
              नीतियाँ एवं अनुपालन
            </h2>
          </div>

          {/* List link-style items */}
          <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100 mb-8">
            {[
              "Privacy Policy",
              "Terms & Conditions",
              "Refund & Cancellation Policy",
              "Donation Policy",
              "Grievance Redressal Policy"
            ].map((policy, idx) => (
              <a
                key={idx}
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Policy documents for ${policy} are under review and will be updated dynamically.`);
                }}
                className="flex items-center justify-between p-4.5 text-sm md:text-base font-bold text-charcoal hover:bg-cream/40 hover:text-saffron transition-all group"
              >
                <span>{policy}</span>
                <ChevronRight size={16} className="text-gray-400 group-hover:text-saffron group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </div>

          {/* Disclaimer Box */}
          <div className="bg-white/60 border border-gray-200 p-4.5 rounded-xl max-w-4xl mx-auto text-center shadow-inner">
            <p className="text-[11px] md:text-xs text-gray-500 font-devanagari leading-relaxed">
              <strong>अस्वीकरण (Disclaimer):</strong> हमारी संस्था पारदर्शिता एवं उत्तरदायित्व के सिद्धांतों का पालन करने के लिए प्रतिबद्ध है। उपलब्ध कराई गई जानकारी समय-समय पर अद्यतन की जा सकती है। कुछ दस्तावेज़ सुरक्षा, गोपनीयता अथवा सत्यापन प्रक्रिया के अंतर्गत Login / OTP Verification के पश्चात ही उपलब्ध कराए जा सकते हैं।
            </p>
          </div>

        </div>
      </section>

      {/* SECTION 11 — FOUNDER THOUGHTS (from live site) */}
      <section id="founder-thoughts" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Headings */}
          <div className="text-center mb-12">
            <span className="text-xs text-saffron font-bold tracking-[0.2em] uppercase block mb-1">
              FOUNDER THOUGHTS
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-maroon font-devanagari">
              संस्थापक के विचार
            </h2>
          </div>

          {/* Layout card */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-[#FFF8F0] to-[#FDF4EB] border border-saffron/20 rounded-2xl p-8 shadow-md flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">

            {/* Top decorative badge */}
            <div className="absolute top-4 right-4 bg-saffron/10 border border-saffron/20 px-3 py-1 rounded text-[10px] text-saffron font-bold uppercase tracking-wider">
              Closing Highlight
            </div>

            {/* Photo side */}
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-double border-saffron shadow-lg flex-shrink-0">
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400"
                alt="Founder Sanjay A Singh"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content side */}
            <div className="flex-1 text-center md:text-left">
              <h4 className="font-extrabold text-charcoal text-lg mb-1 leading-none font-sans">Sanjay A Singh</h4>
              <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-4">Founder · Sanatan Dharm Manav Kalyan Foundation</p>

              {/* Stacked Quotes */}
              <div className="space-y-4 mb-6">
                <div className="relative">
                  <span className="absolute -top-3.5 -left-4 text-4xl text-saffron/20 font-serif">“</span>
                  <p className="text-sm text-gray-700 font-devanagari leading-relaxed">
                    "सेवा केवल सहायता नहीं, बल्कि समाज के प्रति हमारी जिम्मेदारी है। जब हम सेवा, संस्कार और सामाजिक उत्तरदायित्व को अपनाते हैं, तभी एक सशक्त एवं जागरूक समाज का निर्माण संभव होता है।"
                  </p>
                </div>
                <div className="relative">
                  <span className="absolute -top-3.5 -left-4 text-4xl text-saffron/20 font-serif">“</span>
                  <p className="text-sm text-gray-700 font-devanagari leading-relaxed">
                    "सनातन केवल आस्था नहीं, बल्कि जीवन जीने की एक संस्कृति, एक विचार और मानव कल्याण का मार्ग है।"
                  </p>
                </div>
              </div>

              {/* Bottom highlighted lines */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2 border-t border-gray-100">
                <span className="text-xs font-bold text-saffron font-devanagari">🚩 गर्व से कहो हम सनातनी हैं</span>
                <span className="text-xs font-bold text-maroon font-devanagari">🚩 जय श्री राम | हर हर महादेव</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* SECTION 12 — FINAL CTA */}
      <FinalCTA />

      {/* SECTION 13 — NEWSLETTER */}
      <Newsletter />

      {/* FOOTER */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <WhatsAppButton />

      {/* MODAL 1: OTP AUTH FOR CERTIFICATES */}
      <AnimatePresence>
        {isOtpModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-md overflow-hidden"
            >

              {/* Header */}
              <div className="bg-[#1A1A1A] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Lock size={18} className="text-saffron" />
                  <span className="font-bold text-sm tracking-wide uppercase">OTP Verification Desk</span>
                </div>
                <button
                  onClick={() => setIsOtpModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6">
                {!otpVerified ? (
                  <div>
                    {/* Selected Certificate Info */}
                    <div className="bg-cream/40 p-4 rounded-xl border border-saffron/15 mb-6 text-center">
                      <span className="inline-block px-2.5 py-0.5 rounded bg-saffron text-white text-[10px] font-bold uppercase mb-1">{selectedCert?.code}</span>
                      <h4 className="font-bold text-charcoal text-base">{selectedCert?.title}</h4>
                      <p className="text-xs text-gray-500 font-semibold mt-0.5 uppercase">{selectedCert?.authority}</p>
                    </div>

                    <p className="text-xs text-gray-500 font-devanagari leading-relaxed text-center mb-6">
                      सुरक्षा एवं सत्यापन उद्देश्य से प्रमाणपत्र देखने हेतु Login / OTP Verification आवश्यक है।
                    </p>

                    {/* Step 1: Input phone */}
                    {!otpSent ? (
                      <form onSubmit={handleSendOtp} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Enter Mobile Number</label>
                          <div className="relative">
                            <span className="absolute left-3 top-2.5 text-sm text-gray-400 font-semibold font-sans">+91</span>
                            <input
                              type="tel"
                              maxLength={10}
                              value={phoneNumber}
                              onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                              placeholder="99999 99999"
                              className="w-full rounded-lg border border-gray-300 bg-white pl-12 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-saffron"
                              required
                            />
                          </div>
                        </div>

                        {authError && (
                          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-devanagari">
                            * {authError}
                          </div>
                        )}

                        <button
                          type="submit"
                          className="w-full bg-saffron hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-lg shadow-md transition-all active:scale-95"
                        >
                          Send OTP code
                        </button>
                      </form>
                    ) : (
                      /* Step 2: Input OTP */
                      <form onSubmit={handleVerifyOtp} className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Enter 6-Digit OTP Code</label>
                          <input
                            type="text"
                            maxLength={6}
                            value={otpCode}
                            onChange={(e) => setOtpCode(e.target.value.replace(/\D/g, ''))}
                            placeholder="123456"
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-center text-lg font-bold tracking-widest focus:outline-none focus:ring-2 focus:ring-saffron"
                            required
                          />
                          <p className="text-[10px] text-gray-400 mt-2 text-center">
                            * Enter test code <strong className="text-saffron">123456</strong> to proceed.
                          </p>
                        </div>

                        {authError && (
                          <div className="p-3 bg-red-50 text-red-600 text-xs rounded-lg font-devanagari">
                            * {authError}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setOtpSent(false)}
                            className="w-full bg-gray-50 hover:bg-gray-100 text-charcoal border border-gray-200 font-bold text-sm py-3 rounded-lg transition-all"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            className="w-full bg-saffron hover:bg-orange-600 text-white font-bold text-sm py-3 rounded-lg shadow-md transition-all active:scale-95"
                          >
                            Verify OTP
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                ) : (
                  /* Step 3: Success & Certificate view mockup */
                  <div className="text-center py-4 space-y-5">

                    {/* Badge verified */}
                    <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-sm">
                      <ShieldCheck size={36} />
                    </div>

                    <div>
                      <h4 className="font-bold text-charcoal text-lg">Verification Successful!</h4>
                      <p className="text-xs text-green-600 font-semibold uppercase mt-0.5">AUTHORIZED ACCESS GRANTED</p>
                    </div>

                    {/* Dummy certificate card */}
                    <div className="border-4 border-double border-yellow-500 bg-[#FFFDFB] p-5 rounded-xl text-left relative shadow-inner overflow-hidden">
                      <div className="absolute inset-1 border border-yellow-500/25 pointer-events-none" />
                      <div className="text-center border-b border-gray-100 pb-2 mb-3">
                        <span className="text-[10px] font-bold text-maroon uppercase tracking-widest font-sans">SANATAN FOUNDATION LEGAL DOCUMENT</span>
                      </div>

                      {/* Text entries */}
                      <div className="space-y-2 text-xs">
                        <p className="text-gray-500 font-semibold">Document: <strong className="text-charcoal font-extrabold">{selectedCert?.title}</strong></p>
                        <p className="text-gray-500 font-semibold">Licensing Authority: <strong className="text-charcoal font-extrabold">{selectedCert?.authority}</strong></p>
                        <p className="text-gray-500 font-semibold">Filing Ref Code: <strong className="text-charcoal font-extrabold">{selectedCert?.code}/MUM/2026/0491</strong></p>
                        <p className="text-gray-500 font-semibold">Compliance Status: <span className="text-green-600 font-bold uppercase">ACTIVE & REGULAR</span></p>
                      </div>

                      {/* Mock signature stamp */}
                      <div className="flex justify-end mt-4">
                        <div className="border-2 border-green-500/40 rounded-full px-2 py-0.5 text-[8px] font-extrabold text-green-600 transform rotate-12">
                          VERIFIED COMPLIANCE
                        </div>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <button
                        onClick={() => setIsOtpModalOpen(false)}
                        className="w-full bg-gray-50 hover:bg-gray-100 text-charcoal border border-gray-200 font-bold text-xs py-2.5 rounded-lg transition-all"
                      >
                        Close Desk
                      </button>
                      <button
                        onClick={() => {
                          alert(`Initiating mock download: ${selectedCert?.code}_Certificate.pdf`);
                          setIsOtpModalOpen(false);
                        }}
                        className="w-full bg-saffron hover:bg-orange-600 text-white font-bold text-xs py-2.5 rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                      >
                        <Download size={13} />
                        <span>Download PDF</span>
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: PDF VIEWER MOCKUP */}
      <AnimatePresence>
        {pdfModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden"
            >

              {/* Header */}
              <div className="bg-[#1A1A1A] text-white p-5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <FileText size={18} className="text-saffron" />
                  <span className="font-bold text-sm tracking-wide uppercase truncate max-w-[400px]">Document Viewer: {pdfTitle}</span>
                </div>
                <button
                  onClick={() => setPdfModalOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body representing a PDF viewer screen */}
              <div className="p-6 bg-gray-100 flex flex-col items-center">

                {/* Control bar */}
                <div className="w-full bg-white border border-gray-200 rounded-t-lg p-2.5 flex justify-between items-center text-xs text-gray-500 mb-0 shadow-sm">
                  <span>Page 1 of 1</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => alert('Zoom action is disabled in this mockup.')}
                      className="px-2 py-1 bg-gray-50 hover:bg-gray-100 border rounded font-semibold text-charcoal"
                    >
                      100%
                    </button>
                  </div>
                </div>

                {/* Simulated Sheet of Paper */}
                <div className="w-full bg-white border-l border-r border-b border-gray-200 p-6 md:p-8 min-h-[360px] shadow-md font-sans text-xs md:text-sm text-charcoal leading-relaxed whitespace-pre-line relative overflow-hidden flex flex-col justify-between">
                  {/* Watermark */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03] transform -rotate-12">
                    <span className="text-5xl md:text-7xl font-extrabold uppercase">SANATAN FOUNDATION</span>
                  </div>

                  {/* Content body */}
                  <div className="relative z-10 font-mono tracking-tight text-gray-600">
                    {pdfContent}
                  </div>

                  {/* Footing stamp */}
                  <div className="relative z-10 flex justify-between items-end border-t border-gray-100 pt-6 mt-8">
                    <div>
                      <p className="text-[9px] text-gray-400 leading-none">Published Date: 15-May-2026</p>
                      <p className="text-[9px] text-gray-400 mt-1 leading-none">Authority: compliance@sanatandharmngo.org</p>
                    </div>
                    <div className="text-right">
                      <div className="border-2 border-saffron/40 text-saffron/75 text-[9px] font-extrabold px-3 py-1 rounded inline-block uppercase">
                        Officially Verified
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Footer action bar */}
              <div className="bg-white px-6 py-4.5 border-t border-gray-150 flex justify-end gap-3">
                <button
                  onClick={() => setPdfModalOpen(false)}
                  className="bg-gray-50 hover:bg-gray-100 text-charcoal border border-gray-200 font-bold text-xs py-2.5 px-5 rounded-lg transition-all"
                >
                  Close Document
                </button>
                <button
                  onClick={() => {
                    alert(`Initiating file download for ${pdfTitle}.pdf`);
                    setPdfModalOpen(false);
                  }}
                  className="bg-saffron hover:bg-orange-600 text-white font-bold text-xs py-2.5 px-5 rounded-lg shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Download Report</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
