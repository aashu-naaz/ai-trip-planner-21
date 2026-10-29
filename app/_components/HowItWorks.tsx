"use client";
import { m } from "motion/react";
import { MotionCard, Reveal, Stagger } from "@/components/ui/motion";

import { Send,SlidersHorizontal,Sparkles } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      icon: <SlidersHorizontal size={28} />,
      title: "Tell Us Your Preferences",
      description:
        "Share your interests, budget, travel style, and dates so our AI understands your perfect journey.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "AI Builds Your Itinerary",
      description:
        "Our AI instantly generates a personalized travel plan with optimized routes, stays, and hidden gems.",
    },
    {
      icon: <Send size={28} />,
      title: "Travel Smarter & Faster",
      description:
        "Navigate effortlessly with real-time insights, recommendations, and intelligent travel guidance.",
    },
  ];

  return (
    <section id="how-it-works" className="relative py-16 px-6 max-w-7xl mx-auto">

      {/* ===== Title ===== */}
      <Reveal className="text-center mb-20 relative z-10">
        <h2
          className="
          text-4xl sm:text-5xl md:text-6xl font-extrabold
          bg-linear-to-r from-purple-400 via-violet-400 to-cyan-400
          bg-clip-text text-transparent
          tracking-tight
        "
        >
          How It Works
        </h2>

        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          Plan your journey in three intelligent steps powered by AI.
        </p>
      </Reveal>

      {/* ===== Flight Path (Desktop Only) ===== */}
      <div className="absolute inset-0 hidden md:block pointer-events-none z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 600"
          fill="none"
          preserveAspectRatio="none"
        >
          <m.path
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
            d="M 100,200 Q 400,50 600,300 T 1100,200"
            stroke="url(#flight-gradient)"
            strokeWidth="2"
            strokeDasharray="12 12"
          />
          <defs>
            <linearGradient id="flight-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#A855F7" />
              <stop offset="50%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#22D3EE" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* ===== Cards ===== */}
      <Stagger className="grid md:grid-cols-3 gap-6 lg:gap-10">

        {steps.map((step, index) => (
          <MotionCard
            key={index}
            className="
              relative rounded-3xl p-px
              bg-linear-to-br from-purple-500/30 via-violet-500/30 to-cyan-400/30
            "
          >
            <div
              className="
                rounded-3xl bg-card
                p-6 lg:p-10 text-center
                border border-white/10
                hover:border-cyan-400/40
                transition duration-300
              "
            >
              {/* Icon Circle */}
              <div
                className="
                  w-16 h-16 mx-auto mb-6
                  flex items-center justify-center
                  rounded-full
                  bg-white/5
                  border border-white/10
                  text-cyan-400
                "
              >
                {step.icon}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-white">
                {step.title}
              </h3>

              <p className="text-white/60 text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          </MotionCard>
        ))}

      </Stagger>
    </section>
  );
}
