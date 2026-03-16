"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Apple } from "lucide-react";

export default function CTA() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.fromTo(
      ctaRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 80%",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="cta" className="py-32 bg-white relative overflow-hidden">
      
      {/* Curved connecting line */}
      <svg className="absolute top-0 left-1/2 -translate-x-12 -mt-20 w-32 h-32 text-black pointer-events-none z-0" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
         <path d="M 50 0 C 80 30, 80 60, 50 100" />
      </svg>
      
      <div 
        ref={ctaRef} 
        className="max-w-4xl mx-auto px-6 text-center relative z-10"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-black tracking-tight mb-8 leading-tight max-w-2xl mx-auto">
          Get the App for Free
          <br />and Start Now
        </h2>
        
        <div className="flex justify-center">
          <button className="flex items-center gap-2 px-8 py-4 bg-black text-white font-bold rounded-2xl hover:bg-gray-900 transition-colors shadow-lg hover:shadow-xl">
             <Apple className="w-6 h-6" fill="white" />
             Download App
          </button>
        </div>
      </div>
      
      {/* Decorative Lime Circle far right top */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#d4ff15] rounded-full z-0 pointer-events-none blur-[2px]"></div>
    </section>
  );
}
