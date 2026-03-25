"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Apple, ArrowDown, Search, ArrowRight, Star } from "lucide-react";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-content > *",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, delay: 0.2 }
    ).fromTo(
      ".mockup-container",
      { y: 50, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1 },
      "-=0.6"
    ).fromTo(
      ".hero-arrow",
      { strokeDasharray: 1000, strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
      "-=0.5"
    );
  }, []);

  return (
    <section className="pt-24 pb-12 px-4 sm:px-8 bg-white min-h-screen flex flex-col items-center">
      <div 
        ref={heroRef}
        className="w-full max-w-[90rem] mx-auto bg-[#d4ff15] rounded-[3rem] p-10 lg:p-20 relative overflow-hidden flex flex-col lg:flex-row items-center justify-between min-h-[85vh]"
      >
        
        {/* Left Content */}
        <div className="hero-content w-full lg:w-1/2 xl:w-5/12 relative z-20 flex flex-col items-start pt-10 lg:pt-0 pb-10">
          <div className="relative inline-block mb-6">
            <h1 className="text-[3.5rem] md:text-[5rem] lg:text-[6rem] font-bold tracking-tight text-black leading-[1.05]">
              Invest for<br />
              the Future
            </h1>
            <svg className="absolute -right-16 top-4 w-12 h-12 text-black" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20"></path>
              <path d="M2 12h20"></path>
              <path d="M5 5l14 14"></path>
              <path d="M5 19L19 5"></path>
            </svg>
          </div>
          
          <p className="text-xl md:text-2xl text-black/80 max-w-[420px] mb-12 font-medium leading-relaxed">
            Work with all the necessary information and tools to boost money flow from your capital investment using FairCraft AI!
          </p>
          
          <button className="flex items-center gap-3 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-lg hover:-translate-y-1 mb-20 lg:mb-32">
             <Apple className="w-5 h-5 -mt-1" fill="white" />
             <span className="text-lg">Download App</span>
          </button>
          
          <button className="flex items-center gap-2 text-black font-semibold text-sm hover:underline mt-auto">
             Find Out More <ArrowDown className="w-4 h-4 ml-1" />
          </button>
        </div>

        {/* Drawn Curve Arrow pointing from button to phones */}
        <div className="absolute top-[40%] left-[28%] lg:left-[32%] w-1/3 h-[40%] z-10 pointer-events-none hidden lg:block">
          <svg className="w-full h-full hero-arrow" viewBox="0 0 400 300" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="none">
             {/* Path curving down from title area, then right and pointing to bottom of the light phone */}
             <path d="M 50,20 C 350,20 400,280 150,250" />
             <path d="M 170,230 L 150,250 L 170,270" />
          </svg>
        </div>

        {/* Right Content - Mockups */}
        <div className="mockup-container w-full lg:w-1/2 xl:w-7/12 mt-20 lg:mt-0 relative h-[650px] flex items-center justify-center lg:justify-end z-20">
          
          {/* Dark Mockup (Back) */}
          <div className="absolute left-1/2 lg:left-32 xl:left-40 top-10 w-[300px] h-[600px] bg-[#111] rounded-[2.5rem] p-6 shadow-2xl border-4 border-[#222] rotate-[6deg] flex flex-col -translate-x-1/2 lg:-translate-x-0">
            <div className="flex justify-between items-center text-white mb-8 mt-2">
               <ArrowRight className="w-5 h-5 rotate-180" />
               <div className="text-center">
                  <Apple className="w-4 h-4 fill-current mx-auto mb-1" />
                  <div className="text-sm font-bold tracking-wide">Apple Inc</div>
                  <div className="text-[10px] text-gray-400">AAPL</div>
               </div>
               <Star className="w-5 h-5 text-gray-500" />
            </div>
            
            <div className="text-center mb-8">
               <div className="text-[2rem] font-bold text-white mb-1">$132.15</div>
               <div className="text-[11px] font-bold text-[#d4ff15]">↑1.25% +$1.73</div>
            </div>
            
            {/* Chart placeholder */}
            <div className="flex-1 relative mb-6 border-b border-gray-800 flex items-center">
                <svg className="w-full h-24" viewBox="0 0 100 50" preserveAspectRatio="none" suppressHydrationWarning>
                   {/* Fake candelsticks pattern - using fixed data to avoid hydration mismatch */}
                   {[
                     {h: 22, y: 14, isUp: true},
                     {h: 28, y: 11, isUp: false},
                     {h: 16, y: 17, isUp: false},
                     {h: 20, y: 15, isUp: false},
                     {h: 24, y: 13, isUp: true},
                     {h: 26, y: 12, isUp: true},
                     {h: 26, y: 12, isUp: true},
                     {h: 32, y: 9, isUp: true},
                     {h: 28, y: 11, isUp: true},
                     {h: 30, y: 10, isUp: true},
                     {h: 24, y: 13, isUp: false},
                     {h: 29, y: 10.5, isUp: false},
                     {h: 18, y: 16, isUp: false},
                     {h: 27, y: 11.5, isUp: true},
                     {h: 20, y: 15, isUp: true},
                     {h: 25, y: 12.5, isUp: false},
                     {h: 22, y: 14, isUp: false},
                     {h: 24, y: 13, isUp: true},
                     {h: 19, y: 15.5, isUp: true},
                     {h: 23, y: 13.5, isUp: false}
                   ].map((data, i) => {
                      const color = data.isUp ? "#d4ff15" : "#ff4757";
                      return (
                         <g key={i}>
                           <line x1={i*5 + 2} y1={data.y-5} x2={i*5 + 2} y2={data.y+data.h+5} stroke={color} strokeWidth="0.5" />
                           <rect x={i*5} y={data.y} width="4" height={data.h} fill={color} rx="1" />
                         </g>
                      )
                   })}
                   <path d="M0 45 Q 30 20 60 30 T 100 20" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                   <path d="M0 5 Q 30 30 60 10 T 100 30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1" />
                </svg>
            </div>
            
            <div className="flex justify-between text-[11px] text-gray-500 font-bold px-2 mb-4">
               <span className="text-white bg-gray-800 px-3 py-1 rounded">1H</span>
               <span>4H</span>
               <span>Day</span>
               <span>Week</span>
               <span>Month</span>
            </div>
          </div>

          {/* Light Mockup (Front) */}
          <div className="absolute left-1/2 lg:left-auto lg:right-10 top-0 w-[340px] h-[720px] bg-white rounded-[3rem] p-7 shadow-2xl border-[6px] border-gray-50 -rotate-[4deg] flex flex-col -translate-x-1/2 lg:-translate-x-0 !z-30">
             
             {/* Header */}
             <div className="text-[1.75rem] font-bold text-black mb-6 mt-4 tracking-tight">Market</div>
             
             {/* Search */}
             <div className="flex items-center bg-gray-50 border border-gray-100 rounded-[1rem] px-4 py-3.5 mb-5 shadow-sm">
                <Search className="w-4 h-4 text-gray-400 mr-3" />
                <div className="text-sm text-gray-400 font-medium">Find stocks, funds, bonds...</div>
                <div className="ml-auto w-7 h-7 bg-white rounded-md flex items-center justify-center shadow-sm border border-gray-100">
                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2.5" strokeLinecap="round"><line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line><line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line><line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line><line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line><line x1="17" y1="16" x2="23" y2="16"></line></svg>
                </div>
             </div>
             
             {/* Pills */}
             <div className="flex gap-2 overflow-x-hidden mb-6">
                <div className="bg-white px-4 py-2 rounded-xl text-xs font-bold text-black border border-gray-200 shadow-sm">Stocks</div>
                <div className="bg-transparent px-4 py-2 rounded-xl text-xs font-bold text-gray-400">Funds</div>
                <div className="bg-transparent px-4 py-2 rounded-xl text-xs font-bold text-gray-400">Bonds</div>
                <div className="bg-transparent px-4 py-2 rounded-xl text-xs font-bold text-gray-400">Currencies</div>
             </div>
             
             {/* Collections */}
             <div className="text-[10px] font-bold text-gray-400 mb-3 tracking-widest uppercase ml-1">Collections</div>
             <div className="bg-[#1a1a1a] rounded-[1.5rem] p-5 mb-8 relative overflow-hidden shadow-lg">
                <div className="text-white font-bold text-base mb-1 z-10 relative">Dividend Strategy</div>
                <div className="text-gray-400 text-xs mb-6 z-10 relative">Balanced diversified portfolio with low risks</div>
                
                <div className="flex justify-between items-end z-10 relative">
                  <div>
                    <div className="text-[#d4ff15] font-bold text-xl">+6.48%</div>
                    <div className="text-gray-500 text-[11px] font-medium">per year</div>
                  </div>
                  <div className="flex -space-x-3">
                     <div className="w-8 h-8 rounded-full bg-[#1da1f2] border-2 border-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white z-40">&</div>
                     <div className="w-8 h-8 rounded-full bg-[#ea4335] border-2 border-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white z-30">C</div>
                     <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white z-20">T</div>
                     <div className="w-8 h-8 rounded-full bg-gray-700 border-2 border-[#1a1a1a] flex items-center justify-center text-[10px] font-bold text-white z-10">+22</div>
                  </div>
                </div>
             </div>
             
             {/* Favorites */}
             <div className="flex justify-between items-center mb-4 px-1">
                <div className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">Favorites</div>
                <ArrowRight className="w-4 h-4 text-gray-400" />
             </div>
             
             <div className="flex gap-4 overflow-hidden mb-auto">
                <div className="w-[140px] rounded-[1.5rem] border border-gray-100 p-4 shadow-sm flex-shrink-0 bg-white">
                   <Apple className="w-8 h-8 mb-4" fill="black" />
                   <div className="text-sm font-bold text-black mb-1">Apple Inc</div>
                   <div className="text-[11px] font-bold text-gray-500">$132.15 <span className="text-[#a4d100] font-bold ml-1">+1.25%</span></div>
                </div>
                <div className="w-[140px] rounded-[1.5rem] border border-gray-100 p-4 shadow-sm flex-shrink-0 bg-white">
                   <div className="w-8 h-8 rounded-full bg-[#1db954] mb-4 flex items-center justify-center">
                      <div className="w-3 h-3 bg-white rounded-full"></div>
                   </div>
                   <div className="text-sm font-bold text-black mb-1">Spotify</div>
                   <div className="text-[11px] font-bold text-gray-500">$292.92 <span className="text-[#a4d100] font-bold ml-1">+2.06%</span></div>
                </div>
             </div>
             
             {/* Action Buttons */}
             <div className="flex gap-3 mt-8 pb-2">
                <div className="flex-1 bg-[#ff6b6b] text-white py-4 rounded-[1.25rem] font-bold text-center text-sm shadow-sm cursor-pointer hover:bg-[#ff5252] transition-colors">Sell</div>
                <div className="flex-[1.8] bg-[#d4ff15] text-black py-4 rounded-[1.25rem] font-bold text-center text-sm shadow-sm cursor-pointer hover:bg-[#c3e61a] transition-colors">Buy</div>
             </div>
             
          </div>

        </div>
      </div>
    </section>
  );
}
