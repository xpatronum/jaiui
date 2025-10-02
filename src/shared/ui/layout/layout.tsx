import type { ReactNode } from "react";
import { Navigation } from "../navigation/navigation";

interface LayoutProps {
  children: ReactNode;
  isPolling?: boolean;
}

const Layout = ({ children, isPolling = false }: LayoutProps) => {
  return (
    <div className="flex min-h-screen flex-col bg-base-100">
      <Navigation isPolling={isPolling} />
      <main className="flex grow flex-col">{children}</main>
    </div>
  );
};

export { Layout };
