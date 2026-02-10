"use client";

import { useEffect, useState } from "react";

const texts = [
  "Create a trip to Paris from New York",
  "Plan a honeymoon in Switzerland",
  "7-day Japan itinerary with flights",
  "Budget Europe trip for 2 people",
];

export default function TypingPlaceholder() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = texts[textIndex];

    if (charIndex < currentText.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + currentText[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 55);

      return () => clearTimeout(timeout);
    } else {
      const pause = setTimeout(() => {
        setDisplayText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }, 1800);

      return () => clearTimeout(pause);
    }
  }, [charIndex, textIndex]);

  return <span>{displayText}</span>;
}
