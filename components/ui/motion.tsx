"use client";

import { LazyMotion, MotionConfig, m, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./motion-features").then((module) => module.default);
const ease = [0.22, 1, 0.36, 1] as const;

export function MotionProvider({ children }: { children: ReactNode }) {
  return <LazyMotion features={loadFeatures} strict><MotionConfig reducedMotion="user">{children}</MotionConfig></LazyMotion>;
}

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduced = useReducedMotion();
  return <m.div data-reveal="" className={className}
    initial={reduced ? false : { opacity: 0, transform: "translateY(24px)" }}
    whileInView={{ opacity: 1, transform: "translateY(0px)" }}
    viewport={{ once: true, amount: 0.12, margin: "0px 0px -24px 0px" }}
    transition={{ duration: 0.6, delay, ease }}>{children}</m.div>;
}

export function Stagger({ children, className }: { children: ReactNode; className?: string }) {
  return <m.div data-reveal="" className={className} initial="hidden" whileInView="visible"
    viewport={{ once: true, amount: 0.08 }}
    variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.075 } } }}>{children}</m.div>;
}

export function MotionCard({ children, className }: { children: ReactNode; className?: string }) {
  const reduced = useReducedMotion();
  return <m.div data-reveal="" className={className}
    variants={{ hidden: { opacity: 0, transform: reduced ? "translateY(0px) scale(1)" : "translateY(22px) scale(1)" }, visible: { opacity: 1, transform: "translateY(0px) scale(1)", transition: { duration: 0.55, ease } } }}
    whileHover={reduced ? undefined : { transform: "translateY(-6px) scale(1.012)" }}
    whileTap={reduced ? undefined : { transform: "translateY(-3px) scale(0.99)" }}
    transition={{ type: "spring", stiffness: 300, damping: 24 }}>{children}</m.div>;
}
