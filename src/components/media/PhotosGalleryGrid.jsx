import React from 'react';
import { photos } from '../../data/mediaPhotos';

export default function PhotosGalleryGrid() {
  return (
    <div className="py-8">
      <div className="text-center mb-10">
        <span className="text-xs font-bold text-saffron uppercase tracking-widest mb-2 block">✦ PHOTOS GALLERY</span>
        <h2 className="text-3xl font-bold font-serif text-charcoal">Moments from the Field</h2>
        <p className="text-gray-600 font-medium mt-2 max-w-2xl mx-auto">A masonry chronicle of seva, festivals and sacred rituals captured by our field volunteers.</p>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {photos.map((photo, index) => (
          <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white">
            <img 
              src={photo.image} 
              alt={photo.caption} 
              className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            />
            {/* Overlay Gradient on hover or static depending on preference. Let's make it an overlay at the bottom always visible on mobile, visible on hover for desktop, or just a caption below. The prompt says "caption text below or as an overlay on hover (gradient overlay bottom, white text) — match your screenshot's style... captions below image". I'll put it below the image as a clean card. */}
            <div className="p-4 border-t border-gray-100">
              <p className="font-semibold text-charcoal text-sm">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
