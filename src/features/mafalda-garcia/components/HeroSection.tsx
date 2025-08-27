import React from 'react';
import { HeroContent } from './HeroContent';
import { SmartImage } from '../../shared/components/ui/SmartImage';

interface HeroSectionProps {
  heroImage?: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ heroImage }) => {
  return (
    <section className="relative min-h-screen flex items-center">
      <div className="absolute inset-0 bg-artistic-dark"></div>
      <div className="relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
          <HeroContent />
          <SmartImage
            src={heroImage}
            alt="Mafalda Garcia"
            photographer="Ricardo Graça"
            priority
            imageClassName="filter contrast-110 brightness-90"
            fallbackText="Artist Portrait"
          />
        </div>
      </div>
    </section>
  );
};
