"use client";

import AuthShell from "@/app/_components/AuthShell";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <AuthShell mode="sign-in">
      <SignIn routing="path" path="/sign-in" signUpUrl="/sign-up" />
    </AuthShell>
  );
}
