"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, HelpCircle, Coins, Check } from "lucide-react";

export default function Features() {
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
      ".advantage-text",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.out" }
    ).fromTo(
      ".advantage-row",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const featuresList = [
    {
      title: "Smooth Start",
      description: "Without complex setups, we will prepare your artisan pricing profile in 5 minutes.",
      Icon: Sparkles,
      buttonText: "Create Profile",
    },
    {
      title: "24/7 Support",
      description: "Our support team is always available to answer questions and resolve any issues.",
      Icon: HelpCircle,
      buttonText: "Ask a Question",
    },
    {
      title: "Fair Pricing",
      description: "We give you the best rate for your time and materials. No hidden fees.",
      Icon: Coins,
      buttonText: "Explore Prices",
    },
    {
      title: "Price Any Item",
      description: "You don't have to have large inventories to start calculating, start small.",
      Icon: Check,
      buttonText: "Start Now",
    },
  ];

  return (
    <section ref={containerRef} id="advantages" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          
          {/* Left Column - Title */}
          <div className="lg:w-1/3 advantage-text">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6 tracking-tight">
              Advantages
            </h2>
            <p className="text-xl text-gray-500 leading-relaxed max-w-sm">
              We listen to our creators and work with them to improve the user experience of our platform
            </p>
          </div>

          {/* Right Column - Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {featuresList.map((feature, idx) => (
              <div
                key={idx}
                className="advantage-row flex flex-col items-start relative border-l border-gray-100 pl-6 sm:border-none sm:pl-0"
              >
                {/* Depending on layout, we can add top borders to simulate the grid lines from the reference. For simplicity, just use simple grid. */}
                <div className="absolute top-0 -left-[14px] sm:static sm:mb-4">
                  <div className="w-8 h-8 rounded-full bg-[#d4ff15] flex items-center justify-center relative">
                     <feature.Icon className="w-5 h-5 text-black absolute top-1.5 left-1.5" strokeWidth={2.5}/>
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-black mb-3">{feature.title}</h3>
                <p className="text-gray-500 leading-relaxed mb-6 flex-grow">{feature.description}</p>
                
                <button className="px-5 py-2.5 bg-gray-100 text-sm font-bold text-black rounded-xl hover:bg-gray-200 transition-colors">
                  {feature.buttonText}
                </button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Decorative Grid Lines to match screenshot */}
        <div className="hidden lg:block absolute border-t border-gray-100 w-[60%] right-[10%] mt-[-200px] pointer-events-none"></div>
        <div className="hidden lg:block absolute border-l border-gray-100 h-[400px] left-[65%] mt-[-400px] pointer-events-none"></div>
      </div>
    </section>
  );
}
