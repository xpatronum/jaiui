import { create } from "zustand";

export interface SentimentData {
  positives: number[];
  negatives: number[];
  neutrals: number[];
  dates: number[];
}

interface SentimentState {
  originalData: SentimentData | null;
  filteredData: SentimentData | null;
  aggregatedData: SentimentData | null;
  isLoading: boolean;
  error: string | null;
  timeRange: {
    start: Date;
    end: Date;
  };
  aggregationLevel: 'day' | 'week' | 'month' | 'year';
}

interface SentimentActions {
  setData: (data: SentimentData) => void;
  setTimeRange: (start: Date, end: Date) => void;
  setAggregationLevel: (level: 'day' | 'week' | 'month' | 'year') => void;
  setIsLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearData: () => void;
}

type SentimentStore = SentimentState & SentimentActions;

// Начальное состояние - последние 30 дней
const initialStartDate = new Date();
initialStartDate.setDate(initialStartDate.getDate() - 30);

const initialState: SentimentState = {
  originalData: null,
  filteredData: null,
  aggregatedData: null,
  isLoading: false,
  error: null,
  timeRange: {
    start: initialStartDate,
    end: new Date(),
  },
  aggregationLevel: 'week'
};

export const useSentimentStore = create<SentimentStore>()((set, get) => ({
  ...initialState,

  setData: (data) => {
    const { timeRange, aggregationLevel } = get();
    
    // Фильтруем данные по временному диапазону
    const filtered = filterDataByTimeRange(data, timeRange);
    
    // Агрегируем данные
    const aggregated = aggregateData(filtered, aggregationLevel);
    
    set({
      originalData: data,
      filteredData: filtered,
      aggregatedData: aggregated,
      error: null,
    });
  },

  setTimeRange: (start, end) => {
    let validatedStart = new Date(start);
    let validatedEnd = new Date(end);
    
    // Валидация дат
    if (validatedStart > validatedEnd) {
      [validatedStart, validatedEnd] = [validatedEnd, validatedStart];
    }

    set((state) => {
      const newTimeRange = { start: validatedStart, end: validatedEnd };
      
      if (state.originalData) {
        const filtered = filterDataByTimeRange(state.originalData, newTimeRange);
        const aggregated = aggregateData(filtered, state.aggregationLevel);
        
        return {
          ...state,
          timeRange: newTimeRange,
          filteredData: filtered,
          aggregatedData: aggregated
        };
      }
      
      return { ...state, timeRange: newTimeRange };
    });
  },

  setAggregationLevel: (aggregationLevel) =>
    set((state) => {
      if (state.filteredData) {
        const aggregated = aggregateData(state.filteredData, aggregationLevel);
        return { ...state, aggregationLevel, aggregatedData: aggregated };
      }
      return { ...state, aggregationLevel };
    }),

  setIsLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
  clearData: () => set({ 
    originalData: null, 
    filteredData: null, 
    aggregatedData: null, 
    error: null 
  }),
}));

// Функция фильтрации данных по временному диапазону
function filterDataByTimeRange(data: SentimentData, timeRange: { start: Date; end: Date }): SentimentData {
  const startTime = timeRange.start.getTime() / 1000;
  const endTime = timeRange.end.getTime() / 1000;
  
  const indices = data.dates
    .map((date, index) => ({ date, index }))
    .filter(({ date }) => date >= startTime && date <= endTime)
    .map(({ index }) => index);

  return {
    positives: indices.map(i => data.positives[i]),
    negatives: indices.map(i => data.negatives[i]),
    neutrals: indices.map(i => data.neutrals[i]),
    dates: indices.map(i => data.dates[i]),
  };
}

// Функция агрегации данных
function aggregateData(data: SentimentData, level: 'day' | 'week' | 'month' | 'year'): SentimentData {
  if (data.dates.length === 0) return data;
  
  const aggregated: SentimentData = {
    positives: [],
    negatives: [],
    neutrals: [],
    dates: []
  };

  // Группируем данные по временным интервалам
  const groups = new Map<string, { positives: number[]; negatives: number[]; neutrals: number[]; date: number }>();
  
  data.dates.forEach((timestamp, index) => {
    const date = new Date(timestamp * 1000);
    let key: string;
    
    // Используем отдельные блоки для каждого case
    if (level === 'day') {
      key = date.toISOString().split('T')[0];
    } else if (level === 'week') {
      const weekStart = new Date(date);
      weekStart.setDate(date.getDate() - date.getDay());
      key = weekStart.toISOString().split('T')[0];
    } else if (level === 'month') {
      key = `${date.getFullYear()}-${date.getMonth()}`;
    } else if (level === 'year') {
      key = date.getFullYear().toString();
    } else {
      key = date.toISOString().split('T')[0];
    }
    
    if (!groups.has(key)) {
      groups.set(key, { 
        positives: [], 
        negatives: [], 
        neutrals: [], 
        date: timestamp 
      });
    }
    
    const group = groups.get(key)!;
    group.positives.push(data.positives[index]);
    group.negatives.push(data.negatives[index]);
    group.neutrals.push(data.neutrals[index]);
    // Используем минимальную дату в группе как репрезентативную
    group.date = Math.min(group.date, timestamp);
  });
  
  // Вычисляем средние значения для каждой группы
  Array.from(groups.entries())
    .sort(([, a], [, b]) => a.date - b.date)
    .forEach(([, group]) => {
      aggregated.dates.push(group.date);
      aggregated.positives.push(average(group.positives));
      aggregated.negatives.push(average(group.negatives));
      aggregated.neutrals.push(average(group.neutrals));
    });
  
  return aggregated;
}

function average(arr: number[]): number {
  return arr.reduce((sum, val) => sum + val, 0) / arr.length;
}