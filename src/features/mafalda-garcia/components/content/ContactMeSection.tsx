import React from 'react';
import Image from 'next/image';

export const ContactMeSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Contact Information */}
          <div className="space-y-8">
            <h2 className="font-playfair text-5xl lg:text-6xl text-gray-900">
              CONTACT ME
            </h2>
            
            <div className="space-y-6 text-lg leading-relaxed text-gray-700">
              <div>
                <h3 className="font-medium text-gray-900 mb-2">ADDRESS</h3>
                <p>
                  Ausekļi", Rjabki, Sakstagala pag.,<br />
                  Rēzeknes nov., LV-4645<br />
                  latvia
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Phone</h3>
                <p>(00371) 23551790</p>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 mb-2">Email</h3>
                <a 
                  href="mailto:mafalda.garsija@gmail.com" 
                  className="text-artistic-gold hover:underline transition-colors duration-300"
                >
                  mafalda.garsija@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Placeholder Image */}
          <div className="fade-in visible">
            <div className="relative overflow-hidden rounded-lg shadow-lg">
              <div className="aspect-[4/5] relative">
                <Image
                  src={process.env.NEXT_PUBLIC_PLACEHOLDER_URL || ''}
                  alt="Contact Me"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="w-full h-full bg-gray-200 flex items-center justify-center"><span class="text-gray-500">Contact Image</span></div>';
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
