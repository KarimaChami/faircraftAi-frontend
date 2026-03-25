"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { gsap } from "gsap";
import { useDashboard } from "@/lib/dashboard-context";
import { LogOut, Home, Cpu, MessageSquare, History, Settings } from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
  initialSection?: "home" | "prediction" | "recommendations" | "history" | "settings";
}

export default function DashboardLayout({
  children,
  initialSection = "home",
}: DashboardLayoutProps) {
  const { user, loading, logout } = useDashboard();
  const router = useRouter();
  const [activeSection, setActiveSection] = useState(initialSection);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Animate sidebar on mount
    gsap.fromTo(
      ".sidebar",
      { x: -300, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
    );

    // Animate main content
    gsap.fromTo(
      ".main-content",
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, delay: 0.2, ease: "power2.out" }
    );
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const menuItems = [
    { id: "home", label: "Home", icon: Home, href: "/dashboard" },
    { id: "prediction", label: "Predictions", icon: Cpu, href: "/dashboard/prediction" },
    { id: "recommendations", label: "Recommendations", icon: MessageSquare, href: "/dashboard/recommendations" },
    { id: "history", label: "History", icon: History, href: "/dashboard/history" },
    { id: "settings", label: "Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Sidebar */}
      <aside
        className="sidebar fixed left-0 top-0 w-64 h-screen bg-white shadow-lg border-r border-slate-200 p-6 overflow-y-auto hidden md:flex flex-col"
        style={{ zIndex: 40 }}
      >
        {/* Logo */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">FC</span>
            </div>
            <span className="font-bold text-lg text-gray-900">FairCraft</span>
          </div>
          <p className="text-xs text-gray-500">AI-Powered Pricing</p>
        </div>

        {/* User Info */}
        <div className="mb-8 p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
          <p className="text-sm font-semibold text-gray-900">{user.first_name} {user.last_name}</p>
          <p className="text-xs text-gray-600">{user.email}</p>
          <div className="mt-2 text-xs font-medium text-blue-600 capitalize px-2 py-1 bg-blue-200 rounded w-fit">
            {user.role}
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as any);
                  router.push(item.href);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Logout Button */}
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 border border-red-200"
        >
          <LogOut size={20} />
          <span className="font-medium">Logout</span>
        </button>
      </aside>

      {/* Mobile Header */}
      <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">FC</span>
          </div>
          <span className="font-bold text-lg text-gray-900">FairCraft</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as any);
                  setIsMobileMenuOpen(false);
                  router.push(item.href);
                }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-all duration-300 border border-red-200"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      )}

      {/* Main Content */}
      <main className="main-content md:ml-64">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
