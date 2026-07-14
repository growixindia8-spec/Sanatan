import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Check, ArrowRight, ArrowLeft, Plus, Minus, Upload, Camera, Download, Share2, ExternalLink } from 'lucide-react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { membershipLevels } from '../data/membershipLevels';
import { categoryAccordionContent } from '../data/categoryAccordionContent';
import { api } from '../lib/apiClient';
import { usePortalAuth } from '../context/PortalAuthContext';
import OtpVerification from '../components/auth/OtpVerification';
import { openRazorpayCheckout } from '../lib/razorpayCheckout';

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", 
  "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", 
  "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", 
  "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", 
  "Uttarakhand", "West Bengal", "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
];

const AccordionItem = ({ title, titleHi, content, isOpen, onToggle }) => {
  const isTruncated = content.length > 200;
  const [showFull, setShowFull] = useState(false);

  const displayContent = (isTruncated && !showFull) 
    ? content.slice(0, 200) + '...' 
    : content;

  return (
    <div className="border-b border-orange-100 last:border-0 py-3">
      <button 
        type="button" 
        onClick={onToggle}
        className="w-full py-2 flex justify-between items-center text-left focus:outline-none"
      >
        <div>
          <h4 className="font-bold text-[#FF6600] text-base md:text-lg">{title}</h4>
          <span className="text-xs text-gray-500 font-devanagari mt-0.5 block">{titleHi}</span>
        </div>
        <span className="text-[#FF6600] text-xl font-bold">{isOpen ? '➖' : '➕'}</span>
      </button>
      
      {isOpen && (
        <div className="pb-3 pt-2 text-sm text-gray-700 font-devanagari leading-relaxed whitespace-pre-line animate-fadeIn">
          {displayContent}
          {isTruncated && (
            <button
              type="button"
              onClick={() => setShowFull(!showFull)}
              className="text-[#FF6600] font-bold ml-2 underline focus:outline-none hover:text-orange-700"
            >
              {showFull ? '[ Show Less ]' : '[ Read More ]'}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default function CategoryJoinPage() {
  const { categorySlug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = usePortalAuth();

  const slugMap = {
    'sanatani-sena': 'sanataniSena',
    'active-member': 'activeMember',
    'vigilance': 'vigilance',
    'seva-network': 'sevaNetwork',
    'patron': 'patronMember'
  };

  const categoryKey = slugMap[categorySlug];
  const categoryData = membershipLevels[categoryKey];
  const accordionData = categoryAccordionContent[categorySlug];

  // If invalid slug, redirect
  useEffect(() => {
    if (!categoryData) {
      navigate('/join-the-mission');
    }
  }, [categoryData, navigate]);

  // Accordion Toggle
  const [expandedIdx, setExpandedIdx] = useState(null);

  // Declaration Checkboxes
  const [declRead, setDeclRead] = useState(false);
  const [declTerms, setDeclTerms] = useState(false);
  const [declTrue, setDeclTrue] = useState(false);

  // Show Wizard State
  const [showWizard, setShowWizard] = useState(false);
  const [activeStep, setActiveStep] = useState(1);
  const wizardRef = useRef(null);

  // Form Fields
  const [form, setForm] = useState({
    fullName: '',
    mobile: '',
    email: '',
    dob: '',
    gender: 'Male',
    state: '',
    district: '',
    city: '',
    completeAddress: '',
    pincode: '',
    levelId: '',
    includeIdCard: false,
    profession: '', // for Seva Network
    aadhaarFront: null,
    aadhaarBack: null,
    selfie: null,
    verifyLater: false,
    optionalDonation: 0,
    paymentMethod: 'Razorpay',
    manualTransactionRef: '',
    manualPaymentScreenshot: null
  });

  const [mobileVerified, setMobileVerified] = useState(false);
  const [aadhaarFrontPreview, setAadhaarFrontPreview] = useState(null);
  const [aadhaarBackPreview, setAadhaarBackPreview] = useState(null);
  const [selfiePreview, setSelfiePreview] = useState(null);

  // Manual payment state
  const [joinActiveQrTab, setJoinActiveQrTab] = useState('Google Pay');
  const [manualScreenshotPreview, setManualScreenshotPreview] = useState(null);

  // Camera State
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const videoStreamRef = useRef(null);

  // Submission States
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [createdId, setCreatedId] = useState('');
  const [appNumber, setAppNumber] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  // Prefill mobile verification if user logged in
  useEffect(() => {
    if (isAuthenticated && user?.mobile) {
      setForm(prev => ({ ...prev, mobile: user.mobile, fullName: user.fullName || '' }));
      setMobileVerified(true);
    }
  }, [isAuthenticated, user]);

  if (!categoryData || !accordionData) {
    return null;
  }

  // Smooth scroll trigger
  const handleScrollToBeforeJoin = () => {
    document.getElementById('before-you-join')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleStartRegistration = () => {
    setShowWizard(true);
    setTimeout(() => {
      wizardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  // Step 1 Validation
  const handleNextStep1 = () => {
    if (!form.fullName || !form.mobile || !form.dob || !form.gender) {
      alert("कृपया सभी आवश्यक फ़ील्ड भरें। / Please fill in all required fields.");
      return;
    }
    if (!mobileVerified) {
      alert("कृपया अपना मोबाइल नंबर ओटीपी द्वारा सत्यापित करें। / Please verify your mobile number via OTP.");
      return;
    }
    setActiveStep(2);
  };

  // Step 2 Validation
  const handleNextStep2 = () => {
    if (!form.state || !form.district || !form.city || !form.completeAddress || !form.pincode) {
      alert("कृपया पता संबंधी सभी जानकारी भरें। / Please specify address details.");
      return;
    }
    if (!/^\d{6}$/.test(form.pincode)) {
      alert("कृपया 6-अंकों का सही पिन कोड दर्ज करें। / Please enter a valid 6-digit PIN code.");
      return;
    }
    setActiveStep(3);
  };

  // Step 3 Validation
  const handleNextStep3 = () => {
    if (!form.levelId) {
      alert("कृपया सदस्यता स्तर का चयन करें। / Please select a membership level.");
      return;
    }
    if (categorySlug === 'seva-network' && !form.profession) {
      alert("कृपया अपने पेशे का चयन करें। / Please select your profession.");
      return;
    }
    setActiveStep(4);
  };

  // Step 4 Validation
  const handleNextStep4 = () => {
    if (!form.verifyLater) {
      if (!form.aadhaarFront || !form.aadhaarBack || !form.selfie) {
        alert("कृपया पहचान दस्तावेज़ और सेल्फ़ी अपलोड करें अथवा 'सत्यापन बाद में करें' चुनें। / Please upload Aadhaar & Selfie or choose 'Verify Later'.");
        return;
      }
    }
    setActiveStep(5);
  };

  // Camera Handling
  const startCamera = async () => {
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
      videoStreamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert("कैमरा एक्सेस करने में विफल। कृपया फाइल अपलोड विकल्प का उपयोग करें। / Failed to access camera. Please use the file upload option.");
      setShowCamera(false);
    }
  };

  const stopCamera = () => {
    if (videoStreamRef.current) {
      videoStreamRef.current.getTracks().forEach(track => track.stop());
    }
    setShowCamera(false);
  };

  const capturePhoto = () => {
    const video = videoRef.current;
    if (!video) return;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob((blob) => {
      const file = new File([blob], `selfie-${Date.now()}.jpg`, { type: 'image/jpeg' });
      setForm(prev => ({ ...prev, selfie: file }));
      setSelfiePreview(URL.createObjectURL(file));
      stopCamera();
    }, 'image/jpeg');
  };

  // Calculate fees live
  const selectedLevel = categoryData.levels.find(lvl => lvl.id === form.levelId);
  const baseFee = selectedLevel ? (form.includeIdCard && selectedLevel.idCardAmount > 0 ? selectedLevel.idCardAmount : selectedLevel.amount) : 0;
  const donationAmount = parseFloat(form.optionalDonation) || 0;
  const totalAmount = baseFee + donationAmount;

  // File Preview helpers
  const handleFileChange = (field, file) => {
    if (!file) return;
    setForm(prev => ({ ...prev, [field]: file }));
    const url = URL.createObjectURL(file);
    if (field === 'aadhaarFront') setAadhaarFrontPreview(url);
    if (field === 'aadhaarBack') setAadhaarBackPreview(url);
    if (field === 'selfie') setSelfiePreview(url);
  };

  // Submit Handler
  const handlePayAndSubmit = async () => {
    setSubmitting(true);
    setSubmitError('');

    try {
      const formData = new FormData();
      formData.append('fullName', form.fullName);
      formData.append('mobile', form.mobile);
      formData.append('email', form.email);
      formData.append('state', form.state);
      formData.append('district', form.district);
      formData.append('city', form.city);
      formData.append('dob', form.dob);
      formData.append('gender', form.gender);
      formData.append('occupation', form.profession || 'Volunteer');
      formData.append('category', categorySlug);
      formData.append('level', selectedLevel.name);
      formData.append('amount', selectedLevel.amount);
      formData.append('idCardRequired', form.includeIdCard);
      formData.append('completeAddress', form.completeAddress);
      formData.append('pincode', form.pincode);
      formData.append('optionalDonation', donationAmount);
      formData.append('identityVerificationSkipped', form.verifyLater);

      // Professional category for Seva Network
      if (categorySlug === 'seva-network') {
        formData.append('professionalCategory', form.profession);
      }

      if (!form.verifyLater) {
        if (form.aadhaarFront) formData.append('aadhaarFront', form.aadhaarFront);
        if (form.aadhaarBack) formData.append('aadhaarBack', form.aadhaarBack);
        if (form.selfie) {
          formData.append('selfie', form.selfie);
          // For compatibility with old schema photoUrl
          formData.append('photo', form.selfie);
        }
      }

      // 1. Submit form data to register endpoint
      const registerRes = await api.registerMembership(formData);
      if (!registerRes.success) {
        throw new Error(registerRes.message || "Registration failed.");
      }

      const membershipId = registerRes.membershipId || registerRes.id;
      setAppNumber(registerRes.applicationNumber);

      const getApiUrl = () => {
        let url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        if (url.endsWith('/')) {
          url = url.slice(0, -1);
        }
        return url;
      };

      if (form.paymentMethod === 'Razorpay') {
        // 2. Create Razorpay order for this membership
        const orderUrl = `${getApiUrl()}/api/membership/create-order`;
        const orderRes = await fetch(orderUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ membershipId }),
        });
        
        let orderData;
        try {
          orderData = await orderRes.json();
        } catch (orderParseErr) {
          console.error(`Request to ${orderUrl} returned non-JSON (Status ${orderRes.status})`);
          throw new Error(`Server payment order error (${orderRes.status}).`);
        }

        if (!orderRes.ok) {
          throw new Error(orderData.message || 'Failed to initiate membership payment order.');
        }

        // 3. Open Razorpay checkout modal
        openRazorpayCheckout({
          orderId: orderData.orderId,
          amount: orderData.amount,
          keyId: orderData.key,
          name: form.fullName,
          description: `Membership Registration - ${categoryData.title}`,
          prefill: { name: form.fullName, email: form.email, contact: form.mobile },
          onSuccess: async (response) => {
            const verifyUrl = `${getApiUrl()}/api/membership/verify-payment`;
            try {
              setSubmitting(true);
              // 4. Verify payment
              const verifyRes = await fetch(verifyUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  membershipId
                }),
              });

              let verifyData;
              try {
                verifyData = await verifyRes.json();
              } catch (verifyParseErr) {
                console.error(`Request to ${verifyUrl} returned non-JSON (Status ${verifyRes.status})`);
                throw new Error(`Server payment verification error (${verifyRes.status}).`);
              }

              if (!verifyRes.ok) {
                throw new Error(verifyData.message || 'Payment verification failed.');
              }

              // Save submission data to show receipt summary
              setSubmittedData({
                fullName: form.fullName,
                category: categoryData.title,
                level: selectedLevel.name,
                totalPaid: totalAmount,
                membershipId: membershipId
              });

              // Move to success screen
              setActiveStep(6);
            } catch (err) {
              setSubmitError(err.message || 'भुगतान सत्यापित करने में विफल। / Verification failed.');
            } finally {
              setSubmitting(false);
            }
          },
          onFailure: (message) => {
            setSubmitError(message || 'भुगतान विफल या रद्द किया गया। / Payment failed or cancelled.');
            setSubmitting(false);
          },
        });
      } else {
        // Manual offline payment confirmation
        if (!form.manualTransactionRef.trim()) {
          throw new Error('कृपया भुगतान क्रेडेंशियल/UTR नंबर दर्ज करें। / Please enter payment transaction reference UTR code.');
        }

        const confirmData = new FormData();
        confirmData.append('transactionRef', form.manualTransactionRef.trim());
        if (form.manualPaymentScreenshot) {
          confirmData.append('paymentScreenshot', form.manualPaymentScreenshot);
        }

        const confirmUrl = `${getApiUrl()}/api/membership/${membershipId}/confirm-payment`;
        const confirmRes = await fetch(confirmUrl, {
          method: "POST",
          body: confirmData,
        });

        let confirmResult;
        try {
          confirmResult = await confirmRes.json();
        } catch (e) {
          throw new Error(`Server offline payment confirmation error (${confirmRes.status}).`);
        }

        if (!confirmRes.ok) {
          throw new Error(confirmResult.message || 'Manual payment confirmation failed.');
        }

        // Save submission data to show receipt summary
        setSubmittedData({
          fullName: form.fullName,
          category: categoryData.title,
          level: selectedLevel.name,
          totalPaid: totalAmount,
          membershipId: membershipId
        });

        // Move to success screen
        setActiveStep(6);
        setSubmitting(false);
      }

    } catch (err) {
      setSubmitError(err.message || 'पंजीकरण सबमिट करने में विफल। / Registration failed.');
      setSubmitting(false);
    }
  };

  // Share
  const handleShare = () => {
    const shareText = `🚩 मैंने सनातन धर्म मानव कल्याण फाउंडेशन के '${categoryData.title}' के रूप में पंजीकरण किया है। आप भी जुड़ें!`;
    const shareUrl = window.location.origin;
    if (navigator.share) {
      navigator.share({
        title: 'Join the Mission',
        text: shareText,
        url: shareUrl
      }).catch(err => console.log(err));
    } else {
      navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      alert("लिंक कॉपी कर लिया गया है! / Link copied to clipboard!");
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen font-sans flex flex-col">
      <Header />

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-orange-600 via-[#FF6600] to-amber-500 py-16 px-4 text-center text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="max-w-4xl mx-auto relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-bold tracking-wider">
            🚩 {categoryData.title.toUpperCase()}
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight drop-shadow-md">
            Join the Mission
          </h1>
          <p className="text-lg md:text-xl italic font-serif opacity-90 max-w-2xl mx-auto leading-relaxed">
            "{categoryData.tagline}"
          </p>
          <button 
            onClick={handleScrollToBeforeJoin}
            className="mt-6 inline-flex items-center gap-2 bg-white text-[#FF6600] px-8 py-3.5 rounded-full text-base font-extrabold shadow-lg hover:bg-orange-50 hover:scale-105 transition-all duration-300"
          >
            Join The Mission <ArrowRight size={18} />
          </button>
        </div>
      </section>

      {/* Category Poster */}
      <section className="max-w-6xl mx-auto w-full py-12 px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-150 overflow-hidden grid grid-cols-1 md:grid-cols-2">
          <div className="h-[280px] md:h-full relative bg-charcoal">
            <img 
              src={accordionData.posterImage} 
              alt={categoryData.title}
              className="w-full h-full object-cover opacity-90"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://images.unsplash.com/photo-1544027993-37dbfe43562a?q=80&w=1200";
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-r" />
            <div className="absolute bottom-6 left-6 right-6 text-white text-left">
              <span className="text-xs uppercase bg-[#FF6600] px-2.5 py-1 rounded font-black tracking-widest">POSTER</span>
              <h2 className="text-2xl font-bold font-serif mt-2">🚩 {categoryData.title.toUpperCase()}</h2>
            </div>
          </div>
          <div className="p-8 md:p-12 flex flex-col justify-center space-y-4">
            <h3 className="text-xl md:text-2xl font-extrabold text-charcoal leading-tight">
              {accordionData.posterTagline}
            </h3>
            <p className="text-sm md:text-base text-gray-600 font-devanagari leading-relaxed">
              {categoryData.description}
            </p>
          </div>
        </div>
      </section>

      {/* Before You Join Accordions */}
      <section id="before-you-join" className="max-w-4xl mx-auto w-full py-8 px-4 sm:px-6">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-150 p-8 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-extrabold text-charcoal">Before You Join</h2>
            <p className="text-sm font-bold text-amber-600 font-devanagari">
              कृपया Registration शुरू करने से पहले नीचे दी गई सभी जानकारी ध्यान से पढ़ें।
            </p>
          </div>

          <div className="divide-y divide-orange-100 border-y border-orange-100">
            {accordionData.accordions.map((item, index) => (
              <AccordionItem
                key={index}
                title={item.title}
                titleHi={item.titleHi}
                content={item.content}
                isOpen={expandedIdx === index}
                onToggle={() => setExpandedIdx(expandedIdx === index ? null : index)}
              />
            ))}
          </div>

          {/* Declarations */}
          <div className="bg-orange-50/50 border border-orange-100 rounded-2xl p-6 space-y-4">
            <h4 className="text-sm font-bold text-[#FF6600] uppercase tracking-wider">Declaration / घोषणापत्र</h4>
            <div className="space-y-3 text-xs md:text-sm text-gray-700">
              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={declRead}
                  onChange={(e) => setDeclRead(e.target.checked)}
                  className="mt-0.5 rounded text-saffron focus:ring-saffron"
                />
                <span className="font-devanagari leading-relaxed">मैंने ऊपर दी गई सभी जानकारी पढ़ ली है। *</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={declTerms}
                  onChange={(e) => setDeclTerms(e.target.checked)}
                  className="mt-0.5 rounded text-saffron focus:ring-saffron"
                />
                <span className="font-devanagari leading-relaxed">मैं Foundation के नियम एवं शर्तों से सहमत हूँ। *</span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={declTrue}
                  onChange={(e) => setDeclTrue(e.target.checked)}
                  className="mt-0.5 rounded text-saffron focus:ring-saffron"
                />
                <span className="font-devanagari leading-relaxed">मेरे द्वारा दी जाने वाली सभी जानकारी सही होगी। *</span>
              </label>
            </div>

            <button
              onClick={handleStartRegistration}
              disabled={!(declRead && declTerms && declTrue)}
              className="w-full bg-[#FF6A00] text-white py-3.5 rounded-xl font-extrabold hover:bg-orange-600 transition-all text-sm shadow-md disabled:opacity-40"
            >
              NEXT → Start Registration
            </button>
          </div>
        </div>
      </section>

      {/* Registration Form Wizard */}
      {showWizard && (
        <section ref={wizardRef} className="max-w-3xl mx-auto w-full py-12 px-4 sm:px-6 mb-16">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-150 p-8">
            <h2 className="text-2xl font-black text-charcoal mb-6 border-b border-gray-100 pb-3 flex justify-between items-center">
              <span>Registration Wizard</span>
              <span className="text-xs bg-orange-100 text-[#FF6600] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {activeStep <= 5 ? `Step ${activeStep} of 5` : 'Success'}
              </span>
            </h2>

            {/* Step progress tracker */}
            {activeStep <= 5 && (
              <div className="flex justify-between items-center max-w-xl mx-auto mb-10 relative">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
                <div 
                  className="absolute top-1/2 left-0 h-0.5 bg-[#FF6600] -translate-y-1/2 z-0 transition-all duration-300" 
                  style={{ width: `${((activeStep - 1) / 4) * 100}%` }}
                />

                {[1, 2, 3, 4, 5].map((stepNum) => {
                  const isCompleted = activeStep > stepNum;
                  const isActive = activeStep === stepNum;
                  return (
                    <div key={stepNum} className="relative z-10 flex flex-col items-center">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                          isCompleted 
                            ? 'bg-green-500 text-white' 
                            : isActive 
                              ? 'bg-[#FF6600] text-white ring-4 ring-orange-100' 
                              : 'bg-white text-gray-400 border-2 border-gray-200'
                        }`}
                      >
                        {isCompleted ? '✓' : stepNum}
                      </div>
                      <span className="text-[9px] text-gray-500 font-black mt-1.5 uppercase tracking-wider hidden sm:inline">
                        {stepNum === 1 && "Basic"}
                        {stepNum === 2 && "Address"}
                        {stepNum === 3 && "Level"}
                        {stepNum === 4 && "Identity"}
                        {stepNum === 5 && "Payment"}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Form steps */}
            {/* STEP 1: Basic Details */}
            {activeStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-2">Step 1 — Basic Details / बुनियादी विवरण</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Full Name / पूरा नाम *</label>
                    <input 
                      type="text"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Date of Birth / जन्म तिथि *</label>
                      <input 
                        type="date"
                        value={form.dob}
                        onChange={(e) => setForm({ ...form, dob: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Gender / लिंग *</label>
                      <select 
                        value={form.gender}
                        onChange={(e) => setForm({ ...form, gender: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm bg-white"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Email Address (Optional) / ईमेल पता (वैकल्पिक)</label>
                    <input 
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                      placeholder="name@example.com"
                    />
                  </div>

                  {/* Mobile Number Verification */}
                  <div className="pt-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Mobile Number / मोबाइल नंबर *</label>
                    {mobileVerified ? (
                      <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                        <div className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-green-500 text-white flex items-center justify-center text-xs">✓</div>
                          <span className="text-sm font-semibold text-green-800">{form.mobile} (Verified / सत्यापित)</span>
                        </div>
                        {!isAuthenticated && (
                          <button 
                            type="button" 
                            onClick={() => setMobileVerified(false)}
                            className="text-xs text-red-500 underline font-bold hover:text-red-700"
                          >
                            Change Number
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="border border-orange-100 rounded-xl p-4 bg-orange-50/20">
                        <OtpVerification 
                          purpose="membership" 
                          onVerified={(verifiedPhone) => {
                            setForm(prev => ({ ...prev, mobile: verifiedPhone }));
                            setMobileVerified(true);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button 
                    type="button"
                    onClick={handleNextStep1}
                    className="bg-[#FF6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2 text-sm shadow-md"
                  >
                    NEXT <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Address Details */}
            {activeStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-2">Step 2 — Address Details / पते का विवरण</h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">State / राज्य *</label>
                      <select 
                        value={form.state}
                        onChange={(e) => setForm({ ...form, state: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm bg-white"
                      >
                        <option value="">Select State</option>
                        {states.map(s => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">District / जिला *</label>
                      <input 
                        type="text"
                        value={form.district}
                        onChange={(e) => setForm({ ...form, district: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                        placeholder="e.g. Pune"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">City / शहर *</label>
                      <input 
                        type="text"
                        value={form.city}
                        onChange={(e) => setForm({ ...form, city: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                        placeholder="e.g. Pune City"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">PIN Code / पिन कोड *</label>
                      <input 
                        type="text"
                        value={form.pincode}
                        onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                        placeholder="6-digit code"
                        maxLength={6}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Complete Address / पूरा पता *</label>
                    <textarea 
                      rows={3}
                      value={form.completeAddress}
                      onChange={(e) => setForm({ ...form, completeAddress: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm"
                      placeholder="House No, Street, Landmark..."
                    />
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setActiveStep(1)}
                    className="border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button 
                    type="button"
                    onClick={handleNextStep2}
                    className="bg-[#FF6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2 text-sm shadow-md"
                  >
                    NEXT <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Membership Level */}
            {activeStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-2">Step 3 — Choose Level & Fee / सदस्यता स्तर एवं शुल्क</h3>

                {/* Profession Selection for Seva Network */}
                {categorySlug === 'seva-network' && (
                  <div className="bg-orange-50/30 p-4 border border-orange-100 rounded-2xl mb-4">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Profession / पेशा *</label>
                    <select
                      value={form.profession}
                      onChange={(e) => setForm({ ...form, profession: e.target.value })}
                      required
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm bg-white"
                    >
                      <option value="">Choose Profession</option>
                      {categoryData.professions?.map((p) => (
                        <option key={p} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-3">
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Select Membership Level / सदस्यता स्तर *</label>
                  <div className="space-y-2.5">
                    {categoryData.levels.map((lvl) => (
                      <label 
                        key={lvl.id}
                        className={`flex items-start gap-3 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                          form.levelId === lvl.id 
                            ? 'border-[#FF6600] bg-orange-50/10'
                            : 'border-gray-100 hover:border-gray-200 bg-gray-50/50'
                        }`}
                      >
                        <input 
                          type="radio"
                          name="levelId"
                          checked={form.levelId === lvl.id}
                          onChange={() => setForm({ ...form, levelId: lvl.id, includeIdCard: false })}
                          className="mt-1 text-saffron focus:ring-saffron border-gray-300"
                        />
                        <div className="flex-grow">
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-charcoal text-sm">{lvl.name}</span>
                            <span className="text-[#FF6600] font-black text-sm">₹{lvl.amount}</span>
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

                {/* Live ID Card Checkbox Display */}
                {selectedLevel && selectedLevel.idCardAmount > 0 && (
                  <div className="p-4 border border-orange-100 rounded-2xl bg-orange-50/20 space-y-2">
                    <label className="flex items-center gap-2.5 cursor-pointer font-medium text-charcoal text-sm">
                      <input 
                        type="checkbox"
                        checked={form.includeIdCard}
                        onChange={(e) => setForm({ ...form, includeIdCard: e.target.checked })}
                        className="rounded text-saffron focus:ring-saffron border-gray-300"
                      />
                      <span>Include Official Printed ID Card (कुल शुल्क ₹{selectedLevel.idCardAmount})</span>
                    </label>
                    <p className="text-[11px] text-gray-500 font-devanagari pl-6">
                      आधिकारिक प्रिंटेड प्लास्टिक आईडी कार्ड प्राप्त करने के लिए यह विकल्प चुनें।
                    </p>
                  </div>
                )}

                {/* Display calculated fee */}
                {selectedLevel && (
                  <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex justify-between items-center text-sm">
                    <span className="font-bold text-gray-700">Calculated Fee / कुल सदस्यता शुल्क:</span>
                    <span className="text-[#FF6600] font-black text-2xl">₹{baseFee}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setActiveStep(2)}
                    className="border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button 
                    type="button"
                    onClick={handleNextStep3}
                    className="bg-[#FF6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2 text-sm shadow-md"
                  >
                    NEXT <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Identity Verification */}
            {activeStep === 4 && (
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <h3 className="text-lg font-bold text-charcoal">Step 4 — Identity Verification / पहचान सत्यापन</h3>
                  
                  {/* Skip Option */}
                  <button
                    type="button"
                    onClick={() => {
                      setForm(prev => ({ ...prev, verifyLater: true }));
                      setActiveStep(5);
                    }}
                    className="text-xs text-[#FF6600] hover:text-orange-700 font-bold underline"
                  >
                    Verify Later (Skip / बाद में करें)
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Aadhaar Front */}
                  <div className="border border-dashed border-gray-300 rounded-2xl p-4 text-center hover:bg-gray-50/50 transition relative">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('aadhaarFront', e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <Upload className="mx-auto text-gray-400" size={24} />
                      <p className="text-xs font-bold text-gray-600">Aadhaar Front (Image) *</p>
                      <p className="text-[10px] text-gray-400">Click or drag Aadhaar front side image</p>
                    </div>
                    {aadhaarFrontPreview && (
                      <div className="mt-3 max-w-[200px] mx-auto border border-gray-200 rounded-lg overflow-hidden">
                        <img src={aadhaarFrontPreview} alt="Aadhaar Front" className="w-full h-auto" />
                      </div>
                    )}
                  </div>

                  {/* Aadhaar Back */}
                  <div className="border border-dashed border-gray-300 rounded-2xl p-4 text-center hover:bg-gray-50/50 transition relative">
                    <input 
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileChange('aadhaarBack', e.target.files[0])}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <div className="space-y-1">
                      <Upload className="mx-auto text-gray-400" size={24} />
                      <p className="text-xs font-bold text-gray-600">Aadhaar Back (Image) *</p>
                      <p className="text-[10px] text-gray-400">Click or drag Aadhaar back side image</p>
                    </div>
                    {aadhaarBackPreview && (
                      <div className="mt-3 max-w-[200px] mx-auto border border-gray-200 rounded-lg overflow-hidden">
                        <img src={aadhaarBackPreview} alt="Aadhaar Back" className="w-full h-auto" />
                      </div>
                    )}
                  </div>

                  {/* Selfie Upload / Camera Capture */}
                  <div className="border border-gray-200 rounded-2xl p-4 space-y-3">
                    <p className="text-xs font-bold text-gray-600 text-center">Selfie (Photo) / सेल्फ़ी *</p>
                    
                    <div className="flex gap-3">
                      {/* Capture Trigger */}
                      <button 
                        type="button"
                        onClick={startCamera}
                        className="flex-1 border border-orange-100 bg-orange-50/30 text-saffron p-3 rounded-xl text-xs font-bold hover:bg-orange-50 flex items-center justify-center gap-1.5"
                      >
                        <Camera size={16} /> Capture Selfie
                      </button>
                      
                      {/* File picker */}
                      <div className="flex-1 relative border border-gray-200 hover:bg-gray-50 rounded-xl flex items-center justify-center cursor-pointer">
                        <input 
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileChange('selfie', e.target.files[0])}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />
                        <span className="text-xs text-gray-600 font-bold flex items-center gap-1.5">
                          <Upload size={16} /> Upload Selfie File
                        </span>
                      </div>
                    </div>

                    {/* Camera view */}
                    {showCamera && (
                      <div className="relative border border-orange-100 rounded-xl overflow-hidden bg-black max-w-sm mx-auto p-1">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-48 object-cover rounded-lg" />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-3">
                          <button 
                            type="button" 
                            onClick={capturePhoto} 
                            className="bg-[#FF6600] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-orange-600"
                          >
                            Capture
                          </button>
                          <button 
                            type="button" 
                            onClick={stopCamera} 
                            className="bg-gray-600 text-white px-4 py-2 rounded-xl text-xs font-bold shadow-md hover:bg-gray-700"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}

                    {selfiePreview && (
                      <div className="max-w-[120px] mx-auto border-2 border-[#FF6600] rounded-full overflow-hidden aspect-square">
                        <img src={selfiePreview} alt="Selfie preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setActiveStep(3)}
                    className="border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button 
                    type="button"
                    onClick={handleNextStep4}
                    className="bg-[#FF6600] text-white px-8 py-3 rounded-xl font-bold hover:bg-orange-600 flex items-center gap-2 text-sm shadow-md"
                  >
                    NEXT <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Payment */}
            {activeStep === 5 && (
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-2">Step 5 — Payment Details / भुगतान विवरण</h3>

                <div className="space-y-4">
                  {/* Option donation */}
                  <div>
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">
                      क्या आप एक अतिरिक्त सहयोग राशि भी जोड़ना चाहेंगे? (वैकल्पिक) / Add Optional Donation
                    </label>
                    <input 
                      type="number"
                      value={form.optionalDonation || ''}
                      onChange={(e) => setForm({ ...form, optionalDonation: Math.max(0, parseInt(e.target.value) || 0) })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-sm font-bold"
                      placeholder="e.g. ₹500"
                    />
                  </div>

                  {/* Calculations */}
                  <div className="bg-gray-50 border border-gray-150 rounded-2xl p-4 divide-y divide-gray-100 text-sm">
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500 font-bold">Registration Fee:</span>
                      <span className="font-bold text-charcoal">₹{baseFee}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-500 font-bold">Optional Donation:</span>
                      <span className="font-bold text-charcoal">+₹{donationAmount}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 text-base">
                      <span className="font-extrabold text-[#FF6600]">Total Amount:</span>
                      <span className="text-[#FF6600] font-black">₹{totalAmount}</span>
                    </div>
                  </div>

                  {/* Method select */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider">Payment Method / भुगतान विधि</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {['UPI', 'QR Code', 'Razorpay', 'Bank Transfer'].map(m => (
                        <button
                          key={m}
                          type="button"
                          onClick={() => setForm({ ...form, paymentMethod: m })}
                          className={`p-3 border rounded-xl font-bold text-xs transition-all ${
                            form.paymentMethod === m 
                              ? 'border-[#FF6600] bg-orange-50/20 text-[#FF6600]' 
                              : 'border-gray-200 hover:border-gray-300 text-gray-600'
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Conditional Offline/Manual Payment Instructions */}
                  {form.paymentMethod !== 'Razorpay' && (
                    <div className="bg-orange-50/20 border border-orange-100 rounded-2xl p-5 space-y-4 animate-fade-in text-sm">
                      <h4 className="font-bold text-[#FF6600] uppercase tracking-wider text-xs border-b border-orange-100 pb-2">
                        Offline / Manual Payment Instructions
                      </h4>
                      
                      {/* UPI / QR Details */}
                      {(form.paymentMethod === 'UPI' || form.paymentMethod === 'QR Code') && (
                        <div className="space-y-4">
                          <div className="flex space-x-2 justify-center mb-3">
                            {['Google Pay', 'Indian Bank'].map((sub) => (
                              <button
                                key={sub}
                                type="button"
                                onClick={() => setJoinActiveQrTab(sub)}
                                className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition-all cursor-pointer ${
                                  joinActiveQrTab === sub
                                    ? 'bg-orange-100 text-saffron border border-orange-200'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                              >
                                {sub}
                              </button>
                            ))}
                          </div>
                          
                          <div className="flex flex-col items-center justify-center bg-white p-4 rounded-xl border border-gray-150 shadow-sm max-w-xs mx-auto">
                            <div className="w-40 h-52 bg-white border border-gray-100 shadow-sm flex items-center justify-center rounded-lg mb-3 overflow-hidden">
                              <img 
                                src={joinActiveQrTab === 'Google Pay' ? '/qrs/google-pay-qr.png' : '/qrs/indian-bank-qr.png'} 
                                alt={`${joinActiveQrTab} QR`} 
                                className="w-full h-full object-contain"
                              />
                            </div>
                            <p className="font-bold text-xs text-charcoal">{joinActiveQrTab} UPI ID:</p>
                            <p className="font-mono text-xs text-[#FF6600] font-bold mt-1 select-all">
                              {joinActiveQrTab === 'Google Pay' ? '9768000666-4@okbizaxis' : 'sanatandharmmanavkalyanfo@indianbk'}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Bank Details */}
                      {form.paymentMethod === 'Bank Transfer' && (
                        <div className="bg-white p-4 rounded-xl border border-gray-150 shadow-sm space-y-2.5 text-xs text-gray-700">
                          <div><span className="text-gray-400 font-bold block">ACCOUNT NAME</span><span className="font-bold text-charcoal">SANATAN DHARM MANAV KALYAN FOUNDATION</span></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><span className="text-gray-400 font-bold block">ACCOUNT NUMBER</span><span className="font-bold text-charcoal font-mono">036888700000333</span></div>
                            <div><span className="text-gray-400 font-bold block">IFSC CODE</span><span className="font-bold text-charcoal font-mono">YESB0000368</span></div>
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><span className="text-gray-400 font-bold block">BANK NAME</span><span className="font-bold text-charcoal">YES BANK LTD</span></div>
                            <div><span className="text-gray-400 font-bold block">ACCOUNT TYPE</span><span className="font-bold text-charcoal">CURRENT</span></div>
                          </div>
                        </div>
                      )}

                      {/* UTR Input & Screenshot */}
                      <div className="space-y-4 border-t border-orange-100 pt-4">
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                            Transaction Reference (UTR / Transaction ID) *
                          </label>
                          <input 
                            type="text"
                            required
                            value={form.manualTransactionRef || ''}
                            onChange={(e) => setForm({ ...form, manualTransactionRef: e.target.value })}
                            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-saffron focus:outline-none text-xs font-bold bg-white"
                            placeholder="Enter 12-digit UTR e.g. 123456789012"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1">
                            Upload Screenshot (Optional) / स्क्रीनशॉट अपलोड करें
                          </label>
                          <div className="relative border border-dashed border-gray-300 rounded-xl p-4 text-center hover:bg-gray-50/50 transition cursor-pointer">
                            <input 
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  setForm(prev => ({ ...prev, manualPaymentScreenshot: file }));
                                  setManualScreenshotPreview(URL.createObjectURL(file));
                                }
                              }}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                            <div className="space-y-1">
                              <p className="text-xs font-bold text-gray-500">Choose File</p>
                              <p className="text-[10px] text-gray-400">PNG, JPG up to 5MB</p>
                            </div>
                            {manualScreenshotPreview && (
                              <div className="mt-2 max-w-[120px] mx-auto border border-gray-200 rounded-lg overflow-hidden">
                                <img src={manualScreenshotPreview} alt="Payment Screenshot" className="w-full h-auto" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                    </div>
                  )}
                </div>

                {submitError && (
                  <div className="p-4 bg-red-50 text-red-750 text-red-700 border border-red-100 rounded-xl text-xs font-bold">
                    ⚠️ {submitError}
                  </div>
                )}

                <div className="pt-4 flex justify-between">
                  <button 
                    type="button"
                    onClick={() => setActiveStep(4)}
                    className="border border-gray-300 text-gray-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 flex items-center gap-2 text-sm"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button 
                    type="button"
                    onClick={handlePayAndSubmit}
                    disabled={submitting}
                    className="bg-[#FF6600] text-white px-8 py-3 rounded-xl font-extrabold hover:bg-orange-600 flex items-center gap-2 text-sm shadow-md disabled:opacity-40"
                  >
                    {submitting ? 'Submitting...' : 'Pay & Submit'}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 6: Success Page */}
            {activeStep === 6 && submittedData && (
              <div className="space-y-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                  ✓
                </div>
                
                <div className="space-y-2">
                  <h2 className="text-2xl font-black text-charcoal">🎉 Welcome to {submittedData.category}</h2>
                  <p className="text-sm text-gray-500 font-devanagari leading-relaxed">
                    आपका आवेदन सफलतापूर्वक जमा हो गया है। Verification के बाद आपकी सदस्यता सक्रिय की जाएगी।
                  </p>
                </div>

                {/* Application number and membership id */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
                  <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-0.5">Application Number</span>
                    <span className="font-mono text-sm text-[#FF6600] font-black">{appNumber || 'APP-SS-000001'}</span>
                  </div>

                  <div className="p-4 bg-gray-50 border border-gray-150 rounded-2xl text-center">
                    <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest block mb-0.5">Member ID Status</span>
                    <span className="text-xs text-amber-600 font-extrabold block mt-0.5">Pending Approval</span>
                  </div>
                </div>

                {/* Receipt summary */}
                <div className="bg-orange-50/30 border border-orange-100 rounded-2xl p-6 text-left text-sm max-w-md mx-auto space-y-2">
                  <h4 className="font-extrabold text-[#FF6600] uppercase tracking-wider text-xs border-b border-orange-100 pb-2 mb-2">Registration Receipt</h4>
                  <div className="flex justify-between"><span className="text-gray-500 font-medium">Applicant:</span><span className="font-bold text-charcoal">{submittedData.fullName}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500 font-medium">Category:</span><span className="font-bold text-charcoal">{submittedData.category}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500 font-medium">Level:</span><span className="font-bold text-charcoal">{submittedData.level}</span></div>
                  <div className="flex justify-between"><span className="text-gray-500 font-medium">Amount Paid:</span><span className="font-black text-[#FF6600]">₹{submittedData.totalPaid}</span></div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4 max-w-md mx-auto">
                  <a
                    href={`${import.meta.env.VITE_API_URL}/api/membership/${submittedData.membershipId}/receipt`}
                    download
                    className="w-full sm:flex-1 bg-[#FF6600] text-white py-3 rounded-xl font-bold text-sm hover:bg-orange-600 shadow-md flex items-center justify-center gap-1.5"
                  >
                    <Download size={16} /> Download Receipt
                  </a>

                  <button 
                    onClick={handleShare}
                    className="w-full sm:flex-1 border border-[#FF6600] text-[#FF6600] py-3 rounded-xl font-bold text-sm hover:bg-orange-50 flex items-center justify-center gap-1.5"
                  >
                    <Share2 size={16} /> Share with Friends
                  </button>
                </div>

                <div>
                  <Link 
                    to="/portal" 
                    className="text-xs text-gray-500 hover:text-charcoal font-semibold underline inline-flex items-center gap-1"
                  >
                    Go to Dashboard → <ExternalLink size={12} />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
