import { useSentimentStore } from "./sentiment-store";

export const useLoadSentimentData = () => {
  const { setData, setIsLoading, setError } = useSentimentStore();

  const loadSentimentData = async (file: File) => {
    setIsLoading(true);
    setError(null);
    
    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      // Валидация данных
      if (!jsonData.positives || !jsonData.negatives || !jsonData.neutrals || !jsonData.dates) {
        throw new Error("Неверный формат файла. Ожидаются поля: positives, negatives, neutrals, dates");
      }
      
      if (jsonData.positives.length !== 1024 || 
          jsonData.negatives.length !== 1024 || 
          jsonData.neutrals.length !== 1024 || 
          jsonData.dates.length !== 1024) {
        throw new Error("Все массивы должны содержать ровно 1024 элемента");
      }

      setData(jsonData as any);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Ошибка загрузки файла");
      console.error("Ошибка загрузки данных тональностей:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return { loadSentimentData };
};