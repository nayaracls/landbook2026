
import { Question } from './types';

export const QUIZ_QUESTIONS: Question[] = [
  {
    id: 0,
    text: "Em poucas palavras, descreva o seu negócio (ex: clínica de estética, loja de roupas, consultoria de TI).",
    type: 'text',
    category: 'Nicho'
  },
  {
    id: 1,
    text: "Se eu pedisse para ver agora o quanto sua empresa lucrou (dinheiro limpo no bolso) no mês passado, o que você conseguiria me mostrar em 5 minutos?",
    type: 'choice',
    category: 'Financeiro',
    options: [
      { key: 'A', text: 'Tenho um relatório fechado (planilha ou sistema) com esse valor exato.' },
      { key: 'B', text: 'Tenho os dados soltos (extratos, anotações), mas preciso somar para saber.' },
      { key: 'C', text: 'Não tenho certeza, controlo apenas olhando o saldo final do banco.' },
      { key: 'D', text: 'O caixa da empresa e o meu pessoal são misturados, não sei dizer.' }
    ]
  },
  {
    id: 2,
    text: "Você sabe exatamente quanto custa para vender e entregar seu principal produto/serviço (impostos, taxas, comissões, custo de material/hora)?",
    type: 'choice',
    category: 'Financeiro',
    options: [
      { key: 'A', text: 'Sim, tenho uma ficha técnica detalhada e sei minha margem de lucro em centavos.' },
      { key: 'B', text: 'Sei o custo de compra/produção, mas não calculo taxas e impostos detalhadamente.' },
      { key: 'C', text: 'Multiplico o custo por 2 ou 3 (markup padrão) e imagino que dá lucro.' },
      { key: 'D', text: 'Não sei, defino o preço olhando a concorrência.' }
    ]
  },
  {
    id: 3,
    text: "Onde estão guardados os dados de quem já comprou de você?",
    type: 'choice',
    category: 'Financeiro',
    options: [
      { key: 'A', text: 'Em um sistema (CRM) ou planilha organizada com histórico de compras.' },
      { key: 'B', text: 'Misturados no WhatsApp, agenda do celular ou fichas de papel.' },
      { key: 'C', text: 'Em plataforma de terceiros (iFood, Marketplace) sem acesso fácil aos dados.' },
      { key: 'D', text: 'Não guardo histórico de clientes.' }
    ]
  },
  {
    id: 4,
    text: "Qual foi o resultado da sua meta de vendas no mês passado?",
    type: 'choice',
    category: 'Planejamento',
    options: [
      { key: 'A', text: 'Bati ou superei a meta que estava escrita.' },
      { key: 'B', text: 'Fiquei perto (entre 80% e 99% da meta).' },
      { key: 'C', text: 'Fiquei longe (menos de 80%).' },
      { key: 'D', text: 'Não tínhamos uma meta numérica escrita definida.' }
    ]
  },
  {
    id: 5,
    text: "Como você define quanto vai gastar para atrair clientes este mês?",
    type: 'choice',
    category: 'Planejamento',
    options: [
      { key: 'A', text: 'Tenho um valor fixo ou percentual já separado para isso.' },
      { key: 'B', text: 'Gasto o que sobra ou decido na hora se preciso vender mais.' },
      { key: 'C', text: 'Não invisto dinheiro em atração, dependo apenas do orgânico.' }
    ]
  },
  {
    id: 6,
    text: "Olhando para a sua agenda da próxima semana:",
    type: 'choice',
    category: 'Planejamento',
    options: [
      { key: 'A', text: 'Já tenho blocos de tempo definidos para tarefas importantes.' },
      { key: 'B', text: 'Tenho apenas os compromissos com clientes/entregas marcados.' },
      { key: 'C', text: 'Minha agenda está em branco, decido o que fazer no dia.' }
    ]
  },
  {
    id: 7,
    text: "Se você ficar incomunicável por 15 dias, o que acontece com a empresa?",
    type: 'choice',
    category: 'Processos',
    options: [
      { key: 'A', text: 'Continua vendendo e entregando normalmente.' },
      { key: 'B', text: 'A entrega acontece, mas as vendas param (ou vice-versa).' },
      { key: 'C', text: 'Vira um caos ou para totalmente.' },
      { key: 'D', text: 'Impossível, eu sou a empresa (trabalho sozinho).' }
    ]
  },
  {
    id: 8,
    text: "Como sua equipe (ou você) sabe o jeito certo de fazer uma tarefa complexa?",
    type: 'choice',
    category: 'Processos',
    options: [
      { key: 'A', text: 'Temos manuais, checklists ou vídeos de passo a passo.' },
      { key: 'B', text: 'Eu expliquei verbalmente e eles decoraram (ou eu faço de cabeça).' },
      { key: 'C', text: 'Cada um faz do seu jeito, desde que o resultado saia.' }
    ]
  },
  {
    id: 9,
    text: "As pessoas que trabalham com você sabem exatamente o que é função delas?",
    type: 'choice',
    category: 'Processos',
    options: [
      { key: 'A', text: 'Sim, todos têm descrição de função clara.' },
      { key: 'B', text: 'Mais ou menos, todos fazem um pouco de tudo.' },
      { key: 'C', text: 'Trabalho sozinho ou apenas com freelancers pontuais.' }
    ]
  },
  {
    id: 10,
    text: "Das últimas 3 ideias novas para melhorar o negócio, quantas estão rodando hoje?",
    type: 'choice',
    category: 'Execução',
    options: [
      { key: 'A', text: 'Todas as 3 foram implementadas.' },
      { key: 'B', text: 'Apenas 1 ou 2.' },
      { key: 'C', text: 'Nenhuma, a rotina engoliu os projetos.' }
    ]
  },
  {
    id: 11,
    text: "Nos últimos 30 dias, com que frequência sua empresa ofereceu ativamente o produto/serviço?",
    type: 'choice',
    category: 'Execução',
    options: [
      { key: 'A', text: 'Todos os dias úteis.' },
      { key: 'B', text: 'Algumas vezes por semana.' },
      { key: 'C', text: 'Quase nunca, esperamos o cliente vir até nós.' }
    ]
  },
  {
    id: 12,
    text: "Com que frequência você precisa refazer um serviço ou resolver um problema de entrega?",
    type: 'choice',
    category: 'Execução',
    options: [
      { key: 'A', text: 'Raramente (quase zero).' },
      { key: 'B', text: 'Às vezes (uma vez por semana).' },
      { key: 'C', text: 'Frequentemente (quase todo dia tem um "incêndio").' }
    ]
  },
  {
    id: 13,
    text: "Como está o faturamento bruto nos últimos 6 meses?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Crescendo consistentemente.' },
      { key: 'B', text: 'Estável (andando de lado).' },
      { key: 'C', text: 'Caindo ou oscilando muito.' }
    ]
  },
  {
    id: 14,
    text: "Qual o tamanho da sua estrutura hoje?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Eu-quipe (só eu).' },
      { key: 'B', text: 'Eu + sócios/ajudantes (sem CLT).' },
      { key: 'C', text: 'Equipe pequena (até 5 funcionários).' },
      { key: 'D', text: 'Equipe estruturada (gerentes e departamentos).' }
    ]
  },
  {
    id: 15,
    text: "Quanto tempo livre você tem para aplicar melhorias?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Zero (afogado no operacional).' },
      { key: 'B', text: 'Pouco (algumas horas por semana).' },
      { key: 'C', text: 'Bastante (foco na estratégia).' }
    ]
  },
  {
    id: 16,
    text: "Se as vendas parassem hoje, por quanto tempo a empresa paga as contas?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Menos de 1 mês (risco alto).' },
      { key: 'B', text: 'De 1 a 3 meses.' },
      { key: 'C', text: 'Mais de 3 meses.' }
    ]
  },
  {
    id: 17,
    text: "Qual é a principal forma como o cliente chega até você hoje?",
    type: 'choice',
    category: 'Contexto',
    options: [
      { key: 'A', text: 'Venda ativa: eu/equipe vamos atrás (ligação, email, visita).' },
      { key: 'B', text: 'Tráfego/digital: anúncios online, redes sociais ou e-commerce.' },
      { key: 'C', text: 'Porta/vitrine: ponto físico com fluxo de pessoas.' },
      { key: 'D', text: 'Indicação/relacionamento: boca a boca e networking.' }
    ]
  },
  {
    id: 18,
    text: "Qual é o seu foco principal para os próximos 6 meses?",
    type: 'choice',
    category: 'Ambição',
    options: [
      { key: 'A', text: 'Sobreviver: preciso sair do vermelho e pagar as contas atrasadas.' },
      { key: 'B', text: 'Organizar: quero ter mais tempo livre e menos caos.' },
      { key: 'C', text: 'Crescer: quero aumentar as vendas e o lucro.' },
      { key: 'D', text: 'Escalar: quero multiplicar o negócio (filiais, franquias).' }
    ]
  }
];
