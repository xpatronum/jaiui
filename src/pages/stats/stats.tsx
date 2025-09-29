import { StatsAccordion } from "@/entities/stats";
import { Layout } from "@/shared/ui";

import { UploadFileButton } from "@/entities/report";
import { WordCloud } from "@/entities/stats";

const Page = () => {
  return (
    <Layout>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-4">
        <WordCloud />
        <StatsAccordion />
        <UploadFileButton />
      </div>
    </Layout>
  );
};

export { Page };
