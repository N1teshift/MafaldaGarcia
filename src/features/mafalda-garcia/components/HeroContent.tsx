import React from 'react';
import { useFallbackTranslation } from '@/features/i18n';

export const HeroContent: React.FC = () => {
  const { t } = useFallbackTranslation();

  return (
    <div className="flex flex-col justify-center px-8 lg:px-16 py-20 text-white">
      <h1 className="font-playfair text-6xl lg:text-8xl font-light leading-none mb-6">
        {t('hero.title')}
      </h1>
      <p className="text-xl lg:text-2xl text-warm-gray uppercase tracking-widest mb-8 font-light">
        {t('hero.subtitle')}
      </p>
      <div className="space-y-6 text-lg lg:text-xl leading-relaxed max-w-lg">
        <p className="text-gray-300">
          {t('hero.paragraph1')}
        </p>
        <p className="text-gray-300">
          {t('hero.paragraph2')}
        </p>
      </div>
      <a 
        href="#education" 
        className="inline-block mt-12 px-8 py-4 border-2 border-artistic-gold text-artistic-gold hover:bg-artistic-gold hover:text-black transition-all duration-300 uppercase tracking-wider font-medium"
      >
        {t('hero.ctaButton')}
      </a>
    </div>
  );
};
