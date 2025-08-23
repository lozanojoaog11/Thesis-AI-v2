import React from 'react';
import { useTranslation } from 'react-i18next';
import { ThesisData } from '../types';
import { Button } from './ui/Button';

interface SummaryProps {
  thesisData: ThesisData;
  error: string | null;
  onNext: () => void;
  onBack: () => void;
  onReset: () => void;
}

const SummaryItem: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`py-6 ${className}`}>
        <h3 className="text-sm font-sans text-gray-400 uppercase tracking-widest mb-3">{title}</h3>
        <div className="text-xl font-mono text-brand-light space-y-2">{children}</div>
    </div>
);

export const SummaryStep: React.FC<SummaryProps> = ({ thesisData, error, onNext, onBack, onReset }) => {
  const { t } = useTranslation();
  const { finalThesis, businessModels, selectedHypotheses, ideationHypotheses } = thesisData;

  if (error) {
    return (
      <div className="animate-fadeIn w-full max-w-2xl text-center flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-bold text-red-400">{t('summary.failureText')}</h2>
        <p className="text-sm text-gray-500 bg-black/20 p-4 rounded-md">{error}</p>
        <Button onClick={onReset} variant="primary">
          {t('summary.retryButton')}
        </Button>
      </div>
    );
  }
  
  if (finalThesis.selectedModelIndex === -1 || !businessModels || businessModels.length === 0) {
    return (
       <div className="animate-fadeIn w-full max-w-2xl text-center flex flex-col items-center justify-center space-y-6">
        <h2 className="text-2xl font-bold text-yellow-400">{t('summary.loadingText')}</h2>
        <Button onClick={onReset} variant="secondary">
           {t('summary.retryButton')}
        </Button>
      </div>
    );
  }

  const selectedModel = businessModels[finalThesis.selectedModelIndex];
  const selectedHypothesisIndex = selectedHypotheses[finalThesis.selectedModelIndex];
  const selectedHypothesis = selectedHypothesisIndex !== undefined ? ideationHypotheses[selectedHypothesisIndex] : undefined;

  // Defensive checks
  if (!selectedModel) {
    return <div>{t('summary.errorText')}</div>;
  }

  return (
    <div className="animate-fadeIn w-full max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-sans text-brand-light">{t('summary.title')}</h1>
        <p className="text-lg text-gray-400 mt-2">{t('summary.description')}</p>
      </div>

      <div className="border border-brand-gray rounded-lg p-8 bg-black/20 divide-y divide-brand-gray">
        <SummaryItem title={t('summary.selectedHypothesis')}>
          <p className="italic">"{selectedHypothesis?.idea || 'N/A'}"</p>
        </SummaryItem>
        <SummaryItem title={t('summary.justification')}>
          <p>{finalThesis.justification}</p>
        </SummaryItem>
        <SummaryItem title={t('summary.thesisStatement')}>
          <p className="text-2xl">{finalThesis.productManifesto.thesisStatement || 'N/A'}</p>
        </SummaryItem>
        <SummaryItem title={t('summary.coreBlueprint')}>
            <div className="pt-4 space-y-3 text-lg">
                <p><strong className="text-gray-400">{t('summary.uniqueValueProp')}:</strong> {selectedModel?.leanCanvas?.uniqueValueProposition || 'N/A'}</p>
                <p><strong className="text-gray-400">{t('summary.unfairAdvantage')}:</strong> {selectedModel?.leanCanvas?.unfairAdvantage || 'N/A'}</p>
                <p><strong className="text-gray-400">{t('summary.flywheel')}:</strong> {selectedModel?.flywheel || 'N/A'}</p>
            </div>
        </SummaryItem>
      </div>
      
      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          {t('summary.backButton')}
        </Button>
        <Button onClick={onNext}>
          {t('summary.generateButton')}
        </Button>
      </div>
    </div>
  );
};
