import React from 'react';

export default function CsrPartnerships() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">CSR & Partnerships</h2>
        <p className="text-gray-600 mb-10">साझेदारी से सेवा, सहयोग से परिवर्तन</p>
        
        <div className="bg-charcoal text-white rounded-2xl p-8 md:p-12 mb-16 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Become a CSR Partner</h3>
          <p className="text-gray-300 max-w-2xl mx-auto mb-8">From rural education to gaushala infrastructure — co-design and co-brand programs aligned to your CSR mandate.</p>
          <button className="bg-saffron text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-colors shadow-lg">Download CSR Profile</button>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100 mb-16 text-left relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#FF9933] to-[#FF6A00]"></div>
          
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">Partnership Inquiry</span>
            <h3 className="text-3xl font-bold text-charcoal">CSR Contact Form</h3>
            <p className="text-gray-500 mt-2">Fill in your corporate details to discuss CSR funding opportunities.</p>
          </div>

          <form className="space-y-10">
            {/* 01 Company Details */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-saffron font-bold flex items-center justify-center text-sm">01</span>
                <h4 className="text-xl font-bold text-charcoal">Company Details</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Company Name <span className="text-saffron">*</span></label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm" placeholder="Enter company name" />
                </div>
                <div className="relative">
                  <label className="block text-sm font-bold text-charcoal mb-2">Industry Type <span className="text-saffron">*</span></label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm cursor-pointer appearance-none">
                    <option className="hover:bg-orange-50" value="">Select Industry</option>
                    <option className="hover:bg-orange-50" value="IT">IT & Technology</option>
                    <option className="hover:bg-orange-50" value="Finance">Banking & Finance</option>
                    <option className="hover:bg-orange-50" value="Manufacturing">Manufacturing</option>
                    <option className="hover:bg-orange-50" value="Healthcare">Healthcare</option>
                    <option className="hover:bg-orange-50" value="Other">Other</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-7 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>
            </div>

            {/* 02 Contact Person */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-saffron font-bold flex items-center justify-center text-sm">02</span>
                <h4 className="text-xl font-bold text-charcoal">Contact Person</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Full Name <span className="text-saffron">*</span></label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Designation</label>
                  <input type="text" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm" placeholder="Your designation" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Official Email <span className="text-saffron">*</span></label>
                  <input type="email" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm" placeholder="email@company.com" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Phone Number <span className="text-saffron">*</span></label>
                  <input type="tel" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm" placeholder="Your contact number" />
                </div>
              </div>
            </div>

            {/* 03 CSR Requirements */}
            <div>
              <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-3">
                <span className="w-8 h-8 rounded-full bg-orange-100 text-saffron font-bold flex items-center justify-center text-sm">03</span>
                <h4 className="text-xl font-bold text-charcoal">CSR Requirements</h4>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <div className="relative">
                  <label className="block text-sm font-bold text-charcoal mb-2">CSR Interest / Funding Category <span className="text-saffron">*</span></label>
                  <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm cursor-pointer appearance-none">
                    <option className="hover:bg-orange-50" value="">Select Category</option>
                    <option className="hover:bg-orange-50" value="education">Education & Skill Development</option>
                    <option className="hover:bg-orange-50" value="healthcare">Healthcare & Medical</option>
                    <option className="hover:bg-orange-50" value="environment">Environment & Sustainability</option>
                    <option className="hover:bg-orange-50" value="animal">Animal Welfare (Gau Seva)</option>
                    <option className="hover:bg-orange-50" value="other">Other Initiative</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 pt-7 text-gray-500">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-charcoal mb-2">Additional Details</label>
                  <textarea rows="4" className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm" placeholder="Tell us more about your CSR objectives..."></textarea>
                </div>
              </div>
            </div>

            <div className="pt-4 text-center">
              <button type="button" className="bg-[#FF6A00] text-white px-10 py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all hover:scale-105 shadow-md shadow-orange-500/20 active:scale-95">Request a Call Back</button>
            </div>
          </form>
        </div>
        
        <div>
          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6">Our CSR Outreach Partners</p>
          <div className="flex space-x-12 justify-center overflow-hidden opacity-50">
            <div className="w-32 h-12 bg-gray-200 rounded"></div>
            <div className="w-32 h-12 bg-gray-200 rounded"></div>
            <div className="w-32 h-12 bg-gray-200 rounded"></div>
            <div className="w-32 h-12 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
