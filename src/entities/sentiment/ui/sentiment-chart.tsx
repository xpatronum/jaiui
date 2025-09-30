import React from "react";
import Plot from "react-plotly.js";
import type { Layout as PlotlyLayout } from "plotly.js";
import { useSentimentStore } from "../model/sentiment-store";

export const SentimentChart: React.FC = () => {
  const { aggregatedData, isLoading, aggregationLevel } = useSentimentStore();

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-white">Загрузка данных...</div>
      </div>
    );
  }

  if (!aggregatedData || aggregatedData.dates.length === 0) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="text-white">Нет данных для отображения</div>
      </div>
    );
  }

  const dates = aggregatedData.dates.map(timestamp => new Date(timestamp * 1000));

  const chartData = [
    {
      x: dates,
      y: aggregatedData.positives,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Позитивные',
      line: { 
        color: '#10B981', 
        width: 3,
        shape: 'spline' as const
      },
      marker: {
        color: '#10B981',
        size: 6,
        symbol: 'circle' as const
      },
      hovertemplate: 'Позитивные: %{y:.1f}<br>Дата: %{x}<extra></extra>'
    },
    {
      x: dates,
      y: aggregatedData.negatives,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Негативные',
      line: { 
        color: '#EF4444', 
        width: 3,
        shape: 'spline' as const
      },
      marker: {
        color: '#EF4444',
        size: 6,
        symbol: 'circle' as const
      },
      hovertemplate: 'Негативные: %{y:.1f}<br>Дата: %{x}<extra></extra>'
    },
    {
      x: dates,
      y: aggregatedData.neutrals,
      type: 'scatter' as const,
      mode: 'lines+markers' as const,
      name: 'Нейтральные',
      line: { 
        color: '#6B7280', 
        width: 3,
        shape: 'spline' as const
      },
      marker: {
        color: '#6B7280',
        size: 6,
        symbol: 'circle' as const
      },
      hovertemplate: 'Нейтральные: %{y:.1f}<br>Дата: %{x}<extra></extra>'
    }
  ];

  const aggregationLabels = {
    day: 'дням',
    week: 'неделям',
    month: 'месяцам',
    year: 'годам'
  };

  const layout: Partial<PlotlyLayout> = {
    title: {
      text: `Тональности отзывов по времени (агрегация по ${aggregationLabels[aggregationLevel]})`,
      font: { color: '#FFFFFF', size: 16 }
    },
    xaxis: {
      title: {
        text: "Дата",
        font: { color: '#FFFFFF', size: 12 }
      },
      type: "date",
      gridcolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      tickfont: { color: '#FFFFFF' },
      linecolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      zerolinecolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      showgrid: true
    },
    yaxis: {
      title: {
        text: "Среднее количество отзывов",
        font: { color: '#FFFFFF', size: 12 }
      },
      gridcolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      tickfont: { color: '#FFFFFF' },
      linecolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      zerolinecolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      showgrid: true
    },
    plot_bgcolor: 'rgba(0,0,0,0)',
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: {
      color: '#FFFFFF'
    },
    legend: {
      bgcolor: 'rgba(0, 0, 0, 0)',
      font: { color: '#FFFFFF' },
      bordercolor: 'rgba(156, 163, 175, 0.5)', // ИЗМЕНИЛ: с прозрачностью 50%
      borderwidth: 1
    },
    height: 500,
    margin: {
      l: 60,
      r: 40,
      t: 60,
      b: 60
    },
    hovermode: 'closest' as const
  };

  return (
    <Plot
      data={chartData}
      layout={layout}
      config={{
        displayModeBar: false,
        displaylogo: false,
        responsive: true,
        modeBarButtonsToRemove: ['pan2d', 'lasso2d', 'select2d']
      }}
      style={{ width: '100%', height: '100%' }}
    />
  );
};