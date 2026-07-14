import React from 'react';
import { Eye, ShieldCheck, Lock, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WhyChooseUs() {
  const cards = [
    {
      icon: Eye,
      title: "Transparency & Accountability",
      desc: "हम संस्था के कार्यों, अभियानों एवं उपलब्ध संसाधनों के उपयोग में पूर्ण पारदर्शिता सुनिश्चित करते हैं।"
    },
    {
      icon: ShieldCheck,
      title: "Registered & Verified Organization",
      desc: "Section 8 Company, 12A, 80G, CSR-1 एवं NGO Darpan में पंजीकृत संस्था।"
    },
    {
      icon: Lock,
      title: "Safe & Secure Contributions",
      desc: "सभी ऑनलाइन सहयोग राशि अधिकृत एवं सुरक्षित भुगतान माध्यमों द्वारा ही स्वीकार की जाती है।"
    },
    {
      icon: Users,
      title: "Dedicated Team & Volunteers",
      desc: "संस्था की टीम, स्वयंसेवक एवं सहयोगी सदस्य सेवा भाव और निष्ठा के साथ कार्यरत हैं।"
    }
  ];

  const sectionVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.18
      }
    }
  };

  const headingVariants = {
    hidden: {
      opacity: 0,
      y: -25
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 45
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2
      }}
      className="relative overflow-hidden bg-[#160B06] py-20 md:py-24"
    >
      {/* Subtle background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FF6A00]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
        {/* Heading */}
        <motion.div
          variants={headingVariants}
          className="mb-14 md:mb-16"
        >
          <h2 className="mb-3 font-devanagari text-3xl font-bold text-white md:text-4xl">
            Why Choose Us
          </h2>

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#E5AD23] sm:text-sm">
            Built on Trust, Transparency &amp; Service
          </p>

          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 80 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.35
            }}
            className="mx-auto mt-5 h-[2px] bg-gradient-to-r from-transparent via-[#DDAA28] to-transparent"
          />
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 md:gap-10 lg:grid-cols-4">
          {cards.map((card, idx) => {
            const Icon = card.icon;

            return (
              <motion.div
                key={idx}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  transition: {
                    duration: 0.25
                  }
                }}
                className="group flex flex-col items-center px-3"
              >
                {/* Golden circular icon */}
                <motion.div
                  whileHover={{
                    scale: 1.08,
                    rotate: 3
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 16
                  }}
                  className="relative mx-auto mb-7 flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-[#C8941E] bg-[#171717] shadow-[0_0_0_1px_rgba(255,193,51,0.05)] md:h-28 md:w-28"
                >
                  <div className="absolute inset-2 rounded-full border border-[#C8941E]/10" />

                  <motion.div
                    animate={{
                      opacity: [0.65, 1, 0.65]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: idx * 0.25
                    }}
                  >
                    <Icon
                      size={40}
                      strokeWidth={1.8}
                      className="text-[#E3B426] transition-all duration-300 group-hover:text-[#FFD35A]"
                    />
                  </motion.div>
                </motion.div>

                {/* Title */}
                <h4 className="mb-4 min-h-[56px] font-devanagari text-xl font-bold leading-snug text-white transition-colors duration-300 group-hover:text-[#E5AD23]">
                  {card.title}
                </h4>

                {/* Description */}
                <p className="max-w-[280px] font-devanagari text-sm leading-7 text-[#E5DFDA]">
                  {card.desc}
                </p>

                {/* Hover bottom line */}
                <motion.div
                  initial={{ width: 0 }}
                  whileHover={{ width: 55 }}
                  className="mt-6 h-[2px] bg-[#DDAA28]"
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}