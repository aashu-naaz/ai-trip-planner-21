"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="page-shell flex items-center justify-center">
    <div className="max-w-lg rounded-3xl border border-border bg-card p-8 text-center">
      <h1 className="text-3xl font-semibold">Let’s get your journey back on track</h1>
      <p className="mt-4 leading-relaxed text-muted-foreground">This page couldn’t load. Please try again, or return home to continue exploring.</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-5">
        <button type="button" onClick={reset} className="brand-button">Try again</button>
        <Link href="/" className="text-sm text-violet-300 hover:underline">Back to home</Link>
      </div>
    </div>
  </main>;
}
