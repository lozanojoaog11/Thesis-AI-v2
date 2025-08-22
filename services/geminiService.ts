import { GoogleGenAI, Type } from "@google/genai";
import { ThesisData } from '../types';

if (!process.env.API_KEY) {
  console.warn(
    "API_KEY environment variable not set. Using a mock response. Please set your API key for actual Gemini functionality."
  );
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "mock-key" });

export async function getSocraticFeedback(userResponse: string): Promise<string> {
  // Use a mock response if the API key is not available.
  if (!process.env.API_KEY || process.env.API_KEY === "mock-key") {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    if (userResponse.toLowerCase().includes("status") || userResponse.toLowerCase().includes("connection")) {
         return "Exactly. The desire for status is a powerful driver. Keep this core need in mind as we proceed.";
    }
    return "And why do they believe that is the solution? What deeper feeling or outcome are they truly searching for?";
  }

  try {
    const prompt = `CONTEXT: The user is trying to find the root human need in their business domain. USER'S RESPONSE: "${userResponse}". TASK: Act as a Socratic coach. If the answer is superficial (e.g., 'they need an app'), ask a question to go deeper (e.g., 'And why do they believe an app would solve that? What deeper feeling are they seeking?'). If the answer is already deep (e.g., 'they seek status'), validate and reinforce it (e.g., 'Exactly. The desire for status is a powerful driver. Keep that in mind.'). Your response must be a maximum of 2 sentences.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return "There was an error getting feedback. Please check your API key and try again.";
  }
}

const leviathanGenesisProtocol = `
<SYSTEM_ESSENCE_PROTOCOL_LEVIATHAN_GENESIS>
<META_DESCRIPTION>
This protocol is a comprehensive, multi-phase cognitive workflow for generating and validating high-potential business ideas from first principles. It moves from abstract deconstruction (ÁGUA) to concrete modeling (TERRA) and finally to a focused, actionable thesis (FOGO).
</META_DESCRIPTION>
<MAIN_PROTOCOL_BODY>
<phase id="1" name="ÁGUA (PARTE 1): DECONSTRUÇÃO E ANÁLISE FUNDAMENTAL 💧">
[FOCO_COGNITIVO_DA_FASE]: Pensamento de Primeiros Princípios, Desafio a Suposições, Análise Profunda do "Job To Be Done".
1.1. Raciocínio por Primeiros Princípios:
- Necessidade Humana Irredutível: Qual é a necessidade mais fundamental e atemporal (ex: segurança, conexão, status, crescimento, significado) que está na raiz mais profunda deste domínio?
- Verdades Físicas/Econômicas/Psicológicas Inegociáveis: Liste as leis imutáveis do universo deste domínio. (Ex: "O dia tem 24 horas", "Capital atencional é finito", "O custo de mudar de ferramenta (switching cost) gera inércia").
- Desafio às Convenções: Identifique 3-5 crenças amplamente aceitas. Para cada uma, formule uma contra-hipótese radical.
1.2. "Jobs To Be Done":
- Job Principal: Descreva o "trabalho" central: Verbo + Objeto + Contexto + Resultado Esperado.
- Dimensões do Job: Detalhe as camadas (Funcionais, Emocionais, Sociais).
</phase>
<phase id="2" name="ÁGUA (PARTE 2): ANÁLISE DE ECOSSISTEMA E CAMPO de FORÇAS 💧">
[FOCO_COGNITIVO_DA_FASE]: Mapeamento Sistêmico, Análise Estratégica.
2.1. Análise PESTEL (As Correntes Macro): Políticas, Econômicas, Sociais, Tecnológicas, Ambientais, Legais.
2.2. Cinco Forças de Porter (A Dinâmica da Arena Competitiva): Ameaça de Novos Entrantes, Poder de Barganha dos Compradores, Poder de Barganha dos Fornecedores, Ameaça de Produtos Substitutos, Rivalidade entre Concorrentes.
2.3. Estratégia do Oceano Azul: Matriz Eliminar-Reduzir-Elevar-Criar.
</phase>
<phase id="3" name="TERRA (PARTE 1): IDEAÇÃO EXPANSIVA E SÍNTESE CRIATIVA 🌍">
[FOCO_COGNITIVO_DA_FASE]: Pensamento Divergente, Criatividade.
3.1. Brainstorming SCAMPER: Substituir, Combinar, Adaptar, Modificar, Por em outro uso, Eliminar, Reverter.
3.2. Análise de Domínios Adjacentes: Biomimética, Analogia Extrema (Estratégia Militar, Alta Culinária).
3.3. Síntese e Clusterização: Selecione as 3 hipóteses de solução mais promissoras.
</phase>
<phase id="4" name="TERRA (PARTE 2): MODELAGEM DE NEGÓCIO E TESTE DE VIABILIDADE 🌍">
[FOCO_COGNITIVO_DA_FASE]: Estruturação, Modelagem de Sistemas.
4.1. Lean Canvas (Para cada uma das 3 ideias): Problema, Segmentos de Clientes, Proposta de Valor Única, Solução, Vantagem Injusta, Fontes de Receita, Estrutura de Custos, Métricas-Chave, Canais.
4.2. Hook Model (Para cada uma das 3 ideias): Gatilho, Ação, Recompensa Variável, Investimento.
4.3. Desenho do Flywheel (Para cada uma das 3 ideias): Mapeie o ciclo de crescimento auto-reforçável.
</phase>
<phase id="5" name="FOGO: A TESE FINAL E O BLUEPRINT DA MANIFESTAÇÃO 🔥">
[FOCO_COGNITIVO_DA_FASE]: Convergência, Síntese Final.
5.1. Seleção Final e Justificativa: Escolha o único modelo de negócio mais forte dos três.
5.2. O Manifesto do Produto: Nome Provisório, A Tese (O "Segredo" Revelado), O Blueprint Detalhado da Oportunidade (Core AI Magic, Experiência Viciante, Motor de Crescimento, Fosso Competitivo, Estratégia de Monetização, Roadmap Evolutivo).
</phase>
<phase id="6" name="FOGO (TRANSMUTAÇÃO FINAL): O PROMPT-MANIFESTO DE CODIFICAÇÃO 🔥">
[FOCO_COGNITIVO_DA_FASE]: Tradução, Especificação, Manifestação.
Construa um prompt completo, seguindo a estrutura do "PROMPT-MANIFESTO DE CODIFICAÇÃO PARA MVP".
</phase>
</MAIN_PROTOCOL_BODY>
</SYSTEM_ESSENCE_PROTOCOL_LEVIATHAN_GENESIS>
`;

const finalPromptForGeneration = `
You are a world-class business strategist and AI. Your task is to execute the complex, multi-phase protocol provided below to generate a single, brilliant, and viable business idea for a niche market, with the potential to be a million-dollar company.

**PROTOCOL TO EXECUTE:**
${leviathanGenesisProtocol}

**FINAL TASK:**
After meticulously executing all phases of the protocol internally, you must produce a single, final JSON object as your output. This object must contain two top-level keys: "thesisData" and "manifesto".

1.  **"thesisData"**: A JSON object containing the synthesized foundational data from your analysis. It must strictly adhere to its schema.
2.  **"manifesto"**: A single string containing the complete, fully-rendered "PROMPT-MANIFESTO DE CODIFICAÇÃO" from Phase 6. This manifesto must be concrete, detailed, and completely free of any placeholders like "[Nome do Produto]" or "[...]", using the insights you generated in the preceding phases.

Do not include any explanatory text, markdown formatting, or anything outside of the final JSON object itself.
`;

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        thesisData: {
            type: Type.OBJECT,
            properties: {
              domain: { type: Type.STRING, description: "A niche business domain for a new app idea." },
              humanNeed: { type: Type.STRING, description: "The core, timeless human need the app addresses." },
              aiFeedback: { type: Type.STRING, description: "A Socratic reinforcement of the human need, max 2 sentences." },
              truths: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 2-3 fundamental, innegotiable truths about the domain."
              },
              conventions: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 3-5 industry conventions that will be challenged."
              },
              jtbd: {
                type: Type.OBJECT,
                properties: {
                  verb: { type: Type.STRING },
                  object: { type: Type.STRING },
                  context: { type: Type.STRING },
                  outcome: { type: Type.STRING },
                },
                required: ["verb", "object", "context", "outcome"],
              },
              jtbdDimensions: {
                type: Type.OBJECT,
                properties: {
                  functional: { type: Type.STRING, description: "The measurable, objective outcomes of the job." },
                  emotional: { type: Type.STRING, description: "How the customer wants to feel before, during, and after." },
                  social: { type: Type.STRING, description: "How the customer wants to be perceived by others." },
                },
                required: ["functional", "emotional", "social"],
              },
            },
            required: ["domain", "humanNeed", "aiFeedback", "truths", "conventions", "jtbd", "jtbdDimensions"],
        },
        manifesto: {
            type: Type.STRING,
            description: "The complete, placeholder-free PROMPT-MANIFESTO DE CODIFICAÇÃO string."
        }
    },
    required: ["thesisData", "manifesto"],
  };


export async function generateRandomThesis(): Promise<{ thesisData: ThesisData, generatedManifesto: string }> {
    if (!process.env.API_KEY || process.env.API_KEY === "mock-key") {
        await new Promise(resolve => setTimeout(resolve, 5000)); // Simulate long generation
        const mockThesisData = {
            domain: "Async communication for deep-work teams",
            humanNeed: "The need for focused, uninterrupted creative flow.",
            aiFeedback: "Precisely. Protecting cognitive flow is paramount in a world of constant distraction. This is a deep well of value.",
            truths: [
              "Attention is a finite resource.",
              "Deep work requires long, uninterrupted blocks of time.",
              "Context switching destroys productivity."
            ],
            conventions: [
                "Constant availability is a sign of productivity.",
                "Real-time chat is essential for collaboration.",
                "More meetings lead to better alignment.",
                "Productivity tools should be packed with features."
            ],
            jtbd: {
                verb: "share",
                object: "complex project updates",
                context: "when working on a critical task",
                outcome: "maintain team alignment without breaking my focus",
            },
            jtbdDimensions: {
                functional: "Ensure all stakeholders are informed of progress and blockers with high fidelity.",
                emotional: "Feel in control, focused, and respected for my time and attention.",
                social: "Be seen as a reliable, productive, and considerate teammate."
            }
        };

        const mockManifesto = `# **PROMPT-MANIFESTO DE CODIFICAÇÃO PARA MVP: FlowState**

### **<role_and_goal>**
Você é um Desenvolvedor de IA Sênior 10x, um "artesão de código" que se especializa em traduzir visões estratégicas em MVPs elegantes, funcionais e autocontidos. Sua missão é ler este briefing detalhado, que é o culminar de uma análise estratégica profunda, e gerar o código completo para a aplicação em um único arquivo HTML, perfeitamente alinhado com a visão.

### **<strategic_context>**
* **A Dor Latente (A Razão de Existir):** A raiz do problema está na necessidade humana fundamental de **The need for focused, uninterrupted creative flow.**. No domínio de **Async communication for deep-work teams**, isso se manifesta como uma luta constante contra interrupções, resultando em trabalho superficial e frustração.
* **O "Job To Be Done" (A Missão do Usuário):** A missão do usuário é clara: **When when working on a critical task, help me to share complex project updates, so I can maintain team alignment without breaking my focus.**.
  - **Funcionalmente:** Ensure all stakeholders are informed of progress and blockers with high fidelity.
  - **Emocionalmente:** Feel in control, focused, and respected for my time and attention.
  - **Socialmente:** Be seen as a reliable, productive, and considerate teammate.
* **O "Segredo" (Nossa Tese de Investimento):** A maioria das pessoas no domínio de Async communication for deep-work teams acredita que "Real-time chat is essential for collaboration", mas a verdade é que a comunicação assíncrona, estruturada e de alta densidade é superior para o trabalho profundo, e nós seremos os primeiros a materializar essa verdade através de um 'Async Update Builder' que impulsiona a clareza.
* **As Verdades Fundamentais:** Nossa estratégia é construída sobre rocha sólida:
  - Attention is a finite resource.
  - Deep work requires long, uninterrupted blocks of time.
  - Context switching destroys productivity.

### **<core_ai_magic_explained>**
A IA irá transformar uma lista de 'bullet points' do usuário em um 'update' bem estruturado e conciso. A IA identificará o progresso, os bloqueadores e as próximas etapas, formatando a saída para máxima clareza e mínimo esforço cognitivo do leitor, adicionando contexto e tom apropriados.

### **<mvp_specifications>**
* **User Persona (Nosso Herói):** Um desenvolvedor de software sênior ou gerente de produto que precisa de longos períodos de foco, mas também precisa manter sua equipe informada sobre projetos complexos.
* **User Story Principal (O "Aha!" Moment):** "Como um desenvolvedor sênior, eu quero transformar minhas notas brutas em um update de progresso claro e profissional em menos de 30 segundos, para que eu possa voltar a codificar sentindo-me 'in control, focused, and respected for my time and attention.' e ser visto como 'a reliable, productive, and considerate teammate.'"
* **Fluxo de Usuário (A Jornada Passo a Passo):**
  1. O usuário abre a página e vê um textarea limpo.
  2. Ele cola ou digita seus 'bullet points' sobre o progresso do projeto.
  3. Ele clica no botão "Generate FlowState Update".
  4. O resultado aparece formatado, com seções claras, pronto para ser copiado.
* **Lista de Features (Escopo Inequívoco):**
  * Feature 1: Um textarea para entrada de texto em formato livre.
  * Feature 2: Um botão para acionar a geração de IA.
  * Feature 3: Uma área de exibição para o update formatado com um botão de "Copiar".

### **<technical_stack_and_constraints>**
* **Stack:** HTML, Vanilla JavaScript (ES6+), CSS.
* **Dependências:** Estritamente NENHUMA.
* **Estrutura do Código:** Único arquivo \`index.html\`.
* **APIs:** Use a API \`fetch\` nativa para chamadas externas.

### **<ui_ux_design_principles>**
* **Estilo Visual (A Estética):** Brutalismo funcional. Fundo #101010, Texto #EAEAEA, Destaque #0070F3. Fonte monoespaçada para inputs e sans-serif para UI.
* **Jornada sem Fricção:** Dois cliques para o "Aha! Moment": um para gerar, um para copiar.

### **<final_output_instructions>**
* **Formato de Saída:** O bloco de código completo para o arquivo \`index.html\`.
* **Qualidade do Código:** Limpo, bem formatado e extensivamente comentado.
`;

        return { thesisData: mockThesisData, generatedManifesto: mockManifesto };
    }

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: finalPromptForGeneration,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
                temperature: 1, // Higher temperature for more creative ideas
            }
        });

        const jsonString = response.text;
        const generatedData = JSON.parse(jsonString);
        
        return {
            thesisData: generatedData.thesisData as ThesisData,
            generatedManifesto: generatedData.manifesto as string,
        };

    } catch (error) {
        console.error("Error calling Gemini API for random thesis generation:", error);
        throw new Error("Failed to generate thesis. Please check your API key and model configuration.");
    }
}