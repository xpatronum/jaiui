import { UserIcon } from "@/entities/user";
import { Layout } from "@/shared/ui/layout";

const Page = () => {
  return (
    <Layout>
      <div className="flex h-16 w-full items-center justify-end px-12">
        <UserIcon />
      </div>
      <section className="flex grow flex-col items-center justify-center">
        <h1 className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-9xl font-semibold text-transparent">
          JAI UI
        </h1>
        <h2 className="text-primary-content text-3xl">developed by JAI team</h2>
      </section>
    </Layout>
  );
};

export { Page };
