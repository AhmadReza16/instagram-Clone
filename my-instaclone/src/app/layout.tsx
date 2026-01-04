import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "../components/ui/Header";
import Toast from "@/components/ui/toast";

export const metadata: Metadata = {
  title: "Instagram",
  description: "instagram Clone App built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Header />
          <main className="max-w-3xl mx-auto">{children}</main>
          <Toast />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
