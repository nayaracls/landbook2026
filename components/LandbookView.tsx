import React from 'react';
import { BusinessData } from '../types';

interface Props {
  data: BusinessData;
  content: string;
}

const LandbookView: React.FC<Props> = ({ data, content }) => {
  const handleDownload = () => {
    const element = document.getElementById('landbook-pdf-content');
    if (!element) return;

    const opt = {
      margin: 0,
      filename: `Landbook_2026_${data.companyName.replace(/\s+/g, '_')}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        backgroundColor: '#000000',
        width: 794,
        scrollY: 0
      },
      jsPDF: {
        unit: 'mm',
        format: 'a4',
        orientation: 'portrait'
      },
      pagebreak: { mode: ['css', 'legacy'] },
      enableLinks: true
    };

    // @ts-ignore
    html2pdf().set(opt).from(element).save();
  };

  const copyPrompt = (text: string) => {
    const match = text.match(/```(?:markdown|)\n?([\s\S]*?)```/);
    const textToCopy = match ? match[1] : text.replace(/```/g, '');
    navigator.clipboard.writeText(textToCopy);
    alert('Copiado para a área de transferência!');
  };

  const renderSectionContent = (lines: string[]) => {
    let finalElements: React.ReactNode[] = [];
    let currentGroup: React.ReactNode[] = [];
    let isPromptGroup = false;

    let inCodeBlock = false;
    let currentCodeBlock = '';

    const flushGroup = () => {
      if (currentGroup.length === 0) return;

      if (isPromptGroup) {
        // Grupo H2+Content: Mantém junto e adiciona margem vertical para "respiro"
        finalElements.push(
          <div key={`group-${finalElements.length}`} className="break-inside-avoid mb-6 mt-2 relative" style={{ pageBreakInside: 'avoid' }}>
            {currentGroup}
          </div>
        );
      } else {
        finalElements.push(...currentGroup);
      }
      currentGroup = [];
      isPromptGroup = false;
    };

    lines.forEach((line, lIndex) => {
      const cleanLine = line.replace(/\*\*\*/g, '').replace(/\*\*/g, '').trim();

      // Ignora tags de quebra para permitir fluxo natural (pack tight)
      if (line.includes('[QUEBRA]')) return;

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          currentCodeBlock = '';
        } else {
          inCodeBlock = false;
          const blockContent = currentCodeBlock;
          currentGroup.push(
            <div key={`code-${lIndex}`} className="code-block-container relative group p-4 my-3">
              <div className="flex justify-between items-center mb-2 border-b border-white/5 pb-2 no-print">
                <span className="text-[#c6fe1f] font-bold uppercase tracking-widest text-[10px]">COPIAR ESTE COMANDO:</span>
                <button onClick={() => copyPrompt('```markdown\n' + blockContent + '\n```')} className="bg-[#c6fe1f] text-black hover:bg-white px-3 py-1 rounded text-[10px] font-bold transition-all uppercase mb-0">
                  <i className="fas fa-copy mr-1"></i> Copiar
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-zinc-300 leading-relaxed font-mono text-[10px] md:text-[11px] overflow-hidden">{blockContent}</pre>
            </div>
          );
        }
        return;
      }

      if (inCodeBlock) {
        currentCodeBlock += line + '\n';
        return;
      }

      if (line.startsWith('# ')) {
        flushGroup();
        // H1: REMOVIDA A QUEBRA FORÇADA. Agora flui naturalmente.
        // Adicionada margem superior generosa (mt-16) para separar seções visualmente sem quebrar página.
        // Exception: Se for o primeiro elemento, sem margem.
        const isFirst = finalElements.length === 0;
        finalElements.push(
          <h1 key={`h1-${lIndex}`} className={`h1-title pt-4 pb-4 ${isFirst ? 'mt-0' : 'mt-16 border-t border-white/10'}`} style={{ breakAfter: 'avoid' }}>
            {cleanLine.replace('# ', '')}
          </h1>
        );
        return;
      }

      if (line.startsWith('## ')) {
        flushGroup();
        isPromptGroup = true;
        // H2 Title
        currentGroup.push(
          <div key={`h2-${lIndex}`} className="bg-[#0d0d0d] border-l-4 border-[#c6fe1f] p-5 rounded mt-2 mb-4">
            <h2 className="h2-title mb-0">{cleanLine.replace('## ', '')}</h2>
          </div>
        );
        return;
      }

      if (line.startsWith('### ')) {
        currentGroup.push(
          <div key={`h3-${lIndex}`} className="flex flex-col mt-6 mb-3">
            <div className="step-indicator">GO</div>
            <h3 className="text-xl font-bold text-white uppercase tracking-tight">{cleanLine.replace('### ', '')}</h3>
          </div>
        );
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        currentGroup.push(
          <div key={`li-${lIndex}`} className="flex gap-4 items-start my-2">
            <span className="text-[#c6fe1f] mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#c6fe1f]"></span>
            <span className="text-zinc-300 text-sm leading-relaxed">{cleanLine.substring(2)}</span>
          </div>
        );
      } else if (line.trim() !== '') {
        currentGroup.push(<p key={`p-${lIndex}`} className="body-text mb-3 break-inside-avoid">{cleanLine}</p>);
      }
    });

    flushGroup();
    return finalElements;
  };

  return (
    <div className="animate-fadeIn pb-20">
      <div className="no-print mb-8 flex flex-col items-center gap-4 sticky top-6 z-50">
        <button
          onClick={handleDownload}
          className="flex items-center gap-3 bg-[#c6fe1f] hover:bg-white text-black px-12 py-5 rounded-2xl shadow-2xl shadow-[#c6fe1f]/40 transition-all text-sm font-black uppercase tracking-widest active:scale-95"
        >
          <i className="fas fa-file-pdf text-xl"></i> EXPORTAR PARA IMPRESSÃO (A4)
        </button>
      </div>

      <div id="landbook-pdf-content">
        <div className="pdf-content-wrapper">
          {/* Capa Estruturada */}
          <div className="cover-page">
            <div className="relative">
              <div className="w-20 h-20 bg-[#c6fe1f] flex items-center justify-center mb-20 rounded-xl shadow-2xl shadow-[#c6fe1f]/30">
                <i className="fas fa-chess-knight text-black text-4xl"></i>
              </div>

              <p className="text-[#c6fe1f] font-black text-[11px] tracking-[0.4em] uppercase mb-6">LAND GROW INTELLIGENCE</p>

              <div className="flex flex-col gap-2">
                <h1 className="text-[80px] md:text-[100px] font-black text-white leading-[0.8] uppercase tracking-tighter">
                  LANDBOOK
                </h1>
                <h1 className="text-[80px] md:text-[100px] font-black text-[#c6fe1f] leading-[0.8] uppercase tracking-tighter">
                  2026
                </h1>
              </div>

              <div className="w-48 h-4 bg-[#c6fe1f] mt-16"></div>
            </div>

            <div className="border-t border-white/10 pt-16 pb-10">
              <div className="space-y-2 mb-12">
                <p className="text-zinc-500 font-bold text-[11px] uppercase tracking-[0.2em]">DOCUMENTO PREPARADO PARA:</p>
                <p className="text-white font-black text-5xl uppercase tracking-tighter leading-none">{data.userName}</p>
                <p className="text-[#c6fe1f] font-black text-2xl uppercase tracking-tight">{data.companyName}</p>
              </div>

            </div>
          </div>

          {/* Conteúdo Fluido */}
          <div className="pt-8">
            {renderSectionContent(content.split('\n'))}
          </div>

          {/* Call to Action Final */}
          <div className="page-break" style={{ margin: 0 }}></div>
          <div className="min-h-[50vh] flex flex-col justify-center items-center text-center py-20">
            <div className="max-w-lg p-12 border-2 border-[#c6fe1f] rounded-[40px] bg-[#050505]">
              <h2 className="text-4xl font-black text-white uppercase mb-6 tracking-tighter">PRONTO PARA<br /><span className="text-[#c6fe1f]">A EXECUÇÃO?</span></h2>
              <p className="text-zinc-400 text-lg mb-12 leading-relaxed">
                Sua estratégia está mapeada. O próximo nível de faturamento exige a precisão técnica que você tem em mãos.
              </p>
              <div className="no-print">
                <a
                  href="https://linkareu.com/l/YJUgLb"
                  target="_blank"
                  className="bg-[#c6fe1f] text-black px-16 py-6 rounded-2xl font-black uppercase text-sm inline-block shadow-2xl shadow-[#c6fe1f]/20 hover:scale-105 transition-all"
                >
                  AGENDAR IMPLEMENTAÇÃO
                </a>
              </div>
            </div>

            <div className="mt-20 flex flex-col items-center">
              <div className="w-12 h-1 bg-[#c6fe1f]/30 mb-4"></div>
              <p className="text-[9px] text-zinc-800 font-mono uppercase tracking-[0.6em]">ESTRATÉGIA LAND GROW © 2026</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandbookView;
