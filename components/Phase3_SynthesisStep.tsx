import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThesisData } from '../types';
import { Button } from './ui/Button';

interface SynthesisProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase3_SynthesisStep: React.FC<SynthesisProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  const { t } = useTranslation();

  const handleSelectHypothesis = (index: number) => {
    const newSelection = [...thesisData.selectedHypotheses];
    const currentIndex = newSelection.indexOf(index);

    if (currentIndex > -1) {
      newSelection.splice(currentIndex, 1); // Deselect
    } else {
      if (newSelection.length < 3) {
        newSelection.push(index); // Select
      }
    }
    updateThesisData('selectedHypotheses', newSelection);
  };

  const isComplete = thesisData.selectedHypotheses.length === 3;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">{t('Phase 3: Synthesis & Selection')}</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">{t('Review your generated hypotheses and select the 3 most promising candidates to model as businesses.')}</p>
      </div>

      <div className="space-y-4">
        {thesisData.ideationHypotheses.map((hyp, index) => {
          const isSelected = thesisData.selectedHypotheses.includes(index);
          return (
            <div 
              key={index} 
              onClick={() => handleSelectHypothesis(index)}
              className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${isSelected ? 'border-brand-blue bg-blue-900/20' : 'border-brand-gray bg-black/20 hover:bg-brand-gray/20'}`}
            >
              <p className="text-brand-light font-mono">
                <span className="font-bold text-brand-blue">{hyp.source}:</span> {hyp.idea}
              </p>
            </div>
          );
        })}
      </div>
      
      <div className="text-center text-gray-400 font-mono">
        <p>{t('Selected {{count}} of 3', { count: thesisData.selectedHypotheses.length })}</p>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          {t('phase1_conventions.backButton')}
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          {t('Model Businesses →')}
        </Button>
      </div>
    </div>
  );
};
