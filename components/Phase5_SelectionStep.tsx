import React from 'react';
import { ThesisData } from '../types';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';

interface SelectionProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase5_SelectionStep: React.FC<SelectionProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {

  const handleSelectModel = (index: number) => {
    updateThesisData('finalThesis', {
      ...thesisData.finalThesis,
      selectedModelIndex: index
    });
  };

  const handleJustificationChange = (value: string) => {
    updateThesisData('finalThesis', {
      ...thesisData.finalThesis,
      justification: value
    });
  };

  const { selectedModelIndex, justification } = thesisData.finalThesis;
  const isComplete = selectedModelIndex !== -1 && justification;

  return (
    <div className="animate-fadeIn w-full max-w-4xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 5: Final Selection</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">The time for divergence is over. Converge on the single strongest business model and justify your choice.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {thesisData.businessModels.map((model, index) => {
          const hypothesis = thesisData.ideationHypotheses[thesisData.selectedHypotheses[index]];
          const isSelected = selectedModelIndex === index;
          return (
            <div 
              key={index}
              onClick={() => handleSelectModel(index)}
              className={`p-6 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'border-brand-blue bg-blue-900/20' : 'border-brand-gray bg-black/20 hover:bg-brand-gray/20'}`}
            >
              <h3 className="font-bold text-lg text-brand-light mb-2">Hypothesis #{index + 1}</h3>
              <p className="text-sm italic text-gray-300 mb-4">"{hypothesis.idea}"</p>
              <h4 className="font-mono text-sm text-gray-400">UVP:</h4>
              <p className="text-sm mb-2">{model.leanCanvas.uniqueValueProposition}</p>
              <h4 className="font-mono text-sm text-gray-400">Unfair Advantage:</h4>
              <p className="text-sm">{model.leanCanvas.unfairAdvantage}</p>
            </div>
          );
        })}
      </div>
      
      {selectedModelIndex !== -1 && (
        <div className="animate-fadeIn space-y-4">
          <label className="text-xl font-sans text-brand-light block">Justify your selection:</label>
          <TextArea 
            placeholder="Synthesize your reasoning based on all previous phases. Why is this the winning model?"
            value={justification}
            onChange={(e) => handleJustificationChange(e.target.value)}
            className="h-32"
          />
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          View Final Thesis &rarr;
        </Button>
      </div>
    </div>
  );
};
