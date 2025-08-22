import React from 'react';
import { ThesisData } from '../types';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface Step2Props {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase1_ConventionsStep: React.FC<Step2Props> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  
  const handleConventionChange = (index: number, field: 'statement' | 'counterHypothesis', value: string) => {
    const newConventions = [...thesisData.conventions];
    newConventions[index] = { ...newConventions[index], [field]: value };
    updateThesisData('conventions', newConventions);
  };

  const addConvention = () => {
    const newConventions = [...thesisData.conventions, { statement: '', counterHypothesis: '' }];
    updateThesisData('conventions', newConventions);
  };

  const removeConvention = (index: number) => {
    const newConventions = thesisData.conventions.filter((_, i) => i !== index);
    updateThesisData('conventions', newConventions);
  };

  // Initialize with one convention if the list is empty
  React.useEffect(() => {
    if (thesisData.conventions.length === 0) {
      addConvention();
    }
  }, []);

  const isComplete = thesisData.conventions.every(c => c.statement && c.counterHypothesis);

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 1.1: Challenge Conventions</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Identify fragile assumptions and formulate radical counter-hypotheses.</p>
      </div>

      <div className="space-y-8">
        {thesisData.conventions.map((convention, index) => (
          <div key={index} className="p-6 border border-brand-gray rounded-lg bg-black/20 space-y-4 relative">
            <h3 className="text-xl font-sans font-bold text-brand-light">Convention #{index + 1}</h3>
            <div>
              <label className="font-mono text-lg text-gray-400">Convention / "Best Practice":</label>
              <Input
                placeholder="e.g., Team collaboration requires constant real-time chat."
                value={convention.statement}
                onChange={(e) => handleConventionChange(index, 'statement', e.target.value)}
              />
            </div>
            <div>
              <label className="font-mono text-lg text-gray-400">Radical Counter-Hypothesis:</label>
              <TextArea
                placeholder="e.g., Teams need less communication, but with higher density and stricter silence protocols."
                value={convention.counterHypothesis}
                onChange={(e) => handleConventionChange(index, 'counterHypothesis', e.target.value)}
                className="h-24"
              />
            </div>
            {thesisData.conventions.length > 1 && (
              <Button onClick={() => removeConvention(index)} variant="danger" size="sm" className="absolute top-4 right-4">
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div>
        <Button onClick={addConvention} variant="secondary">
          + Add Another Convention
        </Button>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Next Step &rarr;
        </Button>
      </div>
    </div>
  );
};
