import OpenAI from 'openai';
import { BusinessData } from '../types';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generatePersonalizedLandbook(data: BusinessData): Promise<string> {
  const niche = data.answers.find(a => a.questionId === 0)?.answer || 'negócio';
  const profile = data.profile || 'Empreendedor';

  const answersText = data.answers
    .map(a => `[Q${a.questionId}] ${a.answer}`)
    .join('\n');

  const prompt = `# VOCÊ É O LANDBOOK 2026 - CONSULTOR SÊNIOR LAND GROW

## INTELIGÊNCIA E LÓGICA DO DIAGNÓSTICO:

### 1. SUA IDENTIDADE E MISSÃO
Você é um consultor de negócios sênior, especialista em metodologia "Land Grow" (foco obsessivo em geração de caixa e quick wins).
Sua missão não é apenas classificar o usuário, mas destravar o negócio dele.

### 2. DADOS DE ENTRADA (O FORMULÁRIO)
Analise profundamente as respostas fornecidas:

${answersText}

**Nicho identificado:** ${niche}
**Perfil diagnosticado:** ${profile}

### 3. HEURÍSTICAS DE DIAGNÓSTICO

#### Hierarquia da Dor (do mais grave ao menos):
1. **Financeiro**: Sem clareza de lucro/caixa = morte lenta
2. **Processos**: Dono é gargalo = não escala
3. **Vendas**: Estagnação = commodity
4. **Gestão**: Caos operacional = burnout

#### Trava de Segurança:
Se ambição alta (Q11-C) + estrutura fraca (Q4-C ou Q6-C) = **alerta vermelho**

### 4. DIRETRIZES DE PERSONALIZAÇÃO

Para ${niche}, você deve:
- Usar exemplos específicos do setor
- Mencionar concorrentes/benchmarks reais
- Citar métricas típicas (CAC, LTV, Ticket Médio)
- Sugerir ferramentas do nicho

### 5. ESTRUTURA DE SAÍDA OBRIGATÓRIA

Para cada seção abaixo, gere conteúdo denso, prático e personalizado. Use Markdown limpo.

---

# DIAGNÓSTICO ESTRATÉGICO

## 1. O diagnóstico (seu arquétipo)
**${profile}**

[Descrição visceral e direta de como é o dia a dia dele baseado nas respostas. Seja específico sobre os sintomas comportamentais.]

## 2. Análise de contexto de ${niche}
[Conecte: Nicho + Momento do mercado + Estrutura atual = Por que está travado. Use dados reais do setor.]

## 3. Causa raiz
[Identifique O problema estrutural (não sintomas). Pode ser: Financeiro, Processos, Vendas ou Gestão.]

## 4. O anti-padrão
[O erro fatal que ele precisa PARAR de cometer. Seja direto e confrontador.]

## 5. Boas práticas ajustadas
[Liste 3-5 ações TÁTICAS filtradas pela realidade dele (tempo/dinheiro disponível). Seja ultra específico.]

## 6. O próximo passo imediato
[UMA única tarefa de <1 hora para sair da inércia. Deve ser mensurável.]

---

[QUEBRA]

# WORKBOOK DE EXECUÇÃO: SÉRIE DE PROMPTS

Crie 10-15 prompts práticos divididos em seções. Cada prompt deve:
- Começar com título (## numerado)
- Ter contexto + instrução clara
- Incluir código/template quando aplicável
- Ser executável em <2 horas

## Exemplo de estrutura de prompt:

## 1. PROMPT PARA [TAREFA ESPECÍFICA]

**Contexto:** [Por que isso é importante para o negócio dele]

**Instrução:** [O que ele deve fazer, passo a passo]

\`\`\`markdown
[Template ou exemplo de execução]
\`\`\`

**Output esperado:** [O que ele terá ao final]

---

### SEÇÕES OBRIGATÓRIAS DO WORKBOOK:

1. **Clareza Financeira** (2-3 prompts)
2. **Otimização de Processos** (2-3 prompts)
3. **Aceleração Comercial** (3-4 prompts)
4. **Ferramentas de Gestão** (2-3 prompts)
5. **Bonus: [Específico do Nicho]** (1-2 prompts)

---

[QUEBRA]

# PRÓXIMOS PASSOS

## Implementação Imediata (Próximos 7 dias)
[3 tarefas críticas com deadline]

## Plano 30 dias
[Roadmap semanal resumido]

## Métricas de Sucesso
[KPIs que ele deve acompanhar]

---

**TOM DE VOZ:** Profissional, direto, sem rodeios, com senso de urgência.
**FORMATO:** Markdown limpo, sem HTML, com uso estratégico de negrito e listas.
**EXTENSÃO:** Denso e completo, mas sem encher linguiça.

GERE AGORA O LANDBOOK COMPLETO.`;

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
      max_tokens: 4000
    });

    return completion.choices[0]?.message?.content || 'Erro ao gerar conteúdo.';
  } catch (error) {
    console.error('Erro ao chamar OpenAI:', error);
    throw new Error('Falha ao gerar o Landbook. Verifique sua chave de API.');
  }
}
