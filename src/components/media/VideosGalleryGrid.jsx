import React from 'react';
import { videos } from '../../data/mediaVideos';
import { PlayCircle } from 'lucide-react';

export default function VideosGalleryGrid() {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">✦ VIDEOS GALLERY</span>
        <h2 className="text-3xl font-bold font-serif text-charcoal">Stories in Motion</h2>
        <p className="text-gray-600 font-medium mt-2 max-w-2xl mx-auto">Documentaries, campaign films and mission highlights from the field.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow border border-gray-100 group cursor-pointer flex flex-col">
            <div className="relative aspect-video bg-gray-200 overflow-hidden">
              <img 
                src={video.thumbnail} 
                alt={video.title} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                <PlayCircle size={64} className="text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all drop-shadow-lg" />
              </div>
              <span className="absolute bottom-3 right-3 bg-black/70 text-white text-xs font-bold px-2 py-1 rounded">
                {video.duration}
              </span>
            </div>
            <div className="p-5 flex-grow">
              <h3 className="font-bold text-charcoal text-lg group-hover:text-saffron transition-colors line-clamp-2">{video.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
