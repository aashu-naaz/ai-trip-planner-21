"use client";

import { ChevronDown, Send, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Hero() {
  const [inputValue, setInputValue] = useState("");
  const router = useRouter();

  const handleStartTrip = () => {
    if (inputValue.trim()) {
      router.push(`/create-new-trip?q=${encodeURIComponent(inputValue)}`);
    } else {
      router.push('/create-new-trip');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleStartTrip();
    }
  };

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <Image src="/hero-cosmic.jpg" alt="" fill priority sizes="100vw" className="object-cover" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div
        className="relative z-10 flex min-h-screen items-center justify-center px-4 sm:px-6 pt-20 text-center"
      >
        <div className="max-w-5xl pb-24">
          <div className="hero-enter mb-6"><span className="brand-badge"><Sparkles size={14} /> A little inspiration. A whole world to explore.</span></div>
          <h1 style={{ animationDelay: "80ms" }} className="hero-enter text-4xl sm:text-6xl font-bold tracking-tight text-white text-center">
            Your AI-powered{" "}
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              personal trip planner
            </span>
          </h1>

          <p style={{ animationDelay: "160ms" }} className="hero-enter mt-6 text-base sm:text-lg text-white/80">
            Tell me what you want — flights, hotels, routes, itineraries.
            <br />
            Our AI handles everything.
          </p>

          {/* Functional Input */}
          <div style={{ animationDelay: "240ms" }} className="hero-enter mt-10 flex items-center justify-center p-0 sm:p-4">
            <div className="relative w-full sm:w-[520px] max-w-full group">
              {/* Glow effect */}
              <div className="absolute -inset-1 rounded-full bg-linear-to-r from-purple-600 to-cyan-500 opacity-10 blur-sm transition group-focus-within:opacity-40 group-focus-within:duration-200" />

              <div className="relative flex items-center rounded-full bg-black/40 backdrop-blur-xl border border-white/10 shadow-2xl overflow-hidden ring-1 ring-white/10 focus-within:ring-2 focus-within:ring-purple-500/50">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Tell me your dream destination..."
                  aria-label="Your dream destination"
                  className="w-full bg-transparent border-none pl-6 pr-20 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-0 text-base sm:text-lg"
                />

                <button
                  aria-label="Start planning your trip"
                  onClick={handleStartTrip}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-3 rounded-full bg-linear-to-r from-violet-600 to-violet-500 hover:from-violet-500 hover:to-violet-400 text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-6 h-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <a href="#destinations" aria-label="Discover popular destinations" className="hero-enter absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-xs text-white/70 transition-colors hover:text-white" style={{ animationDelay: "360ms" }}>
        Discover what’s out there <ChevronDown className="size-5" />
      </a>
    </section>
  );
}
