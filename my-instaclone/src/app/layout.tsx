import type { Metadata } from "next";

import "./globals.css";
import ReactQueryProvider from "../providers/ReactQueryProvider";
import Header from "../components/ui/Header";
import Toast from "@/components/ui/toast";
import { AuthInitializer } from "@/components/AuthInitializer";

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
      <body className="bg-white text-gray-900">
        <ReactQueryProvider>
          <AuthInitializer />
          <Header />
          {children}
          <Toast />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
