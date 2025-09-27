import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useReportStore } from "../model/report-store";
import { usePlotlyImageExport } from "../lib/plotly-export";

const DownloadChartButton = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { exportChartAsImage } = usePlotlyImageExport();
  const { timeRange } = useReportStore();

  const handleDownload = async () => {
    setIsExporting(true);
    
    try {
      // Ищем видимый график на странице
      const chartElement = document.querySelector('.js-plotly-plot') as HTMLElement;
      if (!chartElement) {
        console.error('Chart element not found');
        alert('График не найден на странице');
        return;
      }

      const startDate = timeRange.start.toISOString().split('T')[0];
      const endDate = timeRange.end.toISOString().split('T')[0];
      const filename = `отчеты-${startDate}-${endDate}`;

      await exportChartAsImage(chartElement, filename);
    } catch (error) {
      console.error('Error exporting chart:', error);
      alert('Не удалось экспортировать график');
    } finally {
      setIsExporting(false);
    }
  };

  return (  
    <button
      onClick={handleDownload}
      disabled={isExporting}
      className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200 font-medium"
      title="Скачать график как изображение"
    >
      <ArrowDownTrayIcon className="size-5" />
      {isExporting ? 'Скачивание...' : 'Скачать график'}
    </button>
  );
};

export { DownloadChartButton };