import React, { useState } from 'react';

export default function CsrEnquiryForm() {
  const [formData, setFormData] = useState({
    contactPersonName: '',
    organizationName: '',
    designation: '',
    emailId: '',
    mobileNumber: '',
    companyWebsite: '',
    industryType: '',
    companyLocation: '',
    isPanIndia: false,
    interestedInCollaboration: 'Yes', // Default to Yes
    // Yes fields
    focusAreas: [],
    contributionPreference: '',
    contributionRange: '',
    minCustomAmount: '',
    maxCustomAmount: '',
    budgetCycle: [],
    collaborationTypes: [],
    proposal: '',
    // Need Info fields
    query: '',
    // Consent
    agreeContact: false,
    confirmTrue: false
  });

  const [submitted, setSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleCheckboxGroupChange = (name, value, isChecked) => {
    setFormData((prev) => {
      const currentList = prev[name] || [];
      if (isChecked) {
        return { ...prev, [name]: [...currentList, value] };
      } else {
        return { ...prev, [name]: currentList.filter((item) => item !== value) };
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CSR Form Submission Data:', formData);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-md border border-green-100 text-center space-y-6">
        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto text-3xl">
          🙏
        </div>
        <h3 className="text-2xl font-bold text-charcoal">धन्यवाद!</h3>
        <p className="text-gray-600 font-devanagari leading-relaxed">
          आपकी जानकारी सफलतापूर्वक प्राप्त हो गई है।
          <br />
          हमारी CSR Team 24–48 कार्य घंटों के भीतर आपसे संपर्क करने का प्रयास करेगी।
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2 border border-gray-200 hover:border-saffron hover:text-saffron text-gray-500 font-bold rounded-full text-sm transition-all"
        >
          Submit Another Enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
      {/* SECTION 1 — Basic Information */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-3 mb-5 flex items-center gap-3">
          <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">1</span>
          Basic Information / बुनियादी जानकारी
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Contact Person Name *</label>
            <input
              type="text"
              name="contactPersonName"
              value={formData.contactPersonName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="Your full name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company / Organization Name *</label>
            <input
              type="text"
              name="organizationName"
              value={formData.organizationName}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="Registered name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Designation *</label>
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="e.g. CSR Manager / Director"
            />
          </div>
        </div>
      </div>

      {/* SECTION 2 — Contact Details */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-3 mb-5 flex items-center gap-3">
          <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">2</span>
          Contact Details / संपर्क विवरण
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Official Email ID *</label>
            <input
              type="email"
              name="emailId"
              value={formData.emailId}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="name@company.com"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Mobile Number *</label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="10-digit number"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company Website (Optional)</label>
            <input
              type="url"
              name="companyWebsite"
              value={formData.companyWebsite}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="https://example.com"
            />
          </div>
        </div>
      </div>

      {/* SECTION 3 — Company Details */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-3 mb-5 flex items-center gap-3">
          <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">3</span>
          Company Details / संस्थागत विवरण
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Industry Type *</label>
            <select
              name="industryType"
              value={formData.industryType}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium bg-white appearance-none"
            >
              <option value="" disabled>Select Industry Type</option>
              {[
                "Information Technology (IT)", "Manufacturing", "Healthcare", "Finance & Banking", 
                "Education", "Media & Entertainment", "Retail & E-Commerce", "Infrastructure & Real Estate", 
                "Energy & Utilities", "Logistics & Transportation", "Hospitality & Tourism", "Other"
              ].map((ind) => (
                <option key={ind} value={ind}>{ind}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Company Location (City & State) *</label>
            <input
              type="text"
              name="companyLocation"
              value={formData.companyLocation}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
              placeholder="e.g. Mumbai, Maharashtra"
            />
          </div>
        </div>
        <label className="inline-flex items-center gap-2 cursor-pointer mt-2 text-sm text-gray-600 hover:text-charcoal font-medium">
          <input
            type="checkbox"
            name="isPanIndia"
            checked={formData.isPanIndia}
            onChange={handleInputChange}
            className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron"
          />
          <span>Pan India / Multiple Locations</span>
        </label>
      </div>

      {/* SECTION 4 — CSR Interest */}
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-charcoal border-b border-gray-100 pb-3 mb-5 flex items-center gap-3">
          <span className="w-6 h-6 bg-black text-white text-xs rounded-full flex items-center justify-center">4</span>
          Are You Interested In CSR Collaboration? *
        </h3>
        
        <div className="flex gap-4 mb-6">
          {['Yes', 'Need More Information', 'No'].map((option) => (
            <label key={option} className="flex-1 cursor-pointer">
              <input
                type="radio"
                name="interestedInCollaboration"
                value={option}
                checked={formData.interestedInCollaboration === option}
                onChange={handleInputChange}
                className="peer sr-only"
              />
              <div className="p-3 rounded-xl border-2 text-center text-sm font-bold transition-all hover:bg-gray-50 peer-checked:border-[#FF6600] peer-checked:bg-orange-50 peer-checked:text-[#FF6600]">
                {option === 'Yes' ? 'हाँ / Yes' : option === 'Need More Information' ? 'जानकारी चाहिए / Need Info' : 'नहीं / No'}
              </div>
            </label>
          ))}
        </div>

        {/* CONDITIONAL YES FIELDS */}
        {formData.interestedInCollaboration === 'Yes' && (
          <div className="space-y-6 border-t border-gray-50 pt-6">
            {/* CSR Focus Areas */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">CSR Focus Areas *</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                {[
                  "Education & Skill Development", "Healthcare & Medical Support", "Women Empowerment & Safety", 
                  "Child Welfare", "Food & Nutrition Support", "Disaster Relief & Humanitarian Assistance", 
                  "Environmental Projects & Tree Plantation", "Gau Seva & Animal Welfare", "Cultural Heritage & Awareness", 
                  "Other"
                ].map((area) => (
                  <label key={area} className="flex items-start gap-2.5 cursor-pointer text-gray-600 hover:text-charcoal">
                    <input
                      type="checkbox"
                      checked={formData.focusAreas.includes(area)}
                      onChange={(e) => handleCheckboxGroupChange('focusAreas', area, e.target.checked)}
                      className="w-4 h-4 rounded mt-0.5 border-gray-300 text-saffron focus:ring-saffron"
                    />
                    <span>{area}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Contribution Preference & Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Contribution Preference *</label>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {['One-Time', 'Monthly', 'Quarterly', 'Yearly'].map((pref) => (
                    <label key={pref} className="flex items-center gap-2 cursor-pointer hover:text-charcoal">
                      <input
                        type="radio"
                        name="contributionPreference"
                        value={pref}
                        checked={formData.contributionPreference === pref}
                        onChange={handleInputChange}
                        required={formData.interestedInCollaboration === 'Yes'}
                        className="w-4 h-4 border-gray-300 text-saffron focus:ring-saffron"
                      />
                      <span>{pref}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Estimated CSR Contribution Range *</label>
                <div className="flex flex-col gap-2 text-sm text-gray-600">
                  {[
                    "₹50,000–₹5,00,000", "₹5,00,000–₹11,00,000", "₹11,00,000–₹21,00,000", 
                    "₹21,00,000–₹51,00,000", "₹51,00,000+", "Custom Amount"
                  ].map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer hover:text-charcoal">
                      <input
                        type="radio"
                        name="contributionRange"
                        value={range}
                        checked={formData.contributionRange === range}
                        onChange={handleInputChange}
                        required={formData.interestedInCollaboration === 'Yes'}
                        className="w-4 h-4 border-gray-300 text-saffron focus:ring-saffron"
                      />
                      <span>{range}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Custom Amount Fields */}
            {formData.contributionRange === 'Custom Amount' && (
              <div className="grid grid-cols-2 gap-4 bg-orange-50/50 p-4 rounded-2xl border border-orange-100/50">
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Minimum Amount (₹)</label>
                  <input
                    type="number"
                    name="minCustomAmount"
                    value={formData.minCustomAmount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm"
                    placeholder="Min budget"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Maximum Amount (₹)</label>
                  <input
                    type="number"
                    name="maxCustomAmount"
                    value={formData.maxCustomAmount}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm"
                    placeholder="Max budget"
                  />
                </div>
              </div>
            )}

            {/* CSR Budget Cycle */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">CSR Budget Cycle (Optional)</label>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                {["Q1 (Apr–Jun)", "Q2 (Jul–Sep)", "Q3 (Oct–Dec)", "Q4 (Jan–Mar)", "Flexible"].map((cycle) => (
                  <label key={cycle} className="flex items-center gap-2 cursor-pointer hover:text-charcoal">
                    <input
                      type="checkbox"
                      checked={formData.budgetCycle.includes(cycle)}
                      onChange={(e) => handleCheckboxGroupChange('budgetCycle', cycle, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron"
                    />
                    <span>{cycle}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Type of Collaboration */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-3">Type of Collaboration</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-600">
                {[
                  "CSR Project Sponsorship", "Employee Volunteering", "Cause Partnership", 
                  "Event Sponsorship", "Infrastructure Support", "Skill Development Program", 
                  "Long-Term Strategic Partnership", "Other"
                ].map((type) => (
                  <label key={type} className="flex items-center gap-2 cursor-pointer hover:text-charcoal">
                    <input
                      type="checkbox"
                      checked={formData.collaborationTypes.includes(type)}
                      onChange={(e) => handleCheckboxGroupChange('collaborationTypes', type, e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300 text-saffron focus:ring-saffron"
                    />
                    <span>{type}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Proposal Textarea */}
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">CSR Proposal / Message *</label>
              <textarea
                name="proposal"
                value={formData.proposal}
                onChange={handleInputChange}
                required={formData.interestedInCollaboration === 'Yes'}
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
                placeholder="Brief details about CSR interest, preferred project area or partnership requirement."
              ></textarea>
            </div>
          </div>
        )}

        {/* CONDITIONAL NEED MORE INFO FIELDS */}
        {formData.interestedInCollaboration === 'Need More Information' && (
          <div className="space-y-4 border-t border-gray-50 pt-6">
            <div>
              <label className="block text-xs font-bold text-gray-600 uppercase tracking-wider mb-2">Message / Query *</label>
              <textarea
                name="query"
                value={formData.query}
                onChange={handleInputChange}
                required={formData.interestedInCollaboration === 'Need More Information'}
                rows="4"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-saffron text-sm text-charcoal font-medium"
                placeholder="Please share your questions or information requirements. Our CSR Team will contact you."
              ></textarea>
            </div>
          </div>
        )}

        {/* CONDITIONAL NO PATH */}
        {formData.interestedInCollaboration === 'No' && (
          <div className="border-t border-gray-50 pt-6 text-sm text-gray-500 font-medium italic">
            Thank you for your response. If you would like to explore future collaboration opportunities, please feel free to contact us anytime.
          </div>
        )}
      </div>

      {/* FINAL CONSENT */}
      {formData.interestedInCollaboration !== 'No' && (
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600 hover:text-charcoal font-medium">
            <input
              type="checkbox"
              name="agreeContact"
              checked={formData.agreeContact}
              onChange={handleInputChange}
              required
              className="w-4 h-4 rounded mt-0.5 border-gray-300 text-saffron focus:ring-saffron"
            />
            <span>I agree to be contacted regarding CSR collaboration and partnership opportunities. *</span>
          </label>

          <label className="flex items-start gap-3 cursor-pointer text-sm text-gray-600 hover:text-charcoal font-medium">
            <input
              type="checkbox"
              name="confirmTrue"
              checked={formData.confirmTrue}
              onChange={handleInputChange}
              required
              className="w-4 h-4 rounded mt-0.5 border-gray-300 text-saffron focus:ring-saffron"
            />
            <span>I confirm that the information provided above is true and correct to the best of my knowledge. *</span>
          </label>
        </div>
      )}

      {/* Submit Button */}
      {formData.interestedInCollaboration !== 'No' && (
        <button
          type="submit"
          className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 text-sm uppercase tracking-wider"
        >
          Submit CSR Enquiry
        </button>
      )}
    </form>
  );
}
