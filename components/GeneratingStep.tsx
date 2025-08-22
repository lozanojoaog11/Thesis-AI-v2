import React, { useState, useEffect } from 'react';

const generationPhases = [
    "Phase 1: Deconstructing Reality...",
    "Analyzing First Principles & JTBD...",
    "Phase 2: Mapping Ecosystem...",
    "Analyzing PESTEL & Porter's Forces...",
    "Phase 3: Creative Synthesis...",
    "Executing SCAMPER & Cross-Pollination...",
    "Phase 4: Modeling Business Viability...",
    "Designing Lean Canvas & Hook Model...",
    "Phase 5: Forging Final Thesis...",
    "Manifesting..."
];

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
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhase(prev => (prev + 1) % generationPhases.length);
    }, 2000); // Slower transition to feel more deliberate

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="animate-fadeIn w-full max-w-3xl text-center flex flex-col items-center justify-center space-y-8">
        <LoadingSpinner />
        <h1 className="text-3xl font-bold text-brand-light font-sans">Executing LEVIATHAN Protocol</h1>
        <p className="text-xl text-gray-400 font-mono h-8 transition-opacity duration-500">
            {generationPhases[currentPhase]}
        </p>
        <p className="text-md text-gray-500 font-sans max-w-md pt-4">
            This complex process can take up to a minute. The AI is performing a deep strategic analysis to generate a high-quality result.
        </p>
    </div>
  );
};
