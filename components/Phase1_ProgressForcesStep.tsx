import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThesisData } from '../types';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface ProgressForcesProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase1_ProgressForcesStep: React.FC<ProgressForcesProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  const { t } = useTranslation();

  const handleForceChange = (field: keyof ThesisData['progressForces'], value: string) => {
    updateThesisData('progressForces', {
      ...thesisData.progressForces,
      [field]: value
    });
  };

  const { push, pull, anxiety, habit } = thesisData.progressForces;
  const isComplete = push && pull && anxiety && habit;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">{t('phase1_progress.phaseTitle')}</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">{t('phase1_progress.phaseDescription')}</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="font-mono text-lg text-gray-400">{t('phase1_progress.pushLabel')}</label>
          <p className="text-gray-400 font-sans mb-2">{t('phase1_progress.pushDescription')}</p>
          <TextArea placeholder={t('phase1_progress.pushPlaceholder')} value={push} onChange={e => handleForceChange('push', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">{t('phase1_progress.pullLabel')}</label>
          <p className="text-gray-400 font-sans mb-2">{t('phase1_progress.pullDescription')}</p>
          <TextArea placeholder={t('phase1_progress.pullPlaceholder')} value={pull} onChange={e => handleForceChange('pull', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">{t('phase1_progress.anxietyLabel')}</label>
          <p className="text-gray-400 font-sans mb-2">{t('phase1_progress.anxietyDescription')}</p>
          <TextArea placeholder={t('phase1_progress.anxietyPlaceholder')} value={anxiety} onChange={e => handleForceChange('anxiety', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">{t('phase1_progress.habitLabel')}</label>
          <p className="text-gray-400 font-sans mb-2">{t('phase1_progress.habitDescription')}</p>
          <TextArea placeholder={t('phase1_progress.habitPlaceholder')} value={habit} onChange={e => handleForceChange('habit', e.target.value)} className="h-24" />
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          {t('phase1_conventions.backButton')}
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          {t('phase1_progress.nextButton')}
        </Button>
      </div>
    </div>
  );
};
