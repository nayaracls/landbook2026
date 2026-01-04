
import React, { useState, useCallback } from 'react';
import { AppStage, BusinessData, QuizAnswer, ProfileType } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { generatePersonalizedLandbook } from './services/geminiService';
import { saveLead } from './services/supabaseClient';
import WelcomeView from './components/WelcomeView';
import CommitmentView from './components/CommitmentView';
import QuizCard from './components/QuizCard';
import ProgressBar from './components/ProgressBar';
import LoadingView from './components/LoadingView';
import DiagnosisView from './components/DiagnosisView';
import LandbookView from './components/LandbookView';
import { generatePDF } from './services/pdfService';

const App: React.FC = () => {
  const [stage, setStage] = useState<AppStage>(AppStage.WELCOME);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [businessData, setBusinessData] = useState<BusinessData>({
    userName: '',
    companyName: '',
    email: '',
    whatsapp: '',
    answers: []
  });
  const [landbookContent, setLandbookContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateProfile = useCallback((answers: QuizAnswer[]): string => {
    // Nova estrutura baseada nas 19 perguntas
    // Q1-Q3: Financeiro (Cegueira)
    const q1 = answers.find(a => a.questionId === 1)?.optionKey; // Lucro mês passado
    const q2 = answers.find(a => a.questionId === 2)?.optionKey; // Custo produto/serviço
    const q3 = answers.find(a => a.questionId === 3)?.optionKey; // Dados clientes
    // Q4-Q6: Planejamento (Improviso)
    const q4 = answers.find(a => a.questionId === 4)?.optionKey; // Meta vendas
    const q5 = answers.find(a => a.questionId === 5)?.optionKey; // Investimento atração
    const q6 = answers.find(a => a.questionId === 6)?.optionKey; // Agenda
    // Q7-Q9: Processos/Pessoas (Atrito)
    const q7 = answers.find(a => a.questionId === 7)?.optionKey; // Incomunicável 15 dias
    const q8 = answers.find(a => a.questionId === 8)?.optionKey; // Processo complexo
    const q9 = answers.find(a => a.questionId === 9)?.optionKey; // Funções claras
    // Q10-Q12: Execução (Estagnação)
    const q10 = answers.find(a => a.questionId === 10)?.optionKey; // Ideias implementadas
    const q11 = answers.find(a => a.questionId === 11)?.optionKey; // Frequência oferta
    const q12 = answers.find(a => a.questionId === 12)?.optionKey; // Retrabalho
    // Q13-Q17: Contexto
    const q13 = answers.find(a => a.questionId === 13)?.optionKey; // Faturamento
    const q14 = answers.find(a => a.questionId === 14)?.optionKey; // Tamanho equipe
    const q15 = answers.find(a => a.questionId === 15)?.optionKey; // Tempo livre
    const q16 = answers.find(a => a.questionId === 16)?.optionKey; // Reserva caixa
    // Q18: Ambição
    const q18 = answers.find(a => a.questionId === 18)?.optionKey; // Foco 6 meses

    // PRINCÍPIO A: Hierarquia da Dor
    // 1. Falta de Caixa/Vendas (Urgência Máxima)
    if (q16 === 'A' || q11 === 'C') {
      if (q1 === 'C' || q1 === 'D' || q2 === 'C' || q2 === 'D') return ProfileType.CEGO_FINANCEIRO;
      if (q11 === 'C') return ProfileType.PASSIVO_COMERCIAL;
    }

    // PRINCÍPIO B: Trava de Segurança
    if (q14 === 'A') {
      // Eu-quipe: produtividade pessoal
      if (q6 === 'C') return ProfileType.DISPERSO;
      if (q10 === 'C') return ProfileType.TEORICO;
    }

    // PRINCÍPIO A: 2. Gargalo do Dono
    if (q7 === 'C' || q15 === 'A') {
      if (q8 === 'B' || q8 === 'C') return ProfileType.CENTRALIZADOR;
      if (q9 === 'B' || q9 === 'C') return ProfileType.DESESTRUTURADO;
    }

    // Financeiro (Cegueira)
    if (q1 === 'C' || q1 === 'D' || q2 === 'C' || q2 === 'D') return ProfileType.CEGO_FINANCEIRO;

    // Planejamento (Improviso)
    if (q4 === 'D' || q5 === 'C') return ProfileType.SEM_METAS;
    if (q6 === 'C') return ProfileType.REATIVO;

    // Processos (Atrito)
    if (q7 === 'B' || q7 === 'C') {
      if (q8 === 'C') return ProfileType.DESESTRUTURADO;
      return ProfileType.CENTRALIZADOR;
    }

    // Execução (Estagnação)
    if (q10 === 'C') return ProfileType.TEORICO;
    if (q11 === 'C') return ProfileType.PASSIVO_COMERCIAL;
    if (q12 === 'C') return ProfileType.INEFICIENTE;
    if (q12 === 'B') return ProfileType.URGENCIA;

    // Default
    return ProfileType.DISPERSO;
  }, []);

  const handleStart = (name: string, email: string, whatsapp: string) => {
    setBusinessData(prev => ({ ...prev, userName: name, email, whatsapp }));
    setStage(AppStage.COMMITMENT);
  };

  const handleCommitmentAccept = () => {
    setStage(AppStage.QUIZ);
  };

  const handleAnswer = (answerText: string, optionKey?: string) => {
    const question = QUIZ_QUESTIONS[currentQuestionIndex];
    const newAnswers = [...businessData.answers, {
      questionId: question.id,
      answer: answerText,
      optionKey,
      category: question.category
    }];

    let newData = { ...businessData, answers: newAnswers };
    // Q0 é o nicho, usar como companyName
    if (question.id === 0) {
      newData.companyName = answerText;
    }

    setBusinessData(newData);

    if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      const finalProfile = calculateProfile(newAnswers);
      const finalData = { ...newData, profile: finalProfile };

      setBusinessData(finalData);
      saveLead(finalData);
      setStage(AppStage.DIAGNOSIS);
    }
  };

  const handleGenerateBook = async () => {
    setIsLoading(true);
    setError(null);
    setStage(AppStage.LOADING);
    try {
      console.log('🚀 Iniciando geração do Landbook...');
      const content = await generatePersonalizedLandbook(businessData);
      console.log('✅ Landbook gerado com sucesso');
      setLandbookContent(content);
      setIsLoading(false);
      setStage(AppStage.LANDBOOK);
    } catch (err: any) {
      console.error('❌ Erro na geração do Landbook:', err);
      setIsLoading(false);
      const errorMessage = err?.message || 'Erro ao gerar o Landbook. Tente novamente.';
      setError(errorMessage);
      setStage(AppStage.DIAGNOSIS);
      // Volta para diagnóstico para mostrar o erro
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 bg-[#0a0a0a] overflow-x-hidden">
      <div className="w-full max-w-4xl">
        <header className="text-center mb-8 animate-fadeIn no-print">
          <div className="inline-block px-4 py-1 mb-4 rounded-full border border-[#c6fe1f]/30 bg-[#c6fe1f]/10 text-[#c6fe1f] text-xs font-bold tracking-widest uppercase">
            Land Grow Strategic Intelligence
          </div>
          <h1 className="text-4xl md:text-6xl font-black mb-2 tracking-tighter">
            LANDBOOK <span className="gradient-text">2026</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-base font-medium text-center">
            Diagnóstico e plano de ação para escala estruturada.
          </p>
        </header>

        <main className="w-full">
          {stage === AppStage.WELCOME && <WelcomeView onStart={handleStart} />}
          {stage === AppStage.COMMITMENT && <CommitmentView onAccept={handleCommitmentAccept} />}
          {stage === AppStage.QUIZ && (
            <>
              <ProgressBar current={currentQuestionIndex + 1} total={QUIZ_QUESTIONS.length} />
              <div className="mt-20">
                <QuizCard
                  question={QUIZ_QUESTIONS[currentQuestionIndex]}
                  currentIndex={currentQuestionIndex}
                  total={QUIZ_QUESTIONS.length}
                  onAnswer={handleAnswer}
                />
              </div>
            </>
          )}
          {stage === AppStage.LOADING && <LoadingView />}
          {stage === AppStage.DIAGNOSIS && (
            <DiagnosisView
              data={businessData}
              onNext={handleGenerateBook}
              isLoading={isLoading}
              error={error}
            />
          )}
          {stage === AppStage.LANDBOOK && (
            <>
              <div className="no-print mb-8 flex justify-center">
                <button
                  onClick={async () => {
                    try {
                      await generatePDF(
                        'resultado-completo',
                        `Landbook_2026_Diagnostico_${new Date().toISOString().slice(0,10)}.pdf`
                      );
                    } catch (error: any) {
                      console.error('❌ Erro ao gerar PDF:', error);
                      alert(`Erro ao gerar PDF: ${error?.message || 'Tente novamente ou recarregue a página.'}`);
                    }
                  }}
                  className="download-button flex items-center gap-3 bg-[#c6fe1f] hover:bg-white text-black px-12 py-5 rounded-2xl shadow-2xl shadow-[#c6fe1f]/40 transition-all text-sm font-black uppercase tracking-widest active:scale-95 hover:scale-105 disabled:opacity-50"
                >
                  <i className="fas fa-file-pdf text-xl"></i> EXPORTAR PARA PDF (A4)
                </button>
              </div>
              <LandbookView data={businessData} content={landbookContent} />
            </>
          )}
        </main>

        <footer className="mt-12 text-center text-zinc-600 text-xs no-print">
          &copy; 2024 Land Grow. Todos os direitos reservados.
        </footer>
      </div>
    </div>
  );
};

export default App;
