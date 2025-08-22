import React from 'react';
import { ThesisData } from '../types';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface PorterProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase2_PorterStep: React.FC<PorterProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {

  const handleAnalysisChange = (field: keyof ThesisData['porterFiveForces'], value: string) => {
    updateThesisData('porterFiveForces', {
      ...thesisData.porterFiveForces,
      [field]: value
    });
  };

  const { newEntrants, buyersPower, suppliersPower, substitutes, rivalry } = thesisData.porterFiveForces;
  const isComplete = newEntrants && buyersPower && suppliersPower && substitutes && rivalry;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 2: Competitive Forces</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Analyze the power dynamics of the competitive arena.</p>
      </div>
      
      <div className="space-y-6">
        <h3 className="text-2xl font-sans text-brand-light font-bold">Porter's Five Forces</h3>
        
        <div>
          <label className="font-mono text-lg text-gray-400">Threat of New Entrants:</label>
          <TextArea placeholder="What are the real barriers to entry (e.g., capital, brand, network effects)?" value={newEntrants} onChange={e => handleAnalysisChange('newEntrants', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">Bargaining Power of Buyers:</label>
          <TextArea placeholder="How price sensitive are customers? What are their switching costs?" value={buyersPower} onChange={e => handleAnalysisChange('buyersPower', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">Bargaining Power of Suppliers:</label>
          <TextArea placeholder="Who are the key suppliers (e.g., cloud platforms, APIs, talent) and what is their leverage?" value={suppliersPower} onChange={e => handleAnalysisChange('suppliersPower', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">Threat of Substitute Products:</label>
          <TextArea placeholder="What are other ways (even from other markets) to get the customer's Job Done?" value={substitutes} onChange={e => handleAnalysisChange('substitutes', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">Rivalry Among Existing Competitors:</label>
          <TextArea placeholder="Is the competition based on price, or on quality, innovation, brand?" value={rivalry} onChange={e => handleAnalysisChange('rivalry', e.target.value)} className="h-24" />
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Find the Blue Ocean &rarr;
        </Button>
      </div>
    </div>
  );
};
