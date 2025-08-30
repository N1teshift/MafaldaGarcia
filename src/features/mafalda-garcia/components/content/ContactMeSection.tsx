import React from 'react';

export const ContactMeSection: React.FC = () => {
  return (
    <section id="contact" className="py-20 lg:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-8 text-center">
        <h2 className="font-playfair text-5xl lg:text-6xl mb-8 text-gray-900">
          CONTACT ME
        </h2>
        <p className="text-xl mb-12 text-gray-700 leading-relaxed">
          For collaborations, exhibitions, or to learn more about my work,<br />
          I'd love to hear from you.
        </p>
        <div className="flex justify-center space-x-8">
          <a href="mailto:mafalda@example.com" className="text-gray-900 hover:text-artistic-gold transition-colors duration-300 text-lg font-medium">
            Email
          </a>
          <a href="#" className="text-gray-900 hover:text-artistic-gold transition-colors duration-300 text-lg font-medium">
            Instagram
          </a>
          <a href="#" className="text-gray-900 hover:text-artistic-gold transition-colors duration-300 text-lg font-medium">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
};
