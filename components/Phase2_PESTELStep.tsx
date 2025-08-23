import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        <h2 className="text-3xl font-sans text-brand-light font-bold">{t('phase2_pestel.title')}</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">{t('phase2_pestel.description')}</p>
      </div>
      
      <div className="space-y-6">
        {(Object.keys(thesisData.pestelAnalysis) as Array<keyof ThesisData['pestelAnalysis']>).map((key) => (
          <div key={key}>
            <label className="font-mono text-lg text-gray-400">{t(`phase2_pestel.${key}Label`)}</label>
            <TextArea 
              placeholder={t(`phase2_pestel.${key}Placeholder`)}
              value={thesisData.pestelAnalysis[key]} 
              onChange={e => handleAnalysisChange(key, e.target.value)} 
              className="h-24" 
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          {t('phase1_conventions.backButton')}
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          {t('phase1_principles.nextButton')}
        </Button>
      </div>
    </div>
  );
};
