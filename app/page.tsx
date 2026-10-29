import FeaturesGrid from "./_components/FeaturesGrid";
import Footer from "./_components/Footer";
import Hero from "./_components/Hero";
import HowItWorks from "./_components/HowItWorks";
import PopularCityCarousel from "./_components/PopularCityCarousel";


export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Hero handles its own cosmic background */}
      <Hero />

      {/* Popular Cities */}
      <section className="relative z-10">
        <PopularCityCarousel />
      </section>

      {/* Features Grid */}
      <FeaturesGrid />

      {/* How It Works */}
      <section className="relative z-10">
        <HowItWorks />
      </section>

      {/* Footer & Final CTA */}
      <Footer />
    </main>
  );
}
