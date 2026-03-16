"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 60%",
      },
    });

    tl.fromTo(
      ".about-card",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section ref={containerRef} id="about" className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 space-y-32">
        
        {/* Section 1: Dark box over lime */}
        <div className="flex flex-col lg:flex-row items-center gap-16 about-card">
          <div className="lg:w-1/2 relative w-full aspect-[4/3] flex items-center justify-start">
             <div className="absolute left-0 bottom-4 w-4/5 h-4/5 bg-[#d4ff15] rounded-[3rem]"></div>
             <div className="absolute right-4 top-4 w-5/6 h-5/6 bg-[#171717] rounded-[2rem] shadow-2xl p-6 flex flex-col justify-between overflow-hidden">
               <div className="flex justify-between items-start text-white/50 text-sm font-medium">
                  <span>Price History</span>
                  <span className="text-[#d4ff15]">+15.2%</span>
               </div>
               <svg className="w-full h-full mt-4 text-white opacity-90" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <path d="M0 40 Q 10 30, 20 35 T 40 20 T 60 25 T 80 10 T 100 5 L 100 50 L 0 50 Z" fill="rgba(255,255,255,0.05)" />
                  <path d="M0 40 Q 10 30, 20 35 T 40 20 T 60 25 T 80 10 T 100 5" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
               </svg>
             </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6">
              Track in Real Time
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              No more waiting. Your calculations are executed immediately, the price of your crafts is updated every second and FairCraft AI always has the most relevant information.
            </p>
          </div>
        </div>

        {/* Section 2: Floating lists and lime circle */}
        <div className="flex flex-col lg:flex-row-reverse items-center gap-16 about-card">
          <div className="lg:w-1/2 relative w-full aspect-[4/3] flex items-center justify-center">
             <div className="absolute right-4 bottom-4 w-[350px] h-[350px] bg-[#d4ff15] rounded-full z-0"></div>
             
             {/* Floating lines connecting boxes */}
             <svg className="absolute inset-0 w-full h-full text-black z-0" viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="1.5">
               <path d="M100 150 C 200 150, 250 200, 200 350" />
               <path d="M150 250 C 300 250, 350 200, 300 100" />
             </svg>
             
             <div className="relative z-10 w-full max-w-sm space-y-4">
               {/* Card A */}
               <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-between ml-[-2rem] transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold">W</div>
                     <div>
                       <div className="text-black font-bold text-sm">Woodworking</div>
                       <div className="text-gray-400 text-xs">WDWK</div>
                     </div>
                  </div>
                  <div className="text-black font-bold">$1,882.03</div>
               </div>
               
               {/* Card B */}
               <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-between ml-8 transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold text-blue-600">C</div>
                     <div>
                       <div className="text-black font-bold text-sm">Ceramics</div>
                       <div className="text-gray-400 text-xs">CRM</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-black font-bold text-sm">$1,402.71</div>
                     <div className="text-red-500 text-xs font-bold">-3.2%</div>
                  </div>
               </div>
               
               {/* Card C */}
               <div className="bg-white rounded-2xl shadow-xl p-4 flex items-center justify-between ml-[-1rem] transform hover:-translate-y-1 transition-transform">
                  <div className="flex items-center gap-3">
                     <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center text-sm font-bold text-pink-500">K</div>
                     <div>
                       <div className="text-black font-bold text-sm">Knitting</div>
                       <div className="text-gray-400 text-xs">KNT</div>
                     </div>
                  </div>
                  <div className="text-right">
                     <div className="text-black font-bold text-sm">$669.12</div>
                     <div className="text-[#d4ff15] text-xs font-bold">+11.7%</div>
                  </div>
               </div>
             </div>
          </div>
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-bold text-black leading-tight mb-6 max-w-md">
              100,000+ Crafts in Your App
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              Price through FairCraft AI and you'll gain access to thousands of material markets from around the world, using a wide range of analytical tools. We are sure you will find the stats that's right for your handmade strategy.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
