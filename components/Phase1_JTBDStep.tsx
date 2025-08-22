import React from 'react';
import { ThesisData } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';

interface Step3Props {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase1_JTBDStep: React.FC<Step3Props> = ({ thesisData, updateThesisData, onNext, onBack }) => {

  const handleJtbdChange = (field: keyof ThesisData['jtbd'], value: string) => {
    updateThesisData('jtbd', {
      ...thesisData.jtbd,
      [field]: value
    });
  };
  
  const handleDimensionChange = (field: keyof ThesisData['jtbdDimensions'], value: string) => {
    updateThesisData('jtbdDimensions', {
      ...thesisData.jtbdDimensions,
      [field]: value
    });
  };

  const { verb, object, context, outcome } = thesisData.jtbd;
  const { functional, emotional, social } = thesisData.jtbdDimensions;
  const isJtbdComplete = verb && object && context && outcome;
  const areDimensionsComplete = functional && emotional && social;
  
  const jtbdSentence = `When ${context}, help me to ${verb} ${object}, so I can ${outcome}.`;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 1.2: Define the "Job To Be Done"</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Articulate the real job your customer is hiring your product to do.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <div><label className="font-mono text-lg text-gray-400">VERB:</label><Input placeholder="e.g., organize" value={verb} onChange={e => handleJtbdChange('verb', e.target.value)} /></div>
            <div><label className="font-mono text-lg text-gray-400">OBJECT:</label><Input placeholder="e.g., client feedback" value={object} onChange={e => handleJtbdChange('object', e.target.value)} /></div>
            <div><label className="font-mono text-lg text-gray-400">CONTEXT:</label><Input placeholder="e.g., launching a new feature" value={context} onChange={e => handleJtbdChange('context', e.target.value)} /></div>
            <div><label className="font-mono text-lg text-gray-400">OUTCOME:</label><Input placeholder="e.g., ship updates faster" value={outcome} onChange={e => handleJtbdChange('outcome', e.target.value)} /></div>
        </div>
      </div>
      
      {isJtbdComplete && (
        <div className="animate-fadeIn space-y-12">
            <div>
                <h3 className="text-xl font-sans font-bold text-brand-light border-b border-brand-gray pb-2 mb-4">Your Job To Be Done</h3>
                <div className="border-l-4 border-brand-blue p-4 bg-brand-gray/20">
                    <p className="text-2xl font-mono text-brand-light">{jtbdSentence}</p>
                </div>
            </div>
            <div>
                <h3 className="text-xl font-sans font-bold text-brand-light mb-4">What are the full dimensions of this job?</h3>
                <div className="space-y-6">
                    <div>
                        <label className="font-mono text-lg text-gray-400">FUNCTIONAL:</label>
                        <TextArea placeholder="What are the measurable, objective results?" value={functional} onChange={e => handleDimensionChange('functional', e.target.value)} className="h-24" />
                    </div>
                    <div>
                        <label className="font-mono text-lg text-gray-400">EMOTIONAL:</label>
                        <TextArea placeholder="How do they want to feel?" value={emotional} onChange={e => handleDimensionChange('emotional', e.target.value)} className="h-24" />
                    </div>
                    <div>
                        <label className="font-mono text-lg text-gray-400">SOCIAL:</label>
                        <TextArea placeholder="How do they want to be perceived by others?" value={social} onChange={e => handleDimensionChange('social', e.target.value)} className="h-24" />
                    </div>
                </div>
            </div>
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isJtbdComplete || !areDimensionsComplete}>
          View Thesis Summary &rarr;
        </Button>
      </div>
    </div>
  );
};
