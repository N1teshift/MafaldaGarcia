import React from 'react';

interface MajorWorksSectionProps {
  // Add props as needed
}

export const MajorWorksSection: React.FC<MajorWorksSectionProps> = () => {
  return (
    <section id="major-works" className="py-20 lg:py-32 bg-artistic-light">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
          Major Works
        </h2>
        
        <div className="max-w-4xl mx-auto space-y-8 text-lg leading-relaxed text-gray-700">
          {/* Content will be added here */}
          <p className="text-center text-gray-500 italic">
            Major works content will be added here...
          </p>
        </div>
      </div>
    </section>
  );
};
