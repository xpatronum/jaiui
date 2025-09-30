import React from "react";
import { useSentimentStore } from "../model/sentiment-store";
import { SentimentFilters } from "./sentiment-filters";
import { UploadSentimentFileButton } from "./upload-sentiment-file-button";

export const SentimentConfigPanel: React.FC = () => {
  const { aggregatedData, clearData } = useSentimentStore();

  const hasData = aggregatedData && aggregatedData.dates.length > 0;

  const handleReset = () => {
    clearData();
  };

  return (
    <div className="bg-base-200 rounded-lg p-4">
      <h3 className="text-white text-lg font-semibold mb-4">
        Панель конфигурирования графиком
      </h3>
      
      <div className="space-y-4">
        {hasData ? (
          <>
            <div>
              <h4 className="text-white font-medium mb-2 ml-4">
                Временной диапазон отчетности
              </h4>
              <SentimentFilters />
            </div>
            
            <div className="flex gap-2 ml-4">
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
              >
                Сбросить график
              </button>
            </div>
          </>
        ) : (
          <div className="ml-4">
            <UploadSentimentFileButton />
          </div>
        )}
      </div>
    </div>
  );
};