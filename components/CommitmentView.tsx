import React from 'react';
import { motion } from 'framer-motion';

interface Props {
  onAccept: () => void;
}

const CommitmentView: React.FC<Props> = ({ onAccept }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 md:p-12 text-center border border-white/10 shadow-2xl max-w-2xl mx-auto"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex justify-center mb-8"
      >
        <div className="w-20 h-20 rounded-full bg-[#c6fe1f]/10 border-2 border-[#c6fe1f] flex items-center justify-center">
          <i className="fas fa-shield-alt text-[#c6fe1f] text-3xl"></i>
        </div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold mb-6 text-white"
      >
        Antes de começarmos…
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4 mb-10 text-left max-w-xl mx-auto"
      >
        <p className="text-zinc-300 leading-relaxed">
          Esta ferramenta foi treinada para agir como um consultor sênior. Para que o diagnóstico funcione, precisamos de um acordo:
        </p>
        
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[#c6fe1f] text-xl">✓</span>
            <p className="text-zinc-300 text-sm leading-relaxed">
              <strong className="text-white">Seja brutalmente honesto.</strong> Se você não sabe o lucro, marque 'não sei'. Mentir aqui é enganar o seu próprio bolso.
            </p>
          </div>
          
          <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
            <span className="text-[#c6fe1f] text-xl">✓</span>
            <p className="text-zinc-300 text-sm leading-relaxed">
              <strong className="text-white">Isso não é um teste de vaidade.</strong> O objetivo é encontrar problemas, não elogiar acertos.
            </p>
          </div>
        </div>

        <p className="text-zinc-400 text-sm pt-2">
          Se você está pronto para encarar a realidade do seu negócio, clique abaixo.
        </p>
      </motion.div>

      <motion.button
        onClick={onAccept}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="px-12 py-5 bg-[#c6fe1f] hover:bg-white text-black rounded-xl font-bold uppercase tracking-widest text-sm transition-all shadow-lg shadow-[#c6fe1f]/20"
      >
        Estou pronto para a verdade
      </motion.button>
    </motion.div>
  );
};

export default CommitmentView;
