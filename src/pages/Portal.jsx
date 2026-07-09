import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Newsletter from '../components/Newsletter';
import { UploadCloud, LogIn, UserCheck, Settings, ShieldCheck } from 'lucide-react';

export default function Portal() {
  const [view, setView] = useState('login'); // 'login', 'workspace'

  return (
    <div className="min-h-screen flex flex-col font-sans bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Page Header */}
        <div className="bg-white py-16 border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <span className="inline-block bg-orange-100 text-saffron text-sm font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider">
              🚩 SECURE ACCESS
            </span>
            <h1 className="text-4xl md:text-5xl font-bold font-serif text-charcoal mb-4">
              Coordinator Portal
            </h1>
            <p className="max-w-2xl mx-auto text-gray-600 text-lg leading-relaxed">
              Session controls, secure access, and workspace tools for foundation coordinators and volunteers.
            </p>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Navigation/Tabs within Portal */}
          <div className="flex justify-center gap-4 mb-12">
            <button 
              onClick={() => setView('login')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                view === 'login' 
                ? 'bg-charcoal text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              Session & Login
            </button>
            <button 
              onClick={() => setView('workspace')}
              className={`px-8 py-3 rounded-full font-bold transition-all ${
                view === 'workspace' 
                ? 'bg-charcoal text-white shadow-md' 
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300'
              }`}
            >
              Workspace Tools
            </button>
          </div>

          {view === 'login' && (
            <div className="max-w-md mx-auto">
              <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden relative">
                <div className="h-1.5 w-full bg-gradient-to-r from-orange-400 to-red-500"></div>
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <UserCheck size={32} className="text-saffron" />
                  </div>
                  <h3 className="text-2xl font-bold text-charcoal mb-2">Active Session</h3>
                  <p className="text-gray-500 mb-8 text-sm">
                    Logged in as <strong className="text-charcoal">Coordinator</strong>. Sign out, switch role, or rotate device tokens here.
                  </p>
                  
                  <div className="space-y-4">
                    <button className="w-full bg-white border-2 border-gray-200 text-charcoal font-bold py-3.5 rounded-xl hover:border-saffron hover:text-saffron transition-all">
                      Switch Role
                    </button>
                    <button className="w-full bg-[#FF6A00] text-white font-bold py-3.5 rounded-xl hover:bg-orange-600 transition-all shadow-md shadow-orange-500/20 active:scale-95">
                      Sign Out
                    </button>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 border-t border-gray-100 text-center">
                  <a href="#" className="text-xs text-gray-500 hover:text-saffron font-medium flex items-center justify-center gap-1">
                    <Settings size={14} /> Security Settings
                  </a>
                </div>
              </div>
            </div>
          )}

          {view === 'workspace' && (
            <div className="space-y-8">
              {/* Add Financial Report Card */}
              <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <ShieldCheck size={20} className="text-saffron" />
                  </div>
                  <h3 className="text-xl font-bold text-charcoal">Add Financial Report</h3>
                </div>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 hover:bg-orange-50 hover:border-saffron transition-colors cursor-pointer group p-10 flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <UploadCloud size={32} className="text-gray-400 group-hover:text-saffron transition-colors" />
                  </div>
                  <p className="text-charcoal font-bold text-lg mb-1">Drag & drop PDF or DOCX here</p>
                  <p className="text-gray-500 text-sm">or <span className="text-saffron font-bold">click to browse</span> · max 20 MB · encrypted at rest</p>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <button className="bg-charcoal text-white font-bold py-2.5 px-6 rounded-lg hover:bg-gray-800 transition-all">
                    Upload Document
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      <Newsletter />
      <Footer />
    </div>
  );
}
