import { useCallback } from 'react';

export const usePlotlyImageExport = () => {
  const exportChartAsImage = useCallback(async (chartElement: HTMLElement, filename: string) => {
    try {
      // Находим график Plotly
      const plotlyChart = chartElement.querySelector('.js-plotly-plot') as any;
      
      if (plotlyChart && typeof (window as any).Plotly !== 'undefined') {
        // Используем глобальный Plotly (если подключен через CDN)
        const Plotly = (window as any).Plotly;
        
        const dataUrl = await Plotly.toImage(plotlyChart, {
          format: 'png',
          width: plotlyChart.offsetWidth,
          height: plotlyChart.offsetHeight,
          scale: 2
        });

        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
        
      } else if (plotlyChart && plotlyChart.toImage) {
        // Если у элемента есть встроенный метод toImage
        const dataUrl = await plotlyChart.toImage({
          format: 'png',
          width: plotlyChart.offsetWidth,
          height: plotlyChart.offsetHeight,
          scale: 2
        });

        const link = document.createElement('a');
        link.download = `${filename}.png`;
        link.href = dataUrl;
        link.click();
        
      } else {
        // Fallback на SVG экспорт
        await exportAsSVG(chartElement, filename);
      }
    } catch (error) {
      console.error('Export error:', error);
      // Final fallback
      await exportAsSVG(chartElement, filename);
    }
  }, []);

  return { exportChartAsImage };
};

// Функция exportAsSVG остается той же
const exportAsSVG = async (chartElement: HTMLElement, filename: string) => {
  try {
    const svgElement = chartElement.querySelector('svg');
    if (!svgElement) throw new Error('SVG element not found');

    const svgData = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);

    const img = new Image();
    
    return new Promise((resolve) => {
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = svgElement.clientWidth || 800;
        canvas.height = svgElement.clientHeight || 600;
        
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = '#1f2937';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          
          const link = document.createElement('a');
          link.download = `${filename}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          
          URL.revokeObjectURL(svgUrl);
          resolve(true);
        }
      };
      
      img.src = svgUrl;
    });
  } catch (error) {
    console.error('SVG export error:', error);
    throw error;
  }
};