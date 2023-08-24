import { type ReactNode } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";

export const HeaderFooterLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex h-full min-h-screen flex-col">
      <Header />
      <main className="mx-auto w-full max-w-6xl grow">{children}</main>
      <Footer />
    </div>
  );
};
