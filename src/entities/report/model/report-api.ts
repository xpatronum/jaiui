import { useEffect } from "react";
import axios from "axios";
import { useReportStore } from "./report-store";

interface ApiReport {
  id: string;
  timestamp: string;
  title: string;
  type: string;
}

export const useLoadReports = () => {
  const { setReports, setIsLoading } = useReportStore();

  useEffect(() => {
    const loadReports = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<ApiReport[]>("/api/reports");
        
        // Конвертируем строки в Date объекты
        const reports = response.data.map(report => ({
          ...report,
          timestamp: new Date(report.timestamp)
        }));
        
        setReports(reports);
      } catch (error) {
        console.error("Ошибка загрузки отчетов:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReports();
  }, [setReports, setIsLoading]);
};