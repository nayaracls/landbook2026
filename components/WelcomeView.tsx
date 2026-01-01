
import React, { useState } from 'react';

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
    <div className="glass rounded-2xl p-8 md:p-12 text-center border border-white/5 shadow-2xl animate-fadeIn">
      <div className="flex justify-center mb-8">
        <div className="w-20 h-20 rounded-2xl bg-[#c6fe1f] flex items-center justify-center shadow-lg shadow-[#c6fe1f]/20">
          <i className="fas fa-chess-knight text-black text-3xl"></i>
        </div>
      </div>
      
      <h2 className="text-2xl md:text-3xl font-bold mb-4">
        Olá! Sou o assistente estratégico da Land Grow.
      </h2>
      
      <p className="text-zinc-400 mb-8 max-w-2xl mx-auto leading-relaxed text-sm">
        Preencha seus dados para começarmos a jornada de 10 perguntas que revelarão o perfil de crescimento do seu negócio. No final, você receberá o Landbook 2026 completo.
      </p>

      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4 text-left mb-10">
        <div>
          <label className="block text-zinc-500 text-xs font-bold uppercase mb-1 ml-1">Seu Nome</label>
          <input 
            type="text" 
            required 
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c6fe1f]/50 transition-all"
            placeholder="Ex: João Silva"
          />
        </div>
        <div>
          <label className="block text-zinc-500 text-xs font-bold uppercase mb-1 ml-1">E-mail</label>
          <input 
            type="email" 
            required 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c6fe1f]/50 transition-all"
            placeholder="Ex: joao@empresa.com"
          />
        </div>
        <div>
          <label className="block text-zinc-500 text-xs font-bold uppercase mb-1 ml-1">WhatsApp</label>
          <input 
            type="tel" 
            required 
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#c6fe1f]/50 transition-all"
            placeholder="Ex: (11) 99999-9999"
          />
        </div>

        <button 
          type="submit"
          className="btn-primary w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm mt-4"
        >
          Iniciar Diagnóstico
        </button>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
          <i className="fas fa-check-circle text-[#c6fe1f] mt-1"></i>
          <div>
            <h4 className="font-bold text-white text-xs">Perfil de Crescimento</h4>
            <p className="text-zinc-500 text-[10px]">Identificação precisa entre 5 perfis.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/5">
          <i className="fas fa-check-circle text-[#c6fe1f] mt-1"></i>
          <div>
            <h4 className="font-bold text-white text-xs">Metodologias Ágeis</h4>
            <p className="text-zinc-500 text-[10px]">10 frameworks adaptados ao seu momento.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeView;
