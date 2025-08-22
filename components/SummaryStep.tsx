import React from 'react';
import { ThesisData } from '../types';
import { Button } from './ui/Button';

interface SummaryProps {
  thesisData: ThesisData;
  onNext: () => void;
  onBack: () => void;
}

const SummaryItem: React.FC<{ title: string; children: React.ReactNode; className?: string }> = ({ title, children, className }) => (
    <div className={`py-6 ${className}`}>
        <h3 className="text-sm font-sans text-gray-400 uppercase tracking-widest mb-3">{title}</h3>
        <div className="text-xl font-mono text-brand-light space-y-2">{children}</div>
    </div>
);

export const SummaryStep: React.FC<SummaryProps> = ({ thesisData, onNext, onBack }) => {
  const { verb, object, context, outcome } = thesisData.jtbd;
  const jtbdSentence = `When ${context}, help me to ${verb} ${object}, so I can ${outcome}.`;
  
  return (
    <div className="animate-fadeIn w-full max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-sans text-brand-light">Your Deconstructed Thesis</h1>
        <p className="text-lg text-gray-400 mt-2">This is the foundation: a first-principles view of the problem, the customer, and the opportunity.</p>
      </div>

      <div className="border border-brand-gray rounded-lg p-8 bg-black/20 divide-y divide-brand-gray">
        <SummaryItem title="Domain & Core Need">
          <p>{thesisData.domain}</p>
          <div className="mt-4 border-l-2 border-brand-blue pl-4 text-lg italic text-gray-300">
             {thesisData.aiFeedback}
          </div>
        </SummaryItem>
        <SummaryItem title="Fundamental Truths">
            <ul className="list-disc list-inside space-y-2">
                {thesisData.truths.map((truth, i) => <li key={i}>{truth}</li>)}
            </ul>
        </SummaryItem>
        <SummaryItem title="Challenged Conventions">
          <ul className="list-disc list-inside space-y-2">
            {thesisData.conventions.map((c, i) => <li key={i}>{c}</li>)}
          </ul>
        </SummaryItem>
        <SummaryItem title="Job To Be Done">
            <p className="text-2xl">{jtbdSentence}</p>
            <div className="pt-4 space-y-3 text-lg">
                <p><strong className="text-gray-400">Functional:</strong> {thesisData.jtbdDimensions.functional}</p>
                <p><strong className="text-gray-400">Emotional:</strong> {thesisData.jtbdDimensions.emotional}</p>
                <p><strong className="text-gray-400">Social:</strong> {thesisData.jtbdDimensions.social}</p>
            </div>
        </SummaryItem>
      </div>
      
      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext}>
          Generate Manifesto &rarr;
        </Button>
      </div>
    </div>
  );
};
