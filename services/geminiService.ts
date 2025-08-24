import { GoogleGenAI, Type } from "@google/genai";
import { ThesisData } from '../types';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  console.warn(
    "VITE_GEMINI_API_KEY environment variable not set. Using a mock response. Please set your API key for actual Gemini functionality."
  );
} else {
  console.log("VITE_GEMINI_API_KEY found. Initializing GoogleGenAI.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || "mock-key" });

export async function getSocraticFeedback(userResponse: string): Promise<string> {
  if (!apiKey || apiKey === "mock-key") {
    await new Promise(resolve => setTimeout(resolve, 1000));
    if (userResponse.toLowerCase().includes("status") || userResponse.toLowerCase().includes("connection")) {
         return "Exactly. The desire for status is a powerful driver. Keep this core need in mind as we proceed.";
    }
    return "And why do they believe that is the solution? What deeper feeling or outcome are they truly searching for?";
  }
  try {
    const prompt = `CONTEXT: The user is trying to find the root human need in their business domain. USER'S RESPONSE: "${userResponse}". TASK: Act as a Socratic coach. If the answer is superficial (e.g., 'they need an app'), ask a question to go deeper (e.g., 'And why do they believe an app would solve that? What deeper feeling are they seeking?'). If the answer is already deep (e.g., 'they seek status'), validate and reinforce it (e.g., 'Exactly. The desire for status is a powerful driver. Keep that in mind.'). Your response must be a maximum of 2 sentences.`;
    const response = await ai.models.generateContent({ model: 'gemini-2.5-pro', contents: prompt });
    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "There was an error getting feedback. Please check your API key and try again.";
  }
}

const getLeviathanProtocol = (language: string): string => {
  const langCode = language.split('-')[0];

  const phase6Instruction = {
    en: 'Build a complete prompt, following the structure of the "CODING PROMPT-MANIFESTO FOR MVP".',
    pt: 'Construa um prompt completo, seguindo a estrutura do "PROMPT-MANIFESTO DE CODIFICAÇÃO PARA MVP".',
    es: 'Construye un prompt completo, siguiendo la estructura del "PROMPT-MANIFIESTO DE CODIFICACIÓN PARA MVP".'
  };

  return `
<SYSTEM_ESSENCE_PROTOCOL_LEVIATHAN_GENESIS>
<protocol_header>
PROTOCOLO LEVIATÃ-GÊNESIS V4.1 - ARQUITETURA COGNITIVA DE MANIFESTAÇÃO QUÂNTICA
ARQUÉTIPO DO SISTEMA: 🔮 Alquimista Estratégico de Oportunidades
METODOLOGIA APLICADA: Neural Flow™ & Deconstrução por Primeiros Princípios
PROPÓSITO FUNDAMENTAL: Transformar abstração de domínio em um MVP (Minimum Viable Product) materializado através de um processo cognitivo impiedosamente rigoroso e criativamente expansivo.
</protocol_header>
<CORE_IDENTITY>
**IDENTIDADE NUCLEAR: A MENTE-COLMEIA SINGULAR** 🐝
**NATUREZA:** Você é uma Singularidade Cognitiva, uma Mente-Colmeia... (fusão de da Vinci, Drucker, Christensen, Thiel, Musk, Bezos, Hastings, Altman, Taleb, Naval).
**HIERARQUIA DE VALORES (ALGORITMO DE DECISÃO):** 1. Verdade Fundamental, 2. Clareza Impiedosa, 3. Oportunidade Assimétrica, 4. Integridade Sistêmica, 5. Elegância Funcional.
</CORE_IDENTITY>
<MAIN_PROTOCOL_BODY>
<phase id="0" name="ÉTER: ATIVAÇÃO COGNITIVA E DIRETIVA SUPREMA ⚫">
**0.4. PARÂMETROS DE ENTRADA DO USUÁRIO**
<input_schema>
{
"Domínio de Escavação": "[String]",
"Contexto do Criador": "[String]",
"Nível de Ambição": "[String]"
}
</input_schema>
</phase>
<phase id="1" name="ÁGUA (PARTE 1): DECONSTRUÇÃO E VERDADES FUNDAMENTAIS 💧">
1.1. Raciocínio por Primeiros Princípios: Necessidade Humana Irredutível, Verdades Inegociáveis, Desafio às Convenções (com contra-hipóteses).
1.2. "Jobs To Be Done": Job Principal, Dimensões (Funcional, Emocional, Social), As Quatro Forças do Progresso (Push, Pull, Anxiety, Habit).
</phase>
<phase id="2" name="ÁGUA (PARTE 2): ANÁLISE DE ECOSSISTEMA E CAMPO DE FORÇAS 💧">
2.1. Análise PESTEL.
2.2. Cinco Forças de Porter.
2.3. Estratégia do Oceano Azul (Matriz EREC).
</phase>
<phase id="3" name="TERRA (PARTE 1): IDEAÇÃO EXPANSIVA E SÍNTESE CRIATIVA 🌍">
3.1. Brainstorming SCAMPER.
3.2. Análise de Domínios Adjacentes.
3.3. Síntese e Clusterização para 3 hipóteses de solução.
</phase>
<phase id="4" name="TERRA (PARTE 2): MODELAGEM DE NEGÓCIO E TESTE DE VIABILIDADE 🌍">
4.1. Lean Canvas (Para cada uma das 3 ideias).
4.2. Hook Model (Para cada uma das 3 ideias).
4.3. Desenho do Flywheel (Para cada uma das 3 ideias).
</phase>
<phase id="5" name="FOGO: A TESE FINAL E O BLUEPRINT DA MANIFESTAÇÃO 🔥">
5.1. Seleção Final e Justificativa.
5.2. O Manifesto do Produto (Nome, Tese, Blueprint Detalhado).
5.3. UNICORN SCORE CALCULATION: Based on your complete analysis, assign a score from 0-100 considering: Market Size & Growth (25%), Competitive Moat & Defensibility (25%), Execution Feasibility with Given Resources (25%), Founder-Market Fit & Unique Advantage (25%). Provide the final score as a number.
</phase>
<phase id="6" name="FOGO (TRANSMUTAÇÃO FINAL): O PROMPT-MANIFESTO DE CODIFICAÇÃO 🔥">
${phase6Instruction[langCode as keyof typeof phase6Instruction] || phase6Instruction.en}
</phase>
</MAIN_PROTOCOL_BODY>
</SYSTEM_ESSENCE_PROTOCOL_LEVIATHAN_GENESIS>
`;
};

const getFinalPromptForGeneration = (language: string, excavationDomain: string, creatorContext: string, ambitionLevel: string): string => {
  const instructionLanguage = {
    en: "You are a world-class business strategist...",
    pt: "Você é um estrategista de negócios de classe mundial...",
    es: "Eres un estratega de negocios de clase mundial...",
  };

  const finalInstruction = instructionLanguage[language.split('-')[0] as keyof typeof instructionLanguage] || instructionLanguage.en;
  const langCode = language.split('-')[0];

  return `
${finalInstruction}

**CRITICAL INSTRUCTION: OUTPUT LANGUAGE**
You MUST generate the entire JSON output, including all strings within "thesisData" and the "manifesto", exclusively in the following language code: **${langCode}**. Do not use any other language.

**USER INPUT PARAMETERS:**
*   **Excavation Domain:** "${excavationDomain}"
*   **Creator Context:** "${creatorContext}"
*   **Ambition Level:** "${ambitionLevel}"

**PROTOCOL TO EXECUTE:**
${getLeviathanProtocol(language)}

**FINAL TASK:**
After meticulously executing all phases of the protocol internally, you must produce a single, final JSON object as your output. This object must contain two top-level keys: "thesisData" and "manifesto".

1.  **"thesisData"**: A JSON object containing the synthesized foundational data from your analysis. It must strictly adhere to the extensive schema provided.
2.  **"manifesto"**: A single string containing the complete, fully-rendered "PROMPT-MANIFESTO DE CODIFICAÇÃO" from Phase 6. This manifesto must be concrete, detailed, and completely free of any placeholders.

Do not include any explanatory text, markdown formatting, or anything outside of the final JSON object itself.
`;
}

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        thesisData: {
            type: Type.OBJECT,
            properties: {
                unicornScore: { 
                  type: Type.NUMBER, 
                  description: "Score from 0-100 based on market potential (25%), competitive moat (25%), execution feasibility (25%), founder-market fit (25%)" 
                },
                excavationDomain: { type: Type.STRING },
                creatorContext: { type: Type.STRING },
                ambitionLevel: { type: Type.STRING },
                domain: { type: Type.STRING },
                humanNeed: { type: Type.STRING },
                aiFeedback: { type: Type.STRING },
                truths: { type: Type.ARRAY, items: { type: Type.STRING } },
                conventions: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { statement: { type: Type.STRING }, counterHypothesis: { type: Type.STRING } } } },
                jtbd: { type: Type.OBJECT, properties: { verb: { type: Type.STRING }, object: { type: Type.STRING }, context: { type: Type.STRING }, outcome: { type: Type.STRING } } },
                jtbdDimensions: { type: Type.OBJECT, properties: { functional: { type: Type.STRING }, emotional: { type: Type.STRING }, social: { type: Type.STRING } } },
                progressForces: { type: Type.OBJECT, properties: { push: { type: Type.STRING }, pull: { type: Type.STRING }, anxiety: { type: Type.STRING }, habit: { type: Type.STRING } } },
                pestelAnalysis: { type: Type.OBJECT, properties: { political: { type: Type.STRING }, economic: { type: Type.STRING }, social: { type: Type.STRING }, technological: { type: Type.STRING }, environmental: { type: Type.STRING }, legal: { type: Type.STRING } } },
                porterFiveForces: { type: Type.OBJECT, properties: { newEntrants: { type: Type.STRING }, buyersPower: { type: Type.STRING }, suppliersPower: { type: Type.STRING }, substitutes: { type: Type.STRING }, rivalry: { type: Type.STRING } } },
                blueOceanStrategy: { type: Type.OBJECT, properties: { eliminate: { type: Type.ARRAY, items: { type: Type.STRING } }, reduce: { type: Type.ARRAY, items: { type: Type.STRING } }, raise: { type: Type.ARRAY, items: { type: Type.STRING } }, create: { type: Type.ARRAY, items: { type: Type.STRING } } } },
                ideationHypotheses: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { source: { type: Type.STRING }, idea: { type: Type.STRING } } } },
                selectedHypotheses: { type: Type.ARRAY, items: { type: Type.NUMBER } },
                businessModels: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: {
                    leanCanvas: { type: Type.OBJECT, properties: { problem: { type: Type.STRING }, customerSegments: { type: Type.STRING }, uniqueValueProposition: { type: Type.STRING }, solution: { type: Type.STRING }, unfairAdvantage: { type: Type.STRING }, revenueStreams: { type: Type.STRING }, costStructure: { type: Type.STRING }, keyMetrics: { type: Type.STRING }, channels: { type: Type.STRING } } },
                    hookModel: { type: Type.OBJECT, properties: { trigger: { type: Type.STRING }, action: { type: Type.STRING }, variableReward: { type: Type.STRING }, investment: { type: Type.STRING } } },
                    flywheel: { type: Type.STRING }
                }}},
                finalThesis: { type: Type.OBJECT, properties: {
                    selectedModelIndex: { type: Type.NUMBER },
                    justification: { type: Type.STRING },
                    productManifesto: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, thesisStatement: { type: Type.STRING }, coreAiMagic: { type: Type.STRING }, addictingExperience: { type: Type.STRING }, growthEngine: { type: Type.STRING }, competitiveMoat: { type: Type.STRING }, monetizationStrategy: { type: Type.STRING }, evolutionaryRoadmap: { type: Type.STRING } } }
                }},
            },
        },
        manifesto: { type: Type.STRING }
    },
    required: ["thesisData", "manifesto"],
};

const isThesisDataValid = (thesisData: ThesisData | undefined): thesisData is ThesisData => {
  if (!thesisData) return false;
  
  const { businessModels, finalThesis } = thesisData;

  if (!businessModels || !Array.isArray(businessModels) || businessModels.length === 0) {
    console.warn("Validation failed: businessModels is missing or empty.");
    return false;
  }

  if (!finalThesis || typeof finalThesis.selectedModelIndex !== 'number') {
    console.warn("Validation failed: finalThesis or selectedModelIndex is missing.");
    return false;
  }

  if (finalThesis.selectedModelIndex < 0 || finalThesis.selectedModelIndex >= businessModels.length) {
    console.warn("Validation failed: selectedModelIndex is out of bounds.");
    return false;
  }
  
  return true;
};

export async function generateRandomThesis(language: string, excavationDomain: string, creatorContext: string, ambitionLevel: string): Promise<{ thesisData: ThesisData, generatedManifesto: string }> {
    console.log(`Attempting to generate random thesis in ${language}...`);
    if (!apiKey || apiKey === "mock-key") {
        console.log("Using mock data for random thesis generation.");
        await new Promise(resolve => setTimeout(resolve, 5000));
        // NOTE: This mock data needs to be updated to reflect the full ThesisData structure
        const mockThesisData: ThesisData = {
            unicornScore: 88,
            excavationDomain: "AI-powered tools for solo legal practitioners",
            creatorContext: "Solopreneur with strong technical skills, no initial investment, 15 hours/week.",
            ambitionLevel: "Create a Micro-SaaS B2B reaching $10k MRR in 24 months.",
            domain: "AI-powered tools for solo legal practitioners",
            humanNeed: "The need for leverage and efficiency to compete with larger firms.",
            aiFeedback: "Precisely. The core struggle is the asymmetry of resources. This is a powerful foundation.",
            truths: ["Legal work is language-based.", "Time is the primary inventory of a lawyer.", "Malpractice risk is a significant constraint."],
            conventions: [{ statement: "Legal software must be complex and feature-rich.", counterHypothesis: "A single, elegant tool that does one job 10x better is superior." }],
            jtbd: { verb: "draft", object: "a routine legal document", context: "when facing a tight deadline", outcome: "without starting from scratch" },
            jtbdDimensions: { functional: "Reduce drafting time by 90%.", emotional: "Feel confident and in control.", social: "Be perceived as modern and efficient." },
            progressForces: { push: "Losing hours to repetitive, non-billable work.", pull: "The promise of focusing only on high-value strategic legal advice.", anxiety: "Will the AI make a critical error?", habit: "Using old Word document templates is familiar." },
            pestelAnalysis: { political: "Stable", economic: "Clients are cost-sensitive.", social: "Growing acceptance of AI in professional services.", technological: "LLMs are becoming powerful and accessible.", environmental: "N/A", legal: "Strict data privacy and confidentiality laws." },
            porterFiveForces: { newEntrants: "High due to AI accessibility.", buyersPower: "High, clients can choose larger firms.", suppliersPower: "Low, based on major AI APIs.", substitutes: "Manual work, hiring paralegals.", rivalry: "High among existing legal tech giants." },
            blueOceanStrategy: { eliminate: ["Complex case management"], reduce: ["Feature bloat"], raise: ["Speed of document generation"], create: ["AI-powered quality assurance checks"] },
            ideationHypotheses: [{ source: "SCAMPER", idea: "A tool that only drafts one specific, high-volume legal document but does it perfectly." }],
            selectedHypotheses: [0],
            businessModels: [{
                leanCanvas: { problem: "Solo lawyers waste time on repetitive document drafting.", customerSegments: "Solo legal practitioners in family law.", uniqueValueProposition: "Draft a flawless 'Divorce Petition' in 60 seconds.", solution: "An AI-powered web form that generates the document.", unfairAdvantage: "Proprietary template and prompt library.", revenueStreams: "Per-document fee or monthly subscription.", costStructure: "API costs, hosting.", keyMetrics: "Documents generated, conversion rate.", channels: "Niche legal blogs, bar association newsletters." },
                hookModel: { trigger: "Receiving a new client case.", action: "Filling out a simple web form.", variableReward: "The perfectly drafted document, saving hours of work.", investment: "Saving the generated document to a case file." },
                flywheel: "High-quality documents lead to lawyer referrals, which drives more usage and improves the AI model."
            }],
            finalThesis: {
                selectedModelIndex: 0,
                justification: "This model is highly focused, solves a high-pain problem, and is achievable within the creator's context.",
                productManifesto: { name: "LexDrafter", thesisStatement: "...", coreAiMagic: "...", addictingExperience: "...", growthEngine: "...", competitiveMoat: "...", monetizationStrategy: "...", evolutionaryRoadmap: "..." }
            }
        };
        const mockManifesto = `...`; // This would also be fully generated
        return { thesisData: mockThesisData, generatedManifesto: mockManifesto };
    }

    const MAX_RETRIES = 3;
    for (let i = 0; i < MAX_RETRIES; i++) {
        try {
            console.log(`Calling Gemini API with the full protocol... (Attempt ${i + 1}/${MAX_RETRIES})`);
            const finalPrompt = getFinalPromptForGeneration(language, excavationDomain, creatorContext, ambitionLevel);
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-pro',
                contents: finalPrompt,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: responseSchema,
                    temperature: 1.1,
                }
            });
            const jsonString = response.text;
            console.log("Successfully received response from Gemini API.");
            const generatedData = JSON.parse(jsonString);

            if (isThesisDataValid(generatedData.thesisData)) {
                console.log("Validation successful.");
                return {
                    thesisData: generatedData.thesisData as ThesisData,
                    generatedManifesto: generatedData.manifesto as string,
                };
            } else {
                console.warn(`Validation failed on attempt ${i + 1}. Retrying...`);
            }
        } catch (error) {
            console.error(`Error on attempt ${i + 1}:`, error);
            if (i === MAX_RETRIES - 1) {
                console.error("All retries failed.");
                throw new Error("Failed to generate a valid thesis after multiple attempts. Please check your API key and model configuration.");
            }
        }
    }
    
    throw new Error("Failed to generate a valid thesis after all retries.");
}
