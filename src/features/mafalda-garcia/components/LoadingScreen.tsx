import React from 'react';
import { useTranslation } from 'next-i18next';

export const LoadingScreen: React.FC = () => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-lg">{t('loading')}</p>
      </div>
    </div>
  );
};
