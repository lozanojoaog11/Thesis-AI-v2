import React from 'react';
import { ThesisData } from '../types';
import { Button } from './ui/Button';

interface SummaryProps {
  thesisData: ThesisData;
  onNext: () => void;
  onBack: () => void;
}

const SummaryItem: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`py-6 ${className}`}>
        <h3 className="text-sm font-sans text-gray-400 uppercase tracking-widest mb-3">{title}</h3>
        <div className="text-xl font-mono text-brand-light space-y-2">{children}</div>
    </div>
);

export const SummaryStep: React.FC<SummaryProps> = ({ thesisData, onNext, onBack }) => {
  const { finalThesis, businessModels, selectedHypotheses, ideationHypotheses } = thesisData;
  
  if (finalThesis.selectedModelIndex === -1) {
    return <div>Loading thesis...</div>; // Or some error state
  }

  const selectedModel = businessModels[finalThesis.selectedModelIndex];
  const selectedHypothesis = ideationHypotheses[selectedHypotheses[finalThesis.selectedModelIndex]];

  // This is a placeholder for the full product manifesto generation logic
  // For now, we'll just display the key selected items.
  const thesisStatement = `The market believes in "${thesisData.conventions[0]?.statement}", but the truth is that [Radical Counter-Hypothesis], which we will materialize through a [Solution Type] that leverages [Unfair Advantage].`;

  return (
    <div className="animate-fadeIn w-full max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-sans text-brand-light">Your Final Thesis & Product Manifesto</h1>
        <p className="text-lg text-gray-400 mt-2">This is the culmination of your strategic analysis. Review the final blueprint before generating the coding prompt.</p>
      </div>

      <div className="border border-brand-gray rounded-lg p-8 bg-black/20 divide-y divide-brand-gray">
        <SummaryItem title="Selected Hypothesis">
          <p className="italic">"{selectedHypothesis.idea}"</p>
        </SummaryItem>
        <SummaryItem title="Justification">
          <p>{finalThesis.justification}</p>
        </SummaryItem>
        <SummaryItem title="The Thesis Statement (Placeholder)">
          <p className="text-2xl">{thesisStatement}</p>
        </SummaryItem>
        <SummaryItem title="Core Blueprint">
            <div className="pt-4 space-y-3 text-lg">
                <p><strong className="text-gray-400">UVP:</strong> {selectedModel.leanCanvas.uniqueValueProposition}</p>
                <p><strong className="text-gray-400">Unfair Advantage:</strong> {selectedModel.leanCanvas.unfairAdvantage}</p>
                <p><strong className="text-gray-400">Flywheel:</strong> {selectedModel.flywheel}</p>
            </div>
        </SummaryItem>
      </div>
      
      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext}>
          Generate Final Prompt &rarr;
        </Button>
      </div>
    </div>
  );
};
