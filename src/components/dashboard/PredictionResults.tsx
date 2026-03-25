"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { PredictionRequest, PredictionResponse } from "@/lib/types";
import { predictPrice, explainPrediction, getRecommendations } from "@/lib/api";
import { AlertCircle, CheckCircle2, TrendingUp } from "lucide-react";

interface PredictionResultsProps {
  request: PredictionRequest;
  onNavigateToRecommendations?: () => void;
}

export default function PredictionResults({
  request,
  onNavigateToRecommendations,
}: PredictionResultsProps) {
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [topFactors, setTopFactors] = useState<Array<{ feature: string; impact: number }>>([]);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        // Make predictions
        const predictionResult = await predictPrice(request);
        setResult(predictionResult);

        // Get explanations
        const explanation = await explainPrediction(request);
        setTopFactors(explanation.top_factors || []);

        // Get recommendations
        const recs = await getRecommendations(request);
        setRecommendations(recs.recommendations || []);

        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to get predictions"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [request]);

  useEffect(() => {
    if (resultsRef.current && !loading && result) {
      // Animate results
      gsap.fromTo(
        ".result-card",
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
  }, [loading, result]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-40 bg-gradient-to-r from-slate-200 to-slate-300 rounded-xl animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
          <div>
            <p className="font-semibold text-red-900">Prediction Error</p>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  // Determine price tier
  const getPriceTier = () => {
    if (result.predicted_price <= result.minimum_price) return "warning";
    if (result.predicted_price >= result.premium_price) return "premium";
    return "recommended";
  };

  const tier = getPriceTier();
  const tierColors = {
    warning: { bg: "bg-yellow-50", border: "border-yellow-200", text: "text-yellow-900" },
    recommended: { bg: "bg-green-50", border: "border-green-200", text: "text-green-900" },
    premium: { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-900" },
  };

  const colors = tierColors[tier];

  return (
    <div ref={resultsRef} className="space-y-6">
      {/* Main Prediction Result */}
      <div className={`result-card ${colors.bg} border ${colors.border} rounded-xl p-8`}>
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-gray-600 mb-2">PREDICTED PRICE</p>
            <p className="text-5xl font-bold text-gray-900">
              ${result.predicted_price.toFixed(2)}
            </p>
          </div>
          <div className="p-3 bg-white rounded-lg">
            <TrendingUp className={colors.text === "text-yellow-900" ? "text-yellow-600" : colors.text === "text-green-900" ? "text-green-600" : "text-blue-600"} size={32} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-6 border-t" style={{ borderColor: colors.border }}>
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Production Cost</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              ${result.production_cost.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Profit Margin</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {result.margin.toFixed(1)}%
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Recommendation</p>
            <p className="text-lg font-bold text-gray-900 mt-1">
              ${result.recommended_price.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {/* Price Range Guide */}
      <div className="result-card bg-white rounded-xl p-6 shadow-md border border-slate-200">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Price Range Guide</h3>
        <div className="space-y-3">
          {[
            { label: "Minimum Price", value: result.minimum_price, color: "from-orange-500 to-orange-600" },
            { label: "Recommended Price", value: result.recommended_price, color: "from-green-500 to-green-600" },
            { label: "Predicted Price", value: result.predicted_price, color: "from-blue-500 to-blue-600" },
            { label: "Premium Price", value: result.premium_price, color: "from-purple-500 to-purple-600" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between">
              <span className="font-medium text-gray-700">{item.label}</span>
              <div className="flex items-center gap-3 flex-1 ml-4">
                <div className={`flex-1 h-2 bg-gradient-to-r ${item.color} rounded-full`}></div>
                <span className="font-bold text-gray-900 min-w-max">${item.value.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Influencing Factors */}
      {topFactors.length > 0 && (
        <div className="result-card bg-white rounded-xl p-6 shadow-md border border-slate-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Top Influencing Factors</h3>
          <div className="space-y-4">
            {topFactors.map((factor, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 text-white rounded-lg flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{factor.feature}</p>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-700"
                      style={{ width: `${Math.min((Math.abs(factor.impact) / 1) * 100, 100)}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Impact: {factor.impact.toFixed(3)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="result-card bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-md border border-blue-200">
          <div className="flex items-start justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900">AI Recommendations</h3>
            {onNavigateToRecommendations && (
              <button
                onClick={onNavigateToRecommendations}
                className="text-sm px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Chat
              </button>
            )}
          </div>
          <ul className="space-y-2">
            {recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={18} />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
