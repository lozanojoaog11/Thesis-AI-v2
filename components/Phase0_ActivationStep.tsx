import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThesisData } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';

interface ActivationProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onGenerateRandom: () => void;
}

export const Phase0_ActivationStep: React.FC<ActivationProps> = ({ thesisData, updateThesisData, onNext, onGenerateRandom }) => {
  const { t } = useTranslation();
  const { excavationDomain, creatorContext, ambitionLevel } = thesisData;
  const isComplete = excavationDomain && creatorContext && ambitionLevel;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-sans text-brand-light font-bold">{t('phase0.mainTitle')}</h1>
        <h2 className="text-2xl font-sans text-brand-light">{t('phase0.phaseTitle')}</h2>
        <p className="text-gray-400 font-sans">{t('phase0.description')}</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="text-xl font-sans text-brand-light block mb-2">{t('phase0.domainLabel')}</label>
          <Input 
            type="text" 
            placeholder={t('phase0.domainPlaceholder')}
            value={excavationDomain}
            onChange={(e) => updateThesisData('excavationDomain', e.target.value)}
          />
        </div>
        
        <div>
          <label className="text-xl font-sans text-brand-light block mb-2">{t('phase0.contextLabel')}</label>
          <TextArea 
            placeholder={t('phase0.contextPlaceholder')}
            value={creatorContext}
            onChange={(e) => updateThesisData('creatorContext', e.target.value)}
            className="h-24"
          />
        </div>

        <div>
          <label className="text-xl font-sans text-brand-light block mb-2">{t('phase0.ambitionLabel')}</label>
          <Input 
            type="text" 
            placeholder={t('phase0.ambitionPlaceholder')}
            value={ambitionLevel}
            onChange={(e) => updateThesisData('ambitionLevel', e.target.value)}
          />
        </div>
      </div>

      <div className="flex justify-between items-center pt-8">
        <Button onClick={onGenerateRandom} variant="secondary">
          {t('phase0.surpriseButton')}
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          {t('phase0.nextButton')}
        </Button>
      </div>
    </div>
  );
};
