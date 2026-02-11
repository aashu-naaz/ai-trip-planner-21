"use client";

import { motion, AnimatePresence } from "framer-motion";

export default function DestinationDetails({
  destination,
  onClose,
}: {
  destination: any;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {destination && (
        <motion.div
          initial={{ x: 400, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 400, opacity: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          className="
            fixed top-0 right-0 h-full w-[380px] z-50
            bg-black/40 backdrop-blur-xl
            border-l border-white/10
            p-6 text-white
          "
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            ✕
          </button>

          <h2 className="text-2xl font-bold">
            {destination.city}, {destination.country}
          </h2>

          <p className="mt-3 text-white/70">
            {destination.description}
          </p>

          <div className="mt-4">
            <p className="text-sm text-white/60">Best time to visit</p>
            <p>{destination.bestTime}</p>
          </div>

          <div className="mt-4">
            <p className="text-sm text-white/60 mb-1">Highlights</p>
            <ul className="list-disc list-inside space-y-1">
              {destination.highlights.map((item: string) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
