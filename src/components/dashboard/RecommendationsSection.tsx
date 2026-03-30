"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Send, MessageCircle, Lightbulb } from "lucide-react";

interface Message {
  type: "user" | "bot";
  content: string;
  timestamp: Date;
}

const defaultRecommendations = [
  "Consider increasing your hourly rate to improve profit margins on labor-intensive products.",
  "Your material costs are competitive. Focus on marketing to justify premium pricing.",
  "Target customers who value artisanal quality - you can command premium prices.",
  "Bundle similar products together to increase average order value.",
  "Reduce overhead costs by optimizing your production process.",
  "Invest in product photography to increase perceived value and justify higher prices.",
];

export default function RecommendationsSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "Hello! 👋 I'm your AI pricing assistant. I can help you understand pricing strategies, optimize your margins, and answer questions about your products. What would you like to know?",
      timestamp: new Date(),
    },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    gsap.fromTo(
      ".message-bubble",
      { y: 10, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        stagger: 0.05,
        ease: "power2.out",
      }
    );
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      type: "user",
      content: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "That's a great question! Based on market analysis, I'd recommend adjusting your pricing strategy. Your production costs are reasonable, so consider emphasizing the quality and craftsmanship in your product descriptions to justify premium pricing.",
        "I see. For products in your category, customers are willing to pay more when they understand the artisanal value. Creating detailed product descriptions and showcasing the creation process can increase perceived value.",
        "Excellent point. Your profit margins are healthy, but there's room for optimization. Have you considered seasonal pricing or creating premium product lines?",
        "Smart thinking! Many successful artisan businesses reduce costs while maintaining quality. This allows you to offer better prices while keeping healthy margins.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const botMessage: Message = {
        type: "bot",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
    }, 1000);
  };

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
                  <section className="relative overflow-hidden rounded-[2.5rem] bg-[#0A0A0A] p-10 lg:p-14 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(circle_at_70%_30%,_#C8FF00_0%,_transparent_70%)] opacity-20" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#C8FF00] rounded-full blur-[100px] opacity-10" />
        
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C8FF00]/10 border border-[#C8FF00]/20 mb-6 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C8FF00] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C8FF00]"></span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C8FF00]"> Recommendations </span>
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-6 leading-[0.9]">
            Recommendations & AI Chat
          </h1>
          
          <p className="text-lg text-gray-400 font-medium max-w-md leading-relaxed">
              Get personalized pricing advice and strategies to maximize your profits
          </p>
        </div>
      </section>
      {/* <div className="bg-[#C8FF00] rounded-xl p-8 text-[#0A0A0A] shadow-lg">
        <h1 className="text-3xl font-bold mb-2">Recommendations & AI Chat</h1>
        <p className="text-[#0A0A0A]">
          Get personalized pricing advice and strategies to maximize your profits
        </p>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chatbot */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md border border-black/10 overflow-hidden flex flex-col h-[600px]">
          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-white">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message-bubble flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-lg ${
                    message.type === "user"
                      ? "bg-[#C8FF00] text-[#0A0A0A] rounded-br-none"
                      : "bg-black/5 text-[#0A0A0A] rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      message.type === "user"
                        ? "text-[#0A0A0A]/70"
                        : "text-[#6B7280]"
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}

            {loading && (
              <div className="message-bubble flex justify-start">
                <div className="bg-black/5 text-[#0A0A0A] rounded-lg rounded-bl-none px-4 py-3">
                  <div className="flex gap-2">
                    <div className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-[#0A0A0A] rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form
            onSubmit={handleSendMessage}
            className="border-t border-black/10 p-4 bg-white"
          >
            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything about pricing..."
                className="flex-1 px-4 py-2 border border-black/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C8FF00]"
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading || !inputValue.trim()}
                className="px-4 py-2 bg-[#C8FF00] text-[#0A0A0A] rounded-lg hover:bg-[#C8FF00]/90 disabled:opacity-50 transition-all flex items-center gap-2 font-medium"
              >
                <Send size={18} />
              </button>
            </div>
          </form>
        </div>

        {/* Recommendations Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Quick Questions */}
          <div className="bg-[#C8FF00]/10 rounded-xl p-6 border border-[#C8FF00]/20">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
              <MessageCircle size={20} className="text-[#C8FF00]" />
              Quick Questions
            </h3>
            <div className="space-y-2">
              {[
                "How can I improve my profit margins?",
                "What pricing strategy works best?",
                "How do I handle competition?",
                "Should I offer discounts?",
              ].map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleQuickQuestion(q)}
                  className="w-full text-left text-sm px-3 py-2 bg-white hover:bg-[#C8FF00]/20 border border-[#C8FF00]/20 rounded-lg transition-colors text-[#0A0A0A] font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* AI Generated Recommendations */}
          <div className="bg-black/5 rounded-xl p-6 border border-black/10">
            <h3 className="text-lg font-bold text-[#0A0A0A] mb-4 flex items-center gap-2">
              <Lightbulb size={20} className="text-[#C8FF00]" />
              Recommendations
            </h3>
            <button
              onClick={() => setShowRecommendations(!showRecommendations)}
              className="w-full text-left text-sm font-semibold text-[#0A0A0A] hover:text-[#0A0A0A]/80 mb-3 flex items-center justify-between"
            >
              {showRecommendations ? "Hide" : "Show"} Recommendations
              <span>{showRecommendations ? "▼" : "▶"}</span>
            </button>

            {showRecommendations && (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {defaultRecommendations.map((rec, i) => (
                  <div key={i} className="flex gap-2 text-sm">
                    <span className="text-[#C8FF00] font-bold flex-shrink-0">
                      {i + 1}.
                    </span>
                    <p className="text-[#0A0A0A] leading-snug">{rec}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tips Card */}
          <div className="bg-[#C8FF00]/10 rounded-xl p-4 border border-[#C8FF00]/20">
            <p className="text-xs font-semibold text-[#0A0A0A] mb-2">💡 Pro Tip</p>
            <p className="text-sm text-[#0A0A0A] leading-relaxed">
              Ask follow-up questions to get more detailed advice. The more specific you are, the better recommendations I can provide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
