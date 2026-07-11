import React from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      <main className="flex-grow py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-4 inline-block">
              Get in Touch
            </span>
            <h1 className="text-4xl font-bold text-charcoal mb-4">Contact Us</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 max-w-5xl mx-auto">
            
            {/* Contact Info */}
            <div className="lg:w-1/3 space-y-6">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-50 text-saffron rounded-full flex items-center justify-center mb-4">
                  <MapPin size={24} />
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-2">Visit Us</h3>
                <p className="text-gray-600 text-sm">Sanatan Dharm Manav Kalyan Foundation<br/>123, Sewa Marg, New Delhi, India 110001</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-50 text-saffron rounded-full flex items-center justify-center mb-4">
                  <Mail size={24} />
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-2">Email Us</h3>
                <p className="text-gray-600 text-sm">info@sanatankalyan.org<br/>support@sanatankalyan.org</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="w-12 h-12 bg-orange-50 text-saffron rounded-full flex items-center justify-center mb-4">
                  <Phone size={24} />
                </div>
                <h3 className="font-bold text-charcoal text-lg mb-2">Call Us</h3>
                <p className="text-gray-600 text-sm">+91 98765 43210<br/>(Mon - Fri, 10am to 6pm)</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-2/3 bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-charcoal mb-6">Send a Message</h2>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="Your Name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input type="email" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="Your Email" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                  <input type="text" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                  <textarea rows="6" className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron" placeholder="Write your message here..."></textarea>
                </div>
                <button type="button" className="bg-[#FF6A00] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all btn-animated">
                  Send Message
                </button>
              </form>
            </div>
            
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
