import React from 'react';
import { MafaldaGarciaPage } from '../features/mafalda-garcia/MafaldaGarciaPage';

// Simple static data - you can manually add the image paths here
const images = [
  '/maf_failai/hero.jpg',
  '/maf_failai/canvas.jpg', 
  '/maf_failai/connecting-souls.jpg',
  '/maf_failai/yus-esate.jpg',
  '/maf_failai/lines-of-separation.jpg',
  '/maf_failai/collaborative-movement.jpg',
  '/maf_failai/borderline-manifesto.jpg',
  '/maf_failai/freedom-manifesto.jpg',
  '/maf_failai/publication1.jpg',
  '/maf_failai/publication2.jpg',
  '/maf_failai/gallery1.jpg',
  '/maf_failai/gallery2.jpg',
  '/maf_failai/gallery3.jpg',
  '/maf_failai/gallery4.jpg',
  '/maf_failai/gallery5.jpg',
  '/maf_failai/gallery6.jpg'
];

const title = 'Mafalda Garcia';
const sections: Array<{ heading?: string; paragraphs: string[]; backgroundColor?: string }> = [];

export default function MafaldaGarciaPageWrapper() {
  return (
    <div>
      <h1>Mafalda Garcia Page</h1>
      <p>Testing if the page loads...</p>
    </div>
  );
}
