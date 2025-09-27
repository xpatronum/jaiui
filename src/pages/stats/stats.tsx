import axios from "axios";

import { StatsAccordion, useStatsStore } from "@/entities/stats";
import { Layout } from "@/shared/ui";

import type { StatsResponse } from "@/shared/mocks";
import { WordCloud } from "@/entities/stats/ui/word-cloud";

const Page = () => {
  const { set } = useStatsStore((state) => state);

  const onClick = () => {
    axios.post("/upload").then((response) => {
      set(response.data as unknown as StatsResponse);
    });
  };

  return (
    <Layout>
      <div className="flex h-screen w-full flex-col items-center justify-center">
        <WordCloud />
        <StatsAccordion />
        <button
          onClick={onClick}
          className="bg-primary text-primary-content hover:bg-primary-content hover:text-primary focus-visible:outline-primary-content inline-flex h-10 items-center justify-center rounded px-4 font-semibold focus-visible:outline-2"
        >
          Загрузить данные
        </button>
      </div>
    </Layout>
  );
};

export { Page };
