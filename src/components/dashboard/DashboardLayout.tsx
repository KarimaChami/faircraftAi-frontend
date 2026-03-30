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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-black/10 border-t-[#C8FF00] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-[#6B7280]">Loading dashboard...</p>
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
    <div className="min-h-screen bg-[#FDFDFD]">
      {/* Sidebar background gradient for depth */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_30%_20%,_rgba(200,255,0,0.03),_transparent_40%)] z-0" />

      {/* Sidebar */}
      <aside
        className="sidebar fixed left-0 top-0 w-72 h-screen glass border-r border-black/5 p-8 overflow-y-auto hidden md:flex flex-col z-40 shadow-premium"
      >
        {/* Logo */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-2 group cursor-pointer w-fit">
            <div className="w-10 h-10 bg-[#C8FF00] rounded-xl flex items-center justify-center shadow-lg shadow-[#C8FF00]/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <span className="text-[#0A0A0A] font-extrabold text-base tracking-tighter">FC</span>
            </div>
            <div>
              <span className="font-black text-xl text-[#0A0A0A] block leading-none">FairCraft</span>
              <span className="text-[10px] font-bold text-[#6B7280] tracking-widest uppercase mt-1 block">AI Command</span>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="mb-10 p-5 glass-accent rounded-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-[#C8FF00]/20 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
          <div className="relative z-10 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/5 flex items-center justify-center border border-black/5 overflow-hidden">
               <span className="text-xs font-bold text-[#0A0A0A] uppercase">{user.first_name[0]}{user.last_name[0]}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[#0A0A0A] truncate leading-tight">{user.first_name} {user.last_name}</p>
              <p className="text-[11px] font-medium text-[#6B7280] truncate opacity-80">{user.email}</p>
            </div>
          </div>
          <div className="mt-3 relative z-10">
            <div className="text-[10px] font-bold text-[#0A0A0A] uppercase tracking-wider px-2.5 py-1 bg-[#C8FF00] rounded-full w-fit shadow-sm shadow-[#C8FF00]/30">
              {user.role} Admin
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 flex flex-col justify-between">
          <nav className="space-y-1.5">
            <p className="px-4 text-[10px] font-bold text-[#6B7280] uppercase tracking-[0.15em] mb-4 opacity-50">Menu</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as any);
                    router.push(item.href);
                  }}
                  className={`group relative w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-400 overflow-hidden ${
                    isActive
                      ? "text-[#0A0A0A] font-bold"
                      : "text-[#6B7280] hover:text-[#0A0A0A]"
                  }`}
                >
                  {/* Dynamic background for active/hover states */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#C8FF00] z-0 shadow-glow-accent" />
                  )}
                  <div className={`absolute inset-0 bg-black/5 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 ease-out z-0 ${isActive ? 'hidden' : ''}`} />

                  {/* Icon with animation container */}
                  <div className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:translate-x-0.5'}`}>
                    <Icon size={19} strokeWidth={isActive ? 2.5 : 2} />
                  </div>

                  <span className={`relative z-10 text-[14px] tracking-tight transition-transform duration-300 ${isActive ? 'translate-x-0' : 'group-hover:translate-x-0.5'}`}>
                    {item.label}
                  </span>

                  {/* Active Indicator Bar */}
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#0A0A0A] rounded-r-full z-10" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="pt-6 border-t border-black/5 space-y-2">
            <button
              onClick={logout}
              className="group w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[#0A0A0A] hover:bg-black/5 transition-all duration-300 border border-black/5 glass"
            >
              <div className="group-hover:rotate-12 transition-transform duration-300">
                <LogOut size={19} strokeWidth={2} />
              </div>
              <span className="text-[14px] font-bold">Logout</span>
            </button>
            <p className="text-[9px] text-[#6B7280] text-center mt-6 uppercase tracking-widest opacity-40">© 2026 FairCraft AI • v1.2</p>
          </div>
        </div>
      </aside>

      {/* Mobile Header - Glassified */}
      <header className="md:hidden glass border-b border-black/5 p-4 flex items-center justify-between sticky top-0 z-50 px-6 backdrop-blur-md">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#C8FF00] rounded-lg flex items-center justify-center shadow-lg shadow-[#C8FF00]/10">
            <span className="text-[#0A0A0A] font-bold text-sm">FC</span>
          </div>
          <span className="font-black text-lg text-[#0A0A0A] tracking-tight">FairCraft</span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-black/5 hover:bg-black/10 rounded-xl transition-colors"
        >
          {isMobileMenuOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </header>

      {/* Mobile Menu - Animated with Glassmorphism */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass border-b border-black/5 p-6 space-y-2 absolute w-full top-[73px] left-0 z-40 shadow-xl animate-fade-in-down">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id as any);
                  setIsMobileMenuOpen(false);
                  router.push(item.href);
                }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 ${
                  isActive
                    ? "bg-[#C8FF00] text-[#0A0A0A] font-bold shadow-lg shadow-[#C8FF00]/20"
                    : "text-[#6B7280] hover:bg-black/5"
                }`}
              >
                <Icon size={20} />
                <span className="text-base font-medium">{item.label}</span>
              </button>
            );
          })}
          <div className="pt-4 border-t border-black/5 mt-4">
            <button
              onClick={logout}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-xl text-[#0A0A0A] hover:bg-black/5 transition-all duration-300 border border-black/5 font-bold"
            >
              <LogOut size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="main-content md:ml-72 min-h-screen relative z-10">
        <div className="p-6 md:p-10 lg:p-12 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
