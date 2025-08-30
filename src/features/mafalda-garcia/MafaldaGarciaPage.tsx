import React from 'react';
import {
  Navigation,
  HeroSection,
  PhilosophySection,
  EducationSection,
  WorksSection,
  MajorWorksSection,
  PublicationsSection,
  GallerySection,
  ContactMeSection,
  ScrollAnimations,
  ArtisticStyles,
  LoadingScreen
} from './components';
import { usePortfolioImages } from './hooks';

interface MafaldaGarciaPageProps {
  title?: string;
  sections?: Array<{ heading?: string; paragraphs: string[]; backgroundColor?: string }>;
}

export const MafaldaGarciaPage: React.FC<MafaldaGarciaPageProps> = ({ 
}) => {
  const { images, loading, error } = usePortfolioImages({
    numImageSlots: 16,
    placeholderImage: 'education.jpg'
  });

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error('Portfolio loading error:', error);
  }

  const hasImages = images && images.length > 0;
  const hero = hasImages ? images[0] : undefined;

  return (
    <>
      <ArtisticStyles />

      <main className="min-h-screen w-full bg-white text-black font-inter">
        <Navigation />
        <HeroSection heroImage={hero} />
        <PhilosophySection image={hero} />
        <EducationSection />
        <WorksSection images={images || []} />
        <MajorWorksSection />
        <PublicationsSection images={images || []} />
        <GallerySection images={images || []} />
        <ContactMeSection />
      </main>

      <ScrollAnimations />
    </>
  );
};
