"use client";

import React from "react";
import { Sliders, Sparkles, Navigation } from "lucide-react";

const steps = [
  {
    icon: <Sliders className="h-7 w-7 text-cyan-300" />,
    title: "Tell us your preferences",
    desc: "Share your interests, budget, travel style, and dates so our AI understands your perfect trip.",
  },
  {
    icon: <Sparkles className="h-7 w-7 text-violet-300" />,
    title: "AI builds your itinerary",
    desc: "Our AI instantly generates a personalized trip plan with routes, stays, and hidden gems.",
  },
  {
    icon: <Navigation className="h-7 w-7 text-fuchsia-300" />,
    title: "Travel smarter & faster",
    desc: "Navigate effortlessly with optimized routes, real-time insights, and AI guidance.",
  },
];

export default function HowItWorks() {
  return (
    <section className="relative overflow-hidden py-28">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
        <h2 className="mb-16 text-3xl font-extrabold tracking-tight text-white drop-shadow-[0_0_30px_rgba(168,85,247,0.35)] md:text-5xl">
          How it Works
        </h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div
              key={index}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl transition-all duration-300 hover:-translate-y-3 hover:bg-white/10 hover:shadow-[0_0_60px_rgba(168,85,247,0.25)]"
            >
              {/* Hover gradient */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-violet-500/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              {/* Icon */}
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 shadow-inner transition-transform duration-300 group-hover:scale-110">
                {step.icon}
              </div>

              <h3 className="mb-4 text-xl font-semibold text-white">
                {step.title}
              </h3>

              <p className="text-sm leading-relaxed text-white/70 md:text-base">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
