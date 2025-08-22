import React from 'react';
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
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 1.2: The Four Forces of Progress</h2>
        <p className="text-gray-400 font-sans mt-2 mb-8">Analyze the physics of the customer's decision-making process.</p>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="font-mono text-lg text-gray-400">PUSH of the Situation:</label>
          <p className="text-gray-400 font-sans mb-2">What are the pains, frustrations, and workarounds with the current solution that push them to seek something new?</p>
          <TextArea placeholder="e.g., I keep losing track of feedback shared on Slack channels, causing delays..." value={push} onChange={e => handleForceChange('push', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">PULL of the New Solution:</label>
          <p className="text-gray-400 font-sans mb-2">What is the promise and vision of a 'new me' that the new solution attracts them with?</p>
          <TextArea placeholder="e.g., A future where all feedback is centralized, actionable, and I never miss a critical insight." value={pull} onChange={e => handleForceChange('pull', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">ANXIETY of the New Solution:</label>
          <p className="text-gray-400 font-sans mb-2">What fears, uncertainties, and objections does the idea of adopting the new solution generate?</p>
          <TextArea placeholder="e.g., What if it's too complicated to set up? Will my team actually use it?" value={anxiety} onChange={e => handleForceChange('anxiety', e.target.value)} className="h-24" />
        </div>
        <div>
          <label className="font-mono text-lg text-gray-400">HABIT of the Present:</label>
          <p className="text-gray-400 font-sans mb-2">What is the gravitational pull of inertia and attachment to the current solution, even if it's flawed?</p>
          <TextArea placeholder="e.g., It's just easier to quickly send a Slack message, even if it gets lost later." value={habit} onChange={e => handleForceChange('habit', e.target.value)} className="h-24" />
        </div>
      </div>

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!isComplete}>
          Begin Ecosystem Analysis &rarr;
        </Button>
      </div>
    </div>
  );
};
