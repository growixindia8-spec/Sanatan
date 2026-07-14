import React, { useEffect } from 'react';
import LegalPageLayout from '../../components/legal/LegalPageLayout';
import { organization } from '../../config/organization';

export default function PrivacyPolicy() {
  useEffect(() => {
    document.title = "Privacy Policy | Sanatan Dharm Manav Kalyan Foundation";
    window.scrollTo(0, 0);
  }, []);

  return (
    <LegalPageLayout
      title="Privacy Policy"
      subtitle="गोपनीयता नीति"
      dateInfo="Effective Date: 9th June 2026"
    >
      <div className="space-y-8 font-sans antialiased text-charcoal">
        <p className="text-gray-600 font-devanagari text-base leading-relaxed">
          <strong>Sanatan Dharm Manav Kalyan Foundation</strong> ("Foundation", "Organization", "we", "our", "us") आपकी गोपनीयता का सम्मान करता है और आपकी व्यक्तिगत जानकारी की सुरक्षा के लिए प्रतिबद्ध है। यह Privacy Policy बताती है कि हमारी वेबसाइट, सेवाओं, अभियानों, दान, सदस्यता, स्वयंसेवक पंजीकरण तथा अन्य गतिविधियों के माध्यम से एकत्रित की गई जानकारी का उपयोग, संग्रहण एवं संरक्षण किस प्रकार किया जाता है।
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

        {/* 2. Information We Collect */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            2. Information We Collect
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">हम निम्न प्रकार की जानकारी एकत्र कर सकते हैं:</p>
          <ul className="list-decimal pl-5 space-y-2 text-gray-650 text-[14.5px] font-devanagari">
            <li>
              <strong>Personal Information:</strong>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-gray-500 font-sans">
                <li>Name</li>
                <li>Mobile Number</li>
                <li>Email Address</li>
                <li>Date of Birth (यदि लागू हो)</li>
                <li>Address</li>
                <li>Identity Details (जहाँ आवश्यक हो)</li>
              </ul>
            </li>
            <li><strong>Membership / Volunteer Information</strong></li>
            <li><strong>Coordinator Information</strong></li>
            <li><strong>Donation Information</strong></li>
            <li>
              <strong>Technical Information:</strong>
              <ul className="list-disc pl-5 mt-1.5 space-y-1 text-gray-500 font-sans">
                <li>IP Address</li>
                <li>Device Information</li>
                <li>Browser Type</li>
                <li>Operating System</li>
                <li>Website Usage Data</li>
                <li>Cookies and Analytics Data</li>
              </ul>
            </li>
            <li>
              <strong>Payment Information:</strong>
              <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                दान एवं अन्य सहयोग राशि के भुगतान Razorpay अथवा अन्य अधिकृत Payment Gateway एवं बैंकिंग चैनलों के माध्यम से संसाधित किए जा सकते हैं। संस्था किसी भी उपयोगकर्ता के पूर्ण बैंकिंग, डेबिट/क्रेडिट कार्ड अथवा UPI Credentials को संग्रहित नहीं करती।
              </p>
            </li>
          </ul>
        </section>

        {/* 3. Purpose of Data Collection */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            3. Purpose of Data Collection
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">आपकी जानकारी निम्न उद्देश्यों के लिए उपयोग की जा सकती है:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>Donation Processing</li>
            <li>Receipt Generation</li>
            <li>Volunteer Registration</li>
            <li>Membership Management</li>
            <li>Coordinator Verification</li>
            <li>ID Verification</li>
            <li>Emergency Assistance Requests</li>
            <li>Fundraising Activities</li>
            <li>Communication & Updates</li>
            <li>Legal & Compliance Requirements</li>
            <li>Security & Fraud Prevention</li>
          </ul>
        </section>

        {/* 4. Data Sharing */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            4. Data Sharing
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">हम आपकी व्यक्तिगत जानकारी को बेचते, किराए पर नहीं देते या अनधिकृत रूप से साझा नहीं करते। जानकारी निम्न परिस्थितियों में साझा की जा सकती है:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px]">
            <li>Payment Gateway Partners</li>
            <li>Government Authorities (जहाँ कानूनन आवश्यक हो)</li>
            <li>Legal Compliance Requirements</li>
            <li>Fraud Investigation</li>
            <li>Authorized Service Providers</li>
          </ul>
        </section>

        {/* 5. Data Security */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            5. Data Security
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            हम आपकी जानकारी की सुरक्षा हेतु उचित तकनीकी एवं प्रशासनिक उपाय अपनाते हैं। फिर भी इंटरनेट पर किसी भी डेटा ट्रांसमिशन या स्टोरेज की 100% सुरक्षा की गारंटी नहीं दी जा सकती।
          </p>
        </section>

        {/* 6. Donations & Financial Records */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            6. Donations & Financial Records
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            दान से संबंधित रिकॉर्ड, रसीदें एवं लेन-देन विवरण लेखा, ऑडिट, वैधानिक अनुपालन एवं पारदर्शिता उद्देश्यों हेतु सुरक्षित रखे जा सकते हैं।
          </p>
        </section>

        {/* 7. Volunteer & Membership Information */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            7. Volunteer & Membership Information
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            Volunteer, Member, Coordinator, Sanatani Sena, Vigilance Department एवं Sanatan Seva Network से संबंधित जानकारी सत्यापन, पहचान, संचार एवं संगठनात्मक उद्देश्यों हेतु उपयोग की जा सकती है।
          </p>
        </section>

        {/* 8. Cookies */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            8. Cookies
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            हम वेबसाइट अनुभव को बेहतर बनाने के लिए Cookies एवं Analytics Tools का उपयोग कर सकते हैं। उपयोगकर्ता अपने Browser Settings के माध्यम से Cookies को नियंत्रित कर सकते हैं।
          </p>
        </section>

        {/* 9. Third-Party Services */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            9. Third-Party Services
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            हमारी वेबसाइट में Third-Party Services, Payment Gateways, Social Media Platforms अथवा External Links शामिल हो सकते हैं। इनकी Privacy Practices पर हमारा नियंत्रण नहीं है।
          </p>
        </section>

        {/* 10. Age Restriction */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            10. Age Restriction
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            हमारी वेबसाइट, सदस्यता एवं पंजीकरण सेवाएँ मुख्यतः 18 वर्ष या उससे अधिक आयु के व्यक्तियों हेतु हैं। 18 वर्ष से कम आयु के व्यक्ति केवल अभिभावक/कानूनी संरक्षक की अनुमति एवं देखरेख में भाग ले सकते हैं जहाँ लागू हो।
          </p>
        </section>

        {/* 11. User Rights */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            11. User Rights
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">उपयोगकर्ता निम्न अधिकारों का अनुरोध कर सकते हैं:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-gray-650 text-[14.5px] font-devanagari">
            <li>Personal Information Update</li>
            <li>Correction of Information</li>
            <li>Communication Preference Changes</li>
            <li>Information Access Request</li>
          </ul>
          <p className="text-xs text-gray-400 font-devanagari mt-2 italic">
            कानूनी एवं लेखा संबंधी रिकॉर्ड आवश्यक अवधि तक सुरक्षित रखे जा सकते हैं।
          </p>
        </section>

        {/* 12. Changes to this Policy */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            12. Changes to this Policy
          </h2>
          <p className="text-gray-650 text-[14.5px] font-devanagari leading-relaxed">
            संस्था समय-समय पर इस Privacy Policy में संशोधन कर सकती है। संशोधित संस्करण वेबसाइट पर प्रकाशित होने के साथ प्रभावी माना जाएगा।
          </p>
        </section>

        {/* 13. Contact Us */}
        <section className="space-y-3">
          <h2 className="text-xl font-bold border-b border-gray-100 pb-2 text-charcoal">
            13. Contact Us
          </h2>
          <p className="text-gray-600 font-devanagari text-sm">यदि Privacy Policy संबंधी कोई प्रश्न हो, तो संपर्क करें:</p>
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
