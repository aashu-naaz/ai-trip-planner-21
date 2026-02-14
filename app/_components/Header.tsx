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
      {/* Refined Cosmic Glow Animation */}
      <style jsx>{`
        @keyframes cosmicGlow {
          0%, 100% {
            filter: drop-shadow(0 0 8px rgba(168, 85, 247, 0.4));
          }
          50% {
            filter: drop-shadow(0 0 15px rgba(59, 130, 246, 0.7));
          }
        }
      `}</style>

      <header
        className="fixed top-0 left-0 w-full z-50 flex items-center px-4 md:px-10 py-4 transition-all duration-300 backdrop-blur-md bg-black/20 border-b border-white/10"
      >
        <div className="mx-auto flex max-w-7xl w-full items-center justify-between">

          {/* --- IMPROVED LOGO + BRAND SECTION --- */}
          <Link href="/" className="group flex items-center gap-3 transition-transform hover:scale-[1.02]">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur-md opacity-0 group-hover:opacity-60 transition-opacity duration-500" />
              <Image
                src="/logo.svg"
                alt="SmartJourney"
                width={38}
                height={38}
                className="relative rounded-full border border-white/20 shadow-xl transition-all duration-300 group-hover:border-white/40"
                priority
              />
            </div>

            <span
              className="font-bold tracking-tight bg-gradient-to-r from-indigo-200 via-purple-300 to-cyan-300 bg-clip-text text-transparent text-[24px] animate-[cosmicGlow_4s_ease-in-out_infinite]"
              style={{ fontFamily: 'var(--font-playfair), serif' }}
            >
              Smart<span className="font-extrabold text-white">Journey</span>
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
                  className={`relative font-medium tracking-wide text-base transition-colors duration-300 ${
                    isActive ? "text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {item.name}
                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
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
                className="rounded-full bg-white/10 backdrop-blur-md border border-white/20 px-6 py-2 text-sm font-medium text-white shadow-lg hover:bg-white/20 hover:scale-105 transition"
              >
                My Trips
              </Link>
            ) : (
              <Link
                href="/create-new-trip"
                className="flex items-center gap-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 transition-all duration-300"
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