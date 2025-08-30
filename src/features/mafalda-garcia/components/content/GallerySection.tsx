import React from 'react';
import Image from 'next/image';

interface GallerySectionProps {
  images: string[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ images = [] }) => {
  return (
    <section id="gallery" className="py-20 lg:py-32 bg-artistic-dark text-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Title */}
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20">
          Visual Journey: Fragments of Creation
        </h2>
        
        {/* Photo Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {Array.from({ length: 6 }, (_, idx) => {
            const src = images[idx] || process.env.NEXT_PUBLIC_PLACEHOLDER_URL || '';
            return (
              <div key={`gallery-${idx}`} className="fade-in visible hover-lift">
                <div className="relative overflow-hidden rounded-lg bg-white shadow-lg">
                  <div className="aspect-[4/5] relative">
                    <Image 
                      src={src} 
                      alt={`Visual Journey ${idx + 1}`} 
                      fill 
                      className="object-cover" 
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      onError={(e) => {
                        // Fallback to placeholder on error
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full bg-gray-300 flex items-center justify-center"><span class="text-gray-500">Image</span></div>';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quote from MG */}
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="artistic-quote relative text-2xl lg:text-3xl leading-relaxed italic font-light">
            "In the space between movement and stillness, between sound and silence, we find the essence of what it means to be human. Each performance is a fragment of creation, a moment of truth captured in the ephemeral dance of existence."
          </blockquote>
          <p className="text-lg text-warm-gray mt-6">— Mafalda Garcia</p>
        </div>
      </div>
    </section>
  );
};
