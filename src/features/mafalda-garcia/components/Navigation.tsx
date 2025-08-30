import React from 'react';
import { useTranslation } from 'next-i18next';
import { LanguageSwitcher } from '../../shared/components/ui/LanguageSwitcher';

export const Navigation: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-playfair text-2xl text-white">
            {t('hero.title')}
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="#canvas" className="text-white hover:text-artistic-gold transition-colors duration-300">Canvas</a>
            <a href="#exploration" className="text-white hover:text-artistic-gold transition-colors duration-300">{t('sections.exploration')}</a>
            <a href="#performances" className="text-white hover:text-artistic-gold transition-colors duration-300">{t('sections.performances')}</a>
            <a href="#works" className="text-white hover:text-artistic-gold transition-colors duration-300">{t('sections.works')}</a>
            <a href="#publications" className="text-white hover:text-artistic-gold transition-colors duration-300">{t('sections.publications')}</a>
            <a href="#visual-journey" className="text-white hover:text-artistic-gold transition-colors duration-300">{t('sections.visualJourney')}</a>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </nav>
  );
};
