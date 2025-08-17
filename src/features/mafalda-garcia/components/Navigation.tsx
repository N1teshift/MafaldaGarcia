import React from 'react';

export const Navigation: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <div className="font-playfair text-2xl text-white">
            Mafalda Garcia
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#canvas" className="text-white hover:text-artistic-gold transition-colors duration-300">Canvas</a>
            <a href="#exploration" className="text-white hover:text-artistic-gold transition-colors duration-300">Exploration</a>
            <a href="#performances" className="text-white hover:text-artistic-gold transition-colors duration-300">Performances</a>
            <a href="#works" className="text-white hover:text-artistic-gold transition-colors duration-300">Works</a>
            <a href="#publications" className="text-white hover:text-artistic-gold transition-colors duration-300">Publications</a>
            <a href="#visual-journey" className="text-white hover:text-artistic-gold transition-colors duration-300">Visual Journey</a>
          </div>
        </div>
      </div>
    </nav>
  );
};
