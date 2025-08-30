import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-artistic-dark">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-artistic-gold mx-auto mb-4"></div>
        <p className="text-white font-playfair text-xl">Loading...</p>
      </div>
    </div>
  );
};
