import React from 'react';
import { ThesisData } from '../types';
import { TextArea } from './ui/TextArea';
import { Button } from './ui/Button';

interface Step2Props {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
  onBack: () => void;
}

const challengeTemplates = [
    (convention: string) => `What if the exact opposite of "${convention}" were true?`,
    (convention: string) => `What fundamental secret about this market might the belief "${convention}" be hiding?`,
    (convention: string) => `What would happen if you completely eliminated "${convention}" instead of competing on it?`,
];

export const Phase1_ConventionsStep: React.FC<Step2Props> = ({ thesisData, updateThesisData, onNext, onBack }) => {
  
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    updateThesisData('conventions', lines);
  };

  const hasConventions = thesisData.conventions && thesisData.conventions.length > 0;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div>
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 1.1: Challenge Conventions</h2>
         <p className="text-gray-400 font-sans mt-2 mb-8">Identify the fragile assumptions that everyone else accepts as truth.</p>
        <label className="text-2xl font-sans text-brand-light block mb-2">
          List 3-5 beliefs or 'best practices' in your domain.
        </label>
        <p className="text-gray-400 font-sans mb-4">One belief per line. These are the conventions we will challenge.</p>
        <TextArea 
          placeholder={`e.g., All project management tools must have a kanban board.\nTeam collaboration requires constant real-time chat.\nMore features equal a better product.`}
          value={thesisData.conventions.join('\n')}
          onChange={handleTextAreaChange}
        />
      </div>

      {hasConventions && (
        <div className="space-y-8 animate-fadeIn">
            <h3 className="text-xl font-sans font-bold text-brand-light border-b border-brand-gray pb-2">Challenge Cards</h3>
            {thesisData.conventions.map((convention, index) => (
                <div key={index} className="p-6 border border-brand-gray rounded-lg bg-black/20 space-y-4">
                    <p className="text-lg font-mono text-gray-400 italic">Convention: "{convention}"</p>
                    <ul className="list-disc list-inside space-y-3 pl-2">
                        {challengeTemplates.map((template, i) => (
                            <li key={i} className="text-brand-light font-mono text-lg">{template(convention)}</li>
                        ))}
                    </ul>
                </div>
            ))}
        </div>
      )}

      <div className="flex justify-between pt-8">
        <Button onClick={onBack} variant="secondary">
          &larr; Back
        </Button>
        <Button onClick={onNext} disabled={!hasConventions}>
          Next Step &rarr;
        </Button>
      </div>
    </div>
  );
};
