import { DateRangePicker } from "./date-range-picker";

const ChartSettingsPanel = () => {
  return (
    <div className="bg-base-200 rounded-lg p-4 mb-6">
      <h3 className="text-white text-lg font-semibold mb-4">Настройки графика</h3>
      
      <div className="flex items-center gap-4">
        <span className="text-white font-medium">Временной диапазон:</span>
        <DateRangePicker />
      </div>
      
      {/* Здесь можно добавить другие настройки в будущем */}
      <div className="mt-4 text-sm text-gray-400">
        График автоматически группирует данные по дням, неделям или месяцам в зависимости от выбранного диапазона
      </div>
    </div>
  );
};

export { ChartSettingsPanel };