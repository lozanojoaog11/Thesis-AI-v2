export enum AppStep {
  Intro,
  Generating,
  
  // Phase 0: ÉTER
  Phase0_Activation,

  // Phase 1: Deconstruction
  Phase1_Principles,
  Phase1_Conventions,
  Phase1_JTBD,
  Phase1_ProgressForces,

  // Phase 2: Ecosystem Analysis
  Phase2_PESTEL,
  Phase2_Porter,
  Phase2_BlueOcean,

  // Phase 3: Ideation
  Phase3_Ideation, // Will handle SCAMPER, Analogies etc.
  Phase3_Synthesis,

  // Phase 4: Business Modeling
  Phase4_BusinessModel,

  // Phase 5: Final Thesis
  Phase5_Selection,
  
  // Final Steps
  Summary, // This will be the new rich summary (The Manifesto)
  Manifesto, // This will be the final prompt generation (The Prompt-Manifesto)
}

export interface ThesisData {
  // FASE 0: ÉTER
  excavationDomain: string;
  creatorContext: string;
  ambitionLevel: string;

  // FASE 1: ÁGUA 1 (Deconstrução)
  domain: string;
  humanNeed: string;
  aiFeedback: string;
  truths: string[];
  conventions: { statement: string; counterHypothesis: string; }[];
  jtbd: {
    verb: string;
    object: string;
    context: string;
    outcome: string;
  };
  jtbdDimensions: {
    functional: string;
    emotional: string;
    social: string;
  };
  progressForces: {
    push: string;
    pull: string;
    anxiety: string;
    habit: string;
  };

  // FASE 2: ÁGUA 2 (Análise de Ecossistema)
  pestelAnalysis: {
    political: string;
    economic: string;
    social: string;
    technological: string;
    environmental: string;
    legal: string;
  };
  porterFiveForces: {
    newEntrants: string;
    buyersPower: string;
    suppliersPower: string;
    substitutes: string;
    rivalry: string;
  };
  blueOceanStrategy: {
    eliminate: string[];
    reduce: string[];
    raise: string[];
    create: string[];
  };

  // FASE 3: TERRA 1 (Ideação)
  ideationHypotheses: {
    source: string; // e.g., "SCAMPER-Substitute", "Analogy-Military"
    idea: string;
  }[];
  selectedHypotheses: number[]; // Array of indices from ideationHypotheses

  // FASE 4: TERRA 2 (Modelagem de Negócio)
  businessModels: {
    leanCanvas: {
      problem: string;
      customerSegments: string;
      uniqueValueProposition: string;
      solution: string;
      unfairAdvantage: string;
      revenueStreams: string;
      costStructure: string;
      keyMetrics: string;
      channels: string;
    };
    hookModel: {
      trigger: string;
      action: string;
      variableReward: string;
      investment: string;
    };
    flywheel: string;
  }[]; // Array for the 3 selected hypotheses

  // FASE 5: FOGO 1 (Síntese Final)
  finalThesis: {
    selectedModelIndex: number;
    justification: string;
    productManifesto: {
      name: string;
      thesisStatement: string;
      coreAiMagic: string;
      addictingExperience: string;
      growthEngine: string;
      competitiveMoat: string;
      monetizationStrategy: string;
      evolutionaryRoadmap: string;
    };
  };
}
