import React from 'react';

export default function FundraiserRequestForm() {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-charcoal text-white p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">FUNDRAISING REQUEST FORM</h2>
      </div>
      
      <form className="p-6 md:p-8 space-y-10">
        
        {/* Section A */}
        <section>
          <h3 className="text-xl font-bold text-saffron border-b border-gray-200 pb-2 mb-6">Section A — Applicant Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number *</label>
              <input type="tel" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Email ID</label>
              <input type="email" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">City / State *</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Applying As *</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required>
                <option value="">Select Option</option>
                <option>Individual</option>
                <option>Family</option>
                <option>Group</option>
                <option>Community</option>
                <option>NGO Project</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Section B */}
        <section>
          <h3 className="text-xl font-bold text-saffron border-b border-gray-200 pb-2 mb-6">Section B — Campaign Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Category *</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required>
                <option value="">Select Category</option>
                <option>Medical & Health Support</option>
                <option>Food Support</option>
                <option>Education & Skill Development</option>
                <option>Women Support & Safety</option>
                <option>Disaster Relief</option>
                <option>Gau Seva & Animal Welfare</option>
                <option>Cultural & Sanatan Awareness Activities</option>
                <option>Environment & Tree Plantation</option>
                <option>Fraud Awareness & Help Center</option>
                <option>Community Welfare Project</option>
                <option>Other</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Title *</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Brief Description of Need *</label>
              <textarea rows="3" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Beneficiary Type *</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required>
                <option value="">Select Option</option>
                <option>Self</option>
                <option>Family Member</option>
                <option>Other Individual</option>
                <option>Group</option>
                <option>Community</option>
                <option>NGO Project</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Target Fund Requirement (₹) *</label>
              <input type="number" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Amount Required (₹)</label>
              <input type="number" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Duration *</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required>
                <option value="">Select Option</option>
                <option>15 Days</option>
                <option>30 Days</option>
                <option>60 Days</option>
                <option>90 Days</option>
                <option>NGO Decision</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Time Sensitivity *</label>
              <select className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required>
                <option value="">Select Option</option>
                <option>Immediate</option>
                <option>Within 30 Days</option>
                <option>No Urgency</option>
              </select>
              <p className="text-xs text-gray-500 mt-2">संस्था आवश्यकता अनुसार लक्ष्य राशि एवं अभियान अवधि की समीक्षा अथवा संशोधन कर सकती है।</p>
            </div>
          </div>
        </section>

        {/* Section C */}
        <section>
          <h3 className="text-xl font-bold text-saffron border-b border-gray-200 pb-2 mb-6">Section C — Supporting Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Short Background of Case *</label>
              <textarea rows="4" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required></textarea>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Beneficiary Name / Cause Name *</label>
              <input type="text" className="w-full p-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-saffron focus:border-transparent outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Identity Proof Upload *</label>
              <p className="text-xs text-gray-500 mb-2">Aadhaar / PAN / Government Issued ID</p>
              <input type="file" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Supporting Documents Upload</label>
              <p className="text-xs text-gray-500 mb-2">Medical Documents, Fee Receipts, Disaster Proofs, Photographs, Letters, Other Relevant Documents</p>
              <input type="file" multiple className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">Photo / Video Upload (Optional)</label>
              <input type="file" className="w-full p-2 bg-gray-50 border border-gray-300 rounded-xl focus:outline-none" />
            </div>
            <div className="md:col-span-2 mt-2">
              <label className="block text-sm font-bold text-gray-700 mb-3">Campaign Visibility Preference</label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-saffron focus:ring-saffron rounded border-gray-300" />
                  <span className="text-gray-700">Public Campaign Publish Allowed</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 text-saffron focus:ring-saffron rounded border-gray-300" />
                  <span className="text-gray-700">Identity Hidden (Where Applicable)</span>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Section D */}
        <section>
          <h3 className="text-xl font-bold text-saffron border-b border-gray-200 pb-2 mb-6">Section D — Fund Transfer Preference</h3>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Fund Transfer Mode *</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="fundTransfer" className="w-4 h-4 text-saffron focus:ring-saffron border-gray-300" required />
                <span className="text-gray-700">Verified Beneficiary Account</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="fundTransfer" className="w-4 h-4 text-saffron focus:ring-saffron border-gray-300" required />
                <span className="text-gray-700">NGO Supervised Distribution</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="fundTransfer" className="w-4 h-4 text-saffron focus:ring-saffron border-gray-300" required />
                <span className="text-gray-700">NGO Decision After Verification</span>
              </label>
            </div>
          </div>
        </section>

        {/* Info Boxes */}
        <div className="space-y-4">
          <div className="bg-orange-50 border border-orange-200 rounded-xl p-5">
            <h4 className="font-bold text-orange-900 mb-2">Important Verification Note</h4>
            <p className="text-sm text-orange-800 font-devanagari leading-relaxed">
              संस्था प्रत्येक आवेदन एवं उपलब्ध दस्तावेज़ों का यथासंभव सत्यापन करने का प्रयास करती है। Direct Beneficiary Support केवल उन्हीं मामलों में उपलब्ध कराया जाएगा जहाँ आवश्यक जानकारी एवं दस्तावेज़ संतोषजनक पाए जाते हैं। यदि सत्यापन प्रक्रिया के दौरान कोई जानकारी अधूरी, अस्पष्ट, विरोधाभासी अथवा अतिरिक्त पुष्टि योग्य पाई जाती है, तो संस्था मामले को समीक्षा हेतु रोक सकती है, अतिरिक्त जानकारी मांग सकती है अथवा अपनी नीति के अनुसार Fund Transfer Mode में परिवर्तन कर सकती है। संस्था किसी भी समय अतिरिक्त सत्यापन, दस्तावेज़, वीडियो सत्यापन, स्थानीय जांच अथवा संदर्भ सत्यापन की मांग कर सकती है। संस्था का उद्देश्य प्रत्येक सहयोग राशि का उपयोग सही एवं वास्तविक आवश्यकता तक सुरक्षित रूप से पहुँचाना है।
            </p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
            <h4 className="font-bold text-gray-800 mb-2">Transparency & Protection Policy</h4>
            <p className="text-sm text-gray-600 font-devanagari leading-relaxed">
              संस्था को किसी भी आवेदन को स्वीकृत, अस्वीकृत, स्थगित अथवा अतिरिक्त समीक्षा हेतु रखने का अधिकार सुरक्षित रहेगा। सहयोग राशि का वितरण उपलब्ध दस्तावेज़ों, सत्यापन की स्थिति, मामले की प्रकृति एवं संस्था की नीति के अनुसार किया जाएगा। सभी निर्णय पारदर्शिता, उत्तरदायित्व एवं लाभार्थी के हित को ध्यान में रखकर लिए जाते हैं।
            </p>
          </div>
        </div>

        {/* Declarations */}
        <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
          <h4 className="font-bold text-charcoal mb-4">Declaration</h4>
          <div className="space-y-3">
            {[
              'मैं घोषणा करता/करती हूँ कि मेरे द्वारा दी गई जानकारी मेरी जानकारी के अनुसार सही एवं सत्य है।',
              'मुझे ज्ञात है कि संस्था अपनी नीति एवं सत्यापन प्रक्रिया के अनुसार आवेदन को स्वीकृत, अस्वीकृत अथवा समीक्षा हेतु रख सकती है।',
              'मुझे ज्ञात है कि Fundraising Approval की कोई गारंटी नहीं है।',
              'आवश्यकता पड़ने पर संस्था अतिरिक्त दस्तावेज़ अथवा जानकारी मांग सकती है।',
              'मैं सहमत हूँ कि संस्था आवश्यकता अनुसार मेरी जानकारी एवं दस्तावेज़ों का सत्यापन कर सकती है।'
            ].map((text, i) => (
              <label key={i} className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1 w-4 h-4 text-saffron focus:ring-saffron rounded border-gray-300" required />
                <span className="text-sm text-gray-700 font-devanagari leading-snug">{text}</span>
              </label>
            ))}
          </div>
        </section>

        <button type="submit" className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:shadow-lg shadow-orange-500/30 uppercase tracking-wider">
          Submit For Verification
        </button>

      </form>
      
      {/* Footer Notes */}
      <div className="p-6 md:p-8 pt-0 space-y-6">
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg flex gap-3 items-start">
          <div className="text-amber-500 mt-0.5">⚠️</div>
          <p className="text-sm text-amber-800 font-devanagari">
            <strong>Security Notice:</strong> सहयोग करते समय कृपया सुनिश्चित करें कि भुगतान स्क्रीन पर "Sanatan Dharm Manav Kalyan Foundation" नाम ही प्रदर्शित हो। किसी अन्य नाम पर भुगतान न करें।
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-lg">
          <p className="text-xs text-gray-600 font-devanagari leading-relaxed">
            <strong>Disclaimer:</strong> यह Fundraising Support Facility पूर्णतः मानवीय एवं गैर-व्यावसायिक उद्देश्यों के लिए संचालित की जाती है। संस्था Facilitation, Verification एवं Monitoring की भूमिका में कार्य करती है तथा किसी भी प्रकार की व्यक्तिगत, कानूनी, वित्तीय अथवा परिणाम संबंधी गारंटी प्रदान नहीं करती। सभी सहयोग स्वैच्छिक हैं तथा सहयोगकर्ता अपने विवेक से निर्णय लें।
          </p>
        </div>

        <div className="text-center pt-6 border-t border-gray-200">
          <p className="italic text-lg text-charcoal font-devanagari mb-3">
            "हमारा उद्देश्य केवल धन संग्रह करना नहीं, बल्कि सही व्यक्ति, सही उद्देश्य और सही आवश्यकता तक सहयोग पहुँचाना है — पूर्ण पारदर्शिता, उत्तरदायित्व एवं सेवा भावना के साथ।"
          </p>
          <div className="w-16 h-1 bg-saffron mx-auto mb-3"></div>
          <p className="font-bold text-saffron font-devanagari">🚩 सेवा ही सनातन • समर्पण ही हमारा धर्म</p>
        </div>
      </div>
    </div>
  );
}
