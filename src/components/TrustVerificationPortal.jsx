import React from 'react';

export default function TrustVerificationPortal() {
  return (
    <section className="py-16 bg-cream">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-maroon mb-4">Trust & Verification Portal</h2>
        <p className="text-gray-600 mb-8">Volunteer IDs, member certificates, coordinator postings, donation receipts — every credential issued by us is checkable in real time.</p>
        
        <form className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-5">
          <div className="flex-1 relative">
            <select className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron cursor-pointer appearance-none shadow-sm">
              <option className="hover:bg-orange-50">Volunteer ID</option>
              <option className="hover:bg-orange-50">Member Certificate</option>
              <option className="hover:bg-orange-50">Coordinator ID</option>
              <option className="hover:bg-orange-50">Donation Receipt</option>
              <option className="hover:bg-orange-50">Appointment Letter</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
          <input type="text" placeholder="Credential Number" className="flex-1 bg-white border border-gray-200 rounded-xl px-4 py-3.5 text-charcoal font-medium focus:outline-none focus:border-saffron focus:ring-1 focus:ring-saffron transition-all hover:border-saffron shadow-sm placeholder-gray-400" />
          <button type="button" className="bg-[#FF6A00] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-orange-600 transition-all hover:scale-105 shadow-md shadow-orange-500/20 active:scale-95">Verify Now</button>
        </form>
      </div>
    </section>
  );
}
