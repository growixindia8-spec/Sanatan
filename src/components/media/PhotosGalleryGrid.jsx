import React from 'react';
import { photos } from '../../data/mediaPhotos';

export default function PhotosGalleryGrid() {
  return (
    <div className="py-8">
      <div className="text-center mb-12">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">✦ PHOTOS GALLERY</span>
        <h2 className="text-3xl md:text-4xl font-bold font-serif text-charcoal">Moments from the Field</h2>
        <p className="text-gray-600 font-medium mt-2 max-w-2xl mx-auto leading-relaxed">
          A masonry chronicle of seva, festivals and sacred rituals captured by our field volunteers.
        </p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {photos.map((photo, index) => (
          <div 
            key={index} 
            className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-white border border-gray-100 flex flex-col mb-6 cursor-pointer"
          >
            <div className="relative overflow-hidden">
              <img 
                src={photo.image} 
                alt={photo.caption} 
                className="w-full h-auto object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              
              {/* Smooth slide-up gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                <p className="text-white font-devanagari font-bold text-sm leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {photo.caption}
                </p>
              </div>
            </div>
            
            {/* Spacing & Typography for caption */}
            <div className="p-4 bg-white border-t border-gray-50 flex-grow">
              <p className="font-devanagari font-bold text-charcoal text-sm leading-relaxed group-hover:text-saffron transition-colors duration-300">
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
