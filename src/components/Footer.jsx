import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Linkedin, Mail, Phone, MapPin, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Column 1 — About Foundation */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              About Foundation
            </h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="hover:text-[#FF6B00] transition-colors">About Us</Link></li>
              <li><Link to="/about#vision-mission" className="hover:text-[#FF6B00] transition-colors">Vision & Mission</Link></li>
              <li><Link to="/activities/current" className="hover:text-[#FF6B00] transition-colors">Our Activities</Link></li>
              <li><Link to="/activities/future-missions" className="hover:text-[#FF6B00] transition-colors">Future Missions</Link></li>
              <li><Link to="/activities/festival-seva-calendar" className="hover:text-[#FF6B00] transition-colors">Festivals</Link></li>
            </ul>
          </div>

          {/* Column 2 — Get Involved */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Get Involved
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Donation Hub</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Start Fundraiser</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">View Fundraisers</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Need Help</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Join Us</a></li>
            </ul>
          </div>

          {/* Column 3 — Media & Resources */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Media & Resources
            </h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">News & Events</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Photo Gallery</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Video Gallery</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">Announcements</a></li>
              <li><a href="#" className="hover:text-[#FF6B00] transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4 — Transparency & Legal */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Transparency & Legal
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="font-semibold text-white mb-1">Transparency & Reports</li>
              <li className="pl-2 border-l border-gray-700 space-y-2">
                <span className="text-gray-400 font-medium text-xs uppercase block">Legal Documents</span>
                <div className="pl-2 space-y-1.5 border-l border-gray-800">
                  <span className="text-gray-500 font-medium text-[11px] uppercase block">Registration Certificates:</span>
                  <ul className="pl-3 space-y-1 list-disc text-gray-400 text-[12px]">
                    <li><Link to="/about#certificates" className="hover:text-[#FF6B00] transition-colors">Section 8 Certificate</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-[#FF6B00] transition-colors">12A</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-[#FF6B00] transition-colors">80G</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-[#FF6B00] transition-colors">CSR Registration</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-[#FF6B00] transition-colors">NGO Darpan</Link></li>
                    <li><Link to="/about#certificates" className="hover:text-[#FF6B00] transition-colors">PAN</Link></li>
                  </ul>
                </div>
              </li>
              <li className="pl-2 border-l border-gray-700 pt-1">
                <Link to="/about#financials" className="hover:text-[#FF6B00] transition-colors block py-0.5">Financial Report</Link>
              </li>
              <li className="pl-2 border-l border-gray-700">
                <Link to="/about#financials" className="hover:text-[#FF6B00] transition-colors block py-0.5">Audit Report</Link>
              </li>
              <li className="pl-2 border-l border-gray-700">
                <Link to="/about#policies" className="hover:text-[#FF6B00] transition-colors block py-0.5">Policies</Link>
              </li>
            </ul>
          </div>

          {/* Column 5 — Contact */}
          <div>
            <h4 className="text-white font-bold mb-5 uppercase text-sm tracking-wider border-b border-gray-800 pb-2">
              Contact Us
            </h4>
            <ul className="space-y-3.5 text-xs">
              <li>
                <a href="#" className="hover:text-[#FF6B00] transition-colors font-bold text-sm text-white block mb-1">Contact Us</a>
              </li>
              <li>
                <a href="#" className="hover:text-red-500 transition-colors font-medium text-gray-300 flex items-center gap-1.5 py-0.5">
                  <AlertCircle size={14} className="text-red-500" />
                  <span>Raise a Complaint</span>
                </a>
              </li>
              <li className="flex items-start gap-2 pt-1">
                <MapPin size={16} className="text-[#FF6B00] flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  7 - J 5&6 Poonam Sagar Complex, Near BMC Hospital, Poonam Sagar, Mira Road (E), Thane Maharashtra - 401107
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-[#FF6B00] flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="tel:+919454132567" className="hover:text-[#FF6B00] transition-colors">+91 9454132567</a>
                  <a href="tel:+919768000666" className="hover:text-[#FF6B00] transition-colors">+91 9768000666</a>
                </div>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#FF6B00] flex-shrink-0" />
                <div className="flex flex-col">
                  <a href="mailto:info@sanatandharmngo.org" className="hover:text-[#FF6B00] transition-colors">info@sanatandharmngo.org</a>
                  <a href="mailto:ngo.sanatandharam@gmail.com" className="hover:text-[#FF6B00] transition-colors text-[11px] text-gray-500">ngo.sanatandharam@gmail.com</a>
                </div>
              </li>
              
              {/* Follow Us (social icons row) */}
              <li className="pt-2">
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold block mb-2">Follow Us</span>
                <div className="flex gap-3">
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FF6B00] text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <Facebook size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FF6B00] text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <Twitter size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FF6B00] text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <Instagram size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FF6B00] text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <Youtube size={16} />
                  </a>
                  <a href="#" className="w-8 h-8 rounded-full bg-gray-800 hover:bg-[#FF6B00] text-gray-300 hover:text-white transition-all flex items-center justify-center shadow-sm">
                    <Linkedin size={16} />
                  </a>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Footer Bar */}
        <div className="border-t border-gray-800 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center text-xs gap-4 text-gray-500">
          
          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <Link to="/about#policies" className="hover:text-white transition-colors">Privacy Policy</Link>
            <span>|</span>
            <Link to="/about#policies" className="hover:text-white transition-colors">Terms & Conditions</Link>
            <span>|</span>
            <Link to="/about#policies" className="hover:text-white transition-colors">Refund Policy</Link>
            <span>|</span>
            <Link to="/about#policies" className="hover:text-white transition-colors">Disclaimer</Link>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Sitemap</a>
          </div>

          {/* Copyright & Tagline */}
          <div className="text-center md:text-right">
            <p className="font-semibold text-gray-400">© 2026 Sanatan Dharm Manav Kalyan Foundation. All Rights Reserved.</p>
            <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-wider">A Government Registered Section 8 Non-Profit Organization</p>
          </div>

        </div>

      </div>
    </footer>
  );
}
