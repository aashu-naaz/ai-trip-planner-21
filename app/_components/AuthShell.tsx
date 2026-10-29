"use client";

import { ClerkFailed,ClerkLoading } from "@clerk/nextjs";
import { ArrowLeft,Compass,MapPinned,Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/motion";
import Link from "next/link";

export default function AuthShell({ children, mode }: {
  children: React.ReactNode;
  mode: "sign-in" | "sign-up";
}) {
  const signingIn = mode === "sign-in";
  return (
    <main className="page-shell flex items-center">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2 lg:gap-20">
        <Reveal className="text-center lg:text-left">
          <Link href="/" className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeft size={16} /> Back to exploring
          </Link>
          <div className="mb-6"><span className="brand-badge"><Sparkles size={14} /> Your next adventure starts here</span></div>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            {signingIn ? "Welcome back to" : "A world of possibilities."}
            <span className="brand-text mt-2 block">{signingIn ? "your next adventure." : "A plan made for you."}</span>
          </h1>
          <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
            {signingIn ? "Pick up where you left off. Your saved trips and new discoveries are waiting for you." : "Bring your travel ideas to life with personalized itineraries, thoughtful recommendations, and all your plans in one place."}
          </p>
          <div className="mt-10 hidden gap-4 lg:grid">
            {[{ icon: Compass, title: "Made for your travel style", text: "Plan around the things you love." }, { icon: MapPinned, title: "Every detail, together", text: "Keep your destinations and daily plans close." }].map(({ icon: Icon, title, text }) => (
              <div key={title} className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5">
                <div className="rounded-xl bg-primary/15 p-3 text-violet-300"><Icon size={22} /></div>
                <div><h2 className="font-medium">{title}</h2><p className="mt-1 text-sm text-muted-foreground">{text}</p></div>
              </div>
            ))}
          </div>
        </Reveal>
        <section aria-label={signingIn ? "Sign in to SmartJourney" : "Create a SmartJourney account"} className="mx-auto w-full min-w-0 max-w-[440px]">
          <Reveal delay={0.12}>
          <ClerkLoading>
            <div role="status" className="space-y-6 rounded-3xl border border-border bg-card p-8">
              <p className="text-sm text-muted-foreground">Loading your secure {signingIn ? "sign-in" : "sign-up"} form…</p>
              <div className="h-11 animate-pulse rounded-xl bg-muted" />
              <div className="h-11 animate-pulse rounded-xl bg-muted" />
              <div className="h-11 animate-pulse rounded-xl bg-primary/20" />
            </div>
          </ClerkLoading>
          <ClerkFailed>
            <div role="alert" className="rounded-3xl border border-border bg-card p-8">
              <h2 className="text-lg font-semibold">We couldn’t load the account form</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Check your connection and reload the page to try again.</p>
              <button type="button" onClick={() => window.location.reload()} className="brand-button mt-5">Try again</button>
            </div>
          </ClerkFailed>
          {children}
          </Reveal>
          <p className="mt-6 text-center text-sm text-muted-foreground">A little less planning. A lot more exploring.</p>
        </section>
      </div>
    </main>
  );
}
