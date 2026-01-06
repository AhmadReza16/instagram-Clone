import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const accessToken = (await cookies()).get("access")?.value;

  if (!accessToken) {
    redirect("/login");
  }

  return (
    <html lang="en">
      <body className="bg-black text-white">
        <div className="flex min-h-screen">
          {/* Sidebar / Navbar can live here */}
          <main className="flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}
