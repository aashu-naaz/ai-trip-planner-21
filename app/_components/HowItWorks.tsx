"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, Sparkles, Send } from "lucide-react";

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
    <section className="relative py-28 px-8">

      {/* ===== Title ===== */}
      <div className="text-center mb-20">
        <h2
          className="
          text-5xl md:text-6xl font-extrabold
          bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400
          bg-clip-text text-transparent
          tracking-tight
        "
        >
          How It Works
        </h2>

        <p className="text-white/60 mt-4 max-w-xl mx-auto">
          Plan your journey in three intelligent steps powered by AI.
        </p>
      </div>

      {/* ===== Cards ===== */}
      <div className="grid md:grid-cols-3 gap-10">

        {steps.map((step, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="
              relative rounded-3xl p-[1px]
              bg-gradient-to-br from-purple-500/30 via-pink-500/30 to-cyan-400/30
            "
          >
            <div
              className="
                rounded-3xl bg-black/40 backdrop-blur-xl
                p-10 text-center
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
          </motion.div>
        ))}

      </div>
    </section>
  );
}
