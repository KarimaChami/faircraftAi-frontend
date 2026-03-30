"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { PredictionRequest } from "@/lib/types";
import PredictionResults from "./PredictionResults";
import MoroccoMap from "./MoroccoMap";
import { ChevronDown } from "lucide-react";

const PRODUCT_CATEGORIES = [
  "Carpets",
  "Footwear",
  "Textiles",
  "Leather",
  "Ceramics",
  "Jewelry",
  "Beauty",
  "Home Decor",
];

interface PredictionSectionProps {
  onNavigateToRecommendations?: () => void;
}

export default function PredictionSection({
  onNavigateToRecommendations,
}: PredictionSectionProps) {
  const [formData, setFormData] = useState<PredictionRequest>({
    product_title: "",
    category: "Carpets",
    shop_name: "",
    title_length: 0,
    keyword_count: 0,
    rating_numeric: 0,
    reviews_numeric: 0,
    rating_score: 0,
    popularity_index: 0,
    material_cost: 0,
    labor_hours: 0,
    hourly_rate: 0,
    overhead_cost: 0,
  });

  const [submitted, setSubmitted] = useState(false);
  const [highlightedCities, setHighlightedCities] = useState<string[]>([]);
  const formRef = useRef<HTMLFormElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        ".form-group",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        }
      );
    }
  }, []);

  useEffect(() => {
    // Update title length
    setFormData((prev) => ({
      ...prev,
      title_length: prev.product_title.length,
      keyword_count: prev.product_title.split(" ").filter((w) => w.length > 3)
        .length,
    }));
  }, [formData.product_title]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: isNaN(Number(value)) ? value : Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    // Simulate city highlighting based on category
    const categoryBasedCities: Record<string, string[]> = {
      Carpets: ["Marrakech", "Fez", "Rabat"],
      Footwear: ["Fez", "Casablanca", "Meknes"],
      Textiles: ["Fez", "Marrakech", "Oujda"],
      Leather: ["Fez", "Marrakech", "Casablanca"],
      Ceramics: ["Fez", "Safi", "Meknes"],
      Jewelry: ["Marrakech", "Fez", "Casablanca"],
      Beauty: ["Casablanca", "Rabat", "Marrakech"],
      "Home Decor": ["Marrakech", "Fez", "Rabat"],
    };

    setHighlightedCities(categoryBasedCities[formData.category] || []);

    // Scroll to results
    setTimeout(() => {
      resultsRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      product_title: "",
      category: "Carpets",
      shop_name: "",
      title_length: 0,
      keyword_count: 0,
      rating_numeric: 0,
      reviews_numeric: 0,
      rating_score: 0,
      popularity_index: 0,
      material_cost: 0,
      labor_hours: 0,
      hourly_rate: 0,
      overhead_cost: 0,
    });
    setHighlightedCities([]);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
            <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] p-10 lg:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,_#C8FF00_0%,_transparent_70%)] opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#C8FF00] rounded-full blur-[100px] opacity-10" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 mb-6 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF00]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8FF00]"> Prediction </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
            Price Prediction Tool
          </h1>
          
          <p className="text-lg text-gray-400 font-medium max-w-md leading-relaxed">
            Enter your product details to get AI-powered price recommendations with market analysis
          </p>
        </div>
      </section>
      {/* <div className="bg-[#C8FF00] rounded-xl p-8 text-[#0A0A0A] shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Price Prediction Tool</h1>
        <p className="text-[#0A0A0A]">
          Enter your product details to get AI-powered price recommendations with market analysis
        </p>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Prediction Form */}
        <div className="lg:col-span-1">
          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl p-6 shadow-md border border-black/10 space-y-4"
          >
            {/* Product Title */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                Product Title *
              </label>
              <textarea
                name="product_title"
                value={formData.product_title}
                onChange={handleChange}
                required
                placeholder="e.g., Handmade Wool Carpet with Traditional Patterns"
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00] resize-none"
                rows={3}
              />
              <p className="text-xs text-[#6B7280] mt-1">
                Length: {formData.title_length} | Keywords: {formData.keyword_count}
              </p>
            </div>

            {/* Category */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                Product Category *
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00] appearance-none bg-white"
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#6B7280]"
                  size={20}
                />
              </div>
            </div>

            {/* Shop Name */}
            <div className="form-group">
              <label className="block text-sm font-semibold text-[#0A0A0A] mb-2">
                Shop Name *
              </label>
              <input
                type="text"
                name="shop_name"
                value={formData.shop_name}
                onChange={handleChange}
                required
                placeholder="Your shop name"
                className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
              />
            </div>

            {/* Rating Section */}
            <div className="form-group pt-4 border-t border-black/10">
              <p className="text-sm font-semibold text-[#0A0A0A] mb-3">Product Metrics</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Rating (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating_numeric"
                    value={formData.rating_numeric}
                    onChange={handleChange}
                    min="0"
                    max="5"
                    step="0.1"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Number of Reviews
                  </label>
                  <input
                    type="number"
                    name="reviews_numeric"
                    value={formData.reviews_numeric}
                    onChange={handleChange}
                    min="0"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Rating Score (0-10)
                  </label>
                  <input
                    type="number"
                    name="rating_score"
                    value={formData.rating_score}
                    onChange={handleChange}
                    min="0"
                    max="10"
                    step="0.1"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Popularity Index (0-100)
                  </label>
                  <input
                    type="number"
                    name="popularity_index"
                    value={formData.popularity_index}
                    onChange={handleChange}
                    min="0"
                    max="100"
                    step="1"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>
              </div>
            </div>

            {/* Cost Section */}
            <div className="form-group pt-4 border-t border-black/10">
              <p className="text-sm font-semibold text-[#0A0A0A] mb-3">Cost Breakdown</p>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Material Cost ($) *
                  </label>
                  <input
                    type="number"
                    name="material_cost"
                    value={formData.material_cost}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Labor Hours *
                  </label>
                  <input
                    type="number"
                    name="labor_hours"
                    value={formData.labor_hours}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.5"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Hourly Rate ($) *
                  </label>
                  <input
                    type="number"
                    name="hourly_rate"
                    value={formData.hourly_rate}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#0A0A0A] mb-1">
                    Overhead Cost ($) *
                  </label>
                  <input
                    type="number"
                    name="overhead_cost"
                    value={formData.overhead_cost}
                    onChange={handleChange}
                    required
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="form-group pt-4 flex gap-2">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#C8FF00] text-[#0A0A0A] rounded-lg hover:bg-[#C8FF00]/90 transition-all font-semibold"
              >
                Predict Price
              </button>
              {submitted && (
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-4 py-2 bg-black/5 text-[#0A0A0A] rounded-lg hover:bg-black/10 transition-all font-semibold border border-black/10"
                >
                  Reset
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Morocco Map */}
        <div className="lg:col-span-2">
          <MoroccoMap highlightCities={highlightedCities} />
        </div>
      </div>

      {/* Prediction Results */}
      {submitted && (
        <div ref={resultsRef} className="space-y-6">
          <PredictionResults
            request={formData}
            onNavigateToRecommendations={onNavigateToRecommendations}
          />
        </div>
      )}
    </div>
  );
}
