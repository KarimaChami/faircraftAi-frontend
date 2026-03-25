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
        <div className="h-32 bg-gradient-to-br from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-200 rounded-xl animate-pulse"></div>
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
      gradient: "from-blue-500 to-blue-600",
      subtext: `${statistics?.predictions_this_month || 0} this month`,
    },
    {
      label: "Average Price",
      value: `$${(statistics?.average_price || 0).toFixed(2)}`,
      icon: <DollarSign size={24} />,
      gradient: "from-green-500 to-green-600",
    },
    {
      label: "Average Margin",
      value: `${(statistics?.average_margin || 0).toFixed(1)}%`,
      icon: <TrendingUp size={24} />,
      gradient: "from-purple-500 to-purple-600",
    },
    {
      label: "Total Profit",
      value: `$${(statistics?.total_profit || 0).toFixed(2)}`,
      icon: <DollarSign size={24} />,
      gradient: "from-orange-500 to-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-4xl font-bold mb-2">Welcome back, {user?.first_name}! 👋</h1>
        <p className="text-blue-100 text-lg">
          Track your predictions and maximize your profits with AI-powered pricing insights
        </p>
      </div>

      {/* Statistics Cards */}
      <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`stat-card bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 border border-slate-200 cursor-pointer`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">{card.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{card.value}</p>
                {card.subtext && (
                  <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
                )}
              </div>
              <div className={`bg-gradient-to-br ${card.gradient} p-3 rounded-lg text-white`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Top Category Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl p-6 shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Top Product Category</h2>
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-lg flex items-center justify-center text-white text-4xl font-bold">
              {statistics?.top_product_category?.[0] || "A"}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">
                {statistics?.top_product_category || "N/A"}
              </p>
              <p className="text-gray-600 mt-2">Most predicted product category</p>
              <div className="mt-4 flex gap-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:shadow-lg transition-all font-medium">
              New Prediction
            </button>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-lg hover:shadow-lg transition-all font-medium">
              View Recommendations
            </button>
            <button className="w-full px-4 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition-all font-medium">
              View History
            </button>
          </div>
        </div>
      </div>

      {/* Recent Activity (Mock) */}
      <div className="bg-white rounded-xl p-6 shadow-md border border-slate-200">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-start gap-4 pb-4 border-b border-slate-100">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Price prediction made</p>
                <p className="text-sm text-gray-600 mt-1">Handmade wool carpet - Predicted at $450</p>
                <p className="text-xs text-gray-500 mt-2">2 hours ago</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
