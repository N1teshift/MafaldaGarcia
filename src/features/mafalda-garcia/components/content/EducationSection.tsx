import React from 'react';
import Image from 'next/image';

interface EducationSectionProps {
  image?: string;
}

export const EducationSection: React.FC<EducationSectionProps> = ({ image }) => {
  return (
    <section id="education" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="font-playfair text-5xl lg:text-6xl text-center mb-20 text-gray-900">
          Education & Training
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div className="space-y-12">
            {/* Education */}
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-playfair text-gray-900 mb-6">
                Education
              </h3>
              <ul className="space-y-4 text-lg leading-relaxed text-gray-700">
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Bachelor's in Philosophy</strong>, Faculty of Humanities, University of Coimbra (2010)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Master's in Arts in Education</strong>, Faculty of Fine Arts, University of Lisbon (2017)</span>
                </li>
              </ul>
            </div>

            {/* Training & Workshops */}
            <div className="space-y-6">
              <h3 className="text-3xl lg:text-4xl font-playfair text-gray-900 mb-6">
                Training & Workshops
              </h3>
              <ul className="space-y-4 text-lg leading-relaxed text-gray-700">
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Street Theatre Workshop</strong> with Adrian Schvarzstein (2023)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Community Theatre Methods</strong>, BATS Baltic Applied Theatre School (2021)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Performing Art: Movement, Energy & Creativity</strong>, VOZDUKH Center (2020)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Voice and Body – Performing Arts Workshop</strong>, SOU Movement & Art Centre (2012)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Aesthetics Course</strong>, AR.CO - Art Center, Lisbon (2011)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Performing Arts Internship</strong>, ControversasIdeias, Palmela (2011)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-artistic-gold mr-3 mt-2">•</span>
                  <span><strong>Participated in 1st Int'l Conference on Art Research</strong>, FBAUL (2010)</span>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Image Section */}
          <div className="fade-in visible">
            <div className="relative overflow-hidden rounded-lg hover-lift">
              <div className="aspect-[4/5] relative">
                {image ? (
                  <Image 
                    src={image} 
                    alt="Education & Training" 
                    fill 
                    className="object-cover filter grayscale-[20%]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    onError={(e) => {
                      // Fallback to placeholder on error
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">Education Image</span></div>';
                      }
                    }}
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500">Education Image</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
