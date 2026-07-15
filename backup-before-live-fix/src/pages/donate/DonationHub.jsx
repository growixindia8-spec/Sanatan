import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AmountSelector from '../../components/donate/AmountSelector';
import ScanAndPayCard from '../../components/donate/ScanAndPayCard';
import BankTransferForm from '../../components/donate/BankTransferForm';
import Newsletter from '../../components/Newsletter';
import { openRazorpayCheckout } from '../../lib/razorpayCheckout';
import { ExternalLink } from 'lucide-react';

export default function DonationHub() {
  const [searchParams] = useSearchParams();
  const [contributionType, setContributionType] = useState('Monthly');
  const [paymentMethod, setPaymentMethod] = useState('online');

  // Form states
  const [amount, setAmount] = useState(501);
  const [fullName, setFullName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [projectFor, setProjectFor] = useState('सनातन संस्कृति एवं जनजागरण');

  // Festival tracking fields
  const [festivalId, setFestivalId] = useState('');
  const [festivalName, setFestivalName] = useState('');
  const [campaignId, setCampaignId] = useState('');
  const [sourceType, setSourceType] = useState('direct');

  useEffect(() => {
    const amt = searchParams.get('amount');
    if (amt) {
      const parsedAmt = parseInt(amt, 10);
      if (!isNaN(parsedAmt)) {
        setAmount(parsedAmt);
      }
    }
    const type = searchParams.get('contributionType');
    if (type) {
      const normalized = type.toLowerCase();
      if (normalized === 'monthly') setContributionType('Monthly');
      else if (normalized === 'onetime' || normalized === 'one time' || normalized === 'one-time') setContributionType('One Time');
      else if (normalized === 'quarterly') setContributionType('Quarterly');
      else if (normalized === 'yearly') setContributionType('Yearly');
    }
    const campaignParam = searchParams.get('campaign');
    if (campaignParam) {
      setProjectFor(campaignParam);
      setCampaignId(campaignParam);
    }
    const festId = searchParams.get('festivalId');
    if (festId) {
      setFestivalId(festId);
      setSourceType('festival');
    }
    const festName = searchParams.get('festivalName');
    if (festName) {
      setFestivalName(festName);
      setProjectFor(festName);
    }
  }, [searchParams]);

  const [claim80G, setClaim80G] = useState(false);
  const [panNumber, setPanNumber] = useState('');
  
  // Submission & Success states
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [receiptUrl, setReceiptUrl] = useState('');

  // Confirmation Modal state
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const types = ['One Time', 'Monthly', 'Quarterly', 'Yearly'];

  // Escape key handler to close the modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showConfirmModal && !submitting) {
        setShowConfirmModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showConfirmModal, submitting]);

  const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  };

  const triggerDonationConfirm = (e) => {
    e.preventDefault();
    if (!fullName || !mobile || !email) {
      alert('कृपया सभी आवश्यक फ़ील्ड भरें। / Please fill all required fields.');
      return;
    }
    if (claim80G && !panNumber) {
      alert('80G कर लाभ के लिए पैन नंबर आवश्यक है। / PAN is required for 80G tax benefit.');
      return;
    }
    setShowConfirmModal(true);
  };

  const handleDonate = async () => {
    if (submitting) return;
    setSubmitting(true);
    setErrorMessage('');

    const targetUrl = `${getApiUrl()}/api/donations/create-order`;

    try {
      const res = await fetch(targetUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          amount, 
          fullName, 
          email, 
          mobile, 
          projectFor, 
          contributionType, 
          claim80G, 
          panNumber,
          festivalId,
          festivalName,
          campaign: campaignId,
          sourceType
        }),
      });
      
      let data;
      try {
        data = await res.json();
      } catch (parseErr) {
        console.error(`Request to ${targetUrl} returned non-JSON (Status ${res.status})`);
        throw new Error(`Server error (${res.status}). Please try again later.`);
      }

      if (!res.ok) {
        throw new Error(data.message || 'Failed to initiate donation order.');
      }

      // Close the confirmation modal right before launch
      setShowConfirmModal(false);

      openRazorpayCheckout({
        orderId: data.orderId,
        amount: data.amount,
        keyId: data.key,
        name: fullName,
        description: `Donation - ${projectFor}`,
        prefill: { name: fullName, email, contact: mobile },
        config: {
          display: {
            blocks: {
              upi_only: {
                name: "Pay via UPI",
                instruments: [
                  {
                    method: "upi"
                  }
                ]
              }
            },
            sequence: ["block.upi_only"],
            preferences: {
              show_default_blocks: false
            }
          }
        },
        onSuccess: async (response) => {
          const verifyUrl = `${getApiUrl()}/api/donations/verify-payment`;
          try {
            setSubmitting(true);
            const verifyRes = await fetch(verifyUrl, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                donationId: data.donationId
              }),
            });

            let verifyData;
            try {
              verifyData = await verifyRes.json();
            } catch (verifyParseErr) {
              console.error(`Request to ${verifyUrl} returned non-JSON (Status ${verifyRes.status})`);
              throw new Error(`Server verification error (${verifyRes.status}).`);
            }

            if (!verifyRes.ok) {
              throw new Error(verifyData.message || 'Payment verification failed.');
            }
            
            if (verifyData.donation && verifyData.donation.receiptUrl) {
              setReceiptUrl(verifyData.donation.receiptUrl);
            }
            setDonationSuccess(true);
          } catch (err) {
            setErrorMessage(err.message || 'भुगतान सत्यापित करने में विफल। / Verification failed.');
          } finally {
            setSubmitting(false);
          }
        },
        onFailure: (message) => {
          if (message && message.includes("cancelled")) {
            setErrorMessage("Payment cancelled. You can try again.");
          } else {
            setErrorMessage(message || 'भुगतान विफल या रद्द किया गया। / Payment failed or cancelled.');
          }
          setSubmitting(false);
        },
      });
    } catch (err) {
      setErrorMessage(err.message || 'भुगतान प्रारंभ करने में विफल। / Failed to initiate donation.');
      setSubmitting(false);
    }
  };

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
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 sm:p-8 animate-fadeIn">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-charcoal mb-1">Donation Details</h2>
                    <p className="text-gray-500 text-sm">Fill in your details and choose how you want to contribute.</p>
                  </div>
                  <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                      onClick={() => setPaymentMethod('online')}
                      className={`font-bold text-sm px-4 py-1.5 rounded shadow-sm transition-colors ${paymentMethod === 'online' ? 'bg-white text-saffron' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Online
                    </button>
                    <button 
                      onClick={() => setPaymentMethod('offline')}
                      className={`font-bold text-sm px-4 py-1.5 rounded shadow-sm transition-colors ${paymentMethod === 'offline' ? 'bg-white text-saffron' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Offline
                    </button>
                  </div>
                </div>

                {paymentMethod === 'online' ? (
                  donationSuccess ? (
                    <div className="text-center py-12 space-y-6">
                      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl font-bold">
                        ✓
                      </div>
                      <h2 className="text-2xl font-bold text-charcoal">🙏 Thank You for your donation!</h2>
                      <p className="text-sm text-gray-600 font-devanagari leading-relaxed max-w-md mx-auto">
                        आपका दान सफलतापूर्वक प्राप्त हो गया है। आपके इस पुण्य कार्य के लिए हम हृदय से आभारी हैं।
                      </p>
                      {receiptUrl && (
                        <div className="pt-2">
                          <a 
                            href={receiptUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 bg-[#FF6600] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-orange-600 shadow-md transition-all"
                          >
                            Download 80G Tax Receipt <ExternalLink size={16} />
                          </a>
                        </div>
                      )}
                      <button 
                        onClick={() => {
                          setDonationSuccess(false);
                          setFullName('');
                          setMobile('');
                          setEmail('');
                          setPanNumber('');
                          setClaim80G(false);
                          setReceiptUrl('');
                        }} 
                        className="text-xs text-gray-500 hover:text-charcoal font-semibold underline block mx-auto mt-4"
                      >
                        Make Another Donation
                      </button>
                    </div>
                  ) : (
                    <>
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
                      <AmountSelector contributionType={contributionType} onAmountChange={setAmount} />

                      {/* Project / Donation For */}
                      <div className="mb-6">
                        <label className="block text-sm font-bold text-gray-700 mb-2">Project / Donation For</label>
                        <select 
                          value={projectFor}
                          onChange={(e) => setProjectFor(e.target.value)}
                          className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron text-charcoal font-medium"
                        >
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
                            <input 
                              type="text" 
                              value={fullName}
                              onChange={(e) => setFullName(e.target.value)}
                              className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" 
                              placeholder="Your Name" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Mobile *</label>
                            <input 
                              type="text" 
                              value={mobile}
                              onChange={(e) => setMobile(e.target.value)}
                              className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" 
                              placeholder="Phone Number" 
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                            <input 
                              type="email" 
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" 
                              placeholder="Email Address" 
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Payment Mode</label>
                            <select className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron" disabled>
                              <option>Online (Razorpay / UPI)</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="pt-2 space-y-4">
                          <label className="flex items-start gap-3 cursor-pointer">
                            <input 
                              type="checkbox" 
                              checked={claim80G}
                              onChange={(e) => setClaim80G(e.target.checked)}
                              className="mt-1 w-4 h-4 text-saffron focus:ring-saffron rounded border-gray-300" 
                            />
                            <div>
                              <p className="font-bold text-charcoal">I Want To Claim 80G Tax Benefit</p>
                              <p className="text-xs text-gray-500 mt-0.5">PAN is required for 80G verification.</p>
                            </div>
                          </label>

                          {claim80G && (
                            <div className="animate-fadeIn">
                              <label className="block text-sm font-bold text-gray-700 mb-1">PAN Number *</label>
                              <input 
                                type="text" 
                                value={panNumber}
                                onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                                className="w-full p-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:border-saffron font-mono" 
                                placeholder="Enter 10-digit PAN" 
                                maxLength={10}
                              />
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Security Note */}
                      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg mb-6 flex gap-3 items-start">
                        <div className="text-amber-500 mt-0.5">⚠️</div>
                        <p className="text-sm text-amber-800 font-devanagari">
                          <strong>Security Note:</strong> भुगतान करते समय कृपया सुनिश्चित करें कि स्क्रीन पर <strong>'Sanatan Dharm Manav Kalyan Foundation'</strong> नाम प्रदर्शित हो रहा हो। नाम सत्यापित करने के बाद ही भुगतान करें।
                        </p>
                      </div>

                      {errorMessage && (
                        <div className="p-4 bg-red-50 text-red-700 border border-red-100 rounded-xl text-xs font-bold mb-4">
                          ⚠️ {errorMessage}
                        </div>
                      )}

                      <button 
                        onClick={triggerDonationConfirm}
                        disabled={submitting}
                        className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg shadow-orange-500/30 disabled:opacity-50"
                      >
                        {submitting ? 'Processing Payment...' : `Donate ₹${amount} Securely`}
                      </button>
                      <p className="text-center text-xs text-gray-500 mt-4">
                        Secure payment options supported: UPI, QR, bank transfer, cards, and net banking.
                      </p>
                    </>
                  )
                ) : (
                  <BankTransferForm />
                )}
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

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-orange-100 overflow-hidden transform transition-all animate-scaleIn">
            {/* Header */}
            <div className="bg-gradient-to-r from-saffron to-[#ff5500] text-white px-6 py-4 flex items-center gap-3">
              <span className="text-xl">🛡️</span>
              <h3 className="text-lg font-bold">Confirm Your Donation</h3>
            </div>
            
            {/* Body */}
            <div className="p-6 space-y-4">
              <p className="text-gray-700 font-devanagari text-base font-medium text-center">
                Are you sure you want to donate <strong className="text-maroon text-xl font-bold">₹{amount}</strong> to Sanatan Dharm Manav Kalyan Foundation?
              </p>
              
              <div className="bg-orange-50/50 rounded-xl p-4 border border-orange-100/50 space-y-2.5 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Donor Name:</span>
                  <span className="text-charcoal font-bold">{fullName}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Donation Cause:</span>
                  <span className="text-charcoal font-bold text-right max-w-[200px] truncate">{projectFor}</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500 font-medium">Donation Type:</span>
                  <span className="text-charcoal font-bold">{contributionType}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500 font-medium">Total Amount:</span>
                  <span className="text-maroon font-extrabold text-base">₹{amount}</span>
                </div>
              </div>

              {/* Desktop QR Note */}
              <p className="hidden md:block text-[11px] text-gray-600 font-medium font-devanagari text-center leading-normal bg-orange-50 border border-orange-255 rounded-xl p-3 border-orange-200">
                For direct payment through GPay, PhonePe or Paytm, open this page on your mobile. Desktop payments use a secure UPI QR.
              </p>
            </div>
            
            {/* Footer Buttons */}
            <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end border-t border-gray-100">
              <button
                onClick={() => !submitting && setShowConfirmModal(false)}
                disabled={submitting}
                className="px-4 py-2.5 rounded-xl border border-gray-300 font-semibold text-gray-700 hover:bg-gray-100 transition-colors text-sm disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDonate}
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-[#FF6A00] text-white font-bold hover:bg-orange-600 transition-colors shadow-md text-sm flex items-center gap-1.5 disabled:opacity-50"
              >
                {submitting ? 'Opening secure UPI payment...' : `Yes, Donate ₹${amount}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reused Newsletter Component */}
      <Newsletter />
      
      <Footer />
    </div>
  );
}
