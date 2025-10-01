import {
  SentimentChart,
  SentimentConfigPanel,
  usePostSentimentData,
  useSentimentStore,
} from "@/entities/sentiment";
import { Layout } from "@/shared/ui/layout";

const Page = () => {
  usePostSentimentData();

  const { originalData } = useSentimentStore((state) => state);

  return (
    <Layout>
      <section className="flex w-full grow flex-col items-center justify-start space-y-6 p-8 pb-[300px]">
        <div className="w-full max-w-6xl">
          <h2 className="mb-4 text-xl font-bold text-white">
            Тональность отзывов
          </h2>
          <div className="bg-base-200 rounded-lg p-6">
            <SentimentChart />
          </div>
        </div>

        {originalData !== null && (
          <div className="w-full max-w-6xl">
            <SentimentConfigPanel />
          </div>
        )}
      </section>
    </Layout>
  );
};

export { Page };
