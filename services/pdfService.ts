import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDF = async (elementId: string, filename: string): Promise<void> => {
  const button = document.getElementById('download-button') || document.querySelector('.download-button') as HTMLButtonElement;
  
  if (button) {
    button.style.display = 'none';
  }

  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Elemento com id "${elementId}" não encontrado para gerar PDF`);
  }

  const originalButtonDisplay = button ? button.style.display : '';

  try {
    await document.fonts.ready;
    await new Promise(resolve => setTimeout(resolve, 800));

    // Força visibilidade e cores
    element.style.setProperty('display', 'block', 'important');
    element.style.setProperty('visibility', 'visible', 'important');
    element.style.setProperty('opacity', '1', 'important');
    element.style.setProperty('background-color', '#000000', 'important');

    // Força cores em todos os elementos
    const applyColors = (el: Element) => {
      const htmlEl = el as HTMLElement;
      const tagName = htmlEl.tagName.toLowerCase();
      const classes = htmlEl.className || '';

      htmlEl.style.setProperty('opacity', '1', 'important');
      htmlEl.style.setProperty('visibility', 'visible', 'important');

      if (htmlEl.textContent && htmlEl.textContent.trim()) {
        if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || 
            classes.includes('h1-title') || classes.includes('h2-title')) {
          htmlEl.style.setProperty('color', '#ffffff', 'important');
        } else if (classes.includes('c6fe1f')) {
          htmlEl.style.setProperty('color', '#c6fe1f', 'important');
        } else if (tagName === 'p' || tagName === 'span' || tagName === 'div' || tagName === 'li') {
          const computed = window.getComputedStyle(htmlEl).color;
          if (!computed || computed === 'rgb(0, 0, 0)' || computed === 'black') {
            htmlEl.style.setProperty('color', '#d1d5db', 'important');
          }
        }
      }

      Array.from(htmlEl.children).forEach(child => applyColors(child));
    };

    applyColors(element);

    // Captura o elemento exatamente como aparece no navegador
    const canvas = await html2canvas(element, {
      scale: 2, // Scale 2 para manter qualidade sem aumentar muito o tamanho
      useCORS: true,
      allowTaint: true,
      logging: false,
      backgroundColor: '#000000',
      width: element.scrollWidth,
      height: element.scrollHeight,
      windowWidth: element.scrollWidth,
      windowHeight: element.scrollHeight,
      scrollX: 0,
      scrollY: 0,
      imageTimeout: 30000,
      removeContainer: false,
      foreignObjectRendering: false, // Desabilita para melhor compatibilidade
      onclone: (clonedDoc) => {
        const clonedElement = clonedDoc.getElementById(elementId);
        if (clonedElement) {
          clonedElement.querySelectorAll('.no-print').forEach(el => el.remove());
          
          // Mantém exatamente como está no navegador - apenas garante visibilidade
          // Não altera estilos para manter fidelidade visual
          const ensureVisibility = (el: Element) => {
            const htmlEl = el as HTMLElement;
            htmlEl.style.setProperty('opacity', '1', 'important');
            htmlEl.style.setProperty('visibility', 'visible', 'important');
            Array.from(htmlEl.children).forEach(child => ensureVisibility(child));
          };
          
          ensureVisibility(clonedElement);
        }
      }
    });

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth(); // 210mm
    const pdfHeight = pdf.internal.pageSize.getHeight(); // 297mm
    
    // Padding interno maior para melhor espaçamento e alinhamento
    const padding = 10; // 10mm para espaçamento interno adequado
    const contentWidth = pdfWidth - (padding * 2); // 190mm
    const contentHeight = pdfHeight - (padding * 2); // 277mm
    
    // Define fundo preto para todas as páginas
    pdf.setFillColor(0, 0, 0);
    
    // Calcula dimensões mantendo proporção
    const imgWidth = contentWidth; // mm
    const imgHeight = (canvas.height * contentWidth) / canvas.width; // mm
    
    let yPosition = padding; // Posição Y no PDF
    let sourceY = 0; // Posição Y no canvas (pixels)
    
    const canvasHeight = canvas.height;
    // Altura de conteúdo por página em pixels do canvas
    // Converte altura de conteúdo em mm para pixels mantendo proporção do canvas
    const pageHeightInPixels = (contentHeight / contentWidth) * canvas.width;
    
    // Margem de segurança de 4% para evitar cortes no meio de elementos
    const safePageHeightPx = pageHeightInPixels * 0.96;
    
    // Primeira página - preenche fundo preto completo
    pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
    
    // Divide o canvas em páginas com margem de segurança maior
    while (sourceY < canvasHeight) {
      if (sourceY > 0) {
        pdf.addPage();
        // Preenche fundo preto completo na nova página
        pdf.rect(0, 0, pdfWidth, pdfHeight, 'F');
        yPosition = padding;
      }
      
      const remaining = canvasHeight - sourceY;
      // Usa altura segura para evitar cortes
      const safeHeight = Math.min(safePageHeightPx, remaining);
      // Arredonda para baixo para evitar cortes parciais de elementos
      const pageHeight = Math.floor(safeHeight);
      
      // Cria canvas temporário para esta página
      const pageCanvas = document.createElement('canvas');
      pageCanvas.width = canvas.width;
      pageCanvas.height = pageHeight;
      const pageCtx = pageCanvas.getContext('2d');
      
      if (!pageCtx) {
        throw new Error('Não foi possível criar contexto do canvas');
      }
      
      // Preenche fundo preto completo
      pageCtx.fillStyle = '#000000';
      pageCtx.fillRect(0, 0, pageCanvas.width, pageCanvas.height);
      
      // Copia a parte correspondente do canvas original
      pageCtx.drawImage(
        canvas,
        0, sourceY,
        canvas.width, pageHeight,
        0, 0,
        canvas.width, pageHeight
      );
      
      const pageImgData = pageCanvas.toDataURL('image/png', 1.0); // Qualidade máxima
      const pageImgHeight = (pageHeight / canvas.width) * imgWidth; // mm
      
      // Adiciona a imagem na página com alinhamento consistente
      pdf.addImage(pageImgData, 'PNG', padding, yPosition, imgWidth, pageImgHeight, undefined, 'FAST');
      
      sourceY += pageHeight;
    }

    if (button) {
      button.style.display = originalButtonDisplay || 'block';
    }
    
    pdf.save(filename);
    console.log('✅ PDF gerado com sucesso');
  } catch (error) {
    console.error('❌ Erro ao gerar PDF:', error);
    if (button) {
      button.style.display = originalButtonDisplay || 'block';
    }
    throw error;
  }
};
