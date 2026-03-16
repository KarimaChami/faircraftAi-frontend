import { ArrowRight, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 py-16 rounded-t-[3rem] mt-[-2rem] relative z-20">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-12 lg:gap-8">
        
        {/* Logo Column */}
        <div className="col-span-1 lg:col-span-2 text-white">
          <div className="relative inline-block mt-4">
             <span className="text-xl font-bold tracking-tight z-10 relative">FairCraft <span className="text-[#d4ff15]">AI</span></span>
             <div className="absolute top-[-2px] -right-4 w-7 h-7 bg-[#d4ff15] rounded-full z-0 mix-blend-screen opacity-90 block"></div>
          </div>
          <p className="mt-8 text-sm text-gray-400 max-w-sm">
             Intelligent valuation tailored for handcraft artisans, giving you deep market insights and real-time tracking.
          </p>
        </div>
        
        {/* Resources */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">Resources</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Pricing & Valuation</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Learn</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Help & Support</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
          </ul>
        </div>
        
        {/* Company */}
        <div>
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
          </ul>
        </div>
        
        {/* Subscribe */}
        <div className="col-span-1 lg:col-span-1 min-w-[280px]">
          <h4 className="text-white font-bold mb-6 text-sm tracking-wide">Subscribe to News</h4>
          <div className="relative flex items-center mb-10 w-full">
             <input 
               type="email" 
               placeholder="Your e-mail" 
               className="w-full bg-transparent border border-gray-600 rounded-2xl px-5 py-3.5 pr-14 text-white text-sm focus:outline-none focus:border-gray-400 placeholder-gray-500"
             />
             <button className="absolute right-2 top-2 bottom-2 w-10 flex border-none items-center justify-center bg-[#d4ff15] rounded-xl hover:bg-[#c3e61a] transition-colors text-black">
                <ArrowRight className="w-5 h-5" />
             </button>
          </div>
          
          {/* Socials at the bottom of the subscribe column as in design */}
          <div className="flex gap-4">
            <a href="#" className="text-white hover:text-[#d4ff15] transition-colors">
              <Facebook className="w-5 h-5 fill-current" />
            </a>
            <a href="#" className="text-white hover:text-[#d4ff15] transition-colors">
              <Twitter className="w-5 h-5 fill-current" />
            </a>
            <a href="#" className="text-white hover:text-[#d4ff15] transition-colors">
              <Instagram className="w-5 h-5 stroke-[2.5]" />
            </a>
          </div>
        </div>
        
      </div>
      
      <div className="max-w-7xl mx-auto px-6 mt-16 pt-8 text-xs text-gray-500 flex justify-between items-center">
        <p>© 2026 FairCraft AI. All rights reserved.</p>
      </div>
    </footer>
  );
}
