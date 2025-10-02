import React, { useState, useMemo, useRef, useEffect } from "react";
import { useSentimentStore } from "../model/sentiment-store";

interface DateRangePickerProps {
  type: 'start' | 'end';
  currentDate: Date;
  onDateChange: (timestamp: number) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  currentDate,
  onDateChange
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localDate, setLocalDate] = useState(currentDate);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { originalData } = useSentimentStore();

  // Синхронизируем localDate с currentDate при изменении извне
  useEffect(() => {
    setLocalDate(currentDate);
  }, [currentDate]);

  // Закрытие при клике вне календаря
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setIsOpen(false);
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
    if (!isOpen) {
      // При открытии календаря сбрасываем localDate на currentDate
      setLocalDate(currentDate);
    }
    setIsOpen(!isOpen);
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
  const getAvailableMonths = (year: number) => {
    if (!minDate || !maxDate) return [];
    
    const months = [];
    
    // Создаем диапазон месяцев с учетом граничных дат
    const startMonth = year === minDate.getFullYear() ? minDate.getMonth() : 0;
    const endMonth = year === maxDate.getFullYear() ? maxDate.getMonth() : 11;
    
    for (let month = startMonth; month <= endMonth; month++) {
      months.push(month);
    }
    
    return months;
  };

  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const handleYearChange = (year: number) => {
    const newDate = new Date(localDate);
    newDate.setFullYear(year);
    
    // Получаем доступные месяцы для нового года
    const availableMonthsForYear = getAvailableMonths(year);
    
    // Корректируем месяц, если он недоступен для выбранного года
    if (!availableMonthsForYear.includes(newDate.getMonth())) {
      newDate.setMonth(availableMonthsForYear[0] || 0);
    }
    
    // Корректируем день, если он выходит за пределы доступного диапазона
    const daysInMonth = new Date(year, newDate.getMonth() + 1, 0).getDate();
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }
    
    setLocalDate(newDate);
  };

  const handleMonthChange = (month: number) => {
    const newDate = new Date(localDate);
    newDate.setMonth(month);
    
    // Корректируем день, если он выходит за пределы доступного диапазона
    const daysInMonth = new Date(newDate.getFullYear(), month + 1, 0).getDate();
    if (newDate.getDate() > daysInMonth) {
      newDate.setDate(daysInMonth);
    }
    
    setLocalDate(newDate);
  };

  const handleDaySelect = (day: number) => {
    const newDate = new Date(localDate);
    newDate.setDate(day);
    onDateChange(Math.floor(newDate.getTime() / 1000));
    setIsOpen(false);
  };

  // Генерация дней месяца
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    // Корректируем для отображения с понедельника
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
  };

  const renderCalendar = () => {
    if (!localDate || !minDate || !maxDate) return null;
    
    const year = localDate.getFullYear();
    const month = localDate.getMonth();
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
      const isSelected = localDate.getDate() === day && 
                        localDate.getMonth() === month && 
                        localDate.getFullYear() === year;
      const isToday = new Date().toDateString() === date.toDateString();
      
      days.push(
        <button
          key={day}
          onClick={() => isAvailable && handleDaySelect(day)}
          disabled={!isAvailable}
          className={`w-8 h-8 rounded text-sm flex items-center justify-center transition-colors
            ${isSelected 
              ? 'bg-blue-500 text-white' 
              : isToday
                ? 'border border-blue-300 text-white'
                : isAvailable
                  ? 'text-white hover:bg-gray-600'
                  : 'text-gray-500 cursor-not-allowed'
            }`}
          title={isAvailable ? date.toLocaleDateString('ru-RU') : 'Дата недоступна'}
        >
          {day}
        </button>
      );
    }
    
    return days;
  };

  if (!minDate || !maxDate) {
    return (
      <div className="px-3 py-2 bg-base-300 text-gray-500 rounded border border-base-content/20 w-40 text-left">
        Нет данных
      </div>
    );
  }

  const availableMonths = getAvailableMonths(localDate.getFullYear());

  return (
    <div className="relative" ref={calendarRef}>
      <button
        onClick={toggleCalendar}
        className="px-3 py-2 bg-base-300 text-white rounded border border-base-content/20 w-40 text-left hover:bg-base-300/80 transition-colors flex justify-between items-center"
      >
        <span>{currentDate.toLocaleDateString('ru-RU')}</span>
        <span className="text-xs">▼</span>
      </button>
      
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 bg-base-200 rounded-lg shadow-lg border border-base-content/20 p-4 z-50 w-64">
          {/* Селекторы года и месяца */}
          <div className="flex gap-2 mb-4">
            <select
              value={localDate.getFullYear()}
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
              value={localDate.getMonth()}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              className="flex-1 px-2 py-1 bg-base-300 text-white rounded border border-base-content/20 text-sm bg-no-repeat bg-[center_right_0.5rem] bg-[length:12px_10px] pr-6 appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")`
              }}
            >
              {availableMonths.map(month => (
                <option key={month} value={month}>
                  {monthNames[month].substring(0, 3)}
                </option>
              ))}
            </select>
          </div>
          
          {/* Календарь */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {/* Заголовки дней недели */}
            {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
              <div key={day} className="text-xs text-gray-400 font-medium py-1">
                {day}
              </div>
            ))}
            
            {/* Дни */}
            {renderCalendar()}
          </div>
          
          {/* Информация о диапазоне */}
          <div className="mt-3 text-xs text-gray-400 text-center border-t border-base-content/20 pt-2">
            Диапазон: {minDate.toLocaleDateString('ru-RU')} - {maxDate.toLocaleDateString('ru-RU')}
          </div>
        </div>
      )}
    </div>
  );
};