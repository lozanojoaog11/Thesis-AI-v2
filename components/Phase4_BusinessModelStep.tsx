import React, { useState } from 'react';
import { ThesisData } from '../types';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { TextArea } from './ui/TextArea';

interface BusinessModelProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const LeanCanvasEditor: React.FC<{ model: any, onChange: (field: string, value: string) => void }> = ({ model, onChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(model.leanCanvas) as Array<keyof typeof model.leanCanvas>).map(key => (
            <div key={key}>
                <label className="font-mono text-sm text-gray-400 capitalize">{String(key).replace(/([A-Z])/g, ' $1')}:</label>
                <TextArea value={model.leanCanvas[key]} onChange={e => onChange(key, e.target.value)} className="h-20 text-sm" />
            </div>
        ))}
    </div>
);

const HookModelEditor: React.FC<{ model: any, onChange: (field: string, value: string) => void }> = ({ model, onChange }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {(Object.keys(model.hookModel) as Array<keyof typeof model.hookModel>).map(key => (
            <div key={key}>
                <label className="font-mono text-sm text-gray-400 capitalize">{String(key).replace(/([A-Z])/g, ' $1')}:</label>
                <TextArea value={model.hookModel[key]} onChange={e => onChange(key, e.target.value)} className="h-20 text-sm" />
            </div>
        ))}
    </div>
);

export const Phase4_BusinessModelStep: React.FC<BusinessModelProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  // Initialize models if they don't exist
  React.useEffect(() => {
    if (thesisData.businessModels.length !== thesisData.selectedHypotheses.length) {
      const newBusinessModels = thesisData.selectedHypotheses.map(() => ({
        leanCanvas: { problem: '', customerSegments: '', uniqueValueProposition: '', solution: '', unfairAdvantage: '', revenueStreams: '', costStructure: '', keyMetrics: '', channels: '' },
        hookModel: { trigger: '', action: '', variableReward: '', investment: '' },
        flywheel: ''
      }));
      updateThesisData('businessModels', newBusinessModels);
    }
  }, [thesisData.selectedHypotheses, thesisData.businessModels, updateThesisData]);

  const handleModelChange = (index: number, modelType: 'leanCanvas' | 'hookModel', field: string, value: string) => {
    const newBusinessModels = [...thesisData.businessModels];
    (newBusinessModels[index][modelType] as any)[field] = value;
    updateThesisData('businessModels', newBusinessModels);
  };
  
  const handleFlywheelChange = (index: number, value: string) => {
    const newBusinessModels = [...thesisData.businessModels];
    newBusinessModels[index].flywheel = value;
    updateThesisData('businessModels', newBusinessModels);
  };

  const selectedHypothesesDetails = thesisData.selectedHypotheses.map(i => thesisData.ideationHypotheses[i]);
  const isComplete = thesisData.businessModels.every(bm => 
    Object.values(bm.leanCanvas).every(v => v) && 
    Object.values(bm.hookModel).every(v => v) && 
    bm.flywheel
  );

  return (
    <div className="animate-fadeIn w-full max-w-4xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 4: Business Modeling</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Transform your top 3 hypotheses into concrete, testable business models.</p>
      </div>

      <div className="flex space-x-2 border-b-2 border-brand-gray">
        {selectedHypothesesDetails.map((hyp, index) => (
          <button key={index} onClick={() => setActiveIndex(index)} className={`py-2 px-4 font-mono transition-colors ${activeIndex === index ? 'bg-brand-blue text-white rounded-t-lg' : 'text-gray-400 hover:text-white'}`}>
            Hypothesis #{index + 1}
          </button>
        ))}
      </div>

      {thesisData.businessModels[activeIndex] && (
        <div className="space-y-8 p-6 bg-black/20 rounded-b-lg">
            <p className="text-lg font-mono text-brand-light italic">"{selectedHypothesesDetails[activeIndex]?.idea}"</p>
            
            <h3 className="text-xl font-sans font-bold text-brand-light border-b border-brand-gray pb-2">Lean Canvas</h3>
            <LeanCanvasEditor model={thesisData.businessModels[activeIndex]} onChange={(field, value) => handleModelChange(activeIndex, 'leanCanvas', field, value)} />

            <h3 className="text-xl font-sans font-bold text-brand-light border-b border-brand-gray pb-2">Hook Model</h3>
            <HookModelEditor model={thesisData.businessModels[activeIndex]} onChange={(field, value) => handleModelChange(activeIndex, 'hookModel', field, value)} />

            <h3 className="text-xl font-sans font-bold text-brand-light border-b border-brand-gray pb-2">Flywheel</h3>
            <TextArea placeholder="Describe the self-reinforcing growth loop..." value={thesisData.businessModels[activeIndex].flywheel} onChange={e => handleFlywheelChange(activeIndex, e.target.value)} className="h-28" />
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Proceed to Final Selection &rarr;
        </Button>
      </div>
    </div>
  );
};
