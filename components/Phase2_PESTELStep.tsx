import React from 'react';
import { ThesisData } from '../types';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface PESTELProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase2_PESTELStep: React.FC<PESTELProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {

  const handleAnalysisChange = (field: keyof ThesisData['pestelAnalysis'], value: string) => {
    updateThesisData('pestelAnalysis', {
      ...thesisData.pestelAnalysis,
      [field]: value
    });
  };

  const { political, economic, social, technological, environmental, legal } = thesisData.pestelAnalysis;
  const isComplete = political && economic && social && technological && environmental && legal;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 2: Ecosystem Analysis</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Map the macro currents and external forces shaping your domain.</p>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-sans text-brand-light font-bold">PESTEL Analysis</h3>
        {(Object.keys(thesisData.pestelAnalysis) as Array<keyof ThesisData['pestelAnalysis']>).map((key) => (
          <div key={key}>
            <label className="font-mono text-lg text-gray-400 capitalize">{key}:</label>
            <p className="text-gray-400 font-sans mb-2 text-sm">Identify the key trends for this factor.</p>
            <TextArea 
              placeholder={`e.g., for Technological: Rise of generative AI, increasing privacy concerns...`}
              value={thesisData.pestelAnalysis[key]} 
              onChange={e => handleAnalysisChange(key, e.target.value)} 
              className="h-24" 
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Analyze Competitive Forces &rarr;
        </Button>
      </div>
    </div>
  );
};
