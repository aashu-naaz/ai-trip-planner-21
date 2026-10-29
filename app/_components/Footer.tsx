import { Reveal, Stagger, MotionCard } from "@/components/ui/motion";
import { ArrowRight, Compass } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return <footer className="relative mt-16 w-full">
    <section className="relative overflow-hidden border-y border-border bg-gradient-to-br from-violet-950 via-violet-900/70 to-background px-6 py-20 sm:py-24">
      <Reveal className="relative mx-auto max-w-4xl space-y-7 text-center">
        <span className="brand-badge"><Compass size={14} /> Your next chapter is out there</span>
        <h2 className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-6xl">Ready to plan your<br className="hidden sm:block" /> next escape?</h2>
        <p className="mx-auto max-w-xl text-lg leading-relaxed text-violet-100/75">Turn that someday trip into a plan. Discover new places and build an itinerary around the things you love.</p>
        <Link href="/create-new-trip" className="brand-button !min-h-12 !bg-white !px-7 !text-violet-950">Start planning <ArrowRight size={18} /></Link>
      </Reveal>
    </section>
    <div className="bg-background px-6 pb-8 pt-16 sm:px-10">
      <Stagger className="mx-auto mb-12 grid max-w-7xl gap-10 md:grid-cols-3 md:gap-16">
        <MotionCard className="space-y-5">
          <Link href="/" className="inline-flex items-center gap-3"><Image src="/logo.svg" alt="" width={36} height={36} /><span className="text-xl font-semibold">Smart<span className="text-violet-300">Journey</span></span></Link>
          <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">A thoughtful travel companion for every kind of explorer. Plan a little smarter. Travel a little further.</p>
        </MotionCard>
        <MotionCard>
          <h3 className="mb-5 font-semibold">Explore SmartJourney</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground">{[['Destinations', '/#destinations'], ['Features', '/#features'], ['How it works', '/#how-it-works'], ['Pricing', '/pricing']].map(([label, href]) => <li key={href}><Link href={href} className="inline-block transition-[color,transform] hover:translate-x-1 hover:text-violet-300">{label}</Link></li>)}</ul>
        </MotionCard>
        <MotionCard>
          <h3 className="mb-5 font-semibold">Make yourself at home</h3>
          <ul className="grid gap-3 text-sm text-muted-foreground">{[['Create a trip', '/create-new-trip'], ['My trips', '/my-trips'], ['Sign in', '/sign-in'], ['Get in touch', '/contact-us']].map(([label, href]) => <li key={href}><Link href={href} className="inline-block transition-[color,transform] hover:translate-x-1 hover:text-violet-300">{label}</Link></li>)}</ul>
        </MotionCard>
      </Stagger>
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row"><p>© {new Date().getFullYear()} SmartJourney. All rights reserved.</p><p>Made for the journey, and everything along the way.</p></div>
    </div>
  </footer>;
}
