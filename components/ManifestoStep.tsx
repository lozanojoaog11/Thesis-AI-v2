import React, { useState, useEffect } from 'react';
import { ThesisData } from '../types';
import { Button } from './ui/Button';

interface ManifestoProps {
  thesisData: ThesisData;
  onReset: () => void;
  generatedManifesto?: string | null;
}

const generateManifestoFromData = (data: ThesisData): string => {
  const { domain, humanNeed, jtbd, jtbdDimensions, conventions, truths } = data;
  const jtbdSentence = `When ${jtbd.context}, help me to ${jtbd.verb} ${jtbd.object}, so I can ${jtbd.outcome}.`;
  const challengedConvention = conventions[0] || "[Fragile Convention]";
  const radicalHypothesis = `the opposite is true: [Radical Counter-Hypothesis based on the convention]`;

  return `# **PROMPT-MANIFESTO DE CODIFICAÇÃO PARA MVP: [Nome do Produto]**

### **<role_and_goal>**
Você é um Desenvolvedor de IA Sênior 10x, um "artesão de código" que se especializa em traduzir visões estratégicas em MVPs elegantes, funcionais e autocontidos. Sua missão é ler este briefing detalhado, que é o culminar de uma análise estratégica profunda, e gerar o código completo para a aplicação em um único arquivo HTML, perfeitamente alinhado com a visão.

### **<strategic_context>**
* **A Dor Latente (A Razão de Existir):** A raiz do problema está na necessidade humana fundamental de **${humanNeed}**. No domínio de **${domain}**, isso se manifesta como uma luta constante.
* **O "Job To Be Done" (A Missão do Usuário):** A missão do usuário é clara: **${jtbdSentence}**.
  - **Funcionalmente:** ${jtbdDimensions.functional}
  - **Emocionalmente:** ${jtbdDimensions.emotional}
  - **Socialmente:** ${jtbdDimensions.social}
* **O "Segredo" (Nossa Tese de Investimento):** A maioria das pessoas no domínio de ${domain} acredita que "${challengedConvention}", mas a verdade é que ${radicalHypothesis}, e nós seremos os primeiros a materializar essa verdade.
* **As Verdades Fundamentais:** Nossa estratégia é construída sobre rocha sólida:
  ${truths.map(t => `- ${t}`).join('\n  ')}

### **<core_ai_magic_explained>**
(Explicação técnica e detalhada da função central de IA, como se estivesse explicando para outro desenvolvedor sênior. Inclua a lógica passo a passo que a IA deve seguir).

### **<mvp_specifications>**
* **User Persona (Nosso Herói):** (Descrição detalhada de para quem estamos construindo este MVP, incluindo suas dores e motivações).
* **User Story Principal (O "Aha!" Moment):** "Como um [User Persona], eu quero [fazer a ação principal] para que [eu obtenha o valor principal e me sinta '${jtbdDimensions.emotional}' e seja visto como '${jtbdDimensions.social}']."
* **Fluxo de Usuário (A Jornada Passo a Passo):**
  1. O usuário abre a página e vê [descrição da tela inicial, focada na Proposta de Valor Única].
  2. Ele insere [input específico] no [componente de UI].
  3. Ele clica no botão com o texto "[texto exato do CTA]".
  4. O resultado aparece, resolvendo o Job To Be Done.
* **Lista de Features (Escopo Inequívoco):**
  * Feature 1: (Descrição precisa e sem ambiguidades).
  * Feature 2: (Descrição precisa e sem ambiguidades).

### **<technical_stack_and_constraints>**
* **Stack:** HTML, Vanilla JavaScript (ES6+), CSS.
* **Dependências:** Estritamente NENHUMA.
* **Estrutura do Código:** Único arquivo \`index.html\`.
* **APIs:** Use a API \`fetch\` nativa para chamadas externas.

### **<ui_ux_design_principles>**
* **Estilo Visual (A Estética):** Brutalismo funcional. Fundo #101010, Texto #EAEAEA, Destaque #0070F3. Fonte monoespaçada para inputs e sans-serif para UI.
* **Jornada sem Fricção:** O menor número de cliques possível para o "Aha! Moment".

### **<final_output_instructions>**
* **Formato de Saída:** O bloco de código completo para o arquivo \`index.html\`.
* **Qualidade do Código:** Limpo, bem formatado e extensivamente comentado.
`;
};


export const ManifestoStep: React.FC<ManifestoProps> = ({ thesisData, onReset, generatedManifesto }) => {
  const [manifestoText, setManifestoText] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    // If a complete manifesto is passed from the random generation flow, use it directly.
    // Otherwise, generate the manifesto from the user's step-by-step data.
    const finalManifesto = generatedManifesto || generateManifestoFromData(thesisData);
    setManifestoText(finalManifesto);
  }, [thesisData, generatedManifesto]);

  const handleCopy = () => {
    if(!manifestoText) return;
    navigator.clipboard.writeText(manifestoText).then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
    });
  };
  
  return (
    <div className="animate-fadeIn w-full max-w-4xl space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-sans text-brand-light">Your Manifesto Blueprint</h1>
        <p className="text-lg text-gray-400 mt-2">This is the final artifact: a detailed prompt to generate your MVP. Copy this and bring your vision to life.</p>
      </div>

      <div className="relative">
        <textarea
            readOnly
            className="w-full h-[500px] bg-black/50 font-mono text-brand-light border-2 border-brand-gray rounded-md p-4 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-brand-blue"
            value={manifestoText}
        />
         <Button onClick={handleCopy} className="absolute top-4 right-4">
            {copySuccess ? 'Copied!' : 'Copy to Clipboard'}
        </Button>
      </div>
      
      <div className="text-center pt-8">
        <Button onClick={onReset} variant="secondary">
            Start a New Thesis
        </Button>
      </div>
    </div>
  );
};