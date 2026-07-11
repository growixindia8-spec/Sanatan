import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import FAQ from '../../components/FAQ';

export default function FaqPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
              Help Center
            </span>
            <h1 className="text-4xl font-bold text-charcoal mb-4">Frequently Asked Questions</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Find answers to common questions about our organization, donations, memberships, and activities.</p>
          </div>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 max-w-4xl mx-auto">
             <FAQ />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
