"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const feedbackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initial entry animation
    gsap.fromTo(
      containerRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    // Switch animation
    if (formRef.current) {
      gsap.fromTo(
        formRef.current.children,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.05, ease: "power2.out" }
      );
    }
  }, [isLogin]);

  useEffect(() => {
    // Feedback animation
    if (error || success) {
      gsap.fromTo(
        feedbackRef.current,
        { scale: 0.9, opacity: 0, y: -10 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      );

      const timer = setTimeout(() => {
        gsap.to(feedbackRef.current, {
          opacity: 0,
          y: -10,
          duration: 0.3,
          onComplete: () => {
            setError(null);
            setSuccess(null);
          },
        });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const validateRegister = () => {
    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    const baseUrl = "http://localhost:8000/api/v1";

    try {
      if (isLogin) {
        // Login - using form data as required by FastAPI OAuth2PasswordRequestForm
        const formData = new URLSearchParams();
        formData.append("username", email);
        formData.append("password", password);

        const response = await fetch(`${baseUrl}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Login failed. Please check your credentials.");
        }

        setSuccess("Login successful! Redirecting...");
        localStorage.setItem("token", data.access_token);
        // Redirect logic would go here
      } else {
        // Register
        if (!validateRegister()) {
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseUrl}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
            confirm_password: confirmPassword,
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Registration failed.");
        }

        setSuccess("Registration successful! You can now log in.");
        setIsLogin(true);
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col pt-10 bg-white">
      <Navbar />
      
      <section className="flex-1 flex items-center justify-center p-6 md:p-12 mt-10">
        <div 
          ref={containerRef}
          className="w-full max-w-5xl bg-[#d4ff15] rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row min-h-[600px]"
        >
          {/* Decorative Side */}
          <div className="md:w-5/12 bg-black text-white p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-4xl font-bold mb-6 leading-tight">
                {isLogin ? "Welcome Back to FairCraft AI" : "Start Your FairCraft Journey"}
              </h2>
              <p className="text-white/70 text-lg">
                {isLogin 
                  ? "Manage your investments and boost your capital flow with our AI-powered tools."
                  : "Join thousands of investors using AI to make better financial decisions."
                }
              </p>
            </div>

            <div className="mt-12 relative z-10">
               <div className="flex -space-x-3 mb-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-black bg-gray-300 flex items-center justify-center overflow-hidden">
                      <img src={`https://i.pravatar.cc/150?u=${i + 10}`} alt="user" />
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full border-2 border-black bg-[#d4ff15] text-black flex items-center justify-center text-xs font-bold">
                    +2k
                  </div>
               </div>
               <p className="text-sm font-medium">Join our community of smart investors.</p>
            </div>

            {/* Abstract Shapes */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-[#d4ff15]/10 rounded-full animate-blob"></div>
            <div className="absolute bottom-[-5%] left-[-5%] w-48 h-48 bg-[#d4ff15]/5 rounded-full animate-blob animation-delay-2000"></div>
          </div>

          {/* Form Side */}
          <div className="md:w-7/12 bg-white p-8 md:p-16 flex flex-col justify-center">
            <div className="mb-10 text-center md:text-left">
              <h3 className="text-3xl font-bold text-black mb-2">
                {isLogin ? "Log In" : "Create Account"}
              </h3>
              <p className="text-gray-500 font-medium">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button 
                  onClick={() => setIsLogin(!isLogin)}
                  className="ml-2 text-black font-bold hover:underline"
                >
                  {isLogin ? "Register now" : "Log in here"}
                </button>
              </p>
            </div>

            {/* Feedback Message */}
            {(error || success) && (
              <div 
                ref={feedbackRef}
                className={`mb-6 p-4 rounded-2xl flex items-center gap-3 ${
                  error ? "bg-red-50 text-red-600 border border-red-100" : "bg-green-50 text-green-600 border border-green-100"
                }`}
              >
                {error ? <AlertCircle className="w-5 h-5 flex-shrink-0" /> : <CheckCircle2 className="w-5 h-5 flex-shrink-0" />}
                <p className="text-sm font-semibold">{error || success}</p>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">First Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                      <input 
                        type="text"
                        placeholder="John"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black/20 focus:bg-white transition-all text-black font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Last Name</label>
                    <div className="relative group">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                      <input 
                        type="text"
                        placeholder="Doe"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black/20 focus:bg-white transition-all text-black font-medium"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black/20 focus:bg-white transition-all text-black font-medium"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                  <input 
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-12 outline-none focus:border-black/20 focus:bg-white transition-all text-black font-medium"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {!isLogin && (
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Confirm Password</label>
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-black transition-colors" />
                    <input 
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-black/20 focus:bg-white transition-all text-black font-medium"
                    />
                  </div>
                </div>
              )}

              {isLogin && (
                <div className="flex justify-end">
                  <Link href="#" className="text-sm font-bold text-gray-400 hover:text-black transition-colors">
                    Forgot Password?
                  </Link>
                </div>
              )}

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-[#d4ff15] text-black font-bold py-5 rounded-[1.5rem] shadow-lg hover:-translate-y-1 transition-all active:scale-95 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:hover:translate-y-0"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{isLogin ? "Sign In" : "Create Account"}</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
