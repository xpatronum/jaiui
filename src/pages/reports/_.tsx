import { ReportsChart, ChartSettingsPanel, DownloadChartButton, UploadFileButton } from "@/entities/report";
import { useLoadReports } from "@/entities/report/model/report-api";
import { Layout } from "@/shared/ui/layout";

const Page = () => {
  useLoadReports();

  return (
    <Layout>
      <div className="flex h-16 w-full items-center justify-between px-4">
        <h1 className="text-2xl font-bold text-white">Аналитика отчетов</h1>
      </div>

      <section className="flex w-full grow flex-col items-center justify-start p-8">
        <div className="w-full max-w-6xl">
          <ReportsChart />
        </div>
        <div className="mt-4 w-full max-w-6xl">
          <ChartSettingsPanel />
        </div>
        <div className="v]mt-4 w-full max-w-6xl">
          <DownloadChartButton />
        </div>
        <div className="mt-4 w-full max-w-6xl">
          <UploadFileButton />
        </div>
      </section>
    </Layout>
  );
};

export { Page };
