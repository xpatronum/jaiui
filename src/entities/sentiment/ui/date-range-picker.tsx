import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSentimentStore } from "../model/sentiment-store";

// Контекст для управления открытыми календарями
const OpenCalendarContext = React.createContext<{
  openCalendar: string | null;
  setOpenCalendar: (id: string | null) => void;
}>({
  openCalendar: null,
  setOpenCalendar: () => {},
});

interface DateRangePickerProps {
  type: 'start' | 'end';
  currentDate: Date;
  onDateChange: (date: Date) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  type,
  currentDate,
  onDateChange
}) => {
  const [openCalendar, setOpenCalendar] = useState<string | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { originalData } = useSentimentStore();

  const isOpen = openCalendar === type;

  // Закрытие при клике вне календаря
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setOpenCalendar(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleCalendar = () => {
    setOpenCalendar(isOpen ? null : type);
  };

  // Получаем доступные даты из данных
  const availableDates = useMemo(() => {
    if (!originalData?.dates.length) return [];
    return originalData.dates
      .map(timestamp => new Date(timestamp * 1000))
      .sort((a, b) => a.getTime() - b.getTime());
  }, [originalData]);

  // Получаем минимальную и максимальную даты
  const minDate = availableDates[0];
  const maxDate = availableDates[availableDates.length - 1];

  // Получаем доступные годы
  const availableYears = useMemo(() => {
    if (!minDate || !maxDate) return [];
    const years = new Set<number>();
    for (let year = minDate.getFullYear(); year <= maxDate.getFullYear(); year++) {
      years.add(year);
    }
    return Array.from(years).sort();
  }, [minDate, maxDate]);

  // Получаем доступные месяцы для выбранного года
  const availableMonths = useMemo(() => {
    if (!currentDate || !minDate || !maxDate) return [];
    
    const year = currentDate.getFullYear();
    const months = [];
    
    for (let month = 0; month < 12; month++) {
      const testDate = new Date(year, month, 1);
      if (testDate >= minDate && testDate <= maxDate) {
        months.push(month);
      }
    }
    
    return months;
  }, [currentDate, minDate, maxDate]);

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const handleYearChange = (year: number) => {
    const newDate = new Date(currentDate);
    newDate.setFullYear(year);
    
    // Корректируем месяц, если он недоступен для выбранного года
    const availableMonthsForYear = availableMonths;
    if (!availableMonthsForYear.includes(newDate.getMonth())) {
      newDate.setMonth(availableMonthsForYear[0] || 0);
    }
    
    onDateChange(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(month);
    onDateChange(newDate);
  };

  const handleDaySelect = (day: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(day);
    onDateChange(newDate);
    setOpenCalendar(null);
  };

  // Генерация дней месяца
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const renderCalendar = () => {
    if (!currentDate) return null;
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfMonth(year, month);
    
    const days = [];
    
    // Пустые ячейки для первых дней
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-8 h-8"></div>);
    }
    
    // Дни месяца
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const isAvailable = date >= minDate && date <= maxDate;
      const isSelected = currentDate.getDate() === day;
      
      days.push(
        <button
          key={day}
          onClick={() => isAvailable && handleDaySelect(day)}
          disabled={!isAvailable}
          className={`w-8 h-8 rounded text-sm flex items-center justify-center
            ${isSelected ? 'bg-blue-500 text-white' : ''}
            ${isAvailable 
              ? 'hover:bg-gray-600 text-white' 
              : 'text-gray-500 cursor-not-allowed'
            }`}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  if (!minDate || !maxDate) return null;

  return (
    <OpenCalendarContext.Provider value={{ openCalendar, setOpenCalendar }}>
      <div className="relative" ref={calendarRef}>
        <button
          onClick={toggleCalendar}
          className="px-3 py-2 bg-base-300 text-white rounded border border-base-content/20 w-40 text-left"
        >
          {currentDate.toLocaleDateString('ru-RU')}
        </button>
        
        {isOpen && (
          <div className="absolute top-full left-0 mt-2 bg-base-200 rounded-lg shadow-lg border border-base-content/20 p-4 z-10 w-64">
            {/* Селекторы года и месяца */}
            <div className="flex gap-2 mb-4">
              <select
                value={currentDate.getFullYear()}
                onChange={(e) => handleYearChange(Number(e.target.value))}
                className="flex-1 px-2 py-1 bg-base-300 text-white rounded border border-base-content/20 text-sm bg-no-repeat bg-[center_right_0.5rem] bg-[length:12px_10px] pr-6 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")`
                }}
              >
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
              
              <select
                value={currentDate.getMonth()}
                onChange={(e) => handleMonthChange(Number(e.target.value))}
                className="flex-1 px-2 py-1 bg-base-300 text-white rounded border border-base-content/20 text-sm bg-no-repeat bg-[center_right_0.5rem] bg-[length:12px_10px] pr-6 appearance-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")`
                }}
              >
                {availableMonths.map(month => (
                  <option key={month} value={month}>
                    {monthNames[month]}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Календарь */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {/* Заголовки дней недели */}
              {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                <div key={day} className="text-xs text-gray-400 font-medium">
                  {day}
                </div>
              ))}
              
              {/* Дни */}
              {renderCalendar()}
            </div>
            
            {/* Информация о диапазоне */}
            <div className="mt-3 text-xs text-gray-400 text-center">
              Доступно: {minDate.toLocaleDateString('ru-RU')} - {maxDate.toLocaleDateString('ru-RU')}
            </div>
          </div>
        )}
      </div>
    </OpenCalendarContext.Provider>
  );
};