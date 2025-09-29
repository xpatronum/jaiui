import type { ReactNode } from "react";
import { Navigation } from "../navigation/navigation";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <main className="bg-base-100 flex min-h-screen w-screen flex-col items-center justify-start">
      <Navigation />
      {children}
    </main>
  );
};

export { Layout };
