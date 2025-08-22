import React, { useState } from 'react';
import { AppStep, ThesisData } from './types';
import { IntroStep } from './components/IntroStep';
import { GeneratingStep } from './components/GeneratingStep';
import { generateRandomThesis } from './services/geminiService';
import { Phase0_ActivationStep } from './components/Phase0_ActivationStep';
import { Phase1_PrinciplesStep } from './components/Phase1_PrinciplesStep';
import { Phase1_ConventionsStep } from './components/Phase1_ConventionsStep';
import { Phase1_JTBDStep } from './components/Phase1_JTBDStep';
import { Phase1_ProgressForcesStep } from './components/Phase1_ProgressForcesStep';
import { Phase2_PESTELStep } from './components/Phase2_PESTELStep';
import { Phase2_PorterStep } from './components/Phase2_PorterStep';
import { Phase2_BlueOceanStep } from './components/Phase2_BlueOceanStep';
import { Phase3_IdeationStep } from './components/Phase3_IdeationStep';
import { Phase3_SynthesisStep } from './components/Phase3_SynthesisStep';
import { Phase4_BusinessModelStep } from './components/Phase4_BusinessModelStep';
import { Phase5_SelectionStep } from './components/Phase5_SelectionStep';
import { SummaryStep } from './components/SummaryStep';
import { ManifestoStep } from './components/ManifestoStep';


const initialThesisData: ThesisData = {
  // FASE 0
  excavationDomain: '',
  creatorContext: '',
  ambitionLevel: '',
  // FASE 1
  domain: '',
  humanNeed: '',
  aiFeedback: '',
  truths: [],
  conventions: [],
  jtbd: { verb: '', object: '', context: '', outcome: '' },
  jtbdDimensions: { functional: '', emotional: '', social: '' },
  progressForces: { push: '', pull: '', anxiety: '', habit: '' },
  // FASE 2
  pestelAnalysis: { political: '', economic: '', social: '', technological: '', environmental: '', legal: '' },
  porterFiveForces: { newEntrants: '', buyersPower: '', suppliersPower: '', substitutes: '', rivalry: '' },
  blueOceanStrategy: { eliminate: [], reduce: [], raise: [], create: [] },
  // FASE 3
  ideationHypotheses: [],
  selectedHypotheses: [],
  // FASE 4
  businessModels: [],
  // FASE 5
  finalThesis: {
    selectedModelIndex: -1,
    justification: '',
    productManifesto: {
      name: '',
      thesisStatement: '',
      coreAiMagic: '',
      addictingExperience: '',
      growthEngine: '',
      competitiveMoat: '',
      monetizationStrategy: '',
      evolutionaryRoadmap: '',
    }
  }
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<AppStep>(AppStep.Phase0_Activation);
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
            case AppStep.Phase0_Activation: return AppStep.Phase1_Principles;
            case AppStep.Phase1_Principles: return AppStep.Phase1_Conventions;
            case AppStep.Phase1_Conventions: return AppStep.Phase1_JTBD;
            case AppStep.Phase1_JTBD: return AppStep.Phase1_ProgressForces;
            case AppStep.Phase1_ProgressForces: return AppStep.Phase2_PESTEL;
            case AppStep.Phase2_PESTEL: return AppStep.Phase2_Porter;
            case AppStep.Phase2_Porter: return AppStep.Phase2_BlueOcean;
            case AppStep.Phase2_BlueOcean: return AppStep.Phase3_Ideation;
            case AppStep.Phase3_Ideation: return AppStep.Phase3_Synthesis;
            case AppStep.Phase3_Synthesis: return AppStep.Phase4_BusinessModel;
            case AppStep.Phase4_BusinessModel: return AppStep.Phase5_Selection;
            case AppStep.Phase5_Selection: return AppStep.Summary; // Placeholder for now
            case AppStep.Summary: return AppStep.Manifesto;
            default: return prev;
        }
    });
  };

  const handleBack = () => {
     setCurrentStep(prev => {
        switch(prev) {
            case AppStep.Phase1_Principles: return AppStep.Phase0_Activation;
            case AppStep.Phase1_Conventions: return AppStep.Phase1_Principles;
            case AppStep.Phase1_JTBD: return AppStep.Phase1_Conventions;
            case AppStep.Phase1_ProgressForces: return AppStep.Phase1_JTBD;
            case AppStep.Phase2_PESTEL: return AppStep.Phase1_ProgressForces;
            case AppStep.Phase2_Porter: return AppStep.Phase2_PESTEL;
            case AppStep.Phase2_BlueOcean: return AppStep.Phase2_Porter;
            case AppStep.Phase3_Ideation: return AppStep.Phase2_BlueOcean;
            case AppStep.Phase3_Synthesis: return AppStep.Phase3_Ideation;
            case AppStep.Phase4_BusinessModel: return AppStep.Phase3_Synthesis;
            case AppStep.Phase5_Selection: return AppStep.Phase4_BusinessModel;
            case AppStep.Summary: return AppStep.Phase5_Selection; // Placeholder for now
            case AppStep.Manifesto: return AppStep.Summary;
            default: return prev;
        }
    });
  };
  
  const handleReset = () => {
    setThesisData(initialThesisData);
    setGeneratedManifesto(null);
    setCurrentStep(AppStep.Phase0_Activation);
    setError(null);
  }

  const handleGenerateRandom = async () => {
    console.log("`handleGenerateRandom` triggered.");
    setCurrentStep(AppStep.Generating);
    setError(null);
    try {
      const { thesisData, generatedManifesto } = await generateRandomThesis();
      console.log("Received data from generateRandomThesis:", { thesisData, generatedManifesto });
      setThesisData(thesisData);
      setGeneratedManifesto(generatedManifesto);
      setCurrentStep(AppStep.Summary);
    } catch (e) {
      console.error("Error in `handleGenerateRandom`:", e);
      setError("An error occurred during generation. Please check your API key or try again.");
      setCurrentStep(AppStep.Phase0_Activation); // Go back to the first step on error
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case AppStep.Phase0_Activation:
        return <Phase0_ActivationStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onGenerateRandom={handleGenerateRandom} />;
      case AppStep.Generating:
        return <GeneratingStep />;
      case AppStep.Phase1_Principles:
        return <Phase1_PrinciplesStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} />;
      case AppStep.Phase1_Conventions:
        return <Phase1_ConventionsStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase1_JTBD:
        return <Phase1_JTBDStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase1_ProgressForces:
        return <Phase1_ProgressForcesStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase2_PESTEL:
        return <Phase2_PESTELStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase2_Porter:
        return <Phase2_PorterStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase2_BlueOcean:
        return <Phase2_BlueOceanStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase3_Ideation:
        return <Phase3_IdeationStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase3_Synthesis:
        return <Phase3_SynthesisStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase4_BusinessModel:
        return <Phase4_BusinessModelStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Phase5_Selection:
        return <Phase5_SelectionStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onBack={handleBack} />;
      case AppStep.Summary:
        return <SummaryStep thesisData={thesisData} onNext={handleNext} onBack={handleBack} />;
       case AppStep.Manifesto:
        return <ManifestoStep thesisData={thesisData} onReset={handleReset} generatedManifesto={generatedManifesto} />;
      default:
        return <Phase0_ActivationStep thesisData={thesisData} updateThesisData={updateThesisData} onNext={handleNext} onGenerateRandom={handleGenerateRandom} />;
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
