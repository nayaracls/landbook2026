import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LoadingView: React.FC = () => {
  const messages = [
    'Analisando seus pilares financeiros…',
    'Cruzando dados de produtividade da equipe…',
    'Identificando gargalos de vendas no seu nicho…',
    'Calculando o plano de viabilidade…',
    'Gerando relatório final…'
  ];

  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh]">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        className="relative w-24 h-24 mb-8"
      >
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-[#c6fe1f]/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#c6fe1f]"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#c6fe1f]/20 flex items-center justify-center">
            <i className="fas fa-chess-knight text-[#c6fe1f] text-xl"></i>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.p
          key={currentMessageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="text-zinc-400 text-sm md:text-base font-medium text-center max-w-md"
        >
          {messages[currentMessageIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Progress dots */}
      <div className="flex gap-2 mt-8">
        {messages.map((_, index) => (
          <motion.div
            key={index}
            className="w-2 h-2 rounded-full bg-[#c6fe1f]"
            animate={{
              opacity: index === currentMessageIndex ? 1 : 0.3,
              scale: index === currentMessageIndex ? 1.2 : 1,
            }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingView;
