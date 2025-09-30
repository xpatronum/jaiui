import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import { useRef, useState } from "react";

import { usePollingStore } from "@/entities/polling";
import { useStatsStore } from "@/entities/stats";

import type { StatsState } from "@/entities/stats";

const UploadFileButton = () => {
  const { update } = useStatsStore((state) => state);
  const { setIsPolling } = usePollingStore((state) => state);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Проверка типа файла (пример)
    const allowedTypes = [".json", ".csv", ".xlsx", ".txt"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

    if (!allowedTypes.includes(fileExtension || "")) {
      alert(
        "Пожалуйста, выберите файл допустимого формата: " +
          allowedTypes.join(", "),
      );
      return;
    }

    // Проверка размера файла (макс. 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Файл слишком большой. Максимальный размер: 10MB");
      return;
    }

    await uploadFile(file);
  };

  const uploadFile = async (file: File) => {
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("timestamp", new Date().toISOString());

      const response = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / (progressEvent.total || 1),
          );
          console.log(`Upload progress: ${progress}%`);
        },
      });

      if (response.status === 200) {
        update(response.data as unknown as Partial<StatsState>);
        setIsPolling(true);
      }
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      alert("Ошибка при загрузке файла. Попробуйте еще раз.");
    } finally {
      setIsUploading(false);
      // Сброс input для возможности загрузки того же файла снова
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept=".json,.csv,.xlsx,.txt,.pdf"
        className="hidden"
        disabled={isUploading}
      />

      <button
        onClick={handleButtonClick}
        disabled={isUploading}
        className="flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 font-medium text-white transition-colors duration-200 hover:bg-green-700 disabled:bg-green-400"
        title="Загрузить файл отчета"
      >
        <ArrowUpTrayIcon className="size-5" />
        {isUploading ? "Загрузка..." : "Загрузить файл"}
      </button>
    </>
  );
};

export { UploadFileButton };
