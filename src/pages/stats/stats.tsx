import { StatsAccordion } from "@/entities/stats";
import { Layout } from "@/shared/ui";

import { PollingProgress, usePollingStore } from "@/entities/polling/";
import { UploadFileButton } from "@/entities/report";
import { WordCloud } from "@/entities/stats";

const Page = () => {
  const { isPolling, progress } = usePollingStore((state) => state);

  return (
    <Layout isPolling={isPolling}>
      <div className="flex w-full grow flex-col items-center justify-center gap-8">
        {!isPolling && progress === 0 && <UploadFileButton />}
        {isPolling && <PollingProgress />}
        {isPolling && <WordCloud />}
        {!isPolling && progress === 100 && <StatsAccordion />}
        {!isPolling && progress === 100 && <UploadFileButton />}
      </div>
    </Layout>
  );
};

export { Page };
