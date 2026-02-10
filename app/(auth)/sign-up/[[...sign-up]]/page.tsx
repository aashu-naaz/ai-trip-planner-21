"use client";

import { SignUp } from "@clerk/nextjs";
import ClientOnly from "@/app/_components/ClientOnly";

export default function Page() {
  return (
    <ClientOnly>
      <div className="flex min-h-screen items-center justify-center">
        <SignUp />
      </div>
    </ClientOnly>
  );
}
