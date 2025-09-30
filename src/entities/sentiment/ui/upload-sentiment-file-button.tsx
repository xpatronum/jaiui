import React, { useRef } from "react";
import { useLoadSentimentData } from "../model/sentiment-api";
import { useSentimentStore } from "../model/sentiment-store";

export const UploadSentimentFileButton: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { loadSentimentData } = useLoadSentimentData();
  const { isLoading, error } = useSentimentStore();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      loadSentimentData(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        className="hidden"
      />
      
      <button
        onClick={handleButtonClick}
        disabled={isLoading}
        className="rounded-lg bg-[#0fe4ea] px-6 py-3 text-base-200 font-medium hover:bg-[#0bc8cd] transition-colors duration-200 disabled:opacity-50 w-fit cursor-pointer"
      >
        {isLoading ? "Загрузка..." : "Загрузить JSON файл"}
      </button>

      {error && (
        <div className="text-sm text-red-400">
          Ошибка: {error}
        </div>
      )}
    </div>
  );
};