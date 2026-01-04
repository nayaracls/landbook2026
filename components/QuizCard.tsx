import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import { Check } from 'lucide-react';
import { Question } from '../types';

interface Props {
  question: Question;
  currentIndex: number;
  total: number;
  onAnswer: (text: string, optionKey?: string) => void;
}

const QuizCard: React.FC<Props> = ({ question, currentIndex, total, onAnswer }) => {
  const [inputText, setInputText] = React.useState('');
  const [selectedOption, setSelectedOption] = React.useState<string | null>(null);

  React.useEffect(() => {
    setInputText('');
    setSelectedOption(null);
  }, [question]);

  const handleNext = () => {
    if (question.type === 'text' && !inputText.trim()) return;
    onAnswer(inputText);
  };

  const handleChoice = (option: { key: string; text: string }) => {
    setSelectedOption(option.key);
    setTimeout(() => {
      onAnswer(option.text, option.key);
    }, 400);
  };

  const getCategoryIcon = (questionId: number) => {
    if (questionId === 0) return '💼';
    if (questionId >= 1 && questionId <= 3) return '💰';
    if (questionId >= 4 && questionId <= 6) return '📋';
    if (questionId >= 7 && questionId <= 9) return '👥';
    if (questionId >= 10 && questionId <= 12) return '⚡';
    if (questionId >= 13 && questionId <= 17) return '📊';
    return '🎯';
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="glass rounded-2xl p-6 md:p-12 border border-white/10 shadow-2xl max-w-3xl mx-auto"
      >
        {/* Header com ícone e progresso */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#c6fe1f]/10 border border-[#c6fe1f]/30 flex items-center justify-center text-2xl">
              {getCategoryIcon(question.id)}
            </div>
            <div>
              <span className="text-xs text-zinc-500 font-mono uppercase tracking-widest">
                Questão {currentIndex + 1} de {total}
              </span>
              <div className="h-1 w-32 bg-white/10 rounded-full mt-1 overflow-hidden">
                <motion.div
                  className="h-full bg-[#c6fe1f] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / total) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Pergunta */}
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-2xl md:text-3xl font-bold mb-10 leading-snug text-white"
        >
          {question.text}
        </motion.h3>

        {/* Opções ou Input */}
        {question.type === 'text' ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            <textarea
              autoFocus
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleNext()}
              placeholder="Digite aqui sua resposta..."
              className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-zinc-600 focus:border-[#c6fe1f]/50 focus:ring-2 focus:ring-[#c6fe1f]/20 transition-all outline-none min-h-[120px] resize-none"
            />
            <motion.button
              onClick={handleNext}
              disabled={!inputText.trim()}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-10 py-4 bg-[#c6fe1f] hover:bg-white text-black rounded-xl font-bold uppercase tracking-wider text-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#c6fe1f]/20"
            >
              Próxima pergunta <i className="fas fa-arrow-right ml-2"></i>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 gap-3"
          >
            {question.options?.map((option, index) => (
              <motion.button
                key={option.key}
                onClick={() => handleChoice(option)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                whileHover={{ scale: 1.02, x: 5 }}
                whileTap={{ scale: 0.98 }}
                className={`group flex items-center gap-4 w-full p-5 text-left rounded-xl border transition-all ${
                  selectedOption === option.key
                    ? 'bg-[#c6fe1f]/10 border-[#c6fe1f] shadow-lg shadow-[#c6fe1f]/20'
                    : 'bg-white/5 border-white/10 hover:border-[#c6fe1f]/50 hover:bg-white/10'
                }`}
              >
                <motion.div
                  className={`flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center font-bold transition-all ${
                    selectedOption === option.key
                      ? 'bg-[#c6fe1f] text-black border-[#c6fe1f]'
                      : 'bg-white/5 border-white/10 text-[#c6fe1f] group-hover:bg-[#c6fe1f]/20'
                  }`}
                  animate={selectedOption === option.key ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  {selectedOption === option.key ? (
                    <span className="text-lg">✓</span>
                  ) : (
                    option.key
                  )}
                </motion.div>
                <span className={`font-medium text-sm transition-colors ${
                  selectedOption === option.key ? 'text-white' : 'text-zinc-300 group-hover:text-white'
                }`}>
                  {option.text}
                </span>
              </motion.button>
            ))}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default QuizCard;

