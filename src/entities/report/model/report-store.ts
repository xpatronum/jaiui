import { create } from "zustand";

// Тип для одного отчета
interface Report {
  id: string;
  timestamp: Date;
  title: string;
}

// Состояние
interface ReportState {
  reports: Report[];
  timeRange: {
    start: Date;
    end: Date;
  };
  isLoading: boolean;
}

// Действия
interface ReportActions {
  setTimeRange: (start: Date, end: Date) => void;
  setReports: (reports: Report[]) => void;
  setIsLoading: (loading: boolean) => void;
}

type ReportStore = ReportState & ReportActions;

// Начальное состояние - последние 30 дней
const initialStartDate = new Date();
initialStartDate.setDate(initialStartDate.getDate() - 30);

const initialState: ReportState = {
  reports: [],
  timeRange: {
    start: initialStartDate,
    end: new Date(),
  },
  isLoading: false,
};

export const useReportStore = create<ReportStore>()((set) => ({
  ...initialState,

  setTimeRange: (start, end) => {
    // Валидация дат
    let validatedStart = new Date(start);
    let validatedEnd = new Date(end);
    
    // Если начальная дата больше конечной, меняем их местами
    if (validatedStart > validatedEnd) {
      [validatedStart, validatedEnd] = [validatedEnd, validatedStart];
    }
    
    // Ограничение: нельзя выбирать даты из будущего
    const now = new Date();
    if (validatedEnd > now) {
      validatedEnd = new Date(now);
    }
    if (validatedStart > now) {
      validatedStart = new Date(now);
    }
    
    // Ограничение: максимальный диапазон - 5 лет (опционально)
    const maxRange = 5 * 365 * 24 * 60 * 60 * 1000; // 5 лет в миллисекундах
    if (validatedEnd.getTime() - validatedStart.getTime() > maxRange) {
      validatedStart = new Date(validatedEnd.getTime() - maxRange);
    }

    set((state) => ({
      ...state,
      timeRange: { 
        start: validatedStart, 
        end: validatedEnd 
      },
    }));
  },

  setReports: (reports) =>
    set((state) => ({
      ...state,
      reports,
    })),

  setIsLoading: (isLoading) =>
    set((state) => ({
      ...state,
      isLoading,
    })),
}));