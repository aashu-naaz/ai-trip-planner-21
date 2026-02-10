"use client";

import { useEffect, useRef } from "react";
import TypingPlaceholder from "./TypingPlaceholder";

export default function Hero() {
  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
        className="relative z-10 flex min-h-screen items-center justify-center px-6 text-center transition-transform duration-200 ease-out"
      >
        <div className="max-w-5xl">
          <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white">
            Your AI-powered{" "}
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              personal trip planner
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-white/80">
            Tell me what you want — flights, hotels, routes, itineraries.
            <br />
            Our AI handles everything.
          </p>

          {/* AI typing prompt */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex w-full sm:w-[520px] items-center rounded-full bg-white/10 backdrop-blur-md px-6 py-4 text-white/70 text-left">
              <TypingPlaceholder />
              <span className="ml-1 animate-pulse">|</span>
            </div>

            {/* Glow button */}
            <button
              className="group relative flex items-center gap-2 rounded-full px-6 py-4 font-semibold text-white
              bg-gradient-to-r from-purple-500 to-fuchsia-500
              shadow-[0_0_20px_rgba(168,85,247,0.5)]
              hover:shadow-[0_0_40px_rgba(217,70,239,0.9)]
              hover:scale-105 transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-full blur-xl opacity-0 group-hover:opacity-100
                bg-gradient-to-r from-purple-500 to-fuchsia-500 transition duration-500" />

              <span className="relative z-10">✈ Create Trip</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
