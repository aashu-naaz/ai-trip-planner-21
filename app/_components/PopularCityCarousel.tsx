"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { destinations } from "./destinations";
import DestinationDetails from "./DestinationDetails";

export default function PopularCityCarousel() {
  const [active, setActive] = useState<any>(null);

  return (
    <>
      <section className="relative py-16 px-6 max-w-7xl mx-auto overflow-visible">

        {/* ===== TITLE ===== */}
        <div className="text-center mb-16">
          <h2 className="
            text-5xl md:text-6xl font-extrabold
            bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400
            bg-clip-text text-transparent
            tracking-tight
          ">
            Popular Destinations
          </h2>
        </div>

        {/* ===== CAROUSEL ===== */}
        <div className="flex gap-8 overflow-x-auto scrollbar-hide pb-10">

          {destinations.map((d) => (
            <motion.div
              key={d.id}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200, damping: 18 }}
              onClick={() => setActive(d)}
              className="
                relative min-w-[340px] h-[460px]
                rounded-3xl cursor-pointer
                bg-cover bg-center
                group
              "
              style={{ backgroundImage: `url(${d.image})` }}
            >
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
            </motion.div>
          ))}

        </div>
      </section>

      <DestinationDetails
        destination={active}
        onClose={() => setActive(null)}
      />
    </>
  );
}
