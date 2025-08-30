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
  // Function to extract YouTube video ID from URL
  const getYouTubeVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Function to render YouTube embed if credits contains a YouTube URL
    const renderYouTubeEmbed = () => {
    if (!credits) return null;

    const videoId = getYouTubeVideoId(credits);
    if (!videoId) return null;

    return (
      <div className="mt-6">
        <div className="relative overflow-hidden rounded-lg shadow-lg">
          <div className="aspect-video">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=0&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
              title={title}
              className="w-full h-full"
              frameBorder="0"
              loading="lazy"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              sandbox="allow-scripts allow-same-origin allow-presentation"
            />
          </div>
        </div>
      </div>
    );
  };

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
        {credits && !credits.includes('youtu.be') && !credits.includes('youtube.com') && (
          <p className="text-sm text-warm-gray italic mt-4">
            {credits}
          </p>
        )}
        {renderYouTubeEmbed()}
      </div>
    </div>
  );

  const imageContent = image && (
    <div className="flex-1">
      <div className="relative overflow-hidden rounded-lg hover-lift">
        <div className="aspect-[4/3] relative">
          <Image 
            src={image} 
            alt={title} 
            fill 
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
    <div className="fade-in visible max-w-4xl mx-auto">
      {content}
    </div>
  );
};
