import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Check, UserCheck, Heart, Users, ArrowRight, X, QrCode } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { membershipLevels } from '../data/membershipLevels';
import AuthGate from '../components/auth/AuthGate';
import { api } from '../lib/apiClient';
import { usePortalAuth } from '../context/PortalAuthContext';
import VolunteerEcosystem from '../components/VolunteerEcosystem';

// Key responsibilities list for popup display
const categoryResponsibilities = {
  sanataniSena: [
    "स्थानीय स्तर पर समाज सेवा एवं जनकल्याणकारी गतिविधियों में भाग लेना।",
    "सनातन संस्कृति और संस्कारों के संरक्षण हेतु जनजागरण अभियानों का हिस्सा बनना।",
    "आपदा राहत, सेवा ड्राइव, गौ सेवा और पर्यावरण संरक्षण जैसे कार्यों में स्वयंसेवक के रूप में सक्रिय रहना।",
    "संस्था के संदेश और मानवतावादी पहल को जन-जन तक पहुँचाने में सहयोग देना।"
  ],
  activeMember: [
    "संस्था की बैठकों, कार्यक्रमों और विशेष आयोजनों में नियमित रूप से उपस्थित होना।",
    "फाउंडेशन के सेवा ड्राइवों और सामाजिक कल्याण गतिविधियों के संचालन में महत्वपूर्ण भूमिका निभाना।",
    "संस्था के नियमों, मर्यादाओं और नैतिक मूल्यों का समाज में आदर्श रूप में प्रतिनिधित्व करना।",
    "समाज के पिछड़े और जरूरतमंद वर्गों की सहायता के लिए जागरूकता फैलाना।"
  ],
  vigilance: [
    "समाजिक Verification, सत्यापन और अनुशासनात्मक अभियानों में सहयोग देना।",
    "संस्था के नाम पर होने वाली किसी भी धोखाधड़ी या अनधिकृत गतिविधियों के प्रति सचेत रहना और रिपोर्ट करना।",
    "समाज में सुरक्षा, Fraud Awareness और जन सहायता कार्यों में सक्रिय निगरानी रखना।",
    "अनुशासन समिति के निर्देशों के अनुसार सत्यापन और सहायता कार्यों का संचालन करना।"
  ],
  sevaNetwork: [
    "अपने पेशेवर ज्ञान (डॉक्टर, अधिवक्ता, शिक्षक, व्यापारी, सीए, तकनीकी विशेषज्ञ) का उपयोग समाज कल्याण के लिए करना।",
    "संस्था से जुड़े जरूरतमंद लोगों को निशुल्क अथवा अत्यंत रियायती दरों पर अपनी सेवाएं प्रदान करना।",
    "समय-समय पर आयोजित होने वाले चिकित्सा शिविरों, शैक्षिक कार्यशालाओं या कानूनी जागरूकता शिविरों में सहयोग देना।",
    "सेवा नेटवर्क के अन्य सदस्यों के साथ मिलकर विशेषज्ञ सहायता प्रदान करना।"
  ],
  patronMember: [
    "फाउंडेशन के कार्यों को सुचारु रूप से चलाने के लिए आर्थिक एवं सामाजिक सहयोग प्रदान करना।",
    "संस्था के विकास, नई परियोजनाओं और भावी सेवा योजनाओं के निर्धारण में संरक्षक/मार्गदर्शक के रूप में कार्य करना।",
    "विशेष बैठकों और राष्ट्रीय/राज्य स्तर के आयोजनों में सम्माननीय अतिथि के रूप में शामिल होना।",
    "अपने अनुभवों और संपर्कों के माध्यम से फाउंडेशन के सेवा मिशन को सशक्त बनाना।"
  ]
};

export default function JoinTheMission() {
  const [selectedCategoryKey, setSelectedCategoryKey] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Selected State variables
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [customProfession, setCustomProfession] = useState('');
  
  // Step navigation
  const [currentStep, setCurrentStep] = useState('categories'); // 'categories', 'form', 'payment', 'thankyou'
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Loading & Submission State
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdMembershipId, setCreatedMembershipId] = useState('');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  // Access shared auth state
  const { user, isAuthenticated } = usePortalAuth();
  const isLoggedIn = isAuthenticated;
  const userMobile = user?.mobile || '';

  // Form inputs
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    state: '',
    district: '',
    city: '',
    dob: '',
    gender: 'Male',
    occupation: '',
    photo: null,
    idProof: null,
    reason: '',
    oath: false,
    terms: false
  });

  // Generated Details
  const [generatedMemberId, setGeneratedMemberId] = useState('');
  const [joiningDate, setJoiningDate] = useState('');

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const categoryParam = queryParams.get('category');
    const categoryQueryMap = {
      'sanatani-sena': 'sanataniSena',
      'vigilance': 'vigilance',
      'seva-network': 'sevaNetwork',
      'active-member': 'activeMember',
      'patron': 'patronMember'
    };
    if (categoryParam && categoryQueryMap[categoryParam]) {
      const catKey = categoryQueryMap[categoryParam];
      handleOpenDetails(catKey);
    }
  }, []);

  const handleOpenDetails = (catKey) => {
    setSelectedCategoryKey(catKey);
    setSelectedLevel(null);
    setIsModalOpen(true);
  };

  const handleApplyNow = () => {
    setIsModalOpen(false);
    setCurrentStep('form');
  };

  const handleAuthSuccess = async (authenticatedMobile) => {
    setShowAuthModal(false);
    if (pendingSubmit) {
      setPendingSubmit(false);
      await submitRegistration(authenticatedMobile);
    } else {
      setCurrentStep('form');
    }
  };

  const submitRegistration = async (mobileToUse) => {
    setSubmitting(true);
    setSubmitError('');

    const categoryMapToBackend = {
      sanataniSena: 'sanatani-sena',
      activeMember: 'active-member',
      vigilance: 'vigilance',
      sevaNetwork: 'seva-network',
      patronMember: 'patron'
    };

    try {
      const data = new FormData();
      data.append('fullName', formData.fullName);
      data.append('mobile', mobileToUse);
      data.append('email', formData.email);
      data.append('state', formData.state);
      data.append('district', formData.district);
      data.append('city', formData.city);
      data.append('dob', formData.dob);
      data.append('gender', formData.gender);
      data.append('occupation', formData.occupation);
      data.append('category', categoryMapToBackend[selectedCategoryKey] || selectedCategoryKey);
      data.append('level', selectedLevel.name);
      data.append('amount', selectedLevel.amount);
      data.append('professionalCategory', customProfession || '');
      data.append('message', formData.reason || 'Join the Mission Registration');
      
      if (formData.photo) data.append('photo', formData.photo);
      if (formData.idProof) data.append('idProof', formData.idProof);

      const res = await api.registerMembership(data);
      if (res.success) {
        setCreatedMembershipId(res.membershipId || res.id);
        setPaymentAmount(res.amount || selectedLevel.amount);
        setCurrentStep('payment');
      } else {
        setSubmitError(res.message || 'पंजीकरण सबमिट करने में विफल। / Failed to submit registration.');
      }
    } catch (err) {
      setSubmitError(err.message || 'पंजीकरण विफल। कृपया इनपुट की जांच करें। / Registration failed. Please check inputs.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!selectedLevel) {
      setSubmitError('कृपया सदस्यता स्तर का चयन करें। / Please select a membership level.');
      return;
    }

    if (!isLoggedIn) {
      setPendingSubmit(true);
      setShowAuthModal(true);
      return;
    }

    await submitRegistration(userMobile);
  };

  const handlePaymentComplete = async () => {
    if (!createdMembershipId) {
      alert('सदस्यता पंजीकरण संदर्भ आईडी गुम है। / Missing application ID.');
      return;
    }
    setSubmitting(true);
    try {
      await api.markPaidTest(createdMembershipId);
      
      const stateCode = (formData.state.slice(0, 2) || 'MH').toUpperCase();
      const randomSeq = Math.floor(100000 + Math.random() * 900000);
      setGeneratedMemberId(`SDMKF-${stateCode}-${randomSeq} (Pending Verification)`);
      
      const today = new Date().toLocaleDateString('hi-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setJoiningDate(today);
      setCurrentStep('thankyou');
    } catch (err) {
      alert(err.message || 'भुगतान सत्यापन विफल। / Payment verification failed.');
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategory = selectedCategoryKey ? membershipLevels[selectedCategoryKey] : null;

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        
        {/* Wizard Steps Tracker */}
        <div className="flex justify-center items-center gap-2 mb-10 text-xs sm:text-sm font-bold uppercase tracking-wider text-gray-400">
          <span className={currentStep === 'categories' ? 'text-[#FF6600]' : 'text-gray-500'}>1. Choose Category</span>
          <ArrowRight size={14} />
          <span className={currentStep === 'form' ? 'text-[#FF6600]' : 'text-gray-500'}>2. Registration</span>
          <ArrowRight size={14} />
          <span className={currentStep === 'payment' ? 'text-[#FF6600]' : 'text-gray-500'}>3. Contribution</span>
          <ArrowRight size={14} />
          <span className={currentStep === 'thankyou' ? 'text-[#FF6600]' : 'text-gray-500'}>4. Welcome</span>
        </div>

        {/* STEP 1: Categories Selector */}
        {currentStep === 'categories' && (
          <div className="space-y-12">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-3xl md:text-5xl font-extrabold text-charcoal mb-4">
                Join The Mission <span className="text-[#FF6600]">(MEMBERSHIP ECOSYSTEM)</span>
              </h1>
              <h2 className="text-xl md:text-2xl font-bold text-saffron mb-4 font-devanagari">
                सनातन सेवा अभियान से जुड़ें
              </h2>
              <p className="text-sm text-gray-600 font-devanagari leading-relaxed">
                सनातन धर्म मानव कल्याण फाउंडेशन के साथ जुड़कर आप सेवा, सुरक्षा, संस्कार, धर्म एवं मानव कल्याण के विभिन्न अभियानों का हिस्सा बन सकते हैं।
                अपनी रुचि, योग्यता, स्थान और उपलब्ध समय के अनुसार सही Category चुनें और आगे की प्रक्रिया पूरी करें।
              </p>
            </div>

            {/* Auto-slide Carousel */}
            <div className="max-w-6xl mx-auto">
              <VolunteerEcosystem hideHeader={true} onCardClick={handleOpenDetails} />
            </div>
          </div>
        )}

        {/* Category Detail Modal (Popup: Category Details Only) */}
        <AnimatePresence>
          {isModalOpen && selectedCategory && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="bg-white rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
              >
                {/* Header bar */}
                <div className="bg-orange-50 p-6 border-b border-orange-100 flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-bold text-charcoal font-serif">{selectedCategory.title}</h3>
                    <p className="text-xs text-saffron font-bold mt-1 font-devanagari">{selectedCategory.tagline}</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-charcoal bg-white p-2 rounded-full shadow-sm">
                    <X size={18} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto space-y-6 flex-grow">
                  
                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category Description / विवरण</h4>
                    <p className="text-sm text-gray-700 font-devanagari leading-relaxed">
                      {selectedCategory.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Key Responsibilities & Role / मुख्य जिम्मेदारियाँ एवं भूमिका</h4>
                    <ul className="list-disc pl-5 space-y-2 text-xs text-gray-600 font-devanagari leading-relaxed">
                      {categoryResponsibilities[selectedCategoryKey]?.map((resp, i) => (
                        <li key={i}>{resp}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-gray-500 font-devanagari leading-relaxed bg-gray-50 border border-gray-100 p-4 rounded-2xl">
                    📝 <strong>नोट:</strong> सदस्यता आवेदन जमा करने के उपरांत पृष्ठभूमि सत्यापन और समीक्षा की जाएगी। सत्यापन पूरा होने पर ही आईडी कार्ड और प्रमाण पत्र जारी किए जाएंगे।
                  </div>
                </div>

                {/* Footer action */}
                <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-4">
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 py-3 border border-gray-200 text-gray-600 hover:bg-gray-100 rounded-xl font-bold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleApplyNow}
                    className="flex-1 py-3 bg-[#FF6A00] text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20"
                  >
                    I'm Interested / Apply Now
                  </button>
                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* AUTHENTICATION GATE IF REQUIRED */}
        <AnimatePresence>
          {showAuthModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
              <div className="relative">
                <button
                  onClick={() => setShowAuthModal(false)}
                  className="absolute top-4 right-4 z-10 text-gray-400 hover:text-charcoal bg-white p-2 rounded-full shadow-sm"
                >
                  <X size={18} />
                </button>
                <AuthGate
                  title="Verify Account"
                  subtitle="Verify mobile number & set password to complete your membership application."
                  onSuccess={handleAuthSuccess}
                  fullName={formData.fullName}
                  email={formData.email}
                />
              </div>
            </div>
          )}
        </AnimatePresence>

        {/* STEP 2/3: Registration Form (includes Level & Amount selection section) */}
        {currentStep === 'form' && selectedCategory && (
          <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <h2 className="text-2xl font-bold text-charcoal mb-6 border-b border-gray-100 pb-3 flex justify-between items-center">
              <span>Membership Registration Form</span>
              <span className="text-xs bg-orange-100 text-saffron px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {selectedCategory.title}
              </span>
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
              
              {/* Personal details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                    placeholder="Your complete name"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                    placeholder="name@example.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">State *</label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                    placeholder="e.g. Maharashtra"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">District *</label>
                  <input
                    type="text"
                    required
                    value={formData.district}
                    onChange={(e) => setFormData({...formData, district: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                    placeholder="e.g. Pune"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">City *</label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                    placeholder="e.g. Pune City"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({...formData, gender: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal bg-white appearance-none"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Occupation *</label>
                  <input
                    type="text"
                    required
                    value={formData.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                    placeholder="Your profession"
                  />
                </div>
              </div>

              {/* Seva Network Professional Category Selector */}
              {selectedCategoryKey === 'sevaNetwork' && (
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Select Profession *</label>
                  <select
                    value={customProfession}
                    onChange={(e) => setCustomProfession(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm bg-white"
                  >
                    <option value="" disabled>Choose Profession</option>
                    {selectedCategory.professions.map((prof) => (
                      <option key={prof} value={prof}>{prof}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* File uploads */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Upload Photo *</label>
                  <input
                    type="file"
                    required
                    accept="image/*"
                    onChange={(e) => setFormData({...formData, photo: e.target.files[0]})}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-saffron hover:file:bg-orange-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Upload ID Proof *</label>
                  <input
                    type="file"
                    required
                    accept="image/*,application/pdf"
                    onChange={(e) => setFormData({...formData, idProof: e.target.files[0]})}
                    className="w-full text-xs text-gray-500 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-orange-50 file:text-saffron hover:file:bg-orange-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Message / Reason for Joining</label>
                <textarea
                  rows="3"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal"
                  placeholder="Tell us why you want to support or join the mission"
                ></textarea>
              </div>

              {/* STEP 4: Level & Amount Selection (rendered inside registration form) */}
              <div className="pt-6 border-t border-gray-150">
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Choose Level & Contribution Amount / स्तर एवं सहयोग राशि चुनें *</label>
                <div className="space-y-2.5">
                  {selectedCategory.levels.map((lvl) => (
                    <label
                      key={lvl.id}
                      className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                        selectedLevel?.id === lvl.id
                          ? 'border-[#FF6600] bg-orange-50/30'
                          : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="membership_level"
                        required
                        checked={selectedLevel?.id === lvl.id}
                        onChange={() => setSelectedLevel(lvl)}
                        className="mt-1 border-gray-300 text-saffron focus:ring-saffron"
                      />
                      <div className="flex-grow">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-charcoal text-sm">{lvl.name}</span>
                          <span className="text-[#FF6600] font-extrabold text-sm">₹{lvl.amount}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 font-devanagari">{lvl.desc}</p>
                        {lvl.requirement && lvl.requirement !== '—' && (
                          <p className="text-[10px] text-red-500 font-bold mt-1">📋 Requirement: {lvl.requirement}</p>
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Dynamic amount display */}
              {selectedLevel && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex justify-between items-center">
                  <span className="text-sm font-bold text-gray-700">Total Contribution Fee:</span>
                  <span className="text-[#FF6600] font-black text-2xl">₹{selectedLevel.amount}</span>
                </div>
              )}

              {/* Declarations ( Oath + Terms Checkboxes ) */}
              <div className="space-y-4 pt-4 border-t border-gray-100">
                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600 hover:text-charcoal font-medium">
                  <input
                    type="checkbox"
                    checked={formData.oath}
                    onChange={(e) => setFormData({...formData, oath: e.target.checked})}
                    required
                    className="w-4 h-4 rounded mt-0.5 border-gray-300 text-saffron focus:ring-saffron"
                  />
                  <span className="font-devanagari text-xs leading-relaxed">
                    मैं सनातन धर्म, संस्कृति और मानव कल्याण के उद्देश्यों के प्रति अपनी आस्था व्यक्त करते हुए Sanatan Dharm Manav Kalyan Foundation के नियमों एवं मर्यादाओं का पालन करने का संकल्प लेता / लेती हूँ। *
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600 hover:text-charcoal font-medium">
                  <input
                    type="checkbox"
                    checked={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                    required
                    className="w-4 h-4 rounded mt-0.5 border-gray-300 text-saffron focus:ring-saffron"
                  />
                  <span className="text-xs">I agree to Terms & Conditions and Foundation Rules. *</span>
                </label>
              </div>

              {submitError && (
                <div className="p-4 bg-red-50 text-red-650 text-red-700 border border-red-100 rounded-2xl text-xs font-bold leading-relaxed">
                  ⚠️ {submitError}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting || !selectedLevel || (selectedCategoryKey === 'sevaNetwork' && !customProfession)}
                className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm uppercase tracking-wider disabled:opacity-50"
              >
                {submitting ? 'Submitting Application...' : 'Submit Application & Proceed to Payment'}
              </button>

            </form>
          </div>
        )}

        {/* STEP 5: Payment Selector (Contribution gateway placeholder) */}
        {currentStep === 'payment' && selectedLevel && (
          <div className="max-w-md mx-auto bg-white rounded-3xl shadow-sm border border-gray-100 p-8 text-center space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-charcoal">Contribution Gateway</h2>
              <p className="text-xs text-gray-500 mt-1">Select payment method to complete registration</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 flex justify-between items-center text-sm">
              <span className="text-gray-500 font-semibold">Total Amount:</span>
              <span className="text-[#FF6600] font-black text-xl">₹{selectedLevel.amount}</span>
            </div>

            {/* Payment Warning Box */}
            <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-2xl text-left text-xs font-bold font-devanagari leading-relaxed">
              🚩 भुगतान करते समय स्क्रीन पर "Sanatan Dharm Manav Kalyan Foundation" नाम दिखाई दे, तभी भुगतान करें।
            </div>

            {/* Methods */}
            <div className="grid grid-cols-2 gap-3 text-sm">
              {['UPI', 'Razorpay', 'QR Code', 'Bank Transfer'].map((method) => (
                <button
                  key={method}
                  onClick={handlePaymentComplete}
                  className="p-4 border border-gray-200 hover:border-saffron hover:bg-orange-50/20 rounded-2xl font-bold transition-all text-charcoal"
                >
                  {method}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentStep('form')}
              className="text-xs text-gray-500 hover:text-charcoal font-semibold block mx-auto underline"
            >
              Back to Form
            </button>
          </div>
        )}

        {/* STEP 6: Thank You & ID Card Preview */}
        {currentStep === 'thankyou' && selectedCategory && selectedLevel && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-100 text-center space-y-4">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-2xl">
                ✔
              </div>
              <h2 className="text-2xl font-bold text-charcoal">Thank You!</h2>
              <p className="text-sm text-gray-600 font-devanagari leading-relaxed">
                आपका आवेदन सफलतापूर्वक प्राप्त हो गया है। Verification के बाद आपकी Membership / Volunteer Registration सक्रिय की जाएगी। आपको Confirmation SMS / Email / WhatsApp के माध्यम से सूचना दी जाएगी।
              </p>
              {createdMembershipId && (
                <div className="mt-4 p-3 bg-gray-50 border border-gray-150 rounded-2xl inline-block text-center">
                  <span className="text-[10px] text-gray-400 font-extrabold uppercase tracking-widest block mb-0.5">Application Ref ID</span>
                  <span className="font-mono text-sm text-charcoal font-bold">{createdMembershipId}</span>
                </div>
              )}
            </div>

            {/* ID Card Generator Preview */}
            <div className="relative bg-[#1A0B10] text-white rounded-3xl overflow-hidden shadow-2xl border-t border-orange-500/20 max-w-sm mx-auto">
              {/* Saffron Header Ribbon */}
              <div className="bg-[#FF6600] px-6 py-4 flex items-center gap-3">
                <span className="text-xl">🚩</span>
                <div className="text-left leading-tight">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-white">Sanatan Dharm</h4>
                  <p className="text-[8px] text-white/80 lowercase">Manav Kalyan Foundation</p>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 space-y-5 text-left">
                <div className="flex justify-between items-start gap-4">
                  {/* Photo mock */}
                  <div className="w-20 h-24 bg-gray-800 rounded-xl border border-gray-700/50 overflow-hidden flex items-center justify-center text-[10px] text-gray-500 font-semibold uppercase">
                    Photo
                  </div>

                  {/* QR Mock */}
                  <div className="w-20 h-20 bg-white p-1 rounded-xl flex items-center justify-center relative">
                    <QrCode size={64} className="text-charcoal" />
                    <span className="absolute bottom-0 text-[6px] text-charcoal/80 font-bold bg-white px-1 py-0.5 rounded">SCAN VERIFY</span>
                  </div>
                </div>

                <div className="space-y-2.5 text-xs">
                  <div>
                    <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Member Name</span>
                    <p className="font-bold text-white text-sm">{formData.fullName || 'User Name'}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Member ID</span>
                      <p className="font-mono text-saffron font-bold text-xs">{generatedMemberId}</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Category</span>
                      <p className="font-bold text-white text-xs">{selectedCategory.title}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-gray-800/80">
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Status</span>
                      <p className="text-green-400 font-bold text-xs">Pending Approval</p>
                    </div>
                    <div>
                      <span className="text-[9px] text-gray-400 uppercase font-bold tracking-wider">Joining Date</span>
                      <p className="text-white text-xs font-devanagari">{joiningDate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Disclaimer footer */}
              <div className="bg-gray-900/60 px-6 py-2.5 text-[8px] text-gray-400 text-center border-t border-gray-800/80">
                SDMKF OFFICIAL ID MOCK · VERIFICATION PENDING
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={() => setCurrentStep('categories')}
                className="px-6 py-3 bg-[#FF6A00] text-white font-bold rounded-xl hover:bg-orange-600 transition-colors shadow-lg"
              >
                Return to Categories
              </button>
            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
