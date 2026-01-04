
export enum AppStage {
  WELCOME = 'WELCOME',
  COMMITMENT = 'COMMITMENT',
  QUIZ = 'QUIZ',
  LOADING = 'LOADING',
  DIAGNOSIS = 'DIAGNOSIS',
  LANDBOOK = 'LANDBOOK'
}

export enum ProfileType {
  TEORICO = 'O perfil teórico',
  PASSIVO_COMERCIAL = 'O perfil passivo comercial',
  INEFICIENTE = 'O perfil ineficiente',
  URGENCIA = 'O perfil de urgência',
  REATIVO = 'O perfil reativo',
  DISPERSO = 'O perfil disperso',
  SEM_METAS = 'O perfil sem metas',
  CENTRALIZADOR = 'O perfil centralizador',
  DESESTRUTURADO = 'O perfil desestruturado',
  CEGO_FINANCEIRO = 'O perfil cego financeiro'
}

export interface QuizAnswer {
  questionId: number;
  answer: string;
  optionKey?: string;
  category?: string;
}

export interface BusinessData {
  userName: string;
  companyName: string;
  email: string;
  whatsapp: string;
  answers: QuizAnswer[];
  profile?: ProfileType | string;
}

export interface Question {
  id: number;
  text: string;
  type: 'text' | 'choice';
  category: string;
  options?: { key: string; text: string }[];
}
