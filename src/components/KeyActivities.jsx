import React from 'react';
import { Link } from 'react-router-dom';

export default function KeyActivities() {
  const activities = [
    { title: "सनातन संस्कृति संरक्षण एवं जनजागरण", desc: "सनातन मूल्यों, भारतीय परंपराओं एवं सामाजिक जागरूकता के संरक्षण का सतत अभियान।", goal: "₹5,00,000", raised: "₹0" },
    { title: "अन्न सेवा एवं भोजन सहायता", desc: "जरूरतमंद एवं असहाय लोगों तक भोजन एवं सहायता पहुँचाने का सेवा अभियान।", goal: "₹5,00,000", raised: "₹0" },
    { title: "महिला सुरक्षा एवं सम्मान अभियान", desc: "सुरक्षा, सम्मान, जागरूकता एवं सहयोग के लिए समर्पित अभियान।", goal: "₹5,00,000", raised: "₹0" }
  ];

  return (
    <section className="py-16 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-devanagari text-maroon mb-2">हमारी प्रमुख गतिविधियाँ एवं कार्यक्षेत्र</h2>
          <p className="text-gray-600 font-devanagari">Our Key Activities & Areas of Work</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-bold font-devanagari text-maroon mb-2">{act.title}</h3>
                <p className="text-gray-600 font-devanagari text-sm mb-4">{act.desc}</p>
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Raised</p>
                    <p className="font-bold text-charcoal">{act.raised}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Goal</p>
                    <p className="font-bold text-charcoal">{act.goal}</p>
                  </div>
                </div>
                <a href="#" className="block w-full text-center py-2 border border-saffron text-saffron rounded-full hover:bg-saffron hover:text-white transition-colors font-medium">Details</a>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/activities/current" className="inline-block bg-saffron text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-orange-600 transition-colors uppercase tracking-wider text-sm">View All</Link>
        </div>
      </div>
    </section>
  );
}
