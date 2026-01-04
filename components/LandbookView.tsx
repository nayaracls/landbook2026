import React, { useMemo, useState, useEffect } from 'react';
import { BusinessData } from '../types';
import { motion } from 'framer-motion';

interface Props {
  data: BusinessData;
  content: string;
}

// Ícones simples usando FontAwesome (já carregado no index.html)
const Icon = ({ name, className = "w-6 h-6 text-black" }: { name: string; className?: string }) => (
  <i className={`fas fa-${name} ${className}`}></i>
);

const LandbookView: React.FC<Props> = ({ data, content }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    console.log('LandbookView montado. Content length:', content?.length || 0);
  }, [content]);

  // Validação: se não tem conteúdo, mostra erro
  if (!content || content.trim().length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Erro ao carregar conteúdo</h2>
          <p className="text-zinc-400">O conteúdo do diagnóstico não foi carregado. Por favor, recarregue a página.</p>
        </div>
      </div>
    );
  }

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
    let isMethodologySection = false;
    let currentMethodologyCard: React.ReactNode[] = [];
    let methodologyTitle = '';

    let inCodeBlock = false;
    let currentCodeBlock = '';

    const flushMethodologyCard = () => {
      if (currentMethodologyCard.length === 0) return;
      
      finalElements.push(
        <div key={`methodology-${finalElements.length}`} className="methodology-card break-inside-avoid my-4 bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]">
          {currentMethodologyCard}
        </div>
      );
      currentMethodologyCard = [];
      methodologyTitle = '';
    };

    const flushGroup = () => {
      flushMethodologyCard();
      if (currentGroup.length === 0) return;

      if (isPromptGroup) {
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

      if (cleanLine === '---' || cleanLine.match(/^[-]{3,}$/) || cleanLine.match(/^[—]{2,}$/)) {
        return;
      }

      if (line.includes('METODOLOGIAS ÁGEIS') || line.includes('METODOLOGIAS ESSENCIAIS') || line.includes('METODOLOGIAS PARA VOCÊ APLICAR')) {
        isMethodologySection = true;
      }

      if (isMethodologySection && line.includes('🎯')) {
        flushMethodologyCard();
        // Tenta múltiplos padrões para capturar o título
        let match = line.match(/🎯\s*\*\*([^*]+)\*\*/);
        if (!match) {
          match = line.match(/🎯\s*\[([^\]]+)\]/);
        }
        if (!match) {
          match = line.match(/🎯\s*(.+)/);
        }
        if (match) {
          methodologyTitle = match[1].trim();
          currentMethodologyCard.push(
            <h3 key={`meth-title-${lIndex}`} className="text-xl font-black text-[#c6fe1f] mb-3 uppercase" style={{
              fontSize: '1.25rem',
              fontWeight: '900',
              color: '#c6fe1f',
              marginBottom: '12px',
              textTransform: 'uppercase'
            }}>
              {methodologyTitle}
            </h3>
          );
        }
        return;
      }

      // Finaliza seção de metodologias quando encontrar nova seção principal (H1 ou H2)
      if (isMethodologySection && (line.startsWith('# ') || line.startsWith('## ')) && !line.includes('METODOLOGIAS')) {
        flushMethodologyCard();
        isMethodologySection = false;
      }

      if (isMethodologySection && currentMethodologyCard.length > 0) {
        const cleanText = cleanLine.replace(/\*\*/g, '');
        if (cleanText.trim()) {
          if (cleanText.includes('Nível de Prioridade:')) {
            const priorityMatch = cleanText.match(/Nível de Prioridade:\s*(.+)/);
            if (priorityMatch) {
              currentMethodologyCard.push(
                <div key={`meth-priority-${lIndex}`} className="mb-3 flex items-center gap-2">
                  <span className="text-xs text-zinc-400 font-bold">PRIORIDADE:</span>
                  <span className="text-[#c6fe1f] font-bold text-sm">{priorityMatch[1].trim()}</span>
                </div>
              );
            }
            return;
          }
          
          if (cleanText.startsWith('O que é:') || cleanText.startsWith('💡')) {
            const content = cleanText.replace(/^(💡\s*)?O que é:\s*/, '');
            if (content) {
              currentMethodologyCard.push(
                <div key={`meth-what-${lIndex}`} className="mb-3">
                  <span className="text-xs text-[#c6fe1f] font-bold uppercase mb-1 block">O que é:</span>
                  <p className="text-sm text-zinc-300">{content}</p>
                </div>
              );
            }
            return;
          }
          
          if (cleanText.startsWith('Quando usar:') || cleanText.startsWith('⏰')) {
            const content = cleanText.replace(/^(⏰\s*)?Quando usar:\s*/, '');
            if (content) {
              currentMethodologyCard.push(
                <div key={`meth-when-${lIndex}`} className="mb-3">
                  <span className="text-xs text-[#c6fe1f] font-bold uppercase mb-1 block">Quando usar:</span>
                  <p className="text-sm text-zinc-300">{content}</p>
                </div>
              );
            }
            return;
          }
          
          if (cleanText.startsWith('Como aplicar') || cleanText.startsWith('🚀')) {
            const content = cleanText.replace(/^(🚀\s*)?Como aplicar.*?:\s*/, '');
            if (content) {
              currentMethodologyCard.push(
                <div key={`meth-how-${lIndex}`} className="mb-3">
                  <span className="text-xs text-[#c6fe1f] font-bold uppercase mb-1 block">Como aplicar:</span>
                  <p className="text-sm text-zinc-300">{content}</p>
                </div>
              );
            }
            return;
          }
          
          if (cleanText.startsWith('Exemplo prático') || cleanText.startsWith('💼')) {
            const content = cleanText.replace(/^(💼\s*)?Exemplo prático.*?:\s*/, '');
            if (content) {
              currentMethodologyCard.push(
                <div key={`meth-example-${lIndex}`} className="mb-3 p-3 bg-black/30 rounded border-l-2 border-[#c6fe1f]/30">
                  <span className="text-xs text-[#c6fe1f] font-bold uppercase mb-1 block">Exemplo prático:</span>
                  <p className="text-sm text-zinc-300 italic">{content}</p>
                </div>
              );
            }
            return;
          }
          
          if (cleanText.startsWith('Resultado esperado:') || cleanText.startsWith('📊')) {
            const content = cleanText.replace(/^(📊\s*)?Resultado esperado:\s*/, '');
            if (content) {
              currentMethodologyCard.push(
                <div key={`meth-result-${lIndex}`} className="mb-3">
                  <span className="text-xs text-[#c6fe1f] font-bold uppercase mb-1 block">Resultado esperado:</span>
                  <p className="text-sm text-zinc-300 font-semibold">{content}</p>
                </div>
              );
            }
            return;
          }
          
          if (cleanText && !cleanText.match(/^\d+\./)) {
            currentMethodologyCard.push(
              <p key={`meth-text-${lIndex}`} className="text-sm text-zinc-400 mb-2">{cleanText}</p>
            );
          }
        }
        return;
      }

      if (line.includes('[QUEBRA]')) return;

      if (line.trim().startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          currentCodeBlock = '';
        } else {
          inCodeBlock = false;
          const blockContent = currentCodeBlock;
          currentGroup.push(
            <div key={`code-${lIndex}`} className="code-block-container relative group p-4 my-3 bg-[#0a0a0a] rounded-lg border border-[#333333]">
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
        return; // H1 será renderizado pelo card
      }

      if (line.startsWith('## ')) {
        flushGroup();
        isPromptGroup = true;
        currentGroup.push(
          <div key={`h2-${lIndex}`} className="bg-[#0d0d0d] border-l-4 border-[#c6fe1f] p-5 rounded mt-2 mb-4">
            <h2 className="h2-title mb-0 text-[#c6fe1f]" style={{ color: '#c6fe1f' }}>{cleanLine.replace('## ', '')}</h2>
          </div>
        );
        return;
      }

      if (line.startsWith('### ')) {
        currentGroup.push(
          <h3 key={`h3-${lIndex}`} className="text-xl font-bold text-white uppercase tracking-tight mt-6 mb-3" style={{ color: '#ffffff' }}>
            {cleanLine.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('- ') || line.startsWith('• ')) {
        currentGroup.push(
          <div key={`li-${lIndex}`} className="flex gap-4 items-start" style={{ 
            display: 'flex',
            gap: '16px',
            alignItems: 'flex-start',
            wordBreak: 'normal', 
            overflowWrap: 'break-word', 
            marginBottom: '0.75rem', 
            marginTop: '0.5rem',
            orphans: 2,
            widows: 2
          }}>
            <span className="text-[#c6fe1f] mt-1.5 flex-shrink-0 w-2 h-2 rounded-full bg-[#c6fe1f]" style={{
              color: '#c6fe1f',
              marginTop: '6px',
              flexShrink: 0,
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#c6fe1f'
            }}></span>
            <span className="text-zinc-300 text-sm leading-relaxed" style={{ 
              wordBreak: 'normal', 
              overflowWrap: 'break-word', 
              color: '#d1d5db',
              fontSize: '0.875rem',
              lineHeight: '1.75'
            }}>
              {cleanLine.substring(2)}
            </span>
          </div>
        );
      } else if (line.trim() !== '') {
        currentGroup.push(
          <p key={`p-${lIndex}`} className="body-text text-zinc-300 leading-relaxed" style={{ 
            wordBreak: 'break-word', 
            overflowWrap: 'break-word', 
            hyphens: 'auto', 
            marginBottom: '1.5rem', 
            marginTop: '0.5rem', 
            color: '#d1d5db',
            lineHeight: '1.75'
          }}>
            {cleanLine}
          </p>
        );
      }
    });

    flushGroup();
    flushMethodologyCard();
    return finalElements;
  };

  // Agrupa seções principais para cards
  interface GroupType {
    title: string;
    lines: string[];
    icon: React.ReactNode;
  }
  
  const mainSections = useMemo((): GroupType[] => {
    if (!content) return [];
    
    const allLines = content.split('\n');
    const grouped: GroupType[] = [];
    let currentGroup: GroupType | null = null;

    const getIconForTitle = (title: string): React.ReactNode => {
      const titleLower = title.toLowerCase();
      if (titleLower.includes('diagnóstico')) return <Icon name="bullseye" />;
      if (titleLower.includes('análise') || titleLower.includes('contexto')) return <Icon name="chart-line" />;
      if (titleLower.includes('causa raiz') || titleLower.includes('causa')) return <Icon name="lightbulb" />;
      if (titleLower.includes('anti-padrão') || titleLower.includes('padrão')) return <Icon name="bolt" />;
      if (titleLower.includes('práticas') || titleLower.includes('boas')) return <Icon name="check-circle" />;
      if (titleLower.includes('próximo passo') || titleLower.includes('passo')) return <Icon name="rocket" />;
      if (titleLower.includes('metodologias')) return <Icon name="book-open" />;
      if (titleLower.includes('ficha')) return <Icon name="file-alt" />;
      if (titleLower.includes('prompts')) return <Icon name="comment" />;
      return <Icon name="file-alt" />;
    };

    allLines.forEach((line) => {
      // Captura tanto H1 (# ) quanto H2 (## ) para agrupar seções
      if (line.startsWith('# ') || line.startsWith('## ')) {
        if (currentGroup && currentGroup.lines.length > 0) {
          grouped.push(currentGroup);
        }
        
        const title = line.replace(/^#+\s*/, '').trim();
        const icon = getIconForTitle(title);
        
        currentGroup = { title, lines: [], icon };
      } else if (currentGroup) {
        currentGroup.lines.push(line);
      } else if (grouped.length === 0) {
        currentGroup = { title: 'Diagnóstico', lines: [line], icon: <Icon name="bullseye" /> };
      } else if (grouped.length > 0) {
        const lastGroup = grouped[grouped.length - 1];
        lastGroup.lines.push(line);
      }
    });

    if (currentGroup !== null) {
      const group: GroupType = currentGroup;
      if (group.lines.length > 0) {
        grouped.push(group);
      }
    }

    return grouped;
  }, [content]);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <i className="fas fa-spinner fa-spin text-4xl text-[#c6fe1f] mb-4"></i>
          <p className="text-zinc-400">Carregando diagnóstico...</p>
        </div>
      </div>
    );
  }

  return (
    <div id="resultado-completo" className="min-h-screen bg-black text-white" style={{ 
      maxWidth: '794px', 
      margin: '0 auto', 
      padding: '40px 30px',
      boxSizing: 'border-box'
    }}>
      {/* Header com Score */}
      <div className="text-center mb-12" style={{ marginBottom: '48px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="inline-block mb-6"
          style={{ 
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'center',
            width: '100%'
          }}
        >
          <div className="w-32 h-32 rounded-full border-8 border-[#c6fe1f] flex items-center justify-center bg-[#0a0a0a]" style={{
            width: '128px',
            height: '128px',
            margin: '0 auto',
            borderWidth: '8px',
            borderColor: '#c6fe1f',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div className="text-center" style={{ textAlign: 'center' }}>
              <div className="text-4xl font-bold text-[#c6fe1f]" style={{ 
                fontSize: '2.25rem',
                fontWeight: '700',
                color: '#c6fe1f',
                textAlign: 'center'
              }}>
                100%
              </div>
              <div className="text-xs text-zinc-400 uppercase mt-1" style={{
                fontSize: '0.75rem',
                color: '#9ca3af',
                textTransform: 'uppercase',
                marginTop: '4px',
                textAlign: 'center'
              }}>
                COMPLETO
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black mb-2 text-white"
          style={{ 
            fontSize: '2.5rem',
            fontWeight: '900',
            marginBottom: '8px',
            textAlign: 'center',
            lineHeight: '1.1'
          }}
        >
          LANDBOOK 2026
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-[#c6fe1f] text-xl mb-2 font-bold"
          style={{ 
            color: '#c6fe1f',
            fontSize: '1.25rem',
            fontWeight: '700',
            marginBottom: '8px',
            textAlign: 'center'
          }}
        >
          CONSULTOR SÊNIOR LAND GROW
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-zinc-400 text-sm"
          style={{ 
            color: '#9ca3af',
            fontSize: '0.875rem',
            textAlign: 'center'
          }}
        >
          Diagnóstico gerado em {new Date().toLocaleDateString('pt-BR')}
        </motion.p>
      </div>

      {/* Grid de Cards - Seções Principais */}
      <div className="pb-12" style={{ paddingBottom: '48px' }}>
        {mainSections.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
              {mainSections.slice(0, 6).map((section, index) => (
                <motion.div
                  key={`card-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="bg-[#1a1a1a] rounded-lg p-6 border border-[#333333]"
                  style={{
                    backgroundColor: '#1a1a1a',
                    borderRadius: '8px',
                    padding: '24px',
                    border: '1px solid #333333',
                    marginBottom: '24px',
                    pageBreakInside: 'avoid',
                    breakInside: 'avoid'
                  }}
                >
                  <div className="flex items-center gap-3 mb-4" style={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <div className="w-10 h-10 rounded-lg bg-[#c6fe1f] flex items-center justify-center flex-shrink-0" style={{
                      width: '40px',
                      height: '40px',
                      backgroundColor: '#c6fe1f',
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {section.icon}
                    </div>
                    <h2 className="text-2xl font-bold text-[#c6fe1f]" style={{
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: '#c6fe1f',
                      margin: 0,
                      wordBreak: 'break-word',
                      overflowWrap: 'break-word'
                    }}>
                      {section.title}
                    </h2>
                  </div>
                  <div className="text-zinc-300 leading-relaxed" style={{
                    color: '#d1d5db',
                    lineHeight: '1.75',
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word',
                    hyphens: 'auto'
                  }}>
                    {renderSectionContent(section.lines)}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Metodologias e Prompts em seção especial */}
            {mainSections.slice(6).map((section, index) => (
              <motion.div
                key={`full-${index}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
                className="mt-8 bg-[#1a1a1a] rounded-lg p-8 border border-[#333333]"
                style={{
                  marginTop: '32px',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '8px',
                  padding: '32px',
                  border: '1px solid #333333',
                  pageBreakInside: 'avoid',
                  breakInside: 'avoid'
                }}
              >
                <div className="flex items-center gap-3 mb-6" style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  marginBottom: '24px'
                }}>
                  <div className="w-12 h-12 rounded-lg bg-[#c6fe1f] flex items-center justify-center flex-shrink-0" style={{
                    width: '48px',
                    height: '48px',
                    backgroundColor: '#c6fe1f',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {section.title.includes('METODOLOGIAS') ? <Icon name="book-open" /> :
                     section.title.includes('FICHA') ? <Icon name="file-alt" /> :
                     section.title.includes('PROMPTS') ? <Icon name="comment" /> :
                     <Icon name="chart-bar" />}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-[#c6fe1f]" style={{
                    fontSize: '1.75rem',
                    fontWeight: '700',
                    color: '#c6fe1f',
                    margin: 0,
                    wordBreak: 'break-word',
                    overflowWrap: 'break-word'
                  }}>
                    {section.title}
                  </h2>
                </div>
                <div className="text-zinc-300 leading-relaxed" style={{
                  color: '#d1d5db',
                  lineHeight: '1.75',
                  wordBreak: 'normal',
                  overflowWrap: 'break-word',
                  hyphens: 'none'
                }}>
                  {renderSectionContent(section.lines)}
                </div>
              </motion.div>
            ))}
          </>
        ) : (
          // Fallback: renderiza o conteúdo completo se não houver seções identificadas
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-[#1a1a1a] rounded-lg p-8 border border-[#333333]"
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '8px',
              padding: '32px',
              border: '1px solid #333333',
              pageBreakInside: 'avoid'
            }}
          >
            <div className="text-zinc-300 leading-relaxed" style={{
              color: '#d1d5db',
              lineHeight: '1.75',
              wordBreak: 'break-word',
              overflowWrap: 'break-word',
              hyphens: 'auto'
            }}>
              {renderSectionContent(content.split('\n'))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Call to Action Final */}
      <div className="pb-12 text-center" style={{
        paddingBottom: '48px',
        textAlign: 'center',
        pageBreakBefore: 'always'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5 }}
          className="p-12 border-2 border-[#c6fe1f] rounded-[40px] bg-[#050505]"
          style={{
            padding: '48px',
            border: '2px solid #c6fe1f',
            borderRadius: '40px',
            backgroundColor: '#050505',
            margin: '0 auto',
            maxWidth: '100%',
            pageBreakInside: 'avoid'
          }}
        >
          <h2 className="text-4xl font-black text-white uppercase mb-6 tracking-tighter" style={{
            fontSize: '2.25rem',
            fontWeight: '900',
            color: '#ffffff',
            textTransform: 'uppercase',
            marginBottom: '24px',
            textAlign: 'center',
            lineHeight: '1.1',
            letterSpacing: '-0.025em'
          }}>
            PRONTO PARA<br />
            <span style={{ color: '#c6fe1f' }}>A EXECUÇÃO?</span>
          </h2>
          <p className="text-zinc-400 text-lg mb-12 leading-relaxed" style={{
            color: '#9ca3af',
            fontSize: '1.125rem',
            marginBottom: '48px',
            lineHeight: '1.75',
            textAlign: 'center',
            wordBreak: 'break-word'
          }}>
            Sua estratégia está mapeada. O próximo nível de faturamento exige a precisão técnica que você tem em mãos.
          </p>
          <div className="no-print" style={{ textAlign: 'center', width: '100%' }}>
            <a
              href="https://linkareu.com/l/YJUgLb"
              target="_blank"
              className="bg-[#c6fe1f] text-black px-16 py-6 rounded-2xl font-black uppercase text-sm inline-block shadow-2xl shadow-[#c6fe1f]/20 hover:scale-105 transition-all"
              style={{
                backgroundColor: '#c6fe1f',
                color: '#000000',
                padding: '24px 64px',
                borderRadius: '16px',
                fontWeight: '900',
                textTransform: 'uppercase',
                fontSize: '0.875rem',
                display: 'inline-block',
                textDecoration: 'none',
                textAlign: 'center',
                margin: '0 auto'
              }}
            >
              AGENDAR IMPLEMENTAÇÃO
            </a>
          </div>
        </motion.div>

        <div className="mt-12 flex flex-col items-center" style={{
          marginTop: '48px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div className="w-12 h-1 bg-[#c6fe1f]/30 mb-4" style={{
            width: '48px',
            height: '4px',
            backgroundColor: 'rgba(198, 254, 31, 0.3)',
            marginBottom: '16px'
          }}></div>
          <p className="text-[9px] text-zinc-400 font-mono uppercase tracking-[0.6em]" style={{
            fontSize: '9px',
            color: '#9ca3af',
            fontFamily: 'monospace',
            textTransform: 'uppercase',
            letterSpacing: '0.6em'
          }}>
            ESTRATÉGIA LAND GROW © 2026
          </p>
        </div>
      </div>

      {/* Botão de Download */}
      <div className="no-print pb-12 text-center" style={{
        paddingBottom: '48px',
        textAlign: 'center'
      }}>
        <button
          id="download-button"
          onClick={async () => {
            try {
              const { generatePDF } = await import('../services/pdfService');
              await generatePDF(
                'resultado-completo',
                `Landbook_2026_Diagnostico_${new Date().toISOString().slice(0,10)}.pdf`
              );
            } catch (error: any) {
              console.error('❌ Erro ao gerar PDF:', error);
              alert(`Erro ao gerar PDF: ${error?.message || 'Tente novamente ou recarregue a página.'}`);
            }
          }}
          className="bg-[#c6fe1f] text-black px-8 py-4 rounded-lg font-bold text-lg hover:scale-105 transition-transform duration-200 flex items-center gap-2 mx-auto"
        >
          <i className="fas fa-file-pdf text-xl"></i>
          BAIXAR DIAGNÓSTICO EM PDF
        </button>
      </div>
    </div>
  );
};

export default LandbookView;
