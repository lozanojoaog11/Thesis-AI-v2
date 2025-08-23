import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const LoadingSpinner: React.FC = () => (
    <div className="relative w-16 h-16">
        <div className="absolute border-4 border-brand-gray rounded-full w-full h-full"></div>
        <div 
            className="absolute border-4 border-brand-light rounded-full w-full h-full border-t-transparent"
            style={{ animation: 'spin 1s linear infinite' }}
        ></div>
        <style>{`
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
        `}</style>
    </div>
);


export const GeneratingStep: React.FC = () => {
  const { t } = useTranslation();
  const [currentPhase, setCurrentPhase] = useState(0);

  const generationPhases = t('generating.phases', { returnObjects: true }) as string[];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % generationPhases.length);
    }, 2000); // Slower transition to feel more deliberate

    return () => clearInterval(interval);
  }, [generationPhases.length]);

  return (
    <div className="animate-fadeIn w-full max-w-3xl text-center flex flex-col items-center justify-center space-y-8">
        <LoadingSpinner />
        <h1 className="text-3xl font-bold text-brand-light font-sans">{t('generating.title')}</h1>
        <p className="text-xl text-gray-400 font-mono h-8 transition-opacity duration-500">
            {generationPhases[currentPhase]}
        </p>
        <p className="text-md text-gray-500 font-sans max-w-md pt-4">
            {t('generating.description')}
        </p>
    </div>
  );
};
