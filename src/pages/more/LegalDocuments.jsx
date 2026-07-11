import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Download } from 'lucide-react';

export default function LegalDocuments() {
  const docs = [
    { name: 'Trust Registration Certificate', date: 'Jan 2026' },
    { name: '80G Tax Exemption Certificate', date: 'Feb 2026' },
    { name: '12A Registration Certificate', date: 'Feb 2026' },
    { name: 'Annual Audit Report 2025-26', date: 'Apr 2026' },
    { name: 'CSR Form 1 Approval', date: 'May 2026' },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
              Transparency
            </span>
            <h1 className="text-4xl font-bold text-charcoal mb-4">Legal Documents</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">We believe in complete transparency. Download our registration certificates and audit reports below.</p>
          </div>
          
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {docs.map((doc, i) => (
                <li key={i} className="p-6 flex justify-between items-center hover:bg-gray-50 transition-colors group">
                  <div>
                    <h3 className="font-bold text-charcoal text-lg group-hover:text-saffron transition-colors">{doc.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Issued: {doc.date}</p>
                  </div>
                  <button className="bg-orange-50 text-saffron p-3 rounded-full hover:bg-saffron hover:text-white transition-colors">
                    <Download size={20} />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
