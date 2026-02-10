"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* 🔥 GLOW ANIMATION */}
      <style jsx>{`
        @keyframes glowPulse {
          0% {
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.4),
              0 0 20px rgba(59, 130, 246, 0.2);
          }
          50% {
            text-shadow: 0 0 22px rgba(168, 85, 247, 0.9),
              0 0 40px rgba(59, 130, 246, 0.6);
          }
          100% {
            text-shadow: 0 0 10px rgba(168, 85, 247, 0.4),
              0 0 20px rgba(59, 130, 246, 0.2);
          }
        }
      `}</style>

      <header
        className={`
          fixed top-0 z-50 w-full
          transition-all duration-300
          ${scrolled
            ? "py-2 backdrop-blur-2xl bg-black/60 border-b border-white/10"
            : "py-4 backdrop-blur-xl bg-black/35"}
        `}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          
          {/* LOGO + BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo-airplane.png"
              alt="Smart Journey"
              width={scrolled ? 32 : 40}
              height={scrolled ? 32 : 40}
              className="rounded-full transition-all duration-300"
              priority
            />

            <span
              className={`
                font-[var(--font-playfair)]
                font-semibold
                tracking-wide
                bg-gradient-to-r
                from-violet-300
                via-purple-400
                to-cyan-400
                bg-clip-text
                text-transparent
                animate-[glowPulse_3s_ease-in-out_infinite]
                transition-all duration-300
                ${scrolled ? "text-[22px]" : "text-[28px]"}
              `}
            >
              Smart Journey
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-12">
            {["Home", "Pricing", "Contact us"].map((item) => (
              <Link
                key={item}
                href="#"
                className="
                  font-[var(--font-playfair)]
                  text-sm
                  tracking-[0.25em]
                  uppercase
                  text-white/75
                  hover:text-white
                  transition
                  relative
                  after:absolute
                  after:left-0
                  after:-bottom-1
                  after:h-[1px]
                  after:w-0
                  after:bg-gradient-to-r
                  after:from-purple-400
                  after:to-cyan-400
                  after:transition-all
                  hover:after:w-full
                "
              >
                {item}
              </Link>
            ))}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            <Link
              href="/create-trip"
              className="
                rounded-full
                bg-gradient-to-r
                from-purple-500
                to-violet-600
                px-6
                py-2
                text-sm
                font-medium
                text-white
                shadow-lg
                shadow-purple-500/40
                hover:scale-105
                transition
              "
            >
              Create New Trip
            </Link>

            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
    </>
  );
}
