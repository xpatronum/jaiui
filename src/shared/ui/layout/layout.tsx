import type { ReactNode } from "react";

type LayoutProps = { children: ReactNode };

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <main className="bg-base-100 flex h-screen w-screen flex-col items-center justify-start">
      {children}
    </main>
  );
};

export { Layout };
