"use client";

import { useSyncExternalStore } from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const mounted = useSyncExternalStore(subscribe, () => true, () => false);

  if (!mounted) return null;

  return <>{children}</>;
}

const subscribe = () => () => {};
