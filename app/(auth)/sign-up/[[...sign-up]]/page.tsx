"use client";

import AuthShell from "@/app/_components/AuthShell";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <AuthShell mode="sign-up">
      <SignUp routing="path" path="/sign-up" signInUrl="/sign-in" />
    </AuthShell>
  );
}
