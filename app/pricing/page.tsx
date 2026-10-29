import { Reveal } from "@/components/ui/motion";
import { PricingTable } from "@clerk/nextjs";
import { ArrowRight,Compass,Sparkles } from "lucide-react";
import Link from "next/link";

export default function Pricing() {
  return (
    <main className="page-shell">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="brand-badge"><Sparkles size={14} /> More exploring, less planning</span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight sm:text-6xl">Your next adventure.<br /><span className="brand-text">Your kind of plan.</span></h1>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">Find the right fit for the way you travel. Compare plans, explore what’s included, and start your next journey.</p>
        </Reveal>
        <Reveal delay={0.12}><section aria-label="Compare travel planning subscriptions" className="min-w-0">
          <PricingTable fallback={<div role="status" className="grid gap-6 md:grid-cols-2"><span className="sr-only">Loading available plans…</span>{[0, 1].map((item) => <div key={item} className="h-96 animate-pulse rounded-3xl border border-border bg-card" />)}</div>} />
        </section></Reveal>
        <section className="mt-12 flex flex-col items-start justify-between gap-6 rounded-3xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:p-8">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-primary/15 p-3 text-violet-300"><Compass size={24} /></div>
            <div><h2 className="text-lg font-semibold">Need a hand choosing?</h2><p className="mt-1 text-sm leading-relaxed text-muted-foreground">We’re here to help you find the right plan for your travels.</p></div>
          </div>
          <Link href="/contact-us" className="brand-button shrink-0">Let’s talk <ArrowRight size={16} /></Link>
        </section>
        <p className="mt-8 text-center text-sm text-muted-foreground">Already have an account? <Link href="/sign-in" className="text-violet-300 underline-offset-4 hover:underline">Sign in to manage your plan</Link></p>
      </div>
    </main>
  );
}
