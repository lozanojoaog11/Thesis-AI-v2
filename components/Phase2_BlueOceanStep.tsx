import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThesisData } from '../types';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface BlueOceanProps {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

export const Phase2_BlueOceanStep: React.FC<BlueOceanProps> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  const { t } = useTranslation();

  const handleStrategyChange = (field: keyof ThesisData['blueOceanStrategy'], value: string) => {
    updateThesisData('blueOceanStrategy', {
      ...thesisData.blueOceanStrategy,
      [field]: value.split('\n').filter(line => line.trim() !== '')
    });
  };

  const { eliminate, reduce, raise, create } = thesisData.blueOceanStrategy;
  const isComplete = eliminate.length > 0 && reduce.length > 0 && raise.length > 0 && create.length > 0;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">{t('Phase 2: Blue Ocean Strategy')}</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">{t('Reconfigure value to create uncontested market space.')}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <label className="font-mono text-lg text-red-400">{t('ELIMINATE:')}</label>
          <p className="text-gray-400 font-sans mb-2 text-sm">{t('Which factors that the industry takes for granted should be eliminated?')}</p>
          <TextArea placeholder={t('One factor per line...')} value={eliminate.join('\n')} onChange={e => handleStrategyChange('eliminate', e.target.value)} className="h-32" />
        </div>
        <div>
          <label className="font-mono text-lg text-yellow-400">{t('REDUCE:')}</label>
          <p className="text-gray-400 font-sans mb-2 text-sm">{t("Which factors should be reduced well below the industry's standard?")}</p>
          <TextArea placeholder={t('One factor per line...')} value={reduce.join('\n')} onChange={e => handleStrategyChange('reduce', e.target.value)} className="h-32" />
        </div>
        <div>
          <label className="font-mono text-lg text-green-400">{t('RAISE:')}</label>
          <p className="text-gray-400 font-sans mb-2 text-sm">{t("Which factors should be raised well above the industry's standard?")}</p>
          <TextArea placeholder={t('One factor per line...')} value={raise.join('\n')} onChange={e => handleStrategyChange('raise', e.target.value)} className="h-32" />
        </div>
        <div>
          <label className="font-mono text-lg text-blue-400">{t('CREATE:')}</label>
          <p className="text-gray-400 font-sans mb-2 text-sm">{t('Which factors should be created that the industry has never offered?')}</p>
          <TextArea placeholder={t('One factor per line...')} value={create.join('\n')} onChange={e => handleStrategyChange('create', e.target.value)} className="h-32" />
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          {t('phase1_conventions.backButton')}
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          {t('Begin Ideation →')}
        </Button>
      </div>
    </div>
  );
};
