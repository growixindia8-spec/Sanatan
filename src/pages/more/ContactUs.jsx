import React, { useState } from 'react';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Phone, Mail, MapPin } from 'lucide-react';
import { api } from '../../lib/apiClient';

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setSuccessMsg("");
    setErrorMsg("");

    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setErrorMsg("Please enter a valid 10-digit Indian mobile number.");
      return;
    }

    setLoading(true);
    try {
      const res = await api.submitContact({ fullName, email, mobile, subject, message });
      if (res.success) {
        setSuccessMsg(res.message || "Your message has been sent successfully!");
        setFullName("");
        setEmail("");
        setMobile("");
        setSubject("");
        setMessage("");
      } else {
        setErrorMsg(res.message || "Failed to submit message.");
      }
    } catch (err) {
      setErrorMsg(err.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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
              
              {successMsg && (
                <div className="mb-6 p-4 bg-green-50 text-green-700 text-sm font-semibold rounded-xl border border-green-200">
                  {successMsg}
                </div>
              )}
              {errorMsg && (
                <div className="mb-6 p-4 bg-red-50 text-red-650 text-red-600 text-sm font-semibold rounded-xl border border-red-200">
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number</label>
                    <input
                      type="tel"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      maxLength={10}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron"
                      placeholder="Your 10-Digit Mobile"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Subject</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron"
                      placeholder="How can we help?"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Message</label>
                  <textarea
                    rows="6"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:border-saffron"
                    placeholder="Write your message here..."
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-[#FF6A00] text-white px-8 py-3 rounded-full font-bold hover:bg-orange-600 transition-all btn-animated disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send Message"}
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
