import React from "react";
import { useSentimentStore } from "../model/sentiment-store";
import { DateRangePicker } from "./date-range-picker";

export const SentimentFilters: React.FC = () => {
  const { 
    timeRange, 
    aggregationLevel, 
    setTimeRange, 
    setAggregationLevel,
  } = useSentimentStore();

  const handleStartDateChange = (date: Date) => {
    setTimeRange(date, timeRange.end);
  };

  const handleEndDateChange = (date: Date) => {
    setTimeRange(timeRange.start, date);
  };

  const handleAggregationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAggregationLevel(e.target.value as 'day' | 'week' | 'month' | 'year');
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg">
      <div className="flex gap-4 items-end flex-wrap ml-4">
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm">Начальная дата:</label>
          <DateRangePicker
            type="start"
            currentDate={timeRange.start}
            onDateChange={handleStartDateChange}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm">Конечная дата:</label>
          <DateRangePicker
            type="end"
            currentDate={timeRange.end}
            onDateChange={handleEndDateChange}
          />
        </div>
        
        <div className="flex flex-col gap-2">
          <label className="text-white text-sm">Агрегация:</label>
          <select
            value={aggregationLevel}
            onChange={handleAggregationChange}
            className="px-3 py-2 bg-base-300 text-white rounded border border-base-content/20 h-[42px] bg-no-repeat bg-[center_right_1rem] bg-[length:16px_14px] pr-8 appearance-none"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 4 5'%3E%3Cpath fill='%23ffffff' d='M2 0L0 2h4zm0 5L0 3h4z'/%3E%3C/svg%3E")`
            }}
          >
            <option value="day">По дням</option>
            <option value="week">По неделям</option>
            <option value="month">По месяцам</option>
            <option value="year">По годам</option>
          </select>
        </div>
      </div>
    </div>
  );
};