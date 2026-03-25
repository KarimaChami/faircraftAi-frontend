"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useDashboard } from "@/lib/dashboard-context";
import { getStatistics } from "@/lib/api";
import { Statistics } from "@/lib/types";
import { TrendingUp, DollarSign, Percent, BarChart3 } from "lucide-react";

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

      // Add hover animation
      document.querySelectorAll(".stat-card").forEach((card) => {
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -5,
            duration: 0.3,
            ease: "power2.out",
          });
        });

        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
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
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-[#C8FF00] rounded-xl p-8 text-[#0A0A0A] shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.first_name}! 👋</h1>
        <p className="text-[#0A0A0A] text-lg">
          Track your predictions and maximize your profits with AI-powered pricing insights
        </p>
      </div>

      {/* Statistics Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`stat-card bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-black/10 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-[#6B7280] text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-[#0A0A0A] mt-2">{card.value}</p>
                {card.subtext && (
                  <p className="text-xs text-[#6B7280] mt-1">{card.subtext}</p>
                )}
              </div>
              <div className={`bg-gradient-to-br ${card.gradient} p-3 rounded-lg text-[#0A0A0A]`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Category Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-black/10">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">Top Product Category</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-[#C8FF00] rounded-lg flex items-center justify-center text-[#0A0A0A] text-4xl font-bold">
              {statistics?.top_product_category?.[0] || "A"}
            </div>
            <div>
              <p className="text-2xl font-bold text-[#0A0A0A]">
                {statistics?.top_product_category || "N/A"}
              </p>
              <p className="text-[#6B7280] mt-2">Most predicted product category</p>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-[#C8FF00] text-[#0A0A0A] rounded-lg hover:bg-[#C8FF00]/90 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-black/10">
          <h2 className="text-xl font-bold text-[#0A0A0A] mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-[#C8FF00] text-[#0A0A0A] rounded-lg hover:bg-[#C8FF00]/90 transition-all font-medium">
              New Prediction
            </button>
            <button className="w-full px-4 py-3 bg-black/5 text-[#0A0A0A] rounded-lg hover:bg-black/10 transition-all font-medium border border-black/10">
              View Recommendations
            </button>
            <button className="w-full px-4 py-3 bg-black/5 text-[#0A0A0A] rounded-lg hover:bg-black/10 transition-all font-medium border border-black/10">
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity (Mock) */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-black/10">
        <h2 className="text-xl font-bold text-[#0A0A0A] mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 pb-4 border-b border-black/5">
              <div className="w-2 h-2 bg-[#C8FF00] rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-[#0A0A0A]">Price prediction made</p>
                <p className="text-sm text-[#6B7280] mt-1">Handmade wool carpet - Predicted at $450</p>
                <p className="text-xs text-[#6B7280] mt-2">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
