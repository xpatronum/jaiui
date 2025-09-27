import { CalendarIcon } from "@heroicons/react/24/solid";
import { Popover } from "radix-ui";
import { useReportStore } from "../model/report-store";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ru } from 'date-fns/locale';

// Кастомные стили для react-datepicker
const customStyles = `
  .react-datepicker {
    font-family: inherit;
    border: 1px solid #374151;
    border-radius: 0.5rem;
    background-color: #1f2937;
    color: white;
    box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  }

  .react-datepicker__header {
    background-color: #111827;
    border-bottom: 1px solid #374151;
    border-radius: 0.5rem 0.5rem 0 0;
  }

  .react-datepicker__current-month {
    color: white;
    font-weight: 600;
  }

  .react-datepicker__day-name {
    color: #9ca3af;
  }

  .react-datepicker__day {
    color: #f3f4f6;
    border-radius: 0.375rem;
  }

  .react-datepicker__day:hover {
    background-color: #374151;
  }

  .react-datepicker__day--selected {
    background-color: #2563eb;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: #1d4ed8;
  }

  .react-datepicker__day--today {
    background-color: #374151;
    color: #60a5fa;
  }

  .react-datepicker__day--outside-month {
    color: #6b7280;
  }

  .react-datepicker__navigation:hover {
    background-color: #374151;
  }

  .react-datepicker__year-select,
  .react-datepicker__month-select {
    background-color: #374151;
    color: white;
    border: 1px solid #4b5563;
  }
`;

const DateRangePicker = () => {
  const { timeRange, setTimeRange } = useReportStore();
  const [startOpen, setStartOpen] = useState(false);
  const [endOpen, setEndOpen] = useState(false);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU');
  };

  const maxDate = new Date();
  const minDate = new Date();
  minDate.setFullYear(maxDate.getFullYear() - 5); // Минимальная дата - 5 лет назад

  return (
    <div className="flex gap-4 items-center">
      <style>{customStyles}</style>
      
      {/* Кнопка выбора начальной даты */}
      <Popover.Root open={startOpen} onOpenChange={setStartOpen}>
        <Popover.Trigger asChild>
          <button className="bg-base-200 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-base-300 transition-colors duration-200 border border-base-300 font-medium">
            <CalendarIcon className="size-5" />
            {formatDate(timeRange.start)}
          </button>
        </Popover.Trigger>
        <Popover.Content 
          className="bg-base-200 rounded-lg border border-base-300 shadow-xl"
          sideOffset={5}
          align="start"
        >
          <DatePicker
            selected={timeRange.start}
            onChange={(date: Date | null) => {
              if (date) {
                setTimeRange(date, timeRange.end);
                setStartOpen(false);
              }
            }}
            inline
            showPopperArrow={false}
            locale={ru}
            dateFormat="dd.MM.yyyy"
            calendarStartDay={1}
            minDate={minDate} // Нельзя выбрать дату раньше чем 5 лет назад
            maxDate={timeRange.end} // Нельзя выбрать дату позже конечной
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={6} // Показывать 6 лет в выпадающем списке (5 лет + текущий)
          />
        </Popover.Content>
      </Popover.Root>

      <span className="text-white font-medium text-lg">—</span>

      {/* Кнопка выбора конечной даты */}
      <Popover.Root open={endOpen} onOpenChange={setEndOpen}>
        <Popover.Trigger asChild>
          <button className="bg-base-200 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-base-300 transition-colors duration-200 border border-base-300 font-medium">
            <CalendarIcon className="size-5" />
            {formatDate(timeRange.end)}
          </button>
        </Popover.Trigger>
        <Popover.Content 
          className="bg-base-200 rounded-lg border border-base-300 shadow-xl"
          sideOffset={5}
          align="start"
        >
          <DatePicker
            selected={timeRange.end}
            onChange={(date: Date | null) => {
              if (date) {
                setTimeRange(timeRange.start, date);
                setEndOpen(false);
              }
            }}
            inline
            showPopperArrow={false}
            locale={ru}
            dateFormat="dd.MM.yyyy"
            calendarStartDay={1}
            minDate={timeRange.start} // Нельзя выбрать дату раньше начальной
            maxDate={maxDate} // Нельзя выбрать дату в будущем
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            yearDropdownItemNumber={6} // Показывать 6 лет в выпадающем списке (5 лет + текущий)
          />
        </Popover.Content>
      </Popover.Root>
    </div>
  );
};

export { DateRangePicker };