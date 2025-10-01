import { useSentimentStore } from "../model";

import { SentimentFilters } from "./sentiment-filters";
import { UploadSentimentFileButton } from "./upload-sentiment-file-button";

export const SentimentConfigPanel = () => {
  const { aggregatedData } = useSentimentStore();

  const hasData = aggregatedData && aggregatedData.dates.length > 0;

  return (
    <div className="bg-base-200 rounded-lg p-4">
      <h3 className="mb-4 text-lg font-semibold text-white">
        Панель конфигурирования графиком
      </h3>

      <div className="space-y-4">
        {hasData ? (
          <>
            <div>
              <h4 className="mb-2 ml-4 font-medium text-white">
                Временной диапазон отчетности
              </h4>
              <SentimentFilters />
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
