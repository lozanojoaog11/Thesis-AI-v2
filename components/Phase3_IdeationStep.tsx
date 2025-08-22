import React, { useState } from 'react';
import { ThesisData } from '../types';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface IdeationProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

type IdeationMode = 'SCAMPER' | 'ANALOGY';

export const Phase3_IdeationStep: React.FC<IdeationProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  const [mode, setMode] = useState<IdeationMode>('SCAMPER');
  const [currentIdea, setCurrentIdea] = useState('');

  const addHypothesis = (source: string) => {
    if (!currentIdea.trim()) return;
    const newHypothesis = { source, idea: currentIdea };
    updateThesisData('ideationHypotheses', [...thesisData.ideationHypotheses, newHypothesis]);
    setCurrentIdea('');
  };

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 3: Expansive Ideation</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Generate a massive, divergent volume of solution hypotheses. Suspend judgment.</p>
      </div>

      <div className="flex justify-center border border-brand-gray rounded-lg p-2 space-x-2">
        <Button onClick={() => setMode('SCAMPER')} variant={mode === 'SCAMPER' ? 'primary' : 'secondary'}>SCAMPER</Button>
        <Button onClick={() => setMode('ANALOGY')} variant={mode === 'ANALOGY' ? 'primary' : 'secondary'}>Extreme Analogies</Button>
      </div>

      <div className="p-6 border border-brand-gray rounded-lg bg-black/20">
        {mode === 'SCAMPER' && (
          <div>
            <h3 className="text-xl font-sans font-bold text-brand-light mb-2">SCAMPER Brainstorming</h3>
            <p className="text-gray-400 font-sans mb-4">Mutate the dominant market solution. What if you Substitute, Combine, Adapt, Modify, Put to another use, Eliminate, or Reverse it?</p>
            <TextArea placeholder="Describe a new solution hypothesis based on a SCAMPER prompt..." value={currentIdea} onChange={e => setCurrentIdea(e.target.value)} className="h-28" />
            <Button onClick={() => addHypothesis('SCAMPER')} className="mt-4">Add SCAMPER Hypothesis</Button>
          </div>
        )}
        {mode === 'ANALOGY' && (
          <div>
            <h3 className="text-xl font-sans font-bold text-brand-light mb-2">Extreme Analogies</h3>
            <p className="text-gray-400 font-sans mb-4">How would this problem be solved in Military Strategy? High-End Cuisine? Space Exploration?</p>
            <TextArea placeholder="Describe a new solution hypothesis based on an extreme analogy..." value={currentIdea} onChange={e => setCurrentIdea(e.target.value)} className="h-28" />
            <Button onClick={() => addHypothesis('ANALOGY')} className="mt-4">Add Analogy Hypothesis</Button>
          </div>
        )}
      </div>

      {thesisData.ideationHypotheses.length > 0 && (
        <div>
          <h3 className="text-xl font-sans font-bold text-brand-light mb-4">Generated Hypotheses ({thesisData.ideationHypotheses.length})</h3>
          <div className="space-y-2 max-h-48 overflow-y-auto p-4 bg-brand-dark rounded">
            {thesisData.ideationHypotheses.map((hyp, index) => (
              <div key={index} className="text-brand-light font-mono p-2 border-b border-brand-gray">
                <span className="font-bold text-brand-blue">{hyp.source}:</span> {hyp.idea}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={thesisData.ideationHypotheses.length < 3}>
          Synthesize Ideas ({thesisData.ideationHypotheses.length}/3 min) &rarr;
        </Button>
      </div>
    </div>
  );
};
