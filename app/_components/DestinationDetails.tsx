"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

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
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
          />

          {/* Slide Panel */}
          <motion.div
            initial={{ x: 500 }}
            animate={{ x: 0 }}
            exit={{ x: 500 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="
              fixed top-0 right-0
              h-full w-full sm:w-[480px]
              bg-[#0f0824]
              z-[90]
              pt-28
              px-8 pb-8
              overflow-y-auto
              shadow-2xl
            "
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="
                absolute top-20 right-8
                p-2 rounded-full
                bg-white/10 hover:bg-white/20
                transition
              "
            >
              <X size={22} />
            </button>

            <h2 className="text-4xl font-bold mb-6 text-white">
              {destination.title}
            </h2>

            <p className="text-white/70 mb-8">
              {destination.description}
            </p>

            <div className="mb-8">
              <p className="text-sm text-white/50">Best time to visit</p>
              <p className="text-lg">{destination.bestTime}</p>
            </div>

            <div>
              <p className="text-sm text-white/50 mb-3">Highlights</p>
              <div className="space-y-3">
                {destination.highlights.map((item: string) => (
                  <div
                    key={item}
                    className="
                      px-4 py-3 rounded-xl
                      bg-white/5
                      border border-white/10
                      hover:bg-white/10
                      transition
                    "
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
