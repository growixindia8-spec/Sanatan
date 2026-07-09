import React from 'react';
import { audioTracks } from '../../data/mediaAudio';
import { Play } from 'lucide-react';

export default function BhajanAudioGrid() {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">✦ BHAJAN • AARTI • SPIRITUAL</span>
        <h2 className="text-3xl font-bold font-serif text-charcoal">Sounds of Devotion</h2>
        <p className="text-gray-600 font-medium mt-2 max-w-2xl mx-auto">Sacred audio, aarti recordings and spiritual chants.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-6">
        {audioTracks.map((track) => (
          <div key={track.id} className="bg-white p-4 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex items-center gap-4 group">
            <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
              <img src={track.thumbnail} alt={track.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Play className="text-white fill-current" size={24} />
              </div>
            </div>
            <div className="flex-grow min-w-0">
              <h3 className="font-bold text-charcoal text-sm md:text-base truncate group-hover:text-saffron transition-colors">{track.title}</h3>
              <p className="text-xs text-gray-500 mt-1 truncate">{track.artist}</p>
              <div className="flex items-center gap-2 mt-2">
                 <button className="w-6 h-6 rounded-full bg-saffron/10 text-saffron flex items-center justify-center hover:bg-saffron hover:text-white transition-colors">
                    <Play size={12} className="fill-current ml-0.5" />
                 </button>
                 <div className="flex-grow h-1 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gray-300 w-0"></div>
                 </div>
                 <span className="text-[10px] text-gray-400 font-mono">{track.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
