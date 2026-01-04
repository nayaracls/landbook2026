import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface Props {
  onStart: (name: string, email: string, whatsapp: string) => void;
}

const WelcomeView: React.FC<Props> = ({ onStart }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && whatsapp) {
      onStart(name, email, whatsapp);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 md:p-12 text-center border border-white/5 shadow-2xl max-w-2xl mx-auto"
    >
      {/* Logo animado */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="flex justify-center mb-8"
      >
        <div className="w-20 h-20 rounded-2xl bg-[#c6fe1f] flex items-center justify-center shadow-lg shadow-[#c6fe1f]/30">
          <i className="fas fa-chess-knight text-black text-3xl"></i>
        </div>
      </motion.div>
      
      <motion.h2
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-2xl md:text-3xl font-bold mb-4 text-white"
      >
        Olá! Sou o assistente estratégico da Land Grow.
      </motion.h2>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed text-sm"
      >
        Preencha seus dados para começarmos a jornada de 19 perguntas que revelarão o perfil de crescimento do seu negócio. No final, você receberá o Landbook 2026 completo.
      </motion.p>

      <motion.form
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-4 text-left mb-10"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <label className="block text-zinc-500 text-xs font-bold uppercase mb-1 ml-1">Seu Nome</label>
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c6fe1f]/50 focus:ring-2 focus:ring-[#c6fe1f]/20 transition-all"
            placeholder="Ex: João Silva"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
        >
          <label className="block text-zinc-500 text-xs font-bold uppercase mb-1 ml-1">E-mail</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c6fe1f]/50 focus:ring-2 focus:ring-[#c6fe1f]/20 transition-all"
            placeholder="Ex: joao@empresa.com"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <label className="block text-zinc-500 text-xs font-bold uppercase mb-1 ml-1">WhatsApp</label>
          <input 
            type="tel" 
            required 
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c6fe1f]/50 focus:ring-2 focus:ring-[#c6fe1f]/20 transition-all"
            placeholder="Ex: (11) 99999-9999"
          />
        </motion.div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="w-full py-4 bg-[#c6fe1f] hover:bg-white text-black rounded-xl font-bold uppercase tracking-widest text-sm mt-4 transition-all shadow-lg shadow-[#c6fe1f]/20"
        >
          Iniciar Diagnóstico
        </motion.button>
      </motion.form>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.1 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#c6fe1f]/30 transition-all"
        >
          <i className="fas fa-check-circle text-[#c6fe1f] mt-1"></i>
          <div>
            <h4 className="font-bold text-white text-xs">Perfil de Crescimento</h4>
            <p className="text-zinc-500 text-[10px]">Identificação precisa entre 5 perfis.</p>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.2 }}
          className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-[#c6fe1f]/30 transition-all"
        >
          <i className="fas fa-check-circle text-[#c6fe1f] mt-1"></i>
          <div>
            <h4 className="font-bold text-white text-xs">Metodologias Ágeis</h4>
            <p className="text-zinc-500 text-[10px]">5 frameworks essenciais gamificados.</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default WelcomeView;
