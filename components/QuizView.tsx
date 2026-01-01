
import React, { useState, useEffect } from 'react';
import { Question } from '../types';

interface Props {
  question: Question;
  currentIndex: number;
  total: number;
  onAnswer: (text: string, optionKey?: string) => void;
}

const QuizView: React.FC<Props> = ({ question, currentIndex, total, onAnswer }) => {
  const [inputText, setInputText] = useState('');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    setIsTransitioning(false);
    setInputText('');
  }, [question]);

  const handleNext = () => {
    if (question.type === 'text' && !inputText.trim()) return;
    setIsTransitioning(true);
    setTimeout(() => {
      onAnswer(inputText);
    }, 300);
  };

  const handleChoice = (option: { key: string; text: string }) => {
    setIsTransitioning(true);
    setTimeout(() => {
      onAnswer(option.text, option.key);
    }, 300);
  };

  return (
    <div className={`glass rounded-2xl p-6 md:p-12 border border-white/10 transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="flex justify-between items-center mb-10">
        <span className="text-zinc-500 text-xs font-mono uppercase tracking-widest">
          Questão {currentIndex + 1} de {total}
        </span>
        <div className="flex gap-1">
          {Array.from({ length: total }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 w-6 rounded-full transition-all duration-500 ${i <= currentIndex ? 'bg-[#c6fe1f]' : 'bg-white/10'}`}
            ></div>
          ))}
        </div>
      </div>

      <h3 className="text-2xl md:text-3xl font-bold mb-10 leading-snug">
        {question.text}
      </h3>

      {question.type === 'text' ? (
        <div className="space-y-6">
          <textarea
            autoFocus
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleNext()}
            placeholder="Digite aqui sua resposta..."
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:border-[#c6fe1f]/50 focus:ring-1 focus:ring-[#c6fe1f]/50 transition-all outline-none min-h-[120px]"
          />
          <button 
            onClick={handleNext}
            disabled={!inputText.trim()}
            className="btn-primary px-10 py-4 rounded-xl font-bold text-black uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto"
          >
            Próxima pergunta <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3">
          {question.options?.map((option) => (
            <button
              key={option.key}
              onClick={() => handleChoice(option)}
              className="group flex items-center gap-4 w-full p-5 text-left rounded-xl bg-white/5 border border-white/10 hover:border-[#c6fe1f]/50 hover:bg-white/10 transition-all"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center font-bold text-[#c6fe1f] group-hover:bg-[#c6fe1f] group-hover:text-black transition-all">
                {option.key}
              </span>
              <span className="text-zinc-300 group-hover:text-white font-medium text-sm">
                {option.text}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizView;
