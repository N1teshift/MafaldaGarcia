import React from 'react';

export const Navigation: React.FC = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex justify-between items-center h-16">
          <div className="font-playfair text-xl text-gray-900">
            Mafalda Garcia
          </div>
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => scrollToSection('philosophy')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Philosophy
            </button>
            <button
              onClick={() => scrollToSection('education')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Education
            </button>
            <button
              onClick={() => scrollToSection('works')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Works
            </button>
            <button
              onClick={() => scrollToSection('major-works')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Major Works
            </button>
            <button
              onClick={() => scrollToSection('publications')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Publications
            </button>
            <button
              onClick={() => scrollToSection('gallery')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Gallery
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-gray-700 hover:text-artistic-gold transition-colors duration-300"
            >
              Contact
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
