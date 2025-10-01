import axios from "axios";

import { useStatsStore } from "@/entities/stats";
import { usePollingStore } from "@/entities/polling";

import { useSentimentStore, type SentimentData } from "./sentiment-store";
import { useEffect } from "react";

export const useLoadSentimentData = () => {
  const { setData, setIsLoading, setError } = useSentimentStore();

  const loadSentimentData = async (file: File) => {
    setIsLoading(true);
    setError(null);

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);

      // Валидация данных
      if (
        !jsonData.positives ||
        !jsonData.negatives ||
        !jsonData.neutrals ||
        !jsonData.dates
      ) {
        throw new Error(
          "Неверный формат файла. Ожидаются поля: positives, negatives, neutrals, dates",
        );
      }

      if (
        jsonData.positives.length !== 1024 ||
        jsonData.negatives.length !== 1024 ||
        jsonData.neutrals.length !== 1024 ||
        jsonData.dates.length !== 1024
      ) {
        throw new Error("Все массивы должны содержать ровно 1024 элемента");
      }

      setData(jsonData as unknown as SentimentData);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Ошибка загрузки файла",
      );
      console.error("Ошибка загрузки данных тональностей:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { loadSentimentData };
};

export const usePostSentimentData = () => {
  const { timeRange, setData, setIsLoading, setError } = useSentimentStore();
  const { uuid } = useStatsStore((state) => state);
  const { isPolling, progress } = usePollingStore((state) => state);

  useEffect(() => {
    const postSentimentData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        await axios
          .post("/ts_render", {
            uuid,
            start_date: timeRange.start,
            end_date: timeRange.end,
          })
          .then((response) => {
            if (response.status === 200) {
              setData(response.data as unknown as SentimentData);
            }
          });
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Ошибка загрузки файла",
        );
      } finally {
        setIsLoading(false);
      }
    };

    if (!isPolling && progress === 100) {
      postSentimentData();
    }
  }, [isPolling, progress, timeRange, setData, setError, setIsLoading, uuid]);
};
