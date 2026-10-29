import type { ClerkProvider } from "@clerk/nextjs";
import type { ComponentProps } from "react";

export const clerkAppearance: ComponentProps<typeof ClerkProvider>["appearance"] = {
  variables: {
    colorPrimary: "#7c3aed",
    colorBackground: "#151027",
    colorInputBackground: "#1d1733",
    colorInputText: "#f5f3ff",
    colorText: "#f5f3ff",
    colorTextSecondary: "#bcb4d2",
    colorNeutral: "#f5f3ff",
    colorTextOnPrimaryBackground: "#ffffff",
    colorDanger: "#f87171",
    borderRadius: "0.875rem",
    fontFamily: "var(--font-outfit), sans-serif",
  },
  elements: {
    cardBox: "shadow-none w-full",
    card: "border border-white/10 shadow-none",
    rootBox: "w-full",
    footer: "bg-none bg-white/[0.02]",
    formButtonPrimary: "min-h-11 shadow-none",
    formFieldInput: "min-h-11",
    socialButtonsBlockButton: "min-h-11 border-white/15 text-foreground",
    footerActionLink: "text-violet-300 hover:text-violet-200",
    pricingTableCard: "mx-auto w-full max-w-md border border-white/10 shadow-none rounded-3xl",
    pricingTableCardFooterButton: "min-h-11 rounded-xl",
  },
};
