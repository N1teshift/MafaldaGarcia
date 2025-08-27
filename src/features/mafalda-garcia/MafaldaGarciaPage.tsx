import React from 'react';
import {
  Navigation,
  HeroSection,
  ContactSection,
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
        {/* EducationSection will be added here */}
        {/* WorksSection will be added here */}
        {/* MajorWorksSection will be added here */}
        {/* PublicationsSection will be added here */}
        {/* VisualJourneySection will be added here */}
        <ContactSection />
      </main>

      <ScrollAnimations />
    </>
  );
};
