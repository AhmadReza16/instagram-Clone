import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-white">
        <main className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-sm px-4">{children}</div>
        </main>
      </body>
    </html>
  );
}
