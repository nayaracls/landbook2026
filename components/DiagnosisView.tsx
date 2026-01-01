
import React from 'react';
import { BusinessData, ProfileType } from '../types';

interface Props {
  data: BusinessData;
  onNext: () => void;
  isLoading: boolean;
}

const DiagnosisView: React.FC<Props> = ({ data, onNext, isLoading }) => {
  // Fixing errors: ProfileType properties updated to match existing enum values in types.ts
  const getProfileDescription = (profile: ProfileType | string | undefined) => {
    switch (profile) {
      case ProfileType.DISPERSO:
        return "Você tem muitas ideias, mas a falta de processos documentados e a dependência da sua operação estão limitando sua escala. É hora de estruturar para crescer.";
      case ProfileType.REATIVO:
        return "Sua rotina é focada no operacional imediato. A empresa é centrada em você, e sem processos claros, o crescimento gera sobrecarga excessiva.";
      case ProfileType.PASSIVO_COMERCIAL:
        return "Processos e financeiro estão organizados, mas falta tração de vendas. Você tem a máquina, mas precisa de uma estratégia de demanda eficiente.";
      case ProfileType.CEGO_FINANCEIRO:
        return "Sua maior vulnerabilidade é a falta de visibilidade sobre os números. Escalar sem clareza financeira é perigoso para a sustentabilidade do negócio.";
      case ProfileType.CENTRALIZADOR:
        return "Você é o motor e o freio da empresa. A falta de processos e delegação impede que o time produza sem a sua supervisão constante.";
      case "O perfil escalador agressivo":
        return "O negócio tem tração. O desafio agora é escalar com qualidade e manter a rentabilidade enquanto o time cresce.";
      default:
        return "Seu negócio apresenta desafios de estruturação que exigem processos claros e visão estratégica para destravar o próximo nível de faturamento.";
    }
  };

  return (
    <div className="glass rounded-2xl p-8 md:p-12 border border-white/10 animate-fadeIn">
      <div className="text-center mb-10">
        <div className="inline-block px-4 py-1 mb-4 rounded-full bg-[#c6fe1f]/10 text-[#c6fe1f] text-[10px] font-bold tracking-widest uppercase border border-[#c6fe1f]/30">
          Diagnóstico Concluído
        </div>
        <h2 className="text-2xl font-bold mb-2">Perfil de Crescimento:</h2>
        <div className="text-4xl md:text-5xl font-black gradient-text uppercase tracking-tighter mt-4">
          {data.profile}
        </div>
      </div>

      <div className="max-w-2xl mx-auto space-y-6 mb-10">
        <div className="p-6 rounded-xl bg-white/5 border border-white/5">
          <h4 className="text-[#c6fe1f] font-bold mb-3 text-sm">Resumo da Situação:</h4>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {/* Correcting ProfileType access and handling fallback */}
            {getProfileDescription(data.profile || ProfileType.REATIVO)}
          </p>
        </div>

        <div className="p-6 rounded-xl border border-[#c6fe1f]/30 bg-[#c6fe1f]/5 text-center">
          <h4 className="text-[#c6fe1f] font-bold mb-2 text-xs uppercase tracking-widest">Ação Prioritária:</h4>
          <p className="text-white font-bold text-xl">
            {/* Fixing ProfileType property access errors */}
            {data.profile === ProfileType.DISPERSO && "Documentar processos críticos"}
            {data.profile === ProfileType.REATIVO && "Estruturar delegação operacional"}
            {data.profile === ProfileType.PASSIVO_COMERCIAL && "Escalar canais de aquisição"}
            {data.profile === ProfileType.CEGO_FINANCEIRO && "Implantar gestão financeira rigorosa"}
            {data.profile === ProfileType.CENTRALIZADOR && "Documentar e delegar processos"}
            {data.profile === "O perfil escalador agressivo" && "Otimizar gestão por indicadores"}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 pt-10 text-center">
        <button 
          onClick={onNext}
          disabled={isLoading}
          className="btn-primary w-full md:w-auto px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-3 mx-auto"
        >
          {isLoading ? (
            <>
              <i className="fas fa-circle-notch fa-spin"></i> Criando Landbook...
            </>
          ) : (
            <>
              Ver Landbook 2026 <i className="fas fa-arrow-right"></i>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default DiagnosisView;
