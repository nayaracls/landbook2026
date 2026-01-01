
import React, { useState, useCallback } from 'react';
import { AppStage, BusinessData, QuizAnswer, ProfileType } from './types';
import { QUIZ_QUESTIONS } from './constants';
import { generatePersonalizedLandbook } from './services/geminiService';
import { saveLead } from './services/supabaseClient';
import WelcomeView from './components/WelcomeView';
import QuizView from './components/QuizView';
import DiagnosisView from './components/DiagnosisView';
import LandbookView from './components/LandbookView';

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

  const calculateProfile = useCallback((answers: QuizAnswer[]): string => {
    const finClarity = answers.find(a => a.questionId === 2)?.optionKey; // Financeiro
    const cashReserve = answers.find(a => a.questionId === 3)?.optionKey;
    const planning = answers.find(a => a.questionId === 4)?.optionKey; // Planejamento
    const docProcess = answers.find(a => a.questionId === 6)?.optionKey; // Processos
    const teamSize = answers.find(a => a.questionId === 7)?.optionKey; // Equipe
    const growthTrend = answers.find(a => a.questionId === 10)?.optionKey; // Contexto
    const ambition = answers.find(a => a.questionId === 11)?.optionKey; // Ambição

    // Prioridade 1: Financeiro/Caixa (Cego Financeiro)
    if (finClarity === 'C' || cashReserve === 'A') return ProfileType.CEGO_FINANCEIRO;

    // Prioridade 2: Dono Gargalo / Centralizador
    if (docProcess === 'C' && (teamSize === 'B' || teamSize === 'C')) return ProfileType.CENTRALIZADOR;

    // Prioridade 3: Falta de Planejamento (Reativo/Bombeiro)
    if (planning === 'C') return ProfileType.REATIVO;

    // Prioridade 4: Estagnação (Passivo Comercial)
    if (growthTrend === 'B' || growthTrend === 'C') return ProfileType.PASSIVO_COMERCIAL;

    // Default
    if (ambition === 'C') return "O perfil escalador agressivo";
    return ProfileType.DISPERSO;
  }, []);

  const handleStart = (name: string, email: string, whatsapp: string) => {
    setBusinessData(prev => ({ ...prev, userName: name, email, whatsapp }));
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
    if (question.id === 1) {
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
    const content = await generatePersonalizedLandbook(businessData);
    setLandbookContent(content);
    setIsLoading(false);
    setStage(AppStage.LANDBOOK);
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
          <p className="text-zinc-500 text-sm md:text-base font-medium">
            Diagnóstico e plano de ação para escala estruturada.
          </p>
        </header>

        <main className="w-full">
          {stage === AppStage.WELCOME && <WelcomeView onStart={handleStart} />}
          {stage === AppStage.QUIZ && (
            <QuizView
              question={QUIZ_QUESTIONS[currentQuestionIndex]}
              currentIndex={currentQuestionIndex}
              total={QUIZ_QUESTIONS.length}
              onAnswer={handleAnswer}
            />
          )}
          {stage === AppStage.DIAGNOSIS && (
            <DiagnosisView
              data={businessData}
              onNext={handleGenerateBook}
              isLoading={isLoading}
            />
          )}
          {stage === AppStage.LANDBOOK && (
            <LandbookView data={businessData} content={landbookContent} />
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
