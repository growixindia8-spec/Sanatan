import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function TrustVerificationPortal() {
  const [documentType, setDocumentType] = useState('volunteer-id');
  const [credentialNumber, setCredentialNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const getApiUrl = () => {
    let url = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    if (url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!credentialNumber.trim()) {
      setError('कृपया क्रेडेंशियल नंबर दर्ज करें। / Please enter a credential number.');
      setResult(null);
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    const cleanCred = encodeURIComponent(credentialNumber.trim());

    try {
      let response;
      let data;

      if (documentType === 'donation-receipt') {
        // Try verifying as donation transaction ref first
        response = await fetch(`${getApiUrl()}/api/donations/verify-transaction?utr=${cleanCred}`);
        data = await response.json();

        // If not found in donations, fallback to general certificate database
        if (!data.valid) {
          const certResponse = await fetch(`${getApiUrl()}/api/verify/donation-receipt/${cleanCred}`);
          const certData = await certResponse.json();
          if (certData.valid) {
            data = certData;
          }
        }
      } else {
        response = await fetch(`${getApiUrl()}/api/verify/${documentType}/${cleanCred}`);
        data = await response.json();
      }

      if (data && data.success) {
        setResult(data);
      } else {
        setError('सत्यापन के दौरान त्रुटि हुई। / Verification error occurred.');
      }
    } catch (err) {
      console.error(err);
      setError('सर्वर कनेक्शन त्रुटि। / Server connection error.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="verification-portal" className="py-16 bg-[#FBF1E7] border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4">
        
        {/* Dark navy-to-black gradient background card */}
        <div className="bg-gradient-to-br from-slate-900 to-black rounded-3xl shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            
            {/* Left Side Content */}
            <div className="p-10 md:p-14 flex flex-col justify-center">
              <div className="w-14 h-14 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                <ShieldCheck size={28} className="text-green-500" strokeWidth={2.5} />
              </div>
              <span className="text-saffron text-sm font-bold tracking-widest uppercase mb-3">
                TRUST & VERIFICATION PORTAL
              </span>
              <h2 className="text-3xl md:text-4xl font-bold font-devanagari text-white mb-6 leading-tight">
                विश्वास के साथ सत्यापन।<br/>भरोसे के साथ पुष्टि।
              </h2>
              <p className="text-gray-400 text-[15px] leading-relaxed">
                Volunteer IDs, member certificates, coordinator postings, donation receipts — every credential issued by us is checkable in real time.
              </p>
            </div>

            {/* Right Side Form Card */}
            <div className="p-10 md:p-14 bg-white/5 border-l border-white/10 backdrop-blur-sm flex flex-col justify-center">
              <form onSubmit={handleVerify} className="space-y-6">
                
                {/* Document Type */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                    Document Type
                  </label>
                  <div className="relative">
                    <select 
                      value={documentType}
                      onChange={(e) => setDocumentType(e.target.value)}
                      disabled={loading}
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all appearance-none cursor-pointer disabled:opacity-50"
                    >
                      <option value="volunteer-id" className="bg-slate-900 text-white">Volunteer ID</option>
                      <option value="member-certificate" className="bg-slate-900 text-white">Member Certificate</option>
                      <option value="coordinator-id" className="bg-slate-900 text-white">Coordinator ID</option>
                      <option value="donation-receipt" className="bg-slate-900 text-white">Donation Receipt / UTR</option>
                      <option value="appointment-letter" className="bg-slate-900 text-white">Appointment Letter</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
                      <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                    </div>
                  </div>
                </div>

                {/* Credential Number */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-gray-400 tracking-widest uppercase">
                    Credential Number / UTR
                  </label>
                  <input 
                    type="text" 
                    value={credentialNumber}
                    onChange={(e) => setCredentialNumber(e.target.value)}
                    disabled={loading}
                    placeholder={documentType === 'donation-receipt' ? "Enter UTR e.g. YESB0000368..." : "e.g. SDV-2024-00128"} 
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3.5 text-white font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all placeholder-gray-600 disabled:opacity-50" 
                  />
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-[#FF6600] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#e65c00] transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/20 active:scale-95 mt-4 disabled:bg-orange-400 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <Search size={18} strokeWidth={2.5} />
                      <span>Verify Now</span>
                    </>
                  )}
                </button>

                {/* Results Notification */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 text-red-200 px-4 py-3.5 rounded-xl text-xs font-devanagari flex items-center gap-2.5">
                    <AlertTriangle size={16} className="text-red-400 flex-shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {result && (
                  <div className="animate-fade-in">
                    {result.valid ? (
                      <div className="bg-green-500/15 border border-green-500/35 text-white p-4 rounded-xl space-y-2.5 text-sm">
                        <div className="flex items-center gap-2 text-green-400 font-bold">
                          <CheckCircle2 size={18} />
                          <span>सत्यापित रिकॉर्ड / RECORD VERIFIED</span>
                        </div>
                        <div className="space-y-1 text-xs text-gray-300 font-devanagari">
                          <p><strong className="text-white">Name / नाम:</strong> {result.name}</p>
                          {result.amount !== undefined ? (
                            <>
                              <p><strong className="text-white">Amount / राशि:</strong> ₹{result.amount}</p>
                              <p><strong className="text-white">Campaign / अभियान:</strong> {result.projectFor}</p>
                              <p><strong className="text-white">Date / दिनांक:</strong> {result.date}</p>
                            </>
                          ) : (
                            <p><strong className="text-white">Issued Date / जारी दिनांक:</strong> {result.issuedDate}</p>
                          )}
                          <p>
                            <strong className="text-white">Status / स्थिति:</strong>{' '}
                            <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold ${
                              result.status === 'Active' || result.status === 'verified'
                                ? 'bg-green-600/30 text-green-300'
                                : 'bg-red-600/30 text-red-300'
                            }`}>
                              {result.status}
                            </span>
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-red-500/10 border border-red-500/20 text-red-200 p-4 rounded-xl text-xs font-devanagari flex items-start gap-2.5">
                        <AlertTriangle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold mb-1">रिकॉर्ड नहीं मिला / No Record Found</p>
                          <p className="text-gray-400">{result.message}</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}

              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
