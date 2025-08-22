import React, { useState } from 'react';
import { ThesisData } from '../types';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { TextArea } from './ui/TextArea';
import { getSocraticFeedback } from '../services/geminiService';

interface Step1Props {
  thesisData: ThesisData;
  updateThesisData: <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => void;
  onNext: () => void;
}

const LoadingSpinner: React.FC = () => (
    <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-brand-light animate-pulse" style={{ animationDelay: '0s' }}></div>
        <div className="w-2 h-2 rounded-full bg-brand-light animate-pulse" style={{ animationDelay: '0.2s' }}></div>
        <div className="w-2 h-2 rounded-full bg-brand-light animate-pulse" style={{ animationDelay: '0.4s' }}></div>
        <span className="text-lg text-gray-400 font-mono">Thinking...</span>
    </div>
);

export const Phase1_PrinciplesStep: React.FC<Step1Props> = ({ thesisData, updateThesisData, onNext }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFeedback = async () => {
    if (!thesisData.humanNeed) {
      setError("Please articulate the human need first.");
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const feedback = await getSocraticFeedback(thesisData.humanNeed);
      updateThesisData('aiFeedback', feedback);
    } catch (e) {
      setError("Failed to get feedback. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTruthsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const lines = e.target.value.split('\n').filter(line => line.trim() !== '');
    updateThesisData('truths', lines);
  };

  const isComplete = thesisData.domain && thesisData.aiFeedback && thesisData.truths.length > 0;

  return (
    <div className="animate-fadeIn w-full max-w-3xl space-y-12">
      <div className="space-y-4">
        <h2 className="text-3xl font-sans text-brand-light font-bold">Phase 1: Deconstruction</h2>
        <p className="text-gray-400 font-sans">We begin with first principles. Deconstruct the domain to its irreducible atoms.</p>
      </div>
      
      <div className="space-y-4">
        <label className="text-2xl font-sans text-brand-light block">1.1 What domain or idea do you want to explore?</label>
        <Input 
          type="text" 
          placeholder="e.g., Productivity software for teams" 
          value={thesisData.domain}
          onChange={(e) => updateThesisData('domain', e.target.value)}
        />
      </div>
      
      <div className="space-y-4">
        <label className="text-2xl font-sans text-brand-light block">
          Behind this, what is the fundamental, timeless human need?
        </label>
        <p className="text-gray-400 font-sans">e.g., The need for security, status, connection, growth, self-expression.</p>
        <Input 
          type="text" 
          placeholder="e.g., The need to feel a sense of progress."
          value={thesisData.humanNeed}
          onChange={(e) => {
            updateThesisData('humanNeed', e.target.value);
            updateThesisData('aiFeedback', '');
            setError(null);
          }}
        />
      </div>

      <div className="min-h-[90px] space-y-4 flex flex-col justify-center">
        {!thesisData.aiFeedback && (
          <div className="flex items-center gap-4">
             <Button onClick={handleFeedback} disabled={isLoading || !thesisData.humanNeed}>
              Get Socratic Feedback
            </Button>
            {isLoading && <LoadingSpinner />}
          </div>
        )}
        {error && <p className="text-red-500 font-mono">{error}</p>}
        {thesisData.aiFeedback && (
          <div className="border-l-4 border-brand-blue p-4 bg-brand-gray/20 animate-fadeIn">
            <p className="text-xl font-mono text-brand-light">{thesisData.aiFeedback}</p>
          </div>
        )}
      </div>

       <div className="space-y-4">
        <label className="text-2xl font-sans text-brand-light block">
          What are 2-3 innegotiable truths about this domain?
        </label>
        <p className="text-gray-400 font-sans">Physical, economic, or psychological laws. One per line.</p>
        <TextArea 
          placeholder={`e.g., Attention is a finite resource.\nContext switching destroys productivity.`}
          value={thesisData.truths.join('\n')}
          onChange={handleTruthsChange}
          className="h-28"
        />
      </div>


      <div className="flex justify-end pt-8">
        <Button onClick={onNext} disabled={!isComplete}>
          Next Step &rarr;
        </Button>
      </div>
    </div>
  );
};
