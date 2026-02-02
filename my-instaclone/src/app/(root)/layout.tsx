import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Sidebar from "@/components/ui/Sidebar";

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access")?.value;

    if (!accessToken) {
    }
  } catch (error) {}

  return (
    <div className="flex min-h-screen bg-gray-900 text-white">
      <Sidebar />
      <main className="flex-1 lg:ml-0">{children}</main>
    </div>
  );
}
