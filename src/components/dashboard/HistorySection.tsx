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
      <div className="space-y-6">
        <div className="h-20 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-16 bg-slate-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-xl p-8 text-white shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Prediction History</h1>
        <p className="text-indigo-100">
          Review all your past predictions and pricing decisions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200">
          <p className="text-sm text-gray-600 mb-1">Total Predictions</p>
          <p className="text-3xl font-bold text-gray-900">{history.length > 0 ? history.length : "0"}</p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200">
          <p className="text-sm text-gray-600 mb-1">Average Price</p>
          <p className="text-3xl font-bold text-gray-900">
            ${history.length > 0 ? (
              history.reduce((acc, item) => acc + item.predicted_price, 0) / history.length
            ).toFixed(2) : "0"}
          </p>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md border border-slate-200">
          <p className="text-sm text-gray-600 mb-1">Average Margin</p>
          <p className="text-3xl font-bold text-gray-900">
            {history.length > 0 ? (
              history.reduce((acc, item) => acc + item.margin, 0) / history.length
            ).toFixed(1) : "0"}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Table */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          {error ? (
            <div className="p-6 bg-red-50 border-b border-red-200">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-red-600 mt-1" size={20} />
                <div>
                  <p className="font-semibold text-red-900">Error Loading History</p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto" ref={tableRef}>
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="text-left px-6 py-3 font-semibold text-gray-900 text-sm">
                        Product
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-900 text-sm">
                        Category
                      </th>
                      <th className="text-right px-6 py-3 font-semibold text-gray-900 text-sm">
                        Price
                      </th>
                      <th className="text-right px-6 py-3 font-semibold text-gray-900 text-sm">
                        Margin
                      </th>
                      <th className="text-left px-6 py-3 font-semibold text-gray-900 text-sm">
                        Date
                      </th>
                      <th className="text-center px-6 py-3 font-semibold text-gray-900 text-sm">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.length > 0 ? (
                      history.map((item) => (
                        <tr
                          key={item.id}
                          className="history-row border-b border-slate-100 hover:bg-slate-50 transition-colors cursor-pointer"
                        >
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            <div className="max-w-xs">
                              <p className="font-semibold truncate">
                                {item.product_title}
                              </p>
                              <p className="text-xs text-gray-500">{item.shop_name}</p>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-semibold">
                              {item.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold text-gray-900 text-right">
                            ${item.predicted_price.toFixed(2)}
                          </td>
                          <td className={`px-6 py-4 text-sm font-semibold text-right ${getMarginColor(item.margin)}`}>
                            {item.margin.toFixed(1)}%
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600">
                            {formatDate(item.created_at)}
                          </td>
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => setSelectedItem(item)}
                              className="p-1 hover:bg-blue-100 rounded transition-colors"
                              title="View details"
                            >
                              <Eye size={16} className="text-blue-600" />
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center">
                          <p className="text-gray-500">No predictions yet</p>
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="border-t border-slate-200 px-6 py-4 flex items-center justify-between bg-slate-50">
                  <p className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors"
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        setCurrentPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={currentPage === totalPages}
                      className="px-3 py-1 rounded border border-gray-300 text-sm font-medium hover:bg-gray-100 disabled:opacity-50 transition-colors"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Details Panel */}
        <div className="lg:col-span-1">
          {selectedItem ? (
            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-xl p-6 border border-indigo-200 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Prediction Details
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Product
                  </p>
                  <p className="font-semibold text-gray-900">
                    {selectedItem.product_title}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Shop
                  </p>
                  <p className="text-gray-900">{selectedItem.shop_name}</p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Category
                  </p>
                  <p className="text-gray-900">{selectedItem.category}</p>
                </div>

                <div className="pt-4 border-t border-indigo-300">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                    Predicted Price
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">
                    ${selectedItem.predicted_price.toFixed(2)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-indigo-300">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Cost
                    </p>
                    <p className="font-bold text-gray-900">
                      ${selectedItem.production_cost.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">
                      Margin
                    </p>
                    <p className={`font-bold ${getMarginColor(selectedItem.margin)}`}>
                      {selectedItem.margin.toFixed(1)}%
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-indigo-300">
                  <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1 flex items-center gap-2">
                    <Calendar size={14} /> Date
                  </p>
                  <p className="text-gray-900">{formatDate(selectedItem.created_at)}</p>
                </div>

                <button
                  onClick={() => setSelectedItem(null)}
                  className="w-full mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-gray-50 rounded-xl p-6 border-2 border-dashed border-gray-300 text-center">
              <Eye className="mx-auto text-gray-400 mb-3" size={32} />
              <p className="text-gray-600 font-medium">
                Select a prediction to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
