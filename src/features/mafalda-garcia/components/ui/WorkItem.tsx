import React from 'react';
import Image from 'next/image';

interface WorkItemProps {
  title: string;
  description: string;
  image?: string;
  credits?: string;
  isReversed?: boolean;
  quotes?: string[];
}

export const WorkItem: React.FC<WorkItemProps> = ({ 
  title, 
  description, 
  image, 
  credits, 
  isReversed = false,
  quotes = []
}) => {
  const content = (
    <div className="flex-1 space-y-6">
      <h3 className="font-playfair text-3xl lg:text-4xl text-gray-900 mb-6">
        {title}
      </h3>
      <div className="space-y-4 text-lg leading-relaxed text-gray-700">
        <p>{description}</p>
        {quotes.map((quote, index) => (
          <p key={index} className="italic">
            "{quote}"
          </p>
        ))}
        {credits && (
          <p className="text-sm text-warm-gray italic mt-4">
            {credits}
          </p>
        )}
      </div>
    </div>
  );

  const imageContent = image && (
    <div className="flex-1">
      <div className="relative overflow-hidden rounded-lg hover-lift">
        <div className="aspect-[4/3]">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover"
            onError={(e) => {
              // Fallback to placeholder on error
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">Work Image</span></div>';
              }
            }}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`fade-in flex flex-col lg:flex-row gap-16 items-center ${isReversed ? 'lg:flex-row-reverse' : ''}`}>
      {isReversed ? (
        <>
          {imageContent}
          {content}
        </>
      ) : (
        <>
          {content}
          {imageContent}
        </>
      )}
    </div>
  );
};
