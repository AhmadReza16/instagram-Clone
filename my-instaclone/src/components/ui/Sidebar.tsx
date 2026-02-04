"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Home,
  Search,
  Heart,
  MessageCircle,
  BookmarkIcon,
  LogOut,
  Menu,
  ImagePlus,
  X,
  UserRoundPen,
} from "lucide-react";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const handleLogout = async () => {
    try {
      // حذف tokens و user data
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      localStorage.removeItem("user");

      // منتقل شدن به login page
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setShowConfirm(false);
    }
  };

  const navigationItems = [
    {
      label: "Home",
      icon: Home,
      href: "/feed",
    },
    {
      label: "messages",
      icon: MessageCircle,
      href: "/messages",
    },
    {
      label: "explore",
      icon: Search,
      href: "/explore",
    },
    {
      label: "create",
      icon: ImagePlus,
      href: "/create",
    },
    {
      label: "notifications",
      icon: Heart,
      href: "/notifications",
    },

    {
      label: "saved",
      icon: BookmarkIcon,
      href: "/saved",
    },
    {
      label: "profile",
      icon: UserRoundPen,
      href: "/profile",
    },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname?.startsWith(href + "/");
  };

  const NavLink = ({
    label,
    icon: Icon,
    href,
  }: {
    label: string;
    icon: React.ComponentType<{ size: number; className?: string }>;
    href: string;
  }) => (
    <Link
      href={href}
      className={`flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
        isActive(href)
          ? "text-white bg-gray-900 font-semibold"
          : "text-gray-500 hover:text-white hover:bg-gray-900"
      }`}
    >
      <Icon size={24} />
      <span className="hidden xl:inline text-base">{label}</span>
    </Link>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden bg-gray-900 p-2 rounded-lg text-white"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 xl:w-80 bg-gray-950 border-r border-gray-800 overflow-y-auto transition-transform duration-300 z-40 lg:relative lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo / Brand */}
        <div className="p-4 xl:p-6 border-b border-gray-800 flex items-center justify-between">
          <Link
            href="/feed"
            className="text-2xl xl:text-3xl font-bold text-white"
          >
            <span className="text-transparent bg-linear-to-r from-pink-500 to-purple-500 bg-clip-text">
              InstaClone
            </span>
          </Link>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-2 p-4 xl:p-6">
          {navigationItems.map((item) => (
            <NavLink key={item.href} {...item} />
          ))}
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 p-4 xl:p-6 border-t border-gray-800">
          <button
            onClick={() => setShowConfirm(true)}
            className="flex items-center gap-4 w-full px-4 py-3 rounded-lg text-gray-500 hover:text-white hover:bg-gray-900 transition-all duration-200"
          >
            <LogOut size={24} />
            <span className="hidden xl:inline text-base">Log Out</span>
          </button>
        </div>

        {/* Logout Confirmation Modal */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 rounded-lg p-6 w-80 shadow-lg border border-gray-800">
              <h2 className="text-xl font-semibold text-white mb-2">Logout</h2>
              <p className="text-gray-400 mb-6"> Are You Sure?</p>
              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowConfirm(false)}
                  className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700 transition-colors"
                >
                  No
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
