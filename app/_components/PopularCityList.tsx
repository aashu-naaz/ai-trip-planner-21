"use client";

import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";

export function PopularCityList() {
  const cards = data.map((card, index) => (
    <Card key={card.src} card={card} index={index} layout />
  ));

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Section glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-0 h-72 w-72 rounded-full bg-violet-500/20 blur-[120px]" />
        <div className="absolute right-1/4 bottom-0 h-72 w-72 rounded-full bg-fuchsia-500/20 blur-[120px]" />
      </div>

      <h2 className="mx-auto mb-12 max-w-7xl px-4 text-center text-2xl font-extrabold tracking-tight text-white drop-shadow-[0_0_20px_rgba(168,85,247,0.35)] md:text-4xl">
        Popular Destinations
      </h2>

      <Carousel items={cards} />
    </section>
  );
}

/* ================================
   Card Content (Cosmic)
   ================================ */
const DummyContent = () => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
      <p className="mx-auto max-w-3xl text-base font-light text-white/80 md:text-lg">
        <span className="font-semibold text-white">
          Discover breathtaking destinations across the globe.
        </span>{" "}
        Let our AI craft the perfect itinerary with hidden gems, smart routes,
        and personalized travel experiences — from flights to hotels.
      </p>
    </div>
  );
};

/* ================================
   Destination Data
   ================================ */
const data = [
  {
    category: "Paris, France",
    title: "Explore the City of Lights — Eiffel Tower, Louvre & more",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2600&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "New York, USA",
    title: "Experience NYC — Times Square, Central Park, Broadway",
    src: "https://plus.unsplash.com/premium_photo-1661954654458-c673671d4a08?q=80&w=1170&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Tokyo, Japan",
    title: "Discover Tokyo — Shibuya, Cherry Blossoms, Temples",
    src: "https://images.unsplash.com/photo-1522547902298-51566e4fb383?q=80&w=735&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Rome, Italy",
    title: "Walk Through History — Colosseum, Vatican, Roman Forum",
    src: "https://plus.unsplash.com/premium_photo-1675975678457-d70708bf77c8?q=80&w=1170&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "Dubai, UAE",
    title: "Luxury & Innovation — Burj Khalifa, Desert Safari",
    src: "https://images.unsplash.com/photo-1526495124232-a04e1849168c?q=80&w=687&auto=format&fit=crop",
    content: <DummyContent />,
  },
  {
    category: "India",
    title: "Culture & Heritage — Palaces, Temples & Landscapes",
    src: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=1171&auto=format&fit=crop",
    content: <DummyContent />,
  },
];
