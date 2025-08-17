import React from 'react';
import Head from 'next/head';
import Layout from '@components/Layout';
import {
  HeroSection,
  Navigation,
  CanvasSection,
  ExplorationSection,
  PerformancesSection,
  WorksSection,
  PublicationsSection,
  VisualJourneySection,
  ContactSection,
  ScrollAnimations,
  ArtisticStyles
} from './components';

interface MafaldaGarciaPageProps {
  images: string[];
  title: string;
  sections: Array<{ heading?: string; paragraphs: string[]; backgroundColor?: string }>;
}

export const MafaldaGarciaPage: React.FC<MafaldaGarciaPageProps> = ({ 
  images, 
  title, 
  sections 
}) => {
  const hasImages = images && images.length > 0;
  const hero = hasImages ? images[0] : undefined;

  return (
    <Layout translationNs={["common"]}>
      <Head>
        <title>{title || 'Mafalda Garcia - Performance Artist'}</title>
        <meta name="description" content="Mafalda Garcia - Performance Artist exploring artivism, rituals & well-being through interdisciplinary dialogue" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </Head>

      <ArtisticStyles />

      <main className="min-h-screen w-full bg-white text-black font-inter">
        <Navigation />
        <HeroSection heroImage={hero} />
        <CanvasSection image={hasImages ? images[1] : undefined} />
        <ExplorationSection />
        <PerformancesSection />
        <WorksSection images={images} />
        <PublicationsSection images={images} />
        <VisualJourneySection images={images} />
        <ContactSection />
      </main>

      <ScrollAnimations />
    </Layout>
  );
};
