import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#FF6600] text-white pt-16 pb-8 border-t border-[#FF6600]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Column 1 — About Foundation */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-white/20 pb-2">
              About Foundation
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-black transition-colors">About Us</Link></li>
              <li><Link to="/about#vision-mission" className="hover:text-black transition-colors">Vision & Mission</Link></li>
              <li><Link to="/activities/current" className="hover:text-black transition-colors">Our Activities</Link></li>
              <li><Link to="/activities/future-missions" className="hover:text-black transition-colors">Future Missions</Link></li>
              <li><Link to="/activities/festival-seva-calendar" className="hover:text-black transition-colors">Festivals</Link></li>
            </ul>
          </div>

          {/* Column 2 — Get Involved */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-white/20 pb-2">
              Get Involved
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">Donation Hub</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Start Fundraiser</a></li>
              <li><a href="#" className="hover:text-black transition-colors">View Fundraisers</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Need Help</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Join Us</a></li>
            </ul>
          </div>

          {/* Column 3 — Media & Resources */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-white/20 pb-2">
              Media & Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-black transition-colors">News & Events</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Photo Gallery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Video Gallery</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Announcements</a></li>
              <li><a href="#" className="hover:text-black transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 — Transparency & Legal */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-white/20 pb-2">
              Transparency & Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="font-semibold text-white mb-1">Transparency & Reports</li>
              <li className="pl-2 border-l border-white/20 space-y-2">
                <span className="text-white/80 font-medium text-xs uppercase block">Legal Documents</span>
                <div className="pl-2 space-y-1.5 border-l border-white/20">
                  <span className="text-white/70 font-medium text-[11px] uppercase block">Registration Certificates:</span>
                  <ul className="pl-3 space-y-1 list-disc text-white/90 text-[12px]">
                    <li><Link to="/about#certificates" className="hover:text-black transition-colors">Section 8 Certificate</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-black transition-colors">12A</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-black transition-colors">80G</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-black transition-colors">CSR Registration</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-black transition-colors">NGO Darpan</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-black transition-colors">PAN</Link></li>
                  </ul>
                </div>
              </li>
              <li className="pl-2 border-l border-white/20 pt-1">
                <Link to="/about#financials" className="hover:text-black transition-colors block py-0.5">Financial Report</Link>
              </li>
              <li className="pl-2 border-l border-white/20">
                <Link to="/about#financials" className="hover:text-black transition-colors block py-0.5">Audit Report</Link>
              </li>
              <li className="pl-2 border-l border-white/20">
                <Link to="/about#policies" className="hover:text-black transition-colors block py-0.5">Policies</Link>
              </li>
            </ul>
          </div>

          {/* Column 5 — Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-white/20 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li>
                <a href="#" className="hover:text-black transition-colors font-bold text-sm text-white block mb-1">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-black transition-colors font-medium text-white flex items-center gap-1.5 py-0.5">
                  <AlertCircle size={14} className="text-white" />
                  <span>Raise a Complaint</span>
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin size={16} className="text-white flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed text-white">
                  7 - J 5&6 Poonam Sagar Complex, Near BMC Hospital, Poonam Sagar, Mira Road (E), Thane Maharashtra - 401107
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-white flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919454132567" className="hover:text-black transition-colors text-white">+91 9454132567</a>
                  <a href="tel:+919768000666" className="hover:text-black transition-colors text-white">+91 9768000666</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-white flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:info@sanatandharmngo.org" className="hover:text-black transition-colors text-white">info@sanatandharmngo.org</a>
                  <a href="mailto:ngo.sanatandharam@gmail.com" className="hover:text-black transition-colors text-[11px] text-white/80">ngo.sanatandharam@gmail.com</a>
                </div>
              </li>
              
              {/* Follow Us (social icons row) */}
              <li className="pt-2">
                <span className="text-[10px] uppercase tracking-wider text-white font-bold block mb-2">Follow Us</span>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#FF6600] transition-all flex items-center justify-center shadow-sm">
                    <Facebook size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#FF6600] transition-all flex items-center justify-center shadow-sm">
                    <Twitter size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#FF6600] transition-all flex items-center justify-center shadow-sm">
                    <Instagram size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#FF6600] transition-all flex items-center justify-center shadow-sm">
                    <Youtube size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-[#FF6600] transition-all flex items-center justify-center shadow-sm">
                    <Linkedin size={16} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-white/20 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-white/80">
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/about#policies" className="hover:text-black transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/about#policies" className="hover:text-black transition-colors">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/about#policies" className="hover:text-black transition-colors">Refund Policy</Link>
            <span>|</span>
            <Link to="/about#policies" className="hover:text-black transition-colors">Disclaimer</Link>
            <span>|</span>
            <a href="#" className="hover:text-black transition-colors">Sitemap</a>
          </div>

          {/* Copyright & Tagline */}
          <div className="text-center md:text-right text-white">
            <p className="font-semibold text-white/90">© 2026 Sanatan Dharm Manav Kalyan Foundation. All Rights Reserved.</p>
            <p className="text-[10px] text-white/70 mt-1 uppercase tracking-wider">A Government Registered Section 8 Non-Profit Organization</p>
          </div>

        </div>

      </div>
    </footer>
  );
}
