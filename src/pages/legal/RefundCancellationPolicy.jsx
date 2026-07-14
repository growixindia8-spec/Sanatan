import React, { useEffect } from 'react';
import LegalPageLayout from '../../components/legal/LegalPageLayout';
import { organization } from '../../config/organization';

export default function RefundCancellationPolicy() {
  useEffect(() => {
    document.title = "Refund & Cancellation Policy | Sanatan Dharm Manav Kalyan Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalPageLayout
      title="Refund & Cancellation Policy"
      subtitle="रिफंड एवं रद्दीकरण नीति"
      dateInfo="Effective Date: 9th June 2026"
    >
      <div className="space-y-8 font-sans antialiased text-charcoal">
        <p className="text-gray-600 font-devanagari text-base leading-relaxed">
          <strong>Sanatan Dharm Manav Kalyan Foundation</strong> ("Foundation", "Organization", "we", "our", "us") समाज सेवा, मानव कल्याण, सांस्कृतिक जागरूकता, स्वयंसेवक कार्यक्रमों, सदस्यता अभियानों एवं अन्य सामाजिक गतिविधियों के लिए सहयोग राशि, दान एवं पंजीकरण सहयोग स्वीकार करती है। यह Refund & Cancellation Policy संस्था को प्राप्त दान, सहयोग राशि, सदस्यता एवं पंजीकरण से संबंधित नियमों को स्पष्ट करती है।
        </p>

        {/* 1. Donations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            1. Donations
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">संस्था को प्रदान की गई सभी दान राशियाँ स्वैच्छिक (Voluntary) सहयोग मानी जाएँगी। दान राशि प्राप्त होने के बाद सामान्यतः:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>दान रद्द (Cancel) नहीं किया जा सकता।</li>
            <li>दान वापस (Refund) नहीं किया जाएगा।</li>
            <li>दान किसी अन्य व्यक्ति, संस्था अथवा उद्देश्य को स्थानांतरित नहीं किया जाएगा।</li>
            <li>सभी Donations को <strong>Non-Refundable</strong> माना जाएगा।</li>
          </ul>
        </section>

        {/* 2. Membership & Registration Contributions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            2. Membership & Registration Contributions
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">संस्था द्वारा संचालित निम्न कार्यक्रमों के अंतर्गत जमा की गई सहयोग राशि <strong>Non-Refundable</strong> होगी:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-sans">
            <li>Membership Programs</li>
            <li>Volunteer Registration</li>
            <li>Sanatani Sena Registration</li>
            <li>Vigilance Department Registration</li>
            <li>Sanatan Seva Network Registration</li>
            <li>Coordinator Registration</li>
            <li>ID Card Contributions</li>
            <li>Certificate Contributions</li>
            <li className="font-devanagari">Other Organizational Registration Programs</li>
          </ul>
          <p className="text-xs text-gray-500 font-devanagari mt-2 italic leading-relaxed">
            एक बार भुगतान होने के बाद किसी भी परिस्थिति में पंजीकरण सहयोग राशि वापस नहीं की जाएगी।
          </p>
        </section>

        {/* 3. Fundraising Contributions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            3. Fundraising Contributions
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था द्वारा अनुमोदित Fundraising Campaigns के माध्यम से प्राप्त सहयोग राशि भी सामान्यतः <strong>Non-Refundable</strong> होगी। संस्था किसी भी Fundraising Contribution को वापस करने के लिए बाध्य नहीं होगी।
          </p>
        </section>

        {/* 4. Duplicate Transactions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            4. Duplicate Transactions
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            यदि तकनीकी त्रुटि, Payment Gateway Error अथवा बैंकिंग समस्या के कारण एक ही लेन-देन की राशि एक से अधिक बार कट जाती है, तो संस्था मामले की समीक्षा कर सकती है। ऐसी स्थिति में उपयोगकर्ता निम्न विवरण प्रदान कर सकता है:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-550 text-[14px] font-sans">
            <li>Name</li>
            <li>Registered Mobile Number</li>
            <li>Transaction ID</li>
            <li>Payment Date</li>
            <li>Payment Proof</li>
          </ul>
          <p className="text-xs text-gray-500 font-devanagari leading-relaxed mt-2">
            सत्यापन के उपरांत संस्था उचित कार्रवाई करने का अधिकार सुरक्षित रखती है।
          </p>
        </section>

        {/* 5. Failed Transactions */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            5. Failed Transactions
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            यदि उपयोगकर्ता के खाते से राशि कट जाती है लेकिन संस्था को भुगतान प्राप्त नहीं होता, तो मामला संबंधित Payment Gateway, बैंक अथवा वित्तीय संस्था के नियमों के अनुसार संसाधित किया जाएगा। संस्था Payment Gateway अथवा बैंकिंग नेटवर्क की तकनीकी विफलताओं के लिए उत्तरदायी नहीं होगी।
          </p>
        </section>

        {/* 6. Cancellation Requests */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            6. Cancellation Requests
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            Donation, Membership, Registration अथवा Contribution Payment पूर्ण होने के बाद सामान्यतः Cancellation स्वीकार नहीं की जाएगी। संस्था विशेष परिस्थितियों में मामले की समीक्षा करने का अधिकार सुरक्षित रखती है, परंतु किसी Cancellation Request को स्वीकार करना संस्था के विवेकाधिकार पर निर्भर होगा।
          </p>
        </section>

        {/* 7. Processing of Exceptional Cases */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            7. Processing of Exceptional Cases
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>निर्णय संस्था का अंतिम निर्णय माना जाएगा।</li>
            <li>संस्था किसी Refund की गारंटी नहीं देती।</li>
            <li>प्रत्येक मामला व्यक्तिगत रूप से समीक्षा किया जाएगा।</li>
          </ul>
        </section>

        {/* 8. Payment Gateway */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            8. Payment Gateway
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था भुगतान स्वीकार करने हेतु Razorpay अथवा अन्य अधिकृत Payment Gateway एवं बैंकिंग चैनलों का उपयोग कर सकती है। Payment Gateway द्वारा लागू नियम, शुल्क, सुरक्षा प्रक्रियाएँ एवं तकनीकी व्यवस्थाएँ संबंधित सेवा प्रदाता की नीतियों के अनुसार संचालित होंगी।
          </p>
        </section>

        {/* 9. Contact for Payment Issues */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            9. Contact for Payment Issues
          </h2>
          <div className="bg-neutral-50 border border-gray-150 p-5 rounded-2xl space-y-1 text-sm font-devanagari">
            <strong className="text-charcoal block mb-1">{organization.name}</strong>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Email:</span> {organization.email}</p>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Phone:</span> {organization.phones.join(' / ')}</p>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Communication Office:</span> {organization.communicationOffice}</p>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Registered Office:</span> {organization.registeredOffice}</p>
          </div>
        </section>

        {/* 10. Amendments */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            10. Amendments
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था समय-समय पर इस Refund & Cancellation Policy में संशोधन कर सकती है। संशोधित संस्करण वेबसाइट पर प्रकाशित होने के साथ प्रभावी माना जाएगा।
          </p>
        </section>

        {/* 11. Acceptance */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            11. Acceptance
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था को दान, सहयोग राशि, सदस्यता, पंजीकरण अथवा किसी भी प्रकार का भुगतान करने पर उपयोगकर्ता इस Refund & Cancellation Policy को पढ़ने, समझने एवं स्वीकार करने की पुष्टि करता है।
          </p>
        </section>
      </div>
    </LegalPageLayout>
  );
}
