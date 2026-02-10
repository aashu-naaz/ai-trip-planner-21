"use client";

export default function CosmicGlobe() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <svg
        viewBox="0 0 800 800"
        className="w-[1100px] max-w-none opacity-40 animate-spin-slow"
      >
        <defs>
          <radialGradient id="glow" r="50%">
            <stop offset="0%" stopColor="#a855f7" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Globe rings */}
        {[...Array(14)].map((_, i) => (
          <circle
            key={i}
            cx="400"
            cy="400"
            r={120 + i * 18}
            fill="none"
            stroke="rgba(168,85,247,0.18)"
          />
        ))}

        {/* Core glow */}
        <circle cx="400" cy="400" r="260" fill="url(#glow)" />
      </svg>
    </div>
  );
}
