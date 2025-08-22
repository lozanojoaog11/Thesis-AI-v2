import React from 'react';
import { ThesisData } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';

interface ActivationProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onGenerateRandom: () => void; // Add this prop
}

export const Phase0_ActivationStep: React.FC<ActivationProps> = ({ thesisData, updateThesisData, onNext, onGenerateRandom }) => {
  const { excavationDomain, creatorContext, ambitionLevel } = thesisData;
  const isComplete = excavationDomain && creatorContext && ambitionLevel;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-sans text-brand-light font-bold">Leviathan Genesis Protocol</h1>
        <h2 className="text-2xl font-sans text-brand-light">Phase 0: Activation</h2>
        <p className="text-gray-400 font-sans">Define the foundational parameters for the strategic excavation.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="text-xl font-sans text-brand-light block mb-2">1. Domain of Excavation</label>
          <Input 
            type="text" 
            placeholder="e.g., Productivity for asynchronous remote teams in the tech sector" 
            value={excavationDomain}
            onChange={(e) => updateThesisData('excavationDomain', e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-xl font-sans text-brand-light block mb-2">2. Creator Context</label>
          <TextArea 
            placeholder="e.g., Solopreneur with a background in UX/UI, no initial investment capital, with 15 hours per week to dedicate to the project."
            value={creatorContext}
            onChange={(e) => updateThesisData('creatorContext', e.target.value)}
            className="h-24"
          />
        </div>

        <div>
          <label className="text-xl font-sans text-brand-light block mb-2">3. Ambition Level</label>
          <Input 
            type="text" 
            placeholder="e.g., Create a Micro-SaaS B2B that reaches $10k MRR in 24 months."
            value={ambitionLevel}
            onChange={(e) => updateThesisData('ambitionLevel', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <Button onClick={onGenerateRandom} variant="secondary">
          ✨ Surprise Me: Generate a Thesis
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Begin Deconstruction &rarr;
        </Button>
      </div>
    </div>
  );
};
