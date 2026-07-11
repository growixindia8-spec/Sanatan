import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function RaiseComplaint() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
              Grievance Cell
            </span>
            <h1 className="text-4xl font-bold text-charcoal mb-4">Raise a Complaint</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">We take all grievances seriously. Please provide details of your issue, and our vigilance team will look into it promptly.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                  <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="Your Name" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Contact Number</label>
                  <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="Phone Number" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Complaint Category</label>
                <select className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron">
                  <option>Misuse of Foundation Name</option>
                  <option>Volunteer Misconduct</option>
                  <option>Financial Discrepancy</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Detailed Description</label>
                <textarea rows="5" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="Please provide as much detail as possible..."></textarea>
              </div>
              <button type="button" className="w-full bg-[#FF6A00] text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-all btn-animated">
                Submit Complaint
              </button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
