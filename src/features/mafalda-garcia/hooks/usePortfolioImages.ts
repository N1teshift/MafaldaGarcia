import { useState, useEffect } from 'react';

interface ImageUrls {
  [key: string]: string;
}

interface UsePortfolioImagesOptions {
  numImageSlots?: number;
  placeholderImage?: string;
}

export function usePortfolioImages(options: UsePortfolioImagesOptions = {}) {
  const { 
    numImageSlots = 16, 
    placeholderImage = 'education.jpg' 
  } = options;
  
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        setError(null);
        const response = await fetch('/api/images');
        const data: { images: ImageUrls; availableImages?: string[] } = await response.json();

        // Use specified placeholder from Firebase, or fallback to first available image
        const placeholderUrl =
          data.images?.[placeholderImage] ||
          (data.availableImages && data.availableImages.length > 0
            ? data.images[data.availableImages[0]]
            : `https://via.placeholder.com/800x600/cccccc/666666?text=${placeholderImage}`);

        // Fill all slots with the same placeholder image
        const imageArray = Array.from({ length: numImageSlots }, () => placeholderUrl);
        setImages(imageArray);
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images');
        
        // Fallback: fill with generic placeholder if API fails
        const fallbackUrl = `https://via.placeholder.com/800x600/cccccc/666666?text=${placeholderImage}`;
        setImages(Array.from({ length: numImageSlots }, () => fallbackUrl));
      } finally {
        setLoading(false);
      }
    }

    fetchImages();
  }, [numImageSlots, placeholderImage]);

  return { images, loading, error };
}
