import React from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  
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
        <h2 className="text-3xl font-sans text-brand-light font-bold">{t('phase1_conventions.phaseTitle')}</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">{t('phase1_conventions.phaseDescription')}</p>
      </div>

      <div className="space-y-8">
        {thesisData.conventions.map((convention, index) => (
          <div key={index} className="p-6 border border-brand-gray rounded-lg bg-black/20 space-y-4 relative">
            <h3 className="text-xl font-sans font-bold text-brand-light">{t('phase1_conventions.blockTitle', { index: index + 1 })}</h3>
            <div>
              <label className="font-mono text-lg text-gray-400">{t('phase1_conventions.label1')}</label>
              <Input
                placeholder={t('phase1_conventions.placeholder1')}
                value={convention.statement}
                onChange={(e) => handleConventionChange(index, 'statement', e.target.value)}
              />
            </div>
            <div>
              <label className="font-mono text-lg text-gray-400">{t('phase1_conventions.label2')}</label>
              <TextArea
                placeholder={t('phase1_conventions.placeholder2')}
                value={convention.counterHypothesis}
                onChange={(e) => handleConventionChange(index, 'counterHypothesis', e.target.value)}
                className="h-24"
              />
            </div>
            {thesisData.conventions.length > 1 && (
              <Button onClick={() => removeConvention(index)} variant="danger" size="sm" className="absolute top-4 right-4">
                {t('phase1_conventions.removeButton')}
              </Button>
            )}
          </div>
        ))}
      </div>
      
      <div>
        <Button onClick={addConvention} variant="secondary">
          {t('phase1_conventions.addButton')}
        </Button>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          {t('phase1_conventions.backButton')}
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          {t('phase1_conventions.nextButton')}
        </Button>
      </div>
    </div>
  );
};
