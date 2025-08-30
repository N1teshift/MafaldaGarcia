import React from 'react';
import Image from 'next/image';

interface PhilosophySectionProps {
  image?: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ image }) => {
  return (
    <section id="philosophy" className="py-20 lg:py-32 bg-artistic-light">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="fade-in visible">
            <h2 className="font-playfair text-5xl lg:text-6xl mb-8 text-gray-900">
              BODY, MY CANVAS. OUR VOICE
            </h2>
            <div className="w-16 h-1 bg-artistic-gold mb-8"></div>
            <h3 className="text-2xl lg:text-3xl mb-6 text-warm-gray font-medium">
              Artivism, rituals & well-being
            </h3>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                All my artworks reflect a journey of reflection, live-action and the result is to create an open space of integration. Silence is my language, movement my punctuation, and the scene our mundane landscape.
              </p>
              <p>
                Rituals are my medium for incorporating new perspectives and states of mind, allowing me to create human-body installations and manifestos on important topics in the contemporary scene.
              </p>
              <p>
                Well-being is at the core of my art, guiding me as I seek the path to the change I wish to see in the world.
              </p>
            </div>
          </div>
          
          <div className="fade-in visible">
            <div className="relative overflow-hidden rounded-lg hover-lift">
              <div className="aspect-[4/5] relative">
                {image ? (
                  <Image 
                    src={image} 
                    alt="Body as Canvas" 
                    fill 
                    className="object-cover filter grayscale-[20%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">Philosophy Image</span></div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Philosophy Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider"></div>
    </section>
  );
};
