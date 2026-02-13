"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Send, MapPinned, Star, Globe } from "lucide-react";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Disable parallax on small screens
      if (window.innerWidth < 768) return;

      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${x * 0.6}px, ${y * 0.6}px) scale(1.08)`;
      }

      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black">
      {/* Background image */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center transition-transform duration-200 ease-out"
        style={{
          backgroundImage: "url('/hero-cosmic.jpg')",
        }}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex min-h-screen items-start justify-center px-6 pt-32 text-center transition-transform duration-200 ease-out"
      >
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Your AI-powered{" "}
            <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              personal trip planner
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/80">
            Tell me what you want — flights, hotels, routes, itineraries.
            <br />
            Our AI handles everything.
          </p>

          {/* Functional Input */}
          <div className="mt-10 flex items-center justify-center p-4">
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
                  className="w-full bg-transparent border-none px-6 py-4 text-white placeholder:text-white/40 focus:outline-none focus:ring-0 text-base sm:text-lg"
                />

                <button
                  onClick={handleStartTrip}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2.5 rounded-full bg-linear-to-r from-purple-500 to-fuchsia-500 hover:from-purple-400 hover:to-fuchsia-400 text-white shadow-lg shadow-purple-500/20 transition-all hover:scale-105 active:scale-95"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section >
  );
}
