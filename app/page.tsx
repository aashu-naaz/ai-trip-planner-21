import Hero from "./_components/Hero";
import PopularCityCarousel from "./_components/PopularCityCarousel";
import HowItWorks from "./_components/HowItWorks";
import FeaturesGrid from "./_components/FeaturesGrid";
import Footer from "./_components/Footer";


export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero handles its own cosmic background */}
      <Hero />

      {/* Background Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />

      {/* Visual Bridge */}
      <div className="relative h-24 w-full">
        <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 via-transparent to-transparent opacity-40 blur-3xl transform -translate-y-1/2 scale-150" />
      </div>

      {/* Popular Cities */}
      <section className="relative z-10">
        <PopularCityCarousel />
      </section>

      {/* Visual Bridge */}
      <div className="relative h-24 w-full">
        <div className="absolute inset-0 bg-radial-gradient from-fuchsia-500/10 via-transparent to-transparent opacity-40 blur-3xl transform -translate-y-1/2 scale-150" />
      </div>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* Visual Bridge */}
      <div className="relative h-24 w-full">
        <div className="absolute inset-0 bg-radial-gradient from-violet-500/10 via-transparent to-transparent opacity-40 blur-3xl transform -translate-y-1/2 scale-150" />
      </div>

      {/* How It Works */}
      <section className="relative z-10">
        <HowItWorks />
      </section>

      {/* Footer & Final CTA */}
      <Footer />
    </main>
  );
}
