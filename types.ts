export enum AppStep {
  Intro,
  Generating,
  // Phase 1: Deconstruction
  Phase1_Principles, // Combines domain, human need, and adds truths
  Phase1_Conventions, // Previously Step 2
  Phase1_JTBD, // Previously Step 3, but expanded with dimensions
  Summary,
  Manifesto, // New final step to generate the coding prompt
}

export interface ThesisData {
  // Phase 1, Step 1.1: First Principles
  domain: string;
  humanNeed: string;
  aiFeedback: string;
  truths: string[]; // New: Innegotiable truths from the protocol
  
  // Phase 1, Step 1.1: Challenge Conventions
  conventions: string[];
  
  // Phase 1, Step 1.2: Jobs To Be Done
  jtbd: {
    verb: string;
    object: string;
    context: string;
    outcome: string;
  };
  jtbdDimensions: { // New: JTBD dimensions from the protocol
    functional: string;
    emotional: string;
    social: string;
  };
}
