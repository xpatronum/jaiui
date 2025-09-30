import { 
  ReportsChart, 
  ChartSettingsPanel, 
  DownloadChartButton, 
  UploadFileButton 
} from "@/entities/report";
import { useLoadReports } from "@/entities/report/model/report-api";
import { Layout } from "@/shared/ui/layout";

import {
  SentimentChart,
  SentimentConfigPanel
} from "@/entities/sentiment";

const Page = () => {
  useLoadReports();

  return (
    <Layout>
      {/* <div className="flex h-16 w-full items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-white">Аналитика отчетов</h1>
      </div> */}

      {/* <section className="flex w-full grow flex-col items-center justify-start p-8 space-y-6">
        <div className="w-full max-w-6xl">
          <h2 className="text-xl font-bold text-white mb-4">Аналитика отзывов за весь период</h2>
          <div className="bg-gray-800 rounded-lg p-6">
            <ReportsChart />
          </div>
        </div>
        
        <div className="w-full max-w-6xl">
          <div className="bg-gray-700 rounded-lg p-4">
            <ChartSettingsPanel />
          </div>
        </div>
        
        <div className="w-full max-w-6xl flex gap-4">
          <div className="flex-1">
            <DownloadChartButton />
          </div>
          <div className="flex-1">
            <UploadFileButton />
          </div>
        </div>
      </section> */}

      <section className="flex w-full grow flex-col items-center justify-start p-8 space-y-6">
        <div className="w-full max-w-6xl">
          <h2 className="text-xl font-bold text-white mb-4">Аналитика тональности отзывов</h2>
          <div className="bg-base-200 rounded-lg p-6">
            <SentimentChart />
          </div>
        </div>

        <div className="w-full max-w-6xl">
          <SentimentConfigPanel />
        </div>
      </section>
    </Layout>
  );
};

export { Page };