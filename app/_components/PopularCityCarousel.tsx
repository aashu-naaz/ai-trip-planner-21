"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { destinations } from "./destinations";
import DestinationDetails from "./DestinationDetails";

export default function PopularCityCarousel() {
  const [active, setActive] = useState<any>(null);

  return (
    <>
      <div className="relative py-12 overflow-hidden">
        <div className="flex gap-6 px-6 overflow-x-auto scrollbar-hide">
          {destinations.map((d) => (
            <motion.div
              key={d.id}
              whileHover={{ scale: 1.05 }}
              onClick={() => setActive(d)}
              className="
                relative min-w-[320px] h-[420px]
                rounded-3xl cursor-pointer
                bg-cover bg-center
                border border-white/10
                shadow-xl
              "
              style={{ backgroundImage: `url(${d.image})` }}
            >
              {/* Glow border */}
              <div className="absolute inset-0 rounded-3xl
                ring-1 ring-white/10
                hover:ring-purple-400/60
                transition" />

              {/* Bottom text */}
              <div className="
                absolute bottom-0 w-full p-5
                bg-gradient-to-t from-black/80 to-transparent
                rounded-b-3xl text-white
              ">
                <p className="text-sm opacity-80">
                  {d.title}, {d.country}
                </p>
                <h3 className="text-lg font-semibold">
                  {d.highlights[0]}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <DestinationDetails
        destination={active}
        onClose={() => setActive(null)}
      />
    </>
  );
}
