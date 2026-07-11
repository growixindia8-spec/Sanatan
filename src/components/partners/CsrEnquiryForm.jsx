import React, { useState } from 'react';

const CsrEnquiryForm = () => {
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
    interestedInCollaboration: '',
    confirmAccurate: false,
    consentContact: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Frontend validation is handled by HTML5 'required' attributes
    console.log('CSR Enquiry Submitted:', formData);
    alert('CSR Enquiry Submitted Successfully (Placeholder)');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 lg:space-y-8">
      {/* 01 - Basic Information */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-50">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h3 className="text-xl font-bold text-charcoal">Basic Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              CONTACT PERSON NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="contactPersonName"
              required
              placeholder="Full name"
              value={formData.contactPersonName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              COMPANY / ORGANIZATION NAME <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="organizationName"
              required
              placeholder="Registered name"
              value={formData.organizationName}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              DESIGNATION <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="designation"
              required
              placeholder="e.g. CSR Head"
              value={formData.designation}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* 02 - Contact Details */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-50">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <h3 className="text-xl font-bold text-charcoal">Contact Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              OFFICIAL EMAIL ID <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="emailId"
              required
              placeholder="name@company.com"
              value={formData.emailId}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              MOBILE NUMBER <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="mobileNumber"
              required
              placeholder="+91 9-xxxx-xxxx"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
          </div>
          <div className="space-y-2 md:col-span-2 lg:col-span-1">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              COMPANY WEBSITE
            </label>
            <input
              type="url"
              name="companyWebsite"
              placeholder="https://"
              value={formData.companyWebsite}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
          </div>
        </div>
      </div>

      {/* 03 - Company Details */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-50">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            03
          </div>
          <h3 className="text-xl font-bold text-charcoal">Company Details</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              INDUSTRY TYPE <span className="text-red-500">*</span>
            </label>
            <select
              name="industryType"
              required
              value={formData.industryType}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none bg-white appearance-none"
            >
              <option value="" disabled>Select industry</option>
              <option value="IT/Technology">IT / Technology</option>
              <option value="Manufacturing">Manufacturing</option>
              <option value="Finance/Banking">Finance / Banking</option>
              <option value="Healthcare">Healthcare</option>
              <option value="Education">Education</option>
              <option value="Other">Other</option>
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 uppercase tracking-wide">
              COMPANY LOCATION (CITY & STATE) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="companyLocation"
              required
              placeholder="e.g. Mumbai, Maharashtra"
              value={formData.companyLocation}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition-all outline-none"
            />
            <div className="pt-2">
              <label className="flex items-center space-x-3 cursor-pointer group">
                <input
                  type="checkbox"
                  name="isPanIndia"
                  checked={formData.isPanIndia}
                  onChange={handleChange}
                  className="w-5 h-5 rounded border-gray-300 text-saffron focus:ring-saffron focus:ring-offset-0 transition-all cursor-pointer"
                />
                <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors">Pan India / Multiple Locations</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 04 - Collaboration Interest */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100">
        <div className="flex items-center space-x-4 mb-6 pb-4 border-b border-gray-50">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
            04
          </div>
          <h3 className="text-xl font-bold text-charcoal">Are You Interested In CSR Collaboration? <span className="text-red-500">*</span></h3>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {['Yes', 'Need More Information', 'No'].map((option) => (
            <label key={option} className="cursor-pointer">
              <input
                type="radio"
                name="interestedInCollaboration"
                value={option}
                checked={formData.interestedInCollaboration === option}
                onChange={handleChange}
                required
                className="peer sr-only"
              />
              <div className="px-6 py-3 rounded-full border-2 border-gray-200 text-gray-600 font-semibold peer-checked:border-saffron peer-checked:bg-saffron/5 peer-checked:text-saffron hover:border-gray-300 transition-all">
                {option}
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Consent Checkboxes */}
      <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-100 space-y-4">
        <label className="flex items-start space-x-4 cursor-pointer group">
          <input
            type="checkbox"
            name="confirmAccurate"
            required
            checked={formData.confirmAccurate}
            onChange={handleChange}
            className="w-5 h-5 mt-1 rounded border-gray-300 text-saffron focus:ring-saffron focus:ring-offset-0 transition-all cursor-pointer flex-shrink-0"
          />
          <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors leading-relaxed">
            I confirm the information provided is accurate and I am authorized to represent the organization for CSR engagement.
          </span>
        </label>
        
        <label className="flex items-start space-x-4 cursor-pointer group">
          <input
            type="checkbox"
            name="consentContact"
            required
            checked={formData.consentContact}
            onChange={handleChange}
            className="w-5 h-5 mt-1 rounded border-gray-300 text-saffron focus:ring-saffron focus:ring-offset-0 transition-all cursor-pointer flex-shrink-0"
          />
          <span className="text-gray-600 font-medium group-hover:text-gray-900 transition-colors leading-relaxed">
            I consent to be contacted by the Foundation's CSR team via email or phone for partnership discussions.
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-saffron text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all shadow-lg shadow-orange-500/20 active:scale-[0.99] uppercase tracking-wider"
      >
        Submit CSR Enquiry
      </button>
    </form>
  );
};

export default CsrEnquiryForm;
