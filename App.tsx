import React, { useState } from 'react';
import { AppStep, ThesisData } from './types';
import { IntroStep } from './components/IntroStep';
import { GeneratingStep } from './components/GeneratingStep';
import { generateRandomThesis } from './services/geminiService';
import { Phase1_PrinciplesStep } from './components/Phase1_PrinciplesStep';
import { Phase1_ConventionsStep } from './components/Phase1_ConventionsStep';
import { Phase1_JTBDStep } from './components/Phase1_JTBDStep';
import { SummaryStep } from './components/SummaryStep';
import { ManifestoStep } from './components/ManifestoStep';


const initialThesisData: ThesisData = {
  domain: '',
  humanNeed: '',
  aiFeedback: '',
  truths: [],
  conventions: [],
  jtbd: {
    verb: '',
    object: '',
    context: '',
    outcome: '',
  },
  jtbdDimensions: {
    functional: '',
    emotional: '',
    social: '',
  }
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.Intro);
  const [thesisData, setThesisData] = useState<ThesisData>(initialThesisData);
  const [error, setError] = useState<string | null>(null);
  const [generatedManifesto, setGeneratedManifesto] = useState<string | null>(null);

  const updateThesisData = <K extends keyof ThesisData>(key: K, value: ThesisData[K]) => {
    setThesisData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    setCurrentStep(prev => {
        // This logic defines the flow of the app
        switch(prev) {
            case AppStep.Intro: return AppStep.Phase1_Principles;
            case AppStep.Phase1_Principles: return AppStep.Phase1_Conventions;
            case AppStep.Phase1_Conventions: return AppStep.Phase1_JTBD;
            case AppStep.Phase1_JTBD: return AppStep.Summary;
            case AppStep.Summary: return AppStep.Manifesto;
            default: return prev;
        }
    });
  };

  const handleBack = () => {
     setCurrentStep(prev => {
        switch(prev) {
            case AppStep.Phase1_Principles: return AppStep.Intro;
            case AppStep.Phase1_Conventions: return AppStep.Phase1_Principles;
            case AppStep.Phase1_JTBD: return AppStep.Phase1_Conventions;
            case AppStep.Summary: return AppStep.Phase1_JTBD;
            case AppStep.Manifesto: return AppStep.Summary;
            default: return prev;
        }
    });
  };
  
  const handleReset = () => {
    setThesisData(initialThesisData);
    setGeneratedManifesto(null);
    setCurrentStep(AppStep.Intro);
    setError(null);
  }

  const handleGenerateRandom = async () => {
    setCurrentStep(AppStep.Generating);
    setError(null);
    try {
      const { thesisData, generatedManifesto } = await generateRandomThesis();
      setThesisData(thesisData);
      setGeneratedManifesto(generatedManifesto);
      setCurrentStep(AppStep.Summary);
    } catch (e) {
      console.error("Failed to generate random thesis:", e);
      setError("An error occurred during generation. Please check your API key or try again.");
      setCurrentStep(AppStep.Intro);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.Intro:
        return <IntroStep onNext={handleNext} onGenerateRandom={handleGenerateRandom} error={error} />;
      case AppStep.Generating:
        return <GeneratingStep />;
      case AppStep.Phase1_Principles:
        return <Phase1_PrinciplesStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} />;
      case AppStep.Phase1_Conventions:
        return <Phase1_ConventionsStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase1_JTBD:
        return <Phase1_JTBDStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Summary:
        return <SummaryStep thesisData={thesisData} onNext={handleNext} onBack={handleBack} />;
       case AppStep.Manifesto:
        return <ManifestoStep thesisData={thesisData} onReset={handleReset} generatedManifesto={generatedManifesto} />;
      default:
        return <IntroStep onNext={handleNext} onGenerateRandom={handleGenerateRandom} />;
    }
  };

  return (
    <main className="min-h-screen bg-brand-dark text-brand-light font-sans flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full flex items-center justify-center">
        {renderStep()}
      </div>
    </main>
  );
};

export default App;