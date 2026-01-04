import React from 'react';
import { motion } from 'framer-motion';
import { BusinessData, ProfileType } from '../types';

interface Props {
  data: BusinessData;
  onNext: () => void;
  isLoading: boolean;
  error: string | null;
}

const DiagnosisView: React.FC<Props> = ({ data, onNext, isLoading, error }) => {
  const getProfileDescription = (profile: ProfileType | string | undefined) => {
    switch (profile) {
      case ProfileType.TEORICO:
        return "Você planeja bem, mas tem dificuldade em executar. As ideias ficam no papel enquanto a concorrência avança.";
      case ProfileType.PASSIVO_COMERCIAL:
        return "Processos e financeiro estão organizados, mas falta tração de vendas. Você tem a máquina, mas precisa de uma estratégia de demanda eficiente.";
      case ProfileType.INEFICIENTE:
        return "Há muito retrabalho e problemas de entrega. A falta de processos claros gera custos extras e insatisfação.";
      case ProfileType.URGENCIA:
        return "Você vive no modo urgente, apagando incêndios constantemente. A falta de planejamento gera estresse e sobrecarga.";
      case ProfileType.REATIVO:
        return "Sua rotina é focada no operacional imediato. A empresa é centrada em você, e sem processos claros, o crescimento gera sobrecarga excessiva.";
      case ProfileType.DISPERSO:
        return "Você tem muitas ideias, mas a falta de processos documentados e a dependência da sua operação estão limitando sua escala. É hora de estruturar para crescer.";
      case ProfileType.SEM_METAS:
        return "Falta clareza sobre onde você quer chegar. Sem metas definidas, é difícil tomar decisões estratégicas eficazes.";
      case ProfileType.CENTRALIZADOR:
        return "Você é o motor e o freio da empresa. A falta de processos e delegação impede que o time produza sem a sua supervisão constante.";
      case ProfileType.DESESTRUTURADO:
        return "Falta organização nas funções e processos. Cada um faz do seu jeito, gerando inconsistências e conflitos.";
      case ProfileType.CEGO_FINANCEIRO:
        return "Sua maior vulnerabilidade é a falta de visibilidade sobre os números. Escalar sem clareza financeira é perigoso para a sustentabilidade do negócio.";
      default:
        return "Análise em andamento. O diagnóstico completo está sendo gerado para você.";
    }
  };

  const getProfileIcon = (profile: ProfileType | string | undefined) => {
    const iconMap: Record<string, string> = {
      [ProfileType.TEORICO]: '📋',
      [ProfileType.PASSIVO_COMERCIAL]: '📈',
      [ProfileType.INEFICIENTE]: '⚙️',
      [ProfileType.URGENCIA]: '🔥',
      [ProfileType.REATIVO]: '⚡',
      [ProfileType.DISPERSO]: '💡',
      [ProfileType.SEM_METAS]: '🎯',
      [ProfileType.CENTRALIZADOR]: '👤',
      [ProfileType.DESESTRUTURADO]: '🔧',
      [ProfileType.CEGO_FINANCEIRO]: '💰',
    };
    return iconMap[profile as string] || '📊';
  };

  const getPriorityAction = (profile: ProfileType | string | undefined) => {
    const actions: Record<string, string> = {
      [ProfileType.TEORICO]: "Criar sistema de execução com prazos",
      [ProfileType.PASSIVO_COMERCIAL]: "Escalar canais de aquisição",
      [ProfileType.INEFICIENTE]: "Documentar processos críticos",
      [ProfileType.URGENCIA]: "Estruturar planejamento semanal",
      [ProfileType.REATIVO]: "Estruturar delegação operacional",
      [ProfileType.DISPERSO]: "Focar em uma única estratégia",
      [ProfileType.SEM_METAS]: "Definir metas mensuráveis",
      [ProfileType.CENTRALIZADOR]: "Documentar e delegar processos",
      [ProfileType.DESESTRUTURADO]: "Organizar funções e responsabilidades",
      [ProfileType.CEGO_FINANCEIRO]: "Implantar gestão financeira rigorosa",
    };
    return actions[profile as string] || "Ver diagnóstico completo abaixo";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass rounded-2xl p-8 md:p-12 border border-white/10 shadow-2xl max-w-4xl mx-auto"
    >
      {/* Header animado */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-10"
      >
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="inline-block px-4 py-1 mb-4 rounded-full bg-[#c6fe1f]/10 text-[#c6fe1f] text-[10px] font-bold tracking-widest uppercase border border-[#c6fe1f]/30"
        >
          ✓ Diagnóstico Concluído
        </motion.div>
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-2xl font-bold mb-4 text-white"
        >
          Perfil de Crescimento
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
          className="flex items-center justify-center gap-3 mb-2"
        >
          <span className="text-5xl">{getProfileIcon(data.profile)}</span>
          <div className="text-4xl md:text-5xl font-black text-[#c6fe1f] uppercase tracking-tighter">
            {data.profile}
          </div>
        </motion.div>
      </motion.div>

      {/* Cards em grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Card Resumo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#c6fe1f]/30 transition-all"
        >
          <h4 className="text-[#c6fe1f] font-bold mb-3 text-sm flex items-center gap-2">
            <span>📊</span> Resumo da Situação
          </h4>
          <p className="text-zinc-300 text-sm leading-relaxed">
            {getProfileDescription(data.profile || ProfileType.REATIVO)}
          </p>
        </motion.div>

        {/* Card Ação Prioritária */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7 }}
          className="p-6 rounded-xl border-2 border-[#c6fe1f]/50 bg-[#c6fe1f]/5 hover:bg-[#c6fe1f]/10 transition-all"
        >
          <h4 className="text-[#c6fe1f] font-bold mb-3 text-xs uppercase tracking-widest flex items-center gap-2">
            <span>⚡</span> Ação Prioritária
          </h4>
          <p className="text-white font-bold text-lg leading-snug">
            {getPriorityAction(data.profile)}
          </p>
        </motion.div>
      </div>

      {/* Botão de ação */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="border-t border-white/10 pt-10 text-center space-y-4"
      >
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
          >
            <div className="flex items-center gap-2 justify-center">
              <i className="fas fa-exclamation-circle"></i>
              <span>{error}</span>
            </div>
            <p className="mt-2 text-xs text-red-400/70">
              Verifique se as variáveis de ambiente estão configuradas corretamente no Vercel.
            </p>
          </motion.div>
        )}
        <motion.button
          onClick={onNext}
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="btn-primary w-full md:w-auto px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 mx-auto disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#c6fe1f]/20"
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i> Criando Landbook...
            </>
          ) : (
            <>
              Ver Landbook 2026 Completo <i className="fas fa-arrow-right"></i>
            </>
          )}
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default DiagnosisView;
