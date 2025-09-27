import { Layout } from "@/shared/ui";

const Page = () => {
  return (
    <Layout>
      <section className="flex grow flex-col items-center justify-center">
        <h1 className="from-primary to-primary-content bg-gradient-to-r bg-clip-text text-9xl font-semibold text-transparent">
          JAI UI
        </h1>
        <h2 className="text-primary-content text-3xl">developed by JAI team</h2>
        <p className="mt-4 text-lg text-white">
          Перейдите в раздел "Аналитика" для просмотра отчетов
        </p>
      </section>
    </Layout>
  );
};

export { Page };
