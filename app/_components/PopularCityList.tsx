"use client";

import { useState } from "react";
import Image from "next/image";
import { destinations } from "./destinations";
import { X } from "lucide-react";

export default function PopularCityList() {
  const [active, setActive] = useState<null | typeof destinations[0]>(null);

  return (
    <section className="relative px-6 py-20">
      <h2 className="text-4xl font-bold text-center mb-12">
        Popular Destinations
      </h2>

      {/* Glow Border */}
      <div className="relative rounded-3xl p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400">
        <div className="rounded-3xl bg-black/40 backdrop-blur-xl p-6">
          {/* Carousel */}
          <div className="flex gap-6 overflow-x-auto scrollbar-hide">
            {destinations.map((item) => (
              <div
                key={item.id}
                onClick={() => setActive(item)}
                className="min-w-[280px] h-[380px] rounded-2xl overflow-hidden cursor-pointer relative group"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm opacity-80">{item.country}</p>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Info Panel */}
      {active && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end"
          onClick={() => setActive(null)}
        >
          <div
            className="w-full sm:w-[420px] h-full bg-[#0b061a] p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4"
              onClick={() => setActive(null)}
            >
              <X size={28} />
            </button>

            <h3 className="text-3xl font-bold mb-2">{active.title}</h3>
            <p className="opacity-80 mb-4">{active.description}</p>

            <p className="mb-2">
              <span className="font-semibold">Best time:</span>{" "}
              {active.bestTime}
            </p>

            <ul className="list-disc pl-5 space-y-1 mt-4">
              {active.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
