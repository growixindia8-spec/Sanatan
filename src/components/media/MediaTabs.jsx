import React, { useState } from 'react';
import { Camera, Film, Music, Newspaper } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import PhotosGalleryGrid from './PhotosGalleryGrid';
import VideosGalleryGrid from './VideosGalleryGrid';
import BhajanAudioGrid from './BhajanAudioGrid';
import MediaCoverageGrid from './MediaCoverageGrid';

export default function MediaTabs() {
  const [activeTab, setActiveTab] = useState('photos');

  const tabs = [
    { id: 'photos', label: 'Photos Gallery', icon: <Camera size={16} /> },
    { id: 'videos', label: 'Videos Gallery', icon: <Film size={16} /> },
    { id: 'bhajan', label: 'Bhajan • Aarti • Spiritual', icon: <Music size={16} /> },
    { id: 'media', label: 'Media Coverage', icon: <Newspaper size={16} /> }
  ];

  return (
    <div className="w-full">
      {/* Tabs Header */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all shadow-sm ${
                isActive 
                  ? 'bg-charcoal text-white border border-charcoal shadow-md shadow-slate-400/20' 
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tabs Content */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {activeTab === 'photos' && <PhotosGalleryGrid />}
            {activeTab === 'videos' && <VideosGalleryGrid />}
            {activeTab === 'bhajan' && <BhajanAudioGrid />}
            {activeTab === 'media' && <MediaCoverageGrid />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
