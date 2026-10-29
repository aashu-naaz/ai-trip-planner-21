import { clerkAppearance } from "@/lib/clerk-appearance";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { MotionProvider } from "@/components/ui/motion";
import ConvexClientProvider from "./ConvexClientProvider";
import "./globals.css";

const outfit = localFont({
  src: "./fonts/outfit-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-outfit",
});

const playfair = localFont({
  src: "./fonts/playfair-display-latin.woff2",
  display: "swap",
  variable: "--font-playfair",
  weight: "500 700",
});

export const metadata: Metadata = {
  title: "SmartJourney — AI-powered trip planner",
  description: "Plan smarter journeys with AI",
  applicationName: "SmartJourney",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/favicon.ico", sizes: "any" }],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider appearance={clerkAppearance} signInUrl="/sign-in" signUpUrl="/sign-up" signInFallbackRedirectUrl="/my-trips" signUpFallbackRedirectUrl="/create-new-trip">
      <html lang="en" className="dark">
        <body
          className={`${outfit.variable} ${playfair.variable} font-sans`}
        >
          <MotionProvider>
          <ConvexClientProvider>
            {children}
          </ConvexClientProvider>
          </MotionProvider>
          <noscript><style>{`[data-reveal] { opacity: 1 !important; transform: none !important; }`}</style></noscript>
        </body>
      </html>
    </ClerkProvider>
  );
}
