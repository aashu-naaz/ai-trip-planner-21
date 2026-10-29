"use client";

import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { AnimatePresence,m } from "motion/react";

export default function DestinationDetails({
  destination,
  onClose,
}: {
  destination: (typeof import("./destinations").destinations)[number] | null;
  onClose: () => void;
}) {
  const closeButton = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!destination) return;
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") { event.preventDefault(); closeButton.current?.focus(); }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("keydown", handleKey);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [destination, onClose]);
  return (
    <AnimatePresence>
      {destination && (
        <>
          {/* Backdrop */}
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-[80]"
          />

          {/* Slide Panel */}
          <m.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="destination-detail-title"
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
              ref={closeButton}
              aria-label="Close destination details"
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

            <h2 id="destination-detail-title" className="text-4xl font-bold mb-6 text-white">
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
          </m.div>
        </>
      )}
    </AnimatePresence>
  );
}
