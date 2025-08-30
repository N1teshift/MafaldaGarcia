import React from 'react';
import Image from 'next/image';

interface PhilosophySectionProps {
  image?: string;
}

export const PhilosophySection: React.FC<PhilosophySectionProps> = ({ image }) => {
  return (
    <section id="philosophy" className="py-20 lg:py-32 bg-artistic-light">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="fade-in">
            <h2 className="font-playfair text-5xl lg:text-6xl mb-8 text-gray-900">
              body, my canvas. our voice
            </h2>
            <div className="w-16 h-1 bg-artistic-gold mb-8"></div>
            <h3 className="text-2xl lg:text-3xl mb-6 text-warm-gray font-medium">
              artivism, rituals and well being
            </h3>
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <p>
                All my artworks reflect a journey of reflection, live-action and the result is to create an open space of integration. <strong className="text-gray-900">Silence is my language, movement my punctuation, and the scene our mundane landscape.</strong>
              </p>
              <p>
                Rituals have a transformative power, allowing me to create human-body installations and manifestos on important topics in the contemporary scene.
              </p>
              <p className="text-xl font-medium text-gray-900">
                Well-being is at the core of my art, guiding me as I seek the path to the change I wish to see in the world.
              </p>
            </div>
          </div>
          
          <div className="fade-in">
            {image && (
              <div className="relative overflow-hidden rounded-lg hover-lift">
                <div className="aspect-[4/5]">
                  <Image 
                    src={image} 
                    alt="Body as Canvas" 
                    fill 
                    className="object-cover filter grayscale-[20%]"
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
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
