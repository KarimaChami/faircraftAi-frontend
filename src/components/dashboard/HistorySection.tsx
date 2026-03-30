"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { getPredictionHistory } from "@/lib/api";
import { Calendar, TrendingUp, AlertCircle, Eye } from "lucide-react";

interface HistoryItem {
  id: string;
  product_title: string;
  category: string;
  shop_name: string;
  predicted_price: number;
  production_cost: number;
  margin: number;
  created_at: string;
  status: string;
}

export default function HistorySection() {
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const { items, total } = await getPredictionHistory(
          currentPage,
          itemsPerPage
        );
        setHistory(items);
        setTotalPages(Math.ceil(total / itemsPerPage));
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load prediction history"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [currentPage, itemsPerPage]);

  useEffect(() => {
    if (tableRef.current && !loading && history.length > 0) {
      gsap.fromTo(
        ".history-row",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, [loading, history]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getMarginColor = (margin: number) => {
    if (margin > 100) return "text-green-600";
    if (margin > 50) return "text-blue-600";
    if (margin > 20) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-64 bg-black/5 rounded-[2.5rem]"></div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map(i => <div key={i} className="h-32 bg-black/5 rounded-[2rem]"></div>)}
        </div>
        <div className="h-96 bg-black/5 rounded-[2.5rem]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header - Data Vault Style */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] p-10 lg:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,_#C8FF00_0%,_transparent_70%)] opacity-20" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 mb-6 font-bold text-[10px] uppercase tracking-widest text-[#C8FF00]">
            <Calendar size={14} />
            Temporal Data Archive
          </div>
          <h1 className="text-5xl lg:text-6xl font-black tracking-tighter mb-4">Prediction History</h1>
          <p className="text-lg text-gray-400 font-medium max-w-xl">
            Access and analyze all historical fair value determinations and market simulations across your neural network.
          </p>
        </div>
      </section>

      {/* Quick Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { 
            label: "Archived Entries", 
            value: history.length > 0 ? history.length : "0", 
            icon: Calendar,
            desc: "Total records in vault"
          },
          { 
            label: "Avg. Fair Value", 
            value: `$${history.length > 0 ? (history.reduce((acc, item) => acc + item.predicted_price, 0) / history.length).toFixed(2) : "0"}`,
            icon: TrendingUp,
            desc: "Mean prediction result"
          },
          { 
            label: "Efficiency Rating", 
            value: `${history.length > 0 ? (history.reduce((acc, item) => acc + item.margin, 0) / history.length).toFixed(1) : "0"}%`,
            icon: Eye,
            desc: "Average margin performance"
          }
        ].map((stat, i) => (
          <div key={i} className="glass p-8 rounded-[2rem] border border-black/5 group hover:border-[#C8FF00]/30 transition-all duration-500">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3.5 bg-black/5 rounded-2xl text-[#0A0A0A] group-hover:bg-[#C8FF00] transition-colors duration-500">
                <stat.icon size={22} />
              </div>
            </div>
            <p className="text-[11px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">{stat.label}</p>
            <h3 className="text-3xl font-black text-[#0A0A0A] tracking-tighter mb-1">{stat.value}</h3>
            <p className="text-[11px] font-medium text-[#6B7280] opacity-60">{stat.desc}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Table - Main Ledger */}
        <div className={`transition-all duration-500 ${selectedItem ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
          <div className="glass rounded-[2.5rem] border border-black/5 overflow-hidden shadow-premium">
            <div className="p-8 border-b border-black/5 flex items-center justify-between">
              <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tight">Data Ledger</h2>
              <div className="flex items-center gap-2">
                 <div className="w-2.5 h-2.5 rounded-full bg-[#C8FF00] animate-pulse"></div>
                 <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">Live Database Stream</span>
              </div>
            </div>

            <div className="overflow-x-auto" ref={tableRef}>
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-black/[0.02]">
                    <th className="px-8 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Prediction Subject</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Value Metric</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Margin %</th>
                    <th className="px-6 py-5 text-[11px] font-bold text-[#6B7280] uppercase tracking-widest">Timestamp</th>
                    <th className="px-8 py-5"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-black/5">
                  {history.length > 0 ? (
                    history.map((item) => (
                      <tr
                        key={item.id}
                        onClick={() => setSelectedItem(item)}
                        className={`history-row group transition-all duration-300 cursor-pointer ${selectedItem?.id === item.id ? 'bg-[#C8FF00]/5' : 'hover:bg-black/[0.02]'}`}
                      >
                        <td className="px-8 py-6">
                          <div>
                            <p className="font-black text-[#0A0A0A] text-base group-hover:text-[#C8FF00] transition-colors">{item.product_title}</p>
                            <p className="text-xs font-medium text-[#6B7280] mt-0.5">{item.category} • {item.shop_name}</p>
                          </div>
                        </td>
                        <td className="px-6 py-6 font-black text-[#0A0A0A] text-lg">
                          ${item.predicted_price.toFixed(2)}
                        </td>
                        <td className="px-6 py-6">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-black ${getMarginColor(item.margin)} bg-black/5`}>
                            {item.margin > 20 ? '↑' : '↓'} {item.margin.toFixed(1)}%
                          </span>
                        </td>
                        <td className="px-6 py-6 text-[13px] font-medium text-[#6B7280]">
                          {formatDate(item.created_at)}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <button className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center group-hover:bg-[#0A0A0A] group-hover:text-white transition-all">
                            <Eye size={18} />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-20 text-center">
                        <AlertCircle className="mx-auto text-gray-300 mb-4" size={48} />
                        <p className="text-gray-500 font-bold mb-1">No Archive Data Detected</p>
                        <p className="text-xs text-gray-400">Initialize a prediction sequence to populate this ledger.</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-8 border-t border-black/5 flex items-center justify-between bg-black/[0.01]">
                <p className="text-[12px] font-bold text-[#6B7280] uppercase tracking-widest">
                  Showing Block {currentPage} of {totalPages}
                </p>
                <div className="flex gap-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.max(1, p - 1)); }}
                    disabled={currentPage === 1}
                    className="px-6 py-2.5 rounded-xl border border-black/10 text-xs font-black uppercase hover:bg-black/5 disabled:opacity-30 transition-all tracking-widest"
                  >
                    Previous Sequence
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); setCurrentPage(p => Math.min(totalPages, p + 1)); }}
                    disabled={currentPage === totalPages}
                    className="px-6 py-2.5 rounded-xl bg-[#0A0A0A] text-white text-xs font-black uppercase hover:scale-105 disabled:opacity-30 transition-all tracking-widest"
                  >
                    Next Sequence
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Details Panel - Artifact Analysis */}
        {selectedItem && (
          <div className="lg:col-span-4 sticky top-10 animate-fade-in-right">
            <div className="glass rounded-[2.5rem] border border-[#C8FF00]/30 shadow-2xl p-8 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#C8FF00]/10 rounded-full blur-3xl" />
               
               <div className="flex justify-between items-start mb-8 relative z-10">
                 <h2 className="text-2xl font-black text-[#0A0A0A] tracking-tighter">Artifact Analysis</h2>
                 <button 
                  onClick={() => setSelectedItem(null)}
                  className="w-8 h-8 rounded-full bg-black/5 flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-all"
                 >
                   ×
                 </button>
               </div>

               <div className="space-y-6 relative z-10">
                  <div className="p-6 bg-[#0A0A0A] rounded-[2rem] text-white">
                    <p className="text-[10px] font-bold text-[#C8FF00] uppercase tracking-[0.2em] mb-3">Model Result</p>
                    <h3 className="text-4xl font-black tracking-tighter">${selectedItem.predicted_price.toFixed(2)}</h3>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="px-2 py-1 rounded bg-[#C8FF00]/20 text-[#C8FF00] text-[10px] font-bold uppercase">Confidence High</div>
                      <div className="px-2 py-1 rounded bg-white/10 text-white/60 text-[10px] font-bold uppercase">Verified</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-5 rounded-2xl bg-black/5 border border-black/5">
                      <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Subject Title</p>
                      <p className="font-bold text-[#0A0A0A]">{selectedItem.product_title}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-5 rounded-2xl bg-black/5 border border-black/5">
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Product ID</p>
                        <p className="font-bold text-[#0A0A0A] text-xs">#{selectedItem.id.slice(0, 8)}</p>
                      </div>
                      <div className="p-5 rounded-2xl bg-black/5 border border-black/5">
                        <p className="text-[10px] font-bold text-[#6B7280] uppercase tracking-widest mb-1">Category</p>
                        <p className="font-bold text-[#0A0A0A] text-xs">{selectedItem.category}</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-black/5 space-y-3">
                    <button className="w-full py-4 bg-[#0A0A0A] text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                      Export Data Report
                    </button>
                    <button className="w-full py-4 bg-white border border-black/5 text-[#0A0A0A] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-black/5 transition-all">
                      Re-Simulation Model
                    </button>
                  </div>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
