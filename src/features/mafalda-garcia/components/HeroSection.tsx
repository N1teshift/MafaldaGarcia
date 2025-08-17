import React from 'react';
import Image from 'next/image';

interface HeroSectionProps {
  heroImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage }) => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-artistic-dark"></div>
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          {/* Content Side */}
          <div className="flex flex-col justify-center px-8 lg:px-16 py-20 text-white">
            <h1 className="font-playfair text-6xl lg:text-8xl font-light leading-none mb-6">
              Mafalda<br />
              <span className="gradient-text">Garcia</span>
            </h1>
            <p className="text-xl lg:text-2xl text-warm-gray uppercase tracking-widest mb-8 font-light">
              Performance Artist
            </p>
            <div className="space-y-6 text-lg lg:text-xl leading-relaxed max-w-lg">
              <p className="text-gray-300">
                I began to explore performance art as a safe space to express my feelings & ideas about post-postmodern life. For a long time I kept everything inside, until I discovered this powerful way of communicating; without words, using only my body as a tool for interdisciplinary dialogue, not as an escape from reality, but as a profound way of expressing what is going on inside and outside of me.
              </p>
              <p className="text-gray-300">
                It allows me to connect with others in deep silence, to shout without using my voice, and to immerse myself in a laboratory where I can discover my own questions and invite others to find theirs.
              </p>
            </div>
            <a 
              href="#canvas" 
              className="inline-block mt-12 px-8 py-4 border-2 border-artistic-gold text-artistic-gold hover:bg-artistic-gold hover:text-black transition-all duration-300 uppercase tracking-wider font-medium"
            >
              Explore My Work
            </a>
          </div>
          
          {/* Image Side */}
          <div className="relative overflow-hidden">
            {heroImage ? (
              <>
                <Image 
                  src={heroImage} 
                  alt="Mafalda Garcia" 
                  fill 
                  priority 
                  className="object-cover filter contrast-110 brightness-90" 
                />
                <div className="absolute bottom-6 left-6 text-white/70 text-sm">
                  Photo by Ricardo Graça
                </div>
              </>
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gray-900">
                <span className="text-gray-500">Artist Portrait</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
