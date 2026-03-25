"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MoroccoMapProps {
  region?: string;
  highlightCities?: string[];
}

const moroccoRegions = [
  { name: "Tangier", coords: "45%,30%" },
  { name: "Fez", coords: "48%,40%" },
  { name: "Rabat", coords: "35%,35%" },
  { name: "Casablanca", coords: "33%,42%" },
  { name: "Marrakech", coords: "38%,52%" },
  { name: "Agadir", coords: "32%,65%" },
  { name: "Meknes", coords: "46%,37%" },
  { name: "Oujda", coords: "58%,35%" },
];

export default function MoroccoMap({ highlightCities = [] }: MoroccoMapProps) {
  const mapRef = useRef<SVGSVGElement>(null);
  const dotsRef = useRef<SVGGElement>(null);

  useEffect(() => {
    if (mapRef.current && dotsRef.current) {
      // Animate map entrance
      gsap.fromTo(
        mapRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
      );

      // Animate dots with pulse effect
      const dots = dotsRef.current.querySelectorAll("circle");
      dots.forEach((dot, index) => {
        gsap.fromTo(
          dot,
          { r: 0, opacity: 0 },
          {
            r: 8,
            opacity: 1,
            duration: 0.6,
            delay: index * 0.05,
            ease: "back.out",
          }
        );

        // Add pulse animation
        gsap.to(dot, {
          r: 12,
          opacity: 0.3,
          duration: 1.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }
  }, []);

  return (
    <div className="w-full h-full min-h-96 bg-white rounded-xl p-6 shadow-md border border-slate-200">
      <h3 className="text-xl font-bold text-gray-900 mb-4">
        Artisans Distribution Map
      </h3>
      <div className="w-full flex justify-center">
        <svg
          ref={mapRef}
          viewBox="0 0 100 130"
          className="w-full max-w-md h-auto"
          style={{ filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))" }}
        >
          {/* Morocco simplified map shape */}
          <g id="morocco-map">
            {/* Simplified Morocco outline */}
            <path
              d="M 30 20 L 60 15 L 70 25 L 75 35 L 72 45 L 68 50 L 65 60 L 62 70 L 58 80 L 50 85 L 40 82 L 35 75 L 32 65 L 30 55 L 28 45 L 26 35 L 25 25 Z"
              fill="#f0f9ff"
              stroke="#3b82f6"
              strokeWidth="1"
            />

            {/* Grid lines for regions */}
            <g stroke="#e2e8f0" strokeWidth="0.5" opacity="0.5">
              <line x1="35" y1="20" x2="35" y2="85" />
              <line x1="50" y1="20" x2="50" y2="85" />
              <line x1="65" y1="20" x2="65" y2="85" />
              <line x1="25" y1="35" x2="75" y2="35" />
              <line x1="25" y1="50" x2="75" y2="50" />
              <line x1="25" y1="65" x2="75" y2="65" />
            </g>
          </g>

          {/* City markers */}
          <g ref={dotsRef}>
            {moroccoRegions.map((region, index) => (
              <g key={region.name}>
                <circle
                  cx={`${parseFloat(region.coords.split(",")[0])}%`}
                  cy={`${parseFloat(region.coords.split(",")[1])}%`}
                  r="6"
                  fill={
                    highlightCities.includes(region.name)
                      ? "#ef4444"
                      : "#3b82f6"
                  }
                  opacity="0.8"
                  style={{ cursor: "pointer" }}
                />
                <text
                  x={`${parseFloat(region.coords.split(",")[0])}%`}
                  y={`${parseFloat(region.coords.split(",")[1]) + 5}%`}
                  fontSize="3"
                  fill="#1f2937"
                  textAnchor="middle"
                  fontWeight="bold"
                >
                  {region.name}
                </text>
              </g>
            ))}
          </g>

          {/* Legend */}
          <g>
            <rect x="5" y="110" width="90" height="15" fill="white" opacity="0.9" stroke="#e2e8f0" />
            <circle cx="10" cy="117" r="2" fill="#3b82f6" />
            <text x="14" y="119" fontSize="3" fill="#1f2937">
              Artisans
            </text>
            <circle cx="35" cy="117" r="2" fill="#ef4444" />
            <text x="39" y="119" fontSize="3" fill="#1f2937">
              Concentrated
            </text>
          </g>
        </svg>
      </div>

      {/* City List */}
      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          Top Artisan Locations
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {moroccoRegions.map((region) => (
            <div
              key={region.name}
              className={`p-2 rounded-lg text-sm font-medium transition-all ${
                highlightCities.includes(region.name)
                  ? "bg-red-100 text-red-700 border border-red-200"
                  : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}
            >
              {region.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
