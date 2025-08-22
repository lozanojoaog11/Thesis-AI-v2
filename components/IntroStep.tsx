import React, { useEffect } from 'react';
import { Button } from './ui/Button';

interface IntroStepProps {
  onNext: () => void;
  onGenerateRandom: () => void;
  error?: string | null;
}

export const IntroStep: React.FC<IntroStepProps> = ({ onNext, onGenerateRandom, error }) => {

  return (
    <div className="animate-fadeIn max-w-3xl w-full text-center space-y-8">
      <div>
        <h1 className="text-5xl font-bold text-brand-light font-sans tracking-tight">Thesis AI</h1>
        <p className="text-xl text-gray-400 font-sans max-w-2xl mx-auto mt-4">
          Ideas are easy. Clarity is hard. This is a rigorous, multi-phase process to dissect your idea and forge a powerful, first-principles thesis.
        </p>
      </div>

      {error && (
        <div className="bg-red-900/50 border border-red-500 text-red-300 p-4 rounded-md font-mono animate-fadeIn">
            <p>{error}</p>
        </div>
      )}
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Button onClick={onNext} size="lg">
          Deconstruct My Idea
        </Button>
        <Button onClick={onGenerateRandom} variant="secondary" size="lg">
          Generate a Random Thesis
        </Button>
      </div>

       <p className="text-sm text-gray-500 font-sans pt-8">
         Don't have an idea? Let the AI generate a high-potential thesis for you to explore.
      </p>

    </div>
  );
};
