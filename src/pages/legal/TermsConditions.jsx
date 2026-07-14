import React, { useEffect } from 'react';
import LegalPageLayout from '../../components/legal/LegalPageLayout';
import { organization } from '../../config/organization';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  useEffect(() => {
    document.title = "Terms & Conditions | Sanatan Dharm Manav Kalyan Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalPageLayout
      title="Terms & Conditions"
      subtitle="नियम एवं शर्तें"
      dateInfo="Effective Date: 9th June 2026"
    >
      <div className="space-y-8 font-sans antialiased text-charcoal">
        <p className="text-gray-600 font-devanagari text-base leading-relaxed">
          इन Terms & Conditions ("Terms") के माध्यम से <strong>Sanatan Dharm Manav Kalyan Foundation</strong> ("Foundation", "Organization", "we", "our", "us") की वेबसाइट, सेवाओं, दान, सदस्यता, स्वयंसेवक कार्यक्रमों, फंडरेजिंग अभियानों तथा अन्य गतिविधियों के उपयोग हेतु नियम एवं शर्तें निर्धारित की जाती हैं। वेबसाइट का उपयोग करके आप इन Terms को स्वीकार करते हैं।
        </p>

        {/* 1. Organization Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            1. Organization Information
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <tbody className="divide-y divide-gray-150">
                <tr>
                  <td className="px-4 py-2.5 font-bold text-gray-500 w-44">Organization Name</td>
                  <td className="px-4 py-2.5 text-gray-900 font-semibold">{organization.name}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-gray-500">Website</td>
                  <td className="px-4 py-2.5 text-[#FF6A00] font-semibold">
                    <a href={organization.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                      {organization.website}
                    </a>
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-gray-500">Email</td>
                  <td className="px-4 py-2.5 text-gray-900 font-semibold">{organization.email}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-gray-500">Contact Number</td>
                  <td className="px-4 py-2.5 text-gray-900 font-semibold">{organization.phones.join(' / ')}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-gray-500">Communication Office</td>
                  <td className="px-4 py-2.5 text-gray-700 text-xs font-devanagari leading-relaxed">{organization.communicationOffice}</td>
                </tr>
                <tr>
                  <td className="px-4 py-2.5 font-bold text-gray-500">Registered Office</td>
                  <td className="px-4 py-2.5 text-gray-700 text-xs font-devanagari leading-relaxed">{organization.registeredOffice}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 2. Eligibility */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            2. Eligibility
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>वेबसाइट, सदस्यता एवं पंजीकरण सेवाओं का उपयोग करने के लिए उपयोगकर्ता की आयु कम से कम 18 वर्ष होनी चाहिए।</li>
            <li>उपयोगकर्ता द्वारा प्रदान की गई जानकारी सत्य एवं अद्यतन होनी चाहिए।</li>
            <li>संस्था किसी भी गलत, भ्रामक या अपूर्ण जानकारी को अस्वीकार करने का अधिकार सुरक्षित रखती है।</li>
          </ul>
        </section>

        {/* 3. Donations */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            3. Donations
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>संस्था को दी गई सभी दान राशियाँ स्वैच्छिक सहयोग मानी जाएँगी।</li>
            <li>दान राशि संस्था की वर्तमान गतिविधियों, भावी योजनाओं, प्रशासनिक आवश्यकताओं, संचालन, मानव सेवा एवं अन्य वैध संगठनात्मक उद्देश्यों हेतु उपयोग की जा सकती है।</li>
            <li>संस्था दान राशि के उपयोग संबंधी निर्णय अपने विवेकानुसार लेने का अधिकार रखती है।</li>
            <li>संस्था पात्र दानदाताओं को लागू नियमों के अनुसार उपलब्ध कराए जाने योग्य रसीदें एवं कर लाभ संबंधी दस्तावेज उपलब्ध कराने का प्रयास करेगी।</li>
          </ul>
        </section>

        {/* 4. Membership & Registration */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            4. Membership & Registration
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>संस्था द्वारा संचालित सदस्यता, स्वयंसेवक पंजीकरण, समन्वयक पंजीकरण, सनातनी सेना, विजिलेंस विभाग, सनातन सेवा नेटवर्क एवं अन्य संगठनात्मक कार्यक्रमों हेतु निर्धारित सहयोग राशि लागू हो सकती है।</li>
            <li>सभी पंजीकरण संगठनात्मक सहयोग राशि के आधार पर संचालित हो सकते हैं।</li>
            <li>सदस्यता या पंजीकरण स्वीकृति संस्था के विवेकाधिकार पर निर्भर होगी।</li>
            <li>आवेदन जमा होने के बाद संस्था अतिरिक्त सत्यापन कर सकती है।</li>
            <li>सदस्यता स्वीकृति की कोई गारंटी नहीं होगी।</li>
          </ul>
        </section>

        {/* 5. ID Cards, Certificates & Verification */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            5. ID Cards, Certificates & Verification
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>संस्था सदस्य, स्वयंसेवक, समन्वयक एवं अन्य पात्र व्यक्तियों को पहचान पत्र, प्रमाणपत्र अथवा सत्यापन सुविधा प्रदान कर सकती है।</li>
            <li>संस्था किसी भी समय पहचान पत्र अथवा सत्यापन स्थिति को संशोधित, निलंबित अथवा समाप्त करने का अधिकार सुरक्षित रखती है।</li>
            <li>किसी भी प्रकार का गलत उपयोग प्रतिबंधित होगा।</li>
          </ul>
        </section>

        {/* 6. Fundraising */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            6. Fundraising
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>संस्था द्वारा अनुमोदित व्यक्तियों अथवा समूहों को Fundraising Campaign प्रारंभ करने की अनुमति दी जा सकती है।</li>
            <li>प्रत्येक Fundraising Campaign संस्था की समीक्षा एवं स्वीकृति के अधीन होगा।</li>
            <li>संस्था किसी भी अभियान को स्वीकृत, अस्वीकृत, संशोधित, निलंबित अथवा समाप्त करने का अधिकार सुरक्षित रखती है।</li>
            <li>संस्था किसी भी अभियान के लिए स्वीकृति की गारंटी नहीं देती।</li>
          </ul>
        </section>

        {/* 7. Volunteer Programs */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            7. Volunteer Programs
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">संस्था विभिन्न स्वयंसेवक कार्यक्रम संचालित कर सकती है, जिनमें शामिल हैं:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-sans">
            <li>Sanatani Sena</li>
            <li>Vigilance Department</li>
            <li>Sanatan Seva Network</li>
            <li className="font-devanagari">Other Volunteer Initiatives</li>
          </ul>
          <p className="text-xs text-gray-500 font-devanagari leading-relaxed">
            संस्था स्वयंसेवकों के चयन, सत्यापन, नियुक्ति एवं निष्कासन का अधिकार सुरक्षित रखती है।
          </p>
        </section>

        {/* 8. Emergency Help Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            8. Emergency Help Services
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">संस्था आवश्यकता अनुसार सहायता, मार्गदर्शन, समन्वय अथवा रेफरल सहायता प्रदान करने का प्रयास कर सकती है। हालाँकि:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>संस्था पुलिस, एम्बुलेंस, अस्पताल, अग्निशमन सेवा अथवा किसी सरकारी आपातकालीन सेवा का विकल्प नहीं है।</li>
            <li>संस्था किसी भी आपातकालीन सहायता की उपलब्धता, समयबद्धता अथवा परिणाम की गारंटी नहीं देती।</li>
            <li>गंभीर आपातकालीन स्थिति में उपयोगकर्ता को संबंधित सरकारी सेवाओं से तुरंत संपर्क करना चाहिए।</li>
          </ul>
        </section>

        {/* 9. User Conduct */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            9. User Conduct
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">उपयोगकर्ता निम्न कार्य नहीं करेंगे:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>गलत जानकारी प्रदान करना</li>
            <li>धोखाधड़ी करना</li>
            <li>फर्जी पहचान का उपयोग करना</li>
            <li>संस्था, स्वयंसेवकों या अन्य उपयोगकर्ताओं को नुकसान पहुँचाना</li>
            <li>अवैध गतिविधियों में शामिल होना</li>
            <li>वेबसाइट की सुरक्षा से छेड़छाड़ करना</li>
          </ul>
        </section>

        {/* 10. Suspension & Termination */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            10. Suspension & Termination
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            यदि कोई सदस्य, स्वयंसेवक, समन्वयक, सेवा नेटवर्क सदस्य अथवा उपयोगकर्ता: संस्था के नियमों का उल्लंघन करता है, संस्था की प्रतिष्ठा को नुकसान पहुँचाता है, या अनुचित, भ्रामक या अवैध गतिविधियों में शामिल पाया जाता है; तो संस्था बिना पूर्व सूचना सदस्यता, पंजीकरण, सत्यापन अथवा संबंधित अधिकार समाप्त करने का अधिकार सुरक्षित रखती है।
          </p>
        </section>

        {/* 11. Intellectual Property */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            11. Intellectual Property
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            वेबसाइट की सामग्री, लोगो, डिज़ाइन, चित्र, लेख, वीडियो, ग्राफिक्स, दस्तावेज़ एवं अन्य बौद्धिक संपत्तियाँ संस्था की संपत्ति हैं। पूर्व लिखित अनुमति के बिना इनका व्यावसायिक उपयोग, पुनर्प्रकाशन या वितरण प्रतिबंधित है।
          </p>
        </section>

        {/* 12. Third-Party Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            12. Third-Party Services
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था Payment Gateways, Social Media Platforms, Analytics Services एवं अन्य Third-Party Services का उपयोग कर सकती है। इन सेवाओं के संचालन एवं नीतियों पर संस्था का नियंत्रण नहीं होगा।
          </p>
        </section>

        {/* 13. Limitation of Liability */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            13. Limitation of Liability
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">संस्था:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>वेबसाइट की निरंतर उपलब्धता</li>
            <li>त्रुटिरहित संचालन</li>
            <li>किसी विशेष परिणाम</li>
            <li>किसी सेवा की निश्चित उपलब्धता की गारंटी नहीं देती।</li>
          </ul>
          <p className="text-xs text-gray-500 font-devanagari leading-relaxed">
            कानून द्वारा अनुमत सीमा तक संस्था प्रत्यक्ष, अप्रत्यक्ष, आकस्मिक अथवा परिणामी हानि के लिए उत्तरदायी नहीं होगी।
          </p>
        </section>

        {/* 14. Privacy */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            14. Privacy
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            उपयोगकर्ता की व्यक्तिगत जानकारी संस्था की{' '}
            <Link to="/privacy-policy" className="text-[#FF6A00] font-semibold hover:underline">
              Privacy Policy
            </Link>{' '}
            के अनुसार संसाधित की जाएगी।
          </p>
        </section>

        {/* 15. Amendments */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            15. Amendments
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था समय-समय पर इन Terms & Conditions में संशोधन कर सकती है। संशोधित संस्करण वेबसाइट पर प्रकाशित होने के साथ प्रभावी माना जाएगा।
          </p>
        </section>

        {/* 16. Governing Law & Jurisdiction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            16. Governing Law & Jurisdiction
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>ये Terms भारत के लागू कानूनों द्वारा शासित होंगे।</li>
            <li>इन Terms से उत्पन्न किसी भी विवाद का क्षेत्राधिकार महाराष्ट्र राज्य के सक्षम न्यायालयों के अधीन होगा।</li>
          </ul>
        </section>

        {/* 17. Contact Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            17. Contact Information
          </h2>
          <div className="bg-neutral-50 border border-gray-150 p-5 rounded-2xl space-y-1 text-sm font-devanagari">
            <strong className="text-charcoal block mb-1">{organization.name}</strong>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Email:</span> {organization.email}</p>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Phone:</span> {organization.phones.join(' / ')}</p>
            <p><span className="font-bold text-gray-400 font-sans uppercase text-[10px] tracking-wider block">Website:</span> <a href={organization.website} target="_blank" rel="noopener noreferrer" className="text-[#FF6A00] hover:underline font-semibold">{organization.website}</a></p>
          </div>
        </section>
      </div>
    </LegalPageLayout>
  );
}
