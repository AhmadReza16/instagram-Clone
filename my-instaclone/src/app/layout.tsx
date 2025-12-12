import type { Metadata } from "next";

import "./globals.css";
import { ReactNode } from "react";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "../components/ui/Header";

export const metadata: Metadata = {
  title: "instagram",
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
        </ReactQueryProvider>
      </body>
    </html>
  );
}
