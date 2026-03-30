"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useDashboard } from "@/lib/dashboard-context";
import { getStatistics } from "@/lib/api";
import { Statistics } from "@/lib/types";
import { TrendingUp, DollarSign, Percent, BarChart3, Target, ShieldCheck } from "lucide-react";

interface StatCard {
  label: string;
  value: string | number;
  subtext?: string;
  icon: React.ReactNode;
  gradient: string;
  className?: string;
}

export default function HomeSection() {
  const { user } = useDashboard();
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const stats = await getStatistics();
        setStatistics(stats);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load statistics"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);
  useEffect(() => {
    if (cardsRef.current && !loading && statistics) {
      // Animate container
      if (containerRef.current) {
        gsap.to(containerRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        });
      }

      // Animate stat cards
      gsap.fromTo(
        ".stat-card",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
        }
      );
    }
  }, [loading, statistics]);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="h-32 bg-black/5 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-black/5 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-red-700">
        <p className="font-semibold mb-2">Error Loading Statistics</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  const statCards: StatCard[] = [
    {
      label: "Total Predictions",
      value: statistics?.total_predictions || 0,
      icon: <BarChart3 size={24} />,
      gradient: "from-[#C8FF00] to-[#C8FF00]",
      subtext: `${statistics?.predictions_this_month || 0} this month`,
    },
    {
      label: "Average Price",
      value: `$${(statistics?.average_price || 0).toFixed(2)}`,
      icon: <DollarSign size={24} />,
      gradient: "from-[#C8FF00] to-[#C8FF00]",
    },
    {
      label: "Average Margin",
      value: `${(statistics?.average_margin || 0).toFixed(1)}%`,
      icon: <TrendingUp size={24} />,
      gradient: "from-[#C8FF00] to-[#C8FF00]",
    },
    {
      label: "Total Profit",
      value: `$${(statistics?.total_profit || 0).toFixed(2)}`,
      icon: <DollarSign size={24} />,
      gradient: "from-[#C8FF00] to-[#C8FF00]",
    },
  ];

  return (
    <div ref={containerRef} className="space-y-12 opacity-0">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] p-10 lg:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,_#C8FF00_0%,_transparent_70%)] opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#C8FF00] rounded-full blur-[100px] opacity-10" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 mb-6 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF00]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8FF00]">System Operational</span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
            Welcome back, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-[#C8FF00]/50">
              {user?.first_name || 'Admin'}
            </span>
          </h1>
          
          <p className="text-lg text-gray-400 font-medium max-w-md leading-relaxed">
            Your AI command center is synchronized. All neural engines are performing at peak efficiency.
          </p>
        </div>
      </section>

      {/* Stats Grid */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { 
            label: "Total Predictions", 
            value: statistics?.total_predictions || 0, 
            icon: BarChart3, 
            color: "#C8FF00",
            trend: `+${statistics?.predictions_this_month || 0} New`,
            desc: "Lifetime predictions"
          },
          { 
            label: "Average Price", 
            value: `$${(statistics?.average_price || 0).toFixed(2)}`, 
            icon: DollarSign, 
            color: "#0A0A0A",
            trend: "Stable",
            desc: "Global across nodes"
          },
          { 
            label: "Average Margin", 
            value: `${(statistics?.average_margin || 0).toFixed(1)}%`, 
            icon: TrendingUp, 
            color: "#C8FF00",
            trend: "Optimal",
            desc: "Profit performance"
          },
          { 
            label: "Total Profit", 
            value: `$${(statistics?.total_profit || 0).toFixed(2)}`, 
            icon: Target, 
            color: "#0A0A0A",
            trend: "+12.4%",
            desc: "Accumulated returns"
          },
        ].map((stat, i) => (
          <div 
            key={i} 
            className="stat-card glass p-8 rounded-[2rem] border border-black/5 hover:border-[#C8FF00]/30 transition-all duration-500 group cursor-pointer relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#C8FF00]/5 rounded-full blur-2xl group-hover:bg-[#C8FF00]/10 transition-colors" />
            
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`p-4 rounded-2xl ${i % 2 === 0 ? 'bg-[#0A0A0A] text-white' : 'bg-[#C8FF00] text-[#0A0A0A] shadow-lg shadow-[#C8FF00]/20'}`}>
                <stat.icon size={24} strokeWidth={2.5} />
              </div>
              <span className={`text-[10px] font-black px-2.5 py-1 rounded-full ${stat.trend.includes('+') ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'} uppercase tracking-wider`}>
                {stat.trend}
              </span>
            </div>
            
            <div className="relative z-10">
              <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">{stat.label}</p>
              <h3 className="text-4xl font-black text-[#0A0A0A] tracking-tighter mb-2">{stat.value}</h3>
              <p className="text-[11px] font-medium text-[#6B7280] opacity-60">{stat.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Interface Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass rounded-[2.5rem] p-10 border border-black/5 shadow-premium">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tight">Market Intelligence</h2>
              <p className="text-sm font-medium text-[#6B7280]">Real-time fair value analysis engine</p>
            </div>
            <div className="flex items-center gap-6">
               <div className="text-right">
                  <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest">Top Category</p>
                  <p className="text-lg font-black text-[#0A0A0A]">{statistics?.top_product_category || "N/A"}</p>
               </div>
               <div className="w-12 h-12 bg-[#C8FF00] rounded-xl flex items-center justify-center text-[#0A0A0A] font-black shadow-lg shadow-[#C8FF00]/20">
                  {statistics?.top_product_category?.[0] || "A"}
               </div>
            </div>
          </div>
          
          <div className="bg-black/5 rounded-[2rem] border border-dashed border-black/10 p-12 text-center group cursor-pointer hover:bg-black/[0.07] transition-all">
             <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <BarChart3 className="text-[#C8FF00]" size={32} />
             </div>
             <p className="text-[#0A0A0A] font-bold text-xl mb-2">Initialize Prediction Matrix</p>
             <p className="text-sm text-[#6B7280] max-w-sm mx-auto font-medium">Select a data node from the sidebar to begin generating real-time fair value predictions.</p>
          </div>
        </div>

        <div className="glass rounded-[2.5rem] p-10 border border-black/5 shadow-premium flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8FF00]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <div className="w-14 h-14 bg-[#0A0A0A] rounded-2xl flex items-center justify-center mb-8 shadow-xl">
               <ShieldCheck className="text-[#C8FF00]" size={28} />
            </div>
            <h2 className="text-3xl font-black text-[#0A0A0A] tracking-tighter mb-4 leading-none">Security Protocol</h2>
            <p className="text-sm font-medium text-[#6B7280] leading-relaxed">Your data is encrypted using military-grade security standards. Neural model access is restricted to authorized personnel.</p>
          </div>
          
          <div className="mt-12 space-y-4 relative z-10">
            <button className="w-full py-4 bg-[#C8FF00] text-[#0A0A0A] rounded-2xl font-black text-sm hover:translate-y-[-2px] hover:shadow-lg hover:shadow-[#C8FF00]/30 transition-all uppercase tracking-widest">
              Audit Logs
            </button>
            <button className="w-full py-4 bg-white border border-black/5 text-[#0A0A0A] rounded-2xl font-black text-sm hover:bg-black/5 transition-all uppercase tracking-widest">
              System Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
