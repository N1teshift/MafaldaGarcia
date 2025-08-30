import React from 'react';
import Image from 'next/image';

interface MajorWorkItemProps {
  title: string;
  year: string;
  duration: string;
  concept: string;
  description: string;
  credits: string;
  location: string;
  images: string[];
}

export const MajorWorkItem: React.FC<MajorWorkItemProps> = ({
  title,
  year,
  duration,
  concept,
  description,
  credits,
  location,
  images
}) => {
  return (
    <div className="fade-in visible space-y-12">
      {/* Image Gallery */}
      {images && images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
                            <div key={index} className="relative overflow-hidden rounded-lg hover-lift">
              <div className="aspect-[4/5] relative">
                <Image
                  src={image}
                  alt={`${title} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">Image</span></div>';
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Content */}
      <div className="space-y-8">
        {/* Title and Basic Info */}
        <div className="space-y-4">
          <h3 className="font-playfair text-4xl lg:text-5xl text-gray-900">
            "{title}"
          </h3>
          <div className="flex flex-wrap gap-6 text-lg text-gray-700">
            <div>
              <span className="font-medium">Year of Creation:</span> {year}
            </div>
            <div>
              <span className="font-medium">Duration:</span> {duration}
            </div>
          </div>
        </div>

        {/* Concept */}
        <div className="space-y-4">
          <h4 className="text-2xl lg:text-3xl font-playfair text-gray-900">
            Concept & Description
          </h4>
          <div className="space-y-4 text-lg leading-relaxed text-gray-700">
            <p>{concept}</p>
            {description.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* Credits and Location */}
        <div className="space-y-4 pt-6 border-t border-gray-200">
          <div className="text-sm text-warm-gray">
            {credits.split('\n').map((line, index) => {
              // Check if line contains a URL
              const urlMatch = line.match(/(https?:\/\/[^\s]+)/);
              if (urlMatch) {
                const url = urlMatch[1];
                const textBeforeUrl = line.substring(0, line.indexOf(url));
                const textAfterUrl = line.substring(line.indexOf(url) + url.length);
                
                return (
                  <p key={index}>
                    {textBeforeUrl}
                    <a 
                      href={url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-artistic-gold hover:underline"
                    >
                      {url}
                    </a>
                    {textAfterUrl}
                  </p>
                );
              }
              
              // Check if this is a section header (like "Press & Media Coverage:")
              if (line.includes(':')) {
                const [header, ...rest] = line.split(':');
                return (
                  <p key={index}>
                    <span className="font-medium">{header}:</span> {rest.join(':')}
                  </p>
                );
              }
              
              return (
                <p key={index}>
                  {line}
                </p>
              );
            })}
            <p><span className="font-medium">Location:</span> {location}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
