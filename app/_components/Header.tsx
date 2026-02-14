"use client";

import Image from "next/image";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function Header() {
  const pathname = usePathname();

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
          fixed top-0 left-0 w-full z-50
          flex items-center px-4 md:px-10
          py-4
          transition-all duration-300
          backdrop-blur-md bg-black/20 border-b border-white/10
        `}
      >
        <div className="mx-auto flex max-w-7xl w-full items-center justify-between">

          {/* LOGO + BRAND */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/logo.svg"
              alt="SmartJourney"
              width={40}
              height={40}
              className="rounded-full transition-all duration-300"
              priority
            />

            <span
              className={`
                font-(--font-playfair)
                font-semibold
                tracking-wide
                bg-linear-to-r
                from-violet-300
                via-purple-400
                to-cyan-400
                bg-clip-text
                text-transparent
                animate-[glowPulse_3s_ease-in-out_infinite]
                transition-all duration-300
                text-[26px]
              `}
            >
              SmartJourney
            </span>
          </Link>

          {/* NAV */}
          <nav className="hidden md:flex items-center gap-10">
            {[
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing" },
              { name: "Contact us", path: "/contact-us" },
            ].map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`
                    relative
                    font-medium
                    tracking-wide
                    text-base
                    transition-colors duration-300
                    ${isActive ? "text-white" : "text-white/60 hover:text-white"}
                  `}
                >
                  {item.name}

                  {/* Active Indicator (Glowing Dot) */}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-linear-to-r from-purple-500 to-cyan-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* ACTIONS */}
          <div className="flex items-center gap-4">
            {pathname === '/create-new-trip' || pathname.startsWith('/view-trip') ? (
              <Link
                href="/my-trips"
                className="
                rounded-full
                bg-white/10
                backdrop-blur-md
                border border-white/20
                px-6
                py-2
                text-sm
                font-medium
                text-white
                shadow-lg
                hover:bg-white/20
                hover:scale-105
                transition
              "
              >
                My Trips
              </Link>
            ) : (
              <Link
                href="/create-new-trip"
                className="
                flex items-center gap-2
                rounded-full
                bg-linear-to-r
                from-indigo-500
                to-purple-600
                px-6
                py-2.5
                text-sm
                font-bold
                text-white
                shadow-lg
                shadow-indigo-500/30
                hover:shadow-indigo-500/50
                hover:scale-105
                transition-all duration-300
              "
              >
                <Sparkles className="w-4 h-4 text-white fill-white/20" />
                Create New Trip
              </Link>
            )}

            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </header>
    </>
  );
}
