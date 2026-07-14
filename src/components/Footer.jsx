import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/LanguageContext';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="bg-[#FF6600] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Column 1 — Logo + Description */}
          <div className="flex flex-col space-y-4">
            <Link to="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <svg width="40" height="40" viewBox="0 0 50 50" fill="none">
                <circle cx="25" cy="25" r="22" fill="url(#saffronGradFooter)" />
                <circle cx="25" cy="25" r="19" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" fill="none" />
                <path 
                  d="M 23 15 
                     C 25 13, 29 13, 29 17 
                     C 29 20, 26 21, 24.5 21.5 
                     C 26.5 22, 31 23, 31 27.5 
                     C 31 32, 25.5 35.5, 20.5 33.5 
                     L 21.5 31 
                     C 25 32, 28.5 30, 28.5 27 
                     C 28.5 24.2, 25 24, 23 24 
                     L 21 24 
                     L 21 21.5 
                     L 23 21.5 
                     C 25 21.5, 26.5 20.5, 26.5 18 
                     C 26.5 15.5, 24.5 15.5, 23 16 
                     Z 
                     M 26 25 
                     C 31.5 27.5, 34 31, 35 34.5 
                     L 32.5 35 
                     C 31.5 32.5, 29.5 29.5, 25 27 
                     Z 
                     M 20.5 11 
                     C 22.5 10.5, 24.5 11.5, 24.5 13.5 
                     C 24.5 15.5, 22.5 16.5, 20.5 16 
                     C 18.5 15.5, 17.5 13.5, 17.5 11.5 
                     C 17.5 9.5, 18.5 8.5, 20.5 8.5 
                     L 20.5 11 
                     M 28.5 14 
                     C 33.5 15, 36.5 19, 36.5 24.5 
                     C 36.5 31.5, 29.5 38.5, 20.5 38.5 
                     C 14.5 38.5, 9.5 33.5, 9.5 27.5 
                     C 9.5 20.5, 15.5 14.5, 22.5 14.5 
                     C 24 14.5, 25.5 14.8, 27 15.2" 
                  stroke="white" 
                  strokeWidth="2.5" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="saffronGradFooter" x1="0" y1="0" x2="50" y2="50" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FF9933" />
                    <stop offset="100%" stopColor="#FF6A00" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="font-bold text-sm text-white leading-tight uppercase tracking-wide">
                Sanatan Dharm
                <br />
                <span className="text-white/80 font-medium text-[10px] lowercase">Manav Kalyan Foundation</span>
              </span>
            </Link>
            <p className="text-white/95 text-xs leading-relaxed font-devanagari">
              {t('footer.aboutText')}
            </p>
          </div>

          {/* Column 2 — Get Involved */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-wider border-b border-white/20 pb-2">
              {t('footer.getInvolved')}
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/donate" className="hover:text-black transition-colors">{t('footer.donateNow')}</Link></li>
              <li><Link to="/portal" className="hover:text-black transition-colors">{t('footer.becomeVolunteer')}</Link></li>
              <li><a href="/#verification-portal" className="hover:text-black transition-colors">{t('footer.verifyVolunteerId')}</a></li>
            </ul>
          </div>

          {/* Column 3 — About & Legal */}
          <div className="flex flex-col justify-between">
            <div>
              <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-wider border-b border-white/20 pb-2">
                {t('footer.aboutLegal')}
              </h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-black transition-colors">{t('footer.aboutUs')}</Link></li>
                <li><Link to="/privacy-policy" className="hover:text-black transition-colors">{t('footer.privacyPolicy')}</Link></li>
                <li><Link to="/terms-and-conditions" className="hover:text-black transition-colors">{t('footer.termsConditions')}</Link></li>
                <li><Link to="/refund-policy" className="hover:text-black transition-colors">{t('footer.refundPolicy')}</Link></li>
              </ul>
            </div>
            <div className="mt-4 pt-3 border-t border-white/20 text-xs font-semibold text-white/90">
              CIN: U88900MR2026NPL47439
            </div>
          </div>

          {/* Column 4 — Contact Us */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-xs tracking-wider border-b border-white/20 pb-2">
              {t('footer.contactUs')}
            </h4>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-white flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-white">
                  7 - J 5&6 Poonam Sagar Complex, Near BMC Hospital, Poonam Sagar, Mira Road (E), Thane Maharashtra - 401107
                </span>
              </li>
              <li className="flex items-start gap-2.5">
                <Phone size={14} className="text-white flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <a href="tel:+919454132567" className="hover:text-black transition-colors text-white font-semibold">+91 9454132567</a>
                  <a href="tel:+919768000666" className="hover:text-black transition-colors text-white font-semibold">+91 9768000666</a>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail size={14} className="text-white flex-shrink-0 mt-1" />
                <div className="flex flex-col">
                  <a href="mailto:info@sanatandharmngo.org" className="hover:text-black transition-colors text-white">info@sanatandharmngo.org</a>
                  <a href="mailto:ngo.sanatandharam@gmail.com" className="hover:text-black transition-colors text-white/80">ngo.sanatandharam@gmail.com</a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Social Icons Row */}
        <div className="border-t border-white/20 pt-6 pb-4 flex justify-center">
          <div className="flex gap-4">
            <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-black/40 hover:bg-black text-white transition-all flex items-center justify-center shadow-inner hover:scale-105">
              <Facebook size={16} />
            </a>
            <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-black/40 hover:bg-black text-white transition-all flex items-center justify-center shadow-inner hover:scale-105">
              <Instagram size={16} />
            </a>
            <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-black/40 hover:bg-black text-white transition-all flex items-center justify-center shadow-inner hover:scale-105">
              <Youtube size={16} />
            </a>
            <a href="#" aria-label="Twitter/X" className="w-9 h-9 rounded-full bg-black/40 hover:bg-black text-white transition-all flex items-center justify-center shadow-inner hover:scale-105">
              <Twitter size={16} />
            </a>
            <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-black/40 hover:bg-black text-white transition-all flex items-center justify-center shadow-inner hover:scale-105">
              <Linkedin size={16} />
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="text-center text-xs text-white/80 mt-4 border-t border-white/10 pt-4">
          <p>© Sanatan Dharm Manav Kalyan Foundation. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
}
