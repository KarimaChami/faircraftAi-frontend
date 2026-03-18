"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { Apple } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    gsap.fromTo(
      ".nav-item",
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-4" : "bg-transparent py-8"
      }`}
    >
      <div className="max-w-[90rem] mx-auto px-6 lg:px-10 flex justify-between items-center relative">
        {/* Logo */}
        <Link href="/" className="relative flex items-center nav-item">
          <span className="text-xl font-black tracking-tight text-black z-10 mr-1">
            FairCraft
          </span>
          <span className="text-xl font-black tracking-tight text-black z-10 relative">
            AI
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#d4ff15] -z-10"></div>
          </span>
        </Link>
        
        {/* Center Links */}
        <div className="hidden md:flex gap-10 items-center absolute left-1/2 -translate-x-1/2">
          <Link href="#about" className="text-gray-800 hover:text-black text-sm font-semibold nav-item">
            About Us
          </Link>
          <Link href="#features" className="text-gray-800 hover:text-black text-sm font-semibold nav-item">
            Catalog
          </Link>
          <Link href="#pricing" className="text-gray-800 hover:text-black text-sm font-semibold nav-item">
            Price
          </Link>
          <Link href="#help" className="text-gray-800 hover:text-black text-sm font-semibold nav-item">
            Help
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex gap-4 items-center">
          <Link
            href="/auth"
            className="bg-gray-100 text-black px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-gray-200 transition-colors nav-item"
          >
            Log In
          </Link>
          <Link
            href="#download"
            className="bg-black text-white px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 hover:bg-gray-800 transition-colors shadow-lg nav-item"
          >
            <Apple className="w-4 h-4" fill="white" />
            Download App
          </Link>
        </div>
      </div>
    </nav>
  );
}
