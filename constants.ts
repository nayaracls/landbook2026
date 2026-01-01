
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 0,
    text: "Qual o seu nicho ou negócio? (Ex: E-commerce, Marketing digital, Consultoria, Loja física, Estética, Infoprodutos...)",
    type: 'text',
    category: 'Nicho'
  },
  {
    id: 1,
    text: "Qual o nome da sua empresa?",
    type: 'text',
    category: 'Geral'
  },
  {
    id: 2,
    text: "Você sabe exatamente quanto lucra por cada venda realizada?",
    type: 'choice',
    category: 'Financeiro',
    options: [
      { key: 'A', text: 'Sim, centavo por centavo' },
      { key: 'B', text: 'Tenho uma noção aproximada' },
      { key: 'C', text: 'Não tenho clareza total' }
    ]
  },
  {
    id: 3,
    text: "Qual sua reserva de caixa atual para emergências?",
    type: 'choice',
    category: 'Financeiro',
    options: [
      { key: 'A', text: 'Nenhuma / Opero no limite' },
      { key: 'B', text: 'Menos de 3 meses' },
      { key: 'C', text: 'Mais de 6 meses' }
    ]
  },
  {
    id: 4,
    text: "Você tem um plano estratégico escrito para os próximos 6 meses?",
    type: 'choice',
    category: 'Planejamento',
    options: [
      { key: 'A', text: 'Sim, com metas e ações claras' },
      { key: 'B', text: 'Tenho apenas as metas na cabeça' },
      { key: 'C', text: 'Vou resolvendo conforme as coisas acontecem' }
    ]
  },
  {
    id: 5,
    text: "Com que frequência você revisa os indicadores do negócio?",
    type: 'choice',
    category: 'Planejamento',
    options: [
      { key: 'A', text: 'Diariamente' },
      { key: 'B', text: 'Mensalmente' },
      { key: 'C', text: 'Raramente ou nunca' }
    ]
  },
  {
    id: 6,
    text: "Como está a documentação dos seus processos principais?",
    type: 'choice',
    category: 'Processos',
    options: [
      { key: 'A', text: 'Tudo documentado e replicável' },
      { key: 'B', text: 'Algumas coisas escritas' },
      { key: 'C', text: 'Nada documentado, está tudo na minha cabeça' }
    ]
  },
  {
    id: 7,
    text: "Quantas pessoas fazem parte da sua equipe hoje?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Eu-quipe (trabalho sozinho)' },
      { key: 'B', text: 'Time pequeno (2 a 5 pessoas)' },
      { key: 'C', text: 'Time estruturado (mais de 6 pessoas)' }
    ]
  },
  {
    id: 8,
    text: "De onde vem a maior parte dos seus novos clientes hoje?",
    type: 'choice',
    category: 'Execução',
    options: [
      { key: 'A', text: 'Indicação / Boca a boca' },
      { key: 'B', text: 'Tráfego pago / Anúncios ativos' },
      { key: 'C', text: 'Não tenho um canal previsível' }
    ]
  },
  {
    id: 9,
    text: "Quanto tempo do seu dia é gasto em tarefas operacionais?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Mais de 80% (o negócio depende totalmente de mim)' },
      { key: 'B', text: 'Cerca de 50%' },
      { key: 'C', text: 'Menos de 20%, foco em estratégia' }
    ]
  },
  {
    id: 10,
    text: "Qual a tendência atual do faturamento do seu negócio?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Crescendo rapidamente' },
      { key: 'B', text: 'Estagnado' },
      { key: 'C', text: 'Em queda ou instável' }
    ]
  },
  {
    id: 11,
    text: "Qual a sua ambição de velocidade para os próximos 90 dias?",
    type: 'choice',
    category: 'Ambição',
    options: [
      { key: 'A', text: 'Sobreviver e estancar sangria' },
      { key: 'B', text: 'Crescimento estruturado e seguro' },
      { key: 'C', text: 'Escala agressiva / Crescer o máximo possível' }
    ]
  }
];
