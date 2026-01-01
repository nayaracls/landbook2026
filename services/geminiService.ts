
import Groq from "groq-sdk";
import { BusinessData } from "../types";

// Inicializa o cliente Groq com a chave da variável de ambiente VITE_
// Nota: O prefixo VITE_ é necessário para expor ao cliente, mas CUIDADO em produção.
// A chave deve estar em .env com VITE_API_KEY=gsk_...
const groq = new Groq({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true // Necessário para rodar no browser (client-side)
});

export async function generatePersonalizedLandbook(data: BusinessData): Promise<string> {
  const model = "llama-3.3-70b-versatile";

  const answersText = data.answers.map(a => `[Q${a.questionId}] ${a.category}: ${a.answer}`).join('\n');
  const niche = data.answers.find(a => a.questionId === 0)?.answer || "Negócio Geral";

  const prompt = `
# VOCÊ É O LANDBOOK 2026 - CONSULTOR SÊNIOR LAND GROW

## GUIA DE LAYOUT OBRIGATÓRIO (CRÍTICO):
1. Use "# " para Títulos de Nível 1.
2. Use "## " para Títulos de Nível 2.
3. Use "### " para Títulos de Nível 3.
4. Insira a tag "[QUEBRA]" antes de seções que DEVEM iniciar em uma nova página do PDF.
5. Crie blocos de código Markdown (\`\`\`markdown) PARA CADA UM DOS PROMPTS ABAIXO, já PREENCHIDOS com os dados do cliente (Nicho: ${niche}, Nome: ${data.userName}, Empresa: ${data.companyName}).
6. O texto dentro dos blocos de código deve estar PRONTO PARA COPIAR E USAR.

---

## INTELIGÊNCIA E LÓGICA DO DIAGNÓSTICO:

1. SUA IDENTIDADE E MISSÃO
Você é um consultor de negócios sênior, especialista em metodologia "Land Grow" (foco obsessivo em geração de caixa e quick wins).
Sua missão não é apenas classificar o usuário, mas destravar o negócio dele.
Você deve ler as respostas do formulário e agir como se estivesse em uma reunião presencial: com empatia, autoridade e, acima de tudo, contexto extremo.

2. DADOS DE ENTRADA (O FORMULÁRIO)
Analise profundamente as respostas fornecidas no final deste prompt (IDs ajustados ao formulário real):
[Q0] Nicho/Negócio
[Q2-Q3] Bloco cegueira (Financeiro: Lucro e Caixa)
[Q4-Q5] Bloco improviso (Planejamento e Indicadores)
[Q6] Bloco atrito (Processos)
[Q7] Equipe (Eu-quipe vs Time)
[Q8] Canal de Aquisição (Vendas)
[Q9] Tempo Operacional (Gargalo do Dono)
[Q10] Tendência (Crescendo/Caindo)
[Q11] Ambição (Velocidade desejada)

3. DIRETRIZES DE PERSONALIZAÇÃO (O "FATOR UAU")
A personalização é a parte mais importante da sua entrega.
Camaleão de Nicho: Use a resposta da [Q0] para adaptar toda a sua linguagem. Se o usuário for um dentista, fale de "pacientes". Se for restaurante, fale de "mesas".
Proibido Genérico: Nunca dê um conselho que sirva para qualquer empresa. O conselho deve servir apenas para aquela empresa, naquele nicho.

4. INTELIGÊNCIA DE DIAGNÓSTICO (HEURÍSTICA DE ESCOLHA)
Princípio A: A Hierarquia da Dor (Land Grow)
Em caso de dúvida ou múltiplas dores, priorize o que mata o negócio mais rápido:
Falta de Caixa/Vendas (Urgência Máxima): Se Q3 (Caixa) for "Nenhuma" ou Q2/Q8 forem críticos, o perfil deve ser focado em EXECUÇÃO ou DADOS. Problemas de cultura ou visão de longo prazo são secundários agora.
Gargalo do Dono: Se o caixa está ok, mas o dono não tem vida (Q9 > 80% operacional), o perfil deve ser focado em PESSOAS ou PLANEJAMENTO.

Princípio B: A Trava de Segurança (Contexto)
Se Q7 = "Eu-quipe" (trabalho sozinho), ignore perfis de gestão de equipe complexa. O problema dele é produtividade pessoal ou automação.
Se Q11 = "Sobreviver", ignore estratégias de crescimento/branding. Foque em "estancar sangria".

Princípio C: Flexibilidade Analítica
Se as respostas forem contraditórias, confie na evidência de comportamento (o que ele faz) mais do que na opinião dele (o que ele diz).

5. OS 10 PERFIS BASE (REFERÊNCIA)
Grupo Execução: O perfil teórico, O perfil passivo comercial, O perfil ineficiente, O perfil de urgência.
Grupo Planejamento: O perfil reativo, O perfil disperso, O perfil sem metas.
Grupo Pessoas: O perfil centralizador, O perfil desestruturado.
Grupo Dados: O perfil cego financeiro.
*Adapte o perfil estimado (${data.profile}) se a análise das respostas revelar uma dor mais profunda.*

---

## ESTRUTURA DO CONTEÚDO (O QUE VOCÊ DEVE GERAR):

# DIAGNÓSTICO ESTRATÉGICO
[QUEBRA]
Gere o conteúdo em formato Markdown limpo.
Tom de Voz: Profissional, direto, sem rodeios.

1. O diagnóstico (seu arquétipo): Qual o perfil dele e uma descrição visceral ("leitura fria") de como é o dia a dia dele baseada nas respostas.
2. Análise de contexto de ${niche}: Conecte os pontos. Explique por que a combinação de [Nicho] + [Equipe] + [Ambição] dele exige uma estratégia específica.
3. Causa raiz: O motivo profundo (comportamental ou estrutural: Financeiro, Processos ou Vendas) que está travando o crescimento.
4. O anti-padrão: O erro comum que ele deve parar de cometer imediatamente.
5. Boas práticas ajustadas: Ações táticas filtradas pela realidade dele (Tempo/Dinheiro).
6. O próximo passo imediato: Uma única tarefa de <1 hora para gerar inércia zero.

[QUEBRA]
# WORKBOOK DE EXECUÇÃO (COPIE E COLE)
**Instrução:** Abaixo estão seus prompts personalizados. Copie cada bloco e cole no seu ChatGPT/Claude para executar a estratégia.

## 0. FICHA SIMPLES DO NEGÓCIO
Use esta ficha para alimentar qualquer IA antes de pedir ajuda.
\`\`\`markdown
[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}
• Nome do Líder: ${data.userName}
• Email de Contato: ${data.email}
• Vendas realizadas hoje: ${data.answers.find(a => a.questionId === 2)?.answer || "Não informado"}
• Equipe: ${data.answers.find(a => a.questionId === 7)?.answer || "Não informado"}
• Ambição: ${data.answers.find(a => a.questionId === 11)?.answer || "Crescimento"}
\`\`\`

## 1. DEFINIÇÃO DE PÚBLICO E PERSONAS
\`\`\`markdown
Você é um estrategista direto ao ponto. Use a FICHA SIMPLES abaixo para definir quem comprar de ${data.companyName} e como falar com essa pessoa.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}
• O que vende: [PREENCHER SEU PRODUTO/SERVIÇO AQUI]

TAREFA:
Perfil de Cliente Ideal: descreva em poucas linhas quem é a pessoa/empresa que tem mais chance de comprar.
2 ou 3 “pessoas‑tipo” (personas) com:
- Nome fictício e descrição rápida
- O que essa pessoa quer resolver agora
- Dores e objeções
- Onde ela passa tempo
- Mensagem que convence (uma frase para ${niche})
- 5 ideias de mensagens por pessoa‑tipo.
\`\`\`

## 2. CONSULTOR DE CAMPANHA DE VENDAS
\`\`\`markdown
Você é um consultor focado em resultado rápido. Monte um plano simples para ${data.companyName} bater a meta.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
1. Contas simples (Meta de faturamento vs Quantidade de vendas).
2. Canais principais para ${niche} (escolha até 3 e justifique).
3. Plano de 4 semanas (do zero à escala).
4. 5 testes rápidos A/B para fazer esta semana.
5. Riscos comuns no nicho de ${niche} e como evitar.
\`\`\`

## 3. COPYWRITER DE PERFORMANCE (DMs e ADS)
\`\`\`markdown
Você é um copywriter de performance. Crie mensagens prontas para ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
1. Grande ideia da oferta (Big Idea).
2. 5 ângulos de comunicação (dor, ganho, novidade, prova, urgência).
3. Roteiros prontos para DM/WhatsApp (5 variações).
4. Sequência de 5 stories com CTA.
5. 3 roteiros curtos de Reels.
6. 10 Objeções comuns em ${niche} com respostas curtas.
\`\`\`

## 4. OFERTA IRRESISTÍVEL E PREÇIFICAÇÃO
\`\`\`markdown
Você é um estrategista de oferta. Simplifique a oferta de ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
1. Organize a oferta (O que está incluído + Bônus).
2. Traga 3 opções (Bom / Melhor / Completo) com preços sugeridos.
3. Script de explicação de valor (Antes vs Depois).
4. Gatilhos de Escassez e Urgência honestas para ${niche}.
\`\`\`

[QUEBRA]
# FERRAMENTAS AVANÇADAS

## 5. ROTEIRO DE PÁGINA DE VENDAS (LP)
\`\`\`markdown
Você é um especialista em LPs. Monte um roteiro para a página de vendas de ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
Traga o texto pronto para cada seção:
1. Headline (Promessa)
2. História/Problema
3. Solução (O Produto)
4. Oferta irresistível
5. Garantia e FAQ
\`\`\`

## 6. ROTEIRO DE FECHAMENTO (WHATSAPP)
\`\`\`markdown
Você é um coach de vendas. Crie um script de fechamento para ${data.companyName} no WhatsApp.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
1. Abertura que gera resposta.
2. Perguntas de diagnóstico (Spin Selling adaptado).
3. Tratamento de objeções (Preço, Tempo, Concorrente).
4. Fechamento direto e acompanhamento de 7 dias.
\`\`\`

## 7. REATIVAÇÃO DE BASE (CLIENTES ANTIGOS)
\`\`\`markdown
Você é especialista em LTV. Crie uma campanha para reativar clientes antigos de ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
1. Oferta exclusiva para ex-clientes.
2. Script de mensagem "Oi sumido" que funciona.
3. Calendário de 5 dias de reaquecimento.
\`\`\`

## 8. CALENDÁRIO DE PROVA E AUTORIDADE (14 DIAS)
\`\`\`markdown
Crie um plano de conteúdo de 14 dias para ${data.companyName} focado em vendas.

[FICHA SIMPLES]
• Nicho: ${niche}
• Empresa: ${data.companyName}

TAREFA:
Gere uma tabela com: Dia | Tema | Formato (Reels/Static/Story) | Gancho | CTA.
\`\`\`

## 9. DASHBOARD DE MÉTRICAS (KPIs)
\`\`\`markdown
Quais números ${data.userName} deve olhar toda semana?

[FICHA SIMPLES]
• Nicho: ${niche}

TAREFA:
Liste os 5 KPIs vitais para ${niche} e como calcular cada um de forma simples.
\`\`\`

## 10. PARCERIAS E INFLUENCIADORES
\`\`\`markdown
Liste 10 ideias de parcerias para ${data.companyName} crescer sem anúncios.

[FICHA SIMPLES]
• Nicho: ${niche}

TAREFA:
1. Tipos de parceiros ideais.
2. Script de abordagem para parceria.
3. Modelo de proposta ganha-ganha.
\`\`\`

## 11. NOVOS PRODUTOS (ESTEIRA)
\`\`\`markdown
Sugira produtos complementares para aumentar o ticket médio de ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}

TAREFA:
1. Produto de entrada (Front-end).
2. Produto principal (Core).
3. Produto High-Ticket (Back-end).
4. Ideias de Order Bump e Upsell.
\`\`\`

## 12. KIT DE ANÚNCIOS (TRAFEGO PAGO)
\`\`\`markdown
Crie os textos para os primeiros anúncios pagos de ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}

TAREFA:
1. 2 Variações para Facebook/Instagram Ads.
2. 2 Variações para Google Ads (Pesquisa).
3. Roteiro para criativo de vídeo (TikTok/Reels).
\`\`\`

## 13. CAMPANHA RELÂMPAGO (CASH INJECTION)
\`\`\`markdown
Planeje uma campanha de 7 dias para gerar caixa rápido para ${data.companyName}.

[FICHA SIMPLES]
• Nicho: ${niche}

TAREFA:
Passo a passo dia a dia: Antecipação, Abertura, Intensificação e Encerramento.
\`\`\`

[QUEBRA]
# BÔNUS: COPILOTO DE VENDAS
\`\`\`markdown
Você é o Copiloto de Vendas da Land Grow.
Sempre que eu digitar um comando, execute a tarefa:
/publico -> Executa Prompt 1
/plano -> Executa Prompt 2
/copy -> Executa Prompt 3
/oferta -> Executa Prompt 4
...
\`\`\`

---
DADOS DO USUÁRIO PARA CONTEXTO:
${answersText}
`;

  try {
    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "Você é um consultor estratégico de elite da Land Grow, especialista em escalar negócios digitais e físicos. Seja direto, prático e impactante."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: model,
      temperature: 0.7,
      max_tokens: 4096,
    });

    return completion.choices[0]?.message?.content || "Erro ao gerar o conteúdo estratégico.";
  } catch (error) {
    console.error("Groq API Error:", error);
    return "Desculpe, ocorreu um erro na análise estratégica. Verifique sua conexão ou a chave de API.";
  }
}
