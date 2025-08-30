import React from 'react';
import Image from 'next/image';

interface PublicationsSectionProps {
  images: string[];
}

export const PublicationsSection: React.FC<PublicationsSectionProps> = ({ images = [] }) => {
  const publications = [
    {
      title: "Performance Art and Social Engagement",
      description: "A comprehensive exploration of how performance art can serve as a tool for social change and community engagement, examining the intersection of art, activism, and well-being in contemporary society.",
      image: images[7] || undefined
    },
    {
      title: "The Body as Political Instrument",
      description: "An analysis of how the human body functions as a medium for political expression and social commentary in contemporary performance art, with focus on feminist perspectives and collective action.",
      image: images[8] || undefined
    }
  ];

  return (
    <section id="publications" className="py-20 lg:py-32 bg-artistic-light">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
          Publications
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {publications.map((pub, index) => (
            <div key={index} className="fade-in">
              <div className="relative overflow-hidden rounded-lg hover-lift mb-6">
                <div className="aspect-[4/3]">
                  {pub.image ? (
                    <Image 
                      src={pub.image} 
                      alt={pub.title} 
                      fill 
                      className="object-cover"
                      onError={(e) => {
                        // Fallback to placeholder on error
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">Publication Image</span></div>';
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-500">Publication Image</span>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="font-playfair text-2xl lg:text-3xl mb-4 text-gray-900">
                {pub.title}
              </h3>
              <p className="text-lg leading-relaxed text-gray-700">
                {pub.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
