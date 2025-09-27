import Plot from 'react-plotly.js';
import { useReportStore } from "../model/report-store";

const ReportsChart = () => {
  const { reports, timeRange } = useReportStore();

  // Фильтруем отчеты по выбранному диапазону
  const filteredReports = reports.filter(report => 
    report.timestamp >= timeRange.start && report.timestamp <= timeRange.end
  );

  // Определяем тип группировки в зависимости от диапазона
  const getGroupByType = () => {
    const diffTime = Math.abs(timeRange.end.getTime() - timeRange.start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 31) return 'day';        // До 1 месяца - по дням
    if (diffDays <= 93) return 'week';       // До 3 месяцев - по неделям
    return 'month';                          // Больше - по месяцам
  };

  const groupBy = getGroupByType();

  // Группируем данные в зависимости от типа группировки
  const groupedData: { [key: string]: number } = {};
  
  filteredReports.forEach(report => {
    let dateKey: string;
    
    if (groupBy === 'day') {
      dateKey = report.timestamp.toISOString().split('T')[0]; // YYYY-MM-DD
    } else if (groupBy === 'week') {
      const weekStart = new Date(report.timestamp);
      weekStart.setDate(report.timestamp.getDate() - report.timestamp.getDay());
      dateKey = weekStart.toISOString().split('T')[0]; // Начало недели
    } else {
      dateKey = `${report.timestamp.getFullYear()}-${(report.timestamp.getMonth() + 1).toString().padStart(2, '0')}`; // YYYY-MM
    }
    
    groupedData[dateKey] = (groupedData[dateKey] || 0) + 1;
  });

  // Подготавливаем данные для графика
  const dates = Object.keys(groupedData).sort();
  const counts = dates.map(date => groupedData[date]);

  // Форматируем подписи дат для оси X
  const formattedDates = dates.map(date => {
    if (groupBy === 'day') {
      return new Date(date).toLocaleDateString('ru-RU');
    } else if (groupBy === 'week') {
      const weekEnd = new Date(date);
      weekEnd.setDate(weekEnd.getDate() + 6);
      return `${new Date(date).toLocaleDateString('ru-RU')} - ${weekEnd.toLocaleDateString('ru-RU')}`;
    } else {
      const [year, month] = date.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('ru-RU', { 
        year: 'numeric', 
        month: 'long' 
      });
    }
  });

  const chartData = [{
    x: formattedDates,
    y: counts,
    type: 'scatter' as const,
    mode: 'lines+markers' as const,
    marker: { color: '#3b82f6' },
    line: { shape: 'spline' as const, color: '#3b82f6' }
  }];

  const layout = {
    title: {
      text: `Количество отчетов по ${groupBy === 'day' ? 'дням' : groupBy === 'week' ? 'неделям' : 'месяцам'}`,
      font: { color: '#ffffff' }
    },
    xaxis: { 
      title: { text: 'Период' },
      color: '#ffffff',
      tickangle: groupBy === 'week' ? -45 : 0
    },
    yaxis: { 
      title: { text: 'Количество отчетов' },
      color: '#ffffff' 
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: '#ffffff' }
  };

  return (
    <div className="w-full h-96 bg-base-200 rounded-lg p-4">
      <Plot
        data={chartData}
        layout={layout}
        config={{ displayModeBar: false }}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export { ReportsChart };