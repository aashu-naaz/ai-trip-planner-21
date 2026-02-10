import Hero from "./_components/Hero";
import { PopularCityList } from "./_components/PopularCityList";
import HowItWorks from "./_components/HowItWorks";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero handles its own cosmic background */}
      <Hero />

      {/* Section divider glow */}
      <div className="pointer-events-none h-24 bg-gradient-to-b from-transparent via-violet-500/10 to-transparent" />

      {/* Popular Cities */}
      <section className="relative z-10">
        <PopularCityList />
      </section>

      {/* Divider */}
      <div className="pointer-events-none h-24 bg-gradient-to-b from-transparent via-fuchsia-500/10 to-transparent" />

      {/* How It Works */}
      <section className="relative z-10">
        <HowItWorks />
      </section>
    </main>
  );
}
