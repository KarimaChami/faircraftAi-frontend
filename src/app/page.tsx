import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Investments from "@/components/Investments";
import Features from "@/components/Features";
import About from "@/components/About";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Investments />
      <Features />
      <About />
      <CTA />
      <Footer />
    </main>
  );
}
