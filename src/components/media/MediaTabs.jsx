import React, { useState } from 'react';
import { Camera, Film, Music, Newspaper } from 'lucide-react';
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
                  ? 'bg-[#1a202c] text-white border border-[#1a202c]' 
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
        {activeTab === 'photos' && <PhotosGalleryGrid />}
        {activeTab === 'videos' && <VideosGalleryGrid />}
        {activeTab === 'bhajan' && <BhajanAudioGrid />}
        {activeTab === 'media' && <MediaCoverageGrid />}
      </div>
    </div>
  );
}
