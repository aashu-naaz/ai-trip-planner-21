"use client";

import { UserButton,useUser } from "@clerk/nextjs";
import { Menu,Sparkles,X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, m } from "motion/react";
import { useState } from "react";

const navigation = [
  { name: "Home", path: "/" },
  { name: "Pricing", path: "/pricing" },
  { name: "Contact us", path: "/contact-us" },
];

export default function Header() {
  const pathname = usePathname();
  const { isSignedIn, isLoaded } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const planning = pathname === "/create-new-trip" || pathname.startsWith("/view-trip");

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between gap-2 px-3 sm:px-6 lg:px-10">
        <Link href="/" onClick={() => setMenuOpen(false)} className="flex min-w-0 shrink-0 items-center gap-1.5 sm:gap-3" aria-label="SmartJourney home">
          <Image src="/logo.svg" alt="" width={36} height={36} className="rounded-full border border-border" priority />
          <span className="text-base min-[375px]:text-lg font-semibold tracking-tight sm:text-2xl">Smart<span className="text-violet-300">Journey</span></span>
        </Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
          {navigation.map(({ name, path }) => (
            <Link key={path} href={path} aria-current={pathname === path ? "page" : undefined} className={`border-b-2 py-2 text-sm font-medium transition-colors ${pathname === path ? "border-violet-400 text-foreground" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{name}</Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {!isLoaded ? <div role="status" aria-label="Loading account" className="h-10 w-20 animate-pulse rounded-full bg-muted" /> : isSignedIn ? <>
            <Link href={planning ? "/my-trips" : "/create-new-trip"} className="brand-button hidden sm:inline-flex"><Sparkles size={16} />{planning ? "My trips" : "Create a trip"}</Link>
            <UserButton afterSignOutUrl="/" />
          </> : <>
            <Link href="/sign-in" className="hidden px-2 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground sm:block">Sign in</Link>
            <Link href="/sign-up" className="brand-button !px-3 sm:!px-4">Sign up</Link>
          </>}
          <button type="button" aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)} className="flex size-11 items-center justify-center rounded-xl border border-border text-foreground lg:hidden">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      <AnimatePresence>{menuOpen && <m.nav initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.18 }} id="mobile-navigation" aria-label="Mobile navigation" className="space-y-1 border-t border-border bg-background p-4 lg:hidden">
        {[...navigation, ...(isSignedIn ? [{ name: "My trips", path: "/my-trips" }, { name: "Create a trip", path: "/create-new-trip" }] : [{ name: "Sign in", path: "/sign-in" }])].map(({ name, path }) => <Link key={path} href={path} onClick={() => setMenuOpen(false)} aria-current={pathname === path ? "page" : undefined} className={`block rounded-xl px-4 py-3 text-sm ${pathname === path ? "bg-primary/15 text-violet-300" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>{name}</Link>)}
      </m.nav>}</AnimatePresence>
    </header>
  );
}
