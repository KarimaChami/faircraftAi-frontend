"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

export default function Investments() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 75%",
      },
    });

    tl.fromTo(
      ".invest-title",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    ).fromTo(
      ".invest-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} className="py-20 px-4 sm:px-8 bg-white relative z-10 w-full">
      <div className="max-w-[90rem] mx-auto">
        <h2 className="invest-title text-[2.5rem] md:text-[3.5rem] font-bold text-black leading-[1.1] mb-12 max-w-sm tracking-tight">
          Get the Most Out<br />
          of Your Investments
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {/* Card 1 */}
          <div className="invest-card bg-[#f8f9fa] rounded-[2.5rem] p-10 lg:p-14 flex flex-col relative overflow-hidden min-h-[350px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] group transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <h3 className="text-2xl lg:text-[1.75rem] font-bold text-black mb-4 z-20">Unlimited Portfolio Accounts</h3>
            <p className="text-gray-500 max-w-[320px] z-20 text-[1.05rem] leading-relaxed mb-auto">Manage all your financial assets from one place</p>
            
            <div className="mt-12 z-20">
              <button className="flex items-center text-sm font-bold text-black group-hover:gap-3 transition-all">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            {/* Graphics for Card 1 */}
            <div className="absolute -bottom-8 -right-8 w-64 h-64 bg-[#d4ff15] rounded-[2.5rem] rotate-[20deg] transition-transform duration-700 group-hover:rotate-[30deg]"></div>
            <div className="absolute bottom-4 right-32 w-32 h-32 bg-black rounded-[2rem] -rotate-[15deg] transition-transform duration-700 group-hover:-rotate-[5deg]"></div>
            
            {/* Hand-drawn swirl */}
            <svg className="absolute bottom-20 right-16 w-20 h-20 text-black z-10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
               <path d="M 10 50 C 30 10, 90 10, 80 50 C 70 80, 20 80, 30 40 C 40 10, 80 30, 90 80" />
            </svg>
          </div>

          {/* Card 2 */}
          <div className="invest-card bg-[#f8f9fa] rounded-[2.5rem] p-10 lg:p-14 flex flex-col relative overflow-hidden min-h-[350px] shadow-[0_4px_30px_rgba(0,0,0,0.03)] group transition-all duration-300 hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)]">
            <h3 className="text-2xl lg:text-[1.75rem] font-bold text-black mb-4 z-20">Full Analytics in Your App</h3>
            <p className="text-gray-500 max-w-[320px] z-20 text-[1.05rem] leading-relaxed mb-auto">Analyze the results and try different strategies for more income</p>
            
            <div className="mt-12 z-20">
              <button className="flex items-center text-sm font-bold text-black group-hover:gap-3 transition-all">
                Read More <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
            
            {/* Graphics for Card 2 */}
            <div className="absolute bottom-0 right-0 w-[240px] h-[240px] translate-x-1/4 translate-y-1/4">
               {/* 3-Part Donut Chart */}
               <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  {/* Black segment */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="black" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="120" strokeLinecap="round" className="transition-all duration-700 group-hover:strokeDashoffset-[110]" />
                  {/* Lime segment */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#d4ff15" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="210" strokeLinecap="round" transform="rotate(160 50 50)" className="transition-all duration-700 group-hover:strokeDashoffset-[200]" />
                  {/* Coral/Red segment */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#ff6b6b" strokeWidth="12" strokeDasharray="251.2" strokeDashoffset="170" strokeLinecap="round" transform="rotate(220 50 50)" className="transition-all duration-700 group-hover:strokeDashoffset-[160]" />
               </svg>
            </div>

            {/* Line Chart Arrow inside the donut */}
            <div className="absolute bottom-[4.5rem] right-[3.5rem] w-28 h-28 transform transition-transform duration-700 group-hover:scale-110 flex items-center justify-center">
               <svg viewBox="0 0 100 60" fill="none" stroke="black" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M 10 45 L 30 35 L 45 45 L 75 15" />
                  <polyline points="60 15 80 10 75 30" />
               </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
