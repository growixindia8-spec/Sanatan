import React, { useState } from 'react';
import CertificatePreviewModal from './CertificatePreviewModal';

const certificates = [
  {
    title: "Section 8",
    subtitle: "COMPANY REGISTERED",
    badge: "/certificates/section-8-badge.webp",
    document: "/certificates/documents/section-8-certificate.jpg",
    hideSensitiveDetails: true,
    redactedDocument: "/certificates/documents/section-8-certificate-redacted.jpg"
  },
  {
    title: "12A",
    subtitle: "INCOME TAX EXEMPT",
    badge: "/certificates/12a-badge.webp",
    document: "/certificates/documents/12a-certificate.jpg",
    hideSensitiveDetails: true,
    redactedDocument: "/certificates/documents/12a-certificate-redacted.jpg"
  },
  {
    title: "80G",
    subtitle: "50% TAX DEDUCTION",
    badge: "/certificates/80g-badge.webp",
    document: "/certificates/documents/80g-certificate.jpg",
    hideSensitiveDetails: true,
    redactedDocument: "/certificates/documents/80g-certificate-redacted.jpg"
  },
  {
    title: "CSR-1",
    subtitle: "MCA CERTIFIED",
    badge: "/certificates/csr1-badge.webp",
    document: "/certificates/documents/csr1-certificate.jpg"
  },
  {
    title: "NGO Darpan",
    subtitle: "NITI AAYOG LISTED",
    badge: "/certificates/ngo-darpan-badge.webp",
    document: "/certificates/documents/ngo-darpan-certificate.jpg"
  },
  {
    title: "ISO 9001:2015",
    subtitle: "CERTIFIED OPERATIONS",
    badge: "/certificates/iso-9001-badge.webp",
    document: "/certificates/documents/iso-9001-certificate.jpg"
  }
];

export default function TrustBadgesStrip() {
  const [selectedBadge, setSelectedBadge] = useState(null);

  return (
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-devanagari text-charcoal tracking-wide mb-2">
            वैधानिक पंजीकरण एवं प्रमाणपत्र
          </h2>
          <p className="text-xs font-extrabold text-[#2E7D32] tracking-[0.2em] uppercase font-sans">
            VERIFIED · TRANSPARENT · TRUSTED
          </p>
        </div>

        {/* 6 Cards in single row wrapping on mobile/tablet */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {certificates.map((certificate, idx) => {
            return (
              <button 
                key={idx} 
                type="button"
                onClick={() => setSelectedBadge(certificate)}
                aria-label={`View ${certificate.title} certificate`}
                className="flex flex-col items-center justify-between bg-white shadow-sm border border-gray-100 hover:border-saffron/20 hover:shadow-md transition-all duration-300 rounded-[12px] p-6 text-center group focus:outline-none focus:ring-2 focus:ring-saffron focus:ring-offset-2 cursor-pointer h-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setSelectedBadge(certificate);
                  }
                }}
              >
                <div className="flex flex-col items-center justify-center flex-grow w-full">
                  {/* Circular Badge Image */}
                  <div className="h-20 w-20 mb-4 transition-transform duration-300 group-hover:scale-110 flex items-center justify-center">
                    <img
                      src={certificate.badge}
                      alt={`${certificate.title} registration badge`}
                      className="h-20 w-20 object-contain"
                      loading="lazy"
                    />
                  </div>
                  
                  {/* Text Section */}
                  <span className="font-bold text-charcoal text-[15px] block mb-1">
                    {certificate.title}
                  </span>
                  <span className="text-[11px] text-gray-500 font-medium tracking-wide uppercase">
                    {certificate.subtitle}
                  </span>
                </div>

                {/* Subtle Click to View instruction */}
                <span className="text-[10px] text-gray-400 font-medium tracking-wide uppercase mt-4 transition-colors group-hover:text-saffron block">
                  Click to view certificate
                </span>
              </button>
            );
          })}
        </div>

      </div>

      <CertificatePreviewModal 
        isOpen={!!selectedBadge} 
        onClose={() => setSelectedBadge(null)} 
        certificate={selectedBadge}
      />
    </section>
  );
}


