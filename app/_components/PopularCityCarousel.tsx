"use client";

import { m } from "motion/react";
import { Reveal, Stagger } from "@/components/ui/motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useState } from "react";
const DestinationDetails = dynamic(() => import("./DestinationDetails"));
import { destinations } from "./destinations";

export default function PopularCityCarousel() {
  const [active, setActive] = useState<(typeof destinations)[number] | null>(null);
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  return (
    <>
      <section id="destinations" className="relative py-16 px-6 max-w-7xl mx-auto overflow-visible">

        {/* ===== TITLE ===== */}
        <Reveal className="text-center mb-16">
          <h2 className="
            text-4xl sm:text-5xl md:text-6xl font-extrabold
            bg-gradient-to-r from-purple-400 via-violet-400 to-cyan-400
            bg-clip-text text-transparent
            tracking-tight
          ">
            Popular Destinations
          </h2>
        </Reveal>

        {/* ===== CAROUSEL ===== */}
        <Stagger className="flex gap-5 sm:gap-8 snap-x snap-mandatory overflow-x-auto scrollbar-hide pb-10 pt-2">

          {destinations.map((d) => (
            <m.button
              key={d.id}
              data-reveal=""
              variants={{ hidden: { opacity: 0, transform: "translateY(22px) scale(1)" }, visible: { opacity: 1, transform: "translateY(0px) scale(1)" } }}
              whileHover={{ transform: "translateY(-7px) scale(1)" }}
              whileTap={{ transform: "translateY(-3px) scale(0.98)" }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              type="button"
              aria-label={`Explore ${d.title}`}
              onClick={() => { setDetailsLoaded(true); setActive(d); }}
              className="
                relative w-[min(78vw,340px)] shrink-0 h-[400px] sm:h-[460px] snap-center
                rounded-3xl cursor-pointer
                bg-cover bg-center
                group text-left
              "
            >
              <Image src={d.image} alt="" fill sizes="340px" className="rounded-3xl object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none" />
              {/* Clean Neon Border */}
              <div className="
                absolute inset-0 rounded-3xl
                border border-transparent
                group-hover:border-cyan-400
                transition duration-300
              " />

              {/* Bottom Text */}
              <div className="
                absolute bottom-0 w-full p-6
                bg-gradient-to-t from-black/70 to-transparent
                text-white
                rounded-b-3xl
              ">
                <p className="text-sm opacity-80">
                  {d.country}
                </p>
                <h3 className="text-2xl font-semibold">
                  {d.title}
                </h3>
              </div>
            </m.button>
          ))}

        </Stagger>
      </section>

      {detailsLoaded && <DestinationDetails
        destination={active}
        onClose={() => setActive(null)}
      />}
    </>
  );
}
